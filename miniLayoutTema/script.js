const btnThreme = document.getElementById('themeBtn');
const savedTheme = localStorage.getItem('theme');

if(savedTheme) {
    document.body.classList.add(savedTheme);
    if(savedTheme === 'dark-mode') {
        btnThreme.innerHTML = '<i class="fas fa-sun"></i>';
    }
}
btnThreme.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
        if(document.body.classList.contains('dark-mode')) {
            btnThreme.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark-mode');
        } else {
            btnThreme.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light-mode');
        }
});