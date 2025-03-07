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
        let wrapper = null
        for (let i = 0; i < this.parent.XItems.length; i++) {
            wrapper = this.Wrapper(i)
            wrapper.appendChild(this.HeaderBox(i))
            wrapper.appendChild(this.DataAsDivTable(i))

            // ret += this.HeaderBox(i).outerHTML
            // ret += this.PrintItems(i)
            ret += wrapper.outerHTML
        }
        // return wrapper.outerHTML
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

    Wrapper(idx) {
        let ret = document.createElement('DIV')
        ret.id = this.parent.XNames.IDs._wrapper(idx)
        ret.innerHTML = ''
        ret.className = 'pl-8'
        // ret.style = "min-width:" + XCSV_CONFIG['min-width']+';'

        return ret
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
        let name = shortenString(this.parent.XItems[idx].name,24)
        ret.id = this.parent.XNames.IDs._sidebarItem(idx)
        ret.innerHTML = String(idx+1) + '. ' + name
        ret.className = "flex-container flexDrop"

        if (idx == 0) {
            ret.style.marginTop = "40px"
            return ret}
        let buttonWrapper = NewDiv({id:'id-button-Wrapper'+ name, class:'flex-container flexDown', innerHTML:''})
        let buttonUp = NewDiv({type:'a', id:'id-buttonUp-' + name, innerHTML: '&#8613;', class:'p-0-3 btn'})
        buttonUp.setAttribute('onclick', "MoveUp('" + idx + "')")
        let buttonDown = NewDiv({type:'a', id:'id-buttonDown-' + name, innerHTML: '&#8615;', class:'p-0-3 ml-5 btn'})
        buttonDown.setAttribute('onclick', "MoveDown('" + idx + "')")
        buttonWrapper.appendChild(buttonUp).appendChild(buttonDown)
        // buttonWrapper.style.display = 'none'
        ret.appendChild(buttonWrapper)
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
        let table = this.DataAsDivTable(ItemsIndex)
        return pre + table.outerHTML
    }

    DataAsDivTable(ItemsIndex) {
        let table = HTML_Table({cellsText:this._MarkupToX(ItemsIndex)})
        table.id = "id-table-" + this.parent.XItems[ItemsIndex].name
        table.className = "table"
        table.style = "min-width:" + XCSV_CONFIG['min-width']+';'
        
        table.mySetHeaders(this.parent.XItems[ItemsIndex].headers)
        table.mySetHeadersID(this.parent.XNames.IDs.headers(ItemsIndex))
        // table.mySetHeadersClass() 
        table.mySetRowsID(this.parent.XNames.IDs.rows(ItemsIndex))
        table.mySetCellsID(this.parent.XNames.IDs.cells(ItemsIndex))
        return table
    }

}