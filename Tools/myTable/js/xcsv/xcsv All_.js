// ################################################################
// class XCSV                                                     #
// ################################################################

class clsXCSV {
        constructor(config) {   
            this.config = this.__config(config)
            this.title = XCSV_DATA_ITEMS['title']

            this.XAssert = new clsXCSV_assert(this)
            this.XFormat = new clsFormatFile(this)
            this.XItems = []
            this.XItems_Baseline = []
            this.XHTML = new clsFormatHTML(this)
            this.XNames = new clsXCSV_Names(this) 
            this.XClick = new clsXCSV_Clickhandler(this)
            this.XSelection = new clsXCSV_Selectionhandler(this)
            this.XInfo = new clsXCSV_Infohandler(this)
            this.XHISTORY = new clsXCSV_ChangeHandler(this)


            // Apply
            this.XFormat.Read(XCSV_DATA_ITEMS['table'].trimPlus([' |'])) 
            this.Activate()
        }

        __config(config) {
            let ret = byVal(XCSV_CONFIG)
            for (let key in config) {
                if (key in ret) {
                    ret[key] = config[key]
                }
            }
            return ret
        }

        ItemsNamesList() {
            return this.XItems.map(item => item.name)}

        ItemsNamesExist(name) {
            if (this.ItemsNamesList().includes(name)) return true
            return false
        }

        ItemNameAvailable(proposal) {
            while (this.ItemsNamesExist(proposal)) {
                proposal += '-copy'
            }
            return proposal
        }

        Config(cfg) {
            let keys = Object.keys(this.config)

            if (typOf(cfg) == 'str')
                if (keys.includes(cfg)) return this.config[cfg]
            if (typOf(cfg) != 'dict') return -1
            for (let k in cfg) {
                if (!keys.includes(k)) return -1
                if (cfg[k] == -1) return -1
                this.config[k] = cfg[k]} // set config
        }

        Activate(name) {
            document.title = this.title

            if (IsUndefined([name])) {
                this.XData = this.XItems[0]; 
                this.XSelection.ActiveItemsName = this.XItems[0].name
                return }
            
            //else
            assert(this.XItems.map(item => item.name).includes(name))
            
            let ItemsIndex = this.XItems.map(item => item.name).indexOf(name)
            this.XSelection.ActiveItemsName = name
            this.XData = this.XItems[ItemsIndex]
        }

        ActiveIndex() {
            let ItemsIndex1 = -2; let ItemsIndex2 = -2
            // Option 1
            ItemsIndex1 = this.XItems.map(item => item.name).indexOf(this.XSelection.ActiveItemsName)


            // Option 2
            for (let i = 0; i < this.XItems.length; i++) {
                if (this.XItems[i] === this.XData) ItemsIndex2 = i}

            assert(ItemsIndex1 == ItemsIndex2)
            return ItemsIndex1
        }

        Title(newTitle) {
            if (newTitle == undefined) return this.title
            this.title = newTitle
            this.Activate()
        }

        Add(headers, data, name) {  // when headers, data are defined, then also gallery and text are added here
            if (IsPartlyUndefined[headers, data, name]) return false       // either compeltey defined or not
            this.xAdd(headers, data, name)
            this.XHTML.Print()
        }

        Add_Text() {
            this.xAdd_Text()
            this.XHTML.Print()
        }

        xAdd_Text() {
            let nhd = this.XFormat._NameHeadersData(XCSV_DATA_ITEMS['text'])
            if (nhd[0])
            this.xAdd(nhd[0][1],nhd[0][2], nhd[0][0])
        }

        Add_Gallery() {
            //
        }

        Remove(ItemsIndex) {
            if (IsUndefined([ItemsIndex])) ItemsIndex = this.ActiveIndex()
            let flag = false
            if (this.XData === this.XItems[ItemsIndex]) flag = true
            this.XItems.splice(ItemsIndex,1)
            if (flag) this.Activate()
            this.XHTML.Print()
        }

        xAdd(headers, data, name, index) {
            let x = new clsData(this)
            let nhd = [[name, headers, data]]
            if (IsUndefined([headers, data, name])) nhd = this.XFormat._NameHeadersData(XCSV_DATA_ITEMS['table'])
            nhd[0][0] = this.ItemNameAvailable(nhd[0][0])
            x.Init(nhd[0][1], nhd[0][2], nhd[0][0])

            if (IsUndefined([index])) index = this.XItems.length
            this.XItems.splice(index, 0, x)
        }
        
