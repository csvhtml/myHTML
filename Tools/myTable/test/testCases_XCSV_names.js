function test_clsXSCV_Names_egoprefix(myTest) {
    let fname = arguments.callee.name;
    let ted = new clsXCSV(STD_TEST_XCSV_CONFIG)
    
    ted.xAdd(["Header 1", "Header 2"], [["1", "2"],["3", "4"],["5", "6"]], 'North')
    ted.xAdd(["Header 1", "Header 2"], [["1", "2"],["3", "4"],["5", "6"]], 'South')
    myTest.Equal(ted.ItemsNamesList(), ['New', 'North', 'South'], fname)


    let test = [ted.XNames.IDs._egoprefix(1), ted.XNames.IDs._egoprefix("1"), ted.XNames.IDs._egoprefix('North')]
    let expected = ['[North] ', '[North] ', '[North] ']

    myTest.Equal(test, expected, fname)  
}