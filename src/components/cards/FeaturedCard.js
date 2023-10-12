import { Card, Button, Carousel, Image, Row, Col, Container, Spinner } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaPen, FaPlus } from "react-icons/fa";

const FeaturedCard = () => {
    const [loading, setLoading] = useState(true); 
    const [featured, setFeatured] = useState(null);
    const [products, setProducts] = useState();
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate()
    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:4000/eshop/api/products');
        try {
            if (response.status == 200) {
                setProducts(response.data)
            } else {
                setErrorMessage('Error occured!')
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    }
    const fetchFeatured = async () => {
        // try {
        //     const response = await axios.get(
        //         "http://localhost:4000/eshop/api/products/get/featured"
        //     );
        //     setFeatured(response.data);
        // } catch (error) {
        //     console.error(error.message);
        // }
        try {
            await axios
                .get("http://localhost:4000/eshop/api/products/get/featured")
                .then((res) => {
                    setFeatured(res.data);
                })
                .catch((err) => {
                    setErrorMessage(err.message)
                })
                .finally(() => {
                    setLoading(false);
                });
        } catch (error) {
            setErrorMessage(error.message)
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeatured();
    }, []);

    const handleClick = (item) => {
        navigate(`/product/${item}`)
    }
    const handleDelete = async (id) => {
        console.log('delete!!!', id);
        try {
            const response = await axios.delete(`http://localhost:4000/eshop/api/products/${id}`)
            if (response.status == 200) {
                console.log(response.data);
                fetchProducts()
            }
        } catch (error) {
            setErrorMessage(error.message)
            console.log(error.message);
        }
    }
    const handleUpdate = (data) => {
        navigate(`/updateProduct/${data._id}`)
    }
    return (
        <>
            {
                loading ? (
                    <div className="text-center" >
                        <Spinner animation="border" role="status">
                            <span className="sr-only"></span>
                        </Spinner>
                    </div >
                ) : (
                    <Container className="mt-5 mb-3 text-center">
                        <h2 className="heading">
                            Featured Product
                        </h2>
                        <Carousel fade
                            className="carousel slide carousel-inner"
                            data-ride="carousel"
                            controls={false}
                            style={{
                                height: '500px',
                                width: '100%',
                                backgroundColor: '#E0E0E0',
                                borderRadius: '10px'
                            }}>
                            {
                                featured && featured.map((item, i) => (
                                    <Carousel.Item className='d-flex'
                                        key={i}>
                                        <Row className="w-100">
                                            <Col lg={6} md={6} sm={6}
                                                className="d-flex justify-content-center align-items-center">
                                                <img
                                                    style={{ height: '500px' }}
                                                    className="d-block"
                                                    src={item.image || ''}
                                                    alt="Slide"
                                                />
                                            </Col>
                                            <Col lg={6} md={6} sm={6}
                                                className="d-flex justify-content-center align-items-center">
                                                <span>
                                                    <h3 className='text-dark'>{item.name}</h3>
                                                    <h5 className="text-dark lh-lg">
                                                        Rs.{item.price || ''}
                                                    </h5>
                                                    <Button className="w-100"
                                                        onClick={() => handleClick(item.id)}>
                                                        View
                                                    </Button>
                                                </span>
                                            </Col>
                                        </Row>
                                    </Carousel.Item>
                                ))
                            }
                        </Carousel>
                    </Container>
                )}
        </>
    );
};

export default FeaturedCard;
