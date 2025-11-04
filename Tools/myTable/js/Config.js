// #################################################
// System  Config                                  *
// #################################################
// Layout
const cSITE = {
    'colorTheme': 'light',
    'view': 'table',

}



//libUserInput
const cUSERINPUT_EVENT = {}     // const dict, to pretect it from accidently being overwritten
const LIB_USERINPUT = {
    "Tipp": "",
    "id-content": {
        "Click" : 'Click()'
        // "Hover": "outHover(); outHoverID()",
        // "HoverLeave": "outLeave()",
    },
    "id-sidebar": {
        "Click" : 'Click()'
    }
}

CONST_EDITABLE_HTML_FUNCTION_CALLS = {
    "edit": (innerHTML) => innerHTML,                 // your_edit_function(innerHTML), 
    "save": (textAreaValue) => textAreaValue,             // your_save_function(textAreaValue), 
    "margin-discard": 36,
}