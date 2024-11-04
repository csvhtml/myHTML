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