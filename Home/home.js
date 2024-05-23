const highlights = [
    "E-Commerce",
    "Portfolio",
    "Cadastro",
    "Dashboard",
    "Blog"
]

const images = [
    "./assets/Internet.svg",
    "./assets/Login.svg",
    "./assets/Dashboard.svg",
    "./assets/Portfolio.svg",
    "./assets/Bloging.svg"
]

const steps_ref = document.getElementsByClassName("step");

let step = 0;
function update_step(){
    if(!steps_ref[step].classList.contains("current"))
        steps_ref[step].classList.add("current")

    for(let i = 0; i < steps_ref.length; i++){
        if(step != i){
            if(steps_ref[i].classList.contains("current"))
                steps_ref[i].classList.remove("current")
        }
    }



    setTimeout(update_step, 2500)
    
    if(step + 1 <= 2)
        step += 1
    else   
        step = 0
}

let cur = 0, letter = -1;
function typing_effect(){
    const highlight = document.getElementById("highlight")
    const current = highlights[cur] + "       "
    
    letter += 1
    if(letter <= current.length-1)
        highlight.innerHTML = current.substring(0, letter)
    else {
        highlight.innerHTML = ""
        cur += 1
        letter = -1

        if(cur >= highlights.length)
            cur = 0
	
	document.getElementById("page-image").src = images[cur]
    }

    setTimeout(typing_effect, 250)
}

window.onload = function(){
    update_step()
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
    