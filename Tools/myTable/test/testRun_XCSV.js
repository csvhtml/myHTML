function test_XCSV(divID, myTest) {
	test_clsXSCV_Init(myTest)
	test_clsXSCV_AddRow(myTest)
	test_clsXSCV_AddCol(myTest)
	test_clsXSCV_Clear(myTest)
	test_clsXSCV_Config(myTest)

	myTest.PrintResult(divID)
}