        AddRow() {
            this.XHISTORY.Shift(1,0)
            this.XData.AddRow()
            this.XHTML.Print()
        }

        AddCol() {
            let lastHeaderName = this.XData.headers[this.XData.headers.length-1]
            this.XHISTORY.Shift(0,1)
            this.XData.AddCol(lastHeaderName + '-copy')
            this.XHTML.Print()
        }

        DelRow() {
            this.XData.DelRow()
            this.XHTML.Print()
        }

        DelCol() {
            this.XData.DelCol()
            this.XHTML.Print()
        }

        MoveUp(idx) {
            if (idx <1) return
            let tmp = this.XItems[idx-1]
            this._OVERWRTIE_XItem(idx-1, this.XItems[idx])
            this._OVERWRTIE_XItem(idx, tmp)
            this.XHTML.Print()
        }

        MoveDown(idx) {
            if (idx > this.XItems.length-1) return 
            let tmp = this.XItems[idx+1]
            this._OVERWRTIE_XItem(idx+1, this.XItems[idx])
            this._OVERWRTIE_XItem(idx, tmp)
            this.XHTML.Print()
        }

        _OVERWRTIE_XItem(idx, newItem) {
            this.XItems[idx] = newItem
        }

        OrderItems() {
            if (!this.Config('Items Numbering')) return 
            
            // 1a) numbered in one basket, unnumberd in the otehr 
            let retNumberd_Name = []; let retNot_Name = []
            for (let i = 0; i< this.XItems.length; i++) {
                if (this.OrderItems_IsNumbered(this.XItems[i].name)) {
                    retNumberd_Name.push(this.XItems[i].name)
                } else {
                    retNot_Name.push(this.XItems[i].name)
                }
            }

            // prepare new index order
            let sorted_Name = sortByLeadingNumber(retNumberd_Name).concat(retNot_Name)
            let sortedIndexx = []
            
            for (let ItemsName of sorted_Name) {
                sortedIndexx.push(this.XNames.IDs.ItemsIndexFromName(ItemsName))}
            let idx = 0; let XItemsRefCopy = []
            for (let i = 0; i< this.XItems.length; i++) {
                XItemsRefCopy.push(this.XItems[i])}
            
            // actual sorting
            for (let sortedIndex of sortedIndexx) {
                this.XItems[idx] = XItemsRefCopy[sortedIndex]    
                idx += 1
            }
        }


        OrderItems_IsNumbered(name) {
            let NameUntilBlank = name.until(' ')
            return ValidChars('0123456789', NameUntilBlank)
        }
    
    }
// ####################################################################################
// XCSV config                                                                        #
// ####################################################################################

// function XSCV_ItemsNumberingOn() {
//     XCSV["mainX"].Config({'Items Numbering': true})
// }

// function XCSV_ItemsNumberingOff() {
//     XCSV["mainX"].Config({'Items Numbering': false})
// }

// ################################################################
// XCSV - inner config                                            #
// ################################################################

const CLSXCSV_NAMES = {
    "id": {
        "header": {
            "prefix":'header-',
            "postfix": ''
        },
        "cell": {
            "r":'R:',
            "c":'C:',
            "h":'H:',
        },
        "row":{
            "prefix":'row-',
            "postfix": ''
        }
    }
}

// ################################################################
// XCSV - default values                                          #
// ################################################################

const XCSV_DATA_ITEMS = {
    'title': null,

    'table': '\
                ||||New\n\
                ||A|B|C\n\
                ||Bug: When being in a textfield and then going to another in another items (e. g. to copy past), then the other item is active. When i now want to save the ego textfield. >error|2|3\n\
                ||5     Leerzeichen|Neue\nZeile|[(200x100)test/pic2.png]\n\
                ||[ ] leere Checkbox|[x] leere Checkbox|[Link::URL]\n\
    ',
    'text':     '\
                ||||Default Text\n\
                ||[text]Summary\n\
                ||Desciption\n\n\n\n\n.\n\
    ',
    'gallery':     '\
                ||||Default Gallery\n\
                ||Summary\n\
                ||pic1.png,pic2.png,pic3.png\n\
'
}

const XCSV_CONFIG = {
    'EgoID': null,
    'SidebarID': null,
    'InfoIDs': [null,null,null],

    'default value': '..',
    'min-width': '100%',
    'SidebarVisible': true,
    'Items Numbering': false,
}

const XCSV_DATA_DEFAULT_VALUE = '..'

