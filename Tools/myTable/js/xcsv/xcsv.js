// ################################################################
// class XCSV                                                     #
// ################################################################

class clsXCSV {
        constructor(config) {   
            this.config = this.__config(config)
            this.title = XCSV_DATA_ITEMS['filename']

            this.XAssert = new clsXCSV_assert(this)
            this.XFormat = new clsReadFile(this)
            this.XItemsD = new clsDataD(this)
            this.XItems = []
            this.XItems_Baseline = []
            this.XHTML = new clsFormatHTML(this)
            this.XNames = new clsXCSV_Names(this) 
            this.XClick = new clsXCSV_Clickhandler(this)
            this.XSelection = new clsXCSV_Selectionhandler(this)
            this.XAsText = new clsSiteAsText(this)
            this.XInfo = new clsXCSV_Infohandler(this)
            this.XHISTORY = new clsXCSV_ChangeHandler(this)


            // Apply
            this.XFormat.Read(XCSV_DATA_ITEMS['table'].trimPlus([' |'])) 
        }

        __config(config) {
            let ret = byVal(XCSV_CONFIG)
            for (let key in config) {
                if (key in ret) {
                    ret[key] = config[key]
                }
            }
            return ret
        }

        Migration() {
            for (let XItem of this.XItems) {
                for (let item of XItem.dicts) {
                    this.XItemsD.add(item)
                }
            }
        }

        ItemsByName(name) {
            assert(typOf(name) == 'str')
            let idx = this.ItemsNamesList().indexOf(name)
            return this.XItems[idx]
        }

        ItemsNamesList() {
            return this.XItems.map(item => item.myName)}

        ItemsNamesExist(name) {
            if (this.ItemsNamesList().includes(name)) return true
            return false
        }

