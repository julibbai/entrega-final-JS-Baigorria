document.addEventListener("DOMContentLoaded", function () {
  cargarProfesores();
}
);

function registrarProfesor() {


  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const aula = document.getElementById('aula').value;
  const horario = document.getElementById('horario').value;



  const profesor = { nombre, apellido, aula, horario };


  const profesoresRegistrados = obtenerProfesores();


  const horarioOcupado = profesoresRegistrados.some(
    (p) => p.aula === aula && p.horario === horario
  );


  if (horarioOcupado) {
    mostrarMensaje('El horario y aula seleccionados ya están ocupados.');
  } else {


    profesoresRegistrados.push(profesor);


    guardarProfesores(profesoresRegistrados);


    mostrarMensaje('Profesor registrado correctamente.');


    limpiarFormulario();
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


  li.textContent = `- Profesor: ${profesor.nombre} ${profesor.apellido} - Aula: ${profesor.aula}, Horario: ${profesor.horario}`;

  listaProfesoresUl.appendChild(li);
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