// ###################################################
// asserts the init parameters (egoDivID and config) 
// makes assert functions available (central handling)
// ###################################################

class clsXCSV_assert {
    constructor(parent) {
        this.parent = parent
    }
    
    HeaderIs1D (headers) {
        assert(IsNotUndefined(headers), "Undefined headers")
        // assert(IsListEqualDepth(headers, [1,1]))
        assert(ListDepth(headers) == 1)
    }

    DataIs2D(data) {
        assert(IsNotUndefined(data), "Undefined data")
        // assert(IsListEqualDepth(data, [[1,1],[1,1]]), "DataIs2D failed")
        assert(ListDepth(data) == 2)
    }

    AddRow(atPosition, newRow) {
        assert(-2 < atPosition  && atPosition < this.parent.XData.data.length+1)
        assert(newRow.length == this.parent.XData.headers.length || newRow.length == 0, "values length not equal to data length")}

    AddCol(atPosition, colName, newCol) {
        assert(-2 < atPosition  && atPosition < this.parent.XData.headers.length+1)
        assert(typOf(colName) == "str")
        assert(newCol.length == this.parent.XData.data.length || newCol.length == 0)}

}
class clsXCSV_ChangeHandler {
    constructor(parent) {
            this.parent = parent
            this.log = []
            this.Changes = []
        }

        MarkAsChanged_FromID(divID) {
            let ItemsIndex = this.parent.XNames.IDs.ItemsIndex(divID)
            let RCIndex = this.parent.XNames.IDs.RC_fromID(divID)
            this.MarkAsChanged({ItemsIndex:ItemsIndex, RowIndex:RCIndex[0], ColIndex:RCIndex[1]})
        }

        MarkAsChanged({ItemsIndex= -1, RowIndex = -1, ColIndex = -1}) {
            assert(ItemsIndex >-1 && ColIndex > -1)
            this.Changes.push(this._Change(ItemsIndex, RowIndex, ColIndex))
        }

        UnmarkAll() {
            this.Changes = []
        }

        _Change(ItemsIndex, RowIndex, ColIndex) {
            return {
                'ItemsIndex': ItemsIndex,
                'RowIndex': RowIndex,
                'ColIndex': ColIndex,
                
            }
        }

        //Shifting indexpointers in 'this.Changes' (left right, top, down), e. g. due to addd or delete col
        Shift(rows, cols, fromSelection = true) {
            if (typOf(rows) != 'int' && typOf(cols) != 'int') return 
            // if nothing is selected, then no shift
            if (fromSelection && this.parent.XSelection.Row() == -1 && this.parent.XSelection.Col() == -1) return
            if (fromSelection && this.parent.XSelection.Row() == -1 && rows != 0) return
            if (fromSelection && this.parent.XSelection.Col() == -1 && cols != 0) return
            

            let fromRow = -1; let fromCol = -1
            if (fromSelection) fromRow = this.parent.XSelection.Row() - 1
            if (fromSelection) fromCol = this.parent.XSelection.Col() - 1
            for (let i = 0; i<this.Changes.length; i++) {
                if (this.Changes[i]['RowIndex'] > fromRow) this.Changes[i]['RowIndex'] += rows
                if (this.Changes[i]['ColIndex'] > fromCol) this.Changes[i]['ColIndex'] += cols
                }
        }

        ShowBars() {
            for (let change of this.Changes) {
                let cellID = this.parent.XNames.IDs.cells(change['ItemsIndex'])[change['RowIndex']][change['ColIndex']]
                document.getElementById(cellID).classList.add("vertical-bar-blue")   
            }
        }
    
}
class clsXCSV_Clickhandler {
    constructor(parent) {
            this.parent = parent
        }

    ClickEvent(div) {
        let divID = div.GetParentWithID().id

        if(!this.parent.XNames.IDs.IsItems(divID)) return

        let ItemsName = this.parent.XNames.IDs.ItemsName(divID)
        this.parent.Activate(ItemsName); this.parent.XInfo.Level2(ItemsName)

        if (this.parent.XNames.IDs.IsNameBox(divID)) {
            this._Namebox(divID)
            return}

        if (this.parent.XNames.IDs.IsSidebarItem(divID)) {
            this._SidebarItem(divID)
            return}

        if (this.parent.XNames.IDs.IsHeader(divID)){
            this._HeaderCell(divID)
            return}

        if (this.parent.XNames.IDs.IsCell(divID)){
            this._Cell(divID)
            return}
    }

