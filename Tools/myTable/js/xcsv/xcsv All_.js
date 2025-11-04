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
// ###################################################
// asserts the init parameters (egoDivID and config) 
// makes assert functions available (central handling)
// ###################################################

class clsXCSV_assert {
    constructor(parent) {
        this.parent = parent
    }
    
    HeaderIs1D (headers) {
        assert(IsNotUndefined(headers), "Undefined headers")
        // assert(IsListEqualDepth(headers, [1,1]))
        assert(ListDepth(headers) == 1)
    }

    DataIs2D(data) {
        assert(IsNotUndefined(data), "Undefined data")
        // assert(IsListEqualDepth(data, [[1,1],[1,1]]), "DataIs2D failed")
        assert(ListDepth(data) == 2)
    }

    AddCol(atPosition, colName, newCol) {
        assert(-2 < atPosition  && atPosition < this.parent.XData.headers.length+1)
        assert(typOf(colName) == "str")
        assert(newCol.length == this.parent.XData.data.length || newCol.length == 0)}

}
class clsXCSV_ChangeHandler {
    constructor(parent) {
            this.parent = parent
            this.log = []
            this.Changes = []
        }

        MarkAsChanged_FromID(divID) {
            let ItemsIndex = this.parent.XNames.IDs.ItemsIndex(divID)
            let RCIndex = this.parent.XNames.IDs.RC_fromID(divID)
            this.MarkAsChanged({ItemsIndex:ItemsIndex, RowIndex:RCIndex[0], ColIndex:RCIndex[1]})
        }

        MarkAsChanged({ItemsIndex= -1, RowIndex = -1, ColIndex = -1}) {
            assert(ItemsIndex >-1 && ColIndex > -1)
            this.Changes.push(this._Change(ItemsIndex, RowIndex, ColIndex))
        }

        UnmarkAll() {
            this.Changes = []
        }

        _Change(ItemsIndex, RowIndex, ColIndex) {
            return {
                'ItemsIndex': ItemsIndex,
                'RowIndex': RowIndex,
                'ColIndex': ColIndex,
                
            }
        }

        //Shifting indexpointers in 'this.Changes' (left right, top, down), e. g. due to addd or delete col
        Shift(rows, cols, fromSelection = true) {
            if (typOf(rows) != 'int' && typOf(cols) != 'int') return 
            // if nothing is selected, then no shift
            if (fromSelection && this.parent.XSelection.Row() == -1 && this.parent.XSelection.Col() == -1) return
            if (fromSelection && this.parent.XSelection.Row() == -1 && rows != 0) return
            if (fromSelection && this.parent.XSelection.Col() == -1 && cols != 0) return
            

            let fromRow = -1; let fromCol = -1
            if (fromSelection) fromRow = this.parent.XSelection.Row() - 1
            if (fromSelection) fromCol = this.parent.XSelection.Col() - 1
            for (let i = 0; i<this.Changes.length; i++) {
                if (this.Changes[i]['RowIndex'] > fromRow) this.Changes[i]['RowIndex'] += rows
                if (this.Changes[i]['ColIndex'] > fromCol) this.Changes[i]['ColIndex'] += cols
                }
        }

        ShowBars() {
            for (let change of this.Changes) {
                let cellID = this.parent.XNames.IDs.cells(change['ItemsIndex'])[change['RowIndex']][change['ColIndex']]
                document.getElementById(cellID).classList.add("vertical-bar-blue")   
            }
        }
    
}
class clsXCSV_Clickhandler {
    constructor(parent) {
            this.parent = parent
        }

    ClickEvent(div) {
        if (div.id == undefined) {
            console.log("WARNING: Click Event to div with no id!")
            return
        }

        let divID = div.GetParentWithID().id
        if(!this.parent.XNames.IDs.IsItems(divID)) return

        // this.parent.XSelection.set(divID) // this.parent.Activate(ItemsName); 
        let ItemsName = this.parent.XNames.IDs.ItemsName(divID)
        this.parent.XInfo.Level2(ItemsName)

        if (this.parent.XNames.IDs.IsNameBox(divID)) {
            this._Namebox(divID)
            return}

        if (this.parent.XNames.IDs.IsSidebarItem(divID)) {
            this._SidebarItem(divID)
            return}

        if (this.parent.XNames.IDs.IsHeader(divID)){
            this._HeaderCell(divID)
            return}

        if (this.parent.XNames.IDs.IsCell(divID)){
            this._Cell(divID)
            return}

        if (this.parent.XNames.IDs.IsWikiName(divID) || this.parent.XNames.IDs.IsWikiDescription(divID)) {
            this._WikiItem(divID)
            return}
    }

    SidebarClickEvent(li) {
        let itemIndex = -1
        let targetWrapperID = ""; let targetnameboxID = "" 

        if (this._IsTopSidebarLevel(li)) {
            let itemName = li.dataset["name"]  // dependent on nav.js
            itemIndex = this.parent.XNames.IDs.ItemsIndexFromName(itemName)
            targetnameboxID = this.parent.XNames.IDs._namebox(itemIndex)
        } else {
            let itemName = li.parentElement.previousElementSibling.dataset["name"]  // dependent on nav.js
            itemIndex = this.parent.XNames.IDs.ItemsIndexFromName(itemName)
    
            let rowName = li.dataset["name"];  // dependent on nav.js
            let rowIndex = this.parent.XItems[itemIndex].dicts.map(item => item["name"]).indexOf(rowName)
            
            
            targetnameboxID = this.parent.XNames.IDs._row(rowIndex, itemIndex)
        }
        targetWrapperID = this.parent.XNames.IDs._wrapper(itemIndex)

        this.parent.XSelection.Activate(targetWrapperID)
        this.parent.XSelection.ScrollToitem(targetnameboxID)
    }

    _IsTopSidebarLevel(li) {
        return li.parentElement.parentElement.tagName.toLowerCase() == 'ul'
    }

    _HeaderCell(divID) {
        _SelectTableElement(divID)
    }

