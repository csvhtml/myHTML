// ################################################################
// class XCSV                                                     #
// ################################################################

class clsXCSV {
        constructor(egoDivID, config) {   
            this.config = {}  
            this.config["Ego Div ID"] = egoDivID
            // this.config = config
            
            this.XAssert = new clsXCSV_assert(this)  // OK

            this.XFormat = new clsFormat(this)  // OK
            this.config['activeItems'] = this.XFormat.Name(XCSV_DATA_ITEMS)
            this.XItems = {
                [this.config['activeItems']] : new clsData(this, this.config['activeItems'])
            }
            this.XData = this.XItems[this.config['activeItems']]        // internal reference 

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

// ################################################################
// XCSV - default values                                          #
// ################################################################

const XCSV_DATA_ITEMS = '\
            ||||Default Data\n\
            ||A|B|C\n\
            ||1|2|3\n\
            ||5 Leerzeichen|Neue\nZeile|[Link::URL]\n\
            ||[ ] leere Checkbox|[x] leere Checkbox|[Link::URL]\n\
    '

const XCSV_DATA_DEFAULT_VALUE = '..'
