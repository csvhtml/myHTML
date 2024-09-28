// function Edit_Edit(div) {
//     // This function is called before a div textarea is created
//     // it returns intentionally nothing
// }

function Gloabl_Edit_Textarea(div) {    
    /**
    * This function is called before a div textarea is created
    * It returns a value (related to div.innerHTML) which is then put as value to the textarea
    */
    let value_modified = BASIS.HTMLtoMyMarkdown(div.innerHTML)
    return value_modified
}

function Edit_Save(divID, value) {
    // This function is called whenever a div textarea is saved by libEdit
    // It returns a value which is then saved to the innerHTML to the div 
    // let value_modified = value + " Welt" // for testing 
    let value_modified = BASIS.MyMarkDowntoHTML(value)
    return value_modified
}

function Edit_Save_Post() {
    //things that shall happen after Edit finished its job
}

function Edit_Close(divID) {
    // This function is called whenever a div textarea is closed by libEdit
    return 
}