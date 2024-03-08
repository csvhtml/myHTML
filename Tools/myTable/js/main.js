const DD = new libDropDowns();
// const CSVG = new clsSVG();  // MOHI: fix. the clsSVG class automatically creates svg icons. If referenced multipel time, itmes are multiple times created. libEdit also defines a SVG
const HMTL = new libHTMLText()
const UIN = new clsUserInput(["id-main"]);
const EDIT = new libEdit('EDIT');


const XCSV = {
    "main": new clsXCSV("id-main", {})
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

function infoblock(text) {
    document.getElementById("id-infoblock").innerHTML = text
}







