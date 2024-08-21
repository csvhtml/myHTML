function PatternsFound(text, pattern = [], ignore1 = []) {
    if (IsEqual(pattern, [])) { 
        pattern = ["[", ":", "]"]}
    assert(typOf(text) == "str", "a not str")
    assert(typOf(pattern) == "list", "b not list")
    assert(IsBetween(pattern.length, 2,3), "b not length 2 or 3")

    if (pattern.length == 2) {
        // not implemented
    }
    if (pattern.length == 3) {
        return PatternsFound3(text, pattern, ignore1)
    }
}

function PatternsFound3(text, pattern = [], ignore1 = []) {
    if (IsEqual(pattern, [])) { 
        pattern = ["[", ":", "]"]}
    let ret = []; let tmp = ""
    let startIndex = 0; let pIndex = [-1, -1, -1]
    
    // find p indexes
    while (startIndex < text.length) {
        pIndex[0] = text.indexOf(pattern[0], startIndex)
        if (pIndex[0] == -1) {return ret}
        for (i = 1; i < pattern.length; i++) {
            pIndex[i] = text.indexOf(pattern[i], pIndex[i-1])
            if (pIndex[i] == -1) {return ret}
        }
      
        // Extract the pattern and push it into the occurrences array
        tmp = text.slice(pIndex[0], pIndex[pIndex.length-1] + 1);
        if (ignore1.length > 0) {
            for (ignore of ignore1) {
                if (!tmp.startsWith(ignore1)) {
                    ret.push(tmp);}
            }
        } else {
            ret.push(tmp) }
        startIndex = pIndex[pIndex.length-1] + 1;
    }
    return ret;
  }

// markup -> html
function MyMarkDowntoHTML(markupText, ignore1 = []) {
    if (typOf(markupText) != 'str') {
        return markupText}

    // replace [Text::Link] -> <a href="Link" ...>
    pats = PatternsFound(markupText, ["[", "::", "]"], ignore1)
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