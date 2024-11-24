// ##################################################################################################
// This class is not inteded to have any callable functions.                                        #
// When initialized, the target div-ID are provided as parameters where click events are active     #
// i. e. on the rest of the html page, User Input has no functionality                              #
//                                                                                                  #
// In main, an EventListener must be set on the window object for                                   #
// - mousedown, mouse up to trigger 'Click'                                                         #
// - keyUp to trigger 'Tipp'                                                                        #
// - mouseenter and mouseleave to handle 'Hover' and 'HoverLeave'.                                  #
// - These can not be set on the window object and must be set on the individual div items          #                                          #
//                                                                                                  #
// In the config, it is defined which global function to be called in case of                       #
//  Click, Tipp, Hover or HoverLeave was triggered. Mouse Events are defined per target div-ID      #
//                                                                                                  #
// ##################################################################################################


class clsUserInput {
    constructor() {
        let sections = Object.keys(LIB_USERINPUT); sections.removeX('Tipp')
        this.EgoIDs = sections
        this.mousedownTime = new Date().getTime()
        this.mouseupTime = new Date().getTime()
    }

// ################################################################
// User Events                                                    #g
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

    KeyUp = (event) => {
        this.Trigger(event, "Tipp")
    }

    MouseEnter = (event) => {
        this.Trigger(event, "Hover")
    }

    MouseLeave = (event) => {
        this.Trigger(event, "HoverLeave")
    }

    
    Trigger(event, typ) {
        if (event.type == 'keyup') {
            cUSERINPUT_EVENT["event"] = event
            eval(LIB_USERINPUT["Tipp"])
            return}

        for (let divID of this.EgoIDs) {
            let egoDIV = document.getElementById(divID)
            // if (DivIsDescendantOf(event.srcElement, divID)) {
            if (event.srcElement.IsDescendantOf(egoDIV)) {
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