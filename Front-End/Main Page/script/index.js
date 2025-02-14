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
});


