class clsFormatHTML {
    constructor(parent) {
        this.parent = parent
        this.Item = new clsFormatHTML_Item(this.parent)
    }
    
    Print() {
        let _PRINT = new _clsPrintHTML(this.parent)
        _PRINT.ClearContent()

        let contentDiv = _PRINT.XItemsAsContentDiv("id-main")
        document.getElementById(this.parent.config["EgoID"]).appendChild(contentDiv)
        document.title = "XSV: "  + this.parent.title
        this.parent.XSelection.Indicate()

        PROXY.EDITABLE()
        
        PROXY.USERCLICK_Init()

        document.getElementById("id-main").firstElementChild.addEventListener('scroll', CheckDivVisibility);
        
        this.parent.XHISTORY.ShowBars()
    }

    _SidebarData() {
        let ret = []
        for (let i = 0; i < this.parent.XItems.length; i++) {
            ret.push(this.parent.XItems[i].Name_ChildrenNames())
        }
        return ret
    }

 

    SetViewMode(typ) {
        assert(['tables', 'wiki', 'table', 'items'].includes(typ))
        XCSV_CONFIG['ContentStyle'] = typ
        this.Print()
    }


}




// region Print

class _clsPrintHTML {
    //collection of functions to print HTML
    constructor(parent) {
        this.parent = parent
    }

    ClearContent() {
        document.getElementById(this.parent.config["EgoID"]).innerHTML = ''
    }

    XItemsAsContentDiv(targetID) {
        let retNode = document.createElement('div')
        if (targetID != undefined) retNode.id = targetID
        let wrapper = null; let appender = null
        let style = XCSV_CONFIG['ContentStyle']
        for (let i = 0; i < this.parent.XItems.length; i++) {
            if (style == 'tables') appender = this._DataAsDivTable(i)
            if (style == 'wiki') appender = this._DataAsWiki(i)
                
            wrapper = this._Wrapper(i)
            wrapper.appendChild(this._HeaderBox(i))
            wrapper.appendChild(appender)

            retNode.appendChild(wrapper)
        }

        this._MarkupToHTML(retNode)
        return retNode
    }

    _Wrapper(idx) {
        let ret = document.createElement('DIV')
        ret.id = this.parent.XNames.IDs._wrapper(idx)
        ret.innerHTML = ''
        ret.className = 'ContentWrapper pl-8 mb-30 js-event'
        // UIN.addEventListeners(ret)
        return ret
    }

    _HeaderBox(idx) {
        let ret = document.createElement('DIV')
        ret.id = this.parent.XNames.IDs._namebox(idx)
        ret.innerHTML = this.parent.XItems[idx].myName
        ret.className = "js-event js-edit NameBox py-12 px-15"
        ret.style = "min-width:" + XCSV_CONFIG['min-width']+';'
        // UIN.addEventListeners(ret)
        return ret
    }


    _DataAsDivTable(ItemsIndex) {
        let data = this.parent.XItems[ItemsIndex].data
        // let table = HTML_Table({cellsText:this._MarkupToX(ItemsIndex)})

        let table = HTML_Table({cellsText:data})
        table.id = this.parent.XNames.IDs.table(ItemsIndex)
        table.className = "tableStyle-01 ItemsTable"
        table.style = "min-width:" + XCSV_CONFIG['min-width']+';'
        
        table.bSetHeaders(this.parent.XItems[ItemsIndex].headers)
        table.bSetHeadersID(this.parent.XNames.IDs.headers(ItemsIndex))
       
        table.bSetRowsID(this.parent.XNames.IDs.rows(ItemsIndex))
        table.bSetCellsID(this.parent.XNames.IDs.cells(ItemsIndex))

        table.bAddClassToCells('cell js-edit js-event', true);

        if (cSITE["colorTheme"] == 'dark')  table.bSetRowsClass('dark-2') 
        return table
    }

    // takes only the data of the header 'name' and 'description' and creates a 
    // div with the name as h2 and the description as p
    _DataAsWiki(ItemsIndex) {
        let ret = document.createElement('div')
        let table = this._DataAsDivTable(ItemsIndex)
        let nameIndex = table.b_HeaderIndex("name");
        let descriptionIndex = table.b_HeaderIndex("description");
        for (let i = 1; i < table.rows.length; i++) {
            let row = table.rows[i]
            
            let divName = document.createElement('div')
            divName.innerHTML = row.cells[nameIndex].innerHTML
            divName.id = this.parent.XNames.IDs.wikiName(ItemsIndex, i-1)
            divName.className = 'h3-m0 wiki-name cell js-edit js-event px-12 py-6'
            // divName.innerHTML += new MyMarkDown().toHTML('## ' + row.cells[nameIndex].innerText + '\n')
            // divName.innerHTML = divName.innerHTML.until('<br'); divName.className = 'wiki-name'
            
            let divDescription = document.createElement('div')
            divDescription.innerHTML += row.cells[descriptionIndex].innerHTML;
            divDescription.id = this.parent.XNames.IDs.wikiDescription(ItemsIndex, i-1)
            divDescription.className = 'wiki-description cell js-edit js-event px-12 py-6'

            let divhorizontal = document.createElement('hr')
            divhorizontal.className = 'fade-grey mb-12'

            let divNameDescription = document.createElement('div')

            // ret.appendChild(divName)
            // ret.appendChild(divDescription)
            // ret.appendChild(divhorizontal)
            divNameDescription.appendChild(divName)
            divNameDescription.appendChild(divDescription)
            ret.appendChild(divNameDescription)
            ret.appendChild(divhorizontal)
        }
        return ret
    }

    _MarkupToHTML(div)  {
        let cells = div.querySelectorAll('.cell');
        for (let cell of cells) {
            cell.innerHTML = clsMarkDown.toHTML(cell.innerHTML);
        }
        return div;
    }

}

