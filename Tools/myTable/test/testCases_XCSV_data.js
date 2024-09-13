function test_clsXSCV_AddRow(myTest) {
    let fname = arguments.callee.name;
    let ted = new clsXCSV("div-id")

    ted.XData.AddRow(["Das", "ist", "gut"])

    myTest.Equal(ted.XData.data[ted.XData.data.length-1], ["Das", "ist", "gut"], fname)
    myTest.Equal(ted.XItems[ted.ActiveIndex()].data[ted.XData.data.length-1], ["Das", "ist", "gut"], fname)    
}

function test_clsXSCV_AddCol(myTest) {
    let fname = arguments.callee.name;
    let ted = new clsXCSV("div-id")

    // ted.XData.AddCol()  // not allowed
    ted.XData.AddCol("newCol 1")
    ted.XData.AddCol("newCol 2", ["Das", "ist", "gut"])

    myTest.Equal(ted.XData.headers, ["A", "B", "C", "newCol 1", "newCol 2"], fname) 
    myTest.Equal(ted.XData.data[0][3], "..", fname) 
    myTest.Equal(ted.XData.data[1][3], "..", fname) 
    myTest.Equal(ted.XData.data[2][3], "..", fname) 
    myTest.Equal(ted.XData.data[0][4], "Das", fname) 
    myTest.Equal(ted.XData.data[1][4], "ist", fname) 
    myTest.Equal(ted.XData.data[2][4], "gut", fname) 
}

function test_clsXSCV_Clear(myTest) {
    let fname = arguments.callee.name;
    let ted = new clsXCSV("div-id")

    myTest.Equal(ted.XData.data[0], ["1","2","3"], fname)
    ted.XData.Clear()
    myTest.Equal(ted.XData.data[0], ["", "", ""], fname)
}

function test_clsXSCV_Config(myTest) {
    let fname = arguments.callee.name;
    let ted = new clsXCSV("id-front 2")


    myTest.Equal(ted.Config(), -1, fname)
    myTest.Equal(ted.Config('test'), -1, fname)
    myTest.Equal(ted.Config({'some key': 'test'}), -1, fname)
    // Intended Use Case 1: get cofig
    myTest.Equal(ted.Config('infoblocks'), null, fname)

    myTest.Equal(ted.Config({'some key': 'test'}), -1, fname)

    // no config shall be allowed to be equal to -1. -1 indicates there no key or some other issue
    myTest.Equal(ted.Config({'infoblocks': -1}), -1, fname)
    myTest.Equal(ted.Config('infoblocks'), null, fname)     /// the line above din not impact the config of infoblocks
    
    // Intended Use Case 2: set config
    ted.Config({'infoblocks': ["div-id"]})
    myTest.Equal(ted.Config('infoblocks'), ["div-id"], fname) 
}