    _Cell(divID) {
        let rowID = this.parent.XNames.IDs.RowfromCellID(divID)
        if (this._AlreadyInFocus(rowID)) {
            this.parent.XSelection.unset()
            this.parent.XSelection.set(divID)
            this.parent.XSelection.edit(divID)}
        else {
            this.parent.XSelection.unset()
            this.parent.XSelection.set(rowID)}  
    }

    _Namebox(divID) {
        _SelectTableElement(divID)
    }

    _SelectTableElement(divID) {
        if (this._AlreadyInFocus(divID)) {
            this.parent.XSelection.unset()
            this.parent.XSelection.set(divID)
            this.parent.XSelection.edit(divID)}
        else {
            this.parent.XSelection.unset(divID)
            this.parent.XSelection.set(divID)}
    }

    _WikiItem(divID) {
        _SelectTableElement(divID)
    }

    _AlreadyInFocus(divID) {
        return (this.parent.XSelection.currentSelection() == divID)
    }

    _SidebarItem(divID) {
        let ItemsIndex = this.parent.XNames.IDs.ItemsIndex(divID)
        let targetnameboxID = this.parent.XNames.IDs._namebox(ItemsIndex)
        this.parent.XSelection.ScrollToitem(targetnameboxID)

        this.parent.XSelection.unset(targetnameboxID)
        this.parent.XSelection.set(targetnameboxID)
    }

// ####################################################################################
// region State Transitions                                                           #
// ####################################################################################

    _IsOuterItemArea(div) {
        return this.parent.config['EgoID'] == div.id
    }
}
class clsData {
    constructor(parent) {
        this.parent = parent
        this.myName = null
        this.headers = null
        this.data = null
        this.dicts = null
    }

    Init(headers, data, name) {
        this.myName = name
        this.InitHeaders(headers)
        this.InitData(data)
        this.InitDictionary()
        this.assertIntegrity()
    }

    Name_ChildrenNames() {
        let ret = {}
        // this is the name of the dataset (header of each table)
        ret["name"] = this.myName
        let childs = []
        for (let dict of this.dicts) {
            // this is the col/ key "name"
            // This will return the value of the key "name"/"Name" in the dictionary
            childs.push({"name": dict[this._keyIgnoreCase("name")]})}

        ret["children"] = childs
        return ret
    }

    // returns the key in the dictionary, based on the input key in Lowercase
    _keyIgnoreCase(key) {
        assert(key.isLowerCase(), "clsData - Key must be a string with only lowercase letters");
        let keys = this.headers.filter(h => h.toLowerCase() === key);
        if (keys.length === 1) return keys[0]

        assert (false, "clsData - No name found")
    }
    
    Type() {
        this.assertIntegrity()
        let type = ['table', 'gallery', 'text']

        if (this.headers.length == 1) type.removeX('table')                         // a table has at least two colums (but can have only one row)
        if (this.data.length == 1 ) type.removeX('gallery')                         // a gallery has at least two items (one colum, at least two rows)
        if (this.headers.length > 1) type.removeItems(['gallery', 'text'])          // a gallery and a text have only one single header
        if (this.data.length > 1) type.removeItems(['text'])                        // a text and a single item, where the text is (one colum, one row)
        if (this.data[0].length > 1) type.removeItems(['text'])  
        
        this.assertType(type[0])   
        return type[0]
    }

    Clear(val = '') {
        this.data.applyToItems(function() {return val})
    }

    InitHeaders(headers) {
        // Table -> headers is a 1D list, at least two columns
        // Text/Gallery -> headers is a 1D list, with one entry only
        this.parent.XAssert.HeaderIs1D(headers)
        this.headers = headers
    }

    InitData(data) {
        // Table -> Data is a 2D list

        // Gallery -> Data is a 1D list, at least two items

        // Text -> Data is a 1D list, with on entry only
        this.parent.XAssert.DataIs2D(data)
        this.data = data
    }

    InitDictionary() {
        let tmp = null; 
        this.dicts = []
        for (let i = 0; i<this.data.length; i++) {
            tmp = {}
            for (let header of this.headers) {
                tmp[header] = this.data[i][this.headers.indexOf(header)]
            }
            this.dicts.push(tmp)
        }
    }

    AddRow(newRow = []) {
        let selectedRow = this.parent.XSelection.SelectedRowIndex
        this.xAddRow(selectedRow, newRow)
    }

    xAddRow(atPosition = -1, newRow = []) {
            let targetPosition = wenn(atPosition == -1, this.data.length, atPosition)
            let targetRow = wenn(IsEqual(newRow, []), this._DefaultRow(), newRow)
            this.data.splice(targetPosition, 0, targetRow)               
            this._UpdateNumberCol()
    }

    // MOHI: Currently Cols are only puhsed not inserted at certain position
    AddCol(colName, newCol = []) {
        let atPosition = this.parent.XSelection.Col()      
        this.parent.XAssert.AddCol(atPosition, colName, newCol)
        // let targetPosition = wenn(atPosition == -1, this.headers.length, atPosition)
        let targetCol = wenn(IsEqual(newCol, []), this._DefaultCol(), newCol)
        this.headers.push(colName)
        this.data.insertColum(targetCol)
    }

    DelRow(index) {
        if (IsUndefined([index])) index = this.parent.XSelection.SelectedRowIndex
        if (index == -1) index = this.data.length - 1
        this.data.splice(index, 1)
    }

    DelCol(index) {
        if (IsUndefined([index])) index = this.parent.XSelection.Col()
        if (index == -1) index = this.headers.length - 1
        // MOHI
        this.headers.splice(index,1)
        for (let i = 0; i< this.data.length; i++) {
            this.data[i].splice(index, 1)
        }
    }

    ChangeColName(colName, newColname) {
        assert (!IsUndefined([colName, newColname])) 

        let idx = this.headers.indexOf(colName)
        assert(idx > -1)

        this.headers[idx] = newColname
    }

    SetValue(row, col, value) {
        assert (typOf(row) == 'int' && typOf(col) == 'int' && typOf(value) == 'str')
        assert (row < this.data.length && col < this.headers.length)
        this.data[row][col] = value
        // this.dicts[row][this.headers[col]] = value
        // this.parent.XHISTORY.MarkAsChanged(row, col)
    }

