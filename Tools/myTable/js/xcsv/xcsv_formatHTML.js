class clsFormatHTML {
    constructor(parent) {
        this.parent = parent
    }

    Print() {
        if (this.parent.XData.Type() == 'table') {
            document.getElementById(this.parent.config["Ego Div ID"]).innerHTML = this.DataAsHTML()
            this.parent.XSelection.unset()}
        
        if (this.parent.XData.Type() == 'gallery')
            document.getElementById(this.parent.config["Ego Div ID"]).innerHTML = String(this.parent.XData.headers) + '\n' + String(this.parent.XData.data)
    }

    _MarkupToX() {
        let ret = []
        for (let row of this.parent.XData.data) {
            let tmp = []
            for (let cell of row) {
                let value = cell
                value = MyMarkDowntoHTML(value)
                tmp.push(value)}
            ret.push(tmp)}
        return ret
    }

    DataAsHTML(pre = "") {
        return pre + 
            HTMLTable_FromConfig({
            tableID: "id-table-" + this.parent.config["Ego Div ID"],
            tableClass: "table",
            tableStyle: "margin-bottom:0;",
            thsText: this.parent.XData.headers,
            thsID: this.parent.XNames.IDs.headers(),
            rowsID: this.parent.XNames.IDs.rows(),
            // cellsText: this.parent.XData.data,
            cellsText: this._MarkupToX(),
            cellsID: this.parent.XNames.IDs.cells(),
        })
    }

}