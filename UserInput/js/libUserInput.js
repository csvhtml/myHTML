class clsUserInput {
    constructor(DivIDs) {
        this.EgoIDs = DivIDs
        this.mousedownTime = new Date().getTime()
        this.mouseupTime = new Date().getTime()
    }

// ################################################################
// User Events                                                    #
// ################################################################

    MouseDown = (event) => {
        this.mousedownTime = new Date().getTime();
    }

    MouseUp = (event) => {
        this.nextMouseupTime = new Date().getTime();
        let moustime = this.nextMouseupTime-this.mousedownTime

        if (moustime<300) {
            this.Trigger(event, "Click")
        }
    } 

    MouseEnter = (event) => {
        this.Trigger(event, "Hover")
    }

    MouseLeave = (event) => {
        this.Trigger(event, "HoverLeave")
    }

    KeyUp = (event) => {
        this.Trigger(event, "Tipp")
    }
    
    Trigger(event, typ) {
        if (event.type == 'keyup') {
            cUSERINPUT_EVENT["event"] = event
            eval(LIB_USERINPUT["Tipp"])
            return}

        for (let divID of this.EgoIDs) {
            if (DivIsDescendantOf(event.srcElement, divID)) {
                cUSERINPUT_EVENT["event"] = event
                cUSERINPUT_EVENT["sectionID"] = divID
                if (typ == "Click") {
                    eval(LIB_USERINPUT[divID]["Click"])}
                if (typ == "Hover") {
                    eval(LIB_USERINPUT[divID]["Hover"])}
                if (typ == "HoverLeave") {
                    eval(LIB_USERINPUT[divID]["HoverLeave"])}
            }
        }
    }
}