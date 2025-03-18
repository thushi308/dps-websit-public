/*let header_background = "";
let overlay_background = "";*/

/*let header_background = VANTA.WAVES({
    el: "#header",
    mouseControls: false,
    touchControls: false,
    gyroControls: false,
    minHeight: 100.00,
    minWidth: 50.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x012f5c,
    shininess: 20.00,
    waveHeight: 25.00,
    waveSpeed: 0.5,
    zoom: 0.65
});

let overlay_background = VANTA.NET({
    el: "#overlay",
    mouseControls: false,
    touchControls: false,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 50.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0xf3f3f3,
    backgroundColor: 0x004080bf,
    points: 15.00,
    maxDistance: 20.00,
    spacing: 10.00,
    showDots: false
});*/

document.addEventListener("DOMContentLoaded", () => {
    //changeGallery();
});

function changeGallery () {
    let year = document.querySelector("#gallery select").value;
    let gallery_item = document.getElementsByClassName("gallery-item");
    for (let i = 0; i < gallery_item.length; i++) {
        if (gallery_item[i].classList.contains("_" + String(year))) {
            gallery_item[i].style.display = "flex";
        } else {
            gallery_item[i].style.display = "none";
        }
    }
    header_background.resize();
    overlay_background.resize();
}

function addGalleryItem (image, year) {
    let gallery_container = document.getElementsByClassName("gallery-container")[0];
    let gallery_item = document.createElement("img");
    gallery_item.classList.add("gallery-item");
    gallery_item.classList.add("_" + String(year));
    gallery_item.src = image;
    gallery_item.alt = image;
    gallery_container.appendChild(gallery_item);
}

const galleryFilePathArray = ["assets/gallery2023.txt", "assets/gallery2024.txt", "assets/gallery2025.txt"]; // Replace with the actual path to your .txt file
for (let i = 0; i < galleryFilePathArray.length; i++) {
    fetchGalleryItems(galleryFilePathArray[i]);
}

function fetchGalleryItems (galleryFilePath) {
// Fetch the .txt file and display its content
fetch(galleryFilePath, { mode: 'cors', method: 'GET' }) // Fetch the file from the given path
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
        const result = [];

        newline_array.forEach((item) => {
            const parts = item.split(",").map((part) => part.trim()); // Split the string by commas and remove extra spaces
            const obj = {
                image: parts[0],
                year: parts[1],
            };
            result.push(obj);
        });
        //console.log(result);
        for (let i = 0; i < result.length; i++) {
            addGalleryItem(result[i].image, result[i].year);
        }
        changeGallery();
        header_background.resize();
        overlay_background.resize();
    })
}