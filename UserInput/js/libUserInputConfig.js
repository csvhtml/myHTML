const cUSERINPUT_EVENT = {}     // const dict, to pretect it from accidently being overwritten

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