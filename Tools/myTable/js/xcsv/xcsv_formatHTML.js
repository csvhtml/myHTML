class clsFormatHTML {
    constructor(parent) {
        this.parent = parent
    }

    
    Print() {
        this.parent.OrderItems()
        document.getElementById(this.parent.config["EgoID"]).innerHTML = this.PrintContent()
        
        this.PrintSidebar()
        
        this.parent.XSelection.unset() 
        
        this.parent.XHISTORY.ShowBars()
    }
    
    PrintContent(prefix = '') {
        let ret = prefix
        for (let i = 0; i < this.parent.XItems.length; i++) {
            ret += this.HeaderBox(i).outerHTML
            ret += this.PrintItems(i)
        }
        return ret
    }

    PrintSidebar() {
        if (this.parent.config["SidebarID"] == null) return

        let ret = ''
        for (let i = 0; i < this.parent.XItems.length; i++) {
            ret += this.SidebarItem(i).outerHTML
        }

        // cant set on elevel higher, since sidebar might not exist
        document.getElementById(this.parent.config["SidebarID"]).innerHTML =  ret
        return 
    }

    PrintItems(idx) {
        if (this.parent.XItems[idx].Type() == 'table') {
            // document.getElementById(this.parent.config["Ego Div ID"]).innerHTML += this.DataAsHTML("", idx)
            return this.DataAsHTML("", idx)}
        
        if (this.parent.XItems[idx].Type() == 'gallery') {
            // document.getElementById(this.parent.config["Ego Div ID"]).innerHTML += this.Gallery(idx)
            return this.Gallery(idx)}

        if (this.parent.XItems[idx].Type() == 'text') {
            // document.getElementById(this.parent.config["Ego Div ID"]).innerHTML += this.Text(idx)
            return this.Text(idx)}
     
    }

    HeaderBox(idx) {
        let ret = document.createElement('DIV')
        ret.id = this.parent.XNames.IDs._namebox(idx)
        ret.innerHTML = this.parent.XItems[idx].name
        ret.className = "NameBox"
        ret.style = "min-width:" + XCSV_CONFIG['min-width']+';'

        return ret
    }

    SidebarItem(idx) {
        let ret = document.createElement('DIV')
        ret.id = this.parent.XNames.IDs._sidebarItem(idx)
        ret.innerHTML = this.parent.XItems[idx].name
        ret.className = ""
        return ret
    }

    _MarkupToX(ItemsIndex) {
        let ret = []
        for (let row of this.parent.XItems[ItemsIndex].data) {
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

    Text(ItemsIndex) {
        assert(this.parent.XItems[ItemsIndex].Type() == 'text')

        return '' +
            HTMLTable_FromConfig({
            tableID: "id-table-" + this.parent.XItems[ItemsIndex].name,
            tableClass: "table xcsv",
            tableStyle: "min-width:" + XCSV_CONFIG['min-width']+';',
            thsText: [this.parent.XItems[ItemsIndex].headers[0].after('[text]')],
            thsID: this.parent.XNames.IDs.headers(ItemsIndex),
            rowsID: this.parent.XNames.IDs.rows(ItemsIndex),
            cellsText: this._MarkupToX(ItemsIndex),
            cellsID: this.parent.XNames.IDs.cells(ItemsIndex),
        })
    }

    DataAsHTML(pre = "", ItemsIndex) {
        let table = HTML_Table({cellsText:this._MarkupToX(ItemsIndex)})
        table.id = "id-table-" + this.parent.XItems[ItemsIndex].name
        table.className = "table"
        table.style = "min-width:" + XCSV_CONFIG['min-width']+';'
        
        table.mySetHeaders(this.parent.XItems[ItemsIndex].headers)
        table.mySetHeadersID(this.parent.XNames.IDs.headers(ItemsIndex))
        // table.mySetHeadersClass() 
        table.mySetRowsID(this.parent.XNames.IDs.rows(ItemsIndex))
        table.mySetCellsID(this.parent.XNames.IDs.cells(ItemsIndex))
        return pre + table.outerHTML
    }

}