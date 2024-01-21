import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createType } from "../../http/deviceAPI";
import { AppContext } from "../../context";

const CreateType = ({show, onHide}) => {
  const [type, setType] = useState("");
  const addType = () => {
    createType({name: type}).then((data) => {
      setType("");
      onHide();
    })
  }

  return (
      <Modal
    show={show}
    onHide={onHide}
    size="lg"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Добавить тип
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
          <Form.Control 
            placeholder="Введите название типа"
            value={type}
            onChange={(e) => setType(e.currentTarget.value)}/>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
      <Button 
        variant="outline-success" 
        onClick={addType}>
          Добавить
      </Button>
    </Modal.Footer>
  </Modal>
  );
}
 
export default CreateType;