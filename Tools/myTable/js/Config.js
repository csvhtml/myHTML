// #################################################
// Product Config                                  *
// #################################################

// also includes the Config (= dict structure of "WorkingItems" and CofigItems)
const XCSV_DATA = {
    "WorkingItems": {
        "X": "\
            ||A|B|C\n\
            ||1|2|3\n\
            ||Hallo|Welt|dort\n\
            "
    },
    "ConfigItems": {
        "Link": "\
            ||Name|Description\n\
            || | \n\
            "
    }
}

// #################################################
// System  Config                                  *
// #################################################


// UpDownloadConfig
const cFileReaders = {}; 
const cFileReaders_File = {};
const FILES_UPLOAD_CONFIG  = {
    // "nav-input": "functionAfterUpload()" ,
    "nav-input": 'ParseFromFileReader()'
};

//clsXCSV_Names
const CLSXCSV_NAMES = {
    "id": {
        "header": {
            "prefix":'header-',
            "postfix": ''
        },
        "cell": {
            "r":'R:',
            "c":'C:',
            "h":'H:',
        },
        "row":{
            "prefix":'row-',
            "postfix": ''
        }
    }
}

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


// CSS for HTML Export
const CSS_HTMLEXPORT = 
    "<style>" + 
    "table {width: 100%;table-layout: fixed;border-collapse: collapse;margin: 20px 0;font-size: 18px;text-align: left;table-layout: auto;}" + 
    "th, td {padding: 12px 15px;border: 1px solid #ddd;word-wrap: break-word;}" + 
    "th {background-color: #f2f2f2;color: #333;}" + 
    "tr:hover {background-color: #f1f1f1;}" +
    "th {font-weight: bold;background-color: lightgray !important;position: sticky;top: 0px;z-index: 2;}" + 
    "</style>"
