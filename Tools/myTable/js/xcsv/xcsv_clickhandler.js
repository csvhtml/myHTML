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
        let a = 1
    }

    _Cell(divID) {
        let a = 1
    }
}