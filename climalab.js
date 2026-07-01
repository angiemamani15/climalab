document.addEventListener('DOMContentLoaded', function () {

  // ACCORDION
  var botones = document.querySelectorAll('.accordion-button');

  console.log('Botones encontrados:', botones.length); // tiene que mostrar 7

  botones.forEach(function (boton) {
    boton.addEventListener('click', function () {

      var target = boton.getAttribute('data-bs-target');
      var panel = document.querySelector(target);
      var estaAbierto = panel.classList.contains('show');

      // Cerrar todos
      document.querySelectorAll('.accordion-collapse').forEach(function (c) {
        c.classList.remove('show');
      });
      document.querySelectorAll('.accordion-button').forEach(function (b) {
        b.classList.add('collapsed');
      });

      // Si estaba cerrado, abrirlo
      if (!estaAbierto) {
        panel.classList.add('show');
        boton.classList.remove('collapsed');
      }

    });
  });

  // NAVBAR SCROLL
  window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });

});
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){
        navbar.classList.add("scrolled");
    }else{
        navbar.classList.remove("scrolled");
    }

});
const cards = document.querySelectorAll(".timeline-card");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.3
});

cards.forEach(card=>{
    observer.observe(card);
});