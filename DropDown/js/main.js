const LOGG = true
// const LOGG = false

// ################################################################
// Base classes                                                   #
// ################################################################
const cLOG = new clsLog()

const DD = DropDownsOnPage()


class clsDummy {
    constructor({TargetDivID = ""}  ) {
        this.TargetDivID = TargetDivID
    }

    Add_innerHTML(text) {
        let div = document.getElementById(this.TargetDivID).innerHTML += text
    }
}

(function () {

})();


const PAGE = {
    "DUMMY": new clsDummy({TargetDivID: "MyCSV"})
}


// ################################################################
// Dummy function                                                 #
// ################################################################



function AddBlueBox()  {
    let parentDiv = document.getElementById("MyCSV");

    const blueBox = document.createElement('div');
    blueBox.style.width = '50px';
    blueBox.style.height = '50px';
    blueBox.style.backgroundColor = 'blue';
    // blueBox.style.position = 'absolute';
    blueBox.style.top = '50%';
    blueBox.style.left = '50%';
    // blueBox.style.transform = 'translate(-50%, -50%)';
  
    parentDiv.appendChild(blueBox);
}

function AddRedBox()  {
    let parentDiv = document.getElementById("MyCSV");

    const blueBox = document.createElement('div');
    blueBox.style.width = '50px';
    blueBox.style.height = '50px';
    blueBox.style.backgroundColor = 'red';
    // blueBox.style.position = 'absolute';
    blueBox.style.top = '50%';
    blueBox.style.left = '50%';
    // blueBox.style.transform = 'translate(-50%, -50%)';
  
    parentDiv.appendChild(blueBox);
}

function AddButtonText()  {
    document.getElementById("MyCSV").innerHTML += " Button Function "


}



