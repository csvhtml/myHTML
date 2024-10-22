function test_clsXSCV_Init(myTest) {
    let fname = arguments.callee.name;
    let ted = new clsXCSV("div-id")

    myTest.IsTrue(ted.XData === ted.XItems[0], fname)
    myTest.Equal(ted.XData.name, "New", fname)
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
    let ted = new clsXCSV("id-X")

    myTest.Equal(ted.XData.Type(), 'table', fname)

    ted.XData.Init(["Header 1", "Header 2"], [["1", "2"],["3", "4"],["5", "6"]], 'test-table')
    myTest.Equal(ted.XData.Type(), 'table', fname)

    ted.xAdd(["Header 1"], [["1"], ["2"], ["3"]], 'test-gallery')
    myTest.Equal(ted.XItems[1].Type(), 'gallery', fname)

    ted.xAdd(["[text]Header 1"], [["1"]], 'test-text')
    myTest.Equal(ted.XItems[2].Type(), 'text', fname)
}

function test_clsXSCV_ItemNameAvailable(myTest) {
    let fname = arguments.callee.name;
    let ted = new clsXCSV("id-X")

    ted.xAdd(["Header 1", "Header 2"], [["1", "2"],["3", "4"],["5", "6"]], 'test-table')
    ted.xAdd(["Header 1", "Header 2"], [["1", "2"],["3", "4"],["5", "6"]], 'test-table')
    ted.xAdd(["Header 1", "Header 2"], [["1", "2"],["3", "4"],["5", "6"]], 'test-table')
    myTest.Equal(ted.ItemsNamesList(), ['New', 'test-table', 'test-table-copy', 'test-table-copy-copy'], fname)
}