// ################################################################
// Assert                                                         #
// ################################################################

function assert(condition, message) {
    if (!condition) {
        if (IsString1(message)) {
            throw new Error(message);
        } else {
            throw new Error}
    }
}

// ################################################################
// Useful functions                                               #
// ################################################################

function NoBlanksInList(liste) {
    let ret = []
    for (ele of liste) {
        ret.push(NoBlanks(ele))}

    return ret
}

function NoBlanks(text) {
    return text.replace(/ /g, "")
}

function byVal(data) {
    // Creates a hard copy of a variable (instead of just createing a reference in case of list and dictioaries). 
    // It mimics the 'byVal' operater in VBA, hence the name
    
    if ( ["bool", "str", "int"].indexOf(typOf(data)) >-1) {
        return data} // as they are 'hard copied' by default

    if (typOf(data) == "list") {
        let ret = []
        for (let element of data) {
            ret.push(byVal(element))}
        return ret}
    
    if (typOf(data) == "dict") { 
        let ret = { }
        let keys= Object.keys(data)
        for (let key of keys) {
            ret[key] = byVal(data[key])}
        return ret}

    return data
}

function ValidChars(validChars, text) {
    for (char of text) {
        if (!validChars.includes(char)) {
            return false}
    }
    return true
}

function typOf(variable, extendedInfo = false) {
    if (Array.isArray(variable)) {
        if (extendedInfo) {
            return 'list' + '-' + String(ListDepth(variable)) + 'D'}
        return 'list'} // javascript 'Array'
    if (typeof variable === 'object' && variable !== null) {
        return 'dict'} // javascript 'Object'
    if (typeof variable === 'string') {
        return 'str'}
    if (typeof variable === 'number') {
        return 'int'}
    if (typeof variable === 'boolean') {
        return 'bool'}
    if (variable == null) {
        return 'null'}
    if (variable == undefined) {
        return 'undefined'}

    assert(false, String(variable))
}

function ListDepth(ListVariable) {
    if (typOf(ListVariable) != 'list') {return 0}

    let maxDepth = 0;
    for (let element of ListVariable) {
        maxDepth = maxx(maxDepth, ListDepth(element));}
    return maxDepth + 1
}

function maxx(a, b) {
    return (a > b) ? a : b;
}

function minn(a, b) {
    return (a < b) ? a : b;
}

function IsEqual(a,b, max_iterations = 100) {
    if (max_iterations<1) {
        return false}
    if (typOf(a)!=typOf(b)) {
        return false}

    if (typOf(a) == "bool") {
        if (a == b) {
            return true}
        return false}

    if (typOf(a) == "int") {
        if (a == b) {
            return true}
        return false}

    if (typOf(a) == "str") {
        if (a == b) {
            return true}
        return false}

    if (typOf(a) == "list") {
        if (!(a.length == b.length)) {
            return false}
        for (let i = 0; i< a.length; i++) {
            if (IsEqual(a[i], b[i], max_iterations-1) == false) {
                return false}
        }
        return true
    }

    if (typOf(a) == "dict") {
        let keysA = Object.keys(a)
        let keysB= Object.keys(b)
        if (keysA.length !== keysB.length) {
            return false}
        for (let key of keysA) {
            if (!b.hasOwnProperty(key)) {
                return false}
        }
        for (let key of keysA) {
            if (IsEqual(a[key], b[key], max_iterations-1) == false) {
                return false}
        }
        return true
    }

    if (typOf(a) == "null") {
        if (typOf(b) == "null") {
            return true}
    }

    if (typOf(a) == "undefined") {
        if (typOf(b) == "undefined") {
            return true}
    }

    return false
}

function IsListEqualSize(a,b, flag = false) {
    if (typOf(a) == "list" && typOf(b) == "list") {
        if (a.length == b.length) {
            return IsListEqualSize(a[0],b[0], true)}
        return false}
    if (flag) {
        if (typOf(a) == "list" || typOf(b) == "list") {
            return false}
        else {
            return true}
    }
    else {
        return false}
}

function IsListEqualDepth(a,b, flag = false) {
    if (typOf(a) == "list" && typOf(b) == "list") {
            return IsListEqualDepth(a[0],b[0], true)}
    if (flag) {
        if (typOf(a) == "list" || typOf(b) == "list") {
            return false}
        else {
            return true}
    }
    else {
        return false}
}

function ElementInArrayN(array, element) {
    for (let i = 0; i < array.length; i++) {
        if (typOf(array[i]) == "list") {
            if (ElementInArrayN(array[i], element)) {
                return true}
        } 
        else if (array[i] === element) {
            return true;
        }
    }
    return false; 
}

Object.defineProperties(DOMTokenList.prototype, {
    addX: {
        value: function(element) {
            if (!this.contains(element)) {
                this.add(element)}
            }
        }
});

Object.defineProperties(DOMTokenList.prototype, {
    removeX: {
        value: function(element) {
            if (this.contains(element)) {
                this.remove(element)}
            }
        }
});

Object.defineProperties(Object.prototype, {
    key: {
        value: function(n) {
            let count = 0
            for (var key in this) {
                if (count == n) {
                    return key;}
                count += 1
              }
              return null;
            }  
    } 
}); 

Object.defineProperties(String.prototype, {
    count: {
        value: function(n) {
            let count = 0;
            for (let i = 0; i < this.length; i++) {
                if (this[i] === n) {
                    count++;
                }
            }
            return count;
        }
    } 
}); 

// ################################################################
// Usefull DOM functions                                          #
// ################################################################

