class clsPrinter {
    constructor(parent) {
        this.parent = parent
    }

    Print() {
        document.getElementById(this.parent.egoDivID).innerHTML = HMTL.Table({
            tableID: "id-table-" + this.parent.egoDivID,
            tableClass: "table",
            tableStyle: "margin-bottom:0;",
            thsText: this.parent.XData.headers,
            thsID: this.parent.XNames.IDs.headers(),
            rowsID: this.parent.XNames.IDs.rows(),
            cellsText: this.parent.XData.data,
            cellsID: this.parent.XNames.IDs.cells(),
        })
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