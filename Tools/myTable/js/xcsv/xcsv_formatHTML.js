class clsFormatHTML {
    constructor(parent) {
        this.parent = parent
    }

    Print() {
        if (this.parent.XData.Type() == 'table') {
            document.getElementById(this.parent.config["Ego Div ID"]).innerHTML = this.DataAsHTML()
            this.parent.XSelection.unset()}
        
        if (this.parent.XData.Type() == 'gallery') {
            document.getElementById(this.parent.config["Ego Div ID"]).innerHTML = this.Gallery(this.parent.ActiveIndex())
        }
            
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

    Gallery(ItemsIndex) {
        assert(this.parent.XItems[ItemsIndex].Type() == 'gallery')
        let ret = ''
        ret +=  '<b>' + String(this.parent.XItems[ItemsIndex].headers[0]) + '</b><br/>\n' 
        ret += '<div class="image-gallery">'
        for (let item of this.parent.XItems[ItemsIndex].data) {
            ret += '<a href="' + item + '" target = "_blank"><img src="' + item + '"></a>'}
        ret += '</div>'
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