window.onload= e => {
    var containerGrid= document.getElementById("grid2");
    var biggestNum= null;
    var sumbmitMax= document.getElementById("submit-max-number");
    
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
                //these are the individual boxes that will hold the numbers
            }
            containerGrid.appendChild(subGridNode);

        }
    }
    sumbmitMax.addEventListener("click",e =>{
        biggestNum=parseInt(document.getElementById("max").innerText);;
        createGrids();
    })

}