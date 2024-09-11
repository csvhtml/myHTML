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