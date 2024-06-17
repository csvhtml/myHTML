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