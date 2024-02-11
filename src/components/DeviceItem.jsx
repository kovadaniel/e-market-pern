import { useContext } from "react";
import { Card, Col, Image } from "react-bootstrap";
import { AppContext } from "../context";
import star from "../assets/images/star.svg"
import { Navigate, useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { trim } from "../utils";

const DeviceItem = ({device: deviceItem}) => {
    const { store: { device } } = useContext(AppContext);
    let navigate = useNavigate();
    const type = device.types?.find(t => t.id === deviceItem.typeId)
    return ( 
        <Col xs={4} className="">
            <Card 
                className="product-card mt-3" 
                border="light" 
                onClick={() => navigate(DEVICE_ROUTE + "/" + deviceItem.id)}>
                <Card.Img variant="top" className="product-card-img" height={150} src={process.env.REACT_APP_API_URL + deviceItem.img} />
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted product-card-subtitle">
                        {type && <span>{trim(type.name, 10, 3)}</span>}
                        <div className="d-flex align-items-center">
                            <span className="product-card-rate me-1">{deviceItem.rating}</span>
                            <Image src={star} width={18} height={18}/>
                        </div>
                    </Card.Subtitle>
                    <Card.Title className="product-card-title">{trim(deviceItem.name, 30, 5)}</Card.Title>
                </Card.Body>
            </Card>
        </Col>
    );
}
 
export default DeviceItem;