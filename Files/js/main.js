(function () {

})();

function TestFunction() {
    let Output = document.getElementById("TestOutput")
    Output.innerHTML = cFileReaders["TestInput"].result
}

function TestDownload() {
    let Output = document.getElementById("TestOutput")
    DownloadFile(Output.innerHTML)
}

