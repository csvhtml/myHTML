const cfgTestResultTable = {
    width: '800px', 
    colWidths:['5%', '30%', '15%', '50%'],
    colTexts: ['no.','name', 'result', 'message']
}

const cfgFunctionCallTable = {
    width: '300px', 
    colWidths:['10%', '90%'],
    colTexts: ['no.','name']
}


const TraceFunctionCalls = []

class clsTest {
    constructor() {
        this.passed = 0;
        this.failed = 0;
        this.cases = [];
        this.calls = [];
      }

    debug_PrintAllCases() {
        for (let testcase of this.cases) {
            console.log(testcase)
        }
    }

    pushTestResult(fname, result, msg) {
        if (result == 'passed')  {
            this.passed += 1}
        if (result == 'failed')  {
            this.failed += 1}
        this.cases.push([fname, result, msg])
    }

    PrintResult(divID = '') {
        let h1 = document.createElement('h3'); h1.innerHTML = 'Functions Called'
        let table1 = this.CallTable()
        document.getElementById(divID).append(h1)
        document.getElementById(divID).append(table1)

        let h2= document.createElement('h3'); h2.innerHTML = 'Test Runs'
        let table2 = this.ResultTable() 
        document.getElementById(divID).append(h2)
        document.getElementById(divID).append(table2)
    }
    
    CallTable() {
        let count = 0
        let table = this._ResultsTable(cfgFunctionCallTable)
        for (let func of TraceFunctionCalls) {
            count += 1
            table.append(HTMLTable_Row({tx:'td', cells:[count,func]}))
        }
        return table
    }

    ResultTable() {
        let count = 0
        let table = this._ResultsTable(cfgTestResultTable)
        for (let testcase of this.cases) {
            count += 1
            table.append(HTMLTable_Row({tx:'td', cells:[count].concat(testcase)}))
        }
        return table
    }

    _ResultsTable(cfg) {  
        let style = document.createElement('style');
        let css = `
            table, th, td {
                border: 1px solid #444;
                border-collapse: collapse;
                margin: 5px;
                padding-left: 5px;
                padding-right: 10px;
            }`;

        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);   

        let table = document.createElement('table');
        table.style.width = cfg['width'];
        let tr = document.createElement('tr')
        for (let i = 0; i < cfg["colWidths"].length; i++) {
            let cell = document.createElement('th');
            cell.style.width = cfg["colWidths"][i];
            cell.innerHTML = cfg["colTexts"][i]
            tr.appendChild(cell);
        }
        table.append(tr)
        return table
    }

// ##################################################################################
// # Checker                                                                        #
// ##################################################################################

    Equal(a,b, fname, InvertResult = false) {
        if (IsEqual(a,b)) {
            return this._passed(fname, InvertResult)}
        else {
            if (typOf(a) == 'str') a = a.replace(/</g, '&lt;').replace(/>/g, '&gt;')
            if (typOf(b) == 'str') b = b.replace(/</g, '&lt;').replace(/>/g, '&gt;')
            return this._failed(fname, " " + a + " not equal to " + b + ". ", InvertResult)}
    }

    NotEqual(a,b,fname) {
        if (IsEqual(a,b)) {
            if (typOf(a) == 'str') a = a.replace(/</g, '&lt;').replace(/>/g, '&gt;')
            if (typOf(b) == 'str') b = b.replace(/</g, '&lt;').replace(/>/g, '&gt;')
            return this._failed(fname,  " " + a + " equal to " + b + ". ")}
        return this._passed(fname)
    }

    IsFalse(a, fname) {
        if (IsEqual(a,false)) {
            return this._passed(fname)}
        else {
            return this._failed(fname)}
    }

    IsTrue(a, fname) {
        if (IsEqual(a,true)) {
            return this._passed(fname)}
        else {
            return this._failed(fname)}
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

    _passed(fname, InvertResult = false) {
        if (InvertResult) {
            this._failed(fname, "InvertResult failed")
            return}
        
        let result = 'passed';let msg = ''

        this.pushTestResult(fname, result, msg)
        return result
    }

    _failed(fname, msg = "", InvertResult = false) {
        if (InvertResult) {
            return this._passed(fname)
            return}

        let result = 'failed'
    
        this.pushTestResult(fname, result, msg)
        return result
    }
}