    _DefaultRow() {
        return new Array(this.headers.length).fill(XCSV_CONFIG['default value'])
    }

    _DefaultCol() {    
        return new Array(this.data.length).fill(XCSV_CONFIG['default value']) 
    }

    _UpdateNumberCol() {
        if (this.headers.indexOf("No") >-1) {
            let colIdx = this.headers.indexOf("No")
            for (let i = 0; i < this.data.length; i++) {
                this.data[i][colIdx] = String(i+1)}
        }
    }
    
    ColAsList(colName) {
        assert (typOf(colName) == "str")
        assert(this.headers.indexOf(colName)>-1)
        let ret = []

        let idx = this.headers.indexOf(colName)
        for (let row of this.data) {
            ret.push(byVal(row[idx]))}
        return ret
    }


    assertIntegrity() {
        assert(typOf(this.headers) == 'list' && this.headers.depth() == 1)
        assert(typOf(this.data) == 'list' && this.data.depth() == 2)
        assert(typOf(this.myName) == 'str')
    }

    assertType(type) {
        // verify via headers
        if (this.headers.length == 1) {
            if (this.headers[0].startsWith('[text]')) assert(type == 'text') 
            if (!this.headers[0].startsWith('[text]')) assert(type == 'gallery') }
        if (this.headers.length > 1) assert(type == 'table') 
        
        // verify via data (independent)
        if (this.data.length == 1) {
            if (this.data[0].length == 1) assert(type == 'text') 
            if (this.data[0].length > 1) assert(type == 'table') }       // special case of a table with only one row
        if (this.data.length > 1) {
            if (this.data[0].length == 1) assert(type == 'gallery') 
            if (this.data[0].length > 1) assert(type == 'table')   }     
    }
}
var clsDataD_mandatoryKeys = ['id', 'name', 'description', 'status', 'parent', 'successor'];

class clsDataD {
    constructor(parent) {
        this.parent = parent
        this.name = null
        this.items = []
    }

    validate(item) {
        if (item != undefined) return this._validateItem(item)

        this.items.forEach(this._validateItem);

        return true
    }

    _validateItem(item) {
        if (typOf(item) !== 'dict') throw new Error('clsDataD - item must be a dictionary')
        for (let key of clsDataD_mandatoryKeys) {
            if (!(key in item))                 throw new Error(`clsDataD - Missing mandatory key: ${key}`);
            if (typeof item[key] !== 'string')  throw new Error(`clsDataD - Value for key ${key} must be a string`);}
        
        return true
    }

    add(item) {
        for (let key of clsDataD_mandatoryKeys) {
            if (!(key in item)) {
                item[key] = ''
                if (key === 'id')       item['id'] = this._generateID();
                if (key === 'status')   item['status'] = 'new';
            }
        }
        this._validateItem(item)
        this.items.push(item)
    }

    _generateID() {
        // if a random id was not founter after n iterations, the function will return 0 indicating unsuccessful generation
        let newId = 0; let Iterations = 10**4;

        for (let i = 0; i < Iterations; i++) {
            newId = Math.floor(100000 + Math.random() * 900000).toString();
            if (!this.items.some(dataItem => dataItem.id === newId)) break;}
        return newId;
    }
}

class clsFormatHTML {
    constructor(parent) {
        this.parent = parent
        this.Item = new clsFormatHTML_Item(this.parent)
    }
    
    Print() {
        let _PRINT = new _clsPrintHTML(this.parent)
        _PRINT.ClearContent()

        let contentDiv = _PRINT.XItemsAsContentDiv("id-main")
        document.getElementById(this.parent.config["EgoID"]).appendChild(contentDiv)
        document.title = "XSV: "  + this.parent.title
        this.parent.XSelection.Indicate()

        PROXY.EDITABLE()
        
        PROXY.USERCLICK_Init()

        document.getElementById("id-main").firstElementChild.addEventListener('scroll', CheckDivVisibility);
        
        this.parent.XHISTORY.ShowBars()
    }

    _SidebarData() {
        let ret = []
        for (let i = 0; i < this.parent.XItems.length; i++) {
            ret.push(this.parent.XItems[i].Name_ChildrenNames())
        }
        return ret
    }

 

    SetViewMode(typ) {
        assert(['tables', 'wiki', 'table', 'items'].includes(typ))
        XCSV_CONFIG['ContentStyle'] = typ
        this.Print()
    }


}




// region Print

class _clsPrintHTML {
    //collection of functions to print HTML
    constructor(parent) {
        this.parent = parent
    }

    ClearContent() {
        document.getElementById(this.parent.config["EgoID"]).innerHTML = ''
    }

    XItemsAsContentDiv(targetID) {
        let retNode = document.createElement('div')
        if (targetID != undefined) retNode.id = targetID
        let wrapper = null; let appender = null
        let style = XCSV_CONFIG['ContentStyle']
        for (let i = 0; i < this.parent.XItems.length; i++) {
            if (style == 'tables') appender = this._DataAsDivTable(i)
            if (style == 'wiki') appender = this._DataAsWiki(i)
                
            wrapper = this._Wrapper(i)
            wrapper.appendChild(this._HeaderBox(i))
            wrapper.appendChild(appender)

            retNode.appendChild(wrapper)
        }

        this._MarkupToHTML(retNode)
        return retNode
    }

    _Wrapper(idx) {
        let ret = document.createElement('DIV')
        ret.id = this.parent.XNames.IDs._wrapper(idx)
        ret.innerHTML = ''
        ret.className = 'ContentWrapper pl-8 mb-30 js-event'
        // UIN.addEventListeners(ret)
        return ret
    }

    _HeaderBox(idx) {
        let ret = document.createElement('DIV')
        ret.id = this.parent.XNames.IDs._namebox(idx)
        ret.innerHTML = this.parent.XItems[idx].myName
        ret.className = "js-event js-edit NameBox py-12 px-15"
        ret.style = "min-width:" + XCSV_CONFIG['min-width']+';'
        // UIN.addEventListeners(ret)
        return ret
    }


