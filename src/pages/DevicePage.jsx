import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import bigStar from '../assets/images/big-star.svg';
import { useEffect, useState } from "react";
import { addRating, changeRating, checkRating, fetchDevice } from "../http/deviceAPI";
import { addToBasket } from "../http/basketAPI";

import { useParams } from "react-router-dom";
import Rating from "../components/Rating";
import Loader from "../components/Loader";

const DevicePage = () => {
    const [device, setDevice] = useState({ info: [] });
    const [ratingData, setRatingData] = useState(null); // user's rating
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        if (!id) {
            setIsLoading(false);
            return;
        }
        fetchDevice(id)
        .then((data) => {
            setDevice(data);
        })
        .catch(e => console.log("Error when loading device data:", e.response.data.message))
        .finally(() => setIsLoading(false))

        checkRating(id)
        .then((data) => {
            setRatingData(data);
        })
        .catch(e => console.log("Error when checking device rating data:", e.response.data.message))
        
    }, []);

    const handleRateClick = (rate) => {
        if (ratingData) {
            changeRating(ratingData.id, rate)
            .then(() => {
                // updata data about rating:
                fetchDevice(id)
                .then((data) => {
                    setDevice(data);
                })
                .catch(e => console.log("error when loading device page:", e.response.data.message))
            })
            .catch(e => alert(e.response.data.message))
        } else {
            addRating(device.id, rate)
            .then((data) => {
                setRatingData(data);
                // updata data about rating:
                fetchDevice(id)
                .then((data) => {
                    setDevice(data);
                })
                .catch(e => console.log("error when loading device page:", e.response.data.message))
            }) 
            .catch(e => alert(e.response.data.message))
        }
        setRatingData({...ratingData, rate});
    }

    if (isLoading) return <Loader />
    
    return (  
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image 
                        src={process.env.REACT_APP_API_URL + device.img} 
                        width={300} 
                        height={300}
                        className="product-item-main-image"/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2 className="text-center">{device.name}</h2>
                        <div 
                            className="d-flex align-items-center justify-content-center product-big-star"
                            style={{background: `url(${bigStar}) no-repeat center center`}}
                        >
                            <div>{device.rating?.toFixed(1)}</div>
                        </div>
                        <Rating 
                            handleRateClick={handleRateClick} 
                            rate={ratingData?.rate || 0}/>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card className="h-100 d-flex flex-column justify-content-between product-item-cart">
                        <h3 className="text-center mt-2">от {device.price} руб.</h3>
                        <Button 
                            variant="outline-dark" 
                            className="mb-4 ms-4 me-4"
                            onClick={() => 
                                addToBasket(device.id).catch(e => alert(e.response.data.message))}>
                            Добавить в корзину
                        </Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h2>Характеристики</h2>
                {device.info.map((desc, index) => (
                    <Row 
                        key={desc.id} 
                        style={{background: index % 2 ? "white" : "whitesmoke"}} 
                        className="d-flex pt-2 pb-2">
                        {desc.title}: {desc.description}
                    </Row>
                ))}
            </Row>
            
        </Container>
    ); 
}
 
export default DevicePage;