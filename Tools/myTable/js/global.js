// ================================================================
// region navbar buttons                                          =
// ================================================================


function DownloadHTML() {
    DownloadFile(XCSV.XAsText.AsHTML())
}

async function UploadFile(event) {
  let ret = await clsFiles.upload()
  if (!ret) return
  let {file, content} = ret[0]
    XCSV.XFormat.Read(content)
    XCSV.XSelection.unset()
    let title = file['name']
    XCSV.Title(title)
    XCSV.XHTML.Print()
    PROXY.CreateSidebar(XCSV.XHTML._SidebarData())
}

function DownloadFile() {
  clsFiles.download(XCSV.XFormat.DataAsCSV(), XCSV.Title())
}


// togle the visibility of the contant when the navbar is clicked
function global_NavbarAlwaysOnTop(event) {
    let a = event.currentTarget
    let nav = a.parentElement
    if (nav.classList.contains("nav-js-active")) {
        document.getElementById(ID_CONTENT).classList.add('z--1')
    } else {
        document.getElementById(ID_CONTENT).classList.remove('z--1')
    }
}

// ================================================================
// region key event                                               =
// ================================================================

function User_Keybord_Handler(event) {
    if (!event instanceof KeyboardEvent) return 
    if (event.key == 'Escape') {
        XCSV.XSelection.unset()
        UpdateShowHide()
        PROXY.EDIT_DiscardAll()
    }

    if (event.ctrlKey && (event.key === 'Enter' || event.key === ' ')) {
        PROXY.EDIT_SaveAllText()
    }
}

// ####################################################################################
// Edit  helper                                                                       #
// ####################################################################################

function _Edit_MinHeight(divID) {
    let row = document.getElementById(XCSV.XNames.IDs.RowfromCellID(divID))
    if (row.getBoundingClientRect()["height"] < 60) {
        row.style.height = "80px"}
    }

function _Edit_MinHeight_Undo(divID) {
    let row = document.getElementById(XCSV.XNames.IDs.RowfromCellID(divID))
    if (row != null) {
        row.style.height = ""}
        
}


// ####################################################################################
// Sidebar                                                                            #
// ####################################################################################

function ToggleSidebar() {
    let sidebar = document.getElementById(XCSV.config["SidebarID"])
    sidebar.classList.toggle('hidden-i')

    let content = document.getElementById(XCSV.config["EgoID"])
    content.classList.toggle('left-18vw')
    content.classList.toggle('w-80vw')
    content.classList.toggle('left-1vw')
    content.classList.toggle('w-97vw')

    if (XCSV.config["SidebarVisible"]) {
        XCSV.config["SidebarVisible"] = false
    } else {
        XCSV.config["SidebarVisible"] = true
        PROXY.CreateSidebar(XCSV.XHTML._SidebarData())
    }
}

function MoveUp(idx) {
    XCSV.MoveUp(Number(idx))
}

function MoveDown(idx) {
    XCSV.MoveDown(Number(idx))
}

function global_toogleActiveSideBarItem(event) {
    let classe = 'bg-lblue'
    let divElement = DOM_ElementFromJSEvent(event, true)
    let ul = divElement.closest('ul');

    for (let li of ul.querySelectorAll('li')) {
        li.removeClassX(classe)}
    divElement.classList.add(classe)
}

//============================================
// Scroll Into View
//============================================

function CheckDivVisibility() {
    let ItemTables = document.querySelectorAll('.ContentWrapper');
  
    for (let table of ItemTables) {
        let rect = table.getBoundingClientRect();
  
        if (rect.bottom > 0) {    // rect.top is the viewPort position, whereas contentBox.top would be the position of the div in the document
            XCSV.XSelection.Activate(table.id); // Set the selected div ID in XCSV
            // console.log("Div is visible:", table.id);
            // handleDivArrival(contentBox.id);
            break; // Exit loop after handling the first visible div
        }
    }
}

// ####################################################################################
// View                                                                               #
// ####################################################################################

