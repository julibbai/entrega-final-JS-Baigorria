import Swal from 'sweetalert2';
import profesoresApi from "./src/api/profesores.api.js";



let profesoresRegistrados;

function mostrarInformacion(id, nombre, apellido, aula, horario, dia) {

  Swal.fire({
    title: "¿Desea eliminar?",
    confirmButtonText:"Cancelar",
    confirmButtonColor:"green",
    showCancelButton:true,
    cancelButtonText: "Sí",
    cancelButtonColor:"red",
    icon:"question"

  }).then((respuesta) =>{
    if(!respuesta.isConfirmed){
      eliminarProfesor(id);

    } 
  })
};

document.addEventListener("DOMContentLoaded", async function () {
  profesoresRegistrados = await profesoresApi.obtenerProfes();
  cargarProfesores();
  limpiarFormulario();
});


const botonRegistrar = document.querySelector("#botonRegistrar");

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
        });
        } else {
      Swal.fire({
          title:"Datos Incompletos",
          text: "Falta información requerida",
          icon:"warning",
          timer:3000,
          timerProgressBar:true,
      });
  }
};


async function eliminarProfesor(id) {


  const index = profesoresRegistrados.findIndex(profesor => profesor.id === id);
  if (index !== -1) {
    profesoresRegistrados.splice(index, 1); 


    await profesoresApi.eliminarProfePorId(id);

    cargarProfesores(); 

      Swal.fire({
          title:"Profesor eliminado",
          text: "El profesor ha sido eliminado exitosamente. El aula, horario y día ahora están disponibles",
          icon:"success",
          timer:3000,
          timerProgressBar:true,
      });
}
}


async function registrarProfesor()  {
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const aula = document.getElementById('aula').value;
  const horario = document.getElementById('horario').value;
  const dia = document.getElementById('dia').value;

  const profesor = { nombre, apellido, aula, horario, dia };


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

    });
    
  } else {
    profesoresRegistrados.push(profesor);
    await profesoresApi.registrarProfe(profesor);
    limpiarFormulario();
    Swal.fire({
      title: 'Profesor registrado correctamente.',
      icon:"success",
      timer:3000,
      timerProgressBar:true
    })
    cargarProfesores();
  }
}


async function cargarProfesores() {
profesoresRegistrados = await profesoresApi.obtenerProfes();
for (let dia of ['lunes', 'martes', 'miercoles', 'jueves', 'viernes']) {
  for (let horario of ['1400', '1500', '1600', '1700', '1800', '1900']) {
    const cell = document.getElementById(`${dia}${horario}`);
    if (cell) {
      cell.innerHTML = '';
      
      cell.classList.remove('aula1', 'aula2', 'aula3'); 
    }
  }
}


profesoresRegistrados.forEach((profesor) => {
  const cell = document.getElementById(`${profesor.dia}${profesor.horario.replace(':', '')}`);
  if (cell) {
    const button = document.createElement('button');
    button.classList.add('profesor-btn', profesor.aula.toLowerCase());
    button.textContent = `${profesor.nombre} ${profesor.apellido}`;
    button.onclick = () => mostrarInformacion(profesor.id, profesor.nombre, profesor.apellido, profesor.aula, profesor.horario, profesor.dia);
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





