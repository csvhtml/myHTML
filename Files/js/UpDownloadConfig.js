// the stuff here actually is only needed for the Upload function

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