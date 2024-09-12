// ###################################################
// asserts the init parameters (egoDivID and config) 
// makes assert functions available (central handling)
// ###################################################

class clsXCSV_assert {
    constructor(parent) {
        this.parent = parent
        this.name()
    }

    Generic() {
        for (let X of this.parent.XItems) {
            assert(typOf(X.headers, true) == 'list-1D')
            assert(typOf(X.data, true) == 'list-2D')
            assert(typOf(X.name) == 'str')
        }
        assert(this.parent.XData === this.parent.XItems[this.parent.ActiveIndex()])
    }

    Type(type) {
        for (let X of this.parent.XItems) {
            assert(this._TypeX(X, type))}
    }

    _TypeX(XData, type) {
        // verify via headers
        if (XData.headers.length == 1) {
            if (XData.headers[0].startWith('[text]')) assert(type == 'text') 
            if (!XData.headers[0].startWith('[text]')) assert(type == 'gallery') }
        if (XData.headers.length > 1) assert(type == 'table') 
        
        // verify via data (independent)
        if (XData.data.length == 1) {
            if (XData.data[0].length == 1) assert(type == 'text') 
            if (XData.data[0].length > 1) assert(type == 'table') }       // special case of a table with only one row
        if (XData.data.length > 1) {
            if (XData.data[0].length == 1) assert(type == 'gallery') 
            if (XData.data[0].length > 1) assert(type == 'table')   }     
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