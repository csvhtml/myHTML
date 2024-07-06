// Hint 1: "" must be outer quotes, '' must be inner quotes. Rule when using a dict.
// Hint 2: // Buttons with function calls can be also defined here, 
//         but better pratcice is to define them via index.html)
const DROPDOWN_CONFIG = {
    "nav-Edit": [
        {"Add Row": "XCSV['main'].AddRow()"},   
        {"Save As HTML": "DownloadHTML()"}  
    ],
     "nav-List": [
        {"Data": "XCSV['main'].XHTML.Print()"},     //
        {"Links": "XCSV['main'].XHTML.Print('Link')"}, 
    ],
}