        ItemNameAvailable(proposal) {
            while (this.ItemsNamesExist(proposal)) {
                proposal += ' copy'
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

        Reset() {
            this.XItems = []
            this.XSelection.SetToDefault()
            this.XFormat.Read(XCSV_DATA_ITEMS['table'].trimPlus([' |'])) 
            XCSV.Config({})
            XCSV.XHTML.Print()
        }

        Activate(divID) {
            this.XSelection.Activate(divID)
        }

        SetViewMode(mode) {
            this.XHTML.SetViewMode(mode)
        }

        Title(newTitle) {
            if (newTitle == undefined) return this.title
            this.title = newTitle
        }

        Add(headers, data, name) {  // when headers, data are defined, then also gallery and text are added here
            if (IsPartlyUndefined[headers, data, name]) return false       // either compeltey defined or not
            this.xAdd(headers, data, name)
            this.XHTML.Print()
            PROXY.CreateSidebar(this.XHTML._SidebarData())
        }

        Add_Text() {
            this.xAdd_Text()
            this.XHTML.Print()
        }

        xAdd_Text() {
            let nhd = this.XFormat._NameHeadersData(XCSV_DATA_ITEMS['text'])
            if (nhd[0])
            this.xAdd(nhd[0][1],nhd[0][2], nhd[0][0])
        }

        Add_Gallery() {
            //
        }

        Remove(ItemsIndex) {
            if (IsUndefined([ItemsIndex])) ItemsIndex = this.XSelection.ActiveItemsIndex()
            this.XItems.splice(ItemsIndex,1)
            this.XSelection.SetToDefault()
            this.XHTML.Print()
            PROXY.CreateSidebar(this.XHTML._SidebarData())
        }

        xAdd(headers, data, name, index) {
            let x = new clsData(this)
            let nhd = [[name, headers, data]]
            if (IsUndefined([headers, data, name])) nhd = this.XFormat._NameHeadersData(XCSV_DATA_ITEMS['table'])
            nhd[0][0] = this.ItemNameAvailable(nhd[0][0])
            x.Init(nhd[0][1], nhd[0][2], nhd[0][0])

            if (IsUndefined([index])) index = this.XItems.length
            this.XItems.splice(index, 0, x)
            this.XSelection.Activate(index)
        }
        
        AddRow() {
            let selected = this.XSelection.ActiveItemsIndex()
            // this.XHISTORY.Shift(1,0)
            this.XItems[selected].AddRow()
            this.XHTML.Print()
        }

        AddCol() {
            let lastHeaderName = this.XData.headers[this.XData.headers.length-1]
            // this.XHISTORY.Shift(0,1)
            this.XData.AddCol(lastHeaderName + ' copy')
            this.XHTML.Print()
        }

        DelRow() {
            this.XData.DelRow()
            this.XHTML.Print()
        }

        DelCol() {
            this.XData.DelCol()
            this.XHTML.Print()
        }

        MoveUp(idx) {
            if (idx <1) return
            let tmp = this.XItems[idx-1]
            this._OVERWRTIE_XItem(idx-1, this.XItems[idx])
            this._OVERWRTIE_XItem(idx, tmp)
            this.XHTML.Print()
        }

        MoveDown(idx) {
            if (idx > this.XItems.length-1) return 
            let tmp = this.XItems[idx+1]
            this._OVERWRTIE_XItem(idx+1, this.XItems[idx])
            this._OVERWRTIE_XItem(idx, tmp)
            this.XHTML.Print()
        }

        SetValue(name, row, col, value) {
            assert(typOf(name) == 'str' && typOf(row) == 'int' && typOf(col) == 'int')
            assert(this.XItems.map(item => item.myName).includes(name))
   
            let idx = this.ItemsNamesList().indexOf(name)
            this.XItems[idx].SetValue(row, col, value)

            return clsMarkDown.toHTML(value)
        }

        SetHeader(name, col, value) {
            assert(typOf(name) == 'str' && typOf(col) == 'int' && typOf(value) == 'str')
            assert(this.XItems.map(item => item.myName).includes(name))
            let idx = this.ItemsNamesList().indexOf(name)

            for (let colDefined of ['name', 'description']) {
                if (this.XItems[idx].headers[col] == colDefined  && value != colDefined ) {
                    popup('Warning', 'header "' + colDefined + '" is a pre-defined header and cannot be changed')
                    return colDefined}
            }

            this.XItems[idx].ChangeColName(this.XItems[idx].headers[col], value)
            return value
        }

        _OVERWRTIE_XItem(idx, newItem) {
            this.XItems[idx] = newItem
        }


        OrderItems_IsNumbered(name) {
            let NameUntilBlank = name.until(' ')
            return ValidChars('0123456789', NameUntilBlank)
        }
    
    }
// ####################################################################################
// XCSV config                                                                        #
// ####################################################################################

// function XSCV_ItemsNumberingOn() {
//     XCSV["mainX"].Config({'Items Numbering': true})
// }

// function XCSV_ItemsNumberingOff() {
//     XCSV["mainX"].Config({'Items Numbering': false})
// }

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
        },
        "wikiName": {
            "prefix":'wikiName-',
            "postfix": ''
        },
        "wikiDescription": {
            "prefix":'wikiDescription-',
            "postfix": ''
        },
    }
}

// ################################################################
// XCSV - default values                                          #
// ################################################################

const XCSV_DATA_ITEMS = {
    'filename': 'new file.xsv',

    'table': `
                ||||new table
                ||name|description
                ||Neue
                Zeile|[(200x100)test/pic2.png]
                ||[ ] leere Checkbox
                [x] leere Checkbox|[Link::URL]
    `,
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
    'EgoID': null,
    'SidebarID': null,
    'CurrentID': null,
    'InfoIDs': [null,null,null],

    'default value': '..',
    'min-width': '100%',
    'SidebarVisible': true,
    'Items Numbering': false,
    'Indicate Selections':true,
    'ContentStyle': 'tables',   // items, table
}

const XCSV_DATA_DEFAULT_VALUE = '..'


                // ||MOHI: Sicherstellen, dass alle daten mindestens die zwei attribute name und description haben. wenn nicht kommt es zur user fehlermeldung (html)|2|3
                // ||1)konflikt mit dem data attibute name auflösen->identifier| |
                // ||2)Funktion in data die die integritiaet prüft, also name und description| |
                // ||3) Beim einlesen der datei, dann prüfen| |