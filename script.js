// Selección de elementos DOM
const nombres = document.getElementById("nombres");
const apellidos = document.getElementById("apellidos");
const btnRegistrar = document.getElementById("btnRegistrar");
const listaAsistencia = document.getElementById("listaAsistencia");
const btnEliminarTodo = document.getElementById("btnEliminarTodo");
const btnCambiarFondo = document.getElementById("btnCambiarFondo");

// Cargar lista guardada al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const datosGuardados = JSON.parse(localStorage.getItem("asistencia")) || [];
  datosGuardados.forEach(nombre => agregarAlumno(nombre));
});

// Función para agregar un alumno a la lista
function agregarAlumno(nombre) {
  const nuevoItem = document.createElement("li");
  nuevoItem.textContent = nombre;
  nuevoItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";
  btnEliminar.classList.add("btn", "btn-danger", "btn-sm");
  btnEliminar.addEventListener("click", () => {
    nuevoItem.remove();
    guardarAsistencia();
  });

  nuevoItem.appendChild(btnEliminar);
  listaAsistencia.appendChild(nuevoItem);
  guardarAsistencia();
}

// Función para guardar en localStorage
function guardarAsistencia() {
  const items = listaAsistencia.querySelectorAll("li");
  const nombres = Array.from(items).map(item => item.childNodes[0].nodeValue.trim());
  localStorage.setItem("asistencia", JSON.stringify(nombres));
}

// Registrar nuevo alumno
btnRegistrar.addEventListener("click", () => {
  const nombre = inputNombre.value.trim();
  if (nombre === "") {
    alert("Por favor, escribe el nombre del alumno.");
    return;
  }
  agregarAlumno(nombre);
  inputNombre.value = "";
});

// Eliminar toda la lista
btnEliminarTodo.addEventListener("click", () => {
  if (confirm("¿Estás seguro de eliminar toda la lista?")) {
    listaAsistencia.innerHTML = "";
    localStorage.removeItem("asistencia");
  }
});

// Cambiar color de fondo aleatoriamente
btnCambiarFondo.addEventListener("click", () => {
  const colores = ["#f8f9fa", "#e3f2fd", "#fff3cd", "#d4edda", "#fce4ec"];
  const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
  document.body.style.backgroundColor = colorAleatorio;
});
