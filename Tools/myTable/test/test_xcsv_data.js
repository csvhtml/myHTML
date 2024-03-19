function test_clsData_Init(myTest) {
    let fname = arguments.callee.name;
    let foo = new clsXCSV("div-id")

    myTest.Assertion(foo, {}, fname)
    myTest.Assertion(foo.XData, {}, fname)

    let bar = function (a,b,c,d) {
        foo.XData.Init(a,b,c,d)}

    myTest.Assertion(bar, {}, fname, "Undefined headers")
    myTest.Assertion(bar, {"a":["A"]}, fname, "Undefined data")
    myTest.Assertion(bar, {"a":["A"], "b":["A"]}, fname, "DataIs2D failed")
    myTest.Assertion(bar, {"a":["A"], "b":[["A", "b"]]}, fname, "HeadersData failed")

    myTest.NoAssertion(bar, {"a":["A", "B"], "b":[["1", "11"], ["2", "22"]]}, fname)
}