// #################################################
// Product Config                                  *
// #################################################

// DropDown Config
const LIB_DROPDOWN_QWERTZ = {
    // Buttons (possible, but actually beter to define this inside the index.html)
    "nav-Edit": [
        {"Add Row": "XCSV['main'].AddRow()"},     // "" must be outer quotes, '' must be inner quotes in a dict.
    ],
     "nav-List": [
        {"Data": "XCSV['main'].XPrinter.Print()"},     //
        {"Links": "XCSV['main'].XPrinter.Print('Link')"}, 
    ],
}

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
const LIB_UPLOAD_QWERTZ = {
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
