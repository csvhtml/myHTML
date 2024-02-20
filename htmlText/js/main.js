const HTMLTEXT = new libHTMLText();

(function () {
    let div = document.getElementById("id-1")
    div.innerHTML = HTMLTEXT.Table_FromMarkdown(div.innerHTML)

    document.getElementById("id-2").innerHTML = HTMLTEXT.Table({
        tableID: "id-tableX",
        tableClass: "class1 class2",
        tableStyle: "color: blue;width:600pt",

        theadID: "id-theadX",
        theadClass: "hclass1 hclass2",
        theadStyle: "color: red",

        trhID: "id-trhX",
        trhClass: "rhh",

        thsText: ["A", "B", "C"], 
        thsID:  ["id-A", "id-B", "id-C"],
        thsClass:  ["thClass-A", "thClass-B", "thClass-C"],
        thsStyle:  ["width:30%", "width:30%", "width:30%"],

        rowsID: ["row1", "row2"],
        rowsClass: ["rowClass1", "rowClass2"],
        rowsStyle: ["background:grey", "background:lightgrey"],

        cellsText: [["Hallo", "Welt", "!"], ["Zeile 2", "Zeile 2-2", "3"]],
        cellsID: [["id-Hallo", "id-Welt", "id-!"], ["id-Zeile 2", "id-Zeile 2-2", "id-3"]],
        cellsClass: [["class-Hallo", "class-Welt", "class-!"], ["class-Zeile 2", "class-Zeile 2-2", "class-3"]],
        cellsStyle: [["color:black", "", ""], ["color:green", "", ""]]
        }
        )
})();