    _HeaderCell(divID) {
        if (this._AlreadyInFocus(divID)) {
            this.parent.XSelection.unset()
            this.parent.XSelection.set(divID)
            this.parent.XSelection.edit(divID)} 
        else {
            this.parent.XSelection.unset()
            this.parent.XSelection.set(divID)} 
    }

    _Cell(divID) {
        let rowID = this.parent.XNames.IDs.RowfromCellID(divID)
        if (this._AlreadyInFocus(rowID)) {
            this.parent.XSelection.unset()
            this.parent.XSelection.set(divID)
            this.parent.XSelection.edit(divID)}
        else {
            this.parent.XSelection.unset()
            this.parent.XSelection.set(rowID)}  
    }

    _Namebox(divID) {
        if (this._AlreadyInFocus(divID)) {
            this.parent.XSelection.unset()
            this.parent.XSelection.set(divID)
            this.parent.XSelection.edit(divID)}
        else {
            this.parent.XSelection.unset(divID)
            this.parent.XSelection.set(divID)}  
    }

    _SidebarItem(divID) {
        let ItemsIndex = this.parent.XNames.IDs.ItemsIndex(divID)
        let targetnameboxID = this.parent.XNames.IDs._namebox(ItemsIndex)
        this.parent.XSelection.ScrollToitem(targetnameboxID)

        this.parent.XSelection.unset(targetnameboxID)
        this.parent.XSelection.set(targetnameboxID)
    }

    _AlreadyInFocus(divID) {
        return (this.parent.XSelection.currentSelection() == divID)
    }
}
class clsData {
    constructor(parent) {
        this.parent = parent
        this.name = null
        this.headers = null
        this.data = null
    }

    Init(headers, data, name) {
        this.name = name
        this.InitHeaders(headers)
        this.InitData(data)
        this.assertIntegrity()
    }

    Type() {
        this.assertIntegrity()
        let type = ['table', 'gallery', 'text']

        if (this.headers.length == 1) type.removeX('table')                         // a table has at least two colums (but can have only one row)
        if (this.data.length == 1 ) type.removeX('gallery')                         // a gallery has at least two items (one colum, at least two rows)
        if (this.headers.length > 1) type.removeItems(['gallery', 'text'])          // a gallery and a text have only one single header
        if (this.data.length > 1) type.removeItems(['text'])                        // a text and a single item, where the text is (one colum, one row)
        if (this.data[0].length > 1) type.removeItems(['text'])  
        
        this.assertType(type[0])   
        return type[0]
    }

    Clear(val = '') {
        this.data.applyToItems(function() {return val})
    }

    InitHeaders(headers) {
        // Table -> headers is a 1D list, at least two columns
        // Text/Gallery -> headers is a 1D list, with one entry only
        this.parent.XAssert.HeaderIs1D(headers)
        this.headers = headers
    }

    InitData(data) {
        // Table -> Data is a 2D list

        // Gallery -> Data is a 1D list, at least two items

        // Text -> Data is a 1D list, with on entry only
        this.parent.XAssert.DataIs2D(data)
        this.data = data
    }

    AddRow(newRow = []) {
        let atPosition = this.parent.XSelection.Row()       // -1 in case no row is selected
        this.xAddRow(atPosition, newRow)
    }

    xAddRow(atPosition = -1, newRow = []) {
            this.parent.XAssert.AddRow(atPosition, newRow)

            let targetPosition = wenn(atPosition == -1, this.data.length, atPosition)
            let targetRow = wenn(IsEqual(newRow, []), this._DefaultRow(), newRow)
            this.data.splice(targetPosition, 0, targetRow)               
            this._UpdateNumberCol()
    }

    // MOHI: Currently Cols are only puhsed not inserted at certain position
    AddCol(colName, newCol = []) {
        let atPosition = this.parent.XSelection.Col()      
        this.parent.XAssert.AddCol(atPosition, colName, newCol)
        // let targetPosition = wenn(atPosition == -1, this.headers.length, atPosition)
        let targetCol = wenn(IsEqual(newCol, []), this._DefaultCol(), newCol)
        this.headers.push(colName)
        this.data.insertColum(targetCol)
    }

    DelRow(index) {
        if (IsUndefined([index])) index = this.parent.XSelection.Row()
        if (index == -1) index = this.data.length - 1
        this.data.splice(index, 1)
    }

