// DROPDOWN
const DROPDOWN_CONFIG = {
    "nav-Edit": [
        {"Add Row": "XCSV['main'].AddRow()"},   
        {"Save As HTML": "DownloadHTML()"}  
    ],
     "nav-List": [
        {"Data": "XCSV['main'].XHTML.Print()"},     //
        {"Links": "XCSV['main'].XHTML.Print('Link')"}, 
    ],
}


// FIELS UPLOAD
const cFileReaders = {}; 
const cFileReaders_File = {};
const FILES_UPLOAD_CONFIG = {
    "nav-input": "ParseFromFileReader()" ,
};


//libUserInput
const cUSERINPUT_EVENT = {}  
const LIB_USERINPUT = {
    "id-main": {
        "Click" : 'Click()'
    }
}