// Bug: [Text:: www.someurl.de] will results in local file named someurl.de (that doesnt exist)
// Feature: [X], [/], [!]  shall be interpreted as svg icons/symbols for red, green yellow
// Refactor: xcsv_dataCollection to dynamically define new config items

const DD = new libDropDowns();
// const CSVG = new clsSVG();  // MOHI: fix. the clsSVG class automatically creates svg icons. If referenced multipel time, itmes are multiple times created. libEdit also defines a SVG
const HMTL = new libHTMLText()
const UIN = new clsUserInput(["id-main"]);
const EDIT = new libEdit('EDIT');


const XCSV = {
    "main": new clsXCSV("id-main", XCSV_DATA)
};

(function () {
    // UserInput
    window.addEventListener('mousedown', UIN.MouseDown)
    window.addEventListener('mouseup', UIN.MouseUp)
    // UpDownloadConfig
    for (let key of Object.keys(LIB_UPLOAD_QWERTZ) ) {
        cFileReaders[key] = new FileReader()
    }
    XCSV["main"].XcsvHandler.Read(myTrim(XCSV_DATA["WorkingItems"]["X"]))
    XCSV["main"].XPrinter.Print()
                

    infoblock("New file", "l")
    // infoblock("Working Items", "m")
    infoblock("Holy guacamole!")
    // EDIT.Init()
})();

function infoblock(text, o = "r") {
    document.getElementById("id-infoblock-" + o).innerHTML = text
}







