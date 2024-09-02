function PatternsFound(text, patternL, ignore1L) {
    if (text === undefined) return false;
    if (patternL === undefined) return false;
    if (ignore1L === undefined) ignore1L = []
    assert(typOf(text) == "str")
    assert(typOf(patternL) == "list")
    assert(typOf(ignore1L) == "list")
    assert(2 <= patternL.length && patternL.length <= 3)

    
    // paternL = ["[", "]"];
    if (patternL.length == 2) {
        // not implemented
    }
    // paternL = ["[", ":", "]"];
    if (patternL.length == 3) {
        return _PatternsFound3(text, patternL, ignore1L)
    }
}

function _PatternsFound3(text, patternL, ignore1L) {
    let ret = []; let tmp = ""
    let startIndex = 0; let pIndex = [-1, -1, -1]
    
    // find p indexes
    while (startIndex < text.length) {
        pIndex[0] = text.indexOf(patternL[0], startIndex)
        if (pIndex[0] == -1) return ret
        
        for (i = 1; i < patternL.length; i++) {
            pIndex[i] = text.indexOf(patternL[i], pIndex[i-1])
            if (pIndex[i] == -1) {return ret}
        }
      
        // Extract the pattern and push it into the occurrences array
        tmp = text.slice(pIndex[0], pIndex[pIndex.length-1] + 1);
        if (ignore1L.length > 0) {
            for (let ignore of ignore1L) {
                if (!tmp.startsWith(ignore1L)) {
                    ret.push(tmp);}
            }
        } else {
            ret.push(tmp) }
        startIndex = pIndex[pIndex.length-1] + 1;
    }
    return ret;
  }

// ################################################################
// MarkDown                                                       #
// ################################################################

const CLASS_SVG_FOR_MARKDOWN = new clsSVG()

 const CONFIG_SVG_FOR_MARKDOWN_REPLACE = [
    // ['Markdown String', Regex, svg code]
    ["[(SVG)pdf]", /\[\(SVG\)pdf\]/g, CLASS_SVG_FOR_MARKDOWN['pdf-img'], 'pdf-img'],
    ["[(svg)pdf]", /\[\(svg\)pdf\]/g, CLASS_SVG_FOR_MARKDOWN['pdf-icon'], 'pdf-icon']
    ]


// markup -> html
function MyMarkDowntoHTML(markupText) {
    if (typOf(markupText) != 'str') {
        return markupText}

    // replace [Text::Link] -> <a href="Link" ...>
    pats = PatternsFound(markupText, ["[", "::", "]"])
    htmlText = markupText; var p1; var p2; var href
    for (pat of pats) {
        p1 = RetStringBetween(pat, "[", "::")
        p2 = RetStringBetween(pat, "::", "]")
        href = '<a href="' + p2 + '" target="#">' + p1 + '</a>'
        htmlText = htmlText.replace(pat, href)
    }
    // repalce /n -> <br>
    htmlText = htmlText.replace(new RegExp('\n', "g") , '<br>')

    htmlText = _replaceMultipleSpacesWithNbsp(htmlText)
    htmlText = _replaceBracketWitchCheckbox(htmlText)
    htmlText = _replace_MarkDown_To_SVG(htmlText)
    return htmlText;
    }

// html -> markup
function HTMLtoMyMarkdown(htmlText) {
    htmlText = htmlText.replace('target="#"', '')
    var anchorRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*?>(.*?)<\/a>/g;
    var markupText = htmlText.replace(anchorRegex, '[$3::$2]');
    markupText = markupText.replace(new RegExp('<br>', "g") , '\n')
    markupText = _replaceNbspWithSpaces(markupText)
    markupText = _replaceCheckboxWithBrackets(markupText)
    markupText = _replace_SVG_BACK_To_MyMarkdon(markupText)
    return markupText;
    }


function _replaceMultipleSpacesWithNbsp(text) {
    return text.replace(/ {2,}/g, function(match) {
        return '&nbsp;'.repeat(match.length);
    });
    }

function _replaceNbspWithSpaces(text) {
    return text.replace(/&nbsp;+/g, function(match) {
        return ' '.repeat(match.length / 6); // 6 is the length of '&nbsp;'
    });
    }

function _replaceBracketWitchCheckbox(text) {
    text = text.replace(/\[ \]/g, '<input type="checkbox">')
    return text.replace(/\[x\]/g, '<input type="checkbox" checked="">')
}

function _replaceCheckboxWithBrackets(text) {
    text = text.replace(/<input type="checkbox">/g, '[ ]')
    return text.replace(/<input type="checkbox" checked="">/g, '[x]')
}

function _replace_MarkDown_To_SVG(text) {
    let replace = CONFIG_SVG_FOR_MARKDOWN_REPLACE

    for (let rpl of replace) {
        if (text.includes('[(svg)') || text.includes('[(SVG)')) {
            text = text.replace(rpl[1], rpl[2])}
    }
    return text
}

function _replace_SVG_BACK_To_MyMarkdon(htmlText) {
    let replace = CONFIG_SVG_FOR_MARKDOWN_REPLACE
    let ret = htmlText
    svgs = DOMElementsFromString(htmlText, 'svg')
    for (let svg of svgs) {
        ret = ret.replace(svg.outerHTML, 'xxy' + svg.id + 'yxx')
        for (let rpl of replace) {
            ret = ret.replace('xxy' + rpl[3] + 'yxx', rpl[0])}
        }
    
    return ret
    }

function DOMElementsFromString(htmlString, tag) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const svgElements = doc.querySelectorAll(tag);
    return Array.from(svgElements);
}



    // functionn parseMarkup(markupText) {
    //     if (typOf(markupText) != 'str') {
    //         return markupText}
    
    //     var linkRegex = /\[([^\]]+)::([^\]]+)\]/g;
    //     var htmlText = markupText.replace(linkRegex, '<a href="$2" target="#">$1</a>');
    //     // \n -> <br>
    //     htmlText = htmlText.replace(new RegExp('\n', "g") , '<br>')
    //     return htmlText;
    //     }