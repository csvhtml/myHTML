// ################################################################
// MarkDown   Config                                              #
// ################################################################

const CLASS_SVG_FOR_MARKDOWN = new clsSVG()

const CONFIG_SVG_FOR_MARKDOWN_REPLACE = [
    // ['Markdown String', svg string, key]
    ["[(SVG)pdf]", CLASS_SVG_FOR_MARKDOWN['pdf-img'], 'pdf-img'],
    ["[(svg)pdf]", CLASS_SVG_FOR_MARKDOWN['pdf-icon'], 'pdf-icon'],
    ["[(svg)folder]", CLASS_SVG_FOR_MARKDOWN['folder-icon'], 'folder-icon'],
]

const CONFIG_MYMARKDOWN_FEATURES_ACTIVE = {
    'new Line': true,
    'multi Space': true,
}

const CONFIG_MYMARKDOWN_PATTERN2_ACTIVE = {
    'Checkbox': true,
    'svg': true,
    'img': true
}

const CONFIG_MYMARKDOWN_PATTERN3_ACTIVE = {
    'Link': true,

}

// ################################################################
// MarkDown   -> HTML                                             #
// ################################################################

function MyMarkDowntoHTML(markupText) {
    assert(typOf(markupText) == 'str')

    let pats3 = PatternsInText(markupText, ["[", "::", "]"])
    let pats2 = PatternsInText(markupText, ["[", "]"]); pats2.removeItems(pats3)

    htmlText = _MyMarkDown_FeaturesWithoutBrackets_Apply(markupText)

    htmlText = _MyMarkDown_Patterns2_Apply(htmlText, pats2)

    htmlText = _MyMarkDown_Patterns3_Apply(htmlText, pats3)

    return htmlText;
    }


function _MyMarkDown_FeaturesWithoutBrackets_Apply(text) {
    let Features = CONFIG_MYMARKDOWN_FEATURES_ACTIVE

    if (Features['new Line']) {
        text = text.replace(new RegExp('\n', "g") , '<br>')}
    if (Features['multi Space']) {
        text = text.replace(/ {2,}/g, function(match) {return '&nbsp;'.repeat(match.length);});}

    return text
}

function _MyMarkDown_Patterns2_Apply(text, pats2) {
    let Features = CONFIG_MYMARKDOWN_PATTERN2_ACTIVE

    if (Features['Checkbox']) {
        text = text.replace(/\[ \]/g, '<input type="checkbox">')
        text = text.replace(/\[x\]/g, '<input type="checkbox" checked="">')
        pats2.removeAll('[ ]'); pats2.removeAll('[x]')}
    if (Features['svg']) {
        for (let pat of pats2) {
            if (pat.includes('[(svg)') || pat.includes('[(SVG)')) {
                text = _MyMarkDown_ReplaceSVG(text, pat)}}}
    if (Features['img']) {
        let endings = ['.png', 'PNG', 'jpg', 'JPG']
        let size = ''; let w = ''; let h = ''
        let part1 = ''
        for (let pat of pats2) {
            for (let ending of endings) {
                if (pat.endsWith(ending + ']')) {
                    part1 = RetStringBetween(pat, "[", "]")
                    if (part1.includes('[(') && part1.includes(')')) {
                        size = RetStringBetween(part1, "[(", ")")
                        w = size.until('x'); h = size.after('x')
                        part1 = part1.after(')')}
                    html = '<img src="' + part1 + '" width="' + w + '" height="'+ h +'">'
                    text = text.replace(pat, html)    
                } 
            }
        }}
    return text
}

function _MyMarkDown_Patterns3_Apply(text, pats3) {
    let Features = CONFIG_MYMARKDOWN_PATTERN3_ACTIVE
    let part1 = ''; let part2 = ''; let html = ''
    if (Features['Link']) {
        for (let pat of pats3) {
            part1 = RetStringBetween(pat, "[", "::")
            part2 = RetStringBetween(pat, "::", "]")
            html = '<a href="' + part2 + '" target="#">' + part1 + '</a>'
            text = text.replace(pat, html)
        }}

    return text
}

function _MyMarkDown_ReplaceSVG(text, pattern) {
    let idx = 0
    for (i = 0; i < CONFIG_SVG_FOR_MARKDOWN_REPLACE.length; i++) {
        if (CONFIG_SVG_FOR_MARKDOWN_REPLACE[i][0] == pattern) {
            idx = i
            break}}
    return text.replace(pattern, CONFIG_SVG_FOR_MARKDOWN_REPLACE[idx][1])
}


// ################################################################
// HTML    -> MarkDown                                            #
// ################################################################


function HTMLtoMyMarkdown(htmlText) {
    assert(typOf(htmlText) == 'str')

    markupText = _BackToMyMarkDown_FeaturesWithoutBrackets_Apply(htmlText)

    markupText = _BackToMyMarkDown_Patterns2_Apply(markupText)

    markupText = _BackToMyMarkDown_Patterns3_Apply(markupText)

    return markupText;
    }

function _BackToMyMarkDown_FeaturesWithoutBrackets_Apply(text) {
    let Features = CONFIG_MYMARKDOWN_FEATURES_ACTIVE

    if (Features['new Line']) {
        text = text.replace(new RegExp('<br>', "g") , '\n')}
    if (Features['multi Space']) {
        text = text.replace(/&nbsp;+/g, function(match) {return ' '.repeat(match.length / 6); });}// 6 is the length of '&nbsp;'

    return text
}

function _BackToMyMarkDown_Patterns2_Apply(text) {
    let Features = CONFIG_MYMARKDOWN_PATTERN2_ACTIVE

    if (Features['Checkbox']) {
        text = text.replace(/<input type="checkbox">/g, '[ ]')
        text = text.replace(/<input type="checkbox" checked="">/g, '[x]')}
    if (Features['svg']) {
        text = _replace_SVG_BACK_To_MyMarkdon(text)}
    if (Features['img']) {
        let imgTags = PatternsInText(text, ['<img', '>'])
        for (let imgTag of imgTags) {
            let w = RetStringBetween(imgTag,'width="', '"')
            let h = RetStringBetween(imgTag,'height="', '"')
            let src = RetStringBetween(imgTag,'src="', '"')
            let wh = wenn(w.length + h.length >0, '(' + w + 'x' + h + ')', '')
            let mark = '[' + wh + src + ']'
            text = text.replace(imgTag, mark)
            }
        }
    return text
}

function _BackToMyMarkDown_Patterns3_Apply(text) {
    let Features = CONFIG_MYMARKDOWN_PATTERN3_ACTIVE
    let part1 = ''; let part2 = ''
    if (Features['Link']) {
        text = text.replace('target="#"', '')
        var anchorRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*?>(.*?)<\/a>/g;
        var text = text.replace(anchorRegex, '[$3::$2]');}

    return text
}

function _replace_SVG_BACK_To_MyMarkdon(htmlText) {
    let ret = htmlText
    let svgs = DOMElementsFromString(htmlText, 'svg')
    for (let svg of svgs) {
        ret = ret.replace(svg.outerHTML, 'xxy-' + svg.id + '-yxx')
        for (let rpl of CONFIG_SVG_FOR_MARKDOWN_REPLACE) {
            ret = ret.replace('xxy-' + rpl[2] + '-yxx', rpl[0])}
        }
    
    return ret
    }

function DOMElementsFromString(htmlString, tag) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const svgElements = doc.querySelectorAll(tag);
    return Array.from(svgElements);
}