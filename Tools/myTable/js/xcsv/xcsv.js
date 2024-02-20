// ################################################################
// class XCSV                                                      #
// ################################################################

class clsXCSV {
        constructor(egoDivID, {headers=["A", "B", "C"], data=[[1,2,3], ["a", "b", "c"]]}) {
            this.egoDivID = egoDivID
            this.XData = new clsData(this, headers, data)
            this.XReader = new clsReader(this)
            this.XPrinter = new clsPrinter(this)
        }
    }