import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { AppContext } from "../context";
import { addToBasket, fetchBasket, removeFromBasket } from "../http/basketAPI";
import { observer } from "mobx-react-lite";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import TrashCan from "../components/images/TrashCanIcon";
import { useHover } from "usehooks-ts";

const Basket = observer(() => {
    const { basket } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);

    const deleteButtonRef = useRef(null);
    const isDeleteHovered = useHover(deleteButtonRef);

    useEffect(() => {
        fetchBasket()
        .then((data) => {
            basket.setBasket(data);
        })
        .catch(e => console.log("error when loading basket:", e.response.data.message))
        .finally(() => {
            setIsLoading(false);
        })
    }, []);

    const countUpdate = useCallback((bd_data, deviceId) => {
        const changedBasketDevice = 
            basket.basket.basket_devices.find(bd => {
                return bd.deviceId === deviceId
            }
        )
        if (changedBasketDevice) {
            changedBasketDevice.count = bd_data.count;
            if (!bd_data.count) {
                basket.basket.basket_devices = basket.basket.basket_devices.filter(bd => 
                    bd.count)
            }
        }
        
    }, [basket])

    const handleAddClick = (deviceId) => {
        addToBasket(deviceId)
        .then((bd_data) => countUpdate(bd_data, deviceId))
        .catch(e => alert(e.response.data.message))
    }
    const handleRemoveClick = (deviceId) => {
        removeFromBasket(deviceId)
        .then((bd_data) => countUpdate(bd_data, deviceId))
        .catch(e => alert(e.response.data.message))
    }

    if (isLoading) return <Loader />;

    return (  
        <Container className="mt-3">
            {basket.basket.basket_devices?.length 
            ? (
                basket.basket.basket_devices?.map(bd => 
                    <Row key={bd.deviceId}>
                        <Col xs={2} lg={1}>
                            <Link to={DEVICE_ROUTE + "/" + bd.deviceId}>
                                <Image 
                                    src={process.env.REACT_APP_API_URL + bd.device.img}
                                    width={70}
                                    height={70}/>
                            </Link>
                        </Col>
                        <Col xs={3} className="d-flex align-items-center">
                            <Link to={DEVICE_ROUTE + "/" + bd.deviceId} className="basket-item-title">{bd.device.name}</Link>
                        </Col>
                        <Col xs={3} className="d-flex align-items-center">Цена: {bd.device.price} ₽</Col>
                        <Col xs={3} className="d-flex align-items-center justify-content-center">
                            <Button 
                                className="p-2 add-btn" 
                                variant="outline-dark"
                                onClick={() => handleAddClick(bd.deviceId)}
                            >
                                +
                            </Button>
                            <span className="basket-count">{bd.count}</span>
                            <Button 
                                className="remove-btn" 
                                variant="outline-dark"
                                onClick={() => handleRemoveClick(bd.deviceId)}
                            >
                                -
                            </Button>    
                        </Col>
                        <Col xs={1} className="d-flex align-items-center justify-content-end">
                            <Button 
                                className="delete-btn p-0"
                                variant="outline-danger" ref={deleteButtonRef}>
                                <TrashCan 
                                    width={24} 
                                    height={24} 
                                    fill={isDeleteHovered ? "white" : "red"}/>
                            </Button>
                        </Col>
                    </Row>
                ) 
            ) : (
                <h2 className="basket-message mt-5">Корзина пуста</h2>
            )}
        </Container>
    );
})
 
export default Basket;