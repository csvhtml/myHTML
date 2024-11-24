// #################################################
// System  Config                                  *
// #################################################

const DROPDOWN_CONFIG = {
    "nav-Start": [
        {"Add Table": "XCSV['mainX'].Add()"},
        {"Add Gallery": "XCSV['mainX'].Add_Gallery()"},   
        {"Add Text": "XCSV['mainX'].Add_Text()"},
        {"Remove": "XCSV['mainX'].Remove()"},
        {"Save As HTML": "DownloadHTML()"}  
    ],
    "nav-Table": [
        {"Add Row": "XCSV['mainX'].AddRow()"},
        {"Add Col": "XCSV['mainX'].AddCol()"},   
        {"Delete Row": "XCSV['mainX'].DelRow()"}, 
        {"Delete Col": "XCSV['mainX'].DelCol()"},     
        
    ],
     "nav-List": [
        {"Data": "XCSV['mainX'].XHTML.Print()"},     //
        {"Links": "XCSV['mainX'].XHTML.Print('Link')"}, 
        {"Numbering": "XCSV['mainX'].Config({'Items Numbering': true})"},
        {"No Numbering": "XCSV['mainX'].Config({'Items Numbering': false})"}
    ],
    "id-button-sidebar": 'ToggleSidebar("id-sidebar")' ,
    "id-button-test":   'testNewFeature()'
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
    "id-content": {
        "Click" : 'Click()'
        // "Hover": "outHover(); outHoverID()",
        // "HoverLeave": "outLeave()",
    },
    "id-sidebar": {
        "Click" : 'Click()'
    }
}