    _DataAsDivTable(ItemsIndex) {
        let data = this.parent.XItems[ItemsIndex].data
        // let table = HTML_Table({cellsText:this._MarkupToX(ItemsIndex)})

        let table = HTML_Table({cellsText:data})
        table.id = this.parent.XNames.IDs.table(ItemsIndex)
        table.className = "tableStyle-01 ItemsTable"
        table.style = "min-width:" + XCSV_CONFIG['min-width']+';'
        
        table.bSetHeaders(this.parent.XItems[ItemsIndex].headers)
        table.bSetHeadersID(this.parent.XNames.IDs.headers(ItemsIndex))
       
        table.bSetRowsID(this.parent.XNames.IDs.rows(ItemsIndex))
        table.bSetCellsID(this.parent.XNames.IDs.cells(ItemsIndex))

        table.bAddClassToCells('cell js-edit js-event', true);

        if (cSITE["colorTheme"] == 'dark')  table.bSetRowsClass('dark-2') 
        return table
    }

    // takes only the data of the header 'name' and 'description' and creates a 
    // div with the name as h2 and the description as p
    _DataAsWiki(ItemsIndex) {
        let ret = document.createElement('div')
        let table = this._DataAsDivTable(ItemsIndex)
        let nameIndex = table.b_HeaderIndex("name");
        let descriptionIndex = table.b_HeaderIndex("description");
        for (let i = 1; i < table.rows.length; i++) {
            let row = table.rows[i]
            
            let divName = document.createElement('div')
            divName.innerHTML = row.cells[nameIndex].innerHTML
            divName.id = this.parent.XNames.IDs.wikiName(ItemsIndex, i-1)
            divName.className = 'h3-m0 wiki-name cell js-edit js-event px-12 py-6'
            // divName.innerHTML += new MyMarkDown().toHTML('## ' + row.cells[nameIndex].innerText + '\n')
            // divName.innerHTML = divName.innerHTML.until('<br'); divName.className = 'wiki-name'
            
            let divDescription = document.createElement('div')
            divDescription.innerHTML += row.cells[descriptionIndex].innerHTML;
            divDescription.id = this.parent.XNames.IDs.wikiDescription(ItemsIndex, i-1)
            divDescription.className = 'wiki-description cell js-edit js-event px-12 py-6'

            let divhorizontal = document.createElement('hr')
            divhorizontal.className = 'fade-grey mb-12'

            let divNameDescription = document.createElement('div')

            // ret.appendChild(divName)
            // ret.appendChild(divDescription)
            // ret.appendChild(divhorizontal)
            divNameDescription.appendChild(divName)
            divNameDescription.appendChild(divDescription)
            ret.appendChild(divNameDescription)
            ret.appendChild(divhorizontal)
        }
        return ret
    }

    _MarkupToHTML(div)  {
        let cells = div.querySelectorAll('.cell');
        for (let cell of cells) {
            cell.innerHTML = clsMarkDown.toHTML(cell.innerHTML);
        }
        return div;
    }

}



class clsFormatHTML_Item {
    constructor(parent) {
        this.parent = parent
        this.external = {
            'icons' : b_svg([12,18,24,36,48])
        }
    }
    
    Print() {
        let ret = document.createElement('div');
        ret.classList.add('itemD-container');
        for (let item of this.parent.XItemsD.items) {
            // ret += String(item.id) + '. ' + item.name + ': ' + item.description +  '<br/><br/>'
            ret.appendChild(this._Content_Item(item))
        }
        return ret.outerHTML;
    }

    _Content_Item(item) {
            let itemContainer = document.createElement('div');
            itemContainer.id = 'itemD-' + item.id
            itemContainer.classList.add('itemD', 'inline-block', 'mb-5', 'js-edit-node');
            itemContainer.appendChild(this._Content_Item_Left(item))
            itemContainer.appendChild(this._Content_Item_Center(item))
            itemContainer.appendChild(this._Content_Item_Right(item))
            return itemContainer
          }

    _Content_Item_Left(item) {
        // see 
        let left = document.createElement('div');
        left.classList.add('itemD-left');
        // left.appendChild(EditableDiv_TemplateButton('id-name-' + item.id))
        left.appendChild(EditableDiv_TemplateButtons('id-description-' + item.id))
        return left
        }

    _Content_Item_Center(item) {
        let center = document.createElement('div');
        center.classList.add('itemD-middle', 'pr-40');
        center.appendChild(this._Content_Item_name(item))
        center.appendChild(this._Content_Item_description(item))
        return center
    }

    _Content_Item_Right(item) {
        let right = document.createElement('div');
        right.classList.add('itemD-right');
        right.appendChild(EditableDiv_TemplateDiscard())
        right.appendChild(this._Content_Item_tags(item))
        return right
    }


    _Content_Item_name(item) {
        let name = document.createElement('div');
        name.innerHTML = item.name;
        name.id = 'id-name-' + item.id;
        name.classList.add('itemD-name', 'js-edit-div', 'w-100');
        return name;
    }      

    _Content_Item_description(item) {
        let description = document.createElement('div');
        description.id = 'id-description-' + item.id
        description.innerHTML = item.description
        description.classList.add('itemD-description', 'js-edit-div', 'w-100');
        // let description = EditableDiv_TemplateDiv('id-description-' + item.id, item.description, ['itemD-description', 'inline-block', 'w-100', 'js-edit-force-height'])
        // description.classList.add(, 'w-100', 'border');
        // description.appendChild(EditableDiv_TemplateDiv('id-description-' + item.id, item.description, ['w-100', 'p-2']))
        return description;
    }

    _Content_Item_tags(item) {
        let tags = document.createElement('div');
        tags.classList.add('itemD-right');
        for (let key of ['id', 'status', 'parent', 'successor']) {    // MOHI: -> refer to clsDataD_mandatoryKeys
            if (key in item) {
                tags.innerHTML += `<strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${item[key]}`+  '<br/>';
            }
        }
        return tags;  
    }
}
class clsXCSV_Infohandler {
    constructor(parent) {
        this.parent = parent
    }

