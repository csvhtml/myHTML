function test_clsXSCV_Init(myTest) {
    let fname = arguments.callee.name;
    let ted = new clsXCSV("div-id")

    let expectedConfig = {
        'Ego Div ID': "div-id",
        'activeItems': "Default Data"
    }

    myTest.Equal(ted.config, expectedConfig, fname)
    myTest.IsTrue(ted.XData === ted.XItems["Default Data"], fname)
    myTest.Equal(ted.XData.name, "Default Data", fname)
    myTest.Equal(ted.XData.headers,['A', 'B', 'C'], fname)
}

function test_clsXSCV_forAllCellsValue(myTest) {
    let fname = arguments.callee.name;
    let ted = new clsXCSV("div-id")

    ted.XData._forAllCellsValue(function (val) {return val + 'X'})

    let ted2 = new clsXCSV("div-id")
    flag = true
    for (i of [0,1,2]) {
        for (j of [0,1,2]) {
            if (!IsEqual(ted.XData.data[i][j], ted2.XData.data[i][j] + 'X')) {
                flag = false}
        }
    }
    myTest.IsTrue(flag, fname)

    ted.XData.Clear()
    flag = true
    for (i of [0,1,2]) {
        for (j of [0,1,2]) {
            if (!IsEqual(ted.XData.data[i][j], '')) {
                flag = false}
        }
    }
    myTest.IsTrue(flag, fname)
}




//     // new 
//     myTest.Assertion(ted, {}, fname)
//     myTest.Assertion(ted.XData, {}, fname)

//     // Init
//     let foo = function (a,b,c,d) {ted.XData.Init(a,b,c,d)}
//     myTest.Assertion(foo, {}, fname, "Undefined headers")
//     myTest.Assertion(foo, {"a":["A"]}, fname, "Undefined data")
//     myTest.Assertion(foo, {"a":["A"], "b":["A"]}, fname, "DataIs2D failed")
//     myTest.Assertion(foo, {"a":["A"], "b":[["A", "b"]]}, fname, "HeadersData failed")


//     ted = new clsXCSV("div-id", XCSV_DATA)
//     myTest.Equal(ted.XData.headers, null, fname)
//     myTest.Equal(ted.XData.data, null)
//     myTest.Equal(ted.XWorkingItems[XCSV_DATA["WorkingItems"].key(0)].headers, null)
//     myTest.Equal(ted.XWorkingItems[XCSV_DATA["WorkingItems"].key(0)].data, null)
//     ted.XData.Init(["A", "B"], [["1", "11"], ["2", "22"]])
//     myTest.Equal(ted.XData.headers, ["A", "B"])
//     myTest.Equal(ted.XData.data, [["1", "11"], ["2", "22"]])
//     myTest.Equal(ted.XWorkingItems[XCSV_DATA["WorkingItems"].key(0)].headers, ["A", "B"])
//     myTest.Equal(ted.XWorkingItems[XCSV_DATA["WorkingItems"].key(0)].data, [["1", "11"], ["2", "22"]])
    
//     //Clear
//     ted = new clsXCSV("div-id", XCSV_DATA)
//     ted.XData.Init(["A", "B"], [["1", "11"], ["2", "22"]])
//     ted.XData.Clear()
//     myTest.Equal(ted.XData.headers, ["A", "B"])
//     myTest.Equal(ted.XData.data, [["", ""], ["", ""]])
//     myTest.Equal(ted.XWorkingItems[XCSV_DATA["WorkingItems"].key(0)].headers, ["A", "B"])
//     myTest.Equal(ted.XWorkingItems[XCSV_DATA["WorkingItems"].key(0)].data, [["", ""], ["", ""]])

//     //RowsDelete
//     ted = new clsXCSV("div-id", XCSV_DATA)
//     ted.XData.Init(["A", "B"], [["1", "11"], ["2", "22"]])
//     ted.XData.RowsDelete()
//     myTest.Equal(ted.XData.headers, ["A", "B"])
//     myTest.Equal(ted.XData.data, [["", ""]])
//     myTest.Equal(ted.XWorkingItems[XCSV_DATA["WorkingItems"].key(0)].headers, ["A", "B"])
//     myTest.Equal(ted.XWorkingItems[XCSV_DATA["WorkingItems"].key(0)].data, [["", ""]])
