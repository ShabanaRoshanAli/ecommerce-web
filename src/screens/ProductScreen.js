import { Col, Container, Row, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useEffect, useState } from "react";


const ProductScreen = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/eshop/api/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            setErrorMessage("Error fetching product data.");
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    if (errorMessage) {
        return <div>{errorMessage}</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleClick = async () => {
        const userId = localStorage.getItem('userId')
        if(!userId){
            navigate('/login')
        }else{
            const cartData = {
                product: product.id,
                price: product.price,
                user: userId
            }
            const response = await axios.post(`http://localhost:4000/eshop/api/carts/${userId}`, cartData)
            try {
                if (response.status == 200) {
                    navigate(`/carts/${userId}`)
                }
            } catch (error) {
                setErrorMessage(error.message)
            }
        }
    }
    return (
        <Container>
            <Row>
                <Col lg={6} md={6} sm={12} className=" mt-5">
                    <div className="d-flex justify-content-center">
                        <Image
                            src={product.image}
                            alt="product imag"
                            className="m-auto w-75 rounded"
                            style={{maxHeight: '500px', backgroundColor: '#FEF5E7'}}
                        />
                    </div>
                </Col>
                <Col lg={6} md={6} sm={12}
                    className="d-flex justify-content-center align-items-center border rounded bg-light mt-5">
                    <div className="px-5">
                        <h2 className="mb-3 mt-3">
                            {product.name}
                        </h2>
                        <hr />
                        <div className="d-flex justify-content-around">
                            <h5>{product.brand}</h5>
                            <h5>Rs. {product.price}</h5>
                        </div>
                        <p>
                            {product.description}
                        </p>
                        <Button onClick={handleClick}
                        className="float-end px-3 mb-3">
                            Add to Cart
                        </Button>
                    </div>
                </Col>
                <Col lg={12} md={12} sm={12}
                    className="d-flex justify-content-center align-items-center">
                    <div className="w-100 mb-3 mt-3 p-5 border rounded bg-light">
                        <h5>
                            Product Details
                        </h5>
                        <p className="lh-2">
                            {product.richDescription}
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ProductScreen