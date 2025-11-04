class clsXCSV_Clickhandler {
    constructor(parent) {
            this.parent = parent
        }

    ClickEvent(div) {
        if (div.id == undefined) {
            console.log("WARNING: Click Event to div with no id!")
            return
        }

        let divID = div.GetParentWithID().id
        if(!this.parent.XNames.IDs.IsItems(divID)) return

        // this.parent.XSelection.set(divID) // this.parent.Activate(ItemsName); 
        let ItemsName = this.parent.XNames.IDs.ItemsName(divID)
        this.parent.XInfo.Level2(ItemsName)

        if (this.parent.XNames.IDs.IsNameBox(divID)) {
            this._Namebox(divID)
            return}

        if (this.parent.XNames.IDs.IsSidebarItem(divID)) {
            this._SidebarItem(divID)
            return}

        if (this.parent.XNames.IDs.IsHeader(divID)){
            this._HeaderCell(divID)
            return}

        if (this.parent.XNames.IDs.IsCell(divID)){
            this._Cell(divID)
            return}

        if (this.parent.XNames.IDs.IsWikiName(divID) || this.parent.XNames.IDs.IsWikiDescription(divID)) {
            this._WikiItem(divID)
            return}
    }

    SidebarClickEvent(li) {
        let itemIndex = -1
        let targetWrapperID = ""; let targetnameboxID = "" 

        if (this._IsTopSidebarLevel(li)) {
            let itemName = li.dataset["name"]  // dependent on nav.js
            itemIndex = this.parent.XNames.IDs.ItemsIndexFromName(itemName)
            targetnameboxID = this.parent.XNames.IDs._namebox(itemIndex)
        } else {
            let itemName = li.parentElement.previousElementSibling.dataset["name"]  // dependent on nav.js
            itemIndex = this.parent.XNames.IDs.ItemsIndexFromName(itemName)
    
            let rowName = li.dataset["name"];  // dependent on nav.js
            let rowIndex = this.parent.XItems[itemIndex].dicts.map(item => item["name"]).indexOf(rowName)
            
            
            targetnameboxID = this.parent.XNames.IDs._row(rowIndex, itemIndex)
        }
        targetWrapperID = this.parent.XNames.IDs._wrapper(itemIndex)

        this.parent.XSelection.Activate(targetWrapperID)
        this.parent.XSelection.ScrollToitem(targetnameboxID)
    }

    _IsTopSidebarLevel(li) {
        return li.parentElement.parentElement.tagName.toLowerCase() == 'ul'
    }

    _HeaderCell(divID) {
        _SelectTableElement(divID)
    }

    _Cell(divID) {
        let rowID = this.parent.XNames.IDs.RowfromCellID(divID)
        if (this._AlreadyInFocus(rowID)) {
            this.parent.XSelection.unset()
            this.parent.XSelection.set(divID)
            this.parent.XSelection.edit(divID)}
        else {
            this.parent.XSelection.unset()
            this.parent.XSelection.set(rowID)}  
    }

    _Namebox(divID) {
        _SelectTableElement(divID)
    }

    _SelectTableElement(divID) {
        if (this._AlreadyInFocus(divID)) {
            this.parent.XSelection.unset()
            this.parent.XSelection.set(divID)
            this.parent.XSelection.edit(divID)}
        else {
            this.parent.XSelection.unset(divID)
            this.parent.XSelection.set(divID)}
    }

    _WikiItem(divID) {
        _SelectTableElement(divID)
    }

    _AlreadyInFocus(divID) {
        return (this.parent.XSelection.currentSelection() == divID)
    }

    _SidebarItem(divID) {
        let ItemsIndex = this.parent.XNames.IDs.ItemsIndex(divID)
        let targetnameboxID = this.parent.XNames.IDs._namebox(ItemsIndex)
        this.parent.XSelection.ScrollToitem(targetnameboxID)

        this.parent.XSelection.unset(targetnameboxID)
        this.parent.XSelection.set(targetnameboxID)
    }

// ####################################################################################
// region State Transitions                                                           #
// ####################################################################################

    _IsOuterItemArea(div) {
        return this.parent.config['EgoID'] == div.id
    }
}