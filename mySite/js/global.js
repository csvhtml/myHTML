// ##################################################################################
// Infoblock                                                                        #
// ##################################################################################

function infoblock(text, o = "r") {
    document.getElementById("id-infoblock-" + o).innerHTML = text
}

// ##################################################################################
// Navbar Calls                                                                     #
// ##################################################################################
// Left Menu
function DownloadHTML() {
    // DownloadFile(XCSV["main"].XHTML.AsCSV())
    DownloadFile(XCSV["main"].XHTML.DataAsHTML(CSS_HTMLEXPORT))
}


// Right Menu
function ParseFromFileReader() {
    let text = cFileReaders["nav-input"].result
    // XCSV["main"].XReader.ReadXCSV(text)
    XCSV["main"].XFormat.Read(text)
    XCSV["main"].XHTML.Print()
    // infoblock(FileNameFromPath(cFileReaders_File["nav-input"].value) ,"l")
    XCSV["main"].Info.level1(FileNameFromPath(cFileReaders_File["nav-input"].value))
}

function DownloadCSV() {
    // DownloadFile(XCSV["main"].XHTML.AsCSV())
    DownloadFile(XCSV["main"].XFormat.DataAsCSV())
}


// ##################################################################################
// UnserInput Calls                                                                 #
// ##################################################################################
// Click
function Click() {
    let div = cUSERINPUT_EVENT["event"].srcElement
    XCSV["main"].XClick.ClickEvent(div)
}

// ####################################################################################
// EDIT                                                                               #
// ####################################################################################
function Gloabl_Edit_Textarea(div) {
    /**
    * This function is called before a div textarea is created
    * It returns a value (related to div.innerHTML) which is then put as value to the textarea
    */
    if (XCSV["main"].XNames.IDs.IsCell(div.id)) {
        let row = document.getElementById(XCSV["main"].XNames.IDs.RowfromCellID(div.id))
        row.style.height = (row.getBoundingClientRect()["height"]+40)+"px"}
    
    let value_modified = div.innerHTML
    // value_modified = SVGtoMyMarkdown(value_modified)
    value_modified = HTMLtoMyMarkdown(value_modified)
    return value_modified
}

function Edit_Save(divID, value) {
    let dataName = XCSV["main"].XNames.DataNameFromID(divID)
    if (value == "") {value = ".."}
    if (XCSV["main"].XNames.IDs.IsCell(divID)) {
        //data
        let RC = XCSV["main"].XNames.IDs.RC_fromID(divID)
        XCSV["main"].XWorkingItems[dataName].data[RC[0]][RC[1]] = value
        // dataconfig
        // XCSV["main"].XConfigItems.CreateConfigItems()
        //style
        _helper_MinHeight_Undo(divID)

    }

    if (XCSV["main"].XNames.IDs.IsHeader(divID)) {
        let h = XCSV["main"].XNames.IDs.C_fromHeaderID(divID)
        XCSV["main"].XWorkingItems[dataName].headers[h] = value
    }
        let value_modified = value
        value_modified = MyMarkDowntoHTML(value_modified, ignore1 = ["[("])
        value_modified = MyMarkDowntoSVG(value_modified)
        
        return value_modified
}


function Edit_Close(divID) {
    _helper_MinHeight_Undo(divID)
    return 
}
