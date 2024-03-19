class clsPrinter {
    constructor(parent) {
        this.parent = parent
    }

    Print(key="data") {
        if (key == "data") {
            this._Print()
            infoblock("Working Items", "m")}
        else {
            this._PrintConfig(key)
            infoblock("Config Items: " + key, "m")
        }
        this.parent.XSelection.unset()
        
    }

    _Print() {
        document.getElementById(this.parent.egoDivID).innerHTML = HMTL.Table({
            tableID: "id-table-" + this.parent.egoDivID,
            tableClass: "table",
            tableStyle: "margin-bottom:0;",
            thsText: this.parent.XData.headers,
            thsID: this.parent.XNames.IDs.headers(),
            rowsID: this.parent.XNames.IDs.rows(),
            // cellsText: this.parent.XData.data,
            cellsText: this.DataAsHTML(),
            cellsID: this.parent.XNames.IDs.cells(),
        })
    }

    _PrintConfig(key) {
        this.parent.XSelection.unset()
        document.getElementById(this.parent.egoDivID).innerHTML = HMTL.Table({
            tableID: "id-table-" + this.parent.egoDivID,
            tableClass: "table",
            tableStyle: "margin-bottom:0;",
            thsText: this.parent.XConfigItems["Link"].headers,
            cellsText: this.parent.XConfigItems["Link"].data,

            // thsText: this.parent.XNames.ConfigIDs["Link"].XData.headers,
            thsID: this.parent.XNames.ConfigIDs["Link"].headers(),
            rowsID: this.parent.XNames.ConfigIDs["Link"].rows(),
            
            cellsID: this.parent.XNames.ConfigIDs["Link"].cells(),
        })
    }

    DataAsHTML() {
        let ret = []
        for (let row of this.parent.XData.data) {
            let tmp = []
            for (let cell of row) {
                tmp.push(parseMarkup(cell))}
            ret.push(tmp)}
        return ret
    }

}