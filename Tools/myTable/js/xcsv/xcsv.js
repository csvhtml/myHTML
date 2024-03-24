// ################################################################
// class XCSV                                                      #
// ################################################################

class clsXCSV {
        constructor(egoDivID, config) {     
            this.egoDivID = StringAssertAndReturn(egoDivID)
            this.config = config
            
            this.XAssert = new clsXCSV_assert(this)
            this.XcsvHandler = new clsCSVHandler(this) 
            this.XWorkingItems = new clsDataCollection(this, "XWorkingItems")
            this.XConfigItems = new clsDataCollection(this, "XConfigItems")
            this.XData = new clsData(this, this.config["WorkingItems"].key(0), "XWorkingItems", true)  
            
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