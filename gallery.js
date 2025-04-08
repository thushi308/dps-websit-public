document.addEventListener("DOMContentLoaded", async () => {
    await changeGallery();
    displayPagination();
});

const galleryFilePathArray = {
    2025: "assets/gallery2025.txt",
    2024: "assets/gallery2024.txt",
    2023: "assets/gallery2023.txt"
};
let photos = [];
let yearwise = {
    2025: [],
    2024: [],
    2023: []
};

let currentPage = 1;
let photosPerPage = 10;

function displayPagination() {
    const paginations = document.getElementsByClassName("pagination");
    for (let j = 0; j < paginations.length; j++) {
        paginations[j].innerHTML = ""; // Clear previous buttons

        const pageCount = Math.ceil(photos.length / photosPerPage);

        for (let i = 1; i <= pageCount; i++) {
            const button = document.createElement("button");
            button.textContent = i;
            if (i === currentPage) {
                button.classList.add("active-button");
            } else {
                button.classList.remove("active-button");
            }
            button.addEventListener("click", () => {
                currentPage = i;
                changePage(currentPage);
            });
            paginations[j].appendChild(button);
        }
    }
}

async function changeGallery() {
    let year = await document.querySelector("#gallery select").value;
    if (yearwise[year].length == 0) {
        yearwise[year] = await fetchGalleryItems(galleryFilePathArray[year]);
    }
    photos = await yearwise[year];
    currentPage = 1;
    displayPagination();
    changePage(currentPage);
}

function changePage(currentPage) {
    let currentPhotos = [];
    if (currentPage * photosPerPage > photos.length) {
        currentPhotos = photos.slice((currentPage - 1) * photosPerPage, photos.length);
    } else {
        currentPhotos = photos.slice((currentPage - 1) * photosPerPage, currentPage * photosPerPage);
    }
    document.getElementsByClassName("gallery-container")[0].innerHTML = "";
    for (let i = 0; i < currentPhotos.length; i++) {
        addGalleryItem(currentPhotos[i].image, currentPhotos[i].year);
    }
    const paginations = document.querySelectorAll(".pagination");
    const buttons = [paginations[0].querySelectorAll("button"), paginations[1].querySelectorAll("button")];
    for (let i = 0; i < buttons.length; i++) {
        for (let j = 0; j < buttons[i].length; j++) {
            buttons[i][j].classList.remove("active-button");
        }
    }
    buttons[0][currentPage - 1].classList.add("active-button");
    buttons[1][currentPage - 1].classList.add("active-button");
}

function nextPage() {
    currentPage++;
    changePage(currentPage);
}

function previousPage() {
    currentPage--;
    changePage(currentPage);
}

async function fetchGalleryItems(galleryFilePath) {
    let result = [];
    // Fetch the .txt file and display its content
    await fetch(galleryFilePath, { mode: 'cors', method: 'GET' }) // Fetch the file from the given path
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error fetching file: ${response.statusText}`);
            }
            return response.text(); // Convert response to text
        })
        .then((text) => {
            // Check if the file is empty and won't upimg if file is empty
            if (!text.trim()) {
                console.log("The control.txt file is empty. No cards will be created.");
                return; // Exit if the file is empty
            }
            const newline_array = text.split("\n").map((item) => item.trim()); // Split the text by new line and remove extra spaces

            newline_array.forEach((item) => {
                const parts = item.split(",").map((part) => part.trim()); // Split the string by commas and remove extra spaces
                const obj = {
                    image: parts[0],
                    year: parts[1],
                };
                result.push(obj);
            });
            header_background.resize();
            overlay_background.resize();
        })
    return result;
}

function addGalleryItem(image, year) {
    let gallery_container = document.getElementsByClassName("gallery-container")[0];
    let gallery_item = document.createElement("img");
    gallery_item.classList.add("gallery-item");
    gallery_item.classList.add("_" + String(year));
    gallery_item.src = image;
    gallery_item.alt = image;
    gallery_container.appendChild(gallery_item);
    gallery_item.onload = () => {
        header_background.resize();
        overlay_background.resize();
    }
}