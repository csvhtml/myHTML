function test_clsXSCV_formatHTML_HeaderBox(myTest) {
    let fname = arguments.callee.name; 
    STD_TEST_XCSV_CONFIG['EgoID'] = "id-HeaderBox"
    let ted = new clsXCSV(STD_TEST_XCSV_CONFIG)

    let test = ted.XHTML.HeaderBox(0)
    let [Itemname, Itemheaders, ItemData] = ted.XFormat._NameHeadersData(XCSV_DATA_ITEMS['table'])[0]
    let expected = '<div id="[' + Itemname + '] Namebox" class="NameBox" style="min-width: 100%;">' + Itemname + '</div>'
    
    myTest.Equal(test.outerHTML, expected, fname)  
}

function test_clsXSCV_FormatFile_NameHeadersData(myTest) {
    let id = "id-ID"
    let fname = arguments.callee.name; 
    let ted = new clsXCSV(STD_TEST_XCSV_CONFIG)

    // fix: mak new line befor file seperator readable
    let fileText ='\
        ||||Eins\n\
        ||A|B|C\n\
        ||1|2|3\n\
        ||Hallo|liebe|Welt\n\||||Zwei\n\
        ||X|Y|Z\n\
        ||10|20|30\n\
        ||HalloX|liebeX|WeltX\n\
    '

    let test = ted.XFormat._NameHeadersData(fileText) 
    let expected = [
        ['Eins', ['A', 'B', 'C'], [['1', '2', '3'], ['Hallo', 'liebe', 'Welt']]], 
        ['Zwei', ['X', 'Y', 'Z'], [['10', '20', '30'], ['HalloX', 'liebeX', 'WeltX']]]
    ]
    myTest.Equal(test, expected, fname)   
}