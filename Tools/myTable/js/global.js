// ##################################################################################
// Navbar Calls                                                                     #
// ##################################################################################
// Left Menu
function DownloadHTML() {
    // DownloadFile(XCSV["main"].XHTML.AsCSV())
    // DownloadFile(XCSV["main"].XHTML.DataAsHTML(CSS_HTMLEXPORT))
    DownloadFile(XCSV["main"].XHTML.PrintContent(CSS_HTMLEXPORT))
}


// Right Menu
function ParseFromFileReader() {
    let text = cFileReaders["nav-input"].result
    // XCSV["main"].XReader.ReadXCSV(text)
    XCSV["main"].XFormat.Read(text)
    XCSV["main"].XHTML.Print()
    XCSV["main"].XInfo.Level1(FileNameFromPath(cFileReaders_File["nav-input"].value))
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
        let rowID = XCSV["main"].XNames.IDs.RowfromCellID(div.id)
        // let row = document.getElementById(_Edit_RowID(rowID))
        let row = document.getElementById(rowID)
        // row.style.height = (row.getBoundingClientRect()["height"]+40)+"px"
    }
    
    let value_modified = div.innerHTML
    // value_modified = SVGtoMyMarkdown(value_modified)
    value_modified = HTMLtoMyMarkdown(value_modified)
    return value_modified
}

function Edit_Save(divID, value) {
    if (value == "") {value = XCSV_CONFIG['default value']}
    if (XCSV["main"].XNames.IDs.IsCell(divID)) {
        let RC = XCSV["main"].XNames.IDs.RC_fromID(divID)
        XCSV["main"].XData.data[RC[0]][RC[1]] = value
        _Edit_MinHeight_Undo(divID)
    }

    if (XCSV["main"].XNames.IDs.IsHeader(divID)) {
        let h = XCSV["main"].XNames.IDs.C_fromHeaderID(divID)
        if (XCSV["main"].XData.Type() == 'text') {
            XCSV["main"].XData.headers[h] = '[text]'+ value} 
        else {
            XCSV["main"].XData.headers[h] = value}  
    }

    if (XCSV["main"].XNames.IDs.IsNameBox(divID)) {
        XCSV["main"].XData.name = value    
    }

    let value_modified = value
    value_modified = MyMarkDowntoHTML(value_modified, ignore1 = ["[("])
    // value_modified = MyMarkDowntoSVG(value_modified)
    
    return value_modified
}

function Edit_Save_Post() {
    XCSV["main"].XHTML.Print()
}

function Edit_Close(divID) {
    _Edit_MinHeight_Undo(divID)
    return 
} 

// ####################################################################################
// Edit  helper                                                                       #
// ####################################################################################

function _Edit_MinHeight(divID) {
    let row = document.getElementById(XCSV["main"].XNames.IDs.RowfromCellID(divID))
    if (row.getBoundingClientRect()["height"] < 60) {
        row.style.height = "80px"}
    }

function _Edit_MinHeight_Undo(divID) {
    let row = document.getElementById(XCSV["main"].XNames.IDs.RowfromCellID(divID))
    if (row != null) {
        row.style.height = ""}
        
}


// ####################################################################################
// Sidebar                                                                            #
// ####################################################################################

function ToggleSidebar(divID) {
    let button = document.getElementById("id-button-sidebar")
    let sidebar = document.getElementById(divID)
    let content = document.getElementById("id-content")
    
    if (XCSV["main"].config["SidebarVisible"]) {
        sidebar.style.display = "None"
        button.style.left = '10pt'
        button.innerHTML = '-'
        content.style.marginLeft = '30pt'
        content.style.minWidth = '1070pt'
        XCSV["main"].config["SidebarVisible"] = false
    } else {
        sidebar.style.display = "Block"
        button.style.left = '170pt'
        button.innerHTML = 'X'
        content.style.marginLeft = '200pt'
        content.style.minWidth = '900pt'
        XCSV["main"].config["SidebarVisible"] = true
    }
  }
  