class clsTest {
    constructor() {
        this.passed = 0;
        this.failed = 0;
        this.cases = [];
      }

    debug_PrintAllCases() {
        for (let testcase of this.cases) {
            console.log(testcase)
        }
    }
    
    PrintResult() {
        let runs = this.passed + this.failed
        let strA = String(runs) + " tests run. " + String(this.failed) + " failed!"
        let no = 0
        let case_no = 1; let count = 0; let lastCaseName = ""
        for (let testcase of this.cases) {
            case_no +=1
            if (testcase[0] != lastCaseName) {case_no = 1}

            if (testcase[1] == "failed") {
                no += 1
                strA += "\n" + String(no) + ") Test Case " + String(case_no) + "/" + String(this._ReturnNumberofCases(testcase[0])) + ": " + String(testcase)
            }
            lastCaseName = testcase[0]
        }
        console.log(strA)
    }

    Equal(a,b, fname) {
        if (IsEqual(a,b)) {
            this._passed(fname)}
        else {
            this._failed(fname)}
    }

    IsFalse(a, fname) {
        if (IsEqual(a,false)) {
            this._passed(fname)}
        else {
            this._failed(fname)}
    }

    IsTrue(a, fname) {
        if (IsEqual(a,true)) {
            this._passed(fname)}
        else {
            this._failed(fname)}
    }

    Assertion(foo ,p , fooName, msg ) {
        if (typeof foo == 'object') {
            this._Assertion_Object(foo, p , fooName, msg); 
            return}

        if (typeof foo == 'function') {
            this._Assertion_Function(foo, p , fooName, msg); 
            return}

        assert(false)
    }

    _Assertion_Function(foo, p , fooName, msg = "") {
        let flag = true
        try {
            foo(p["a"], p["b"], p["c"], p["d"])
        } catch (error) {
            flag = false
            this._Assertion_Catch(error, msg, fooName + " Assertion")
        } finally {
            if (flag) {
                this._failed(fooName + " Assertion", "Error not thrown")}
        }
    }
 
    _Assertion_Object(foo, p , fooName, msg = "") {
        let flag = true
        try {
            new foo.constructor(p["a"], p["b"], p["c"], p["d"])
        } catch (error) {
            flag = false
            this._Assertion_Catch(error, msg, fooName + " Constructor Assertion")
        } finally {
            if (flag) {
                this._failed(fooName + " Constructor Assertion", "Error not thrown")}
        }
    }

    _Assertion_Catch(error, ExpectedMSG, fooNamePlus) {
        // if an empty error was thrown 'throw new Error;' then the message is ""
        if (error.message == ExpectedMSG) {
            this._passed(fooNamePlus)
            return}

        let start = "Error successful thrown, error message conflict: "
        if (error.message != "" && ExpectedMSG == "") {
            this._failed(fooNamePlus, start + "'" + error.message + "' was thrown instead of no error message")
            return}
        if (error.message == "" && ExpectedMSG != "") {
            this._failed(fooNamePlus, start + "No error message was thrown instead of '" + ExpectedMSG + "'")
            return}
        if (error.message != "" && ExpectedMSG != "") {
            this._failed(fooNamePlus, start + "'" + error.message + "' was thrown instead of '" + ExpectedMSG + "'")
            return}
        assert(false)
        }

    _passed(fname) {
        this.passed +=1
        this.cases.push([fname, "passed"])
    }

    _failed(fname, msg = "") {
        this.failed +=1
        this.cases.push([fname, "failed", msg])
    }

    _ReturnNumberofCases(fname) {
        let ret = 0
        for (let casse of this.cases)
            if (casse[0] == fname) {
                ret +=1}
        return ret
    }
}


function new_test_line(fname, divID) {
    document.getElementById(divID).append(document.createElement('br'))
    document.getElementById(divID).append(document.createElement('br'))
    document.getElementById(divID).append(Bold(fname))
    document.getElementById(divID).append(document.createElement('br'))
}