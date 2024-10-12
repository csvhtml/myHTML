class clsXCSV_ChangeHandler {
    constructor(parent) {
            this.parent = parent
            this.log = []
            this.Changes = []
        }

        MarkAsChanged_FromID(divID) {
            let ItemsIndex = this.parent.XNames.IDs.ItemsIndex(divID)
            let RCIndex = this.parent.XNames.IDs.RC_fromID(divID)
            this.MarkAsChanged({ItemsIndex:ItemsIndex, RowIndex:RCIndex[0], ColIndex:RCIndex[1]})
        }

        MarkAsChanged({ItemsIndex= -1, RowIndex = -1, ColIndex = -1}) {
            assert(ItemsIndex >-1 && ColIndex > -1)
            this.Changes.push(this._Change(ItemsIndex, RowIndex, ColIndex))
        }

        UnmarkAll() {
            this.Changes = []
        }

        _Change(ItemsIndex, RowIndex, ColIndex) {
            return {
                'ItemsIndex': ItemsIndex,
                'RowIndex': RowIndex,
                'ColIndex': ColIndex,
                
            }
        }

        ShowBars() {
            for (let change of this.Changes) {
                let cellID = this.parent.XNames.IDs.cells(change['ItemsIndex'])[change['RowIndex']][change['ColIndex']]
                document.getElementById(cellID).classList.add("vertical-bar-blue")   
            }
        }
    
}