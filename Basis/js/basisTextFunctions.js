// ###############################################################################
// Basis   Text Functions                                                        #
// ###############################################################################

function RetStringBetween(text, fromStr, toStr) {
    /**
     * Returns the String between two  strings.
     * "" / empty strings are interpreted as open end / take rest of string
     * strings not found in text are interpreted as "" / empty strings
     * 
     */
    if (IsUndefined([text, fromStr])) assert(false)
    if (toStr === undefined) toStr = ''
    
    if (toStr == '') return text.after(fromStr)

    var [idx1, idx2, len1, len2] = _RetIdxFromTextInString(text, fromStr, toStr)

    if (idx2 > idx1+len1-1) {
        return text.substring(idx1+len1, idx2);}
    else {
        return text.substring(idx1+len1)}
}

function RetStringOutside(text, fromStr, toStr) {
    /**
     * Returns the String except the text between two  strings.
     * "" / empty strings are interpreted as "remove rest of string"
     * strings not found in text are interpreted as "" / empty strings (=identical behaviour)
     * 
     */

    var [idx1, idx2, len1, len2] = _RetIdxFromTextInString(text, fromStr, toStr)

    // fromStr = "" and toStr was found at start:
    if (idx1 == 0 && idx2 == 0 && len2 >0) {
        return text.substring(idx2 + len2)
    }

    if (idx2 > idx1) {
        return text.substring(0, idx1) + text.substring(idx2 + len2)}
    else {
        return text.substring(0, idx1)}
}

function _RetIdxFromTextInString(text, strA, strB){
    /**
     * Returns the indexes and length of the search string given
     * if a string was not found, returns (idx=0 and len=0) => identical behaviour as if search string was str = ""
     * if a string was found at start returns (idx = 0, len = <3>)
     * 
     */
    var idx1 = text.indexOf(strA);
    if (idx1 == -1) {strA=""; tmp1 = -1}   // if u dont find the string, act if it was an empty string
    idx1 = text.indexOf(strA);
    
    // if (ignoreBlankAtBorders && text.indexOf(" " + strB)>-1) {
    //     strB = " " + strB
    // }
    var idx2 = text.indexOf(strB, fromIndex = idx1 + strA.length);
    if (idx2 == -1) {strB=""; tmp2 = -1} // if u dont find the string, act if it was an empty string
    idx2 = text.indexOf(strB, fromIndex = idx1 + strA.length);
    l1 = strA.length
    l2 = strB.length
    return [idx1, idx2, l1, l2]
}

function FileNameFromPath(path) {
    let idxR1 = path.lastIndexOf("/")
    let idxR2 = path.lastIndexOf("\\")
    let idx = Math.max(idxR1, idxR2)

    return path.slice(idx+1)
}

function rgbText(a,b,c) {
    return "rgb(" + a + "," + b + "," + c + ")"
}

// obsolete: replacement is string.trimPlus
function myTrim(input) {
        return input.replace(/ /g, '');
    }

function ShortenDotDotDot(text, lenn = 12){
    let len = text.length; let len2 = len/2
    let ret = text
    if (len > lenn) {
        ret = text.substring(0, len2) + "..." + text.substring(len-len2,len)}
    return ret
}

function ChangeLastChar(inputString, newChar) {
    if (inputString.length == 0) {
        return ''}
    if (newChar.length != 1) {
        return inputString}

    let charArray = inputString.split('');
    charArray[charArray.length - 1] = newChar;
    let resultString = charArray.join('');

    return resultString;
  }