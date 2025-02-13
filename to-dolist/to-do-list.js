window.onload = e =>{
    var containerNode= document.getElementById("container");
    var divToRemove=null;
    var checkNode=null;
    var textAreaNode=null;
    var removeButton= document.getElementById("remove");
    var addButton= document.getElementById("add");
    var idNumber=1;
    const userData= localStorage;

    function checkUserData(){
        userData.removeItem("one", "toOne");
        console.log(userData);

        for (let key in userData){
            if (typeof key==="string" && key.includes("check-and-goal")){
                idNumber=parseInt( key.substring(key.indexOf("l")+1, key.length) )+1; // this makes it so that the ordering does not go out of whack when making new nodes of checkmarks and textearea...
                containerNode.append(userData[key]); // try to add back the old data
            }
        }
    }
    checkUserData();
    function add(){
        let checkBoxNode= document.createElement("input");
        let textAreaNode= document.createElement("textarea");
        let checkAndGoalNode= document.createElement("div");

        checkAndGoalNode.className="check-and-goal"; // just a simple div node or whatever... this will hold the checkbox element and the text area elements...
        checkAndGoalNode.id="check-and-goal"+idNumber;
        checkBoxNode.type="checkbox";
        checkBoxNode.id="checkbox"+idNumber;
        textAreaNode.id="goal"+idNumber;
        idNumber++;
        console.log(idNumber);
       

        checkAndGoalNode.append(checkBoxNode);
        checkAndGoalNode.append(textAreaNode);
        containerNode.append(checkAndGoalNode)
        userData.setItem("check-and-goal"+idNumber, checkAndGoalNode); // try to add the notes to local storage object

        checkAndGoalNode.addEventListener("dblclick", e=>{
            try{checkAndGoalNode.remove();}
            catch(err){}
        });
        checkAndGoalNode.addEventListener("keydown", (e)=>{
            if (e.key=="Delete")
                checkAndGoalNode.remove();
            console.log(e);
        });
        checkAndGoalNode.addEventListener("click", e =>{
            divToRemove=checkAndGoalNode; // this statement is the same as "this.remove" since it's referencing itself, just in case they want to remove it
            //console.log(checkAndGoalNode);
        });

    }

    removeButton.addEventListener("click", e=>{
        try{
            userData.removeItem(divToRemove.id); // reomove the data from the local storage object
            divToRemove.remove();
            console.log(divToRemove);
        }
        catch(err) {}
    });

    addButton.addEventListener("click", add);

}