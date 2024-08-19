const DIV_TESTOUTPUT = "id"

function test_BASIS() {
    let myTest = new clsTest()

    // Modify alll in list
    test_NoBlanksInList(myTest)
    test_ByVal(myTest)
    
    myTest.PrintResult(divID = 'id')

    test_basisjs_Bold(myTest)
    test_basisjs_AHREF(myTest)

    test_basisjs_TextArea(myTest)
    
    // basisIs
    test_basisjs_Is(myTest)


}
function test_NoBlanksInList(myTest) {
    let fname = arguments.callee.name;

    let a = ["Hallo Welt", "Das ist ein Test", "   ", " blank "]
    let expected = ["HalloWelt", "DasisteinTest", "", "blank"]
    let result = myTest.Equal(BASIS.NoBlanksInList(a), expected, fname)
    
    new_test_line(fname, DIV_TESTOUTPUT, result)
}

function test_ByVal(myTest) {
    let fname = arguments.callee.name; let result = ""

    // 1D List
    let liste = ["Super", "Mario", "Land"]
    let listeRef = liste
    let listeVal = byVal(liste)
    liste[1] = "Sonic"

    let expectedRef = ["Super", "Sonic", "Land"]
    let expectedVal = ["Super", "Mario", "Land"]
    result += myTest.Equal(listeRef, expectedRef, fname)
    result += myTest.Equal(listeVal, expectedVal, fname)

    // 2D List
    let listeX = ["Super", "Mario", "Land"]; liste = [listeX, listeX, listeX]
    listeRef = liste
    listeVal = byVal(liste)
    listeX[1] = "Sonic"

    expectedRef = [["Super", "Sonic", "Land"], ["Super", "Sonic", "Land"], ["Super", "Sonic", "Land"]]
    expectedVal = [["Super", "Mario", "Land"], ["Super", "Mario", "Land"], ["Super", "Mario", "Land"]]
    result += myTest.Equal(listeRef, expectedRef, fname)
    result += myTest.Equal(listeVal, expectedVal, fname)

    // Dictionary
    let dicct = {"A": "Mario", "B":[1,2,3]}
    let dicctRef = dicct
    let dicctVal = byVal(dicct)
    dicct["A"] = "Wolff"; dicct["B"][0] = 99

    expectedRef = {"A": "Wolff", "B": [99,2,3]}
    expectedVal = {"A": "Mario", "B": [1,2,3]}

    result += myTest.Equal(dicctRef, expectedRef, fname)
    result += myTest.Equal(dicctVal, expectedVal, fname)
    
    new_test_line(fname, DIV_TESTOUTPUT, result)
}

function test_basisjs_Bold(myTest) {
    let fname = arguments.callee.name;
    new_test_line(fname, DIV_TESTOUTPUT)

    let text = "Hallo Welt"
    myTest.Equal(Bold(text).outerHTML, "<b>" + text + "</b>",fname)
}

function test_basisjs_AHREF(myTest) {
    let fname = arguments.callee.name;
    new_test_line(fname, DIV_TESTOUTPUT)

    let cfg = {
        id: "id-a-href", 
        href: 'https://www.google.com/',
        classList: [],
        text: "Link to google"
    }

    myTest.Equal(IsThereDiv(cfg["id"]), false)
    DIV(DIV_TESTOUTPUT).append(A_HREF(cfg))
    myTest.Equal(IsThereDiv(cfg["id"]), true)
}

function test_basisjs_TextArea(myTest) {
    let fname = arguments.callee.name;
    new_test_line(fname, DIV_TESTOUTPUT)

    let cfg = {
        id: "id-textarea", 
        cols: 50, 
        rows: 5, 
        classList: [],
        value: "Test Value xyz"
    }

    myTest.Equal(IsThereDiv(cfg["id"]), false)
    Append_TextArea(DIV_TESTOUTPUT, cfg)
    myTest.Equal(IsThereDiv(cfg["id"]), true)
}

function test_basisjs_Is(myTest) {
    let fname = arguments.callee.name;

    let v1 = [1, 2, 3];
    let v2 = "not an array";
    let v3 = [];

    myTest.IsFalse(IsEmptyList(v1),fname)
    myTest.IsFalse(IsEmptyList(v2),fname)
    myTest.IsTrue(IsEmptyList(v3),fname)

    myTest.IsFalse(IsString1(1),fname)
    myTest.IsFalse(IsString1(""),fname)
    myTest.IsTrue(IsString1("a"),fname)

}