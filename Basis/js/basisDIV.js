function TextArea({
    id= "", 
    cols= 50, 
    rows= 5, 
    classList= []
}) {
    let input = document.createElement('textarea'); 
    input.cols = cols
    input.rows = rows
    input.id = id
    for (clas of classList) {
        input.classList.add(clas)
    }
    return input
}