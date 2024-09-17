function test_XCSV(divID, myTest) {
	test_clsXSCV_Init(myTest)
	test_clsXSCV_Init2(myTest)
	test_clsXSCV_Type(myTest)
	test_clsXSCV_ItemNameAvailable(myTest)
	test_clsXSCV_AddRow(myTest)
	test_clsXSCV_AddCol(myTest)
	test_clsXSCV_Clear(myTest)
	test_clsXSCV_Config(myTest)
	test_clsXSCV_Front_Default_Var2(myTest)
	test_clsXSCV_Front_Table(myTest)
	test_clsXSCV_Front_Gallery(myTest)
	test_clsXSCV_AsCSV_HeaderLine(myTest)
	test_clsXSCV_AsCSV_HeaderLine(myTest)

	myTest.PrintResult(divID)
}
