// ####################################################################################
// Edit                                                                               #
// ####################################################################################

function _helper_MinHeight(divID) {
    let row = document.getElementById(XCSV["main"].XNames.IDs.RowfromCellID(divID))
    if (row.getBoundingClientRect()["height"] < 60) {
        row.style.height = "80px"}
    }

function _helper_MinHeight_Undo(divID) {
    let row = document.getElementById(XCSV["main"].XNames.IDs.RowfromCellID(divID))
        row.style.height = ""
}