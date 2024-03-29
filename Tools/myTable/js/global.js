function ParseFromFileReader() {
    let text = cFileReaders["nav-input"].result
    // XCSV["main"].XReader.ReadXCSV(text)
    XCSV["main"].XcsvHandler.Read(text)
    XCSV["main"].XPrinter.Print()
    infoblock(FileNameFromPath(cFileReaders_File["nav-input"].value) ,"l")
}

function DownloadCSV() {
    // DownloadFile(XCSV["main"].XPrinter.AsCSV())
    DownloadFile(XCSV["main"].XCSV.DataAsCSV())
}

function Click() {
    let div = cUSERINPUT_EVENT["event"].srcElement
    XCSV["main"].XClick.ClickEvent(div)
}


function Edit_Edit(div) {
    if (XCSV["main"].XNames.IDs.IsCell(div.id)) {
        let row = document.getElementById(_Edit_RowID(div.id))
        row.style.height = (row.getBoundingClientRect()["height"]+40)+"px"
        // _Edit_MinHeight(div.id)
    }
}

function Edit_Textarea(div) {
    let value_modified = convertToMarkup(div.innerHTML)
    return value_modified
}

function Edit_Save(divID, value) {
    if (value == "") {value = ".."}
    if (XCSV["main"].XNames.IDs.IsCell(divID)) {
        //data
        let RC = XCSV["main"].XNames.IDs.RC_fromID(divID)
        XCSV["main"].XData.data[RC[0]][RC[1]] = value
        // dataconfig
        XCSV["main"].XConfigItems.CreateConfigItems()
        //style
        _Edit_MinHeight_Undo(divID)

    }

    if (XCSV["main"].XNames.IDs.IsHeader(divID)) {
        let h = XCSV["main"].XNames.IDs.H_fromHeaderID(divID)
        XCSV["main"].XData.headers[h] = value
    }
        let value_modified = parseMarkup(value)
        return value_modified
}

function Edit_Close(divID) {
    _Edit_MinHeight_Undo(divID)
    return 
}

function _Edit_RowID(divID) {
    return XCSV["main"].XNames.IDs.RowfromCellID(divID)}    

function _Edit_MinHeight(divID) {
    let row = document.getElementById(_Edit_RowID(divID))
    if (row.getBoundingClientRect()["height"] < 60) {
        row.style.height = "80px"}
    }

function _Edit_MinHeight_Undo(divID) {
    let row = document.getElementById(_Edit_RowID(divID))
        row.style.height = ""
}



// used in xcsv_reader
// markup -> html
function parseMarkup(markupText) {
    if (typOf(markupText) != 'str') {
        return markupText}

    // [xxx::yyy] -> <a href="yyy">xxx </a>
    // var linkRegex = /\[([^\]]+)\|([^\]]+)\]/g;
    var linkRegex = /\[([^\]]+)::([^\]]+)\]/g;
    var htmlText = markupText.replace(linkRegex, '<a href="$2" target="#">$1</a>');
    // \n -> <br>
    htmlText = htmlText.replace(new RegExp('\n', "g") , '<br>')
    return htmlText;
    }

// html -> markup
function convertToMarkup(htmlText) {
    htmlText = htmlText.replace('target="#"', '')
    var anchorRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*?>(.*?)<\/a>/g;
    // var markupText = htmlText.replace(anchorRegex, '[$3|$2]');
    var markupText = htmlText.replace(anchorRegex, '[$3::$2]');
    var markupText2 = markupText.replace(new RegExp('<br>', "g") , '\n')
    return markupText2;
    }