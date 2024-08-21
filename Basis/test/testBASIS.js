const DIV_TESTOUTPUT = "id"

function test_BASIS() {
    let myTest = new clsTest()

    // Modify alll in list
    test_NoBlanksInList(myTest)
    test_ByVal(myTest)
    test_ValidChars(myTest)
    test_typOf(myTest)
    test_maxx(myTest)
    test_minn(myTest)
    test_IsListEqualSize(myTest)
    test_ElementInArrayN(myTest)

    prototype_listCount(myTest)
    prototype_listRemoveX(myTest)
    prototype_listRemoveAll(myTest)
    prototype_listToggle(myTest)
    prototype_listPushX(myTest)
    prototype_stringUntil(myTest)
    prototype_stringCount(myTest)
    myTest.PrintResult(divID = 'id')

    test_basisjs_Bold(myTest)
    test_basisjs_AHREF(myTest)

    test_basisjs_TextArea(myTest)
    
    // basisIs
    test_basisjs_Is(myTest)


}

function test_NoBlanksInList(myTest) {
    // let fname = arguments.callee.name;
    let a = ["Hallo Welt", "Das ist ein Test", "   ", " blank "]
    let expected = ["HalloWelt", "DasisteinTest", "", "blank"]
    myTest.Equal(BASIS.NoBlanksInList(a), expected, arguments.callee.name)
}

function test_ByVal(myTest) {
    let fname = arguments.callee.name; let result = ""

    // 1D List
    let liste = ["Super", "Mario", "Land"]
    let listeRef = liste
    let listeVal = BASIS.byVal(liste)
    liste[1] = "Sonic"

    let expectedRef = ["Super", "Sonic", "Land"]
    let expectedVal = ["Super", "Mario", "Land"]
    result += myTest.Equal(listeRef, expectedRef, fname)
    result += myTest.Equal(listeVal, expectedVal, fname)

    // 2D List
    let listeX = ["Super", "Mario", "Land"]; liste = [listeX, listeX, listeX]
    listeRef = liste
    listeVal = BASIS.byVal(liste)
    listeX[1] = "Sonic"

    expectedRef = [["Super", "Sonic", "Land"], ["Super", "Sonic", "Land"], ["Super", "Sonic", "Land"]]
    expectedVal = [["Super", "Mario", "Land"], ["Super", "Mario", "Land"], ["Super", "Mario", "Land"]]
    result += myTest.Equal(listeRef, expectedRef, fname)
    result += myTest.Equal(listeVal, expectedVal, fname)

    // Dictionary
    let dicct = {"A": "Mario", "B":[1,2,3]}
    let dicctRef = dicct
    let dicctVal = BASIS.byVal(dicct)
    dicct["A"] = "Wolff"; dicct["B"][0] = 99

    expectedRef = {"A": "Wolff", "B": [99,2,3]}
    expectedVal = {"A": "Mario", "B": [1,2,3]}

    result += myTest.Equal(dicctRef, expectedRef, fname)
    result += myTest.Equal(dicctVal, expectedVal, fname)
}


function test_ValidChars(myTest) {
    myTest.IsFalse(BASIS.ValidChars("abcdefghijklmnopqrstuvxyz", "hallo welt"), arguments.callee.name)
    myTest.IsFalse(BASIS.ValidChars("abcdefghijklmnopqrstuvxyz", "Hallo Welt"), arguments.callee.name)
    myTest.IsTrue(BASIS.ValidChars("abcdefghijklmnopqrstuvxyz HW    ", "Hallo Welt"), arguments.callee.name)
}

function test_typOf(myTest) {
    myTest.Equal(BASIS.typOf(1), 'int', arguments.callee.name)
    myTest.Equal(BASIS.typOf("a"), 'str', arguments.callee.name)
    myTest.Equal(BASIS.typOf(true), 'bool', arguments.callee.name)
    myTest.Equal(BASIS.typOf([1,2,3]), 'list', arguments.callee.name)
    myTest.Equal(BASIS.typOf({"a": 1, "b": 2}), 'dict', arguments.callee.name)
    myTest.Equal(BASIS.typOf([1,2,3], true), 'list-1D', arguments.callee.name)
    myTest.Equal(BASIS.typOf([[1,2], [3,4]], true), 'list-2D', arguments.callee.name)
}

