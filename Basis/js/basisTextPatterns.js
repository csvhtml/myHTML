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

    // functionn parseMarkup(markupText) {
    //     if (typOf(markupText) != 'str') {
    //         return markupText}
    
    //     var linkRegex = /\[([^\]]+)::([^\]]+)\]/g;
    //     var htmlText = markupText.replace(linkRegex, '<a href="$2" target="#">$1</a>');
    //     // \n -> <br>
    //     htmlText = htmlText.replace(new RegExp('\n', "g") , '<br>')
    //     return htmlText;
    //     }