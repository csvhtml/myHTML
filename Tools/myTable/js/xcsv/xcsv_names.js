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
        let ItemsIndex = this.ItemsIndex(divID)
        let headerName = RetStringBetween(divID, X["prefix"], X["postfix"])
        return Number(this.parent.XItems[ItemsIndex].headers.indexOf(headerName))  
    }
}