// the stuff here actually is only needed for the Upload function

const cFileReaders = {}; 
const cFileReaders_File = {};
const LIB_UPLOAD_QWERTZ = {
    "Input 2": "TestFunction()" ,
};

(function () {
    for (let key of Object.keys(LIB_UPLOAD_QWERTZ) ) {
        cFileReaders[key] = new FileReader()
    }
})();