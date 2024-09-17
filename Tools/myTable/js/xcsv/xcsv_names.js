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

    _header(header, ItemsIndex) {
        let X = CLSXCSV_NAMES["id"]["header"]
        return this._egoprefix(ItemsIndex) + X["prefix"] + header + X["postfix"]
    }

    _cell(r,c,header, ItemsIndex) {
        let X = CLSXCSV_NAMES["id"]["cell"]
        return this._egoprefix(ItemsIndex) + X["r"] + r + X["c"] + c + X["h"] + header 
    }

    _row(r, ItemsIndex) {
        let X = CLSXCSV_NAMES["id"]["row"]
        return this._egoprefix(ItemsIndex) + X["prefix"] + r + X["postfix"]
    }

    _egoprefix(ItemsIndex) {
        assert(!IsUndefined([ItemsIndex]))
        // return '[' + this.parent.config["Ego Div ID"] + '] '
        return '[' + this.parent.XItems[ItemsIndex].name + '] '
    }

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
        if (!this.IsHeader(divID)) return -1

        let X = CLSXCSV_NAMES["id"]["header"]
        let ItemsIndex = this.ItemsIndex(divID)
        let headerName = RetStringBetween(divID, X["prefix"], X["postfix"])
        return Number(this.parent.XItems[ItemsIndex].headers.indexOf(headerName))  
    }
}