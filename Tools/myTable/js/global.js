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


function Edit_Edit(div) {
    _Edit_MinHeight(div.id)
}

function Edit_Textarea(div) {
    let value_modified = div.innerHTML
    return value_modified
}

function Edit_Save(divID, value) {
    //data
    let RC = XCSV["main"].XNames.IDs.RC_fromID(divID)
    XCSV["main"].XData.SetValueRC(RC[0], RC[1], value)
    //style
    _Edit_MinHeight_Undo(divID)
    let value_modified = value
    return value_modified
}

function Edit_Close(divID) {
    _Edit_MinHeight_Undo(divID)
    return 
}

function _Edit_RowID(divID) {
    return XCSV["main"].XNames.IDs.RowfromCellID(divID)}    

function _Edit_MinHeight(divID) {
    let row = document.getElementById(_Edit_RowID(divID))
    if (row.getBoundingClientRect()["height"] < 60) {
        row.style.height = "80px"}
    }

function _Edit_MinHeight_Undo(divID) {
    let row = document.getElementById(_Edit_RowID(divID))
        row.style.height = ""
}