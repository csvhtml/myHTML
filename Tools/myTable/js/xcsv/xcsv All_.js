// ################################################################
// class XCSV                                                     #
// ################################################################

class clsXCSV {
        constructor(egoDivID, config) {     
            this.egoDivID = egoDivID
            this.config = config
            this.XAssert = new clsXCSV_assert(this)  // OK

            this.XFormat = new clsFormat(this)  // OK
            this.XWorkingItems = new clsDataCollection(this, "XWorkingItems")  // Skip
            this.XConfigItems = new clsDataCollection(this, "XConfigItems")  // Skip
            this.XData = new clsData(this, this.config["WorkingItems"].key(0), "XWorkingItems", true)   // OPEN -> Test
            
            this.XHTML = new clsHTML(this)  // OK

            this.XNames = new clsXCSV_Names(this)  // OK
            this.XClick = new clsXCSV_Clickhandler(this)  // OK
            this.XSelection = new clsXCSV_Selectionhandler(this)  // OK
        }

        AddRow() {
            this.XData.AddRow()
            this.XHTML.Print()
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

// ###################################################
// asserts the init parameters (egoDivID and config) 
// makes assert functions available (central handling)
// ###################################################

class clsXCSV_assert {
    constructor(parent) {
        this.parent = parent
        this.name()
        this.config()
    }

    HeadersData(headers, data) {
        assert(IsNotUndefined(headers), "Undefined headers")
        assert(IsNotUndefined(data), "Undefined data")
        assert(headers.length == data[0].length, "HeadersData failed")
    }
    
    HeaderIs1D (headers) {
        assert(IsNotUndefined(headers), "Undefined headers")
        assert(IsListEqualDepth(headers, [1,1]))
    }

    DataIs2D(data) {
        assert(IsNotUndefined(data), "Undefined data")
        assert(IsListEqualDepth(data, [[1,1],[1,1]]), "DataIs2D failed")
    }

    name() {
        assert(typOf(this.parent.egoDivID) == "str")
    }

    config() {
        assert(this.parent.config.key(0) == "WorkingItems")
        assert(this.parent.config.key(1) == "ConfigItems")
        assert(this.parent.config.key(2) == null)
        assert(this.parent.config["ConfigItems"].key(0) == "Link")
    }
    
    
}
class clsXCSV_Clickhandler {
    constructor(parent) {
            this.parent = parent
        }

    ClickEvent(div) {
        let divID = ReturnParentUntilID(div).id

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
        this.name = name
        this.headers = null
        this.data = null
        this.functions = {
            "Is": new clsDataIs(this)
        }
        this.config = {
            "ItemsType": ItemsType,  // "XWorkingItems" or "XConfigItems"
            "IsReference" : IsRef,
        }
    }

    Init(headers, data) {
        this.parent.XAssert.HeadersData(headers, data)

        this.InitHeaders(headers)
        this._InitData(data)
    }

    Clear() {
        this._loop(function() {return ""})
    }

    RowsDelete() {
        if (this.config["IsReference"]) {
            this.parent[this.config["ItemsType"]][this.name].data = [[]]
            this._BondIfReference()}
        else {
            this.data = [[]]}
        
        for (let h of this.headers) {
            this.data[0].push("")
        }
    }

    _loop(func) {
        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.data[i].length; j++) {
                this.data[i][j] = func(this.data[i][j]);}
          }
    }

    InitHeaders(headers) {
        this.parent.XAssert.HeaderIs1D(headers)

        if (this.config["IsReference"]) {
            this.parent[this.config["ItemsType"]][this.name].InitHeaders(headers)
            this._BondIfReference()
        } else 
        {
            this.headers = headers
        }
    }

    _InitData(data) {
        this.parent.XAssert.DataIs2D(data)

        if (this.config["IsReference"]) {
            this.parent[this.config["ItemsType"]][this.name]._InitData(data)
            this._BondIfReference()
        } else 
        {
            this.data = data
        }
    }

    _BondIfReference() {
        if (this.config["IsReference"]) {
            this.headers = this.parent[this.config["ItemsType"]][this.name].headers
            this.data = this.parent[this.config["ItemsType"]][this.name].data
        }

    }

    AddRow(newRow = []) {
        if (this.functions.Is.Empty()) {

        }
        let atPosition = this.parent.XSelection.Row()       // -1 in case no row is selected
        this.xAddRow(atPosition, newRow)}

