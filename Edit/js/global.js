function Edit_Edit(div) {
    // This function is called whenever a div textarea is created
    // It returns a value which is then put as value to the textarea
    // let value_modified = div.innerHTML + " Hallo"   // for testing
    let value_modified = div.innerHTML
    return value_modified
}

function Edit_Save(divID, value) {
    // This function is called whenever a div textarea is saved by libEdit
    // It returns a value which is then saved to the innerHTML to the div 
    // let value_modified = value + " Welt" // for testing 
    let value_modified = value
    return value_modified
}