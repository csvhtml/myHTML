class libEdit {
    constructor(name) {
        this.name = name
        this.innerHTMLs = {}  // in case of Close, then the original state is resored
        this.lasttime = new Date().getTime()
    }

    Edit(div) {
        if (this._IsModeEdit(div)) {
            return}
        if (new Date().getTime()-this.lasttime < 300) {
            return}
        if (div.getBoundingClientRect()["height"] < 35) {
            return }// divs height is too small
        if (div.getBoundingClientRect()["height"] < 60) { 
            this._Edit_Init(div)
            this._Edit_SmallSizeDiv(div)
            return}
            this._Edit_Init(div)
            this._Edit_NormalSizeDiv(div)
    }

    _Edit_Init(div) {
        this._SetModeEdit(div)
        this.innerHTMLs[div.id] = div.innerHTML
    }

    _Edit_NormalSizeDiv(div) {
        this._InnerHTML_To_Textarea(div)
        this._AppendButton(div, "save")
        this._AppendButton(div, "x")
    }

    _Edit_SmallSizeDiv(div) {
        this._InnerHTML_To_Textarea(div, "small")
        this._AppendButton(div, "save", "right")
        this._AppendButton(div, "x", "right")
    }

    Save(divID) {
        let value = document.getElementById("id-textarea-" + divID).value
        document.getElementById(divID).innerHTML = this._value_to_html(value)
        this._SetModeRead(document.getElementById(divID))
    }

    CloseAll(divID = null)  {
        for (let divIDD of Object.keys(this.innerHTMLs)) {
            this.Close(divIDD)} 

    }

    Close(divID) {
        RemoveDIV("id-textarea-" + divID)
        RemoveDIV("id-a-" + divID)
        this._SetModeRead(document.getElementById(divID))
        document.getElementById(divID).innerHTML = this.innerHTMLs[divID]
        delete this.innerHTMLs[divID]
    }
    
    _IsModeEdit(div) {
        if (div.classList.contains('x-edit')) {
            return true}
        return false
    }


    _SetModeRead(div) {
        if (this._IsModeEdit(div)) {
            div.classList.remove('x-edit')
            this.lasttime = new Date().getTime()}
    }

    _SetModeEdit(div) {
        if (!this._IsModeEdit(div)) {
            div.classList.add('x-edit')}
    }


    _InnerHTML_To_Textarea(div, size = "normal") {
        let textarea = TextArea({
            id: "id-textarea-" + div.id,
            value: this._html_to_value(div),
            cols: 1,
            rows: 1    
        })
        textarea.style.width = this._textareaSize(div, size) [0]
        textarea.style.height = this._textareaSize(div, size) [1]
        div.innerHTML = ""
        div.append(textarea);
        textarea.focus();
        textarea.select();
    }

    _textareaSize(div, size = "normal") {
        if (size == "normal") {
            return [(div.getBoundingClientRect()["width"])+"px", (div.getBoundingClientRect()["height"]-30)+"px"]
            // return [div.scrollWidht, (div.scrollHeight-30)+"px"]
        }
        if (size == "small") {
            return [(div.getBoundingClientRect()["width"]-40)+"px", (div.getBoundingClientRect()["height"])+"px"]
        }
    }

    _AppendButton(div, type = "save", position="below") {
        // size is about 28px
        let a = document.createElement('a');
        a.id = "id-" + type + "-" + div.id,
        a.href = "#"
        a.classList.add("xsvg-link")
        if (position == "right") {
            a.classList.add("xsvg-right-"+type)}
        let fString = ""
        if (type == "x") {
            fString = '.Close("'}
        if (type == "save") {
            fString = '.Save("'}
        a.setAttribute('onclick', this.name + fString + div.id + '")');
        div.append(a)
        if (type == "x") {
            CSVG.CreateSVG_FromDivID(a.id, "X")}
        if (type == "save") {
            CSVG.CreateSVG_FromDivID(a.id, "SquareArrowDown")}
}

    _html_to_value(div) {
        return div.innerHTML}

    _value_to_html(value) {
        return value}
}