// ###########################################################################################
// This class is not inteded to have any callable functions.                                 #
// When initialized, it attaches DropDowns on th Page based on div classes and config        #
//                                                                                           #
// ###########################################################################################

class libDropDowns {
    constructor() {
        this.Item = this.constuctor_init()
    }

    constuctor_init() {
        let ret = {}
        for (let key of Object.keys(LIB_DROPDOWN_QWERTZ) ) {
            ret[key] = new libDropDownSinge(
                LIB_DROPDOWN_QWERTZ[key],
                document.getElementById(key))
        
            ret[key].InnerHTML_AddDropDown()
        }
        return ret
    }
}


class libDropDownSinge {
    constructor(header = "", items = [], egoDiv = null) {
        this.egoDIV = null                
        this.header = ""                   // header of DropDown. Text that you see and clock on
        this.items = []                     // strings that is shown in the items dorpping down, including SwitchOn/Switch/Off
        this.functions = {}                 // item: function pairs where function is a string representative. length must not match with items, i. e. there can be items without function
        this.IsButton = false

        this.constructor_init(header, items, egoDiv)
    }

    // Call functions direclty assigned to DropDiown items
    Call(key) {
        eval(this.functions[key])}

    // AddDropDown via direct innerHTML manipulation. TargetDiv in case it was not defined via constructor. Only called once
    InnerHTML_AddDropDown() {
        this.xInnerHTML_AddDropDown()}

    
// ################################################################
// functions                                                      #
// ################################################################    

        constructor_init(items, egoDiv) {
            if (egoDiv == null) {
                return}

            this.egoDIV = egoDiv
            this.header = this.egoDIV.innerHTML

            if (typOf(items) == "str") {
                this.IsButton = true
                this.functions = items
            } else {
                // DropDowns
                for (let item of items) {
                    // drop down entry with function being called
                    if (typOf(item) == "dict") { 
                        this.constructor_pushFunctionItem(item)} 
                    // drop down entry with no function
                    if (typOf(item) == "str") {
                        this.constructor_pushItem(item)
                    }
                }
            }

        }

        constructor_pushFunctionItem(item) {
            let keys = Object.keys(item); 
            this.constructor_pushItem(keys[0])
            this.functions[keys[0]] = item[keys[0]]

            assert(keys.length == 1)    
        }

        constructor_pushItem(item) {
            this.items.push(item)
        }


    xInnerHTML_AddDropDown() {
        if (this.egoDIV == null) {
            return}

        if (this.IsButton) {
            this.egoDIV.setAttribute('onclick', this.functions)
            return
        }
        let prefix = this.egoDIV.id; let ret = ""

        // DropDown Header
        this.egoDIV.setAttribute('onclick', "DropDown_ToggleDisplay('" + prefix + "-DropDownWrapper')")
        
        // DropDown Wrapper
        let wrapper = '<div '
                + 'id="' + prefix + '-DropDownWrapper" ' 
                + 'class="dropdown-menu" ' 
                + 'onmouseleave = "' + "DropDown_Hide('" + prefix + "-DropDownWrapper'" + ')"'
                + '>'
        ret = wrapper

        // DropDown Items
        let idx = -1
        for (let i = 0; i < this.items.length; i++) {
            let itemsPair = this.items[i].split('/')
            let id = prefix + '-dd-' + noBlank(itemsPair[0]) 
            
            let onclick = ""
            let onmouseleave = ""  // used to change val and onclickfunction for switches
            for (let j = 0; j<1; j++) { //1-loop
                if (this._ItemNoFunction(i)) {
                    continue}

                if (this._ItemWithFunction(i)) {
                    onclick = 'onclick="' + this.functions[itemsPair[0]] + '" '
                    continue}

                if (this._SwitchNoFunction(i)) {
                    let functioncall = "DropDown_ToggleVal('" 
                                    + id + "', " 
                                    + "['" + itemsPair[0] + "', '"  + itemsPair[1]  + "'] )"
                    onmouseleave = 'onmouseup="' + functioncall + '" '
                    continue}

                if (this._SwitchWithFunction(i)) {
                    let functionPair = this.functions[this.items[i]].split('/')
                    let functioncall = "DropDown_ToggleValANDClick('" 
                                        + id + "', " 
                                        + "['" + itemsPair[0] + "', '"  + itemsPair[1]  + "'], "
                                        + "['" + functionPair[0] + "', '"  + functionPair[1]  + "'] )"
                    onmouseleave = 'onmouseup="' + functioncall + '" '
                    onclick = 'onclick="' + functionPair[0] + '" '   //onclick is disabled when toggled, so function is triggered via gloabl DropDown_ToggleEventClick. Only kept to state current state
                    continue}
            }

            let itemHTML = '<a ' 
                + 'id="' + id + '" '
                + 'class="dropdown-item" href="#" ' 
                + onclick
                + onmouseleave
                + '>' + itemsPair[0] + '</a>'

            ret += itemHTML}
        
        // Closeing
        ret += "</div>"
        this.egoDIV.innerHTML += ret
    }


    _ItemNoFunction(index) {
        return  !this._hasSwitch(index) && !this._hasFunction (index)}

    _ItemWithFunction(index) {
        return  !this._hasSwitch(index) && this._hasFunction(index)}

    _SwitchNoFunction(index) {
        return  this._hasSwitch(index) && !this._hasFunction(index) }

    _SwitchWithFunction(index) {
        return  this._hasSwitch(index) && this._hasFunction(index)}

    _hasSwitch(index) {
        return this.items[index].includes("/")}

    _hasFunction(index) {
        return Object.keys(this.functions).includes(this.items[index]) }

}