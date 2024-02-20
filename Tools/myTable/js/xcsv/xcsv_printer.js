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
            cellsText: this.parent.XData.data
        })
    }
}