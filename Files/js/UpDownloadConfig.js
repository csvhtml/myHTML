// config for multi files
const cFileMulti = {}; 
const FILES_MULTI_CONFIG = {
    "Input 3": "TestFunctionMulti()" ,
};

// config for Single Upload function
const cFileReaders = {}; 
const cFileReaders_File = {};
const FILES_UPLOAD_CONFIG = {
    "Input 2": "TestFunction()" ,
};

(function () {
    //this must be in main()
    for (let key of Object.keys(FILES_UPLOAD_CONFIG) ) {
        cFileReaders[key] = new FileReader()
    }
})();