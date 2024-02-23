class libEdit {
    constructor() {
    }

    InEditMode(div) {
        if (div.classList.contains('x-edit')) {
            return true}
        return false
    }
    
    Edit(div) {
        if (this.InEditMode(div)) {
            div.classList.remove('x-edit')
            return}
        RemoveDIV("id-textarea")
        div.classList.add('x-edit')
        this.InnerHTML_To_Textarea(div)
        this.AppendSaveButton(div)
    }

    InnerHTML_To_Textarea(div) {
        let textarea = TextArea({
            id: "id-textarea",
            value: TextArea_DeaultValue(div),
            cols: 50,
            rows: 1    
        })
        div.innerHTML = ""
        div.append(textarea);
        AutoHeight(div.id);
        textarea.focus();
        textarea.select();
    }

    AppendSaveButton(div) {
        let a = document.createElement('a');
        a.id = div.id + "-a",
        a.href = "#"
        a.setAttribute('onclick', 'SaveCellValue("' + div.id + '")');
        div.append(a)
        CSVG.CreateSVG_FromDivID(div.id + "-a", "SquareArrowDown")
    }
}

function TextArea_DeaultValue(div) {
    return div.innerHTML}

function SaveCellValue(divID) {
    let value = document.getElementById("id-textarea").value
    RemoveDIV("id-textarea")
    document.getElementById(divID).innerHTML = value

}
