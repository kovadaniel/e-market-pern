import { useContext, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row, Tab, Tabs } from "react-bootstrap";
import { AppContext } from "../../context";
import { observer } from "mobx-react-lite";
import FormCreateDevice from "../FormCreateDevice";
import FormDeleteDevice from "../FormDeleteDevice";
//import { createDevice } from "../../http/device API";

const DeviceSettings = observer(({show, onHide}) => {
    const { api } = useContext(AppContext);
    const [name, setName] = useState("");
    const [price, setPrice] = useState({});
    const [file, setFile] = useState(null);
    const [type, setType] = useState(null);
    const [brand, setBrand] = useState(null);
    const [info, setInfo] = useState([]);

    const [selectedDevice, setSelectedDevice] = useState(null);
    const [searchDevice, setSearchDevice] = useState("");


    
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
        if (!brand || !type) return;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", `${price}`);
        formData.append("img", file);
        formData.append("brandId", brand.id);
        formData.append("typeId", type.id);
        formData.append("info", JSON.stringify(info));

        api.device.createDevice(formData).then(() => {
            onHide();
        })

        api.device.fetchDevices()
        .catch(e => console.log("error when fetchng devices:", e.response.data.message))
    }

    const deleteDevice = () => {
        if(!selectedDevice) return;
        api.device.deleteDevice(selectedDevice.id);
        setSelectedDevice(null);
        setSearchDevice(null);
        
        api.device.fetchDevices()
        .catch(e => console.log("error when fetchng devices:", e.response.data.message))
        
        onHide();
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
                    Добавить бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    fill
                >
                    <Tab eventKey="add" title="Добавить">
                        <FormCreateDevice 
                            name={name}
                            setName={setName}
                            price={price}
                            setPrice={setPrice}
                            file={file}
                            setFile={setFile}
                            type={type}
                            setType={setType}
                            brand={brand}
                            setBrand={setBrand}
                            info={info}
                            addInfo={ addInfo }
                            changeInfo={changeInfo}
                            removeInfo={removeInfo}
                            selectFile={selectFile}
                        />
                    </Tab>
                    <Tab eventKey="remove" title="Удалить" variant="tabs">
                        <FormDeleteDevice 
                            selectedDevice={selectedDevice}
                            setSelectedDevice={setSelectedDevice}
                            search={searchDevice}
                            setSearch={setSearchDevice}
                        />
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>Закрыть</Button>
                {key === "add" 
                ? (
                    <Button variant="outline-success" onClick={addDevice}>
                        Добавить
                    </Button>
                ) : (
                    <Button variant="outline-danger" onClick={deleteDevice}>
                        Удалить
                    </Button>
                )
                }
            </Modal.Footer>
        </Modal>
    );
});
 
export default DeviceSettings;