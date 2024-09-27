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
                // new clsData()
            ]
            this.XHTML = new clsFormatHTML(this)  // OK

            this.XNames = new clsXCSV_Names(this)  // OK
            this.XClick = new clsXCSV_Clickhandler(this)  // OK
            this.XSelection = new clsXCSV_Selectionhandler(this)  // OK
            this.XInfo = new clsXCSV_Infohandler(this)


            // Apply
            this.__config()
            this.XFormat.Read(XCSV_DATA_ITEMS['table'].trimPlus()) 
            this.Activate()
            // this.XData = this.XItems[0]        // internal reference to active XItems set
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

        ItemsNamesList() {
            return this.XItems.map(item => item.name)}

        ItemsNamesExist(name) {
            if (this.ItemsNamesList().includes(name)) return true
            return false
        }

        ItemNameAvailable(proposal) {
            while (this.ItemsNamesExist(proposal)) {
                proposal += '-copy'
            }
            return proposal
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
            if (IsUndefined([name])) {
                this.XData = this.XItems[0]; 
                this.XSelection.ActiveItemsName = this.XItems[0].name
                return }
                
            assert(this.XItems.map(item => item.name).includes(name))
            
            let ItemsIndex = this.XItems.map(item => item.name).indexOf(name)
            this.XSelection.ActiveItemsName = name
            this.XData = this.XItems[ItemsIndex]
        }

        ActiveIndex() {
            let ItemsIndex1 = -2; let ItemsIndex2 = -2
            // Option 1
            ItemsIndex1 = this.XItems.map(item => item.name).indexOf(this.XSelection.ActiveItemsName)


            // Option 2
            for (let i = 0; i < this.XItems.length; i++) {
                if (this.XItems[i] === this.XData) ItemsIndex2 = i}

            assert(ItemsIndex1 == ItemsIndex2)
            return ItemsIndex1
        }

        Add(headers, data, name) {  // when headers, data are defined, then also gallery and text are added here
            if (IsPartlyUndefined[headers, data, name]) return false       // either compeltey defined or not
            this.xAdd(headers,data, name)
            this.XHTML.Print()
        }

        Add_Text() {
            let nhd = this.XFormat._NameHeadersData(XCSV_DATA_ITEMS['text'])
            if (nhd[0])
            this.xAdd(nhd[0][1],nhd[0][2], nhd[0][0])
            this.XHTML.Print()
        }

        Add_Gallery() {
            //
        }

        Remove(ItemsIndex) {
            if (IsUndefined([ItemsIndex])) ItemsIndex = this.ActiveIndex()
            let flag = false
            if (this.XData === this.XItems[ItemsIndex]) flag = true
            this.XItems.splice(ItemsIndex,1)
            if (flag) this.Activate()
            this.XHTML.Print()
        }

        xAdd(headers, data, name, index) {
            let x = new clsData(this)
            let nhd = [[name, headers, data]]
            if (IsUndefined([headers, data, name])) nhd = this.XFormat._NameHeadersData(XCSV_DATA_ITEMS['table'])
            nhd[0][0] = this.ItemNameAvailable(nhd[0][0])
            x.Init(nhd[0][1], nhd[0][2], nhd[0][0])

            if (IsUndefined([index])) index = this.XItems.length
            this.XItems.splice(index, 0, x)
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

const XCSV_DATA_ITEMS = {
    'table': '\
                ||||Default Data\n\
                ||A|B|C\n\
                ||1|2|3\n\
                ||5 Leerzeichen|Neue\nZeile|[Link::URL]\n\
                ||[ ] leere Checkbox|[x] leere Checkbox|[Link::URL]\n\
    ',
    'text':     '\
                ||||Default Text\n\
                ||[text]Summary\n\
                ||Desciption\n\n\n\n\n.\n\
    ',
    'gallery':     '\
                ||||Default Gallery\n\
                ||Summary\n\
                ||pic1.png,pic2.png,pic3.png\n\
'
}

const XCSV_CONFIG = {
    'default value': '..',
    'min-width': '600pt'
}

const XCSV_DATA_DEFAULT_VALUE = '..'
