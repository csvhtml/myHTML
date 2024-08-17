// This class does not maipulate DOM elements. It returns strings

class basisHTMLText {
    constructor() {}

    Table_FromMarkdown (markdownString) {
        return this.xTable_FromMarkdown (markdownString)
    }
    
    Table(config) {
        let fullConfig = this.TableConfig(config)
        if (!this.TableConfigAssert(fullConfig)) {return ""}
        
        return this.xTable(fullConfig)
    }

    TableConfig({
        tableID = "", tableClass = "", tableStyle = "",
        theadID = "", theadClass = "", theadStyle = "",
        trhID = "", trhClass = "",
        thsText = ["", ""],
        thsID = ["", ""], thsClass = ["", ""], thsStyle = ["",""],
        rowsID = ["", ""], rowsClass = ["", ""], rowsStyle = ["", ""],
        cellsText = [["", ""], ["", ""]], 
        cellsID = [["", ""], ["", ""]], cellsClass = [["", ""], ["", ""]], cellsStyle = [["", ""], ["", ""]]
    }) {
        let defaultArray_1D = function (arr, n) {
            if (typOf(arr) == 'str') {
                return Array(n).fill(arr)}
            if (IsEqual(arr, ["", ""])) {
                return Array(n).fill("")} 
            else {
                return arr}}

        let defaultArray_2D = function (arr, r, c) {
            if (typOf(arr) == 'str') {
                return Array(r).fill(Array(c).fill(arr))}
            if (IsEqual(arr, [["", ""], ["", ""]])) {
                return Array(r).fill(Array(c).fill(""))} 
            else {
                return arr}}

        let thStyle = ""
        thsID = defaultArray_1D(thsID, thsText.length)
        thsClass = defaultArray_1D(thsClass, thsText.length)
        thsStyle = defaultArray_1D(thsStyle, thsText.length)
        rowsID = defaultArray_1D(rowsID, cellsText.length)
        rowsClass = defaultArray_1D(rowsClass, cellsText.length)
        rowsStyle = defaultArray_1D(rowsStyle, cellsText.length)
        cellsID = defaultArray_2D(cellsID, cellsText.length, cellsText[0].length)
        cellsClass = defaultArray_2D(cellsClass, cellsText.length, cellsText[0].length)
        cellsStyle = defaultArray_2D(cellsStyle, cellsText.length, cellsText[0].length)
        return {
            tableID:tableID, tableClass:tableClass, tableStyle:tableStyle,
            theadID:theadID, theadClass:theadClass, theadStyle: theadStyle,
            trhID:trhID, trhClass:trhClass, thStyle: thStyle,
            thsText:thsText,
            thsID:thsID, thsClass:thsClass, thsStyle:thsStyle,
            rowsID:rowsID, rowsClass:rowsClass, rowsStyle:rowsStyle,
            cellsText:cellsText, 
            cellsID:cellsID, cellsClass:cellsClass, cellsStyle
        }
    }
    

    TableConfigAssert(cfg) {
        let lenC = cfg["thsText"].length
        let lenR = cfg["cellsText"].length
        assert(cfg["thsID"].length == lenC, cfg["thsID"].length)
        assert(cfg["thsClass"].length == lenC, cfg["thsClass"].length || typOf(cfg["cellsClass"]) == 'str')
        assert(cfg["thsStyle"].length == lenC, cfg["thsStyle"].length)
        assert(cfg["rowsID"].length == lenR, cfg["rowsID"].length)
        assert(cfg["rowsClass"].length == lenR, cfg["rowsClass"].length || typOf(cfg["cellsClass"]) == 'str')
        assert(cfg["rowsStyle"].length == lenR, cfg["rowsStyle"].length)
        assert(IsListEqualSize(cfg["cellsID"],cfg["cellsText"]))
        assert(IsListEqualSize(cfg["cellsClass"],cfg["cellsText"]) || typOf(cfg["cellsClass"]) == 'str')
        assert(IsListEqualSize(cfg["cellsStyle"],cfg["cellsText"]))
        return true
    }

