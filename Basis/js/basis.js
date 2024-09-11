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
    if (variable === null) {
        return 'null'}
    if (variable === undefined) {
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

function wenn(condition, trueValue, falseValue) {
    return condition ? trueValue : falseValue;
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
            let result = false
            for (let i = 0; i<a.length;i++) {
                result = IsListEqualSize(a[i],b[i], true)
                if (result == false) {
                    return false}
            }
            return true
        }
    }

    if (flag && typOf(a) != "list" && typOf(b) != "list") {
            return true}

    return false
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

// ################################################################
// rest                                                           #
// ################################################################

function toggle(val, pair) {
    if (val != pair[0]) {
        return pair[0]}
    return pair[1]
}
