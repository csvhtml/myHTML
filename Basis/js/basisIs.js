function IsObject(variable) {
    return typeof variable === 'object' && variable !== null && !Array.isArray(variable);
  }

function IsString(variable) {
    return typeof variable === 'string';
  }

function IsUndefined(variable) {
    return typeof variable === 'undefined';
  }

function IsNotUndefined(variable) {
    return !IsUndefined(variable)
  }