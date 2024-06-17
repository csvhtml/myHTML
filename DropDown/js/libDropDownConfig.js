// Hint 1: "" must be outer quotes, '' must be inner quotes. Rule when using a dict.
// Hint 2: // Buttons with function calls can be also defined here, 
//         but better pratcice is to define them via index.html)
const LIB_DROPDOWN_QWERTZ = {
    // Buttons
    "id-of-a-Button": 'AddButtonText("  Button Text  1")' ,
    
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
        {"Call a object function": "AddButtonText('  Button Text  1')"   
        },
    ],
}


