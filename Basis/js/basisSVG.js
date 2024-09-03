const dictSVG = {
    'pdf-img': '<svg id="pdf-img" width="100" height="125" viewBox="0 0 80 100" fill="none"> \
            <path d="M 10 0 \
            L 70 0 Q 80 0 80 10 \
            L 80 90 Q 80 100 70 100 \
            L 10 100 Q 0 100 0 90 \
            L 0 10 Q 0 0 10 0" fill="#E2574C"></path> \
            <path d="M 45 0 \
            L 70 0 Q 80 0 80 10 \
            L 80 35 \
            Z" fill="white"></path> \
            <path d="M 45 0 \
            L 80 35 \
            L 55 35 Q 45 35 45 25 \
            Z" fill="#B53629"></path> \
            <text x="8" y="25" fill="white" font-size="20">pdf</text> \
            <text x="5" y="80" fill="black" font-size="10"></text> \
            </svg>',

    'pdf-icon': '<svg id="pdf-icon" width="16" height="20" viewBox="0 0 16 20" fill="none"> \
            <path d="M 2 0 \
            L 14 0 Q 16 0 16 2 \
            L 16 18 Q 16 20 14 20 \
            L 2 20 Q 0 20 0 18 \
            L 0 2 Q 0 0 2 0" fill="#E2574C"></path> \
            <text x="1" y="12" fill="white" font-size="9">pdf</text> \
            </svg>',

    'a-x': '<svg id="a-x" width="20" height="20" fill="currentColor" class="m-1" viewBox="2 2 18 18">\
            <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" stroke-width="2"/>\
            <line x1="4" y1="16" x2="16" y2="4" stroke="currentColor" stroke-width="2"/>\
            </svg>',

    'a-ArrowDown': '<svg id="a-ArrowDown" width="20" height="20" fill="currentColor" class="m-1" viewBox="0 0 16 16"> \
            <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 \
            3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/> \
            </svg>',
        }

class clsSVG {
    constructor() {
        for (let key of Object.keys(dictSVG)) {
            this[key] = dictSVG[key]}
    }

    CreateAll_BasedOnDivClasses(tags) {
        let svgKeys = Object.keys(this)
        var svgKeyClasses = svgKeys.preFix('svg:')
        let listDIVS = ListOfDivs(tags)

        for (let div of listDIVS) {
            for (let cls of div.classList)
                if (svgKeyClasses.includes(cls)) {
                    div.innerHTML = this[cls.after('svg:')] + div.innerHTML}
        }
    }

    Create_ToDIV(divID, SVGName) {
        if (Object.keys(this).includes(SVGName)) {
            let div = document.getElementById(divID); 
            div.innerHTML = this[SVGName] + div.innerHTML
        }
    }
}

// ######################################################
// MarkDown Functions                                   #
// ######################################################

// MOHI: 

// [(svg)pdf] = small pdf icon
// [(SVG)pdf] = big  pdf icon
// [(svg)pdf][textTo::Link] == [(pdf)textTo::Link]  small pdf icon followed by hyperlink

// THis basisSVG only knows [(svg)pdf] and [(SVG)pdf]
// the logic for combination with hyperlink happend ins basis Patterns.


function MyMarkDowntoSVG(markupText) {
    if (typOf(markupText) != 'str') {return markupText}
    
    htmlText = markupText
    patterns = _MyMarkDowntoSVG_Patterns(markupText)
    for (pattern of patterns) {
        replaceText = _MyMarkDowntoSVG_Replacement(pattern)
        htmlText = htmlText.replace(pattern, replaceText)
    }

    return htmlText;
    }

    function _MyMarkDowntoSVG_Replacement(pattern) {
        SVG = new clsSVG()
        let typ = _MyMarkDowntoSVG_PatternsType(pattern)
        let filetyp = _MyMarkDowntoSVG_PatternsFileType(pattern)
        var p = RetStringBetween(pattern, "::", "]")

        let ret
        ret = _MyMarkDowntoSVG_Replacement2(typ, filetyp, p)
        return ret
    }   
        function _MyMarkDowntoSVG_Replacement2(typ, filetyp, p2) {
            subtext = FileNameFromPath(RetStringBetween(p2, "::", "]"))
            subtext = RetStringBetween(subtext, "", ".pdf")
            if (typ == 'img') {
                subtext = ShortenDotDotDot(subtext)}
            let key = filetyp + '-' + typ
            svg = SVG.Get_SVG(key, subtext, null, null, subtext)
            
            let ret = ""
            if (typ == 'img') {
                ret = '<a href="' + p2 + '" target="#">' + svg + '</a>'}
            if (typ == 'icon') {
                ret = svg + ' <a href="' + p2 + '" target="#">' + subtext + '</a>'}
            return ret
        }

    function _MyMarkDowntoSVG_Patterns(markupText) {
        patsIMG = PatternsInText(markupText, ["[(img)", "::", "]"])  
        patsICON = PatternsInText(markupText, ["[(icon)", "::", "]"])  
        return patsIMG.concat(patsICON)
    }

    function _MyMarkDowntoSVG_PatternsType(pattern) {
        if (pattern.includes('[(img)')) {
            return 'img'}
        if (pattern.includes('[(icon)')) {
            return 'icon'}
        assert(false)
    }

    function _MyMarkDowntoSVG_PatternsFileType(pattern) {
        if (pattern.includes(')pdf::')) {
            return 'pdf'}
        assert(false)
    }

