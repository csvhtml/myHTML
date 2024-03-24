class clsXCSV_assert {
    constructor(parent) {
        this.parent = parent

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

    config() {
        assert(this.parent.config.key(0) == "WorkingItems")
        assert(this.parent.config.key(1) == "ConfigItems")
        assert(this.parent.config.key(2) == null)
        assert(this.parent.config["ConfigItems"].key(0) == "Link")
    }
    
    
}