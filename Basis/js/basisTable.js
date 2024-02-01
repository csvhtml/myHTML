// ################################################################
// Config                                                         #
// ################################################################

// const LIB_INPUT_FUNCTIONMAPPING2 = {
//     "nav-input": clsNavbar_Call_Input,
//     "clsCSV-Cell-Input": clsCSV_ParseFileNameToTextArea, 
// }
// const LIB_INPUT_NOFILEREAD2 = "libInput-NoFileRead" // in case the input field has this class, then the uploaded file content is not read (and only the files path is saved)

// ################################################################
// Functionality                                                  #
// ################################################################

// Provides Funtionalites to create standard html text blocks (usally used for innerHTML or outerHTML), e. g. tables

class libHTMLTable {
    constructor() {
    }

    Table(tableparameters) {
        return this.xTable(tableparameters)
    }
    
    TableFromMarkdown(markdownTable) {
        return this.xTableFromMarkdown(markdownTable)
    }

    xTable({
        tableID="", 
        tableClasses = [], 
        tableStyles = [], 
        theadClasses = [],            
        thsText=["strA", "strB"], 
        thsID= ["strA", "strB"], 
        thsClasses= [["strA", "strB"], ["strA", "strB"]], 
        thsWidth= ["0","0"],
        rowsID=["strA", "strB"], 
        rowsClasses= [["strA", "strB"], ["strA", "strB"]],
        cellsText=[["strA", "strB"], ["strA", "strB"]], 
        CellIDs = [["strA", "strB"], ["strA", "strB"]], 
        cellsClasses = [[["strA", "strB"], ["strA", "strB"]], [["strA", "strB"], ["strA", "strB"]]]
    }) {
        // overwrite template and set default parameters
        if (IsEqual(thsText,["strA", "strB"])) {thsText=[]}
        if (IsEqual(thsID,["strA", "strB"])) {thsID=[]}
        if (IsEqual(thsClasses,[["strA", "strB"], ["strA", "strB"]])) {thsClasses=[]}
        if (IsEqual(thsWidth,["0","0"])) {thsWidth=[]}
        
        let colsLength = thsText.length
        let rowsLength = cellsText.length
        let arrCol = function () {return Array(rowsLength).fill("")}
        let arrRow = function () {return Array(colsLength).fill("")}
        let arrTab = function () {return Array(rowsLength).fill(arrRow())}

        if (IsEqual(rowsID, ["strA", "strB"])) {rowsID=arrCol()}
        if (IsEqual(rowsClasses,[["strA", "strB"], ["strA", "strB"]])) {rowsClasses=arrTab()}
        if (IsEqual(CellIDs,[["strA", "strB"], ["strA", "strB"]])) {CellIDs=arrTab()}
        if (IsEqual(cellsClasses,[[["strA", "strB"], ["strA", "strB"]], [["strA", "strB"], ["strA", "strB"]]])) {cellsClasses=arrTab()}

        //assert
        assert(thsText.length > 0)
        assert(thsID.length == 0 || thsID.length == thsText.length)
        assert(thsClasses.length == 0 || thsClasses.length == thsText.length)
        assert(thsWidth.length == 0 || thsWidth.length == thsText.length)
        assert(colsLength > 0)
        assert(cellsText.length > 0)
        assert(rowsID.length == 0 || rowsID.length == cellsText.length)
        assert(rowsClasses.length == 0 || rowsClasses.length == cellsText.length)
        assert(CellIDs.length == 0 || CellIDs.length == cellsText.length)
        assert(cellsClasses.length == 0 || cellsClasses.length == cellsText.length)
        for (let i = 0; i < cellsText.length; i++) {
            assert(cellsText[i].length == colsLength)
            if (CellIDs.length > 0) {
                assert(CellIDs[i].length == colsLength)}
            if (cellsClasses.length > 0) {
                assert(cellsClasses[i].length == colsLength)}
        }

        //function
        return ''
            + this.xTabelTag(tableID, tableClasses, tableStyles)
            + this.xTableHeaderTag(theadClasses, thsText, thsID, thsClasses, thsWidth)
            + this.xTableBodyTag(rowsID, rowsClasses, cellsText, CellIDs, cellsClasses)
            + '</table>'
    }

