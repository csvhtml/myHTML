class clsXCSV_Selectionhandler {
    constructor(parent) {
            this.parent = parent
            this.SelectedID = ""
            // this.ActiveItemsName = ""
        }

    ActiveItemsName() {
        return this.parent.XNames.IDs.ItemsName(this.SelectedID)
    }

    Activate(ItemsIndexOrName) {
        // only if no ID is selected, then by default the namebox is selected
        if (this.SelectedID != '') return 

        let NameBoxID = this.parent.XNames.IDs._namebox(ItemsIndexOrName)
        this.SelectedID = NameBoxID
        if(document.getElementById(NameBoxID)) this.set(NameBoxID) 
    }

    set(divID) {
        this.unsetAll()
        let ItemsIndex = this.parent.XNames.IDs.ItemsIndex(divID)
        // set content
        this.SelectedID = divID
        this.parent.XData = this.parent.XItems[ItemsIndex]

        if (this.parent.config['Indicate Selections']) this.parent.XSIndicator.set(ItemsIndex, divID)
        
        // // set content style ( actually this should be part of print, as it handles dom layout)
        // let wrapperID = this.parent.XNames.IDs.WrapperID_FromChildID(divID)
        // document.getElementById(divID).classList.add("xcsv-focus","bg-lblue")   
        // document.getElementById(wrapperID).classList.add("bg-lblue-light")
        
        // // set sidebar style 
        // let targetSidebarItemID = this.parent.XNames.IDs._sidebarItem(ItemsIndex)
        // document.getElementById(targetSidebarItemID).classList.add("xcsv-focus","bg-lblue")
        
        // messages
        let X = this.parent.XNames.IDs; let msg = ''
        if (X.IsRow(divID)) {
            msg = "Selected Row: " + String(this.parent.XNames.IDs.R_fromRowID(this.SelectedID, true))
            this.parent.XInfo.Level3(msg); return}
        if (X.IsCell(divID)) {
            msg = "Selected Cell: " + String(this.parent.XNames.IDs.RC_fromID(this.SelectedID, true))
            this.parent.XInfo.Level3(msg); return}
        if (X.IsHeader(divID)) {
            let ItemsIndex = this.parent.XNames.IDs.ItemsIndex(divID)
            msg = "Selected Header: " + this.parent.XItems[ItemsIndex].headers[this.parent.XNames.IDs.C_fromHeaderID(this.SelectedID)]
            this.parent.XInfo.Level3(msg); return}
        if (X.IsNameBox(divID)) {
            let ItemsIndex = this.parent.XNames.IDs.ItemsIndex(divID)
            msg = "Selected Namebox: " + this.parent.XItems[ItemsIndex].headers[this.parent.XNames.IDs.C_fromHeaderID(this.SelectedID)]
            this.parent.XInfo.Level3(msg); return}
    }

    unsetAll() {
        this.unset()
        // this.ActiveItemsName = ""
    }

    unset() {
        if (this.SelectedID == '') return
        if (this.parent.XItems.length == 1) return   // if there's only one item, i can not be unselected

        if (document.getElementById(this.SelectedID)) {
            // in case edit is active
            EDIT.Init_Undo()

            //content
            document.getElementById(this.SelectedID).classList.remove("xcsv-focus", "bg-lblue", "myEdit")
            let wrapperID = this.parent.XNames.IDs.WrapperID_FromChildID(this.SelectedID)
            document.getElementById(wrapperID).classList.remove("bg-lblue-light")

            // sidebar
            let ItemsIndex = this.parent.XNames.IDs.ItemsIndex(this.SelectedID)
            let targetSidebarItemID = this.parent.XNames.IDs._sidebarItem(ItemsIndex)
            document.getElementById(targetSidebarItemID).classList.remove("xcsv-focus", "bg-lblue", "myEdit")
        }
        this.SelectedID = ""
        this.parent.XInfo.Level3(this.SelectedID)
    }

    edit(divID) {
        this.SelectedID = divID
        document.getElementById(divID).classList.add("myEdit")
        EDIT.Init()
    }

    currentSelection() {
        return this.SelectedID
    }
    
    Row() {
        let X = this.parent.XNames.IDs
        let id = this.currentSelection()
        return wenn(X.IsRow(id), X.R_fromRowID(id), -1)
    }

    Col() {
        let X = this.parent.XNames.IDs
        let id = this.currentSelection()
        return wenn(X.IsHeader(id), X.C_fromHeaderID(id), -1)
    }

    ScrollToitem(targetID) {
        let namebox = document.getElementById(targetID);
        namebox.scrollIntoView();   // now the namebox is on top, i. e. hidden behidn the navbar. 

        let html = document.documentElement;
        html.scrollTop -= 70;
    }

}