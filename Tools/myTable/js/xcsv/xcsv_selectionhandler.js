class clsXCSV_Selectionhandler {
    constructor(parent) {
            this.parent = parent
            this.default = {
                'SelectedCell': "",
                'SelectedWrapperName': "",
                'SelectedRowIndex': -1,
                'SelectedHeaderCell': '',
                'SelectedWikiName': '',
                'SelectedWikiDescription': '',
            }
            
            this.SelectedCell = this.default['SelectedCell']
            this.SelectedWrapperName = this.default['SelectedWrapperName']
            this.SelectedRowIndex = this.default['SelectedRowIndex']
            this.SelectedHeaderCell = this.default['SelectedHeaderCell']
            this.SelectedWikiName = this.default['SelectedWikiName']
            this.SelectedWikiDescription = this.default['SelectedWikiDescription']
        }

    Activate(anything) {
        this.SetToDefault()
        if (anything == undefined) {

            }

        if (typOf(anything) == 'str') {
            if (this.parent.XNames.IDs.IsNameBox(anything) || this.parent.XNames.IDs.IsItems(anything)) {
                this.setSelectedWrapperName(this.parent.XNames.IDs.ItemsName(anything))
            }

            if (XCSV_CONFIG['ContentStyle'] == 'tables') {
                if (this.parent.XNames.IDs.IsCell(anything)) {
                    this.setSelectedCell(anything)
                    this.setSelectedWrapperName(this.parent.XNames.IDs.ItemsName(anything))
                    this.setSelectedRowIndex(this.parent.XNames.IDs.RC_fromID(anything)[0])
                    }
                
                if (this.parent.XNames.IDs.IsHeader(anything)) {
                    this.setSelectedHeaderCell(anything)
                    this.setSelectedWrapperName(this.parent.XNames.IDs.ItemsName(anything))
                    }
                }
            if (XCSV_CONFIG['ContentStyle'] == 'wiki') {
                if (this.parent.XNames.IDs.IsWikiName(anything) || this.parent.XNames.IDs.IsWikiDescription(anything)) {
                    let name = this.parent.XNames.IDs.ItemsName(anything)
                    let r = this.parent.XNames.IDs.R_fromWikiNameOrDescription(anything)
                    this.setSelectedWikiName(this.parent.XNames.IDs.wikiName(name, r))
                    this.setSelectedWikiDescription(this.parent.XNames.IDs.wikiDescription(name, r))
                    }
                }
            }

        if (typOf(anything) == 'int') {
            this.activateXitems(anything)
            return}

        this.Indicate()
    }

    GetDefault() {
        return this.default}

    setSelectedCell(id) {
        if (id == undefined) id = this.default['SelectedCell'] 
        this.SelectedCell = id;
    }

    setSelectedWrapperName(name) {
        if (name == undefined) name= this.default['SelectedWrapperName']
        this.SelectedWrapperName = name;
    }

    setSelectedRowIndex(index) {
        if (index == undefined) index = this.default['SelectedRowIndex']
        this.SelectedRowIndex = index;
    }

    setSelectedHeaderCell(id) {
        if (id == undefined) id = this.default['SelectedHeaderCell'] 
        this.SelectedHeaderCell = id;
    }

    setSelectedWikiName(id) {
        if (id == undefined) id = this.default['SelectedWikiName']
        this.SelectedWikiName = id;
    }

    setSelectedWikiDescription(id) {
        if (id == undefined) id = this.default['SelectedWikiDescription']
        this.SelectedWikiDescription = id;
    }

    activateXitems(ItemsNameIndex) {
        if (ItemsNameIndex == undefined) ItemsNameIndex = 0
        if (typOf(ItemsNameIndex) == 'str') ItemsNameIndex = this.parent.XNames.IDs.ItemsIndexFromName(ItemsNameIndex)

        this.SelectedCell = this.default['SelectedCell'] 
        this.SelectedWrapperName = this.parent.XItems[ItemsNameIndex].myName
        this.SelectedRowIndex = this.default['SelectedRowIndex']
    }

    activateRow(ItemsNameIndex, rowIndex) {
        if (ItemsNameIndex == undefined) ItemsNameIndex = 0
        if (typOf(ItemsNameIndex) == 'str') ItemsNameIndex = this.parent.XNames.IDs.ItemsIndexFromName(ItemsNameIndex)
        if (rowIndex == undefined) rowIndex = 0

        this.SelectedCell = this.default['SelectedCell'] 
        this.SelectedWrapperName = this.parent.XItems[ItemsNameIndex].myName
        this.SelectedRowIndex = rowIndex;
    }

    SetToDefault() {
        this.setSelectedCell()
        this.setSelectedWrapperName()
        this.setSelectedRowIndex()
        this.setSelectedHeaderCell()
        this.setSelectedWikiName()
        this.setSelectedWikiDescription()
    }

    ActiveItemsName() {
        if (this.SelectedWrapperName == "") this.SelectedWrapperName = this.parent.XItems[0].myName
        assert(this.SelectedWrapperName != "" && !this.SelectedWrapperName.includes(["[", "]"]))
        return this.SelectedWrapperName
    }

    ActiveItemsIndex() {
        return this.parent.XNames.IDs.ItemsIndexFromName(this.ActiveItemsName())
    }


    Indicate() {
       this.SelectedWrapperName = this.ActiveItemsName()
        
        this.unindicate()
        if (this.parent.config['Indicate Selections']) {
            if (this.SelectedWrapperName != '') this._indicateSelectedWrapper()
            if (this.SelectedRowIndex != -1) this._indicateSelectedRow()
            if (this.SelectedHeaderCell != '') this._indicateSelectedHeaderCell()
            if (this.SelectedWikiName != '') this._indicateSelectedWikiName()
            if (this.SelectedWikiDescription != '') this._indicateSelectedWikiDescription()
            
        }
        
    }

    _indicateSelectedWrapper() {
        if (this.SelectedWrapperName == this.default['SelectedWrapperName']) return
        if (XCSV_CONFIG['ContentStyle'] == 'tables' || XCSV_CONFIG['ContentStyle'] == 'wiki') {
            let wrapperID = this.parent.XNames.IDs._wrapper(this.SelectedWrapperName)
            // let wrapperID = this.parent.XNames.IDs._wrapper(this.ActiveItemsIndex()) also possible
            let nameboxID = this.parent.XNames.IDs._namebox(this.SelectedWrapperName)    

            document.getElementById(wrapperID).classList.add("bg-lblue-light")
            document.getElementById(nameboxID).classList.add("bg-lblue-light")
        }
                      
    }

    _indicateSelectedRow() {
        if (this.SelectedRowIndex < 0 ) return

        if (XCSV_CONFIG['ContentStyle'] == 'tables') {
            let rowID = this.parent.XNames.IDs._row(this.SelectedRowIndex, this.SelectedWrapperName)
            document.getElementById(rowID).classList.add("bg-lyellow-important")}
    }

    _indicateSelectedHeaderCell() {
        if (this.SelectedHeaderCell == this.default['SelectedHeaderCell']) return

        if (XCSV_CONFIG['ContentStyle'] == 'tables') {
            document.getElementById(this.SelectedHeaderCell).classList.add("bg-grey-important")
        }
    }

    _indicateSelectedWikiName() {
        if (this.SelectedWikiName == this.default['SelectedWikiName']) return
        if (XCSV_CONFIG['ContentStyle'] == 'wiki') {
            document.getElementById(this.SelectedWikiName).parentElement.classList.add("bg-lyellow-important")
        }
    }

    _indicateSelectedWikiDescription() {
        if (this.SelectedWikiDescription == this.default['SelectedWikiDescription']) return
        if (XCSV_CONFIG['ContentStyle'] == 'wiki') {
            document.getElementById(this.SelectedWikiDescription).parentElement.classList.add("bg-lyellow-important") // same parent as wikiName (duplicate)
        }      
    }

    unset() {
        this.SelectedCell = this.default['SelectedCell']
        this.SelectedWrapperName = this.default['SelectedWrapperName']
        this.SelectedRowIndex = this.default['SelectedRowIndex']
        this.SelectedHeaderCell = this.default['SelectedHeaderCell']
        this.parent.XInfo.Level3(this.SelectedCell)
    }

    unindicate() {
        DOM_RemoveClassFromAll(".bg-lblue")
        DOM_RemoveClassFromAll(".bg-lblue-light")     
        DOM_RemoveClassFromAll(".bg-lyellow-important")
        DOM_RemoveClassFromAll(".bg-grey-important")
    }

    ScrollToitem(targetID) {
        let namebox = document.getElementById(targetID);
        namebox.scrollIntoView();   // now the namebox is on top, i. e. hidden behidn the navbar. 

        let html = document.documentElement;
        html.scrollTop -= 70;
    }

}