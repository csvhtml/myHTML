function test_BASIS(divID, myTest) {
	test_NoBlanksInList(myTest)
	test_ByVal(myTest)
	test_ValidChars(myTest)
	test_typOf(myTest)
	test_maxx(myTest)
	test_minn(myTest)
	test_IsListEqualSize(myTest)
	test_IsEqual(myTest)
	test_ElementInArrayN(myTest)
	test_RetStringBetween(myTest)
	test_FileNameFromPath(myTest)
	test_PatternsFound_Donts(myTest)
	test_PatternsFound_Dos2(myTest)
	test_PatternsFound_Dos3(myTest)
	test_Markup(myTest)
	test_MarkupSVG(myTest)
	proto_listCount(myTest)
	proto_listRemoveX(myTest)
	proto_listRemoveAll(myTest)
	proto_listRemoveItems(myTest)
	proto_listToggle(myTest)
	proto_listPushX(myTest)
	proto_listPreFix(myTest)
	proto_stringUntil(myTest)
	proto_stringAfter(myTest)
	proto_stringCount(myTest)
	proto_stringRepalceN(myTest)
	proto_stringTrimPlus1(myTest)
	proto_stringTrimPlus2(myTest)
	proto_DOMIsDescendantOf(myTest)
	proto_documentGetElementsWithOnClickEvent(myTest)
	proto_documentGetElementsByIDSubstring(myTest)

	myTest.PrintResult(divID)
}
