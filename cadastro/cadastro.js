const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
 
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});
 
loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

function myFunction() {
    var element = document.getElementsByTagName('body')[0];
    element.classList.toggle("dark-theme");
    if (element.classList.contains("dark-theme")) {
        // Se estiver no modo escuro, define a cor de fundo do body como #333
        element.style.backgroundColor = "#333";
    } else {
        // Se não estiver no modo escuro, remove a cor de fundo personalizada
        element.style.backgroundColor = "";
    }
}

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-theme');
});
