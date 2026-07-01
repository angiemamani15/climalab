const navbar = document.querySelector(".navbar-scroll");

window.addEventListener("scroll", () => {

    if(window.scrollY > 200){

        navbar.classList.add("show");

    }else{

        navbar.classList.remove("show");

    }

});