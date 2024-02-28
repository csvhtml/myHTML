// ################################################################
// Drop Down                                                      #
// ################################################################

function DropDown_ToggleDisplay(divID, pair = ["block", "none"]) {
    let x = document.getElementById(divID).style.display
    document.getElementById(divID).style.display = toggle(x, pair)
  }

function DropDown_ToggleVal(divID, pair) {
    let x = document.getElementById(divID).innerHTML
    document.getElementById(divID).innerHTML = toggle(x, pair)
  }

function DropDown_ToggleEventClick(divID, pair) {
    let lookup = ""

    for (item of pair) {
        lookup = 'onclick="' + item + '"'; repl = 'onclick="' + toggle(item, pair) + '"'
        if (document.getElementById(divID).outerHTML.includes(lookup)) {
            document.getElementById(divID).outerHTML = 
                document.getElementById(divID).outerHTML.replace(lookup, repl)
            eval(item)
            break
        }
    }

}

function DropDown_ToggleValANDClick(divID, pairVal, pairFunction) {
    DropDown_ToggleVal(divID, pairVal)
    DropDown_ToggleEventClick(divID, pairFunction)
}

function DropDown_Hide(divID) {
    document.getElementById(divID).style.display = 'none';
}