    DelCol(index) {
        if (IsUndefined([index])) index = this.parent.XSelection.Col()
        if (index == -1) index = this.headers.length - 1
        // MOHI
        this.headers.splice(index,1)
        for (let i = 0; i< this.data.length; i++) {
            this.data[i].splice(index, 1)
        }
    }

    ChangeColName(colName, newColname) {
        assert (!IsUndefined([colName, newColname])) 

        let idx = this.headers.indexOf(colName)
        assert(idx > -1)

        this.headers[idx] = newColname
    }

    _DefaultRow() {
        return XCSV_CONFIG['default value'].AsList(this.headers.length)
    }

    _DefaultCol() {     
        return XCSV_CONFIG['default value'].AsList(this.data.length)
    }

    _UpdateNumberCol() {
        if (this.headers.indexOf("No") >-1) {
            let colIdx = this.headers.indexOf("No")
            for (let i = 0; i < this.data.length; i++) {
                this.data[i][colIdx] = String(i+1)}
        }
    }
    
    ColAsList(colName) {
        assert (typOf(colName) == "str")
        assert(this.headers.indexOf(colName)>-1)
        let ret = []

        let idx = this.headers.indexOf(colName)
        for (let row of this.data) {
            ret.push(byVal(row[idx]))}
        return ret
    }


    assertIntegrity() {
            assert(typOf(this.headers, true) == 'list-1D')
            assert(typOf(this.data, true) == 'list-2D')
            assert(typOf(this.name) == 'str')
        }

    assertType(type) {
        // verify via headers
        if (this.headers.length == 1) {
            if (this.headers[0].startsWith('[text]')) assert(type == 'text') 
            if (!this.headers[0].startsWith('[text]')) assert(type == 'gallery') }
        if (this.headers.length > 1) assert(type == 'table') 
        
        // verify via data (independent)
        if (this.data.length == 1) {
            if (this.data[0].length == 1) assert(type == 'text') 
            if (this.data[0].length > 1) assert(type == 'table') }       // special case of a table with only one row
        if (this.data.length > 1) {
            if (this.data[0].length == 1) assert(type == 'gallery') 
            if (this.data[0].length > 1) assert(type == 'table')   }     
    }
}
class clsFormatFile {
    constructor(parent, config) {
        this.parent = parent
        this.config = {
            "file-seperator": "||||",
            "line-starter": "||",
            "cell-seperator": "|",
            "line-end": "\n"        // not used for read in, only for saveAs
        }
    }

    Read(text, title) {
        /**
         * Reads in a text (formatted acc to this.config) and saves its data to the parent
         */
        if (text == undefined) return
        if (!text.startsWith(this.config["file-seperator"])) {
            text = this.config["file-seperator"] + '<define name>' + this.config["line-end"] + text} 
        let textItems = this._NameHeadersData(text)

        this.parent.XItems = [];
        for (let i = 0; i < textItems.length; i++) {
            this.ReadOne(textItems[i])
        }
        
        if (title != undefined) this.parent.title = title

        this.parent.Activate()
    }

    DataAsCSV() {
        /**
         * Parses the data of the parent as a text file
         */
        let ret = '';
        for (let i = 0; i < this.parent.XItems.length; i++) {
            ret += this._AsCSV_NameLine(i)
            ret += this._AsCSV_HeaderLine(i)
            ret += this._AsCSV_RowsLines(i)
        }

        return ret}

    Name(text) {
        if (!text.includes(this.config["file-seperator"])) { 
            return }
        text = text.after(this.config["file-seperator"])
        return text.until('\n').trim()
    }
    
    ReadOne(texttriple) {
        this.parent.xAdd(texttriple[1], texttriple[2], texttriple[0])
    }

    _AsCSV_NameLine(ItemsIndex) {
        let llll = this.config["file-seperator"]
        let n = this.config["line-end"]

        if (IsUndefined([ItemsIndex])) ItemsIndex = 0
        return llll + this.parent.XItems[ItemsIndex].name + n
    }

    _AsCSV_HeaderLine(ItemsIndex) {
        let ll = this.config["line-starter"]
        let l = this.config["cell-seperator"]
        let n = this.config["line-end"]
        let ret = ll 

        if (IsUndefined([ItemsIndex])) ItemsIndex = 0
        for (let header of this.parent.XItems[ItemsIndex].headers) {
            ret += header + l}
        ret = ret.slice(0, -1*l.length) + n
        
        return ret
    }
    
