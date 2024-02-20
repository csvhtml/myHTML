class clsPrinter {
    constructor(parent) {
        this.parent = parent
    }

    Print() {
        document.getElementById(this.parent.egoDivID).innerHTML = HMTL.Table({
            tableID: "id-table-" + this.parent.egoDivID,
            tableClass: "table",
            tableStyle: "margin-bottom:0;",
            thsText: this.parent.Xdata.headers,
            cellsText: this.parent.Xdata.data
        })
    }
}