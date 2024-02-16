// the stuff here actually is onyly needed for the Upload function

const cFileReaders = {}; 
const LIB_UPLOAD_QWERTZ = {
    "TestInput": "TestFunction()" ,
};

(function () {
    for (let key of Object.keys(LIB_UPLOAD_QWERTZ) ) {
        cFileReaders[key] = new FileReader()
    }
})();