function ElemementsWithOnClickFunctions(mode="") {
    // let allElements = document.getElementsByTagName('*');
    let allElements = document.getElementsByTagName('*');
    let ret = []
    for ( var i = 0; i<allElements.length; i++ ) {
        if ( typeof allElements[i].onclick === 'function' ) {
            if (mode == "") {
                ret.push(allElements[i])}
            if (mode == "id") {
                assert(allElements[i].id != "")
                ret.push(allElements[i].id)}
            if (mode == "function") {
                ret.push(allElements[i].attributes['onclick'].value)}
        }
    }
    return ret
}

function ElemementsWithSubStringInID(fixx =  [], mode="") {
    // let allElements = document.getElementsByTagName('*');
    let allElements = document.getElementsByTagName('*');
    let ret = []
    for ( var i = 0; i<allElements.length; i++ ) {
        for (fix of fixx) {
            if (allElements[i].id.includes(fix)) {
                if (mode == "") {
                    ret.push(allElements[i])}
                if (mode == "id") {
                    assert(allElements[i].id != "")
                    ret.push(allElements[i].id)}
            }
        }
    }
    return ret
}


function ReturnParentUntilID(element, targetID = "", iterations = 10) {
    let parent = element
    for (i = 0; i<iterations; i++) {
        if (parent.tagName == "BODY") {
            assert(false)}
        if (parent.id == "") {
            parent = parent.parentElement
        } else {
            return parent}
    }
    assert(false)
}

function DivIsDescendantOf(element, targetID, iterations = 10) {
    let parent = element
    for (i = 0; i<iterations; i++) {
        if (parent.tagName == "BODY") {
            return false
        }
        if (parent.id == targetID) {
            return true
        } else if (parent.parentElement == undefined) {
            return false // if parents are not fully traced... you dont know
        } else {
            parent = parent.parentElement}
    }
    assert(false)
}

function DOMElementsFromString(htmlString, tag = 'div') {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const svgElements = doc.querySelectorAll(tag);
    return Array.from(svgElements);
}



// ################################################################
// test                                                           #
// ################################################################

function test_Basis() {
    test_BasisbyVal()
    test_Basis_RetStringBetween()   
    test_Basis_FileNameFromPath()  
    test_Basis_typOf()
    test_Basis_IsEqual() 
    return 0 // 32 assertions in this file (and should all be catched)
}

function test_Basis_IsEqual() {
    let fname = arguments.callee.name;
    
    let test = [
        [true, true, true],
        [false, false, true],
        [false, true, false],
        [true, false, false],
        [1, 1, true],
        [1, 2, false],
        [1, "1", false],
        ["1", "1", true],
        ["Hello", "Hello", true],
        ["Hello", "World", false],
        [[1,2,3], [1,2], false],
        [[1,2,3], [1,7,3], false],
        [[1,2,3], [1,2,3], true],
        [{"A": "Hallo", "B":"Welt"}, {"A": "Hallo", "B":"Welt"}, true],
        [{"A": "Hallo", "B":"Welt"}, {"A": "Hallo"}, false],
        [{"A": "Hallo", "B":"Welt"}, {"A": "Hallo", "C":"Welt"}, false],
        [{"A": "Hallo", "B":"Welt"}, {"A": "Hallo", "B":"World"}, false],
        [{"A": "Hallo", "B":[1,2,3]}, {"A": "Hallo", "B":[1,2,3]}, true],
        [{"A": "Hallo", "B":[1,2,3]}, {"A": "Hallo", "B":[1,2,4]}, false],
        [{"A": "Hallo", "B":{"X":[1,2,3], "Y": [4,5]}}, {"A": "Hallo", "B":{"X":[1,2,3], "Y": [4,5]}}, true],
        [{"A": "Hallo", "B":{"X":[1,2,3], "Y": [4,5]}}, {"A": "Hallo", "B":{"X":[1,2,3], "Y": [44,5]}}, false],
    ]

    for (let t of test) {
        testEqual(IsEqual(t[0], t[1]), t[2],fname)}

    let test1 = [
        [[[1,1],2,3],[1,2,3],[1,2,3]],
        [[1,2,3],[1,2,3],[1,2,3]],
    ]
    let test2 = [
        [[[1,1],2,3],[1,2,3],[1,2,3]],
        [[1,2,3],[1,2,3],[1,2,3]],
    ]
    let max_iterations = 4

    testEqual(IsEqual(test1, test2, max_iterations), false, fname)
}

function test_Basis_typOf() {
    let fname = arguments.callee.name;
    
    let test = [
        [[1, 2, 3],'list'],
        [{ key: 'value' },'dict'],
        ['Hello, World!','str'],
        [42,'int'],
        [true,'bool'],
    ]

    for (let t of test) {
        testEqual(typOf(t[0]), t[1], fname)}
}


function test_Basis_RetStringBetween() {
    let fname = arguments.callee.name;
    text = "R:1029C:23H:header"

    testEqual(RetStringBetween(text, "R:", "C:"), "1029", fname)
    testEqual(RetStringBetween(text, "R:", ""), "1029C:23H:header", fname)
    testEqual(RetStringBetween(text, "H:", ""), "header", fname)
}

function test_Basis_FileNameFromPath() {
    let fname = arguments.callee.name;

    text = "file:///C:/A/B/World/FileName.pdf"
    testEqual(FileNameFromPath(text), "FileName.pdf", fname)
    text = "file:///C:/A/B/World\\FileName.pdf"
    testEqual(FileNameFromPath(text), "FileName.pdf", fname)
}


// ################################################################
// rest                                                           #
// ################################################################

function toggle(val, pair) {
    if (val != pair[0]) {
        return pair[0]}
    return pair[1]
}
