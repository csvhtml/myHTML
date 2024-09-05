class clsDataCollection {
    constructor(parent, ItemsType = "XWorkingItems") {
        this.parent = parent
        assert (["XWorkingItems", "XConfigItems"].indexOf(ItemsType) >-1)

        let Config = {}
        if (ItemsType == "XWorkingItems") {
            Config = this.parent.config["WorkingItems"]}
        if (ItemsType == "XConfigItems") {
            Config = this.parent.config["ConfigItems"]}
        
        
        for (let key of Object.keys(Config)) {
            this[key] = new clsData(parent, key, ItemsType)
            if (ItemsType == "XConfigItems") {
                let hd = this.parent.XFormat._HeadersData(myTrim(Config[key]))
                this[key].Init(hd[0], hd[1])
            }
        }
    }

    CreateConfigItems() {
        for (let key of Object.keys(this)) {
            if (key == "parent") {continue}

            if (key == "Link") {
                this[key].RowsDelete()
                this.CreateItemList_Link(key)}
        }    
    }

    CreateItemList_Link(key) {
        let items = []
        for (let row of this.parent.XData.data) {
            for (let val of row) {
                items = PatternsInText(val,["[", "::", "]"])
                if (items.length > 0) {
                    this.AddLinksToConfigList(items)}}}  // key information actually redundant
    }

    AddLinksToConfigList(items) {
        let key = "Link"
        let name = ""; let descp = ""; let ref = "";let status = "", tags = ""
        for (let item of items) {
            name = RetStringBetween(item, "[", "::")
            descp = RetStringBetween(item, "::", "]") 
            if (this._IsItemInList(key, name)) {
                // do nothing
            } else {
                this[key].AddRow([name, descp])
            }
        }
    } 

    _IsItemInList(key, item) {
        if (this[key].ColAsList("Name").indexOf(item) > -1) {
            return true}
        return false
    }
}