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
    let test =  [
        [1, 'int'], ['a', 'str'], [true, 'bool'], [[1,2,3], 'list'], [{'a':1, 'b':2}, 'dict'], 
        [null, 'null'], [undefined, 'undefined']
    ]

    for (let t of test) {
        myTest.Equal(BASIS.typOf(t[0]), t[1], arguments.callee.name)}

    myTest.Equal(BASIS.typOf([1,2,3], true), 'list-1D', arguments.callee.name)
    myTest.Equal(BASIS.typOf([[1,2], [3,4]], true), 'list-2D', arguments.callee.name)
}

function test_ListDepth(myTest) {
    myTest.Equal(ListDepth([]), 1, arguments.callee.name)
    myTest.Equal(ListDepth([[]]), 2, arguments.callee.name)
    myTest.Equal(ListDepth([[[]]]), 3, arguments.callee.name)
}

function test_maxx(myTest) {
    myTest.Equal(BASIS.maxx(10,30), 30, arguments.callee.name)
}

function test_minn(myTest) {
    myTest.Equal(BASIS.minn(10,30), 10, arguments.callee.name)
}

function test_wenn(myTest) {

    myTest.Equal(wenn(true, "A", "B"),"A", arguments.callee.name)
    myTest.Equal(wenn(false, "A", "B"),"B", arguments.callee.name)
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

function test_IsEqual(myTest) {
    let test_true = [
        [true, true, true],
        [false, false, true],
        [null, null, true],
        [undefined, undefined, true],
        [1, 1, true],
        ["1", "1", true],
        ["Hello", "Hello", true],
        [[1,2,3], [1,2,3], true],
        [{"A": "Hallo", "B":"Welt"}, {"A": "Hallo", "B":"Welt"}, true],
        [{"A": "Hallo", "B":[1,2,3]}, {"A": "Hallo", "B":[1,2,3]}, true],
        [{"A": "Hallo", "B":{"X":[1,2,3], "Y": [4,5]}}, {"A": "Hallo", "B":{"X":[1,2,3], "Y": [4,5]}}, true],      
    ]

    let test_false = [
        [false, true, false],
        [true, false, false],
        [undefined, null, false],
        [1, 2, false],
        [1, "1", false],
        ["Hello", "World", false],
        [[1,2,3], [1,2], false],
        [[1,2,3], [1,7,3], false],
        [{"A": "Hallo", "B":"Welt"}, {"A": "Hallo"}, false],
        [{"A": "Hallo", "B":"Welt"}, {"A": "Hallo", "C":"Welt"}, false],
        [{"A": "Hallo", "B":"Welt"}, {"A": "Hallo", "B":"World"}, false],
        [{"A": "Hallo", "B":[1,2,3]}, {"A": "Hallo", "B":[1,2,4]}, false],
        [{"A": "Hallo", "B":{"X":[1,2,3], "Y": [4,5]}}, {"A": "Hallo", "B":{"X":[1,2,3], "Y": [44,5]}}, false],
    ]

    for (let t of test_true) {
        myTest.IsTrue(IsEqual(t[0], t[1]), arguments.callee.name)}
    
    for (let t of test_false) {
        myTest.IsFalse(IsEqual(t[0], t[1]), arguments.callee.name)
    
    let iterations = 4
    myTest.IsFalse(IsEqual(
        [[[[1,1],2,3],1],[1,2,3]], 
        [[[[1,1],2,3],1],[1,2,3]], iterations), arguments.callee.name) // Check limitation of iterations 
    }
}

function test_ElementInArrayN(myTest) {
    let listen = [["Mario", "Peach", "Luigi"], ["Bowser", "Koopa"], "Wario"]

    myTest.IsFalse(BASIS.ElementInArrayN(listen, "Daisy"), arguments.callee.name)
    myTest.IsTrue(BASIS.ElementInArrayN(listen, "Peach"), arguments.callee.name)
}

function test_RetStringBetween(myTest) {
    let fname = arguments.callee.name;
    text = "R:1029C:23H:header"

    myTest.Equal(RetStringBetween(text, "R:", "C:"), "1029", fname)
    myTest.Equal(RetStringBetween(text, "R:", ""), "1029C:23H:header", fname)
    myTest.Equal(RetStringBetween(text, "H:", ""), "header", fname)
}

function test_FileNameFromPath(myTest) {
    let fname = arguments.callee.name;

    text = "file:///C:/A/B/World/FileName.pdf"
    myTest.Equal(FileNameFromPath(text), "FileName.pdf", fname)
    text = "file:///C:/A/B/World\\FileName.pdf"
    myTest.Equal(FileNameFromPath(text), "FileName.pdf", fname)
}


function test_PatternsFound_Donts(myTest) {
    let fname = arguments.callee.name;

    let foo = function (a,b) {PatternsInText(a,b)}
    myTest.Assertion(foo, {"a":123, "b":"string"}, fname)
    myTest.Assertion(foo, {"a":"string", "b":"string"}, fname)
    // Patern must be length 2 or length 3
    myTest.Assertion(foo, {"a":"string", "b": ["1"]}, fname)    
    myTest.Assertion(foo, {"a":"string", "b": ["1", "2", "3", "4"]}, fname)

    myTest.IsFalse(PatternsInText(), fname)
    myTest.IsFalse(PatternsInText('something'), fname)
    myTest.IsFalse(PatternsInText(), fname)
}

function test_PatternsFound_Dos2(myTest) {
    let fname = arguments.callee.name;
    let input = "Some Text"; let pattern = ["[", "]"]

    myTest.Equal(PatternsInText(input, pattern), [], fname)

    input = "Some [Text]"
    myTest.Equal(PatternsInText(input, pattern), ['[Text]'], fname)

    input = "[Some:Text] for you"
    myTest.Equal(PatternsInText(input, pattern), ["[Some:Text]"], fname)

    input = "[Some::Text] for you"
    myTest.Equal(PatternsInText(input, pattern), ["[Some::Text]"], fname)

    input = "[Some Text] [for you]"
    myTest.Equal(PatternsInText(input, pattern), ["[Some Text]", "[for you]"], fname)
}


function test_PatternsFound_Dos3(myTest) {
    let fname = arguments.callee.name;
    let input = "Some Text"; let pattern = ["[", "::", "]"]

    myTest.Equal(PatternsInText(input, pattern), [], fname)

    input = "Some [Text]";
    myTest.Equal(PatternsInText(input, pattern), [], fname)

    input = "[Some:Text] for you"; pattern = ["[", ":", "]"]
    myTest.Equal(PatternsInText(input, pattern), ["[Some:Text]"], fname)

    input = "[Some:Text] for you"; pattern = ["[", "::", "]"]
    myTest.Equal(PatternsInText(input, pattern), [], fname)
    
    input = "[Some::Text] for you"; pattern = ["[", "::", "]"]
    myTest.Equal(PatternsInText(input, pattern), ["[Some::Text]"], fname)

    input = "[Some::Text] [for::you]"; pattern = ["[", "::", "]"]
    myTest.Equal(PatternsInText(input, pattern), ["[Some::Text]", "[for::you]"], fname)

    input = "[Some::Text] [for you]"; pattern = ["[", "::", "]"]
    myTest.Equal(PatternsInText(input, pattern), ["[Some::Text]"], fname)

    input = "[Some Text] [for::you]"; pattern = ["[", "::", "]"]
    myTest.Equal(PatternsInText(input, pattern), ["[for::you]"], fname)
}

function test_Markup(myTest) {
    let fname = arguments.callee.name;

    let foo = function (a) {MyMarkDowntoHTML(a)}
    myTest.Assertion(foo, {"a":123}, fname)
    myTest.Assertion(foo, {"a":[1,2,3]}, fname)

    let markup_html = [
        // ["[x] abc [x::y] [y]  [asdsa::acas]", '<input type="checkbox" checked="">abc<input type="checkbox" checked="">'],
        // new line
        ["\n", "<br>"], 
        // links
        ["[A::B]", '<a href="B" target="#">A</a>'],
        ["xxx[A::B]", 'xxx<a href="B" target="#">A</a>'],
        ["xxx[A::B]xxx[A::B]", 'xxx<a href="B" target="#">A</a>xxx<a href="B" target="#">A</a>'],
        // preserve spaces
        [" ", " "],
        ["  ", "&nbsp;&nbsp;"],
        ["   ", "&nbsp;&nbsp;&nbsp;"],
        // Checkboxes
        ["[ ]abc[ ]", '<input type="checkbox">abc<input type="checkbox">'],   // [ ] will not work if data is loaded
        ["[x]abc[x]", '<input type="checkbox" checked="">abc<input type="checkbox" checked="">']

        
]
    
    for (let element of markup_html) {
        myTest.Equal(MyMarkDowntoHTML(element[0]), element[1], fname)
        myTest.Equal(HTMLtoMyMarkdown(element[1]), element[0], fname)
    }
    
}

function test_MarkupSVG(myTest) {
    let fname = arguments.callee.name;
    let markup_html = [
        // pdf icon
        ["[(svg)pdf]", dictSVG['pdf-icon']], 
        ["[(SVG)pdf]", dictSVG['pdf-img']], 
]
    
    for (element of markup_html) {
        myTest.Equal(MyMarkDowntoHTML(element[0]), element[1], fname)
        myTest.Equal(HTMLtoMyMarkdown(element[1]), element[0], fname)
    }
    
}

// #############################################################################################################
// # Prototype tests                                                                                           #
// #############################################################################################################


function proto_listCount(myTest) {
    let liste = ["a", "b", "c", "a", "f", "a"]

    myTest.Equal(liste.count("a"),3, arguments.callee.name)
}

function proto_listRemoveX(myTest) {
    let liste = ["a", "b", "c","e", "f", "g"]
    let expected = ["a", "b", "c", "e", "g"]
    liste.removeX("f")

    myTest.Equal(liste, expected, arguments.callee.name)
}

function proto_listRemoveAll(myTest) {
    let liste = ["a", "b", "c", "e", "f", "c", "c",]
    let expected = ["a", "b", "e", "f"]
    
    liste.removeAll("c")
    myTest.Equal(liste, expected, arguments.callee.name)
}

function proto_listRemoveItems(myTest) {
    let liste = ["a", "b", "c", "e", "f", "c", "c",]
    let expected = ["a", "b", "e"]
    
    liste.removeItems(["c", "f"])
    myTest.Equal(liste, expected, arguments.callee.name)
}

function proto_listToggle(myTest) {
    let liste = ["a", "b", "c", "d"]
    let expected = ["a", "b", "d"]
    
    liste.toggle("c")
    myTest.Equal(liste, expected, arguments.callee.name)

    liste.toggle("c")
    expected = ["a", "b", "d", "c"]
    myTest.Equal(liste, expected, arguments.callee.name)
}

function proto_listPushX(myTest) {
    let liste = ["a", "b", "c", "d"]
    let expected = ["a", "b", "c", "d"]
    
    liste.pushX("b")
    myTest.Equal(liste, expected, arguments.callee.name)

    liste.pushX("z")
    expected = ["a", "b", "c", "d", "z"]
    myTest.Equal(liste, expected, arguments.callee.name)
}

// functionn proto_listPreFix(myTest) {
//     let liste = ["a", "b", "c", "d"]
//     let expected = ["xxa", "xxb", "xxc", "xxd"]
    
//     myTest.Equal(liste.preFix('xx'), expected, arguments.callee.name)
// }

function proto_listApplyToItems(myTest) {
    let func = function (val) {return 'xx'+val}
    
    let liste = ["a", "b", "c", "d"]
    let expected = ["xxa", "xxb", "xxc", "xxd"]
    liste.applyToItems(func)
    myTest.Equal(liste, expected, arguments.callee.name)

    liste = [["a", "b", "c", "d"], ["A"]]
    expected = [["xxa", "xxb", "xxc", "xxd"], ["xxA"]]
    liste.applyToItems(func)
    myTest.Equal(liste, expected, arguments.callee.name)

    // myTest.Equal(liste.preFix('xx'), expected, arguments.callee.name)
}

function proto_insertColum(myTest) {
    let liste = [["1", "2", "3", "4"], ["A", "B", "C", "D"], ["a", "b", "c", "d"]]
    let expected = [["1", "2", "3", "4", "X"], ["A", "B", "C", "D", "X"], ["a", "b", "c", "d", "X"]]
    
    liste.insertColum(["X", "X", "X"])
    myTest.Equal(liste, expected, arguments.callee.name)

    // do nothing in case provided list does not match
    liste.insertColum(["Y", "Y", "Y", "Y"])
    myTest.Equal(liste, expected, arguments.callee.name)

    // do nothing in case ego list is not 2D
    liste = ["X", "X", "X"]
    liste.insertColum(["Y", "Y", "Y"])
    myTest.Equal(liste, ["X", "X", "X"], arguments.callee.name)

}

function proto_stringUntil(myTest) {
    let text = "Hallo Welt"
    let expected = "Hallo"
    
    myTest.Equal(text.until(' '), expected, arguments.callee.name)
    myTest.Equal(text.until(''), text, arguments.callee.name)
}

function proto_stringAfter(myTest) {
    let text = "Hallo Welt da oben"
    
    myTest.Equal(text.after("Welt "), "da oben", arguments.callee.name)
}

function proto_stringCount(myTest) {
    let text = "Hallo Welt"

    myTest.Equal(text.count('l'), 3, arguments.callee.name)
    myTest.Equal(text.count('ll'), 1, arguments.callee.name)
    myTest.Equal(text.count('lll'), 0, arguments.callee.name)

    text = "lorem ipsum darum ipsum warum ipsum usum"
    myTest.Equal(text.count('ipsum'), 3, arguments.callee.name)
}

function proto_stringRepalceN(myTest) {

    myTest.Equal('abababa'.replaceN('a', ''), 'bbb', arguments.callee.name)
    myTest.Equal(' | | | | | | |'.replaceN(' |', '|'), '|||||||', arguments.callee.name)
}

function proto_stringAsList(myTest) {

    myTest.Equal('X'.AsList(5), ['X','X','X','X','X'], arguments.callee.name)
}

function proto_stringTrimPlus1(myTest) {
    test = [
         [' ', ''],
         ['  ', ''],
         ['   ', ''],
         [' Hallo ', 'Hallo'],
         [' Hallo Welt ', 'Hallo Welt'],
         [' Hallo  Welt ', 'Hallo Welt'],
         [' Hallo   Welt ', 'Hallo Welt'],
         [' Hallo \nWelt ', 'Hallo \nWelt'],
    ]

    for (let t of test) {
        myTest.Equal(t[0].trimPlus(), t[1], arguments.callee.name)}
}

function proto_stringTrimPlus2(myTest) {
    test = [
        [' X ', 'X'],
        [' HalXlo ', 'HalXlo'],
        [' Hallo XWelt', 'HalloXWelt'],
        [' Hallo Welt X', 'Hallo WeltX'],
        [' Hallo \nXWelt ', 'Hallo \nXWelt'],
    ]

    for (let t of test) {
        myTest.Equal(t[0].trimPlus([' X']), t[1], arguments.callee.name)}
}

function proto_DOMIsDescendantOf(myTest) {
    let div1 = NewDiv({'type':'div', 'id': 'test-id1-XXX', 'innerHTML': 'test proto 1'})
    let div2 = NewDiv({'type':'div', 'id': 'test-id2', 'innerHTML': 'test proto 2'})
    let div3 = NewDiv({'type':'div', 'id': 'test-id3-XXX', 'innerHTML': 'test proto 3'})
    let div4 = NewDiv({'type':'div', 'id': 'test-id4-XXX', 'innerHTML': 'test proto 4'})

    div2.append(div3)
    div1.append(div2)
    document.body.append(div1)

    let divX = document.getElementById('test-id1-XXX')
    myTest.IsTrue(divX.IsDescendantOf(div1), arguments.callee.name)
    myTest.IsFalse(divX.IsDescendantOf(div2), arguments.callee.name)
    myTest.IsFalse(div4.IsDescendantOf(div1), arguments.callee.name)

    div1.remove()
}

function proto_documentGetElementsWithOnClickEvent(myTest) {
    let div = NewDiv({'type':'div', 'id': 'test-id', 'innerHTML': 'test proto OnClick'})
    div.onclick = function () {console.log("5")}
    document.body.append(div)

    let result = document.getElementsWithOnClickEvent()
    myTest.IsTrue(result.length == 1, arguments.callee.name)
    myTest.IsTrue(div === result[0], arguments.callee.name)
    div.remove()
}

function proto_documentGetElementsByIDSubstring(myTest) {
    let div1 = NewDiv({'type':'div', 'id': 'test-id1-XXX', 'innerHTML': 'test proto substring 1'})
    let div2 = NewDiv({'type':'div', 'id': 'test-id2', 'innerHTML': 'test proto substring 2'})
    let div3 = NewDiv({'type':'div', 'id': 'test-id3-XXX', 'innerHTML': 'test proto substring 3'})
    document.body.append(div1); document.body.append(div2); document.body.append(div3)

    let result = document.getElementsByIDSubstring('XXX')
    myTest.IsTrue(result.length == 2, arguments.callee.name)
    myTest.IsTrue(div1 === result[0], arguments.callee.name)
    myTest.IsTrue(div3 === result[1], arguments.callee.name)
    div1.remove(); div2.remove(); div3.remove()
}

// funcction test_basisjs_Bold(myTest) {
//     let fname = arguments.callee.name;

//     let text = "Hallo Welt"
//     myTest.Equal(Bold(text).outerHTML, "<b>" + text + "</b>",fname)
// }

// funcction test_basisjs_AHREF(myTest) {
//     let fname = arguments.callee.name;

//     let cfg = {
//         id: "id-a-href", 
//         href: 'https://www.google.com/',
//         classList: [],
//         text: "Link to google"
//     }

//     myTest.Equal(IsThereDiv(cfg["id"]), false)
//     DIV(DIV_TESTOUTPUT).append(A_HREF(cfg))
//     myTest.Equal(IsThereDiv(cfg["id"]), true)
// }

// funcction test_basisjs_TextArea(myTest) {
//     let fname = arguments.callee.name;

//     let cfg = {
//         id: "id-textarea", 
//         cols: 50, 
//         rows: 5, 
//         classList: [],
//         value: "Test Value xyz"
//     }

//     myTest.Equal(IsThereDiv(cfg["id"]), false)
//     Append_TextArea(DIV_TESTOUTPUT, cfg)
//     myTest.Equal(IsThereDiv(cfg["id"]), true)
// }

// funcction test_basisjs_Is(myTest) {
//     let fname = arguments.callee.name;

//     let v1 = [1, 2, 3];
//     let v2 = "not an array";
//     let v3 = [];

//     myTest.IsFalse(IsEmptyList(v1),fname)
//     myTest.IsFalse(IsEmptyList(v2),fname)
//     myTest.IsTrue(IsEmptyList(v3),fname)

//     myTest.IsFalse(IsString1(1),fname)
//     myTest.IsFalse(IsString1(""),fname)
//     myTest.IsTrue(IsString1("a"),fname)

// }