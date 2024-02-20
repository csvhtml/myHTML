function ParseFromFileReader() {
    let text = cFileReaders["nav-input"].result
    XCSV["main"].XReader.ReadXCSV(text)
}

function DownloadCSV() {
    DownloadFile(XCSV["main"].XPrinter.AsCSV())
}

function Click() {
    let div = cUSERINPUT_EVENT["event"].srcElement
    XCSV["main"].XClick.process(div)
}