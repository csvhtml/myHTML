class clsXCSV_Selectionhandler {
    constructor(parent) {
            this.parent = parent
            this.EgoID = ""
        }

    set(divID) {
        this.EgoID = divID
        document.getElementById(divID).classList.add("xcsv-focus","bg-lblue")
        
        let X = this.parent.XNames.IDs
        if (X.IsRow(divID)) {
            infoblock("Selected Row: " + String(this.parent.XNames.IDs.R_fromRowID(this.EgoID, true))); return}
        if (X.IsCell(divID)) {
            infoblock("Selected Cell: " + String(this.parent.XNames.IDs.RC_fromID(this.EgoID, true))); return}
        if (X.IsHeader(divID)) {
            infoblock("Selected Header: " + this.parent.XData.headers[this.parent.XNames.IDs.H_fromHeaderID(this.EgoID)]); return}
        
    }

    unset() {
        if (this.EgoID != "") {
            if (document.getElementById(this.EgoID)) {
                EDIT.Init_Undo()
                document.getElementById(this.EgoID).classList.remove("xcsv-focus", "bg-lblue", "myEdit")
            }
        }
        this.EgoID = ""
        infoblock(this.EgoID)
    }

    edit(divID) {
        this.EgoID = divID
        document.getElementById(divID).classList.add("myEdit")
        EDIT.Init()
    }

    currentSelection() {
        return this.EgoID
    }
    
    Row() {
        if (this.parent.XNames.IDs.IsRow(this.currentSelection())) {
            return this.parent.XNames.IDs.R_fromRowID(this.currentSelection())}
        return -1
    }

}