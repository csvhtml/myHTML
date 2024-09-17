function test_clsXSCV_Front_Default_Var2(myTest) {
    let fname = arguments.callee.name;let id = "id-front 1"
    let ted = new clsXCSV(id)
    document.getElementById(id).innerHTML += '<b> ' + fname + '</b>'
    ted.Activate()   
}

function test_clsXSCV_Front_Table(myTest) {
    let fname = arguments.callee.name; let id = "id-front 2"
    let ted = new clsXCSV(id)
    
    ted.Add(["Header 1", "Header 2"], [["1", "2"],["3", "4"],["5", "6"]], 'test-table')
    document.getElementById(id).innerHTML += '<b> ' + fname + '</b>'
    ted.Activate('test-table') 
    myTest.Equal(ted.XData.name, 'test-table', fname)
    myTest.Equal(ted.XData.headers, ["Header 1", "Header 2"], fname)
    myTest.Equal(ted.XData.data, [["1", "2"],["3", "4"],["5", "6"]], fname)  
}

function test_clsXSCV_Front_Gallery(myTest) {
    let fname = arguments.callee.name;let id = "id-front 3"
    let ted = new clsXCSV(id)

    let picList = ["pic1.png", "pic2.png", "pic3.png", "pic1.png", "pic2.png", "pic3.png"]
    picList.convert2()
    myTest.Equal(picList, [["pic1.png"], ["pic2.png"], ["pic3.png"], ["pic1.png"], ["pic2.png"], ["pic3.png"]], fname) // just for undersanding what convert2 does

    document.getElementById(id).innerHTML += '<b> ' + fname + '</b>'
    ted.Add(["My Gallery"], picList, 'test-gallery')
    myTest.Equal(ted.XItems[1].Type(), 'gallery', fname)
    myTest.Equal(ted.XItems[1].name, "test-gallery", fname)
    myTest.Equal(ted.XItems[1].headers,['My Gallery'], fname)
    
    myTest.IsFalse(ted.XItems[1] === ted.XData, fname)
    ted.Activate('test-gallery')
    myTest.IsTrue(ted.XItems[1] === ted.XData, fname)

}