class clsXCSV_Infohandler {
    constructor(parent) {
        this.parent = parent
    }

    Level1(msg) {
        if (this.parent.config['InfoIDs'][0] != null) {
            document.getElementById(this.parent.config['InfoIDs'][0]).innerHTML = msg}
        
    }

    Level2(msg) {
        if (this.parent.config['InfoIDs'][1] != null) {
            document.getElementById(this.parent.config['InfoIDs'][1]).innerHTML = msg}
    }

    Level3(msg) {
        if (this.parent.config['InfoIDs'][2] != null) {
            document.getElementById(this.parent.config['InfoIDs'][2]).innerHTML = msg}
    }
}