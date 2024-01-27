import Swal from 'sweetalert2'


function mostrarInformacion(nombre, apellido, aula, horario, dia) {
  console.log("Esto sirve??");

  Swal.fire({
    title: "¿Qué necesitas realizar?",
    confirmButtonText:"Modificar",
    confirmButtonColor:"lightpurple",
    showCancelButton:true,
    cancelButtonText: "Eliminar",
    cancelButtonColor:"red",
    icon:"question"

  })
}

document.addEventListener("DOMContentLoaded", function () {
  cargarProfesores();
  limpiarFormulario();
});


const botonRegistrar = document.querySelector("#botonRegistrar");
const nombre = document.getElementById('nombre').value;
const apellido = document.getElementById('apellido').value;

botonRegistrar.onclick = () => {
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  if (nombre && apellido){

      Swal.fire({
          title: "¿Está seguro de los datos ingresados?",
          confirmButtonText:"Sí",
          confirmButtonColor:"green",
          showCancelButton:true,
          cancelButtonText: "No",
          cancelButtonColor:"red",
          icon:"question"

      }).then((respuesta) => { 
          if(respuesta.isConfirmed){
            registrarProfesor();
          }
          else {};
        } 
      )
      
  } else {
      Swal.fire({
          title:"Datos Incompletos",
          text: "Falta información requerida",
          icon:"warning",
          time:3000,
          timerProgressBar:true,
      })
  }
}


////////////

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
    Swal.fire({
      title:"Lo sentimos",
      text: 'El horario, aula y día seleccionados ya están ocupados.',
      icon:"error",
      timer:3000,
      timerProgressBar:true

    })
    
  } else {
    profesoresRegistrados.push(profesor);
    guardarProfesores(profesoresRegistrados);
    limpiarFormulario();
    Swal.fire({
      title: 'Profesor registrado correctamente.',
      icon:"success",
      timer:3000,
      timerProgressBar:true
    })
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
    const button = document.createElement('button');
    button.classList.add('profesor-btn', profesor.aula.toLowerCase());
    button.textContent = `${profesor.nombre} ${profesor.apellido}`;
    button.onclick = () => mostrarInformacion(profesor.nombre, profesor.apellido, profesor.aula, profesor.horario, profesor.dia);
    cell.appendChild(button);
    
  }

});
}




function limpiarFormulario() {


const formulario =document.getElementById('formularioProfesor');
const inputNombre = document.getElementById('nombre');
const inputApellido = document.getElementById('apellido');
const inputAula = document.getElementById('aula');
const inputHorario = document.getElementById('horario');
const inputDia = document.getElementById('dia');


  inputNombre.value = '';
  inputApellido.value = '';
  inputAula.value = 'aula1';
  inputHorario.value = '14:00';
  inputDia.value = 'lunes';
}





