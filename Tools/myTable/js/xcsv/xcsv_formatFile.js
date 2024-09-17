class clsFormatFile {
    constructor(parent, config) {
        this.parent = parent
        this.config = {
            "file-seperator": "||||",
            "line-starter": "||",
            "cell-seperator": "|",
            "line-end": "\n"        // not used for read in, only for saveAs
        }
    }

    Read(text) {
        /**
         * Reads in a text (formatted acc to this.config) and saves its data to the parent
         */
        if (text == undefined) return
        if (!text.startsWith(this.config["file-seperator"])) {
            text = this.config["file-seperator"] + '<define name>' + this.config["line-end"] + text} 
        let textItems = this._NameHeadersData(text)

        this.parent.XItems = [];
        for (let i = 0; i < textItems.length; i++) {
            this.ReadOne(i, textItems[i])
        }
        this.parent.Activate()
    }

    DataAsCSV() {
        /**
         * Parses the data of the parent as a text file
         */
        let ret = '';
        for (let i = 0; i < this.parent.XItems.length; i++) {
            ret += this._AsCSV_NameLine(i)
            ret += this._AsCSV_HeaderLine(i)
            ret += this._AsCSV_RowsLines(i)
        }

        return ret}

    Name(text) {
        if (!text.includes(this.config["file-seperator"])) { 
            return }
        text = text.after(this.config["file-seperator"])
        return text.until('\n').trim()
    }
    
    ReadOne(ItemsIndex, texttriple) {
        this.parent.xAdd(texttriple[1], texttriple[2], texttriple[0])
    }

    _AsCSV_NameLine(ItemsIndex) {
        let llll = this.config["file-seperator"]
        let n = this.config["line-end"]

        if (IsUndefined([ItemsIndex])) ItemsIndex = 0
        return llll + this.parent.XItems[ItemsIndex].name + n
    }

    _AsCSV_HeaderLine(ItemsIndex) {
        let ll = this.config["line-starter"]
        let l = this.config["cell-seperator"]
        let n = this.config["line-end"]
        let ret = ll 

        if (IsUndefined([ItemsIndex])) ItemsIndex = 0
        for (let header of this.parent.XItems[ItemsIndex].headers) {
            ret += header + l}
        ret = ret.slice(0, -1*l.length) + n
        
        return ret
    }
    
    _AsCSV_RowsLines(ItemsIndex) {
        let ll = this.config["line-starter"]
        let l = this.config["cell-seperator"]
        let n = this.config["line-end"]
        let ret = ""

        if (IsUndefined([ItemsIndex])) ItemsIndex = 0
        for (let row of this.parent.XItems[ItemsIndex].data) {
            ret += ll
            for (let cell of row) {
                ret += cell + l}
            ret = ret.slice(0, -1*l.length) + n}
        
        return ret
    }

    _NameHeadersData(textfile) {
        // return a list of data Items in the following format:
        //
        // [[name, headers, data], [name, headers, data]]

        let textParts = textfile.split('\n' + this.config["file-seperator"]); textParts.removeAll("")
        textParts[0] = textParts[0].after(this.config["file-seperator"])
        
        let ret = []; let triple = []
        for (let textPart of textParts) {
            let name = textPart.until('\n').trim()
            let textPart2 = textPart.substring(textPart.indexOf('\n')+1)
            textPart2 = textPart2.trimPlus([' |'])
            let headers_data = this._HeadersData(textPart2)
            triple = [name, headers_data[0], headers_data[1]]
            ret.push(triple)
        }

        return ret
    }

    _HeadersData(textfile) {
        assert(textfile.startsWith(this.config["line-starter"]))

        let lines = textfile.split('\n' + this.config["line-starter"]); lines.removeAll("")
        lines[0] = lines[0].after(this.config["line-starter"])
        for (let i = 0; i< lines.length; i++) {
            lines[i] = lines[i].replace(/\n+$/, '')} // "at the end.\n\n\n" ->"at the end."
        let headers = lines[0]; headers = headers.split(this.config["cell-seperator"])        
        let rows = lines.slice(1)
        let data = []
        for (let row of rows){
            data.push(row.split(this.config["cell-seperator"]))}
    
        return [headers, data]
    }
}