function colorTheme(typ) {
    let navbar = document.getElementById('id-navbar')
    let sidebar = document.getElementById('id-sidebar')
    let tables = document.querySelectorAll('table')
    let sidebarItems = document.querySelectorAll('.sidebar-item')
    if (typ == 'dark') {
        cSITE['colorTheme'] = 'dark' 
        document.body.classList.add('dark-3')
        navbar.classList.add('dark-1')
        sidebar.classList.add('dark-2')
        tables.forEach(table => {let rows = table.querySelectorAll('tr'); rows.forEach(row => {row.classList.add('dark-2');});});
    } else {
        cSITE['colorTheme'] = 'light'
        document.body.classList.remove('dark-3')
        navbar.classList.remove('dark-1')
        sidebar.classList.remove('dark-2')
        tables.forEach(table => {let rows = table.querySelectorAll('tr'); rows.forEach(row => {row.classList.remove('dark-2');});});
    }  

}

function viewMode(typ) {
    if (typ == 'table') cSite['viewMode'] = 'table'
    if (typ == 'wiki') cSite['viewMode'] = 'wiki'
}



// ####################################################################################
// Test Function                                                                      #
// ####################################################################################



function testNewFeature() {
    console.log("Run new feature")

    XCSV.Migration()
    XCSV_CONFIG['ContentStyle'] = 'items'
    // XCSV_CONFIG['ContentStyle'] = 'table'
    XCSV.XHTML.Print()
    
    b_editableHTML_init()
}

function global_SidebarClick(event) {
    let li= DOM_ElementFromJSEvent(event, true)
    assert(li instanceof HTMLLIElement)

    XCSV.XClick.SidebarClickEvent(li)
}


function user_click(event) {
    XCSV.Activate(DOM_ElementFromJSEvent(event).id)
}


// region archiv 


// ##################################################################################
// regio UnserInput Calls                                                          #
// ##################################################################################

// function User_Click(event) {
//     let div = null
//     if (typeof event === "object" && event instanceof MouseEvent) {
//         div = event.currentTarget}
//     XCSV.XClick.ClickEvent(div)

//     UpdateShowHide()
// }





// ####################################################################################
// from Edit gloabl                                                                   #
// ####################################################################################

// // whenn the div (that was clicked) is inside a cell
// // the row height is extended
// // and the cell value as markdown is returned
// function XX_Gloabl_Edit_Textarea(div) {
//     /**
//     * This function is called before a div textarea is created
//     * It returns a value (related to div.innerHTML) which is then put as value to the textarea
//     */
//     if (XCSV.XNames.IDs.IsCell(div.id)) {
//         let rowID = XCSV.XNames.IDs.RowfromCellID(div.id)
//         // let row = document.getElementById(_Edit_RowID(rowID))
//         let row = document.getElementById(rowID)
//         // row.style.height = (row.getBoundingClientRect()["height"]+40)+"px"
//     }
    
//     let value_modified = div.innerHTML
//     // value_modified = SVGtoMyMarkdown(value_modified)
//     value_modified = HTMLtoMyMarkdown(value_modified)
//     return value_modified
// }

// function XX_Edit_Save(divID, value, valueOld) {
//     if (value == "") {value = XCSV_CONFIG['default value']}
//     if (XCSV.XNames.IDs.IsCell(divID)) {
//         let RC = XCSV.XNames.IDs.RC_fromID(divID)
//         XCSV.XData.data[RC[0]][RC[1]] = value
//         _Edit_MinHeight_Undo(divID)

//         if (!IsEqual(value, valueOld)) XCSV.XHISTORY.MarkAsChanged_FromID(divID)
//     }

//     if (XCSV.XNames.IDs.IsHeader(divID)) {
//         let h = XCSV.XNames.IDs.C_fromHeaderID(divID)
//         if (XCSV.XData.Type() == 'text') {
//             XCSV.XData.headers[h] = '[text]'+ value} 
//         else {
//             XCSV.XData.headers[h] = value}  
//     }

//     if (XCSV.XNames.IDs.IsNameBox(divID)) {
//         XCSV.XData.name = value    
//     }

//     // let value_modified = new MyMarkDown().toHTML(value)
//     // value_modified = MyMarkDowntoHTML(value_modified, ignore1 = ["[("])
//     // value_modified = MyMarkDowntoSVG(value_modified)
    
//     // if (!IsEqual(value, valueOld)) XCSV.XHISTORY.MarkAsChanged_FromID(divID)
    
//     return value_modified
// }

// function XX_Edit_Save_Post() {
//     XCSV.XHTML.Print()
// }

// function XX_Edit_Close(divID) {
//     _Edit_MinHeight_Undo(divID)
//     return 
// } 

// function XX_Edit_Focus(div) {
//     let ItemsName = RetStringBetween(div.id, 'id-textarea-[', '] ')
//     XCSV.Activate(ItemsName)
//     return 
// }
