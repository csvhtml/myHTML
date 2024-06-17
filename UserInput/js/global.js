
function outClick ()  {
    document.getElementById("out-click").innerHTML = "Click: " + cUSERINPUT_EVENT["event"].srcElement.id
}

function outHover ()  {
    document.getElementById("out-hover").innerHTML = "Hover: "
}

function differentHover ()  {
    document.getElementById("out-hover").innerHTML = "Hover on 2: "
}

function outHoverID()  {
    document.getElementById("out-hover").innerHTML += cUSERINPUT_EVENT["event"].srcElement.id
}

function outTipp()  {
    document.getElementById("out-tipp").innerHTML += cUSERINPUT_EVENT["event"].key
}

function outLeave ()  {
    if (cUSERINPUT_EVENT["sectionID"] == "id-section-1") {
        document.getElementById("out-tipp").innerHTML = "Keyboard: "
        document.getElementById("out-click").innerHTML = "Click: "
        document.getElementById("out-hover").innerHTML = "Hover: "
    }

    if (cUSERINPUT_EVENT["sectionID"] == "id-section-2") {
        document.getElementById("out-tipp").innerHTML = "Keyboard: You left Section 2"
        document.getElementById("out-click").innerHTML = "Click: You left Section 2"
        document.getElementById("out-hover").innerHTML = "Hover: You left Section 2"
    }

}