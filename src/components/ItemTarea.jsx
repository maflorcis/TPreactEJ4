import { ListGroup, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { borrarTareaAPI, consultarAPI } from "./helpers/queries";

const ItemTarea = ({tarea, setTarea}) => {

  const borrarTarea = () => {
    Swal.fire({
      title: "¿Estás seguro de quitar la tarea?",
      text: "No podés volver atrás!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        borrarTareaAPI(tarea.id).then((respuesta) => {
          if (respuesta.status === 200) {
            consultarAPI().then((respuesta) => {
              setTarea(respuesta);
            });

            Swal.fire(
              "Tarea borrada!",
              "Tu tarea fue removida de la lista",
              "success"
            );
          } else {
            Swal.fire(
              "Ups algo pasó!",
              "Probá nuevamente luego.",
              "error"
            );
          }
        });
      }
    });
  };
  return (
    <ListGroup.Item className="d-flex justify-content-between">
      {tarea.nombreTarea}
      <Button variant="danger" onClick={borrarTarea}>Borrar</Button>
    </ListGroup.Item>
  );
};

export default ItemTarea;