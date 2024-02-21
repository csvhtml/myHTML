class clsXCSV_Clickhandler {
    constructor(parent) {
            this.parent = parent
        }

    process(div) {
        let divID = ReturnParentUntilID(div).id

        if (this.parent.XNames.IDs.IsHeader(divID)){
            this._Header(divID)
            return}

        if (this.parent.XNames.IDs.IsCell(divID)){
            this._Cell(divID)
            return}

    }

    _Header(divID) {
        this.parent.XFocus.set(divID)
    }

    _Cell(divID) {
        let rowID = this.parent.XNames.IDs.RowfromCell(divID)
        if (this._RowAlreadyInFocus(rowID)) {
            this.parent.XFocus.unset()
            this.parent.XFocus.set(divID)} 
        else {
            this.parent.XFocus.unset()
            this.parent.XFocus.set(rowID)}  
    }

    _RowAlreadyInFocus(divID) {
        return (this.parent.XFocus.currentFocus() == divID)
    }
}