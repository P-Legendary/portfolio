window.onload = e =>{
    var containerNode= document.getElementById("container");
    var divToRemove=null;
    var removeButton= document.getElementById("remove");
    var addButton= document.getElementById("add");

    function add(){
        let checkBoxNode= document.createElement("input");
        let textAreaNode= document.createElement("textarea");
        let checkAndGoalNode= document.createElement("div");

        checkAndGoalNode.className="check-and-goal"; // just a simple div node or whatever...
        checkBoxNode.type="checkbox";
        checkBoxNode.id="checkbox";
        textAreaNode.id="goal";

        checkAndGoalNode.append(checkBoxNode);
        checkAndGoalNode.append(textAreaNode);
        containerNode.append(checkAndGoalNode)

        checkAndGoalNode.addEventListener("dblclick", e=>{
            removeAttributes(checkAndGoalNode);
            checkAndGoalNode.remove();
        });
        checkAndGoalNode.addEventListener("click", e =>{
            divToRemove=checkAndGoalNode;
            console.log(checkAndGoalNode);
        });

    }
    function removeAttributes(checkAndGoalNode){
        const attributes = checkAndGoalNode.attributes;

        // Loop through the attributes collection and remove each attribute
        for (let i = attributes.length - 1; i >= 0; i--) {
            checkAndGoalNode.removeAttribute(attributes[i].name);
        }
    }

    removeButton.addEventListener("click", e=>{
        try{
            removeAttributes(divToRemove);
            divToRemove.remove();
        }
        catch(err) {}
    });
    addButton.addEventListener("click", add);

}