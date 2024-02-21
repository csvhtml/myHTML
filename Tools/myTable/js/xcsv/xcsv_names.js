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
        this.IDs = new clsXCSV_Names_ID(parent)
    }

    headerID(header) {
        let ret = '[' + this.EgoDivID+ '] '
        ret += LAYOUT_ID['HeaderPrefix'] + header + LAYOUT_ID['HeaderPostfix']
        return ret
    }

    headersID(headers) {
        let ret = []
        for (let h of headers) {
            ret.push(this.headerID(h))
        }
        return ret
    }

    header(from_headerID) {
        return RetStringBetween(from_headerID,LAYOUT_ID['HeaderPrefix'],LAYOUT_ID['HeaderPostfix'])
    }

    headerClasses(header) {
        return [LAYOUT_CLASSNAME['ColPrefix'] + header]
    }

    headersClasses(headers) {
        let ret = []
        for (let h of headers) {
            ret.push(this.headerClasses(h))
        }
        return ret
    }

    headerWidth(header) {
        let w = "15"
        if (header == "No.") {w = "4"}
        if (header == "Name") {w = "15"}
        if (header == "Description") {w = "38"}
        if (header == "Type") {w = "5"}
        if (header == "Tags") {w = "8"}

        return w
        }

    headersWidth(headers) {
            let ret = []
            for (let h of headers) {
                ret.push(this.headerWidth(h))
            }
            return ret
        }
    
    RowID(RowIndexStr) {
        let ret = '[' + this.EgoDivID+ '] '
        ret += LAYOUT_ID['RowPrefix'] + RowIndexStr + LAYOUT_ID['RowPostfix']
        return ret
    }

    RowIDs(RowsCount) {
        let ret = []
        for (let i = 0; i < RowsCount; i++) {
            ret.push(this.RowID(String(i)))
        }
        return ret
    }

    row(from_rowID) {
        return RetStringBetween(from_rowID,LAYOUT_ID['RowPrefix'],LAYOUT_ID['RowsPostfix'])
    }

    CellColsClasses (headers, RowsCount) {
        let ret = []
        let tmp = []
        for (let j = 0; j < RowsCount; j++) {
            tmp = []
            for (let h of headers) {
                tmp.push(this.CellClasses(h))
            }
            ret.push(tmp)
        }
        return ret
    }

    // all cells of a certain col get the following classes
    CellClasses (header) {
        // return [LAYOUT_CLASSNAME['Table'], LAYOUT_CLASSNAME['Cell'], LAYOUT_CLASSNAME['ColPrefix'] + header]
        return [this.CellClass_Table(), this.CellClass_Cell(), this.CellClass_Col(header)]
    }

    // class to identify a cell as being a cell
    CellClass_Cell () {
        return LAYOUT_CLASSNAME['Cell']
        }
    
    // class to identify a cell as part of a table
    CellClass_Table () {
        return LAYOUT_CLASSNAME['Table']
        }

    // class to identify a cell as part of a certain colum
    CellClass_Col (header) {
        return LAYOUT_CLASSNAME['ColPrefix'] + header
    }

}

class clsXCSV_Names_ID {
    constructor(parent) {
        this.parent = parent
    }

    headers() {
        let ret = []
        for (let header of this.parent.XData.headers) {
            ret.push(this._header(header))}
        return ret
    }

    rows() {
        let ret = []; let r = 0
        for (let row of this.parent.XData.data) {
            ret.push(this._row(String(r)))
            r +=1}
        return ret
    }

    cells() {
        let headers = this.parent.XData.headers
        let ret = []; let tmp = []; let r = 0; let c = 0
        for (let row of this.parent.XData.data) {
            tmp = []
            c = 0
            for (let cell of row) {
                tmp.push(this._cell(r,c,headers[c]))
                c +=1}
            ret.push(tmp)
            r +=1}

        return ret
    }

    RowfromCell (divID) {
        let X = CLSXCSV_NAMES["id"]["cell"]
        let r = RetStringBetween(divID, X["r"], X["c"])
        return this._row(r)
    }

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
}