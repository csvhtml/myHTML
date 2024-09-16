function TestFunction() {
    let Output = document.getElementById("TestOutput")
    Output.innerHTML = cFileReaders["Input 2"].result
}

function TestFunctionMulti(srcID) {
    let Output = document.getElementById("TestOutput"); Output.innerHTML = ''
    let fileList = cFileMulti[srcID].AsList().map(element => element.name)

    for (let fileName of fileList) {
        Output.innerHTML += fileName + ' , '
    }
}

function TestDownload() {
    let Output = document.getElementById("TestOutput")
    DownloadFile(Output.innerHTML)
}

