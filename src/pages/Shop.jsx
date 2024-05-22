import { Container, Row, Col } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import Pages from "../components/Pages";
import Loader from "../components/Loader";


const Shop = observer(() => {
    const { api, store: { device } } = useContext(AppContext);
    const [isLoadingDevices, setIsLoadingDevices] = useState(true);

    useEffect(() => {
        api.device.fetchTypes()
        .catch(e => console.log("Error when fetching types:", e.response.data.message))
        
        api.device.fetchBrands()
        .catch(e => console.log("Error when fetching brands:", e.response.data.message))

        setIsLoadingDevices(true);
        api.device.fetchDevices(null, null, device.page, device.limit)
        .catch(e => console.log("Error when fetching devices:", e.response.data.message))
        .finally(() => setIsLoadingDevices(false));
    }, [])

    useEffect(() => {
        api.device.fetchDevices(
            device.selectedType?.id , 
            device.selectedBrand?.id,
            device.page,
            device.limit
        )
    }, [device.page, device.selectedType, device.selectedBrand])

    if (isLoadingDevices) return <Loader />

    return ( 
        <Container>
            <Row className="mt-3">
                <Col xs={3}>
                    <TypeBar />
                </Col>
                <Col xs={9} className="d-flex flex-column">
                    <BrandBar />
                    <DeviceList isLoading />
                    <Pages />
                </Col>

            </Row>
        </Container>
    );
})
 
export default Shop;