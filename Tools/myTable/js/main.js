const SVG = new clsSVG();
const HMTL = new libHTMLText()
const XCSV = {
    "main": new clsXCSV("id-main", {})
};

(function () {
    // UpDownloadConfig
    for (let key of Object.keys(LIB_UPLOAD_QWERTZ) ) {
        cFileReaders[key] = new FileReader()
    }

    XCSV["main"].XPrinter.Print()
})();


function functionAfterUpload() {
    console.log("Upload")
}


function functionAfterDownload() {
    let Output = document.getElementById("nav-download-csv")
    DownloadFile(Output.innerHTML)
}