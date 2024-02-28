class clsXCSV_Clickhandler {
    constructor(parent) {
            this.parent = parent
        }

    process(div) {
        let divID = ReturnParentUntilID(div).id

        if (this.parent.XNames.IDs.IsHeader(divID)){
            this._HeaderCell(divID)
            return}

        if (this.parent.XNames.IDs.IsCell(divID)){
            this._Cell(divID)
            return}

    }

    _HeaderCell(divID) {
        if (this._AlreadyInFocus(divID)) {
            // do something
        } 
        else {
            this.parent.XFocus.unset()
            this.parent.XFocus.set(divID)} 
    }

    _Cell(divID) {
        let rowID = this.parent.XNames.IDs.RowfromCellID(divID)
        if (this._AlreadyInFocus(rowID)) {
            this.parent.XFocus.unset()
            this.parent.XFocus.set(divID)
            this.parent.XFocus.edit(divID)}
        else {
            this.parent.XFocus.unset()
            this.parent.XFocus.set(rowID)}  
    }

    _AlreadyInFocus(divID) {
        return (this.parent.XFocus.currentSelection() == divID)
    }
}