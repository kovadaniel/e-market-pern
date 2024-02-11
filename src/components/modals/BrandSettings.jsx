import { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal, Tab, Tabs } from "react-bootstrap";
import { AppContext } from "../../context";
//import { createBrand } from "../../http/device API";

const BrandSettings = ({show, onHide}) => {
  const { api, store: { 
    device: { 
      brands,
      types
    }
  } } = useContext(AppContext);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState(null);
  const [type, setType] = useState(null);

  const addBrand = () => {
    api.device.createBrand({name, typeId: type?.id}).then(() => {
      setName("");
      api.device.fetchBrands();
      onHide();
    })
  }
  const deleteBrand = () => {
    if (!brand) return;
    api.device.deleteBrand(brand.id).then(() => {
      setBrand(null)
      api.device.fetchBrands();
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
          Настройки брендов
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
                placeholder="Введите название бренда"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </Form>
            <Dropdown className="simple-dropdown mt-2 mb-2">
                    <Dropdown.Toggle variant="outline-primary" align="start">
                        {type?.name || "Выберете тип"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>{types.map((type) => 
                        <Dropdown.Item 
                            key={type.id}
                            onClick={() => setType(type)}
                        >
                            {type.name}
                        </Dropdown.Item>
                    )}</Dropdown.Menu>
                </Dropdown>
          </Tab>
          <Tab eventKey="remove" title="Удалить" variant="tabs">
            <Form.Select 
              className="mt-3" 
              onChange={(e) => 
                setBrand(brands.find(b => b.id.toString() === e.currentTarget.value))
              }
              value={brand?.id || ""}
            >
              <option value="" hidden>{brand?.name || "Выберете бренд"}</option>
              {brands.map((brand) => 
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              )}
            </Form.Select>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>Закрыть</Button>
        {key === "add" 
          ? (
            <Button variant="outline-success" onClick={addBrand}>
              Добавить
            </Button>
          ) : (
            <Button variant="outline-danger" onClick={deleteBrand}>
              Удалить
            </Button>
          )
        }
      </Modal.Footer>
    </Modal>    
  );
}
 
export default BrandSettings;