function IsObject(variable) {
    return typeof variable === 'object' && variable !== null && !Array.isArray(variable);
  }

function IsString(variable) {
    return typeof variable === 'string';
  }