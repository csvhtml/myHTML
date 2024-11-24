const STD_TEST_XCSV_CONFIG = {'EgoID': 'id-ID', 'Indicate Selections': false}

function test_clsXSCV_AddRow(myTest) {
    let fname = arguments.callee.name;
    STD_TEST_XCSV_CONFIG['EgoID'] = 'id-ID'
    let ted = new clsXCSV(STD_TEST_XCSV_CONFIG)

    ted.XData.AddRow(["Das", "ist", "gut"])

    myTest.Equal(ted.XData.data[ted.XData.data.length-1], ["Das", "ist", "gut"], fname)
    myTest.Equal(ted.XItems[ted.ActiveIndex()].data[ted.XData.data.length-1], ["Das", "ist", "gut"], fname)    
}

function test_clsXSCV_AddCol(myTest) {
    let fname = arguments.callee.name;
    let ted = new clsXCSV(STD_TEST_XCSV_CONFIG)

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

function test_clsXSCV_DelRow(myTest) {
    let fname = arguments.callee.name;
    let ted = new clsXCSV(STD_TEST_XCSV_CONFIG)

    let headers = byVal(ted.XData.headers)
    let row0 = byVal(ted.XData.data[0])
    let row1 = byVal(ted.XData.data[1])
    let len = ted.XData.data.length

    ted.XData.DelRow()

    myTest.Equal(ted.XData.data.length, len-1, fname)
    myTest.Equal(ted.XData.headers, headers, fname)
    myTest.Equal(ted.XData.data[0], row0, fname)
    myTest.Equal(ted.XData.data[1], row1, fname) 
}

function test_clsXSCV_DelRow_0(myTest) {
    let fname = arguments.callee.name;
    let ted = new clsXCSV(STD_TEST_XCSV_CONFIG)

    let headers = byVal(ted.XData.headers)
    let row1 = byVal(ted.XData.data[1])
    let row2 = byVal(ted.XData.data[2])
    let len = ted.XData.data.length

    ted.XData.DelRow(0)

    myTest.Equal(ted.XData.data.length, len-1, fname)
    myTest.Equal(ted.XData.headers, headers, fname)
    myTest.Equal(ted.XData.data[0], row1, fname)
    myTest.Equal(ted.XData.data[1], row2, fname) 
}

function test_clsXSCV_DelRow_1(myTest) {
    let fname = arguments.callee.name;
    let ted = new clsXCSV(STD_TEST_XCSV_CONFIG)

    let headers = byVal(ted.XData.headers)
    let row0 = byVal(ted.XData.data[0])
    let row2 = byVal(ted.XData.data[2])
    let len = ted.XData.data.length

    ted.XData.DelRow(1)

    myTest.Equal(ted.XData.data.length, len-1, fname)
    myTest.Equal(ted.XData.headers, headers, fname)
    myTest.Equal(ted.XData.data[0], row0, fname)
    myTest.Equal(ted.XData.data[1], row2, fname) 
}

function test_clsXSCV_Del_Col(myTest) {
    let fname = arguments.callee.name;
    let ted = new clsXCSV(STD_TEST_XCSV_CONFIG)

    let DelIndex = ted.XData.headers.length-1   // in case of undefined parameter

    let headers = byVal(ted.XData.headers); headers.splice(DelIndex,1)
    let row0 = byVal(ted.XData.data[0]); row0.splice(DelIndex,1)
    let row1 = byVal(ted.XData.data[1]); row1.splice(DelIndex,1)
    let row2 = byVal(ted.XData.data[2]); row2.splice(DelIndex,1)
    let len = ted.XData.data.length

    ted.XData.DelCol()

    myTest.Equal(ted.XData.data.length, len, fname)
    myTest.Equal(ted.XData.headers, headers, fname)
    myTest.Equal(ted.XData.data[0], row0, fname)
    myTest.Equal(ted.XData.data[1], row1, fname)
    myTest.Equal(ted.XData.data[2], row2, fname) 
}

function test_clsXSCV_Del_Col_X(myTest) {
    let fname = arguments.callee.name;
    let ted = new clsXCSV(STD_TEST_XCSV_CONFIG)

    let DelIndex = [0,1,2]

    for (let idx of DelIndex) {
        let headers = byVal(ted.XData.headers); headers.splice(idx,1)
        let row0 = byVal(ted.XData.data[0]); row0.splice(idx,1)
        let row1 = byVal(ted.XData.data[1]); row1.splice(idx,1)
        let row2 = byVal(ted.XData.data[2]); row2.splice(idx,1)
        let len = ted.XData.data.length
    
        ted.XData.DelCol(idx)
    
        myTest.Equal(ted.XData.data.length, len, fname)
        myTest.Equal(ted.XData.headers, headers, fname)
        myTest.Equal(ted.XData.data[0], row0, fname)
        myTest.Equal(ted.XData.data[1], row1, fname)
        myTest.Equal(ted.XData.data[2], row2, fname) 
    }
}