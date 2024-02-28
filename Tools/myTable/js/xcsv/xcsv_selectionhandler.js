class clsXCSV_Selectionhandler {
    constructor(parent) {
            this.parent = parent
            this.EgoID = ""
        }

    set(divID) {
        this.EgoID = divID
        document.getElementById(divID).classList.add("xcsv-focus","table-info")
    }



    unset() {
        if (this.EgoID != "") {
            EDIT.Inti_Z()
            document.getElementById(this.EgoID).classList.remove("xcsv-focus", "table-info", "myEdit")
        }
    }

    edit(divID) {
        this.EgoID = divID
        document.getElementById(divID).classList.add("myEdit")
        EDIT.Init()
    }

    currentSelection() {
        return this.EgoID
    }

}