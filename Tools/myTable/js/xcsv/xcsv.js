// ################################################################
// class XCSV                                                     #
// ################################################################

class clsXCSV {
        constructor(egoDivID, config) {   
            this.config = {}  
            this.config["Ego Div ID"] = egoDivID
            // this.config = config
            
            this.XAssert = new clsXCSV_assert(this)  // OK

            this.XFormat = new clsFormatFile(this)  // OK
            this.XItems = [
                new clsData(this, this.XFormat.Name(XCSV_DATA_ITEMS))
            ]
            this.XData = this.XItems[0]        // internal reference to active XItems set

            this.XHTML = new clsFormatHTML(this)  // OK

            this.XNames = new clsXCSV_Names(this)  // OK
            this.XClick = new clsXCSV_Clickhandler(this)  // OK
            this.XSelection = new clsXCSV_Selectionhandler(this)  // OK
            this.XInfo = new clsXCSV_Infohandler(this)


            // Apply
            this.__config()
            this.XFormat.Read(XCSV_DATA_ITEMS.trimPlus()) 
        }

        __config() {
            let keys = [
                "Ego Div ID",           // the DOM element id where the content fo this class are printed
                'infoblocks',           // list of div ids where feedback information from this class shall be dieplayed. Max 3 divs. The first in the list has highest prio.
                                        // Each info has a importance level and will overwrite the innerHTML of that div when it reaches the prio level.
            ]
            for (let k of keys) {
                if (this.config[k] === undefined) this.config[k] = null}
        }

        Config(cfg) {
            let keys = Object.keys(this.config)

            if (typOf(cfg) == 'str')
                if (keys.includes(cfg)) return this.config[cfg]
            if (typOf(cfg) != 'dict') return -1
            for (let k in cfg) {
                if (!keys.includes(k)) return -1
                if (cfg[k] == -1) return -1
                this.config[k] = cfg[k]} // set config
        }

        Activate(name) {
            let index = -1
            for (let i = 0; i < this.XItems.length; i++) {
                if (this.XItems[i].name === name) index = i
            }
            if (index >-1) this.XData = this.XItems[index]
            this.XHTML.Print()
        }

        ActiveIndex() {
            for (let i = 0; i < this.XItems.length; i++) {
                if (this.XItems[i] === this.XData) return i
            }
        }

        Add(headers, data, name) {
            let x = new clsData(this)
            x.Init(headers, data, name)
            this.XItems.push(x)
        }

        
        AddRow() {
            this.XData.AddRow()
            this.XHTML.Print()
        }

        AddCol() {
            let lastHeaderName = this.XData.headers[this.XData.headers.length-1]
            this.XData.AddCol(lastHeaderName + '-copy')
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
