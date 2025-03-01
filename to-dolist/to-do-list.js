console.log("JavaScript file loaded");

window.onload = () => {
    const containerNode = document.getElementById("container");
    const removeButton = document.getElementById("remove");
    const addButton = document.getElementById("add");
    const darkAndLightNode = document.getElementById("dark-and-light");
    const broomNode = document.getElementById("broom");
    const noAnimationNode = document.getElementById("suspended-animation");

    let idNumber = 1;
    let divToRemove = null;

    function checkUserData() {
        const savedData = JSON.parse(localStorage.getItem("userData")) || [];
        const savedWidgetsData = JSON.parse(localStorage.getItem("userDataWidgets")) || {};

        containerNode.innerHTML = "";
        idNumber = 1;

        savedData.forEach(({ id, text, checked }) => {
            add(id, text, checked);
        });

        if (savedWidgetsData) {
            if (savedWidgetsData.suspendedAnimation) {
                addButton.classList = savedWidgetsData.suspendedAnimation;
            }
            if (savedWidgetsData.className) {
                darkAndLightNode.classList = savedWidgetsData.className;
            }
            if (savedWidgetsData.className && savedWidgetsData.className.includes("dark-mode")) {
                document.body.classList.add("dark-mode");
                darkAndLightNode.classList.add("dark-mode");

                // ✅ Apply dark mode to textareas and checkboxes
                document.querySelectorAll("input[type='checkbox'], textarea").forEach(node => {
                    node.classList.add("dark-mode");
                });

                // ✅ Restore "yellow" class for widgets
                if (savedWidgetsData.yellowElements) {
                    savedWidgetsData.yellowElements.forEach(id => {
                        const node = document.getElementById(id);
                        if (node) node.classList.add("yellow");
                    });
                }
            }
        }
    }

    function clearUserData() {
        localStorage.clear();
        containerNode.innerHTML = "";
        idNumber = 1;
        console.log("Cleared data");
    }

    function saveWidgetsData() {
        const yellowElements = Array.from(document.querySelectorAll("#widgets > *"))
            .filter(node => node.classList.contains("yellow"))
            .map(node => node.id);

        const data = {
            className: darkAndLightNode.className,
            suspendedAnimation: addButton.className,
            yellowElements: yellowElements
        };

        localStorage.setItem("userDataWidgets", JSON.stringify(data));
    }

    function saveUserData() {
        const checkAndGoalNodes = document.querySelectorAll(".check-and-goal");
        const data = Array.from(checkAndGoalNodes).map(node => ({
            id: parseInt(node.id.replace("check-and-goal", "")),
            text: node.querySelector("textarea").value,
            checked: node.querySelector("input[type='checkbox']").checked
        }));
        localStorage.setItem("userData", JSON.stringify(data));
    }

    function add(id = idNumber, text = "", checked = false) {
        const checkBoxNode = document.createElement("input");
        const textAreaNode = document.createElement("textarea");
        const checkAndGoalNode = document.createElement("div");

        checkAndGoalNode.className = "check-and-goal";
        checkAndGoalNode.id = "check-and-goal" + id;

        checkBoxNode.type = "checkbox";
        checkBoxNode.id = "checkbox" + id;
        checkBoxNode.className = "checkbox";
        checkBoxNode.checked = checked;

        textAreaNode.id = "goal" + id;
        textAreaNode.className = "goal";
        textAreaNode.value = text;

        if (id === 1 && text === "") textAreaNode.placeholder = "Enter your goal here...";

        checkAndGoalNode.append(checkBoxNode, textAreaNode);
        containerNode.append(checkAndGoalNode);

        idNumber = Math.max(idNumber, id + 1);

        checkAndGoalNode.addEventListener("keydown", (e) => {
            if (e.key === "Delete") {
                checkAndGoalNode.remove();
                saveUserData();
            }
        });

        checkAndGoalNode.addEventListener("click", () => {
            divToRemove = checkAndGoalNode;
            saveUserData();
        });

        textAreaNode.addEventListener("input", saveUserData);
        checkBoxNode.addEventListener("change", saveUserData);

        // ✅ Ensure dark mode applies to new textareas if already enabled
        if (document.body.classList.contains("dark-mode")) {
            textAreaNode.classList.add("dark-mode");
        }

        saveUserData();
        saveWidgetsData();
    }

    function toggleAnimation() {
        addButton.classList.toggle("no-animation");
        saveWidgetsData();
        console.log("Toggled animation");
    }

    function toggleDarkAndLight() {
        const widgetsNodes = document.querySelector("#widgets").children;

        for (const node of widgetsNodes) {
            if (node.id !== "dark-and-light") {
                node.classList.toggle("yellow");
            }
        }

        document.body.classList.toggle("dark-mode");
        darkAndLightNode.classList.toggle("dark-mode");

        document.querySelectorAll("input[type='checkbox'], textarea").forEach(node => {
            node.classList.toggle("dark-mode");
        });

        saveWidgetsData();
        console.log("Toggled dark mode");
    }

    broomNode.addEventListener("click", clearUserData);
    darkAndLightNode.addEventListener("click", toggleDarkAndLight);
    noAnimationNode.addEventListener("click", toggleAnimation);

    removeButton.addEventListener("click", () => {
        if (divToRemove) {
            divToRemove.remove();
            saveUserData();
        }
    });

    addButton.addEventListener("click", () => {
        add();
    });

    checkUserData();
};
