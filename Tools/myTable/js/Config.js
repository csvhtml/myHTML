// #################################################
// System  Config                                  *
// #################################################

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

// UpDownloadConfig
const cFileReaders = {}; 
const cFileReaders_File = {};
const FILES_UPLOAD_CONFIG  = {
    // "nav-input": "functionAfterUpload()" ,
    "nav-input": 'ParseFromFileReader()'
};

//libUserInput
const cUSERINPUT_EVENT = {}     // const dict, to pretect it from accidently being overwritten
const LIB_USERINPUT = {
    "Tipp": "",
    "id-main": {
        "Click" : 'Click()'
        // "Hover": "outHover(); outHoverID()",
        // "HoverLeave": "outLeave()",
    }
}