import { useContext, useState } from "react";
import { Button, Form, Modal, Tab, Tabs } from "react-bootstrap";
//import { createType } from "../../http/device API";
import { AppContext } from "../../context";

const TypeSettings = ({show, onHide}) => {
  const { api, store: {
    device: {
      types
    }
  } } = useContext(AppContext);
  const [name, setName] = useState("");
  const [type, setType] = useState(null);

  const addType = () => {
    api.device.createType({name}).then(() => {
      setName("");
      api.device.fetchTypes();
      onHide();
    })
  }
  const deleteType = () => {
    if (!type) return;
    api.device.deleteType(type.id).then(() => {
      setType(null)
      api.device.fetchTypes();
      onHide();
    })
  }

  const [key, setKey] = useState("add");

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Настройки типов
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs 
          activeKey={key}
          onSelect={(k) => setKey(k)}
          fill
        >
          <Tab eventKey="add" title="Добавить">
            <Form className="mt-3">
              <Form.Control 
                placeholder="Введите название типа"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </Form>
          </Tab>
          <Tab eventKey="remove" title="Удалить" variant="tabs">
            <Form.Select 
              className="mt-3" 
              onChange={(e) => 
                setType(types.find(t => t.id.toString() === e.currentTarget.value))
              }
              value={type?.id || ""}
            >
              <option value="" hidden>{type?.name || "Выберете тип"}</option>
              {types.map((type) => 
                <option key={type.id} value={type.id}>{type.name}</option>
              )}
            </Form.Select>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>Закрыть</Button>
        {key === "add" 
          ? (
            <Button variant="outline-success" onClick={addType}>
              Добавить
            </Button>
          ) : (
            <Button variant="outline-danger" onClick={deleteType}>
              Удалить
            </Button>
          )
        }
      </Modal.Footer>
    </Modal>
  );
}
 
export default TypeSettings;