    Level1(msg) {
        if (this.parent.config['InfoIDs'][0] != null) {
            document.getElementById(this.parent.config['InfoIDs'][0]).innerHTML = msg}
        
    }

    Level2(msg) {
        if (this.parent.config['InfoIDs'][1] != null) {
            document.getElementById(this.parent.config['InfoIDs'][1]).innerHTML = msg}
    }

    Level3(msg) {
        if (this.parent.config['InfoIDs'][2] != null) {
            document.getElementById(this.parent.config['InfoIDs'][2]).innerHTML = msg}
    }
}
// ################################################################
// Layout Naming Functions and Config                             #
// ################################################################
// IDs

class clsXCSV_Names {
    constructor(parent) {
        this.parent = parent
        this.IDs = new clsXCSV_Names_ID(parent)
    }

    IsHeader (divID) {
        if (this.IDs.IsHeader(divID)) {
            return true}
        return false
    }

    IsRow (divID) {
        if (this.IDs.IsRow(divID)) {
            return true}
        return false
    }

    IsCell (divID) {
        if (this.IDs.IsCell(divID)) {
            return true}
        return false
    }

    IsNameBox(divID) {
        if (this.IDs.IsNameBox(divID)) {
            return true}
        return false
    }

    }

class clsXCSV_Names_ID {
    constructor(parent) {
        this.parent = parent
    }

    ItemsName(divID) {
        let name = divID.between("[", "]")
        assert(this.parent.XItems.map(item => item.myName).includes(name))
        return name
    }

    ItemsIndex(divID) {
        return this.parent.XItems.map(item => item.myName).indexOf(this.ItemsName(divID))
    }
    
    ItemsIndexFromName(ItemsName) {
        return this.parent.XItems.map(item => item.myName).indexOf(ItemsName)
    }

    headers(ItemsIndex) {
        if (IsUndefined([ItemsIndex])) ItemsIndex = this.parent.XSelection.ActiveItemsIndex()
        let ret = []
        for (let header of this.parent.XItems[ItemsIndex].headers) {
            ret.push(this._header(header, ItemsIndex))}
        return ret
    }

    rows(ItemsIndex) {
        if (IsUndefined([ItemsIndex])) ItemsIndex = this.parent.ActiveIndex()
        let ret = []; let r = 0
        for (let row of this.parent.XItems[ItemsIndex].data) {
            ret.push(this._row(String(r), ItemsIndex))
            r +=1}
        return ret
    }

    cells(ItemsIndex) {
        if (IsUndefined([ItemsIndex])) ItemsIndex = this.parent.ActiveIndex()
        let headers = this.parent.XItems[ItemsIndex].headers
        let ret = []; let tmp = []; let r = 0; let c = 0
        for (let row of this.parent.XItems[ItemsIndex].data) {
            tmp = []
            c = 0
            for (let cell of row) {
                tmp.push(this._cell(r,c,headers[c], ItemsIndex))
                c +=1}
            ret.push(tmp)
            r +=1}

        return ret
    }

    RowfromCellID (divID) {
        if (this.IsRow(divID)) {
            return divID}
        let X = CLSXCSV_NAMES["id"]["cell"]
        let r = RetStringBetween(divID, X["r"], X["c"])
        let ItemsIndex = this.ItemsIndex(divID)
        return this._row(r, ItemsIndex)}

// ################################################################
// region Single Names                                            #
// ################################################################

    // MOHI: header name logic to be reworked
    _header(header, ItemsIndex) {
        let idxHeader = this.parent.XItems[ItemsIndex].headers.indexOf(header)
        let X = CLSXCSV_NAMES["id"]["header"]
        return this._egoprefix(ItemsIndex) + X["prefix"] + idxHeader + X["postfix"]
        // return this._egoprefix(ItemsIndex) + X["prefix"] + header + X["postfix"]
    }

    table(ItemsIndexOrName) {
        return this._egoprefix(ItemsIndexOrName) + 'table'
    }

    _cell(r,c,header, ItemsIndex) {
        let X = CLSXCSV_NAMES["id"]["cell"]
        return this._egoprefix(ItemsIndex) + X["r"] + r + X["c"] + c
        // return this._egoprefix(ItemsIndex) + X["r"] + r + X["c"] + c + X["h"] + header 
    }

    _row(r, ItemsIndexOrName) {
        let X = CLSXCSV_NAMES["id"]["row"]
        return this._egoprefix(ItemsIndexOrName) + X["prefix"] + r + X["postfix"]
    }

    _wrapper(ItemsIndexOrName) {
        return this._egoprefix(ItemsIndexOrName) + 'Wrapper'
    }

    _namebox(ItemsIndexOrName) {
        return this._egoprefix(ItemsIndexOrName) + 'Namebox'
    }

    _currentbox(ItemsIndexOrName) {
        return this._egoprefix(ItemsIndexOrName) + 'Currentbox'
    }

    _sidebarItem(ItemsIndexOrName) {
        return this._egoprefix(ItemsIndexOrName) + 'SidebarItem'
    }

    wikiName(ItemsIndexOrName, r) {
        let X = CLSXCSV_NAMES["id"]["wikiName"]
        return this._egoprefix(ItemsIndexOrName) + X["prefix"] + r + X["postfix"]
    }

    wikiDescription(ItemsIndexOrName, r) {
        let X = CLSXCSV_NAMES["id"]["wikiDescription"]
        return this._egoprefix(ItemsIndexOrName) + X["prefix"] + r + X["postfix"]
    }


    _egoprefix(ItemsIndexOrName) {
        assert(!IsUndefined([ItemsIndexOrName]))
        ItemsIndexOrName= NumberX(ItemsIndexOrName) 

        let name = ''
        if (typOf(ItemsIndexOrName) == 'int') name = this.parent.XItems[ItemsIndexOrName].myName
        if (typOf(ItemsIndexOrName) == 'str') name = ItemsIndexOrName
        
        return '[' + name + '] '
    }


// ################################################################
// region Is                                                      #
// ################################################################

