const SVG = new clsSVG();
const HMTL = new libHTMLText()
var dataString = {
    "config":{},
    "headers": ["X", "Y", "Z"],
    "data": [[1,2,3], ["a", "b", "c"],[1,2,3], ["a", "b", "c"]]
};

const XCSV = {
    "main": new clsXCSV("id-main", {headers:dataString["headers"], data:dataString["data"]})
};

(function () {
    // UpDownloadConfig
    for (let key of Object.keys(LIB_UPLOAD_QWERTZ) ) {
        cFileReaders[key] = new FileReader()
    }

    XCSV["main"].XPrinter.Print()
    // XCSV["main"].XReader.Parse(cFileReaders["nav-input"].result)
})();


function functionAfterUpload() {
    console.log("Upload")
}


function functionAfterDownload() {
    let Output = document.getElementById("nav-download-csv")
    DownloadFile(Output.innerHTML)
}



