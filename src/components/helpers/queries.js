const URL = 'http://localhost:3004/tareas'

export const consultarAPI = async() =>{
    try{

        const respuesta = await fetch (URL);
        const listaTareas = await respuesta.json();
        // console.log(listaTareas)
        return listaTareas
    }catch(error){
        console.log(error)
    }
}