    _AsCSV_RowsLines(ItemsIndex) {
        let ll = this.config["line-starter"]
        let l = this.config["cell-seperator"]
        let n = this.config["line-end"]
        let ret = ""

        if (IsUndefined([ItemsIndex])) ItemsIndex = 0
        for (let row of this.parent.XItems[ItemsIndex].data) {
            ret += ll
            for (let cell of row) {
                ret += cell + l}
            ret = ret.slice(0, -1*l.length) + n}
        
        return ret
    }

    _NameHeadersData(textfile) {
        // return a list of data Items in the following format:
        //
        // [[name, headers, data], [name, headers, data]]

        let textParts = textfile.split('\n' + this.config["file-seperator"]); textParts.removeAll("")
        textParts[0] = textParts[0].after(this.config["file-seperator"])
        
        let ret = []; let triple = []
        for (let textPart of textParts) {
            let name = textPart.until('\n').trim()
            let textPart2 = textPart.substring(textPart.indexOf('\n')+1)
            textPart2 = textPart2.trimPlus([' |'], false)
            let headers_data = this._HeadersData(textPart2)
            triple = [name, headers_data[0], headers_data[1]]
            ret.push(triple)
        }

        return ret
    }

    _HeadersData(textfile) {
        assert(textfile.startsWith(this.config["line-starter"]))

        let lines = textfile.split('\n' + this.config["line-starter"]); lines.removeAll("")
        lines[0] = lines[0].after(this.config["line-starter"])
        for (let i = 0; i< lines.length; i++) {
            lines[i] = lines[i].replace(/\n+$/, '')} // "at the end.\n\n\n" ->"at the end."
        let headers = lines[0]; headers = headers.split(this.config["cell-seperator"])        
        let rows = lines.slice(1)
        let data = []
        for (let row of rows){
            data.push(row.split(this.config["cell-seperator"]))}
    
        return [headers, data]
    }
}
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
        let name = this.parent.XItems[idx].name
        ret.id = this.parent.XNames.IDs._sidebarItem(idx)
        ret.innerHTML = name
        ret.className = "flex-container"

        if (idx == 0) return ret
        let buttonWrapper = NewDiv({id:'id-button-Wrapper'+ name, class:'flex-container', innerHTML:''})
        let buttonUp = NewDiv({type:'a', id:'id-buttonUp-' + name, innerHTML: '&#8613;', class:'p-0-3 btn'})
        buttonUp.setAttribute('onclick', "MoveUp('" + idx + "')")
        let buttonDown = NewDiv({type:'a', id:'id-buttonDown-' + name, innerHTML: '&#8615;', class:'p-0-3 ml-5 btn'})
        buttonDown.setAttribute('onclick', "MoveDown('" + idx + "')")
        buttonWrapper.appendChild(buttonUp).appendChild(buttonDown)
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
class clsXCSV_Infohandler {
    constructor(parent) {
        this.parent = parent
    }

    Level1(msg) {
        if (this.parent.config['InfoIDs'][0] != null) {
            document.getElementById(this.parent.config['InfoIDs'][0]).innerHTML = msg}
        
    }

    Level2(msg) {
        if (this.parent.config['InfoIDs'][1] != null) {
            document.getElementById(this.parent.config['InfoIDs'][1]).innerHTML = msg}
    }

    Level3(msg) {
        if (this.parent.config['InfoIDs'][2] != null) {
            document.getElementById(this.parent.config['InfoIDs'][2]).innerHTML = msg}
    }
}
// ################################################################
// Layout Naming Functions and Config                             #
// ################################################################
// IDs

class clsXCSV_Names {
    constructor(parent) {
        this.parent = parent
        this.IDs = new clsXCSV_Names_ID(parent)
    }

    IsHeader (divID) {
        if (this.IDs.IsHeader(divID)) {
            return true}
        return false
    }

    IsRow (divID) {
        if (this.IDs.IsRow(divID)) {
            return true}
        return false
    }

    IsCell (divID) {
        if (this.IDs.IsCell(divID)) {
            return true}
        return false
    }

    IsNameBox(divID) {
        if (this.IDs.IsNameBox(divID)) {
            return true}
        return false
    }

    }

class clsXCSV_Names_ID {
    constructor(parent) {
        this.parent = parent
    }

    ItemsName(divID) {
        assert(this.IsItems(divID))
        return RetStringBetween(divID, "[", "]")
    }

