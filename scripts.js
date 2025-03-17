/*const sections = document.querySelectorAll(".section");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        } else {
            entry.target.classList.remove("visible");
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});*/

const menu_button = document.getElementsByClassName('menu-button')[0];
const menu_screen = document.getElementsByTagName('nav')[0];
const menu_bar = document.getElementsByClassName('menu-bar')[0];
const root = document.querySelector(":root");

menu_button.addEventListener("click", () => {
    root.style.setProperty("--menu-transition", `all 1s`);
	menu_button.classList.toggle('menu-active');
    root.style.setProperty("--menu-style-top", `${menu_bar.offsetTop + parseInt(window.getComputedStyle(menu_bar).height)}px`);
	menu_screen.classList.toggle('menu-onscreen');
});

window.onscroll = function () {
    if (menu_screen.classList.contains("menu-onscreen")) {
        root.style.setProperty("--menu-transition", `all 0s`);
        root.style.setProperty("--menu-style-top", `${menu_bar.offsetTop + parseInt(window.getComputedStyle(menu_bar).height)}px`);
    }
}

//function vantaBackground() {
    const header_background = VANTA.WAVES({
        el: "#header",
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 70.00,
        minWidth: 50.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x012f5c,
        shininess: 20.00,
        waveHeight: 25.00,
        waveSpeed: 0.5,
        zoom: 0.65
    });

    const overlay_background = VANTA.NET({
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
    });
    //console.log("vanta");
//}