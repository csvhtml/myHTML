function TextArea({
    id = "", 
    cols = 50, 
    rows = 5, 
    classList = ["form-control"],
    value = ""
}) {
    let input = document.createElement('textarea'); 
    input.cols = cols
    input.rows = rows
    input.id = id
    input.readOnly = false
    for (clas of classList) {
        input.classList.add(clas)
    }
    input.value = value
    return input
}

function RemoveDIV(divID) {
    let div  = document.getElementById(divID);
    if (div != undefined) {
        div.remove()}
}

function RemoveTextarea() {
    var textarea = document.querySelector('textarea');

    if (textarea) {
        textarea.parentNode.removeChild(textarea);}
}

function AutoHeight(divID) {
    if (document.getElementById(divID) != null) {
        document.getElementById(divID).style.height = (document.getElementById(divID).scrollHeight)+"px"}
    }