    ItemsIndex(divID) {
        assert(this.IsItems(divID))

        return this.parent.XItems.map(item => item.name).indexOf(this.ItemsName(divID))
    }
    
    ItemsIndexFromName(ItemsName) {
        return this.parent.XItems.map(item => item.name).indexOf(ItemsName)
    }

    headers(ItemsIndex) {
        if (IsUndefined([ItemsIndex])) ItemsIndex = this.parent.ActiveIndex()
        let ret = []
        for (let header of this.parent.XItems[ItemsIndex].headers) {
            ret.push(this._header(header, ItemsIndex))}
        return ret
    }

    rows(ItemsIndex) {
        if (IsUndefined([ItemsIndex])) ItemsIndex = this.parent.ActiveIndex()
        let ret = []; let r = 0
        for (let row of this.parent.XItems[ItemsIndex].data) {
            ret.push(this._row(String(r), ItemsIndex))
            r +=1}
        return ret
    }

    cells(ItemsIndex) {
        if (IsUndefined([ItemsIndex])) ItemsIndex = this.parent.ActiveIndex()
        let headers = this.parent.XItems[ItemsIndex].headers
        let ret = []; let tmp = []; let r = 0; let c = 0
        for (let row of this.parent.XItems[ItemsIndex].data) {
            tmp = []
            c = 0
            for (let cell of row) {
                tmp.push(this._cell(r,c,headers[c], ItemsIndex))
                c +=1}
            ret.push(tmp)
            r +=1}

        return ret
    }

    RowfromCellID (divID) {
        if (this.IsRow(divID)) {
            return divID}
        let X = CLSXCSV_NAMES["id"]["cell"]
        let r = RetStringBetween(divID, X["r"], X["c"])
        let ItemsIndex = this.ItemsIndex(divID)
        return this._row(r, ItemsIndex)}

// ################################################################
// Single Names                                                   #
// ################################################################

    _header(header, ItemsIndex) {
        let idxHeader = this.parent.XItems[ItemsIndex].headers.indexOf(header)
        let X = CLSXCSV_NAMES["id"]["header"]
        return this._egoprefix(ItemsIndex) + X["prefix"] + idxHeader + X["postfix"]
        // return this._egoprefix(ItemsIndex) + X["prefix"] + header + X["postfix"]
    }

    _cell(r,c,header, ItemsIndex) {
        let X = CLSXCSV_NAMES["id"]["cell"]
        return this._egoprefix(ItemsIndex) + X["r"] + r + X["c"] + c
        // return this._egoprefix(ItemsIndex) + X["r"] + r + X["c"] + c + X["h"] + header 
    }

    _row(r, ItemsIndex) {
        let X = CLSXCSV_NAMES["id"]["row"]
        return this._egoprefix(ItemsIndex) + X["prefix"] + r + X["postfix"]
    }

    _namebox(ItemsIndex) {
        return this._egoprefix(ItemsIndex) + 'Namebox'
    }

    _sidebarItem(ItemsIndex) {
        return this._egoprefix(ItemsIndex) + 'SidebarItem'
    }


    _egoprefix(ItemsIndex) {
        assert(!IsUndefined([ItemsIndex]))
        return '[' + this.parent.XItems[ItemsIndex].name + '] '
    }


// ################################################################
// Is                                                             #
// ################################################################

    IsItems(divID) {
        let name = RetStringBetween(divID, "[", "]")
        let condition1 = this.parent.XItems.map(item => item.name).includes(name)    // is there a XItems dictionary with the name of the divID
        let condition2 = divID.startsWith("[" + name + "]")

        return condition1 && condition2
    }

    IsHeader(headerID) {
        if (this.headers().includes(headerID)) {
            return true}
        return false
    }

    IsCell(cellID) {
        let ItemsIndex = this.ItemsIndex(cellID)
        if (ElementInArrayN(this.cells(ItemsIndex),cellID)) {
            return true}
        return false
    }

    IsRow(ID) {
        if (this.rows().includes(ID)) {
            return true}
        return false
    }

    IsNameBox(ID) {
        for (i = 0; i< this.parent.XItems.length; i++) {
            if (ID == this._namebox(i))  return true}
        
            return false
    }

    IsSidebarItem(ID) {
        for (i = 0; i< this.parent.XItems.length; i++) {
            if (ID == this._sidebarItem(i))  return true}
        
            return false 
    }


// ################################################################
// Return Index                                                   #
// ################################################################

