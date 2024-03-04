const DD = new libDropDowns();
// const CSVG = new clsSVG();  // MOHI: fix. the clsSVG class automatically creates svg icons. If referenced multipel time, itmes are multiple times created. libEdit also defines a SVG
const HMTL = new libHTMLText()
const UIN = new clsUserInput(["id-main"]);
const EDIT = new libEdit('EDIT');

var dataString = {
    "config":{},
    "headers": ["X", "Y", "Z"],
    "data": [["1","2","3"], ["a", "b", "c"],["1","2","3"], ["a", "b", "c"]]
};

const XCSV = {
    "main": new clsXCSV("id-main", {headers:dataString["headers"], data:dataString["data"]})
};

(function () {
    // UserInput
    window.addEventListener('mousedown', UIN.MouseDown)
    window.addEventListener('mouseup', UIN.MouseUp)
    // UpDownloadConfig
    for (let key of Object.keys(LIB_UPLOAD_QWERTZ) ) {
        cFileReaders[key] = new FileReader()
    }

    XCSV["main"].XPrinter.Print()
    // EDIT.Init()
})();







