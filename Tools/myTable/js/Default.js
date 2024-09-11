// #################################################
// Product Config                                  *
// #################################################

// also includes the Config (= dict structure of "WorkingItems" and CofigItems)
// const XCSV_DATA = {
//     "WorkingItems": {
//         "X": "\
//             ||A|B|C\n\
//             ||1|2|3\n\
//             ||5 Leerzeichen|Neue\nZeile|[Link::URL]\n\
//             ||[ ] leere Checkbox|[x] leere Checkbox|[Link::URL]\n\
//             "
//     },
//     "ConfigItems": {
//         "Link": "\
//             ||Name|Description\n\
//             || | \n\
//             "
//     }
// }

// CSS for HTML Export
const CSS_HTMLEXPORT = 
    "<style>" + 
    "table {width: 100%;table-layout: fixed;border-collapse: collapse;margin: 20px 0;font-size: 18px;text-align: left;table-layout: auto;}" + 
    "th, td {padding: 12px 15px;border: 1px solid #ddd;word-wrap: break-word;}" + 
    "th {background-color: #f2f2f2;color: #333;}" + 
    "tr:hover {background-color: #f1f1f1;}" +
    "th {font-weight: bold;background-color: lightgray !important;position: sticky;top: 0px;z-index: 2;}" + 
    "</style>"
