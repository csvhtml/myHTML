// ################################################################
// class XCSV                                                      #
// ################################################################

class clsXCSV {
        constructor(egoDivID) {     
            this.egoDivID = StringAssertAndReturn(egoDivID)
            
            this.XAssert = new clsXCSV_assert(this)
            this.XcsvHandler = new clsCSVHandler(this)
            this.XData = new clsData(this, "X", "XWorkingItems", true)   
            this.XWorkingItems = new clsDataCollection(this, "XWorkingItems", XCSV_DATA["WorkingItems"])
            this.XConfigItems = new clsDataCollection(this, "XConfigItems", XCSV_DATA["ConfigItems"])
            
            this.XPrinter = new clsPrinter(this)

            this.XActiveCell = new clsXCSV_Cell(this)
            this.XNames = new clsXCSV_Names(this)
            this.XClick = new clsXCSV_Clickhandler(this)
            this.XSelection = new clsXCSV_Selectionhandler(this)
        }

        AddRow() {
            this.XData.AddRow()
            this.XPrinter.Print()
        }
    }