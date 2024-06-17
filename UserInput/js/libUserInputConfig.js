 // const dict, to protect it from accidently being overwritten
const cUSERINPUT_EVENT = {}    

const LIB_USERINPUT = {
    "Tipp": "outTipp()",

    "id-section-1": {
        "Click" : "outClick()", 
        "Hover": "outHover(); outHoverID()",
        "HoverLeave": "outLeave()",
    },
    "id-section-2": {
        "Click" : "outClick()",
        "Hover": "differentHover(); outHoverID()",
        "HoverLeave": "outLeave()",
    }
}