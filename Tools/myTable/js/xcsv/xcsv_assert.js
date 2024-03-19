class clsXCSV_assert {
    constructor(parent) {
        this.parent = parent
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
    
    
}