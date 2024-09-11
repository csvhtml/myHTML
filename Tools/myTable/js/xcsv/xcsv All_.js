// ################################################################
// class XCSV                                                     #
// ################################################################

class clsXCSV {
        constructor(egoDivID, config) {   
            this.config = {}  
            this.config["Ego Div ID"] = egoDivID
            // this.config = config
            
            this.XAssert = new clsXCSV_assert(this)  // OK

            this.XFormat = new clsFormat(this)  // OK
            this.config['activeItems'] = this.XFormat.Name(XCSV_DATA_ITEMS)
            this.XItems = {
                [this.config['activeItems']] : new clsData(this, this.config['activeItems'])
            }
            this.XData = this.XItems[this.config['activeItems']]        // internal reference 

            this.XHTML = new clsHTML(this)  // OK

            this.XNames = new clsXCSV_Names(this)  // OK
            this.XClick = new clsXCSV_Clickhandler(this)  // OK
            this.XSelection = new clsXCSV_Selectionhandler(this)  // OK
            this.XInfo = new clsXCSV_Infohandler(this)


            // Apply
            this.__config()
            this.XFormat.Read(XCSV_DATA_ITEMS.trimPlus()) 
        }

        __config() {
            let keys = [
                "Ego Div ID",           // the DOM element id where the content fo this class are printed
                'activeItems',          // the name of the this.XItems (clsdata) that is currently active, i. e. is represented by this.XData
                'infoblocks',           // list of div ids where feedback information from this class shall be dieplayed. Max 3 divs. The first in the list has highest prio.
                                        // Each info has a importance level and will overwrite the innerHTML of that div when it reaches the prio level.
            ]
            for (let k of keys) {
                if (this.config[k] === undefined) this.config[k] = null}
        }

        AddRow() {
            this.XData.AddRow()
            this.XHTML.Print()
        }

        AddCol() {
            let lastHeaderName = this.XData.headers[this.XData.headers.length-1]
            this.XData.AddCol(lastHeaderName + '-copy')
            this.XHTML.Print()
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
    }

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

const XCSV_DATA_ITEMS = '\
            ||||Default Data\n\
            ||A|B|C\n\
            ||1|2|3\n\
            ||5 Leerzeichen|Neue\nZeile|[Link::URL]\n\
            ||[ ] leere Checkbox|[x] leere Checkbox|[Link::URL]\n\
    '

const XCSV_DATA_DEFAULT_VALUE = '..'

// ###################################################
// asserts the init parameters (egoDivID and config) 
// makes assert functions available (central handling)
// ###################################################

class clsXCSV_assert {
    constructor(parent) {
        this.parent = parent
        this.name()
        // this.config()
    }

    HeadersData(headers, data) {
        assert(IsNotUndefined(headers), "Undefined headers")
        assert(IsNotUndefined(data), "Undefined data")
        assert(headers.length == data[0].length, "HeadersData failed")
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

    name() {
        assert(typOf(this.parent.config["Ego Div ID"]) == "str")
    }

    AddRow(atPosition, newRow) {
        assert(-2 < atPosition  && atPosition < this.parent.XData.data.length+1)
        assert(newRow.length == this.parent.XData.headers.length || newRow.length == 0, "values length not equal to data length")}

    AddCol(atPosition, colName, newCol) {
        assert(-2 < atPosition  && atPosition < this.parent.XData.headers.length+1)
        assert(typOf(colName) == "str")
        assert(newCol.length == this.parent.XData.data.length || newCol.length == 0)}

    // config() {
    //     assert(this.parent.config.key(0) == "WorkingItems")
    //     assert(this.parent.config.key(1) == "ConfigItems")
    //     assert(this.parent.config.key(2) == null)
    //     assert(this.parent.config["ConfigItems"].key(0) == "Link")
    // }
    
    
}
class clsXCSV_Clickhandler {
    constructor(parent) {
            this.parent = parent
        }

