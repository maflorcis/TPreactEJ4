import React from "react";
import ListaTarea from "./ListaTarea";
import { Button, Form } from "react-bootstrap";

const FormularioTarea = () => {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3 d-flex" controlId="formBasicEmail">
          <Form.Control type="text" placeholder="Ingrese una tarea" />
          <Button variant="primary" type="submit">
            Enviar tarea
          </Button>
        </Form.Group>
      </Form>

      <ListaTarea></ListaTarea>
    </div>
  );
};

export default FormularioTarea;
