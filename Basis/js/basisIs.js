function IsObject(variable) {
    return typeof variable === 'object' && variable !== null && !Array.isArray(variable);
  }

function IsString(variable) {
    return typeof variable === 'string';
  }

function IsUndefined(variables) {
    assert(typOf(variables) == 'list')

    for (let v of variables) {
        if (typOf(v) != 'undefined') return false}
    return true
  }

function IsPartlyUndefined(variables) {
    assert(typOf(variables) == 'list')

    let undefinedSeen = false;
    let definedSeen = false;
    for (let v of variables) {
        if (typOf(v) != 'undefined') definedSeen = true
        if (typOf(v) == 'undefined') undefinedSeen = true}

    if (undefinedSeen && definedSeen) return true
    return false
  }

function IsNotUndefined(variable) {
    return !IsUndefined(variable)
  }

function IsEmptyList(variable) {
    return Array.isArray(variable) && variable.length == 0;
}

function IsString1(variable) {
  return IsString(variable) && variable.length > 0
}