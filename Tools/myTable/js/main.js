// ================================================================
// Dependecies to other js modules                                =
// ================================================================


class proxyFunctions {
    constructor({EgoID = "", SidebarID=""}) {
        this.EgoID = EgoID
        this.sidebarID = SidebarID
    }

    CreateSidebar (sidebarData) {
        // from <script src="../../../mo-hi.github.io/navbar/js/nav.js"></script>
        NAV_Sidebar(this.sidebarID, sidebarData)
        NAV_AddGenericClickFunction(this.sidebarID, global_SidebarClick)
        NAV_AddGenericClickFunction(this.sidebarID, global_toogleActiveSideBarItem)   
    }

    RemoveSidebar() {
        document.getElementById(this.parent.config["SidebarID"]).innerHTML = ''
    }

    EDITABLE () {
        new functions_editableHTML().Init(this.EgoID);
    }

    USERCLICK_Init() {
        let elements = document.querySelectorAll('.js-event');
        elements.forEach(element => {new clsMouseHandler().addEventListeners(element,user_click)});
    }

    EDIT_SaveAllText() {
       editableHTML_SaveAllText()
    }

    EDIT_DiscardAll() {
        editableHTML_DiscardAll()
    }

    NavbarAlwaysOnTop() {
        NAV_AddGenericClickFunction(ID_NAVBAR, global_NavbarAlwaysOnTop)
    }

}

//============================================
// EDIT functions to be modified by user
//============================================

    CONST_EDITABLE_HTML_FUNCTION_CALLS = {
        "edit": editableHTML_your_edit_function,  // innerHTML -> textAreaValue
        "save": editableHTML_your_save_function,  // textAreaValue -> InnerHTML
    }
    
        
    function editableHTML_your_edit_function(innerHTML, editableDiv) {
        // return string that will be the textarea value when edit button is clicked

        return clsMarkDown.HTMLtoMyMarkdown(innerHTML)
    }

    function editableHTML_your_save_function(textAreaValue, editableDiv) {
        let name = XCSV.XNames.IDs.ItemsName(editableDiv.id)

        if (XCSV.XNames.IDs.IsNameBox(editableDiv.id)) {
            let ItemdIndex = XCSV.XNames.IDs.ItemsIndexFromName(name)
            XCSV.XItems[ItemdIndex].myName= textAreaValue
            PROXY.CreateSidebar(XCSV.XHTML._SidebarData())
            // update the ids in all the div
            document.querySelectorAll('div[id^="[' + name + ']"]').forEach(div => {
                div.id = div.id.replace('[' + name + ']', '[' + textAreaValue + ']')})
            return textAreaValue
        } 

        let RC = XCSV.XNames.IDs.RC_fromID(editableDiv.id)
        if (RC[0] == -1) return XCSV.SetHeader(name, RC[1], textAreaValue)
        if (RC[0] > -1 && RC[1] > -1) return XCSV.SetValue(name, RC[0], RC[1], textAreaValue)
        
    }



    // region archiv
    // Feature: [X], [/], [!]  shall be interpreted as svg icons/symbols for red, green yellow
// Refactor: xcsv_dataCollection to dynamically define new config items
 
// DropDowns
// const DD = new libDropDowns();

// User Input 
// const UIN = new clsMouseHandler({"onClick":User_Click})

// const NAV = new proxyNAV("id-sidebar")

// const CSVG = new clsSVG();  // MOHI: fix. the clsSVG class automatically creates svg icons. If referenced multipel time, itmes are multiple times created. libEdit also defines a SVG


// const EDIT = new libEdit('EDIT', true);

// const XCSV = {
//     // "main": new clsXCSV("id-main", XCSV_DATA)
//     "mainX": new clsXCSV({EgoID: "id-main", 
//                         SidebarID: "id-sidebar", 
//                         InfoIDs:['id-infoblock-l', 'id-infoblock-m', 'id-infoblock-r']})
// };

// (function () {
//     // UserInput
//     window.addEventListener('keyup', User_Keybord)
//     // window.addEventListener('mousedown', UIN.MouseDown)
//     // window.addEventListener('mouseup', UIN.MouseUp)
//     // UpDownloadConfig
//     for (let key of Object.keys(FILES_UPLOAD_CONFIG) ) {
//         cFileReaders[key] = new FileReader()
//     }
//     XCSV["mainX"].Config({})
//     XCSV["mainX"].Title('new CSV')
//     XCSV["mainX"].XHTML.Print()
//     XCSV["mainX"].XInfo.Level1("New")

// })();