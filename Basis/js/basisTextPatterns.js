function PatternsInText(text, patternL) {
    if (text === undefined) return false;
    if (patternL === undefined) return false;
    assert(typOf(text) == "str")
    assert(typOf(patternL) == "list")
    assert(2 <= patternL.length && patternL.length <= 3)

    
    // paternL = ["[", "]"];
    if (patternL.length == 2) {
        return _PatternsFound2(text, patternL)
    }
    // paternL = ["[", ":", "]"];
    if (patternL.length == 3) {
        return _PatternsFound3(text, patternL)
    }
}

function _PatternsFound2(text, patternL) {
    let ret = []; let tmp = ""
    let startIndex = 0; let pIndex = [-1, -1]

    while (startIndex < text.length) {
        // find index 0
        pIndex[0] = text.indexOf(patternL[0], startIndex)
        if (pIndex[0] == -1) return ret
        // find index 1
        pIndex[1] = text.indexOf(patternL[1], pIndex[0])
        if (pIndex[1] == -1) return ret
        // Extract Pattern and Push
        ret.push(text.slice(pIndex[0], pIndex[1] + 1))

        startIndex = pIndex[1] + 1;}

    return ret
}

function _PatternsFound3(text, patternL) {
    let ret = []; let tmp = ""
    let startIndex = 0; let pIndex = [-1, -1, -1]
    
    while (startIndex < text.length) {
        // find index 0
        pIndex[0] = text.indexOf(patternL[0], startIndex); if (pIndex[0] == -1) return ret
        // find index 1
        pIndex[1] = text.indexOf(patternL[1], pIndex[0]); if (pIndex[1] == -1) return ret
        // find index 2 (again strarting from pIndex[0])
        pIndex[2] = text.indexOf(patternL[2], pIndex[0]); if (pIndex[1] == -1) return ret
        // skip if index 1 > index 2
        if (pIndex[1] > pIndex[2]) {
            startIndex = pIndex[0] + 1;
            continue}
        // Extract Pattern and Push
        ret.push(text.slice(pIndex[0], pIndex[2] + 1))

        startIndex = pIndex[2] + 1;}

    return ret;
  }