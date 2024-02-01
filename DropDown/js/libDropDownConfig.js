// ################################################################
// Drop Down and Button Configuration                             #
// ################################################################
const LIB_DROPDOWN_QWERTZ = {
    // Buttons
    "id-of-a-Button": "AddButtonText()" ,
    
    // DropDowns
    "id-of-a-div-anywhere-on-page":[
        "I am a Drop Down item without function",
        {"I add a Blue Square to the page": "AddBlueBox()"},
        "third items"
    ],
    "id-dropdown-switches":[
        "Switch Items ... /... change when you click on them", 
        "and can be mixed with normal items",
        {"Blue/Red": "AddBlueBox()/AddRedBox()"},
    ],
    "id-anoter-example":[
        "A", 
        "B"
    ],
    "id-dropdown-anywhere":[
        "The drop down can be anywhere on the page",
        "not only in the navbar",
        {"Call a object function": "PAGE['DUMMY'].Add_innerHTML('yippie!')"   // "" must be outer quotes, '' must be inner quotes
        },
    ],
}

function DropDownsOnPage() {
    let ret = {}
    for (let key of Object.keys(LIB_DROPDOWN_QWERTZ) ) {
        ret[key] = new libDropDown(
            LIB_DROPDOWN_QWERTZ[key],
            document.getElementById(key))
    
        ret[key].InnerHTML_AddDropDown()
    }
    return ret
}



