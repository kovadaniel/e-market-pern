import { useContext } from "react";
import { Button, Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import { AppContext } from "../context";

const FormCreateDevice = ({
    name,
    setName,
    price,
    setPrice,
    type,
    setType,
    brand,
    setBrand,
    info,
    addInfo,
    changeInfo,
    removeInfo,
    selectFile
}) => {
    const { store: { device } } = useContext(AppContext);

    return (
        <Form>
            <Row className="mt-2">
                <Dropdown className="simple-dropdown mt-2 mb-2">
                    <Dropdown.Toggle variant="outline-primary" align="start">
                        {type?.name || "Выберете тип"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>{device.types.map((type) => 
                        <Dropdown.Item 
                            key={type.id}
                            onClick={() => setType(type)}
                        >
                            {type.name}
                        </Dropdown.Item>
                    )}</Dropdown.Menu>
                </Dropdown>
                <Dropdown className="simple-dropdown mt-2 mb-2">
                    <Dropdown.Toggle variant="outline-primary">
                        {brand?.name || "Выберете бренд"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>{device.brands.map((brand) => 
                        <Dropdown.Item 
                            key={brand.id}
                            onClick={() => setBrand(brand)}
                        >
                            {brand.name}
                        </Dropdown.Item>
                    )}</Dropdown.Menu>
                </Dropdown>
            </Row>
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
            <Button variant="outline-primary" onClick={addInfo}>Добавить новое свойство</Button>
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
    );
}
 
export default FormCreateDevice;