    ClickEvent(div) {
        // let divID = ReturnParentUntilID(div).id
        let divID = div.GetParentWithID().id

        if (this.parent.XNames.IsHeader(divID)){
            this._HeaderCell(divID)
            return}

        if (this.parent.XNames.IsCell(divID)){
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

    _AlreadyInFocus(divID) {
        return (this.parent.XSelection.currentSelection() == divID)
    }
}
class clsData {
    constructor(parent, name, ItemsType = "XWorkingItems", IsRef = false) {
        this.parent = parent
        this.name = null
        this.headers = null
        this.data = null
    }

    Init(headers, data, name) {
        this.parent.XAssert.HeadersData(headers, data)
        this.name = name
        this.parent.config['activeItems'] = name
        this.InitHeaders(headers)
        this.InitData(data)
        
    }

    Clear(val = '') {
        this.data.applyToItems(function() {return val})
    }

    InitHeaders(headers) {
        this.parent.XAssert.HeaderIs1D(headers)
        this.headers = headers
    }

    InitData(data) {
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

    AddCol(colName, newCol = []) {
        let atPosition = this.parent.XSelection.Col()      
        this.parent.XAssert.AddCol(atPosition, colName, newCol)
        // let targetPosition = wenn(atPosition == -1, this.headers.length, atPosition)
        let targetCol = wenn(IsEqual(newCol, []), this._DefaultCol(), newCol)
        this.headers.push(colName)
        this.data.insertColum(targetCol)
    }

    _DefaultRow() {     
        return XCSV_DATA_DEFAULT_VALUE.AsList(this.headers.length)
    }

    _DefaultCol() {     
        return XCSV_DATA_DEFAULT_VALUE.AsList(this.data.length)
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
}
class clsFormat {
    constructor(parent, config) {
        this.parent = parent
        this.config = {
            "file-seperator": "||||",
            "line-starter": "||",
            "cell-seperator": "|",
            "line-end": "\n"        // not used for read in, only for saveAs
        }
    }

    Read(text) {
        /**
         * Reads in a text (formatted acc to this.config) and saves its data to the parent
         */
        this.xRead(text)}

    DataAsCSV() {
        /**
         * Parses the data of the parent as a text file
         */
        let ret = '';
        ret += this._AsCSV_HeaderLine()
        ret += this._AsCSV_RowsLine()
        return ret}

    Name(text) {
        if (!text.includes(this.config["file-seperator"])) { 
            return }
        text = text.after(this.config["file-seperator"])
        return text.until('\n').trim()
    }
    
    xRead(text) {
        if (text == undefined) {
            return}
        let name = 'X'
        if (text.includes(this.config["file-seperator"])) {
            let files = text.split('\n' + this.config["file-seperator"]); files.removeAll("")
            files[0] = files[0].after(this.config["file-seperator"])
            let textfile = files[0]
            name = textfile.until('\n').trim()
            text = textfile.substring(textfile.indexOf('\n')+1)
            text = text.trimPlus([' |'])}
        
        let headers_data = this._HeadersData(text)

        this.parent.XData.Init(headers_data[0], headers_data[1], name)
        
    }

    _AsCSV_HeaderLine() {
        let ll = this.config["line-starter"]
        let l = this.config["cell-seperator"]
        let n = this.config["line-end"]

        let ret = ll 
        let key = this.parent.config['activeItems']
        for (let header of this.parent.XData.headers) {
            ret += header + l}
        for (let header of this.parent.XItems['active'].headers) {
            ret += header + l}
        ret = ret.slice(0, -1*l.length) + n
        
        return ret
    }
    
    _AsCSV_RowsLine() {
        let ll = this.config["line-starter"]
        let l = this.config["cell-seperator"]
        let n = this.config["line-end"]

        let ret = ""
        for (let row of this.parent.XData.data) {
            ret += ll
            for (let cell of row) {
                ret += cell + l}
            ret = ret.slice(0, -1*l.length) + n}
        
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
class clsHTML {
    constructor(parent) {
        this.parent = parent
    }

    Print() {
        document.getElementById(this.parent.config["Ego Div ID"]).innerHTML = this.DataAsHTML()
        this.parent.XSelection.unset()
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
class clsXCSV_Infohandler {
    constructor(parent) {
        this.parent = parent
    }

    Level1(msg) {
        let infoblocks = this.parent.config['infoblocks']
        if (typOf(infoblocks) == 'list')
            if (infoblocks.length > 0) 
                document.getElementById(infoblocks[0]).innerHTML = msg 
    }

    Level2(msg) {
        let infoblocks = this.parent.config['infoblocks']
        if (typOf(infoblocks) == 'list') {
            if (infoblocks.length > 1) {
                document.getElementById(infoblocks[1]).innerHTML = msg
                return }
            if (infoblocks.length == 1) {
                document.getElementById(infoblocks[0]).innerHTML = msg 
                return }
        }

    }

}
// ################################################################
// Layout Naming Functions and Config                             #
// ################################################################
// IDs

const LAYOUT_ID = {
    "header": {
        "prefix":'header-',
        "postfix": ''
    },
    // ID pattern for table headers:
    // LAYOUT_ID['HeaderPrefix'] + headerString +  LAYOUT_ID['HeaderPostfix']
    'HeaderPrefix': 'header-',
    'HeaderPostfix': '',

    // ID pattern for table rows
    // LAYOUT_ID['RowPrefix'] + rowIndex + LAYOUT_ID['RowPostfix']
    'RowPrefix': 'row:',
    'RowPostfix':'!',

    // ID pattern for table cells:
    // "R:" + rowIndex + "C:" + colIndex + "H:" + headerString
    'CellR': 'R:',
    'CellC': 'C:',
    'CellH': 'H:'
}

const LAYOUT_CLASSNAME = {
    'Table': 'ecsvtable',
    'Cell': 'ecsvcell',
    'ColPrefix': 'col-'
}

class clsXCSV_Names {
    constructor(parent) {
        this.parent = parent
        this.IDs = new clsXCSV_Names_ID(parent, this.parent.XData)
        // this.ConfigIDs = {
        //     "Link": new clsXCSV_Names_ID(parent, this.parent.XConfigItems["Link"])
        // }

    }

    IsHeader (divID) {
        if (this.IDs.IsHeader(divID)) {
            return true}
        // if (this.ConfigIDs["Link"].IsHeader(divID)) {
        //     return true}
        return false
    }

    IsRow (divID) {
        if (this.IDs.IsRow(divID)) {
            return true}
        // if (this.ConfigIDs["Link"].IsRow(divID)) {
        //     return true}
        return false
    }

    IsCell (divID) {
        if (this.IDs.IsCell(divID)) {
            return true}
        // if (this.ConfigIDs["Link"].IsCell(divID)) {
        //     return true}
        return false
    }

    RowfromCellID(divID) {
        if (this.IsRow(divID)) {
            return divID}
        let X = CLSXCSV_NAMES["id"]["cell"]
        let r = RetStringBetween(divID, X["r"], X["c"])
        return this._row(r)}
    }

class clsXCSV_Names_ID {
    constructor(parent, XData) {
        this.parent = parent
        this.XData = XData
    }

    headers() {
        let ret = []
        for (let header of this.XData.headers) {
            ret.push(this._header(header))}
        return ret
    }

    rows() {
        let ret = []; let r = 0
        for (let row of this.XData.data) {
            ret.push(this._row(String(r)))
            r +=1}
        return ret
    }

    cells() {
        let headers = this.XData.headers
        let ret = []; let tmp = []; let r = 0; let c = 0
        for (let row of this.XData.data) {
            tmp = []
            c = 0
            for (let cell of row) {
                tmp.push(this._cell(r,c,headers[c]))
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
        return this._row(r)}

    _header(header) {
        let X = CLSXCSV_NAMES["id"]["header"]
        return this._egoprefix() + X["prefix"] + header + X["postfix"]
    }

    _cell(r,c,header) {
        let X = CLSXCSV_NAMES["id"]["cell"]
        return this._egoprefix() + X["r"] + r + X["c"] + c + X["h"] + header 
    }

    _row(r) {
        let X = CLSXCSV_NAMES["id"]["row"]
        return this._egoprefix() + X["prefix"] + r + X["postfix"]
    }

    _egoprefix() {
        return '[' + this.parent.config["Ego Div ID"] + '] '
    }

    IsHeader(headerID) {
        if (this.headers().includes(headerID)) {
            return true}
        return false
    }

    IsCell(cellID) {
        if (ElementInArrayN(this.cells(),cellID)) {
            return true}
        return false
    }

    IsRow(ID) {
        if (this.rows().includes(ID)) {
            return true}
        return false
    }

    RC_fromID(divID, FirstIndexisOne = false) {
        if (!this.IsCell(divID)) {assert(false)}

        let X = CLSXCSV_NAMES["id"]["cell"]
        let r = Number(RetStringBetween(divID, X["r"], X["c"]))
        let c = Number(RetStringBetween(divID, X["c"], X["h"]))
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
        if (!this.IsHeader(divID)) {return -1}

        let X = CLSXCSV_NAMES["id"]["header"]
        let headerName = RetStringBetween(divID, X["prefix"], X["postfix"])
        return Number(this.XData.headers.indexOf(headerName))  
    }
}
class clsXCSV_Selectionhandler {
    constructor(parent) {
            this.parent = parent
            this.SelectedID = ""
        }

    set(divID) {
        this.SelectedID = divID
        document.getElementById(divID).classList.add("xcsv-focus","bg-lblue")
        
        let X = this.parent.XNames.IDs; let msg = ''
        if (X.IsRow(divID)) {
            msg = "Selected Row: " + String(this.parent.XNames.IDs.R_fromRowID(this.SelectedID, true))
            this.parent.XInfo.Level2(msg); return}
            // infoblock.innerHTML = "Selected Row: " + String(this.parent.XNames.IDs.R_fromRowID(this.SelectedID, true)); return}
        if (X.IsCell(divID)) {
            msg = "Selected Cell: " + String(this.parent.XNames.IDs.RC_fromID(this.SelectedID, true))
            this.parent.XInfo.Level2(msg); return}
            // infoblock.innerHTML = "Selected Cell: " + String(this.parent.XNames.IDs.RC_fromID(this.SelectedID, true)); return}
        if (X.IsHeader(divID)) {
            msg = "Selected Header: " + this.parent.XData.headers[this.parent.XNames.IDs.C_fromHeaderID(this.SelectedID)]
            this.parent.XInfo.Level2(msg); return}
            // infoblock.innerHTML = "Selected Header: " + this.parent.XData.headers[this.parent.XNames.IDs.C_fromHeaderID(this.SelectedID)]; return}
        
    }

    unset() {
        if (this.SelectedID != "") {
            if (document.getElementById(this.SelectedID)) {
                EDIT.Init_Undo()
                document.getElementById(this.SelectedID).classList.remove("xcsv-focus", "bg-lblue", "myEdit")
            }
        }
        this.SelectedID = ""
        this.parent.XInfo.Level2(this.SelectedID)
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



}
