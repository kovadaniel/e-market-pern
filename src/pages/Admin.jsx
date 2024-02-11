import { Button, Container } from "react-bootstrap"
import TypeSettings from "../components/modals/TypeSettings";
import BrandSettings from "../components/modals/BrandSettings";
import DeviceSettings from "../components/modals/DeviceSettings";
import { useContext, useEffect, useState } from "react";
// import { fetchBrands, fetchTypes } from "../http/device API";
import { AppContext } from "../context";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);

    const { api } = useContext(AppContext);

    useEffect(() => {
        api.device.fetchTypes()
        .catch(e => console.log("error when fetchng types:", e.response.data.message))
        api.device.fetchBrands()
        .catch(e => console.log("error when fetchng brands:", e.response.data.message))
        api.device.fetchDevices()
        .catch(e => console.log("error when fetchng devices:", e.response.data.message))
    }, [])

    const toggleBrand = () => {
        setBrandVisible(!brandVisible)
    }
    const toggleType = () => {
        setTypeVisible(!typeVisible)
    }
    const toggleDevice = () => {
        setDeviceVisible(!deviceVisible)
    }

    return (  
        <Container className="d-flex flex-column">
            <Button 
                className="mt-2" 
                variant="outline-dark" 
                onClick={toggleBrand}
            >
                Настройки брендов
            </Button>
            <Button 
                className="mt-2" 
                variant="outline-dark" 
                onClick={toggleType}
            >
                Настройки типов
            </Button>
            <Button 
                className="mt-2" 
                variant="outline-dark" 
                onClick={toggleDevice}
            >
                Настройки устройств
            </Button>
            <BrandSettings show={brandVisible} onHide={toggleBrand} />
            <TypeSettings show={typeVisible} onHide={toggleType} />
            <DeviceSettings show={deviceVisible} onHide={toggleDevice} />
        </Container>
    );
}
 
export default Admin;