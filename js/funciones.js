const btnTema = document.getElementById("btnTema");

btnTema.addEventListener("click", () => {
    let body = document.body;

    body.classList.toggle("modo-oscuro");
});

function cargarPagina() {
    let body = document.body;

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.toggle("modo-oscuro");
    }
}
document.addEventListener("DOMContentLoaded", cargarPagina())