function addSpeakerItem (image, title, url, content) {
    let speaker_list = document.getElementsByClassName("speaker-list")[0];
    let speaker_item = document.createElement("div");
    speaker_item.classList.add("speaker-item");
    let urlforImg = document.createElement("a");
    urlforImg.setAttribute("href", url);
    urlforImg.setAttribute("target", "_blank");
    let urlforTitle = document.createElement("a");
    urlforTitle.setAttribute("href", url);
    urlforTitle.setAttribute("target", "_blank");
    let speaker_img = document.createElement("img");
    speaker_img.classList.add("speaker-image");
    speaker_img.src = image;
    speaker_img.alt = image;
    let speaker_title = document.createElement("p");
    speaker_title.innerHTML = title;
    let speaker_content = document.createElement("p");
    speaker_content.innerHTML = content;
    urlforImg.appendChild(speaker_img);
    urlforTitle.appendChild(speaker_title);
    speaker_item.appendChild(urlforImg);
    speaker_item.appendChild(urlforTitle);
    speaker_item.appendChild(speaker_content);
    speaker_list.appendChild(speaker_item);
}

const speakerFilePath = "assets/speaker.txt"; // Replace with the actual path to your .txt file

// Fetch the .txt file and display its content
fetch(speakerFilePath, { mode: 'cors', method: 'GET' }) // Fetch the file from the given path
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
                title: parts[2],
                url: parts[1],
                content: parts[3],
            };
            result.push(obj);
        });
        //console.log(result);
        for (let i = 0; i < result.length; i++) {
            addSpeakerItem(result[i].image, result[i].title, result[i].url, result[i].content);
        }
        //vantaBackground();
        header_background.resize();
        overlay_background.resize();
    })