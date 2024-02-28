class libEdit {
    constructor(name) {
        this.name = name
        this.innerHTMLs = {}  // in case of Close, then the original state is resored
        this.lasttime = new Date().getTime()

        this._constructor_init()
    }

    _constructor_init() {
        let divs = document.getElementsByClassName("myEdit")
        for (let div of divs) {
            div.setAttribute('onclick', this.name + '.Edit(this)')}
    }

    Edit(div) {
        if (!this._Edit_EnterCondition(div)) { return}

        this._Edit_Prepare(div)
        let size = "normal"
        if (div.getBoundingClientRect()["height"] < 60) { 
            size = "small"}
        this._InnerHTML_To_Textarea(div, size)
        this._AppendButton(div, "save", size)
        this._AppendButton(div, "x", size)}

    _Edit_Prepare(div) {
        this._SetModeEdit(div)
        this.innerHTMLs[div.id] = div.innerHTML}

    Save(divID) {
        let value = document.getElementById("id-textarea-" + divID).value
        // document.getElementById(divID).innerHTML = this._value_to_html(value)
        document.getElementById(divID).innerHTML = Edit_Save(divID, value)
        delete this.innerHTMLs[divID]
        this._SetModeRead(document.getElementById(divID))}

    CloseAll()  {
        for (let divIDD of Object.keys(this.innerHTMLs)) {
            this.Close(divIDD)} 
        assert (IsEqual(this.innerHTMLs, {}))}

    Close(divID) {
        RemoveDIV("id-textarea-" + divID)
        RemoveDIV("id-a-" + divID)
        this._SetModeRead(document.getElementById(divID))
        document.getElementById(divID).innerHTML = this.innerHTMLs[divID]
        delete this.innerHTMLs[divID]}
    
    _IsModeEdit(div) {
        if (div.classList.contains('x-edit')) {
            return true}
        return false}

    _SetModeRead(div) {
        if (this._IsModeEdit(div)) {
            div.classList.remove('x-edit')
            this.lasttime = new Date().getTime()}}

    _SetModeEdit(div) {
        if (!this._IsModeEdit(div)) {
            div.classList.add('x-edit')}}

    _InnerHTML_To_Textarea(div, size = "normal") {
        let textarea = TextArea({
            id: "id-textarea-" + div.id,
            value: Edit_Edit(div),
            cols: 1,
            rows: 1    
        })
        textarea.style.width = this._textareaSize(div, size) [0]
        textarea.style.height = this._textareaSize(div, size) [1]
        div.innerHTML = ""
        div.append(textarea);
        textarea.focus();
        textarea.select();}

    _textareaSize(div, size = "normal") {
        if (size == "normal") {
            return [(div.getBoundingClientRect()["width"])+"px", (div.getBoundingClientRect()["height"]-30)+"px"]}     
        if (size == "small") {
            return [(div.getBoundingClientRect()["width"]-40)+"px", (div.getBoundingClientRect()["height"])+"px"]}}

    _AppendButton(div, type = "save", size = "normal") {
        let position = {
            "small": "right",
            "normal": "below"}
        let functionString = {
            "x": this.name + '.Close("'+ div.id + '")',
            "save": this.name+ '.Save("'+ div.id + '")'}
        let svgString = {
            "x": "X",
            "save": "SquareArrowDown"}
        let topStringRight = {
            "x": "top-30",
            "save": "top-0"}

        let a = document.createElement('a');
        a.id = "id-" + type + "-" + div.id,
        a.href = "#"
        a.classList.add("xsvg-link")
        a.setAttribute('onclick', functionString[type]);
        div.append(a)
        CSVG.CreateSVG_FromDivID(a.id, svgString[type])

        if (position[size] == "right") {
            a.classList.add("xsvg-right", topStringRight[type])}}

    _Edit_EnterCondition(div) {
        // Div is already in edit mode. Ignored
        if (this._IsModeEdit(div)) {
            return false}
        // Div was set to read moew a few ms ago. This is not a user initiated click. Ignored
        if (new Date().getTime()-this.lasttime < 300) {
            return false}
        // Div hight is just too small to make use of this lib. ignored
        if (div.getBoundingClientRect()["height"] < 35 || div.getBoundingClientRect()["width"] < 35) {
            return }
        return true}
}