const DIV_TESTOUTPUT = "id-test-output"

function test_basisjs() {
    let myTest = new clsTest()

    test_basisjs_Bold(myTest)
    test_basisjs_AHREF(myTest)

    test_basisjs_TextArea(myTest)
    
    // basisIs
    test_basisjs_Is(myTest)

    myTest.PrintResult()


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