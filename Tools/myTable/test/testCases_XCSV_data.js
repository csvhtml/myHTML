function test_clsXSCV_AddRow(myTest) {
    let fname = arguments.callee.name;
    let ted = new clsXCSV("div-id")

    ted.XData.AddRow(["Das", "ist", "gut"])

    myTest.Equal(ted.XData.data[ted.XData.data.length-1], ["Das", "ist", "gut"], fname)
    myTest.Equal(ted.XItems['Default Data'].data[ted.XData.data.length-1], ["Das", "ist", "gut"], fname)    
}