    xTable(cfg) {
        let HTB = new basisHTMLText_TableBasis()

        let ret = ""
        ret += HTB.Tag('table', {id:cfg["tableID"], clas:cfg["tableClass"], style:cfg["tableStyle"]})
        ret += HTB.Tag('thead', {id:cfg["theadID"], clas:cfg["theadClass"], style:cfg["theadStyle"]})
        ret += HTB.Row("th", cfg["thsText"], {id:cfg["trhID"], clas:cfg["trhClass"], style:cfg["thStyle"],
                             ids:cfg["thsID"], classes:cfg["thsClass"], styles:cfg["thsStyle"]})
        ret += '</thead>';
        ret += HTB.Tag('tbody', {});
        ret += HTB.Body(cfg["cellsText"], cfg)  
        ret += '</tbody>';
        return ret + '</table>'
    }

    xTable_FromMarkdown (markdownTable) {
        let HasMetaInfo = function (table) {
            var regex = /^\{.*\}$/;
            return regex.test(table[0])}
    
        let assertThis = function (borderline)  {
            if (!borderline.includes("|---|")) {
                return false}
            return true}
    
        let Parsing = function (markdownTable) {
            let pa_meta = ""; let ret_meta = {}
            let table = myTrim(markdownTable).split('\n'); table.removeAll("")
            if (HasMetaInfo(table)) {
                pa_meta = table[0]
                pa_meta = RetStringBetween(pa_meta, "{", "}")
                pa_meta = pa_meta.split("|")
                for (let meta of pa_meta) {
                    for (let para of ["id", "class", "style"]) {
                        if (meta.split(":")[0] == para) {
                            ret_meta[para] = meta.split(":")[1]}
                    }
                }
                table = table.slice(1,table.length)}
        
            let pa_header = table[0].split('|'); pa_header.removeAll("")
            let borderline = table[1].replace(/\|[-]+(?=\|)/g, '|---')  // |--------|  --> |---|
            let rowsStr = table.slice(2,table.length)
            let pa_rows = []
            for (let rowStr of rowsStr) {
                let row = rowStr.split('|'); row.removeAll("")
                pa_rows.push(row)}
            if (!assertThis(borderline)) {return false}
            
            return [ret_meta, pa_header, pa_rows]
        }
    
        let Pars = Parsing(markdownTable); if (Pars==false) {return}
        
        return this.Table({
            tableID: Pars[0]["id"],
            tableClass: Pars[0]["class"],
            tableStyle: Pars[0]["style"],
            thsText: Pars[1],
            cellsText: Pars[2]
        })
    }
    
}


class basisHTMLText_TableBasis{
        constructor() {}
    
        htmlText_TagMUp(tag, meta = "") {
            let ret_tag = "<" + tag
            if (meta != "") {
                meta = RetStringBetween(meta, "{", "}")
                meta = meta.split(";")
                
                for (let m of meta) {
                    let key = m.split(":")[0]
                    let val = m.split(":")[1]
                    ret_tag += ' ' + key + '="' + val + '"'}
            }
            ret_tag += ">"
            return ret_tag}

        Tag(tag, {id="", clas="", style=""}) {
            let ret = "<" + tag + " "
            ret += this.Tag_PropertyString("id", id)
            ret += this.Tag_PropertyString("class", clas)
            ret += this.Tag_PropertyString("style", style)
            ret += '>'
            return ret}
    
        Body(rows, cfg) {
            let ret = ""
            for (let i = 0;i<rows.length;i++) {
                if (IsEqual(cfg, {})) {
                    ret += this.Row("td", rows[i], {})}
                else {
                    ret += this.Row("td", rows[i], {
                        id:cfg["rowsID"][i], clas:cfg["rowsClass"][i], style:cfg["rowsStyle"][i], 
                        ids:cfg["cellsID"][i], classes:cfg["cellsClass"][i], styles:cfg["cellsStyle"][i]})}
            }
            return ret
        }
    
        Row(tx, cells, {id="", clas="", style="", ids=["",""], classes=["",""], styles=["",""]}) {
            let ret = this.Tag("tr", {id:id, clas:clas, style:style})
            for (let i = 0;i<cells.length;i++) {
                ret += this.Tag(tx, {id:ids[i], clas:classes[i], style:styles[i]})
                ret += cells[i] + '</' + tx + '>';}

            return ret +"</tr>"}

        Tag_PropertyString(key, val) {
            let ret = ""
            if (val.length > 0) {
                ret += key + '="' + val + '" '}
            return ret }
    }