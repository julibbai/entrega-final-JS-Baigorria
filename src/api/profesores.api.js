// Obtener los profes - método GET

const obtenerProfes = async () => {
    try {
        const resp = await fetch("http://localhost:3000/profesores");
        const data = await resp.json();
        console.log(data);
        return data || [];
    } catch (error) {
        console.error("Error al obtener profesores:", error);
        return [];
    }
}


const registrarProfe = async (profe) => {
    const resp = await fetch("http://localhost:3000/profesores",{
        method: "POST",
        body: JSON.stringify(profe),
        headers: {
            "Content-type": "application/json; charset-UTF-8",
        }
    });
    const data = await resp.json();
    console.log(data);
    return data;
}


// //Obtener profes por id - Método GET

// const obtenerProfePorId = async (id) => {
//     const resp = await fetch(`http://localhost:3000/profesores/${id}`);
//     const data = await resp.json();
//     console.log(data);
//     return data;
// }


// //Agregar profes - Método POST

// const registrarProfe = async (profe) => {
//     const resp = await fetch("http://localhost:3000/profesores",{
//         method: "POST",
//         body: JSON.stringify(profesor),
//         headers: {
//             "Content-type": "application/json; charset-UTF-8",
//         }
//     });
//     const data = await resp.json();
//     console.log(data);
//     return data;
// }


// //Actualizar un profe - Método PUT

// const actualizarProfe = async (id, profe) => {
//     const resp = await fetch("http://localhost:3000/profesores",{
//         method: "PUT",
//         body: JSON.stringify(profesor),
//         headers: {
//             "Content-type": "application/json; charset-UTF-8",
//         }
//     });
//     const data = await resp.json();
//     console.log(data);
//     return data;
// }


// //Eliminar un profe - Método DELETE

const eliminarProfePorId = async (id) => {
    const resp = await fetch(`http://localhost:3000/profesores/${id}`,{
    method: "DELETE",
    headers: {
            "Content-type": "application/json; charset-UTF-8",
        }  
    });
    const data = await resp.json();
    console.log(data);
    return data;
}

export default {
    obtenerProfes,
    registrarProfe,
    eliminarProfePorId

}