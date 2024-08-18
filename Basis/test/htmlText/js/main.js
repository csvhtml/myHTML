(function () {
    // create table in id-1: From Markdown inside the html document
    let div = document.getElementById("id-1")
    div.innerHTML = BASIS.HTMLTable_FromMarkdown(div.innerHTML)

    // create table in id-2: From configuration, i. e. dictionary
    document.getElementById("id-2").innerHTML = BASIS.HTMLTable_FromConfig({
        tableID: "id-tableX2",
        tableClass: "table class1 class2",
        tableStyle: "color: blue",

        theadID: "id-theadX2",
        theadClass: "hclass1 hclass2",
        theadStyle: "color: red",

        trhID: "id-trhX2",
        trhClass: "rhh",

        thsText: ["A", "B", "C"], 
        thsID:  ["id-A-2", "id-B-2", "id-C-2"],
        thsClass:  ["thClass-A", "thClass-B", "thClass-C"],
        thsStyle:  ["width:30%", "width:30%", "width:30%"],

        rowsID: ["row1-2", "row2-2"],
        rowsClass: ["rowClass1", "rowClass2"],
        rowsStyle: ["background:grey", "background:lightgrey"],

        cellsText: [["Hallo", "Welt", "!"], ["Zeile 2", "Zeile 2-2", "3"]],
        cellsID: [["id-Hallo-2", "id-Welt-2", "id-!-2"], ["id-Zeile 2-2", "id-Zeile 2-2-2", "id-3-2"]],
        cellsClass: [["class-Hallo", "class-Welt", "class-!"], ["class-Zeile 2", "class-Zeile 2-2", "class-3"]],
        cellsStyle: [["color:black", "", ""], ["color:green", "", ""]]
        }
        )

        
    // create table in id-3: with only text dictionary. rest is ""
    let tableValues = {
        thsText: ["A", "B", "C"], 
        cellsText: [["Hallo", "Zusammen", "!"], ["Zeile 2", "Zeile 2-2", "300"]],
    }
    document.getElementById("id-3").innerHTML = BASIS.HTMLTable_FromConfig(tableValues)

    // create table in id-4: with additional seperate configuration
    let tableConfig = {
        tableID: "id-tableX-3",
        tableClass: "table class1 class2",
        tableStyle: "color: blue",

        theadID: "id-theadX-3",
        theadClass: "hclass1 hclass2",
        theadStyle: "color: red",

        trhID: "id-trhX-3",
        trhClass: "rhh",

        thsID:  ["id-A-3", "id-B-3", "id-C-3"],
        thsClass:  ["thClass-A", "thClass-B", "thClass-C"],
        thsStyle:  ["width:30%", "width:30%", "width:30%"],

        rowsID: ["row1-3", "row2-3"],
        rowsClass: ["rowClass1", "rowClass2"],
        rowsStyle: ["background:grey", "background:lightgrey"],

        cellsID: [["id-Hallo-3", "id-Welt-3", "id-!-3"], ["id-Zeile 2-3", "id-Zeile 2-2-3", "id-3-3"]],
        cellsClass: [["class-Hallo", "class-Welt", "class-!"], ["class-Zeile 2", "class-Zeile 2-2", "class-3"]],
        cellsStyle: [["color:black", "", ""], ["color:green", "", ""]]
    }

    document.getElementById("id-4").innerHTML = BASIS.HTMLTable_FromConfig({...tableConfig, ...tableValues}) 
})();





