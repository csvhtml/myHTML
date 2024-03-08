// ################################################################
// class XCSV                                                      #
// ################################################################

class clsXCSV {
        constructor(egoDivID, {headers=["A", "B", "C"], data=[["1","2","3"], ["a", "b", "c"]]}) { // pseudo header. Actual headers are defined in via this.XReader.ReadXCSV(this._InitFile())
            // members
            this.egoDivID = egoDivID
            this.XData = new clsData(this, "X", headers, data, "XWorkingItems", true)   // not the source of truth. XData is always a clone of working or config items
            this.XWorkingItems = new clsDataCollection(this, ["X"], "XWorkingItems")
            this.XConfigItems = new clsDataCollection(this, ["Link"], "XConfigItems")
            this.XReader = new clsReader(this)
            this.XPrinter = new clsPrinter(this)

            this.XActiveCell = new clsXCSV_Cell(this)
            this.XNames = new clsXCSV_Names(this)
            this.XClick = new clsXCSV_Clickhandler(this)
            this.XSelection = new clsXCSV_Selectionhandler(this)

            // actions
            this.XReader.ReadXCSV(this._InitFile())
        }

        AddRow() {
            // if (this.XData.config["IsConfigItems"]) {
            //     this.XConfigItems[Xname].AddRow()}
            // if (this.XData.config["IsWorkingItems"]) {
            //     this["XWorkingItems"][Xname].AddRow()}
            
            this.XData.AddRow()
            this.XPrinter.Print()
        }

        _InitFile() {
            let ret = "\
            ||A|B|C\n\
            ||1|2|3\n\
            ||Hallo|Welt|dort\n\
            "

            return myTrim(ret)
        }
    }