    IsItems(divID) {
        let name = divID.between("[", "]")
        let condition1 = this.parent.XItems.map(item => item.myName).includes(name)    // is there a XItems dictionary with the name of the divID
        let condition2 = divID.startsWith("[" + name + "]")

        return condition1 && condition2
    }

    IsHeader(headerID) {
        let ItemsIndex = this.ItemsIndex(headerID)
        if (this.headers(ItemsIndex).includes(headerID)) {
            return true}
        return false
    }

    IsCell(cellID) {
        let ItemsIndex = this.ItemsIndex(cellID)
        if (ElementInArrayN(this.cells(ItemsIndex),cellID)) {
            return true}
        return false
    }

    IsRow(ID) {
        let ItemsIndex = this.ItemsIndex(ID)
        if (this.rows(ItemsIndex).includes(ID)) {
            return true}
        return false
    }

    IsNameBox(ID) {
        for (let i = 0; i< this.parent.XItems.length; i++) {
            if (ID == this._namebox(i))  return true}
        
            return false
    }

    IsCurrentBox(ID) {
        for (let i = 0; i< this.parent.XItems.length; i++) {
            if (ID == this._currentbox(i))  return true}
        
            return false
    }

    IsSidebarItem(ID) {
        for (let i = 0; i< this.parent.XItems.length; i++) {
            if (ID == this._sidebarItem(i))  return true}
        
            return false 
    }

    IsWikiName(ID) {
        for (let i = 0; i< this.parent.XItems.length; i++) {
            for (let r = 0; r < this.parent.XItems[i].data.length; r++) {
                if (ID == this.wikiName(i, r))  return true
            }
        }
        return false
    }

    IsWikiDescription(ID) {
        for (let i = 0; i< this.parent.XItems.length; i++) {
            for (let r = 0; r < this.parent.XItems[i].data.length; r++) {
                if (ID == this.wikiDescription(i, r))  return true
            }
        }
        return false
    }


// ################################################################
// region Ret Index                                               #
// ################################################################

    RC_fromID(divID) {
        assert(this.IsCell(divID) || this.IsRow(divID) || this.IsHeader(divID))

        if (divID.includes(CLSXCSV_NAMES["id"]["header"]["prefix"])) {
            return [-1, this.C_fromHeaderID(divID)]}

        if (divID.includes(CLSXCSV_NAMES["id"]["row"]["prefix"])) {
            return [this.R_fromRowID(divID), -1]}

        return this._RC_fromID(divID)
    }

    _RC_fromID(divID, FirstIndexisOne = false) {
        assert(this.IsCell(divID))

        let X = CLSXCSV_NAMES["id"]["cell"]
        let r = Number(RetStringBetween(divID, X["r"], X["c"]))
        let c = Number(RetStringBetween(divID, X["c"], ''))
        // let c = Number(RetStringBetween(divID, X["c"], X["h"]))
        if (FirstIndexisOne) {
            return [r+1, c+1]}
        return [r, c]
    }

    R_fromRowID(divID, FirstIndexisOne = false) {
        if (!this.IsRow(divID)) {return -1}

        let X = CLSXCSV_NAMES["id"]["row"]
        let ret = Number(RetStringBetween(divID, X["prefix"], X["postfix"])) 
        if (FirstIndexisOne) {
            return ret+1}
        return  ret
    }

    C_fromHeaderID(divID) {
        if (!this.IsHeader(divID)) return -1

        let X = CLSXCSV_NAMES["id"]["header"]
        return Number(RetStringBetween(divID, X["prefix"], X["postfix"]))
    }

    R_fromWikiNameOrDescription(ID) {
        if (!this.IsWikiName(ID) && !this.IsWikiDescription(ID)) return -1
        let X = null
        if (this.IsWikiName(ID)) X = CLSXCSV_NAMES["id"]["wikiName"]
        if (this.IsWikiDescription(ID)) X = CLSXCSV_NAMES["id"]["wikiDescription"]
        
        return Number(RetStringBetween(ID, X["prefix"], X["postfix"]))
    }


// ################################################################
// region parent ID                                               #
// ################################################################

    WrapperID_FromChildID(divID) {
        let idx = this.ItemsIndex(divID)
        return this._wrapper(idx)
    }

    NameBoxID_FromChildID(divID) {
        let idx = this.ItemsIndex(divID)
        return this._namebox(idx)
    }

    NameFromID(divID) {
        return divID.between("[", "]")
    }

    RowID_CellID(divID) {
        let ItemIdx = this.ItemsIndex(divID)
        let RowIdx = Math.max(this.R_fromRowID(divID),0)
        let rowID = this._row(RowIdx, ItemIdx)
        return rowID
    }

}
class clsReadFile {
    constructor(parent, config) {
        this.parent = parent
        this.config = {
            "file-seperator": "||||",
            "line-starter": "||",
            "cell-seperator": "|",
            "line-end": "\n"        // not used for read in, only for saveAs
        }
    }

    Read(text, title) {
        /**
         * Reads in a text (formatted acc to this.config) and saves its data to the parent
         */
        if (text == undefined) return
        if (!text.startsWith(this.config["file-seperator"])) {
            text = this.config["file-seperator"] + '<define name>' + this.config["line-end"] + text} 
        let textItems = this._NameHeadersData(text)

        this.parent.XItems = [];
        for (let i = 0; i < textItems.length; i++) {
            this.ReadOne(textItems[i])
        }
        
        if (title != undefined) this.parent.title = title
    }

    DataAsCSV() {
        /**
         * Parses the data of the parent as a text file
         */
        let ret = '';
        for (let i = 0; i < this.parent.XItems.length; i++) {
            ret += this._AsCSV_NameLine(i)
            ret += this._AsCSV_HeaderLine(i)
            ret += this._AsCSV_RowsLines(i)
        }

        return ret}

    Name(text) {
        if (!text.includes(this.config["file-seperator"])) { 
            return }
        text = text.after(this.config["file-seperator"])
        return text.until('\n').trim()
    }
    
    ReadOne(texttriple) {
        this.parent.xAdd(texttriple[1], texttriple[2], texttriple[0])
    }

