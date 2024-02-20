class clsReader {
    constructor(parent, config) {
        this.parent = parent
        this.config = {
            "file-seperator": "||||",
            "line-starter": "||",
            "cell-seperator": "|",
            "line-end": "\n"        // not used for read in, only for saveAs
        }
    }

    ReadXCSV(text) {
        if (text == undefined) {
            return}
        let files = text.split(this.config["file-seperator"])
        let lines = files[0].split(this.config["line-starter"]); lines.removeAll("")
        for (let i = 0; i< lines.length; i++) {
            lines[i] = lines[i].replace(/\n+$/, '')} // "at the end.\n\n\n" ->"at the end."
        let headers = lines[0]; headers = headers.split(this.config["cell-seperator"])        
        let rows = lines.slice(1)
        let data = []
        for (let row of rows){
            data.push(row.split(this.config["cell-seperator"]))}

        this.parent.XData.InitData(headers, data)
        this.parent.XPrinter.Print()
    }

}