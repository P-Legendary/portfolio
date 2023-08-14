window.onload= e => {
    var containerGrid= document.getElementById("grid2");
    var biggestNum= null;
    var sumbmitMax= document.getElementById("submit-max-number");
    var createdGrids= false;
    
    // we need for loop so we can make the little boxes in the sudoku puzzle
    function createGrids(){ // maybe in the future the grid will be self aware/like daedelus labyrinth
        for (let i=1; i<=biggestNum; i++){
            let subGridNode= document.createElement("div");
            subGridNode.className="sub-grid";
            subGridNode.id=i;
            for (let j=1; j<=biggestNum; j++){
                let subGridBoxNode= document.createElement("input");
                subGridBoxNode.className="sub-grid-box";
                subGridBoxNode.type="number";
                subGridBoxNode.max=biggestNum;
                subGridBoxNode.min=1;
                subGridNode.appendChild(subGridBoxNode);
                subGridBoxNode.style.cssTex="grid-template-columns: repeat(" + Math.sqrt(biggestNum) + "," + " 1fr) !important;";

                //these are the individual boxes that will hold the numbers
            }
            containerGrid.appendChild(subGridNode);
            containerGrid.style.cssTex="grid-template-columns: repeat(" + Math.sqrt(biggestNum) + "," + " 1fr) !important;";

        }
    }
    sumbmitMax.addEventListener("click",e =>{
        biggestNum=parseInt(document.getElementById("max").value);;
        if (!createdGrids && biggestNum && biggestNum%1==0){
            createGrids(); // now that the user has submitted the number we can make the grid and subgrids
            createdGrids=true;
        }
        console.log(biggestNum)
    });

}