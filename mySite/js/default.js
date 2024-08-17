const XCSV_DATA = {
    "WorkingItems": {
        "newTable": "\
            ||A|B|C\n\
            ||1|2|3\n\
            ||Hallo|Welt|dort\n\
            ",
        "Y": "\
            ||a|b\n\
            ||10|20\n\
            ||Hello|World\n\
            "
    },
    "ConfigItems": {
        "Link": "\
            ||Name|Description\n\
            || | \n\
            "
    }
}

const CSS_HTMLEXPORT = 
    "<style>" + 
    "table {width: 100%;table-layout: fixed;border-collapse: collapse;margin: 20px 0;font-size: 18px;text-align: left;table-layout: auto;}" + 
    "th, td {padding: 12px 15px;border: 1px solid #ddd;word-wrap: break-word;}" + 
    "th {background-color: #f2f2f2;color: #333;}" + 
    "tr:hover {background-color: #f1f1f1;}" +
    "th {font-weight: bold;background-color: lightgray !important;position: sticky;top: 0px;z-index: 2;}" + 
    "</style>"
