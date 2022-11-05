import React from "react";
import ListaTarea from "./ListaTarea";
import { Button, Form } from "react-bootstrap";
import {useState, useEffect} from "react";
import { consultarAPI } from "./helpers/queries";
 
const FormularioTarea = () => {

    const [tareas, setTareas]=useState([])

    //busco los datos del local storage
    const tareasLocalStorage = JSON.parse(localStorage.getItem('arregloTareaKey')) || [];
    //aqui va la mayoria de la logica
    const [tarea, setTarea] = useState('');
    const [arregloTarea, setArregloTarea] = useState(tareasLocalStorage);
    
    //ciclo de vide del componente
    useEffect  (()=>{
         
      consultarAPI().then((respuesta)=>{
      console.log(respuesta)
      setTareas(respuesta)
      })
                   
        
      },[])
    
    

    const handleSubmit = (e) => {
        e.preventDefault();
        //arregloTarea.push no podemos usar el push con el state
        setArregloTarea([...arregloTarea, tarea]);
        //limpiar el input
        setTarea('');
    }

    const borrarTarea = (nombre)=>{
      let arregloModificado = arregloTarea.filter((item)=>(item != nombre));
      //actualizo el state
      setArregloTarea(arregloModificado)


    }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 d-flex" controlId="formBasicEmail">
          <Form.Control type="text" placeholder="Ingrese una tarea" onChange={(e)=>setTarea(e.target.value)}
          value={tarea }/>
          <Button variant="primary" type="submit">
            Enviar tarea
          </Button>
        </Form.Group>
      </Form>

    
      <ListaTarea arregloTarea={arregloTarea} borrarTarea={borrarTarea}></ListaTarea>
    </div>
  );
};

export default FormularioTarea;