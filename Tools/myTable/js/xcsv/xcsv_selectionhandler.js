class clsXCSV_Selectionhandler {
    constructor(parent) {
            this.parent = parent
            this.SelectedID = ""
        }

    set(divID) {
        this.SelectedID = divID
        document.getElementById(divID).classList.add("xcsv-focus","bg-lblue")
        
        let X = this.parent.XNames.IDs; let msg = ''
        if (X.IsRow(divID)) {
            msg = "Selected Row: " + String(this.parent.XNames.IDs.R_fromRowID(this.SelectedID, true))
            this.parent.XInfo.Level2(msg); return}
            // infoblock.innerHTML = "Selected Row: " + String(this.parent.XNames.IDs.R_fromRowID(this.SelectedID, true)); return}
        if (X.IsCell(divID)) {
            msg = "Selected Cell: " + String(this.parent.XNames.IDs.RC_fromID(this.SelectedID, true))
            this.parent.XInfo.Level2(msg); return}
            // infoblock.innerHTML = "Selected Cell: " + String(this.parent.XNames.IDs.RC_fromID(this.SelectedID, true)); return}
        if (X.IsHeader(divID)) {
            msg = "Selected Header: " + this.parent.XData.headers[this.parent.XNames.IDs.C_fromHeaderID(this.SelectedID)]
            this.parent.XInfo.Level2(msg); return}
            // infoblock.innerHTML = "Selected Header: " + this.parent.XData.headers[this.parent.XNames.IDs.C_fromHeaderID(this.SelectedID)]; return}
        
    }

    unset() {
        if (this.SelectedID != "") {
            if (document.getElementById(this.SelectedID)) {
                EDIT.Init_Undo()
                document.getElementById(this.SelectedID).classList.remove("xcsv-focus", "bg-lblue", "myEdit")
            }
        }
        this.SelectedID = ""
        this.parent.XInfo.Level2(this.SelectedID)
    }

    edit(divID) {
        this.SelectedID = divID
        document.getElementById(divID).classList.add("myEdit")
        EDIT.Init()
    }

    currentSelection() {
        return this.SelectedID
    }
    
    Row() {
        let X = this.parent.XNames.IDs
        let id = this.currentSelection()
        return wenn(X.IsRow(id), X.R_fromRowID(id), -1)
    }

    Col() {
        let X = this.parent.XNames.IDs
        let id = this.currentSelection()
        return wenn(X.IsHeader(id), X.C_fromHeaderID(id), -1)
    }



}