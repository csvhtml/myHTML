// ################################################################
// class XCSV                                                     #
// ################################################################

class clsXCSV {
        constructor(egoDivID, config) {     
            this.egoDivID = egoDivID
            this.config = config
            this.XAssert = new clsXCSV_assert(this)  // OK

            this.XFormat = new clsFormat(this)  // OK
            this.XWorkingItems = new clsDataCollection(this, "XWorkingItems")  // Skip
            this.XConfigItems = new clsDataCollection(this, "XConfigItems")  // Skip
            this.XData = new clsData(this, this.config["WorkingItems"].key(0), "XWorkingItems", true)
            
            this.XHTML = new clsHTML(this)  // OK

            this.XNames = new clsXCSV_Names(this)  // OK
            this.XClick = new clsXCSV_Clickhandler(this)  // OK
            this.XSelection = new clsXCSV_Selectionhandler(this)  // OK

            this.XFormat.Read(XCSV_DATA_ITEMS.trimPlus()) 
        }

        AddRow() {
            this.XData.AddRow()
            this.XHTML.Print()
        }
    }

// ################################################################
// XCSV - inner config                                            #
// ################################################################

const CLSXCSV_NAMES = {
    "id": {
        "header": {
            "prefix":'header-',
            "postfix": ''
        },
        "cell": {
            "r":'R:',
            "c":'C:',
            "h":'H:',
        },
        "row":{
            "prefix":'row-',
            "postfix": ''
        }
    }
}
