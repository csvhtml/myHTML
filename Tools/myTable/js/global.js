// ##################################################################################
// Navbar Calls                                                                     #
// ##################################################################################
// Left Menu
function DownloadHTML() {
    // DownloadFile(XCSV["mainX"].XHTML.AsCSV())
    // DownloadFile(XCSV["mainX"].XHTML.DataAsHTML(CSS_HTMLEXPORT))
    DownloadFile(XCSV["mainX"].XHTML.PrintContent(CSS_HTMLEXPORT))
}


// Right Menu
function ParseFromFileReader() {
    let text = cFileReaders["nav-input"].result
    // XCSV["mainX"].XReader.ReadXCSV(text)
    XCSV["mainX"].XFormat.Read(text)
    XCSV["mainX"].XHTML.Print()
    XCSV["mainX"].XInfo.Level1(FileNameFromPath(cFileReaders_File["nav-input"].value))
}

function DownloadCSV() {
    // DownloadFile(XCSV["mainX"].XHTML.AsCSV())
    DownloadFile(XCSV["mainX"].XFormat.DataAsCSV())
}


// ##################################################################################
// UnserInput Calls                                                                 #
// ##################################################################################
// Click
function Click() {
    let div = cUSERINPUT_EVENT["event"].srcElement
    XCSV["mainX"].XClick.ClickEvent(div)
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
    if (XCSV["mainX"].XNames.IDs.IsCell(div.id)) {
        let rowID = XCSV["mainX"].XNames.IDs.RowfromCellID(div.id)
        // let row = document.getElementById(_Edit_RowID(rowID))
        let row = document.getElementById(rowID)
        // row.style.height = (row.getBoundingClientRect()["height"]+40)+"px"
    }
    
    let value_modified = div.innerHTML
    // value_modified = SVGtoMyMarkdown(value_modified)
    value_modified = HTMLtoMyMarkdown(value_modified)
    return value_modified
}

function Edit_Save(divID, value, valueOld) {
    if (value == "") {value = XCSV_CONFIG['default value']}
    if (XCSV["mainX"].XNames.IDs.IsCell(divID)) {
        let RC = XCSV["mainX"].XNames.IDs.RC_fromID(divID)
        XCSV["mainX"].XData.data[RC[0]][RC[1]] = value
        _Edit_MinHeight_Undo(divID)

        if (!IsEqual(value, valueOld)) XCSV["mainX"].XHISTORY.MarkAsChanged_FromID(divID)
    }

    if (XCSV["mainX"].XNames.IDs.IsHeader(divID)) {
        let h = XCSV["mainX"].XNames.IDs.C_fromHeaderID(divID)
        if (XCSV["mainX"].XData.Type() == 'text') {
            XCSV["mainX"].XData.headers[h] = '[text]'+ value} 
        else {
            XCSV["mainX"].XData.headers[h] = value}  
    }

    if (XCSV["mainX"].XNames.IDs.IsNameBox(divID)) {
        XCSV["mainX"].XData.name = value    
    }

    let value_modified = MyMarkDowntoHTML(value, ignore1 = ["[("])
    // value_modified = MyMarkDowntoHTML(value_modified, ignore1 = ["[("])
    // value_modified = MyMarkDowntoSVG(value_modified)
    
    // if (!IsEqual(value, valueOld)) XCSV["mainX"].XHISTORY.MarkAsChanged_FromID(divID)
    
    return value_modified
}

function Edit_Save_Post() {
    XCSV["mainX"].XHTML.Print()
}

function Edit_Close(divID) {
    _Edit_MinHeight_Undo(divID)
    return 
} 

function Edit_Focus(div) {
    let ItemsName = RetStringBetween(div.id, 'id-textarea-[', '] ')
    XCSV["mainX"].Activate(ItemsName)
    return 
}

// ####################################################################################
// Edit  helper                                                                       #
// ####################################################################################

function _Edit_MinHeight(divID) {
    let row = document.getElementById(XCSV["mainX"].XNames.IDs.RowfromCellID(divID))
    if (row.getBoundingClientRect()["height"] < 60) {
        row.style.height = "80px"}
    }

function _Edit_MinHeight_Undo(divID) {
    let row = document.getElementById(XCSV["mainX"].XNames.IDs.RowfromCellID(divID))
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
    
    if (XCSV["mainX"].config["SidebarVisible"]) {
        sidebar.style.display = "None"
        button.style.left = '10pt'
        button.innerHTML = '-'
        content.style.marginLeft = '30pt'
        content.style.minWidth = '1070pt'
        XCSV["mainX"].config["SidebarVisible"] = false
    } else {
        sidebar.style.display = "Block"
        button.style.left = '155pt'
        button.innerHTML = 'X'
        content.style.marginLeft = '200pt'
        content.style.minWidth = '900pt'
        XCSV["mainX"].config["SidebarVisible"] = true
    }
  }


// ####################################################################################
// Test Function                                                                      #
// ####################################################################################


function testNewFeature() {
    console.log("Run new feature")

    XCSV["mainX"].XHISTORY.UnmarkAll()
    XCSV["mainX"].XHTML.Print()

}