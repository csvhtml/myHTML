function listFiles() {
    const fileList = document.getElementById("fileInput").files;
    const listElement = document.getElementById("fileList");

    listElement.innerHTML = ""; // Clear previous list
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const listItem = document.createElement("li");
      listItem.textContent = file.name;
      listElement.appendChild(listItem);
    }
  }