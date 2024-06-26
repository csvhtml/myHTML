class clsXCSV_Clickhandler {
    constructor(parent) {
            this.parent = parent
        }

    ClickEvent(div) {
        let divID = ReturnParentUntilID(div).id

        if (this.parent.XNames.IsHeader(divID)){
            this._HeaderCell(divID)
            return}

        if (this.parent.XNames.IsCell(divID)){
            this._Cell(divID)
            return}
    }

    _HeaderCell(divID) {
        if (this._AlreadyInFocus(divID)) {
            this.parent.XSelection.unset()
            this.parent.XSelection.set(divID)
            this.parent.XSelection.edit(divID)} 
        else {
            this.parent.XSelection.unset()
            this.parent.XSelection.set(divID)} 
    }

    _Cell(divID) {
        let rowID = this.parent.XNames.IDs.RowfromCellID(divID)
        if (this._AlreadyInFocus(rowID)) {
            this.parent.XSelection.unset()
            this.parent.XSelection.set(divID)
            this.parent.XSelection.edit(divID)}
        else {
            this.parent.XSelection.unset()
            this.parent.XSelection.set(rowID)}  
    }

    _AlreadyInFocus(divID) {
        return (this.parent.XSelection.currentSelection() == divID)
    }
}