class clsXCSV_Focushandler {
    constructor(parent) {
            this.parent = parent
            this.focusID = ""
        }

    set(divID) {
        this.focusID = divID
        document.getElementById(divID).classList.add("xcsv-focus")
    }

    unset() {
        if (this.focusID != "") {
            document.getElementById(this.focusID).classList.remove("xcsv-focus")}
    }

    currentFocus() {
        return this.focusID
    }

}