const DD = new libDropDowns();
const EDIT = new libEdit('EDIT');
const UIN = new clsUserInput(["id-main"]);

const XCSV = {
    "main": new clsXCSV("id-main", XCSV_DATA)
};

(function () {
    // UserInput
    window.addEventListener('mousedown', UIN.MouseDown)
    window.addEventListener('mouseup', UIN.MouseUp)
    // Files Upload
    for (let key of Object.keys(FILES_UPLOAD_CONFIG) ) {
        cFileReaders[key] = new FileReader()
    }

    // XCSV["main"].XFormat.Read(myTrim(XCSV_DATA["WorkingItems"]["X"]))
    XCSV["main"].XHTML.Print()

})();