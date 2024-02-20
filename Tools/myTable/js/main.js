const SVG = new clsSVG();
const HMTL = new libHTMLText()
const UIN = new clsUserInput(["id-main"]);
var dataString = {
    "config":{},
    "headers": ["X", "Y", "Z"],
    "data": [[1,2,3], ["a", "b", "c"],[1,2,3], ["a", "b", "c"]]
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
})();







