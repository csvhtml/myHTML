class clsXCSV_Infohandler {
    constructor(parent) {
        this.parent = parent
    }

    Level1(msg) {
        document.getElementById(this.parent.config['InfoIDs'][0]).innerHTML = msg 
    }

    Level2(msg) {
        let infoblocks = this.parent.config['InfoIDs']
        if (typOf(infoblocks) == 'list') {
            if (infoblocks.length > 1) {
                document.getElementById(infoblocks[1]).innerHTML = msg
                return }
            if (infoblocks.length == 1) {
                document.getElementById(infoblocks[0]).innerHTML = msg 
                return }
        }

    }

    Level3(msg) {
        let infoblocks = this.parent.config['InfoIDs']
        if (typOf(infoblocks) == 'list') {
            if (infoblocks.length > 2) {
                document.getElementById(infoblocks[2]).innerHTML = msg
                return }
        }
    }

}