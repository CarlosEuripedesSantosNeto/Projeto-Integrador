/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
   const toggle = document.getElementById(toggleId),
         nav = document.getElementById(navId)

   toggle.addEventListener('click', () =>{
       // Add icon-menu class to nav menu
       nav.classList.toggle('menu-responsivo')

       // Add icon-responsivo to show and hide the menu icon
       toggle.classList.toggle('icon-responsivo')
   })
}

showMenu('nav-icons','nav-menu')