const UIN = new clsUserInput(["id-section-1", "id-section-2"]);

(function () {
        let div = document.createElement('div');
        for (k =1; k<3; k++) {
            for (i = 1; i<200;i++) {
                div = document.createElement('div');
                div.innerHTML = String(i)
                div.id = String(i)
                div.classList.add("item")
                // append mouseenter/mouseleave on single elements
                div.addEventListener('mouseenter', UIN.MouseEnter)
                div.addEventListener('mouseleave', UIN.MouseLeave)
                document.getElementById("id-section-" + String(k)).appendChild(div)
            }
        }

        window.addEventListener('mousedown', UIN.MouseDown)
        window.addEventListener('mouseup', UIN.MouseUp)
        // The mouseenter/mouseleave event in JavaScript is not supported on the window object
        // The mouseenter/mouseleave is not really usefull on a top parent DOM element. 
        // It will trigger once you enter the parent and do nothing as long as you are inside
        // The mouseenter/mouseleave event needs to be attached to the individual target element. 
        // See for loop above
        window.addEventListener('keyup', UIN.KeyUp)
})();

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



