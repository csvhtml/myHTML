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

        //Shifting indexpointers in 'this.Changes' (left right, top, down), e. g. due to addd or delete col
        Shift(rows, cols, fromSelection = true) {
            if (typOf(rows) != 'int' && typOf(cols) != 'int') return 
            // if nothing is selected, then no shift
            if (fromSelection && this.parent.XSelection.Row() == -1 && this.parent.XSelection.Col() == -1) return
            if (fromSelection && this.parent.XSelection.Row() == -1 && rows != 0) return
            if (fromSelection && this.parent.XSelection.Col() == -1 && cols != 0) return
            

            let fromRow = -1; let fromCol = -1
            if (fromSelection) fromRow = this.parent.XSelection.Row() - 1
            if (fromSelection) fromCol = this.parent.XSelection.Col() - 1
            for (let i = 0; i<this.Changes.length; i++) {
                if (this.Changes[i]['RowIndex'] > fromRow) this.Changes[i]['RowIndex'] += rows
                if (this.Changes[i]['ColIndex'] > fromCol) this.Changes[i]['ColIndex'] += cols
                }
        }

        ShowBars() {
            for (let change of this.Changes) {
                let cellID = this.parent.XNames.IDs.cells(change['ItemsIndex'])[change['RowIndex']][change['ColIndex']]
                document.getElementById(cellID).classList.add("vertical-bar-blue")   
            }
        }
    
}