document.addEventListener("DOMContentLoaded", () => {
    //vantaBackground();

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
        initialSlide: 4,
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

    function resize_slider_container() {
        let slider_container = document.getElementsByClassName("slider-container")[0];
        //let slider_container_style = window.getComputedStyle(slider_container);
        let home = document.querySelector("#home");
        //let home_style = window.getComputedStyle(home);////////////////////////////////////////////////////
        let slider_section_style = window.getComputedStyle(document.querySelector("#slider"));
        let width = home.clientWidth - (2 * parseInt(slider_section_style.paddingLeft));
        //let width = home.clientWidth - (2 * parseInt(slider_container_style.marginLeft));
        //console.log(width - (2 * parseInt(home_style.marginLeft)) - (2 * parseInt(slider_section_style.paddingLeft)));
        //slider_container.style.width = `${width}px`;////////////////////////////////////////////////////////
        let root = document.querySelector(":root");
        let root_vars = getComputedStyle(root);
        //let slide_padding_max = parseInt(root_vars.getPropertyValue("--slide-padding-max"));
        let slide_padding_percent = parseInt(root_vars.getPropertyValue("--slide-padding-percent"));
        //let init_size = parseInt(root_vars.getPropertyValue("--slider-nav-button-size-max"));
        //let size = (init_size * (width * (slide_padding_percent / 100))) / slide_padding_max;
        //console.log(width * (slide_padding_percent / 100));
        root.style.setProperty("--slider-nav-button-size-percent", `${width * (slide_padding_percent / 80)}px`);
    }

    let slider = document.getElementById("slider");
    resize_slider_container();
    resizeObserver.observe(slider);

    //vantaBackground();
    header_background.resize();
    overlay_background.resize();
});
