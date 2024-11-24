class clsXCSV_SelectionIndicator {
    constructor(parent) {
            this.parent = parent
        }

        set(ItemsIndex, divID) {
            if (this.parent.config['Indicate Selections']) {
                // set content style
                let wrapperID = this.parent.XNames.IDs.WrapperID_FromChildID(divID)
                document.getElementById(divID).classList.add("xcsv-focus","bg-lblue")   
                document.getElementById(wrapperID).classList.add("bg-lblue-light")
                        
                // set sidebar style 
                let targetSidebarItemID = this.parent.XNames.IDs._sidebarItem(ItemsIndex)
                document.getElementById(targetSidebarItemID).classList.add("xcsv-focus","bg-lblue")     
            }

        }
    }