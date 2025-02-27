document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const sidebar = document.getElementById('sidebar');
    const menuButton = document.getElementById('menuButton');
    const closeButton = document.getElementById('closeButton');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    menuButton.addEventListener('click', function() {sidebar.classList.add('open');});
    closeButton.addEventListener('click', function() {sidebar.classList.remove('open');});
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(navLink) {
        navLink.addEventListener('click', function() {
            sidebar.classList.remove('open');
        });
    });
});

const toTopButton = document.querySelector(".totop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
        toTopButton.classList.add("show");
    } else {
        toTopButton.classList.remove("show");
    }
});

toTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

const classNames = ["about-head", "text", "cards", "card"]; 

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
}

function fadeElements() {
    classNames.forEach(className => {
        const elements = document.querySelectorAll(`.${className}`);
        elements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add("fade");
            }
        });
    });
}
window.addEventListener("scroll", fadeElements);
window.addEventListener("load", fadeElements);



