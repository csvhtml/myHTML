class clsPrinter {
    constructor(parent) {
        this.parent = parent
    }

    Print(key="data") {
        if (key == "data") {
            this._Print()}
        else {
            this._PrintConfig(key)
        }
        
        
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
            thsText: this.parent.XDataItems.self["Link"].headers,
            cellsText: this.parent.XDataItems.self["Link"].data,

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

    AsCSV() {
        let ret = '';
        ret += this._AsCSV_HeaderLine()
        ret += this._AsCSV_RowsLine()
        return ret
    }

    _AsCSV_HeaderLine() {
        let ll = this.parent.XReader.config["line-starter"]
        let l = this.parent.XReader.config["cell-seperator"]
        let n = this.parent.XReader.config["line-end"]

        let ret = ll 
        for (let header of this.parent.XData.headers) {
            ret += header + l}
        ret = ret.slice(0, -1*l.length) + n
        
        return ret
    }
    
    _AsCSV_RowsLine() {
        let ll = this.parent.XReader.config["line-starter"]
        let l = this.parent.XReader.config["cell-seperator"]
        let n = this.parent.XReader.config["line-end"]

        let ret = ""
        for (let row of this.parent.XData.data) {
            ret += ll
            for (let cell of row) {
                ret += cell + l}
            ret = ret.slice(0, -1*l.length) + n}
        
        return ret
    }
}