import { Button, Container } from "react-bootstrap"
import CreateType from "../components/modals/CreateType";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import { useContext, useEffect, useState } from "react";
import { fetchBrands, fetchTypes } from "../http/deviceAPI";
import { AppContext } from "../context";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);

    const { device } = useContext(AppContext);

    useEffect(() => {
        fetchTypes()
        .then(data => {
            device.setTypes(data)
        })
        .catch(e => console.log("error when fetchng types:", e.response.data.message))
        fetchBrands()
        .then(data => {
            device.setBrands(data)
        })
        .catch(e => console.log("error when fetchng brands:", e.response.data.message))
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
                Добавить бренд
            </Button>
            <Button 
                className="mt-2" 
                variant="outline-dark" 
                onClick={toggleType}
            >
                Добавить тип
            </Button>
            <Button 
                className="mt-2" 
                variant="outline-dark" 
                onClick={toggleDevice}
            >
                Добавить устройство
            </Button>
            <CreateBrand show={brandVisible} onHide={toggleBrand} />
            <CreateType show={typeVisible} onHide={toggleType} />
            <CreateDevice show={deviceVisible} onHide={toggleDevice} />
        </Container>
    );
}
 
export default Admin;