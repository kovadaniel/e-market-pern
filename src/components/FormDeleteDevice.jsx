import { useContext, useMemo, useRef, useState } from "react";
import { Container, Dropdown, Form, ListGroup, Row } from "react-bootstrap";
import { AppContext } from "../context";
import { useOnClickOutside } from 'usehooks-ts'

const FormDeleteDevice = ({
    selectedDevice, 
    setSelectedDevice,
    search,
    setSearch,
}) => {
    const { store: { device } } = useContext(AppContext);

    const [type, setType] = useState(null);
    const [brand, setBrand] = useState(null);
    const [isShowDeviceList, setIsShowDeviceList] = useState(false);
    const searchBarRef = useRef(null);

    const showDeviceList = () => {
        if (selectedDevice) {
            if(search.toLowerCase() === selectedDevice.name.toLowerCase()){
                console.log("equal");
                setIsShowDeviceList(false);
                return;
            }
        }
        setIsShowDeviceList(true);
    }
    const hideDeviceList = () => setIsShowDeviceList(false);

    useOnClickOutside(searchBarRef, hideDeviceList);

    const handleDeviceClick = (e, device) => {
        e.preventDefault();
        setSelectedDevice(device);
        setSearch(device.name);
        hideDeviceList();
    }

    const handleSearchInput = (e) => {
        if (selectedDevice && selectedDevice.name !== e.currentTarget.value) {
            setSelectedDevice(null);
            setIsShowDeviceList(true);
        }
        setSearch(e.currentTarget.value)
    }

    const filteredDevices = useMemo(() => {
        let result = device.devices;
        if (brand) {
            result = result.filter((d) => d.brandId === brand.id)
        }
        if (type) {
            result = result.filter((d) => d.typeId === type.id)
        }
        return result;
    }, [device.devices, brand, type])

    const filteredAndSearchedDevices = filteredDevices.filter((device) => {
        if(search){
            return device.name.toLowerCase().includes(search.toLowerCase())
        } else return true;
    })

    return (
        <Form>
            <Row className="mt-2">
                <Dropdown className="simple-dropdown mt-2 mb-2">
                    <Dropdown.Toggle variant="outline-primary" align="start">
                        {type?.name || "Выберете тип"}
                    </Dropdown.Toggle>
                    
                    <Dropdown.Menu>
                        <Dropdown.Item key="all" onClick={() => setType(null)}>
                            Все
                        </Dropdown.Item>
                        {device.types.map((type) => 
                            <Dropdown.Item 
                                key={type.id}
                                onClick={() => setType(type)}
                            >
                                {type.name}
                            </Dropdown.Item>
                        )}
                        </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="simple-dropdown mt-2 mb-2">
                    <Dropdown.Toggle variant="outline-primary">
                        {brand?.name || "Выберете бренд"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item key="all" onClick={() => setBrand(null)}>
                            Все
                        </Dropdown.Item>
                        {device.brands.map((brand) => 
                            <Dropdown.Item 
                                key={brand.id}
                                onClick={() => setBrand(brand)}
                            >
                                {brand.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </Row>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="delete-device-search">
                    {`Устройство, подлежащее удалению${
                        selectedDevice ? ": \"" + selectedDevice.name + "\"" : ""
                    }`}
                </Form.Label>
                <Form.Group 
                    onFocus={showDeviceList}
                    ref={searchBarRef}
                    className="me-2 position-relative"
                >
                    <Form.Control 
                        type="search"
                        placeholder="Выберете устройство"
                        id="delete-device-search"
                        value={search}
                        onChange={handleSearchInput}
                    />
                    {isShowDeviceList && (
                        <Container className="delete-device-list-wrap mt-1">
                            <ListGroup className="delete-device-list">
                                {filteredAndSearchedDevices.map((device) => 
                                    <ListGroup.Item 
                                        action 
                                        key={device.id}
                                        onClick={(e) => handleDeviceClick(e, device)}
                                        className="delete-device-list-item">
                                        {device.name}
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Container>
                    )}
                </Form.Group>
            </Form.Group>
        </Form>
    );
}
 
export default FormDeleteDevice;