    xTabelTag(tableID, tableClasses, tableStyles) {
        let ret = '<table '
        ret += this._idHTMLString(tableID)
        ret += this._classesHTMLString(tableClasses)
        ret += this._stylesHTMLString(tableStyles)
        ret += '>'
        return ret
    }
    
    xTableHeaderTag(theadClasses, thsText, thsID, thsClasses, thsWidth) {
        // header tag
        let ret = '<thead '
        ret += this._classesHTMLString(theadClasses)
        ret +='>'

        // header row tag
        ret += this._rowHTMLString('th', '', thsText, thsID, thsClasses, this._StylesFromWidths(thsWidth))
        ret += '</thead>'
        return ret
    }

    xTableBodyTag(rowsID, rowsClasses, cellsText, CellIDs, cellsClasses) {
        let ret = '<tbody>'
        for (let i = 0; i< cellsText.length; i++) {
            ret += this._rowHTMLString('td', rowsID[i], cellsText[i], CellIDs[i], cellsClasses[i], [])}
        ret += '</tbody>'

        return ret;
    }

    _rowHTMLString(tx, rowid, cells, cellsid, cellsclasses, cellsstyles) {
        // row tag
        // let ret = '<tr>'
        let ret = '<tr' + ' '
        ret += this._idHTMLString(rowid)
        ret += '>'
        for (let i = 0; i < cells.length; i++) {
            ret += '<' + tx + ' '
            if (cellsid.length > 0) {
                ret += this._idHTMLString(cellsid[i])
            }
            if (cellsclasses.length > 0) {
                ret += this._classesHTMLString(cellsclasses[i])
            }
            if (cellsstyles.length > 0) {
                // cellsstyles
                ret += this._stylesHTMLString(cellsstyles[i])
            }
            ret += '>' + cells[i] + '</' + tx +'>'
        }
        ret += '</tr>'
        return ret
    }

    _idHTMLString(idName) {
        let ret = ""
        if (idName.length > 0) {
            ret += 'id="' + idName + '" '
        }
        return ret 
    }

    _classesHTMLString(classes) {
        let ret = ""
        if (classes.length > 0) {
            ret += 'class="'
            for (let cls of classes) {
                ret += cls + ' '}
            ret = ret.slice(0,-1) + '" '
        }
        return ret 
    }

    _stylesHTMLString(styles) {
        let ret = ""
        if (styles.length > 0) {
            ret += 'style="'
            for (let styl of styles) {
                ret += styl + ';'}
            ret += '"'
        }
        return ret
    }

    _StylesFromWidths(widths, currentStyles = []) {
        if (widths.length==0) {return []} 
        assert (currentStyles.length == 0 || currentStyles.length == currentStyles.length)
        let ret = []
        for (let i = 0; i< widths.length; i++) {
            ret.push(['width:' + widths[i] + '%'])
        }
        if (currentStyles.length>0) {
            //to be fixed 
            for (let i = 0; i< ret; i++) {
                ret[i] = [currentStyles[i], ret[i]]
            }
        }
        return ret
    }

    xTableFromMarkdown(markdownTable) {
        let table = myTrim(markdownTable).split('\n'); table.removeAll("")
        if (!table[1].includes("|---|")) {
            return ""}

        let header = table[0].split("|"); header.removeAll("")
        
        let rowStrings = table.slice(2,table.length)
        let rows =[]
        for (let rowString of rowStrings) {
            let row = rowString.split("|"); row.removeAll("")
            rows.push(row)}

        return this.Table(
            {
            thsText: header,
            cellsText: rows
        })
    }
}