    xAddRow(atPosition = -1, newRow = []) {
            this._xAddRow_assert(atPosition, newRow)
        
            let targetPosition = this._targetPosition(atPosition)
            let targetRow = this._DefaultRow(targetPosition, newRow)
            this.data.splice(targetPosition, 0, targetRow)               
            this._UpdateNumberCol()
        }

    _targetPosition(atPosition) {
        if (atPosition == -1) {
            return this.data.length}
        return atPosition}

        _xAddRow_assert(atPosition, newRow) {
            assert(atPosition > -2, "atPosition index below -1")
            assert(atPosition < this.data.length+1, "atPosition above data length")
            assert(newRow.length == this.headers.length || newRow.length == 0, "values length not equal to data length")}

        _DefaultRow(n = 0, newRow) {    
            if (newRow.length > 0) {
                return newRow}   
            let ret = []      
            for (let col of this.headers) {
                ret.push(this._DefaultVal(col))}
            return ret}

        _DefaultVal(col, n = 0) {
            if (col == "No.") {
                return String(n+1)}
            return ".."}

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
            ret.push(_byVal(row[idx]))}
        return ret
    }
}
class clsDataCollection {
    constructor(parent, ItemsType = "XWorkingItems") {
        this.parent = parent
        assert (["XWorkingItems", "XConfigItems"].indexOf(ItemsType) >-1)

        let Config = {}
        if (ItemsType == "XWorkingItems") {
            Config = this.parent.config["WorkingItems"]}
        if (ItemsType == "XConfigItems") {
            Config = this.parent.config["ConfigItems"]}
        
        
        for (let key of Object.keys(Config)) {
            this[key] = new clsData(parent, key, ItemsType)
            if (ItemsType == "XConfigItems") {
                let hd = this.parent.XFormat._HeadersAndDataFromText(myTrim(Config[key]))
                this[key].Init(hd[0], hd[1])
            }
        }
    }

    CreateConfigItems() {
        for (let key of Object.keys(this)) {
            if (key == "parent") {continue}

            if (key == "Link") {
                this[key].RowsDelete()
                this.CreateItemList_Link(key)}
        }    
    }

    CreateItemList_Link(key) {
        let items = []
        for (let row of this.parent.XData.data) {
            for (let val of row) {
                items = PatternsFound(val,["[", "::", "]"])
                if (items.length > 0) {
                    this.AddLinksToConfigList(items)}}}  // key information actually redundant
    }

    AddLinksToConfigList(items) {
        let key = "Link"
        let name = ""; let descp = ""; let ref = "";let status = "", tags = ""
        for (let item of items) {
            name = RetStringBetween(item, "[", "::")
            descp = RetStringBetween(item, "::", "]") 
            if (this._IsItemInList(key, name)) {
                // do nothing
            } else {
                this[key].AddRow([name, descp])
            }
        }
    } 

    _IsItemInList(key, item) {
        if (this[key].ColAsList("Name").indexOf(item) > -1) {
            return true}
        return false
    }
}
class clsDataIs {
    constructor(parentOne) {
        this.pOne = parentOne
    }

