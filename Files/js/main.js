function TestFunction() {
    let Output = document.getElementById("TestOutput")
    Output.innerHTML = cFileReaders["Input 2"].result
}

function TestDownload() {
    let Output = document.getElementById("TestOutput")
    DownloadFile(Output.innerHTML)
}

