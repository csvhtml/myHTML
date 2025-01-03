const CSVG = new clsSVG();CSVG.CreateAll_BasedOnDivClasses(['div', 'a'])

class libEdit {
    constructor(name, focusHandling = false) {
        this.name = name
        this.focusHandling = focusHandling
        this.innerHTMLs = {}  // in case of Close, then the original state is restored
        this.lasttime = new Date().getTime()
        this.Init()
    }

    Init() {
        let divs = document.getElementsByClassName("myEdit")
        for (let div of divs) {
            div.setAttribute('onclick', this.name + '.Edit(this)')}}

    Init_Undo() {
        let divs = document.getElementsByClassName("myEdit")
        for (let div of divs) {
            if (div.hasAttribute("onclick")) {
            div.removeAttribute("onclick")}}
    }

    Edit(div) {
        if (!this._Edit_EnterCondition(div)) { return}

        this._Edit_Prepare(div)
        let size = "normal"
        if (div.getBoundingClientRect()["height"] < 40) { 
            size = "small"}
        this._InnerHTML_To_Textarea(div, size)
        this._AppendButton(div, "save", size)
        this._AppendButton(div, "x", size)}

    _Edit_Prepare(div) {
        // Edit_Edit(div)
        this._SetModeEdit(div)
        this.innerHTMLs[div.id] = div.innerHTML}

    Save(divID) {
        let value = document.getElementById("id-textarea-" + divID).value
        let valueOld = this.innerHTMLs[divID]
        document.getElementById(divID).innerHTML = Edit_Save(divID, value, valueOld)
        this._Delete_this_innerHTMLs_item(divID)
        this._SetModeRead(document.getElementById(divID))
        Edit_Save_Post()}

    CloseAll()  {
        for (let divIDD of Object.keys(this.innerHTMLs)) {
            this.Close(divIDD)} 
        assert (IsEqual(this.innerHTMLs, {}))}

    Close(divID) {
        RemoveDIV("id-textarea-" + divID)
        RemoveDIV("id-a-" + divID)
        this._SetModeRead(document.getElementById(divID))
        document.getElementById(divID).innerHTML = this.innerHTMLs[divID]
        Edit_Close(divID)
        this._Delete_this_innerHTMLs_item(divID)}

    _Delete_this_innerHTMLs_item(divID) {
        if (divID in this.innerHTMLs) delete this.innerHTMLs[divID]
    }
    
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
        let CellvalueAsMarkdown = Gloabl_Edit_Textarea(div)
        let textarea = TextArea({
            id: "id-textarea-" + div.id,
            value: CellvalueAsMarkdown,
            cols: 1,
            rows: 1    
        })
        textarea.style.width = this._textareaSize(div, size) [0]
        textarea.style.height = this._textareaSize(div, size) [1]
        div.innerHTML = ""
        if (this.focusHandling) {
            // textarea.addEventListener('focus', Edit_Focus(this));   // if this not work, try: div.setAttribute('onclick', this.name + '.Edit(this)')
            textarea.setAttribute('onfocus', 'Edit_Focus(this)');
        }
        div.append(textarea);
        textarea.focus();
        textarea.select();}

    _textareaSize(div, size = "normal") {
        let computedStyle = window.getComputedStyle(div)
        let paddingLeft = parseFloat(computedStyle.paddingLeft);
        let paddingRight = parseFloat(computedStyle.paddingRight);   
        let paddingTop = parseFloat(computedStyle.paddingTop);
        let paddingBottom = parseFloat(computedStyle.paddingBottom)
        let height = parseFloat(computedStyle.height)
        let width = parseFloat(computedStyle.width);
        let borderwidth = parseFloat(computedStyle.borderWidth)
        let display = computedStyle.display
        let offsett = 30
        if (display == 'block') offsett = 0 

        // div.getBoundingClientRect()["width"] = width + 2 * borderwidth

        let a = 1
        if (size == "normal") {
            let WidthWithoutPadding = String(0.95*width)+ 'px'
            // let WidthWithoutPadding = String(width - paddingLeft - paddingRight) + 'px'
            // let HeightWithoutPadding = String(height - paddingTop - paddingBottom-offsett) + 'px'
            return [WidthWithoutPadding, (maxx(div.getBoundingClientRect()["height"] - offsett, 20))+"px"]
            // return [(div.getBoundingClientRect()["width"])+"px", ]
        }     
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
            "x": "a-x",
            "save": "a-ArrowDown"}
        let topStringRight = {
            "x": "top-30",
            "save": "top-0"}

        let a = document.createElement('a');
        a.id = "id-" + type + "-" + div.id,
        a.href = "#"
        a.classList.add("xsvg-link"); 
        a.addEventListener("click", (event) => {
            event.preventDefault();})
        a.setAttribute('onclick', functionString[type]);
        div.append(a)
        CSVG.Create_ToDIV(a.id, svgString[type])

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