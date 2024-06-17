
function test_Basis(myTest) {
    test_PatternsFound3(myTest)
    test_IsBetween(myTest)
    test_Markup(myTest)
    test_SVG(myTest)
}

function test_PatternsFound3(myTest) {
    let fname = arguments.callee.name;

    //PatternsFound3
    let foo = function (a,b) {PatternsFound(a,b)}
    myTest.Assertion(foo, {}, fname, "a not str")
    myTest.Assertion(foo, {"a":"string", "b":"string"}, fname, "b not list")
    myTest.Assertion(foo, {"a":"string", "b": ["]"]}, fname, "b not length 2 or 3")
    myTest.NoAssertion(foo, {"a":"string [str]"}, fname)
    myTest.NoAssertion(foo, {"a":"string [str]", "b":["[", ":", "]"]}, fname)
    let input = ""; let pattern = ""


    input = "Some Text";
    myTest.Equal(PatternsFound(input), [], fname)

    input = "Some [Text]";
    myTest.Equal(PatternsFound(input), [], fname)

    input = "[Some:Text] for you";
    myTest.Equal(PatternsFound(input), ["[Some:Text]"], fname)

    input = "[Some:Text] for you"; pattern = ["[", "::", "]"]
    myTest.Equal(PatternsFound(input, pattern), [], fname)
    
    input = "[Some::Text] for you"; pattern = ["[", "::", "]"]
    myTest.Equal(PatternsFound(input, pattern), ["[Some::Text]"], fname)

    input = "[Some::Text] [for::you]"; pattern = ["[", "::", "]"]
    myTest.Equal(PatternsFound(input, pattern), ["[Some::Text]", "[for::you]"], fname)
}

function test_IsBetween(myTest) {
    let fname = arguments.callee.name;


    myTest.Equal(IsBetween(0,1,3), false)
    myTest.Equal(IsBetween(1,1,3), true)
    myTest.Equal(IsBetween(2,1,3), true)
    myTest.Equal(IsBetween(3,1,3), true)
    myTest.Equal(IsBetween(4,1,3), false)
    myTest.Equal(IsBetween(1,1,3, incl = false), false)
    myTest.Equal(IsBetween(2,1,3, incl = false), true)
    myTest.Equal(IsBetween(3,1,3, incl = false), false)
}


function test_Markup(myTest) {
    let fname = arguments.callee.name;
    let markup_html = [
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
        ["[ ]abc[ ]", '<input type="checkbox">abc<input type="checkbox">'],
        ["[x]abc[x]", '<input type="checkbox" checked="">abc<input type="checkbox" checked="">']
]
    
    for (element of markup_html) {
        myTest.Equal(MyMarkDowntoHTML(element[0]), element[1], fname)
        myTest.Equal(HTMLtoMyMarkdown(element[1]), element[0], fname)
    }
    
}

function test_SVG(myTest) {
    let fname = arguments.callee.name;
    let SVG = new clsSVG()
    let x1 = 'xxx' + SVG.Get_SVG('pdf-icon', 'fileName1', "", "", "") + ' <a href="path\\fileName1.pdf" target="#">fileName1</a>'
    let x2 = 'xxx' + SVG.Get_SVG('pdf-icon', 'fileName2', "", "", "") + ' <a href="path\\fileName2.pdf" target="#">fileName2</a>'
    let markup_svg = [
        // SVG
        ['xxx[(img)pdf::link]', 'xxx<a href="link" target="#">' + SVG.Get_SVG('pdf-img', "link", "", "", "link") + '</a>'],
        ['xxx[(img)pdf::path\\fileName.pdf]', 'xxx<a href="path\\fileName.pdf" target="#">' + SVG.Get_SVG('pdf-img', 'fileName', "", "", "fileName") + '</a>'],
        ['xxx[(icon)pdf::path\\fileName.pdf]', 'xxx' + SVG.Get_SVG('pdf-icon', 'fileName', "", "", "") + ' <a href="path\\fileName.pdf" target="#">fileName</a>'],
        ['xxx[(icon)pdf::path\\fileName1.pdf]xxx[(icon)pdf::path\\fileName2.pdf]', x1 + x2],
    ]
    
    for (element of markup_svg) {
        myTest.Equal(MyMarkDowntoSVG(element[0]), element[1], fname)
        myTest.Equal(SVGtoMyMarkdown(element[1]), element[0], fname)
    }
    
}