    RC_fromID(divID, FirstIndexisOne = false) {
        if (!this.IsCell(divID)) {assert(false)}

        let X = CLSXCSV_NAMES["id"]["cell"]
        let r = Number(RetStringBetween(divID, X["r"], X["c"]))
        let c = Number(RetStringBetween(divID, X["c"], ''))
        // let c = Number(RetStringBetween(divID, X["c"], X["h"]))
        if (FirstIndexisOne) {
            return [r+1, c+1]}
        return [r, c]
    }

    R_fromRowID(divID, FirstIndexisOne = false) {
        if (!this.IsRow(divID)) {return -1}

        let X = CLSXCSV_NAMES["id"]["row"]
        let ret = Number(RetStringBetween(divID, X["prefix"], X["postfix"])) 
        if (FirstIndexisOne) {
            return ret+1}
        return  ret
    }

    C_fromHeaderID(divID) {
        if (!this.IsHeader(divID)) return -1

        let X = CLSXCSV_NAMES["id"]["header"]
        return Number(RetStringBetween(divID, X["prefix"], X["postfix"]))
    }
}
class clsXCSV_Selectionhandler {
    constructor(parent) {
            this.parent = parent
            this.SelectedID = ""
            this.ActiveItemsName = ""
        }

    // set elemenets inside
    set(divID) {
        // set content
        this.SelectedID = divID
        document.getElementById(divID).classList.add("xcsv-focus","bg-lblue")

        // set sidebar
        let ItemsIndex = this.parent.XNames.IDs.ItemsIndex(divID)
        let targetSidebarItemID = this.parent.XNames.IDs._sidebarItem(ItemsIndex)
        document.getElementById(targetSidebarItemID).classList.add("xcsv-focus","bg-lblue")
        
        // messages
        let X = this.parent.XNames.IDs; let msg = ''
        if (X.IsRow(divID)) {
            msg = "Selected Row: " + String(this.parent.XNames.IDs.R_fromRowID(this.SelectedID, true))
            this.parent.XInfo.Level3(msg); return}
        if (X.IsCell(divID)) {
            msg = "Selected Cell: " + String(this.parent.XNames.IDs.RC_fromID(this.SelectedID, true))
            this.parent.XInfo.Level3(msg); return}
        if (X.IsHeader(divID)) {
            let ItemsIndex = this.parent.XNames.IDs.ItemsIndex(divID)
            msg = "Selected Header: " + this.parent.XItems[ItemsIndex].headers[this.parent.XNames.IDs.C_fromHeaderID(this.SelectedID)]
            this.parent.XInfo.Level3(msg); return}
        if (X.IsNameBox(divID)) {
            let ItemsIndex = this.parent.XNames.IDs.ItemsIndex(divID)
            msg = "Selected Namebox: " + this.parent.XItems[ItemsIndex].headers[this.parent.XNames.IDs.C_fromHeaderID(this.SelectedID)]
            this.parent.XInfo.Level3(msg); return}
    }

    unset() {
        if (this.SelectedID != "") {
            if (document.getElementById(this.SelectedID)) {
                // in case edit is active
                EDIT.Init_Undo()

                //content
                document.getElementById(this.SelectedID).classList.remove("xcsv-focus", "bg-lblue", "myEdit")

                // sidebar
                let ItemsIndex = this.parent.XNames.IDs.ItemsIndex(this.SelectedID)
                let targetSidebarItemID = this.parent.XNames.IDs._sidebarItem(ItemsIndex)
                document.getElementById(targetSidebarItemID).classList.remove("xcsv-focus", "bg-lblue", "myEdit")
            }
        }
        this.SelectedID = ""
        this.parent.XInfo.Level3(this.SelectedID)
    }

    edit(divID) {
        this.SelectedID = divID
        document.getElementById(divID).classList.add("myEdit")
        EDIT.Init()
    }

    currentSelection() {
        return this.SelectedID
    }
    
    Row() {
        let X = this.parent.XNames.IDs
        let id = this.currentSelection()
        return wenn(X.IsRow(id), X.R_fromRowID(id), -1)
    }

    Col() {
        let X = this.parent.XNames.IDs
        let id = this.currentSelection()
        return wenn(X.IsHeader(id), X.C_fromHeaderID(id), -1)
    }

    ScrollToitem(targetID) {
        let namebox = document.getElementById(targetID);
        namebox.scrollIntoView();   // now the namebox is on top, i. e. hidden behidn the navbar. 

        let html = document.documentElement;
        html.scrollTop -= 70;
    }

}
