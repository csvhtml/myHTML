// ################################################################
// class XCSV                                                      #
// ################################################################

class clsXCSV {
        constructor(egoDivID, {headers=["A", "B", "C"], data=[[1,2,3], ["a", "b", "c"]]}) {
            // this.name = name
            this.egoDivID = egoDivID
            this.XData = new clsData(this, headers, data)
            this.XReader = new clsReader(this)
            this.XPrinter = new clsPrinter(this)

            this.XActiveCell = new clsXCSV_Cell(this)
            this.XNames = new clsXCSV_Names(this)
            this.XClick = new clsXCSV_Clickhandler(this)
            this.XFocus = new clsXCSV_Selectionhandler(this)
        }
    }


    // let zz = RetStringBetween(div.id, "[", "]") 
    // if (zz != "") {
    //     let X = XCSV[zz]
    //     let r = parent.XNames.RowfromCellID(divID)
    //     let c = parent.XNames.ColfromCellID(divID)
    //     let currentValue = document.getElementById("id-textarea").value
    //     X.XData.data[r][c] = currentValue
    //     X.XPrinter.Print()