function test_TestCase_Equal(myTest) {
    let fname = arguments.callee.name;
    
    myTest.Equal(1,1,fname)
    myTest.Equal(1,2,fname)
    myTest.Equal([1,2,3],[1,2,3],fname)

}

function test_TestCase_Assert(myTest) {
    let fname = arguments.callee.name;
    
    let foo = function () {ErrorFu() }
    myTest.Assertion(foo, {}, fname)                        //passed 
    myTest.Assertion(foo, {}, fname, "wrong error message") // failed error.message == "" && ExpectedMSG != ""
    foo = function () {ErrorWithMessageFu()}
    myTest.Assertion(foo, {}, fname)                        // failed error.message != "" && ExpectedMSG == ""
    myTest.Assertion(foo, {}, fname, "wrong error message") // failed else (both are != "")
    foo = function () {NoError()}
    myTest.Assertion(foo, {}, fname)                            // failed triggered at "finally"
    myTest.Assertion(foo, {}, fname, "expected error message")  // failed triggered at "finally", msg irrelevant

    // MOHI 
    // Assertion with objects
}

function NoError() {
    return 0;
}

function ErrorFu() {
    throw new Error;
}

function ErrorWithMessageFu() {
    throw new Error("corect error message");
}