// const UploadFile  = (event)  => {
function UploadFile (event)  {

    let funktion = function (input_id) {
        return eval(FILES_UPLOAD_CONFIG[input_id].replace("()", ""))}

    cFileReaders[event.srcElement.id].addEventListener("loadend", funktion(event.srcElement.id)); 
    let divFile = document.getElementById(event.srcElement.id);
    cFileReaders_File[event.srcElement.id] = divFile
    cFileReaders[event.srcElement.id].readAsText(divFile.files[0]); 
}

function MultiFiles (event) {
    cFileMulti[event.srcElement.id] = document.getElementById(event.srcElement.id).files
    eval(FILES_MULTI_CONFIG[event.srcElement.id].replace('()', '("' + event.srcElement.id + '")'))
}

function DownloadFile(text = "a", filename = ".csv") {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    pom.style.display = 'none';
    document.body.appendChild(pom);
    pom.click();
    document.body.removeChild(pom);
}