function test_maxx(myTest) {
    myTest.Equal(BASIS.maxx(10,30), 30, arguments.callee.name)
}

function test_minn(myTest) {
    myTest.Equal(BASIS.minn(10,30), 10, arguments.callee.name)
}

function test_IsListEqualSize(myTest) {
    let a = [[1,2], [[3,4],[5,6]]]
    let b = [["1","2"], [["3","4"],["5","6"]]]
    let c = [["1","2"], [["3","4"],["5","6", "7"]]]
    let d = [["1","2"], [["3","4"],["5",["6","7"]]]]

    myTest.IsTrue(BASIS.IsListEqualSize(a,b), arguments.callee.name)
    myTest.IsFalse(BASIS.IsListEqualSize(a,c), arguments.callee.name)
    myTest.IsFalse(BASIS.IsListEqualSize(a,d), arguments.callee.name)
}

function test_ElementInArrayN(myTest) {
    let listen = [["Mario", "Peach", "Luigi"], ["Bowser", "Koopa"], "Wario"]

    myTest.IsFalse(BASIS.ElementInArrayN(listen, "Daisy"), arguments.callee.name)
    myTest.IsTrue(BASIS.ElementInArrayN(listen, "Peach"), arguments.callee.name)
}

function prototype_listCount(myTest) {
    let liste = ["a", "b", "c", "a", "f", "a"]

    myTest.Equal(liste.count("a"),3, arguments.callee.name)
}

function prototype_listRemoveX(myTest) {
    let liste = ["a", "b", "c","e", "f", "g"]
    let expected = ["a", "b", "c", "e", "g"]
    liste.removeX("f")

    myTest.Equal(liste, expected, arguments.callee.name)
}

function prototype_listRemoveAll(myTest) {
    let liste = ["a", "b", "c", "e", "f", "c", "c",]
    let expected = ["a", "b", "e", "f"]
    
    liste.removeAll("c")
    myTest.Equal(liste, expected, arguments.callee.name)
}

function prototype_listToggle(myTest) {
    let liste = ["a", "b", "c", "d"]
    let expected = ["a", "b", "d"]
    
    liste.toggle("c")
    myTest.Equal(liste, expected, arguments.callee.name)

    liste.toggle("c")
    expected = ["a", "b", "d", "c"]
    myTest.Equal(liste, expected, arguments.callee.name)
}

function prototype_listPushX(myTest) {
    let liste = ["a", "b", "c", "d"]
    let expected = ["a", "b", "c", "d"]
    
    liste.pushX("b")
    myTest.Equal(liste, expected, arguments.callee.name)

    liste.pushX("z")
    expected = ["a", "b", "c", "d", "z"]
    myTest.Equal(liste, expected, arguments.callee.name)
}


function prototype_stringUntil(myTest) {
    let text = "Hallo Welt"
    let expected = "Hallo"
    
    myTest.Equal(text.until(' '), expected, arguments.callee.name)
    myTest.Equal(text.until(''), text, arguments.callee.name)
}

function prototype_stringCount(myTest) {
    let text = "Hallo Welt"

    myTest.Equal(text.count('l'), 3, arguments.callee.name)
    myTest.Equal(text.count('ll'), 1, arguments.callee.name)
    myTest.Equal(text.count('lll'), 0, arguments.callee.name)

    text = "lorem ipsum darum ipsum warum ipsum usum"
    myTest.Equal(text.count('ipsum'), 3, arguments.callee.name)
}

function test_basisjs_Bold(myTest) {
    let fname = arguments.callee.name;

    let text = "Hallo Welt"
    myTest.Equal(Bold(text).outerHTML, "<b>" + text + "</b>",fname)
}

function test_basisjs_AHREF(myTest) {
    let fname = arguments.callee.name;

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