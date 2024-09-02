
function test_XCSV(myTest) {
    test_SVG(myTest)
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
        // myTest.Equal(SVGtoMyMarkdown(element[1]), element[0], fname)
    }
    
}