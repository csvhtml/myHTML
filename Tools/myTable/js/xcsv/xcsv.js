// ################################################################
// class XCSV                                                      #
// ################################################################

class clsXCSV {
        constructor(egoDivID, {headers=["A", "B", "C"], data=[[1,2,3], ["a", "b", "c"]]}) {
            this.egoDivID = egoDivID
            this.Xdata = new clsData(this, headers, data)
            this.XPrinter = new clsPrinter(this)
        }
    }