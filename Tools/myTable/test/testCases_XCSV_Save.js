function test_clsXSCV_AsCSV_HeaderLine(myTest) {
    let fname = arguments.callee.name;
    let ted = new clsXCSV(STD_TEST_XCSV_CONFIG)

    ted.XData.Init(["Header 1", "Header 2"], [["1", "2"],["3", "4"],["5", "6"]], 'test')

    myTest.Equal(ted.XFormat._AsCSV_HeaderLine(),'||Header 1|Header 2\n', fname)
    myTest.Equal(ted.XFormat._AsCSV_RowsLine(),'||1|2\n||3|4\n||5|6\n', fname)

}

function test_clsXSCV_AsCSV_HeaderLine(myTest) {
    let fname = arguments.callee.name;
    let ted = new clsXCSV(STD_TEST_XCSV_CONFIG)

    ted.XData.Init(["Header 1", "Header 2"], [["1", "2"],["3", "4"],["5", "6"]], 'test')

    myTest.Equal(ted.XFormat._AsCSV_HeaderLine(),'||Header 1|Header 2\n', fname)
    myTest.Equal(ted.XFormat._AsCSV_RowsLines(),'||1|2\n||3|4\n||5|6\n', fname)

}