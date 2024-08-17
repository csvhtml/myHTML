// DROPDOWN
const DROPDOWN_CONFIG = {
    "nav-Site": [
        {"Add Table": "XCSV['main'].AddTable()"},   
        {"Delete Table": "XCSV['main'].DeleteTable()"},   
        {"Save As HTML": "DownloadHTML()"}  
    ],
    "nav-Table": [
        {"Add Row": "XCSV['main'].AddRow()"},   
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