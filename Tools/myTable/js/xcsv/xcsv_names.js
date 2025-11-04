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
        let name = divID.between("[", "]")
        assert(this.parent.XItems.map(item => item.myName).includes(name))
        return name
    }

    ItemsIndex(divID) {
        return this.parent.XItems.map(item => item.myName).indexOf(this.ItemsName(divID))
    }
    
    ItemsIndexFromName(ItemsName) {
        return this.parent.XItems.map(item => item.myName).indexOf(ItemsName)
    }

    headers(ItemsIndex) {
        if (IsUndefined([ItemsIndex])) ItemsIndex = this.parent.XSelection.ActiveItemsIndex()
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
// region Single Names                                            #
// ################################################################

    // MOHI: header name logic to be reworked
    _header(header, ItemsIndex) {
        let idxHeader = this.parent.XItems[ItemsIndex].headers.indexOf(header)
        let X = CLSXCSV_NAMES["id"]["header"]
        return this._egoprefix(ItemsIndex) + X["prefix"] + idxHeader + X["postfix"]
        // return this._egoprefix(ItemsIndex) + X["prefix"] + header + X["postfix"]
    }

    table(ItemsIndexOrName) {
        return this._egoprefix(ItemsIndexOrName) + 'table'
    }

    _cell(r,c,header, ItemsIndex) {
        let X = CLSXCSV_NAMES["id"]["cell"]
        return this._egoprefix(ItemsIndex) + X["r"] + r + X["c"] + c
        // return this._egoprefix(ItemsIndex) + X["r"] + r + X["c"] + c + X["h"] + header 
    }

    _row(r, ItemsIndexOrName) {
        let X = CLSXCSV_NAMES["id"]["row"]
        return this._egoprefix(ItemsIndexOrName) + X["prefix"] + r + X["postfix"]
    }

    _wrapper(ItemsIndexOrName) {
        return this._egoprefix(ItemsIndexOrName) + 'Wrapper'
    }

    _namebox(ItemsIndexOrName) {
        return this._egoprefix(ItemsIndexOrName) + 'Namebox'
    }

    _currentbox(ItemsIndexOrName) {
        return this._egoprefix(ItemsIndexOrName) + 'Currentbox'
    }

    _sidebarItem(ItemsIndexOrName) {
        return this._egoprefix(ItemsIndexOrName) + 'SidebarItem'
    }

    wikiName(ItemsIndexOrName, r) {
        let X = CLSXCSV_NAMES["id"]["wikiName"]
        return this._egoprefix(ItemsIndexOrName) + X["prefix"] + r + X["postfix"]
    }

    wikiDescription(ItemsIndexOrName, r) {
        let X = CLSXCSV_NAMES["id"]["wikiDescription"]
        return this._egoprefix(ItemsIndexOrName) + X["prefix"] + r + X["postfix"]
    }


    _egoprefix(ItemsIndexOrName) {
        assert(!IsUndefined([ItemsIndexOrName]))
        ItemsIndexOrName= NumberX(ItemsIndexOrName) 

        let name = ''
        if (typOf(ItemsIndexOrName) == 'int') name = this.parent.XItems[ItemsIndexOrName].myName
        if (typOf(ItemsIndexOrName) == 'str') name = ItemsIndexOrName
        
        return '[' + name + '] '
    }


// ################################################################
// region Is                                                      #
// ################################################################

    IsItems(divID) {
        let name = divID.between("[", "]")
        let condition1 = this.parent.XItems.map(item => item.myName).includes(name)    // is there a XItems dictionary with the name of the divID
        let condition2 = divID.startsWith("[" + name + "]")

        return condition1 && condition2
    }

    IsHeader(headerID) {
        let ItemsIndex = this.ItemsIndex(headerID)
        if (this.headers(ItemsIndex).includes(headerID)) {
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
        let ItemsIndex = this.ItemsIndex(ID)
        if (this.rows(ItemsIndex).includes(ID)) {
            return true}
        return false
    }

    IsNameBox(ID) {
        for (let i = 0; i< this.parent.XItems.length; i++) {
            if (ID == this._namebox(i))  return true}
        
            return false
    }

    IsCurrentBox(ID) {
        for (let i = 0; i< this.parent.XItems.length; i++) {
            if (ID == this._currentbox(i))  return true}
        
            return false
    }

    IsSidebarItem(ID) {
        for (let i = 0; i< this.parent.XItems.length; i++) {
            if (ID == this._sidebarItem(i))  return true}
        
            return false 
    }

    IsWikiName(ID) {
        for (let i = 0; i< this.parent.XItems.length; i++) {
            for (let r = 0; r < this.parent.XItems[i].data.length; r++) {
                if (ID == this.wikiName(i, r))  return true
            }
        }
        return false
    }

    IsWikiDescription(ID) {
        for (let i = 0; i< this.parent.XItems.length; i++) {
            for (let r = 0; r < this.parent.XItems[i].data.length; r++) {
                if (ID == this.wikiDescription(i, r))  return true
            }
        }
        return false
    }


// ################################################################
// region Ret Index                                               #
// ################################################################

    RC_fromID(divID) {
        assert(this.IsCell(divID) || this.IsRow(divID) || this.IsHeader(divID))

        if (divID.includes(CLSXCSV_NAMES["id"]["header"]["prefix"])) {
            return [-1, this.C_fromHeaderID(divID)]}

        if (divID.includes(CLSXCSV_NAMES["id"]["row"]["prefix"])) {
            return [this.R_fromRowID(divID), -1]}

        return this._RC_fromID(divID)
    }

    _RC_fromID(divID, FirstIndexisOne = false) {
        assert(this.IsCell(divID))

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

    R_fromWikiNameOrDescription(ID) {
        if (!this.IsWikiName(ID) && !this.IsWikiDescription(ID)) return -1
        let X = null
        if (this.IsWikiName(ID)) X = CLSXCSV_NAMES["id"]["wikiName"]
        if (this.IsWikiDescription(ID)) X = CLSXCSV_NAMES["id"]["wikiDescription"]
        
        return Number(RetStringBetween(ID, X["prefix"], X["postfix"]))
    }


// ################################################################
// region parent ID                                               #
// ################################################################

    WrapperID_FromChildID(divID) {
        let idx = this.ItemsIndex(divID)
        return this._wrapper(idx)
    }

    NameBoxID_FromChildID(divID) {
        let idx = this.ItemsIndex(divID)
        return this._namebox(idx)
    }

    NameFromID(divID) {
        return divID.between("[", "]")
    }

    RowID_CellID(divID) {
        let ItemIdx = this.ItemsIndex(divID)
        let RowIdx = Math.max(this.R_fromRowID(divID),0)
        let rowID = this._row(RowIdx, ItemIdx)
        return rowID
    }

}