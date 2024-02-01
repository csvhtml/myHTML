

// ################################################################
// Main function call                                             #
// ################################################################

// This is the main function called when a nav btton is clicked.
// This function must be outside the navbar lib, to make it globally callable from the index.html (otherwise the instances name needs to be knwon)

// const CLS_NAVBAR_DOWNLOADCALL = "clsNavbar_Call_Download"  // name of main function called for download button. See bottom


// ################################################################
// Navbar                                                         #
// ################################################################

function clsNavbar_Call_DropDown(key) {
    assert(CLS_NAVBAR_CONFIG_LEFT_FUNCTIONCALL==arguments.callee.name)

    if (NAV.IsSwitch(key)) {
        NAV.Change_Switch(key)}

    clsNavbar_Config_FunctionCall(key)
}

function clsNavbar_Call_Download_CSV() {
    DownloadCSV(PAGE["MyCSV"].ReadWrite.AsCSV())
}

function clsNavbar_Call_Download_JSON() {
    DownloadCSV(PAGE["MyCSV"].ReadWrite.AsJSON(), filename = "*.json")
}

function clsNavbar_Call_Input() {
    for (let X of [PAGE["MyCSV"],PAGE["MySidebar"]]) {
        X.ReadCSV(cReaders["nav-input"].result);
        X.Print();
        X.ToggleLink();
    }
} 

// ################################################################
// Drop Down                                                      #
// ################################################################
// var LIB_DROPDOWN_GETTIME = 5000

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