// // svg -> markup
// funcction SVGtoMyMarkdown(htmlText) {
//     let ret = htmlText
//     svgs = DOMElementsFromString(htmlText, 'svg')
//     for (let svg of svgs) {
//         ret = _SVGtoMyMarkdown_Loop(ret, svg)}
    
//     ret = HTMLtoMyMarkdown(ret)

//     return ret
//     }

// function _SVGtoMyMarkdown_Loop(htmlText, svg) {
//         let svgText = svg.outerHTML
    
//         if (svg.id.includes('pdf-img')) {
//             htmlText = htmlText.replace(svgText, '(img)pdf') }
//         if (svg.id.includes('pdf-icon')) {
//             htmlText = htmlText.replace(svgText + ' ', '')
//             let linkName = RetStringBetween(svg.id, 'pdf-icon-', '')
//             if (linkName.length > 3) {
//                 htmlText = htmlText.replace('>' + linkName + '</a>', '>(icon)pdf</a>')}
//         }
//         return htmlText
// }



// funcction DOMElementsFromString(htmlString, tag = 'div') {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(htmlString, 'text/html');
//     const svgElements = doc.querySelectorAll(tag);
//     return Array.from(svgElements);
// }



// Get_SVG(key, idpostfix, height = null, width = null, subtext = "") {
//     let svg = ""; let re = ""; let place = ""
//     if (key in dictSVG) {
//         svg = dictSVG[key]
//         svg = svg.replace('" width', '-' + idpostfix + '" width')
//         if (height != null) {
//             re = 'height="' + RetStringBetween(svg, 'height="', '"') + '"'
//             place = 'height="' + height + '"'
//             svg = svg.replace(re, place)}
//         if (width != null) {
//             re = 'width="' + RetStringBetween(svg, 'width="', '"') + '"'
//             place = 'width="' + width + '"'
//             svg = svg.replace(re, place)}
//         if (subtext != "") {
//             re = 'font-size="10">' + RetStringBetween(svg, 'font-size="10">', '</text>') + '</text>'
//             place = 'font-size="10">' + subtext + '</text>'
//             svg = svg.replace(re, place)}
//     }
//     return svg
// } 

// const CLS_SVG_REPLACE = {
//     "mySVG-SqAwDwnBmLine": '<svg width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">\
//     <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>\
//     <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>\
//     </svg>',

//     // "mySVG-SqAwDwn": '<svg width="20" height="20" fill="currentColor" class="bi bi-save m-1" viewBox="0 0 16 16"> \
//     // <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 \
//     // 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/> \
//     // </svg>',

//     "mySVG-SqAwDwn": '<svg width="20" height="20" fill="currentColor" class="m-1" viewBox="0 0 16 16"> \
//     <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 \
//     3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/> \
//     </svg>',

//     "mySVG-FileAwUp": '<svg width="25" height="25" fill="currentColor" class="bi bi-file-earmark-arrow-up-fill" viewBox="0 0 16 16"> \
//     <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6.354 9.854a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 8.707V12.5a.5.5 0 0 1-1 0V8.707L6.354 9.854z"/> \
//     </svg>',

//     "mySVG-FileAwDown": '<svg width="25" height="25" fill="currentColor" class="bi bi-file-earmark-arrow-down-fill" viewBox="0 0 16 16"> \
//     <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0z"/> \
//     </svg>',

//     // "mySVG-X": '<svg width="16" height="16" fill="currentColor" class="bi bi-bag-x" viewBox="0 0 16 16"> \
//     // <path fill-rule="evenodd" d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 0 1 0-.708"/> \
//     // </svg>'

//     "mySVG-X": '<svg width="20" height="20" fill="currentColor" class="m-1" viewBox="2 2 18 18">\
//     <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" stroke-width="2"/>\
//     <line x1="4" y1="16" x2="16" y2="4" stroke="currentColor" stroke-width="2"/>\
//     </svg>'
// }



// const CLS_SVG_VALID_NAMES = {
//     "SquareArrowDown": "mySVG-SqAwDwn",
//     "SquareArrowDownWithBottomLine": "mySVG-SqAwDwnBmLine",
//     "A":  "mySVG-FileAwUp",
//     "B": "mySVG-FileAwDown",
//     "X": "mySVG-X"
// }

