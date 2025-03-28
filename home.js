let initialSlideNumber = 1;

function initialize () {

    let resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
            resize_slider_container();
        });
    });

    var swiper = new Swiper(".swiper", {
        autoplay: {
            delay: 3000,
        },
        loop: false,
        rewind: true,
        grabCursor: true,
        spaceBetween: 0,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            duration: 300,
            dynamicBullets: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        updateOnWindowResize: true,
        initialSlide: initialSlideNumber,
        effect: "coverflow",
        coverflowEffect: {
            rotate: 0,
            stretch: 450,
            depth: 200,
            modifier: 2,
            slideShadows: false,
        },
        breakpoints: {
            0: {
                coverflowEffect: {
                    modifier: 0,
                },
            },
            768: {
                coverflowEffect: {
                    modifier: 1,
                },
            },
            1024: {
                coverflowEffect: {
                    modifier: 2,
                    stretch: 320,
                },
            },
            1200: {
                coverflowEffect: {
                    modifier: 2,
                    stretch: 380,
                },
            },
            1450: {
                coverflowEffect: {
                    modifier: 2,
                    stretch: 450,
                },
            }
        },
    });

    let slider = document.getElementById("slider");
    resize_slider_container();
    resizeObserver.observe(slider);

    header_background.resize();
    overlay_background.resize();
}

function resize_slider_container() {
    let home = document.querySelector("#home");
    let slider_section_style = window.getComputedStyle(document.querySelector("#slider"));
    let width = home.clientWidth - (2 * parseInt(slider_section_style.paddingLeft));
    let root = document.querySelector(":root");
    let root_vars = getComputedStyle(root);
    let slide_padding_percent = parseInt(root_vars.getPropertyValue("--slide-padding-percent"));
    root.style.setProperty("--slider-nav-button-size-percent", `${width * (slide_padding_percent / 80)}px`);
}

const speakerFilePath = "assets/swiper.txt";

fetch(speakerFilePath, { mode: 'cors', method: 'GET' })
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
            };
            result.push(obj);
        });
        initialSlideNumber = Math.trunc(result.length / 2)
        for (let i = 0; i < result.length; i++) {
            addSwiperItem(result[i].image, i + 1);
        }
        initialize();
        header_background.resize();
        overlay_background.resize();
    })

async function addSwiperItem(image, alt) {
    let swiper_wrapper = document.getElementsByClassName("swiper-wrapper")[0];
    let swiper_slide = document.createElement("div");
    swiper_slide.classList.add("swiper-slide");
    let swiper_img = document.createElement("img");
    swiper_img.src = image;
    swiper_img.alt = alt;
    swiper_slide.appendChild(swiper_img);
    swiper_wrapper.appendChild(swiper_slide);  
}