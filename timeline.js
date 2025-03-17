function addCard (className, time, title, content) {
    let timeline_container = document.getElementsByClassName("timeline-container")[0];
    let timeline_item = document.createElement("div");
    timeline_item.classList.add("timeline-item");
    timeline_item.classList.add(className);
    let timeline_date = document.createElement("div");
    timeline_date.classList.add("timeline-date");
    timeline_date.innerHTML = time;
    let timeline_content = document.createElement("div");
    timeline_content.classList.add("timeline-content");
    let timeline_content_title = document.createElement("h3");
    timeline_content_title.innerHTML = title;
    timeline_content.appendChild(timeline_content_title);
    if (content != "") {
        let timeline_content_content = document.createElement("p");
        timeline_content_content.innerHTML = content;
        timeline_content.appendChild(timeline_content_content);
    }
    timeline_item.appendChild(timeline_date);
    timeline_item.appendChild(timeline_content);
    timeline_container.appendChild(timeline_item);
}

const timelineFilePath = "assets/timeline.txt"; // Replace with the actual path to your .txt file

// Fetch the .txt file and display its content
fetch(timelineFilePath, { mode: 'cors', method: 'GET' }) // Fetch the file from the given path
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Error fetching file: ${response.statusText}`);
        }
        return response.text(); // Convert response to text
    })
    .then((text) => {
        // Check if the file is empty and won't update if file is empty
        if (!text.trim()) {
            console.log("The control.txt file is empty. No cards will be created.");
            return; // Exit if the file is empty
        }
        const newline_array = text.split("\n").map((item) => item.trim()); // Split the text by new line and remove extra spaces
        const result = [];

        newline_array.forEach((item) => {
            const parts = item.split(",").map((part) => part.trim()); // Split the string by commas and remove extra spaces
            const obj = {
                class: parts[0],
                time: parts[1],
                title: parts[2],
                content: parts[3],
            };
            result.push(obj);
        });
        //console.log(result);
        for (let i = 0; i < result.length; i++) {
            addCard(result[i].class, result[i].time, result[i].title, result[i].content);
        }
        //vantaBackground();
        header_background.resize();
        overlay_background.resize();
    })