    Empty() {
        if(this.pOne.headers == null && this.pOne.data == nulL) {
            return true}
        return false
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
         * Reads in a text file and saves its data to the parent
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
    
    xRead(text) {
        if (text == undefined) {
            return}
        let files = text.split(this.config["file-seperator"])
        let headers_data = this._HeadersAndDataFromText(files[0])

        this.parent.XData.Init(headers_data[0], headers_data[1])
    }

    _AsCSV_HeaderLine() {
        let ll = this.config["line-starter"]
        let l = this.config["cell-seperator"]
        let n = this.config["line-end"]

        let ret = ll 
        for (let header of this.parent.XData.headers) {
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

    _HeadersAndDataFromText(textfile) {
        let lines = textfile.split(this.config["line-starter"]); lines.removeAll("")
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

    Print(key="data") {
        if (key == "data") {
            this._Print()
            infoblock("Working Items", "m")}
        else {
            this._PrintConfig(key)
            infoblock("Config Items: " + key, "m")
        }
        this.parent.XSelection.unset()
        
    }

    _Print() {
        // document.getElementById(this.parent.egoDivID).innerHTML = HMTL.Table({
        //     tableID: "id-table-" + this.parent.egoDivID,
        //     tableClass: "table",
        //     tableStyle: "margin-bottom:0;",
        //     thsText: this.parent.XData.headers,
        //     thsID: this.parent.XNames.IDs.headers(),
        //     rowsID: this.parent.XNames.IDs.rows(),
        //     // cellsText: this.parent.XData.data,
        //     cellsText: this.DataAsHTML(),
        //     cellsID: this.parent.XNames.IDs.cells(),
        // })

        document.getElementById(this.parent.egoDivID).innerHTML = this.DataAsHTML()
    }

    _PrintConfig(key) {
        this.parent.XSelection.unset()
        document.getElementById(this.parent.egoDivID).innerHTML = HMTL.Table({
            tableID: "id-table-" + this.parent.egoDivID,
            tableClass: "table",
            tableStyle: "margin-bottom:0;",
            thsText: this.parent.XConfigItems["Link"].headers,
            cellsText: this.parent.XConfigItems["Link"].data,

            // thsText: this.parent.XNames.ConfigIDs["Link"].XData.headers,
            thsID: this.parent.XNames.ConfigIDs["Link"].headers(),
            rowsID: this.parent.XNames.ConfigIDs["Link"].rows(),
            
            cellsID: this.parent.XNames.ConfigIDs["Link"].cells(),
        })
    }

    _MarkupToX() {
        let ret = []
        for (let row of this.parent.XData.data) {
            let tmp = []
            for (let cell of row) {
                let value = cell
                value = MyMarkDowntoHTML(value, ["[("])
                value = MyMarkDowntoSVG(value)
                tmp.push(value)}
            ret.push(tmp)}
        return ret
    }

    DataAsHTML(pre = "") {
        return pre + 
            BASIS.HTML.Table.Table({
            tableID: "id-table-" + this.parent.egoDivID,
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
        this.ConfigIDs = {
            "Link": new clsXCSV_Names_ID(parent, this.parent.XConfigItems["Link"])
        }

    }

    IsHeader (divID) {
        if (this.IDs.IsHeader(divID)) {
            return true}
        if (this.ConfigIDs["Link"].IsHeader(divID)) {
            return true}
        return false
    }

    IsRow (divID) {
        if (this.IDs.IsRow(divID)) {
            return true}
        if (this.ConfigIDs["Link"].IsRow(divID)) {
            return true}
        return false
    }

    IsCell (divID) {
        if (this.IDs.IsCell(divID)) {
            return true}
        if (this.ConfigIDs["Link"].IsCell(divID)) {
            return true}
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
        return '[' + this.parent.egoDivID + '] '
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
        if (!this.IsRow(divID)) {assert(false)}

        let X = CLSXCSV_NAMES["id"]["row"]
        let ret = Number(RetStringBetween(divID, X["prefix"], X["postfix"])) 
        if (FirstIndexisOne) {
            return ret+1}
        return  ret
    }

    H_fromHeaderID(divID) {
        if (!this.IsHeader(divID)) {assert(false)}

        let X = CLSXCSV_NAMES["id"]["header"]
        let headerName = RetStringBetween(divID, X["prefix"], X["postfix"])
        return Number(this.XData.headers.indexOf(headerName))  
    }
}
class clsXCSV_Selectionhandler {
    constructor(parent) {
            this.parent = parent
            this.EgoID = ""
        }

    set(divID) {
        this.EgoID = divID
        document.getElementById(divID).classList.add("xcsv-focus","bg-lblue")
        
        let X = this.parent.XNames.IDs
        if (X.IsRow(divID)) {
            infoblock("Selected Row: " + String(this.parent.XNames.IDs.R_fromRowID(this.EgoID, true))); return}
        if (X.IsCell(divID)) {
            infoblock("Selected Cell: " + String(this.parent.XNames.IDs.RC_fromID(this.EgoID, true))); return}
        if (X.IsHeader(divID)) {
            infoblock("Selected Header: " + this.parent.XData.headers[this.parent.XNames.IDs.H_fromHeaderID(this.EgoID)]); return}
        
    }

    unset() {
        if (this.EgoID != "") {
            if (document.getElementById(this.EgoID)) {
                EDIT.Init_Undo()
                document.getElementById(this.EgoID).classList.remove("xcsv-focus", "bg-lblue", "myEdit")
            }
        }
        this.EgoID = ""
        infoblock(this.EgoID)
    }

    edit(divID) {
        this.EgoID = divID
        document.getElementById(divID).classList.add("myEdit")
        EDIT.Init()
    }

    currentSelection() {
        return this.EgoID
    }
    
    Row() {
        if (this.parent.XNames.IDs.IsRow(this.currentSelection())) {
            return this.parent.XNames.IDs.R_fromRowID(this.currentSelection())}
        return -1
    }

}
