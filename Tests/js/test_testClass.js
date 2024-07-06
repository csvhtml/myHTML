function test_TestCase_Equal(myTest) {
    let fname = arguments.callee.name;
    
    myTest.Equal(1,1,fname)
    myTest.Equal(1,2,fname)
    myTest.Equal([1,2,3],[1,2,3],fname)
}

function test_TestCase_Assert(myTest) {
    let fname = arguments.callee.name;

    let foo = function (a,b,c,d) {ErrorFu(a,b,c,d) }
    myTest.Assertion(foo, {}, fname)                                                        // passed. (empty) Error was seen
    myTest.Assertion(foo, {"a": false}, fname)                                              // failed. Error was not seen
    myTest.Assertion(foo, {"a": false}, fname, "msg")                                       // failed. Error was not seen. msg irrelevant
    myTest.Assertion(foo, {"a": true}, fname, "some message espected")                      // failed. Error was seen, but no message was thrown
    myTest.Assertion(foo, {"a": true, "b": "some message"}, fname)                          // failed. Error was seen, but no message was expected
    myTest.Assertion(foo, {"a": true, "b": "same message"}, fname, "other message")         // failed. Error was seen, but wrong message
    myTest.Assertion(foo, {"a": true, "b": "same message"}, fname, "same message")          // passed. Error was seen with correct message

    // objects
    // must first create obj without error. Then constructor is tested during myTest.Assertion
    let obj = new cls123(false)
    myTest.Assertion(obj, {}, fname)                                                        // passed. (empty) Error was seen
    myTest.Assertion(obj, {"a": false}, fname)                                              // failed. Error was not seen
    myTest.Assertion(obj, {"a": false}, fname, "msg")                                       // failed. Error was not seen. msg irrelevant
    myTest.Assertion(obj, {"a": true}, fname, "some message espected")                      // failed. Error was seen, but no message was thrown
    myTest.Assertion(obj, {"a": true, "b": "some message"}, fname)                          // failed. Error was seen, but no message was expected
    myTest.Assertion(obj, {"a": true, "b": "same message"}, fname, "other message")         // failed. Error was seen, but wrong message
    myTest.Assertion(obj, {"a": true, "b": "same message"}, fname, "same message")          // passed. Error was seen with correct message
}

function ErrorFu(variable = true, msg = "") {
        if (variable) {
            if (msg == "") {
                throw new Error;}
            if (msg != "") {
                throw new Error(msg);}
            assert(false)
        }
    }

class cls123 {
    constructor(variable = true, msg = "") {
        if (variable) {
            if (msg == "") {
                throw new Error;}
            if (msg != "") {
                throw new Error(msg);}
            assert(false)
        }
    }
}
