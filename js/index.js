const uploadContainer = document.querySelector('.upload-container');
const fileInput = document.getElementById("fileInput");
const imagePreview = document.getElementById("image-preview");
const progressBar = document.querySelector(".progress-container");
const wrapper = document.querySelector(".wrapper");
const btnDownload = document.getElementById("btn-download");
const btnRemoveImage = document.querySelector(".btn-rm-img");
const btnDarkTheme = document.querySelector(".dark-theme-button")
const btnLightTheme = document.querySelector(".light-theme-button");
const dropArea = document.querySelector('#drop-area');
let dragCount = 0;
let fileToUpload;

fileInput.addEventListener("change", async function (event) {
    const file = event.target.files[0];
    fileToUpload = file;
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            simulateUpload();
        };
        reader.readAsDataURL(file);
    }
})

function simulateUpload() {
    wrapper.classList.add("uploading");
    setTimeout(() => {
        wrapper.classList.remove("uploading");
        uploadContainer.classList.add("enable-preview");
    }, 2000);
}

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
})

uploadContainer.addEventListener("dragenter", (event) => {
    event.preventDefault();
    dragCount++;
    uploadContainer.classList.add("dragover");
})

uploadContainer.addEventListener("dragover", function (event) {
    event.preventDefault();
})

uploadContainer.addEventListener("dragleave", function (event) {
    event.preventDefault();
    dragCount--;
    if (dragCount == 0) {
        uploadContainer.classList.remove("dragover");
    }
})

uploadContainer.addEventListener("drop", function (event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    fileInput.files = event.dataTransfer.files;
    fileToUpload = file;

    if (!event.dataTransfer.files[0].type.startsWith("image/")) {
        uploadContainer.classList.remove("dragover");
        alert("Arquivo inválido.");
        throw new Error("Invalid file.");
    }

    if (event.dataTransfer.items.length > 1) {
        uploadContainer.classList.remove("dragover");
        alert("Apenas um arquivo é permitido.");
        throw new Error("Multiple files.")
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        simulateUpload();
        imagePreview.src = e.target.result;
    };
    reader.readAsDataURL(file);
    dragCount = 0;
    uploadContainer.classList.remove("dragover");
})

btnDownload.addEventListener("click", function () {
    const url = URL.createObjectURL(fileToUpload);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileToUpload.name;
    link.click();
    URL.revokeObjectURL(url);
})

btnRemoveImage.addEventListener("click", function () {
    uploadContainer.classList.remove("enable-preview");
    imagePreview.src = "";
    fileInput.value = "";
})

function toggleTheme() {
    if (document.body.classList.contains("dark")) {
        document.body.classList.remove("dark");
        return;
    } else (!document.body.classList.contains("dark"))
    document.body.classList.add("dark");
    return;
}

btnDarkTheme.addEventListener("click", toggleTheme);
btnLightTheme.addEventListener("click", toggleTheme);