// #################################################
// System  Config                                  *
// #################################################

const DROPDOWN_CONFIG = {
    "nav-Start": [
        {"Add Table": "XCSV['main'].Add()"},
        {"Add Gallery": "XCSV['main'].Add_Gallery()"},   
        {"Add Text": "XCSV['main'].Add_Text()"},
        {"Remove": "XCSV['main'].Remove()"} 
    ],
    "nav-Edit": [
        {"Add Row": "XCSV['main'].AddRow()"},
        {"Add Col": "XCSV['main'].AddCol()"},   
        {"Save As HTML": "DownloadHTML()"}  
    ],
     "nav-List": [
        {"Data": "XCSV['main'].XHTML.Print()"},     //
        {"Links": "XCSV['main'].XHTML.Print('Link')"}, 
    ],
    "id-button-sidebar": 'ToggleSidebar("id-sidebar")' ,
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
    },
    "id-sidebar": {
        "Click" : 'Click()'
    }
}