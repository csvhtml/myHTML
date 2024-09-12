class clsFormat {
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
        this.xRead(text)}

    DataAsCSV() {
        /**
         * Parses the data of the parent as a text file
         */
        let ret = '';
        ret += this._AsCSV_HeaderLine()
        ret += this._AsCSV_RowsLine()
        return ret}

    Name(text) {
        if (!text.includes(this.config["file-seperator"])) { 
            return }
        text = text.after(this.config["file-seperator"])
        return text.until('\n').trim()
    }
    
    xRead(text) {
        if (text == undefined) {
            return}
        let name = 'X'
        if (text.includes(this.config["file-seperator"])) {
            let files = text.split('\n' + this.config["file-seperator"]); files.removeAll("")
            files[0] = files[0].after(this.config["file-seperator"])
            let textfile = files[0]
            name = textfile.until('\n').trim()
            text = textfile.substring(textfile.indexOf('\n')+1)
            text = text.trimPlus([' |'])}
        
        let headers_data = this._HeadersData(text)

        this.parent.XData.Init(headers_data[0], headers_data[1], name)
        
    }

    _AsCSV_HeaderLine() {
        let ll = this.config["line-starter"]
        let l = this.config["cell-seperator"]
        let n = this.config["line-end"]

        let ret = ll 
        for (let header of this.parent.XData.headers) {
            ret += header + l}
        ret = ret.slice(0, -1*l.length) + n
        
        return ret
    }
    
    _AsCSV_RowsLine() {
        let ll = this.config["line-starter"]
        let l = this.config["cell-seperator"]
        let n = this.config["line-end"]

        let ret = ""
        for (let row of this.parent.XData.data) {
            ret += ll
            for (let cell of row) {
                ret += cell + l}
            ret = ret.slice(0, -1*l.length) + n}
        
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