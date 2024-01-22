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

// Limpia todas las celdas de la tabla
for (let dia of ['lunes', 'martes', 'miercoles', 'jueves', 'viernes']) {
  for (let horario of ['1400', '1500', '1600', '1700', '1800', '1900']) {
    const cell = document.getElementById(`${dia}${horario}`);
    if (cell) {
      cell.innerHTML = '';
      cell.classList.remove('aula1', 'aula2', 'aula3'); // Elimina las clases de aulas anteriores
    }
  }
}

// Llena las celdas con los profesores registrados
profesoresRegistrados.forEach((profesor) => {
  const cell = document.getElementById(`${profesor.dia}${profesor.horario.replace(':', '')}`);
  if (cell) {
    // Verifica si ya hay contenido en la celda
    if (cell.textContent !== '') {
      // Si ya hay contenido, hace un salto de linea y el nuevo profesor
      cell.innerHTML += `<br><div class="profesor ${profesor.aula.toLowerCase()}">${profesor.nombre} ${profesor.apellido}</div>`;
    } else {
      // Si no hay contenido, agrega el primer profesor
      cell.innerHTML += `<div class="profesor ${profesor.aula.toLowerCase()}">${profesor.nombre} ${profesor.apellido}</div>`;
    }
  }

});


//  const listaProfesoresUl = document.getElementById('listaProfesoresUl');


// listaProfesoresUl.innerHTML = '';


// profesoresRegistrados.forEach((profesor) => {

// const li = document.createElement('li');


//  li.textContent = `- Profesor: ${profesor.nombre} ${profesor.apellido} - Aula: ${profesor.aula} - Horario: ${profesor.horario} - Día: ${profesor.dia}`;

// listaProfesoresUl.appendChild(li);
//  });

 
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

// function mostrarMensaje(mensaje) {
//   const mensajeDiv = document.getElementById('mensaje');
//   mensajeDiv.innerHTML = mensaje;

//   mensajeDiv.addEventListener('click', () => {
//     mensajeDiv.textContent = '';
//   });
// }




