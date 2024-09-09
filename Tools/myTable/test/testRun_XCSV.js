function test_XCSV(divID, myTest) {
	test_clsXSCV_Init(myTest)
	test_clsXSCV_forAllCellsValue(myTest)
	test_clsXSCV_AddRow(myTest)

	myTest.PrintResult(divID)
}
