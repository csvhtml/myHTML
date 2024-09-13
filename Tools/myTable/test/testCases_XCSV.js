function test_clsXSCV_Init(myTest) {
    let fname = arguments.callee.name;
    let ted = new clsXCSV("div-id")

    let expectedConfig = {
        'Ego Div ID': "div-id",
        'infoblocks': null,
    }

    myTest.Equal(ted.config, expectedConfig, fname)
    myTest.IsTrue(ted.XData === ted.XItems[0], fname)
    myTest.Equal(ted.XData.name, "Default Data", fname)
    myTest.Equal(ted.XData.headers,['A', 'B', 'C'], fname)
}

function test_clsXSCV_Init2(myTest) {
    let fname = arguments.callee.name;
    let ted = new clsXCSV("div-id")

    ted.XData.Init(["Header 1", "Header 2"], [["1", "2"],["3", "4"],["5", "6"]], 'test')

    myTest.Equal(ted.XData.headers, ["Header 1", "Header 2"], fname)
    myTest.Equal(ted.XData.data, [["1", "2"],["3", "4"],["5", "6"]], fname)
    myTest.Equal(ted.XData.name, 'test', fname)
}


function test_clsXSCV_Type(myTest) {
    let fname = arguments.callee.name;
    let ted = new clsXCSV("id-front 2")

    myTest.Equal(ted.XData.Type(), 'table', fname)

    ted.XData.Init(["Header 1", "Header 2"], [["1", "2"],["3", "4"],["5", "6"]], 'test-table')
    myTest.Equal(ted.XData.Type(), 'table', fname)

    ted.Add(["Header 1"], [["1"], ["2"], ["3"]], 'test-gallery')
    myTest.Equal(ted.XItems[1].Type(), 'gallery', fname)

    ted.Add(["[text]Header 1"], [["1"]], 'test-text')
    myTest.Equal(ted.XItems[2].Type(), 'text', fname)

    myTest.Equal(ted.XData.name, 'test-table', fname)
    myTest.Equal(ted.XData.headers, ["Header 1", "Header 2"], fname)
    myTest.Equal(ted.XData.data, [["1", "2"],["3", "4"],["5", "6"]], fname)
    ted.Activate('test-gallery')
    myTest.Equal(ted.XData.name, "test-gallery", fname)
    myTest.Equal(ted.XData.headers,['Header 1'], fname)


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
