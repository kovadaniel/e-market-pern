import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { AppContext } from "../../context";
import { observer } from "mobx-react-lite";
import { createDevice, fetchBrands, fetchTypes } from "../../http/deviceAPI";

const CreateType = observer(({show, onHide}) => {
    const { device } = useContext(AppContext);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);
    
    const addInfo = () => {
        setInfo([...info, {title: "", description: "", temp_id: Date.now()}])
    }
    const changeInfo = (key, value, temp_id) => {
        setInfo(info.map((i) => i.temp_id === temp_id ? {...i, [key]: value} : i))
    }
    const removeInfo = (id) => {
        setInfo(info.filter(i => i.temp_id !== id))
    }

    const selectFile = (e) => {
        console.log(e.currentTarget.files);
        setFile(e.currentTarget.files[0])
    }

    const addDevice = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", `${price}`);
        formData.append("img", file);
        formData.append("brandId", device.selectedBrand.id);
        formData.append("typeId", device.selectedType.id);
        formData.append("info", JSON.stringify(info));

        createDevice(formData).then((data) => {
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
                    Добавить бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedType?.name || "Выберете тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>{device.types.map((type) => 
                            <Dropdown.Item 
                                key={type.id}
                                onClick={() => device.setSelectedType(type)}
                            >
                                {type.name}
                            </Dropdown.Item>
                        )}</Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedBrand?.name || "Выберете бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>{device.brands.map((brand) => 
                            <Dropdown.Item 
                                key={brand.id}
                                onClick={() => device.setSelectedBrand(brand)}
                            >
                                {brand.name}
                            </Dropdown.Item>
                        )}</Dropdown.Menu>
                    </Dropdown>
                    <Form.Control 
                        className="mt-3 mb-3"
                        placeholder="Введите название устройства"
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)} />
                    <Form.Control 
                        type="number"
                        className="mt-3 mb-3"
                        placeholder="Введите цену устройства"
                        value={price}
                        onChange={(e) => setPrice(Number(e.currentTarget.value))} />
                    <Form.Control 
                        type="file"
                        className="mt-3 mb-3"
                        onChange={selectFile}/>
                    <hr/>
                    <Button variant="outline-dark" onClick={addInfo}>Добавить новое свойство</Button>
                    {
                        info.map(i => 
                            <Row key={i.temp_id}>
                                <Col sm={4} xs={12} className="mt-2">
                                    <Form.Control 
                                        placeholder="Введите название свойства" 
                                        value={i.title}
                                        onChange={(e) => 
                                            changeInfo("title", e.currentTarget.value, i.temp_id)}
                                    />
                                </Col>
                                <Col sm={5} xs={12} className="mt-2">
                                    <Form.Control 
                                        placeholder="Введите описание свойства"
                                        value={i.description}
                                        onChange={(e) => 
                                            changeInfo("description", e.currentTarget.value, i.temp_id)}
                                    />
                                </Col>
                                <Col sm={3} xs={12} className="mt-2">
                                    <Button 
                                        variant="outline-danger"
                                        onClick={() => removeInfo(i.temp_id)}>Удалить</Button>
                                </Col>
                            </Row>
                        )
                    }
                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});
 
export default CreateType;