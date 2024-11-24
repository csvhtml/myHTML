// Feature: [X], [/], [!]  shall be interpreted as svg icons/symbols for red, green yellow
// Refactor: xcsv_dataCollection to dynamically define new config items
 
// DropDowns
const DD = new libDropDowns();

// User Input 
const UIN = new clsUserInput();

// const CSVG = new clsSVG();  // MOHI: fix. the clsSVG class automatically creates svg icons. If referenced multipel time, itmes are multiple times created. libEdit also defines a SVG


const EDIT = new libEdit('EDIT', true);

const XCSV = {
    // "main": new clsXCSV("id-main", XCSV_DATA)
    "mainX": new clsXCSV({EgoID: "id-main", 
                        SidebarID: "id-sidebar", 
                        InfoIDs:['id-infoblock-l', 'id-infoblock-m', 'id-infoblock-r']})
};

(function () {
    // UserInput
    window.addEventListener('mousedown', UIN.MouseDown)
    window.addEventListener('mouseup', UIN.MouseUp)
    // UpDownloadConfig
    for (let key of Object.keys(FILES_UPLOAD_CONFIG) ) {
        cFileReaders[key] = new FileReader()
    }
    XCSV["mainX"].Config({})
    XCSV["mainX"].Title('new CSV')
    XCSV["mainX"].XHTML.Print()
    XCSV["mainX"].XInfo.Level1("New")
})();