    _AsCSV_NameLine(ItemsIndex) {
        let llll = this.config["file-seperator"]
        let n = this.config["line-end"]

        if (IsUndefined([ItemsIndex])) ItemsIndex = 0
        return llll + this.parent.XItems[ItemsIndex].myName + n
    }

    _AsCSV_HeaderLine(ItemsIndex) {
        let ll = this.config["line-starter"]
        let l = this.config["cell-seperator"]
        let n = this.config["line-end"]
        let ret = ll 

        if (IsUndefined([ItemsIndex])) ItemsIndex = 0
        for (let header of this.parent.XItems[ItemsIndex].headers) {
            ret += header + l}
        ret = ret.slice(0, -1*l.length) + n
        
        return ret
    }
    
    _AsCSV_RowsLines(ItemsIndex) {
        let ll = this.config["line-starter"]
        let l = this.config["cell-seperator"]
        let n = this.config["line-end"]
        let ret = ""

        if (IsUndefined([ItemsIndex])) ItemsIndex = 0
        for (let row of this.parent.XItems[ItemsIndex].data) {
            ret += ll
            for (let cell of row) {
                ret += cell + l}
            ret = ret.slice(0, -1*l.length) + n}
        
        return ret
    }

    _NameHeadersData(textfile) {
        // return a list of data Items in the following format:
        //
        // [[name, headers, data], [name, headers, data]]

        let textParts = textfile.split('\n' + this.config["file-seperator"]); textParts.removeAll("")
        textParts[0] = textParts[0].after(this.config["file-seperator"])
        
        let ret = []; let triple = []
        for (let textPart of textParts) {
            let name = textPart.until('\n').trim()
            let textPart2 = textPart.substring(textPart.indexOf('\n')+1)
            textPart2 = textPart2.trimPlus([' |'], false)
            let headers_data = this._HeadersData(textPart2)
            triple = [name, headers_data[0], headers_data[1]]
            ret.push(triple)
        }

        return ret
    }

    _HeadersData(textfile) {
        assert(textfile.startsWith(this.config["line-starter"]))

        let lines = textfile.split('\n' + this.config["line-starter"]); lines.removeAll("")
        lines[0] = lines[0].after(this.config["line-starter"])
        for (let i = 0; i< lines.length; i++) {
            lines[i] = lines[i].replace(/\n+$/, '')} // "at the end.\n\n\n" ->"at the end."
        let headers = lines[0]; headers = headers.split(this.config["cell-seperator"])        
        let rows = lines.slice(1)
        let data = []
        for (let row of rows){
            data.push(row.split(this.config["cell-seperator"]))}
    
        return [headers, data]
    }
}
class clsSiteAsText {
    constructor(parent) {
        this.parent = parent
    }

    style01() {
        return '' + 
        "<style>" + 
        "table {width: 100%;table-layout: fixed;border-collapse: collapse;margin: 20px 0;font-size: 18px;text-align: left;table-layout: auto;}" + 
        "th, td {padding: 12px 15px;border: 1px solid #ddd;word-wrap: break-word;}" + 
        "th {background-color: #f2f2f2;color: #333;}" + 
        "tr:hover {background-color: #f1f1f1;}" +
        "th {font-weight: bold;background-color: lightgray !important;position: sticky;top: 0px;z-index: 2;}" + 
        "</style>"
    }

    AsHTML() {
        return this.style01() + this.parent.XHTML.PrintContent().outerHTML
    }
}
class clsXCSV_Selectionhandler {
    constructor(parent) {
            this.parent = parent
            this.default = {
                'SelectedCell': "",
                'SelectedWrapperName': "",
                'SelectedRowIndex': -1,
                'SelectedHeaderCell': '',
                'SelectedWikiName': '',
                'SelectedWikiDescription': '',
            }
            
            this.SelectedCell = this.default['SelectedCell']
            this.SelectedWrapperName = this.default['SelectedWrapperName']
            this.SelectedRowIndex = this.default['SelectedRowIndex']
            this.SelectedHeaderCell = this.default['SelectedHeaderCell']
            this.SelectedWikiName = this.default['SelectedWikiName']
            this.SelectedWikiDescription = this.default['SelectedWikiDescription']
        }

    Activate(anything) {
        this.SetToDefault()
        if (anything == undefined) {

            }

        if (typOf(anything) == 'str') {
            if (this.parent.XNames.IDs.IsNameBox(anything) || this.parent.XNames.IDs.IsItems(anything)) {
                this.setSelectedWrapperName(this.parent.XNames.IDs.ItemsName(anything))
            }

            if (XCSV_CONFIG['ContentStyle'] == 'tables') {
                if (this.parent.XNames.IDs.IsCell(anything)) {
                    this.setSelectedCell(anything)
                    this.setSelectedWrapperName(this.parent.XNames.IDs.ItemsName(anything))
                    this.setSelectedRowIndex(this.parent.XNames.IDs.RC_fromID(anything)[0])
                    }
                
                if (this.parent.XNames.IDs.IsHeader(anything)) {
                    this.setSelectedHeaderCell(anything)
                    this.setSelectedWrapperName(this.parent.XNames.IDs.ItemsName(anything))
                    }
                }
            if (XCSV_CONFIG['ContentStyle'] == 'wiki') {
                if (this.parent.XNames.IDs.IsWikiName(anything) || this.parent.XNames.IDs.IsWikiDescription(anything)) {
                    let name = this.parent.XNames.IDs.ItemsName(anything)
                    let r = this.parent.XNames.IDs.R_fromWikiNameOrDescription(anything)
                    this.setSelectedWikiName(this.parent.XNames.IDs.wikiName(name, r))
                    this.setSelectedWikiDescription(this.parent.XNames.IDs.wikiDescription(name, r))
                    }
                }
            }

        if (typOf(anything) == 'int') {
            this.activateXitems(anything)
            return}

        this.Indicate()
    }

    GetDefault() {
        return this.default}

    setSelectedCell(id) {
        if (id == undefined) id = this.default['SelectedCell'] 
        this.SelectedCell = id;
    }

