class clsTest {
    constructor() {
        this.passed = 0;
        this.failed = 0;
        this.cases = [];
      }

    PrintResult() {
        let runs = this.passed + this.failed
        let strA = String(runs) + "tests run. " + String(this.failed) + " failed!"
        let n = 0; let count = 0
        for (let casse of this.cases) {
            n += 1
            if (casse[1] == "failed") {
                count += 1
                strA += "\n" + String(count) + ") Test Case " + String(n) + ": " + String(casse)
            }
        }
        console.log(strA)
    }

    Equal(a,b, fname) {
        if (IsEqual(a,b)) {
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