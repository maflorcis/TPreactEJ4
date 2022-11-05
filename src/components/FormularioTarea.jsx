import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Swal from "sweetalert2/dist/sweetalert2.all";
import { useForm } from "react-hook-form";
import { consultarAPI, crearTareaAPI } from "./helpers/queries";
import ListaTarea from "./ListaTarea";

const FormularioTarea = () => {
  const [tarea, setTarea] = useState([]);

  useEffect(() => {
    consultarAPI().then((respuesta) => {
      setTarea(respuesta);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      nombreTarea: "",
    },
  });

  const onSubmit = (datos) => {
    crearTareaAPI(datos).then((respuesta) => {
      if (respuesta.status === 201) {
        Swal.fire(
          "Tu tarea se ha creado",
          "La tarea se agregó correctamente a la lista",
          "success"
        );
        reset();
        consultarAPI().then((respuesta) => {
          setTarea(respuesta);
        });
      } else {
        Swal.fire("Ups algo pasó", "Vuelva a intentarlo más tarde", "error");
      }
    });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group
          className="mb-3 row justify-content-center"
          controlId="formBasicEmail"
        >
          <aside className="col-sm-12 col-md-8 col-lg-4">
            <Form.Control
              type="text"
              placeholder="Agregá una tarea"
              {...register("nombreTarea", {
                required: "Este dato es obligatorio",
                minLength: {
                  value: 3,
                  message: "Debés ingresar como mínimo 3 caracteres",
                },
                maxLength: {
                  value: 150,
                  message: "Como máximo 150 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
            {errors.nombreTarea?.message}
          </Form.Text>
          </aside>
          <aside className="col-sm-12 col-md-4 col-lg-2">
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </aside>
        </Form.Group>
      </Form>
      <ListaTarea tarea={tarea} setTarea={setTarea}></ListaTarea>
    </div>
  );
};

export default FormularioTarea;