    setSelectedWrapperName(name) {
        if (name == undefined) name= this.default['SelectedWrapperName']
        this.SelectedWrapperName = name;
    }

    setSelectedRowIndex(index) {
        if (index == undefined) index = this.default['SelectedRowIndex']
        this.SelectedRowIndex = index;
    }

    setSelectedHeaderCell(id) {
        if (id == undefined) id = this.default['SelectedHeaderCell'] 
        this.SelectedHeaderCell = id;
    }

    setSelectedWikiName(id) {
        if (id == undefined) id = this.default['SelectedWikiName']
        this.SelectedWikiName = id;
    }

    setSelectedWikiDescription(id) {
        if (id == undefined) id = this.default['SelectedWikiDescription']
        this.SelectedWikiDescription = id;
    }

    activateXitems(ItemsNameIndex) {
        if (ItemsNameIndex == undefined) ItemsNameIndex = 0
        if (typOf(ItemsNameIndex) == 'str') ItemsNameIndex = this.parent.XNames.IDs.ItemsIndexFromName(ItemsNameIndex)

        this.SelectedCell = this.default['SelectedCell'] 
        this.SelectedWrapperName = this.parent.XItems[ItemsNameIndex].myName
        this.SelectedRowIndex = this.default['SelectedRowIndex']
    }

    activateRow(ItemsNameIndex, rowIndex) {
        if (ItemsNameIndex == undefined) ItemsNameIndex = 0
        if (typOf(ItemsNameIndex) == 'str') ItemsNameIndex = this.parent.XNames.IDs.ItemsIndexFromName(ItemsNameIndex)
        if (rowIndex == undefined) rowIndex = 0

        this.SelectedCell = this.default['SelectedCell'] 
        this.SelectedWrapperName = this.parent.XItems[ItemsNameIndex].myName
        this.SelectedRowIndex = rowIndex;
    }

    SetToDefault() {
        this.setSelectedCell()
        this.setSelectedWrapperName()
        this.setSelectedRowIndex()
        this.setSelectedHeaderCell()
        this.setSelectedWikiName()
        this.setSelectedWikiDescription()
    }

    ActiveItemsName() {
        if (this.SelectedWrapperName == "") this.SelectedWrapperName = this.parent.XItems[0].myName
        assert(this.SelectedWrapperName != "" && !this.SelectedWrapperName.includes(["[", "]"]))
        return this.SelectedWrapperName
    }

    ActiveItemsIndex() {
        return this.parent.XNames.IDs.ItemsIndexFromName(this.ActiveItemsName())
    }


    Indicate() {
       this.SelectedWrapperName = this.ActiveItemsName()
        
        this.unindicate()
        if (this.parent.config['Indicate Selections']) {
            if (this.SelectedWrapperName != '') this._indicateSelectedWrapper()
            if (this.SelectedRowIndex != -1) this._indicateSelectedRow()
            if (this.SelectedHeaderCell != '') this._indicateSelectedHeaderCell()
            if (this.SelectedWikiName != '') this._indicateSelectedWikiName()
            if (this.SelectedWikiDescription != '') this._indicateSelectedWikiDescription()
            
        }
        
    }

    _indicateSelectedWrapper() {
        if (this.SelectedWrapperName == this.default['SelectedWrapperName']) return
        if (XCSV_CONFIG['ContentStyle'] == 'tables' || XCSV_CONFIG['ContentStyle'] == 'wiki') {
            let wrapperID = this.parent.XNames.IDs._wrapper(this.SelectedWrapperName)
            // let wrapperID = this.parent.XNames.IDs._wrapper(this.ActiveItemsIndex()) also possible
            let nameboxID = this.parent.XNames.IDs._namebox(this.SelectedWrapperName)    

            document.getElementById(wrapperID).classList.add("bg-lblue-light")
            document.getElementById(nameboxID).classList.add("bg-lblue-light")
        }
                      
    }

    _indicateSelectedRow() {
        if (this.SelectedRowIndex < 0 ) return

        if (XCSV_CONFIG['ContentStyle'] == 'tables') {
            let rowID = this.parent.XNames.IDs._row(this.SelectedRowIndex, this.SelectedWrapperName)
            document.getElementById(rowID).classList.add("bg-lyellow-important")}
    }

    _indicateSelectedHeaderCell() {
        if (this.SelectedHeaderCell == this.default['SelectedHeaderCell']) return

        if (XCSV_CONFIG['ContentStyle'] == 'tables') {
            document.getElementById(this.SelectedHeaderCell).classList.add("bg-grey-important")
        }
    }

    _indicateSelectedWikiName() {
        if (this.SelectedWikiName == this.default['SelectedWikiName']) return
        if (XCSV_CONFIG['ContentStyle'] == 'wiki') {
            document.getElementById(this.SelectedWikiName).parentElement.classList.add("bg-lyellow-important")
        }
    }

    _indicateSelectedWikiDescription() {
        if (this.SelectedWikiDescription == this.default['SelectedWikiDescription']) return
        if (XCSV_CONFIG['ContentStyle'] == 'wiki') {
            document.getElementById(this.SelectedWikiDescription).parentElement.classList.add("bg-lyellow-important") // same parent as wikiName (duplicate)
        }      
    }

    unset() {
        this.SelectedCell = this.default['SelectedCell']
        this.SelectedWrapperName = this.default['SelectedWrapperName']
        this.SelectedRowIndex = this.default['SelectedRowIndex']
        this.SelectedHeaderCell = this.default['SelectedHeaderCell']
        this.parent.XInfo.Level3(this.SelectedCell)
    }

    unindicate() {
        DOM_RemoveClassFromAll(".bg-lblue")
        DOM_RemoveClassFromAll(".bg-lblue-light")     
        DOM_RemoveClassFromAll(".bg-lyellow-important")
        DOM_RemoveClassFromAll(".bg-grey-important")
    }

    ScrollToitem(targetID) {
        let namebox = document.getElementById(targetID);
        namebox.scrollIntoView();   // now the namebox is on top, i. e. hidden behidn the navbar. 

        let html = document.documentElement;
        html.scrollTop -= 70;
    }

}
