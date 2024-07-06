function test() {
    Create_TestReportDiv()
    test_DropDownOpen ()
}

function Create_TestReportDiv() {
    let newDiv = document.createElement('div');
    
    var markdownTable = `
        | No | Test | result |
        | --- | --- | --- |
        | 00 | test_Name_1 | passed/failed |
        `;
    
    newDiv.innerHTML = new libHTMLTable().TableFromMarkdown(markdownTable);
    document.body.appendChild(newDiv);
}

function test_DropDownOpen() {
    let keys = Object.keys(DROPDOWN_CONFIG)
    let keys_btn = []
    let keys_dd = []
    for (key of keys) {
        if (DD[key].IsButton) {
            keys_btn.push(key)} 
        else {
            keys_dd.push(key)}}
    
    for (let key of keys_dd) {
        assert (document.getElementById(key + "-DropDownWrapper").style.display != "block")
        document.getElementById(key).click()
        assert (document.getElementById(key + "-DropDownWrapper").style.display == "block")
        document.getElementById(key).click()}
        assert (document.getElementById(key + "-DropDownWrapper").style.display == "none")
}