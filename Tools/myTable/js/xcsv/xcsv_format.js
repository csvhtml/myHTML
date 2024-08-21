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
         * Reads in a text file and saves its data to the parent
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
    
    xRead(text) {
        if (text == undefined) {
            return}
        let files = text.split(this.config["file-seperator"]); files.removeAll("")
        let headers_data = this._HeadersDataName(files[0])

        this.parent.XData.Init(headers_data[0], headers_data[1])
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

    _HeadersDataName(textfile) {
        let name = ''
        if (!textfile.startsWith(this.config["line-starter"])) {
            name = textfile.until('\n')
            textfile = textfile.substring(textfile.indexOf('\n')+1)
        }
        assert(textfile.startsWith(this.config["line-starter"]))

        let lines = textfile.split(this.config["line-starter"]); lines.removeAll("")
        for (let i = 0; i< lines.length; i++) {
            lines[i] = lines[i].replace(/\n+$/, '')} // "at the end.\n\n\n" ->"at the end."
        let headers = lines[0]; headers = headers.split(this.config["cell-seperator"])        
        let rows = lines.slice(1)
        let data = []
        for (let row of rows){
            data.push(row.split(this.config["cell-seperator"]))}
    
        return [headers, data, name]
    }
}


// ||||<name>
// ||<header1>|<header2>|<header3>|<header4>
// ||<data 11>|<data 12>|<data 13>|<data 14>
// ||<data 21>|<data 22>|<data 23>|<data 24>
// ||||<name>
// ||<header1>|<header2>|<header3>|<header4>
// ||<data 11>|<data 12>|<data 13>|<data 14>
// ||<data 21>|<data 22>|<data 23>|<data 24>