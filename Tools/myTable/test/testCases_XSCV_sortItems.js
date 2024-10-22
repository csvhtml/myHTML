function test_clsXSCV_Sort(myTest) {
    let fname = arguments.callee.name;
    let ted = new clsXCSV("div-id")

    ted.xAdd()
    ted.xAdd_Text()
    ted.xAdd_Text()
    myTest.Equal(ted.ItemsNamesList(), ['New', 'New-copy', 'Default Text', 'Default Text-copy'], fname)
    ted.XItems[2].name = "1 " + ted.XItems[2].name
    myTest.Equal(ted.ItemsNamesList(), ['New', 'New-copy', '1 Default Text', 'Default Text-copy'], fname)

    ted.Config({'Items Numbering': true})
    ted.OrderItems()
    myTest.Equal(ted.ItemsNamesList(), ['1 Default Text', 'New', 'New-copy', 'Default Text-copy'], fname)
}

function test_clsXSCV_Sort2(myTest) {
    let fname = arguments.callee.name;
    let ted = new clsXCSV("div-id")

    ted.xAdd()
    ted.xAdd_Text()
    ted.xAdd_Text()
    myTest.Equal(ted.ItemsNamesList(), ['New', 'New-copy', 'Default Text', 'Default Text-copy'], fname)
    ted.XItems[2].name = "1 " + ted.XItems[2].name
    ted.XItems[0].name = "10 " + ted.XItems[0].name
    myTest.Equal(ted.ItemsNamesList(), ['10 New', 'New-copy', '1 Default Text', 'Default Text-copy'], fname)

    ted.Config({'Items Numbering': true})
    ted.OrderItems()
    myTest.Equal(ted.ItemsNamesList(), ['1 Default Text', '10 New', 'New-copy', 'Default Text-copy'], fname)
}

function test_clsXSCV_SubTest(myTest) {
    let fname = arguments.callee.name;
    let ted = new clsXCSV("div-id")
    
    myTest.IsTrue(ted.OrderItems_IsNumbered("1 Hallo"), fname)
    myTest.IsTrue(ted.OrderItems_IsNumbered("100 Hallo"), fname)
    myTest.IsFalse(ted.OrderItems_IsNumbered("1Hallo"), fname)
    myTest.IsFalse(ted.OrderItems_IsNumbered("Hallo"), fname)
}