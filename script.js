document.addEventListener("DOMContentLoaded", function () {
  cargarProfesores();
}
);

function registrarProfesor() {
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const aula = document.getElementById('aula').value;
  const horario = document.getElementById('horario').value;
  const dia = document.getElementById('dia').value;

  const profesor = { nombre, apellido, aula, horario, dia };
  const profesoresRegistrados = obtenerProfesores();

  const horarioOcupado = profesoresRegistrados.some(
    (p) => p.aula === aula && p.horario === horario && p.dia === dia
  );

  if (horarioOcupado) {
    mostrarMensaje('El horario, aula y día seleccionados ya están ocupados.');
  } else {
    profesoresRegistrados.push(profesor);
    guardarProfesores(profesoresRegistrados);
    limpiarFormulario();
    mostrarMensaje('Profesor registrado correctamente.');
    cargarProfesores(); // Llama a cargarProfesores después de guardar y limpiar
  }
}

function obtenerProfesores() {
  
  const profesoresJson = localStorage.getItem('profesores');

  return profesoresJson ? JSON.parse(profesoresJson) : [];
}

function guardarProfesores(profesores) {

  const profesoresJson = JSON.stringify(profesores);

  localStorage.setItem('profesores', profesoresJson);
  cargarProfesores();

}

function cargarProfesores() {

 const profesoresRegistrados = obtenerProfesores();


 const listaProfesoresUl = document.getElementById('listaProfesoresUl');


listaProfesoresUl.innerHTML = '';


profesoresRegistrados.forEach((profesor) => {

const li = document.createElement('li');


 li.textContent = `- Profesor: ${profesor.nombre} ${profesor.apellido} - Aula: ${profesor.aula} - Horario: ${profesor.horario} - Día: ${profesor.dia}`;

listaProfesoresUl.appendChild(li);
 });

 // parte de la tabla 

 for (let aula = 1; aula <= 2; aula++) {
 for (let dia of ['lunes', 'martes', 'miercoles', 'jueves', 'viernes']) {
    const celda = document.getElementById(`aula${aula}-${dia}`);
    celda.textContent = '';
 }
 }

 // Llena las celdas de la tabla con los profesores registrados
 profesoresRegistrados.forEach((profesor) => {
   const { aula, dia } = profesor;
   const celda = document.getElementById(`aula${aula}-${dia}`);
  celda.textContent = `${profesor.nombre} ${profesor.apellido} ${profesor.horario}`;
 });

 }

function limpiarFormulario() {


const formulario =document.getElementById('formularioProfesor');
const inputNombre = document.getElementById('nombre');
const inputApellido = document.getElementById('apellido');
const inputAula = document.getElementById('aula');
const inputHorario = document.getElementById('horario');

  inputNombre.value = '';
  inputApellido.value = '';
  inputAula.value = 'aula1';
  inputHorario.value = '14:00';
}

function mostrarMensaje(mensaje) {
  const mensajeDiv = document.getElementById('mensaje');
  mensajeDiv.innerHTML = mensaje;

  mensajeDiv.addEventListener('click', () => {
    mensajeDiv.textContent = '';
  });
}

// function cargarProfesores() {
//   const profesoresRegistrados = obtenerProfesores();

//   // Limpia todas las celdas de la tabla
// for (let aula = 1; aula <= 2; aula++) {
//   for (let dia of ['lunes', 'martes', 'miercoles', 'jueves', 'viernes']) {
//     const celda = document.getElementById(`aula${aula}-${dia}`);
//     celda.textContent = '';
//   }
// }

// // Llena las celdas de la tabla con los profesores registrados
// profesoresRegistrados.forEach((profesor) => {
//   const { aula, dia } = profesor;
//   const celda = document.getElementById(`aula${aula}-${dia}`);
//   celda.textContent = `${profesor.nombre} ${profesor.apellido}`;
// });
// }
