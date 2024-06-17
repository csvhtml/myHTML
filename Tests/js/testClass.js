class clsTest {
    constructor() {
        this.passed = 0;
        this.failed = 0;
        this.cases = [];
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

    _ReturnNumberofCases(fname) {
        let ret = 0
        for (let casse of this.cases)
            if (casse[0] == fname) {
                ret +=1}
        return ret
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

    NoAssertion(foo, p , fooName) {
        if (typeof foo == 'object') {
            this._NoAssertion_Object(foo, p , fooName); return}

        if (typeof foo == 'function') {
            this._NoAssertion_Function(foo, p , fooName); return}

        assert(false)
    }

    Assertion(foo ,p , fooName, msg ) {
        if (typeof foo == 'object') {
            this._Assertion_Object(foo, p , fooName, msg); return}

        if (typeof foo == 'function') {
            this._Assertion_Function(foo, p , fooName, msg); return}

        assert(false)
    }

    _Assertion_Function(foo, p , fooName, msg = "") {
        let flag = true
        try {
            foo(p["a"], p["b"], p["c"], p["d"])
        } catch (error) {
            flag = false
            if(error.message == msg || "" == msg) {
                this._passed(fooName)
            } else {
                this._failed(fooName + " Assertion", error.message + " was thrown instead of " + msg)
            }
        } finally {
            if (flag) {
                this._failed(fooName)}
        }
    }

    _NoAssertion_Function(foo, p , fooName) {
        let flag = true
        try {
            foo(p["a"], p["b"], p["c"], p["d"])
        } catch (error) {
            flag = false
            this._failed(fooName, "Error was thrown: "  + error.message)}
        finally {
            if (flag) {
                this._passed(fooName)}   
        } 
    }
 
    _Assertion_Object(foo, p , fooName, msg = "") {
        let flag = true
        try {
            new foo.constructor(p["a"], p["b"], p["c"], p["d"])
        } catch (error) {
            flag = false
            if(error.message == msg || "" == msg) {
                this._passed(fooName + " Assertion")
            } else {
                this._failed(fooName + " Assertion", error.message + " was thrown instead of " + msg)
            }
        } finally {
            if (flag) {
                this._failed(fooName + " Assertion")}
        }
    }

    _NoAssertion_Object(foo, p, fooName) {
        let flag = true
        try {
            new foo.constructor(p["a"], p["b"], p["c"], p["d"])
        } catch (error) {
            flag = false
            this._failed(fooName, "Error was thrown: "  + error.message)}
        finally {
            if (flag) {
                this._passed(fooName)}   
        } 
    }

    _passed(fname) {
        this.passed +=1
        this.cases.push([fname, "passed"])
    }

    _failed(fname, msg = "") {
        this.failed +=1
        this.cases.push([fname, "failed", msg])
    }
}






function test_passed(fname) {
    testpassed_count += 1
    if (lastlog == "") {
        lastlog = 'OK ' + fname 
        lastlog_count = 1
        return 0
    }

    if (lastlog != 'OK ' + fname) {
        console.log(lastlog_count + " x " + lastlog)
        lastlog = 'OK ' + fname
        lastlog_count = 1
    } else {
        lastlog_count += 1
    }
    return 0
}

function test_failed(fname) {
    testfailed_count +=1
    if (ASSERT) {
        assert(false, fname)
    } else {
        console.log('Failed ' + fname)
    }
    return -1
}


function new_test_line(fname, divID) {
    document.getElementById(divID).append(document.createElement('br'))
    document.getElementById(divID).append(document.createElement('br'))
    document.getElementById(divID).append(Bold(fname))
    document.getElementById(divID).append(document.createElement('br'))
}