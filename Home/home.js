const highlights = [
  "Pomodoro",
  "KanBan",
  "Playlist",
  "Calendário",
  "Cadastro"
]

const images = [
  "./assets/Pomodoro.svg",
  "./assets/Kanban.svg",
  "./assets/playlist.svg",
  "./assets/Calendario.svg",
  "./assets/Cadastro.svg"
]

let cur = 0, letter = -1, cur_img = 0;
function typing_effect(){
  const highlight = document.getElementById("highlight")
  const current = highlights[cur] + "       "
  
  letter += 1
  if(letter <= current.length-1)
      highlight.innerHTML = current.substring(0, letter)
  else {
      highlight.innerHTML = ""
      cur += 1
      cur_img += 1
      letter = -1

      if(cur >= highlights.length)
          cur = 0
      
      if(cur_img >= images.length)
          cur_img = 0

    document.getElementById("page-image").src = images[cur_img]
  }

  setTimeout(typing_effect, 250)
}

window.onload = function(){
  typing_effect()
}

document.getElementById("showme-btn").addEventListener("click", () => {
  window.location.href = "/projetos/produtos/index.html"
})

document.getElementById("login-btn").addEventListener("click", () => {
  window.location.href = "/projetos/login/index.html"
})

document.querySelectorAll("footer section").forEach(e => {
  e.addEventListener("click", () => {
      if(!e.classList.contains("current"))
          e.classList.add("current")

      const num = e.id.charAt(1)
      if(num == 1){
          document.getElementById('s2').classList.remove("current")
          document.getElementById('s3').classList.remove("current")
      } else if (num == 2) {
          document.getElementById('s1').classList.remove("current")
          document.getElementById('s3').classList.remove("current")
      } else {
          document.getElementById('s1').classList.remove("current")
          document.getElementById('s2').classList.remove("current")
      }

      step = num - 1
  })
})

for(let i = 0; i < 4; i++){
  document.getElementById("nav-item-" + (i+1)).addEventListener("click", () => {
      nav_functions[i]()
  })
}

const nav_functions = [
  function(){
      window.location.reload()
  },
  function(){
      window.alert("Entre em contato pelo email: lucas.rcaetano1122@gmail.com")
  },
  function(){
      window.location.href = "/projetos/produtos/index.html"
  },
  function(){
      window.location = window.location.origin
  }
]
  

'use strict';

/**
* navbar variables
*/
const menuToggleBtn = document.querySelector("[data-navbar-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

/**
* element toggle function
*/

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }

menuToggleBtn.addEventListener("click", function () { elemToggleFunc(navbar); });




/**
* go to top
*/

const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

if (window.scrollY >= 800) {
  goTopBtn.classList.add("active");
} else {
  goTopBtn.classList.remove("active");
}

});