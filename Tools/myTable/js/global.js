function ParseFromFileReader() {
    let text = cFileReaders["nav-input"].result
    // XCSV["main"].XReader.ReadXCSV(text)
    XCSV["main"].XFormat.Read(text)
    XCSV["main"].XHTML.Print()
    infoblock(FileNameFromPath(cFileReaders_File["nav-input"].value) ,"l")
}

function DownloadCSV() {
    // DownloadFile(XCSV["main"].XHTML.AsCSV())
    DownloadFile(XCSV["main"].XFormat.DataAsCSV())
}

function DownloadHTML() {
    // DownloadFile(XCSV["main"].XHTML.AsCSV())
    DownloadFile(XCSV["main"].XHTML.DataAsHTML(CSS_HTMLEXPORT))
}

function Click() {
    let div = cUSERINPUT_EVENT["event"].srcElement
    XCSV["main"].XClick.ClickEvent(div)
}

// ####################################################################################
// from Edit gloabl                                                                   #
// ####################################################################################

// whenn the div (that was clicked) is inside a cell
// the row height is extended
// and the cell value as markdown is returned
function Gloabl_Edit_Textarea(div) {
    /**
    * This function is called before a div textarea is created
    * It returns a value (related to div.innerHTML) which is then put as value to the textarea
    */
    if (XCSV["main"].XNames.IDs.IsCell(div.id)) {
        let row = document.getElementById(_Edit_RowID(div.id))
        row.style.height = (row.getBoundingClientRect()["height"]+40)+"px"}
    
    let value_modified = div.innerHTML
    value_modified = SVGtoMyMarkdown(value_modified)
    value_modified = HTMLtoMyMarkdown(value_modified)
    return value_modified
}

function Edit_Save(divID, value) {
    if (value == "") {value = ".."}
    if (XCSV["main"].XNames.IDs.IsCell(divID)) {
        //data
        let RC = XCSV["main"].XNames.IDs.RC_fromID(divID)
        XCSV["main"].XData.data[RC[0]][RC[1]] = value
        // dataconfig
        XCSV["main"].XConfigItems.CreateConfigItems()
        //style
        _Edit_MinHeight_Undo(divID)

    }

    if (XCSV["main"].XNames.IDs.IsHeader(divID)) {
        let h = XCSV["main"].XNames.IDs.H_fromHeaderID(divID)
        XCSV["main"].XData.headers[h] = value
    }
        let value_modified = value
        value_modified = MyMarkDowntoHTML(value_modified, ignore1 = ["[("])
        value_modified = MyMarkDowntoSVG(value_modified)
        
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



// used in xcsv_reader
