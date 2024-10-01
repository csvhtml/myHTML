class clsXCSV_Clickhandler {
    constructor(parent) {
            this.parent = parent
        }

    ClickEvent(div) {
        let divID = div.GetParentWithID().id

        if(!this.parent.XNames.IDs.IsItems(divID)) return

        let ItemsName = this.parent.XNames.IDs.ItemsName(divID)
        this.parent.Activate(ItemsName); this.parent.XInfo.Level2(ItemsName)

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
    }

    _HeaderCell(divID) {
        if (this._AlreadyInFocus(divID)) {
            this.parent.XSelection.unset()
            this.parent.XSelection.set(divID)
            this.parent.XSelection.edit(divID)} 
        else {
            this.parent.XSelection.unset()
            this.parent.XSelection.set(divID)} 
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
        if (this._AlreadyInFocus(divID)) {
            this.parent.XSelection.unset()
            this.parent.XSelection.set(divID)
            this.parent.XSelection.edit(divID)}
        else {
            this.parent.XSelection.unset(divID)
            this.parent.XSelection.set(divID)}  
    }

    _SidebarItem(divID) {
        let ItemsIndex = this.parent.XNames.IDs.ItemsIndex(divID)
        let targetnameboxID = this.parent.XNames.IDs._namebox(ItemsIndex)
        this.parent.XSelection.ScrollToitem(targetnameboxID)

        this.parent.XSelection.unset(targetnameboxID)
        this.parent.XSelection.set(targetnameboxID)
    }

    _AlreadyInFocus(divID) {
        return (this.parent.XSelection.currentSelection() == divID)
    }
}