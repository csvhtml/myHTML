class clsXCSV_Infohandler {
    constructor(parent) {
        this.parent = parent
    }

    Level1(msg) {
        let infoblocks = this.parent.config['infoblocks']
        if (typOf(infoblocks) == 'list')
            if (infoblocks.length > 0) 
                document.getElementById(infoblocks[0]).innerHTML = msg 
    }

    Level2(msg) {
        let infoblocks = this.parent.config['infoblocks']
        if (typOf(infoblocks) == 'list') {
            if (infoblocks.length > 1) {
                document.getElementById(infoblocks[1]).innerHTML = msg
                return }
            if (infoblocks.length == 1) {
                document.getElementById(infoblocks[0]).innerHTML = msg 
                return }
        }

    }

}