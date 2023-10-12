import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaPen } from "react-icons/fa";

const UpdateProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: "",
        description: "",
        richDescription: "",
        brand: "",
        price: "",
        countInStock: 0,
        isFeatured: false,
        image: null,
        category: "",
    });

    const [categories, setCategories] = useState([]);
    const [edit, setEdit] = useState(false);

    const handleEditClick = () => {
        setEdit(true);
    };

    const handleEdit = () => {
        setEdit(false);
    };

    const fetchCategory = async () => {
        try {
            const response = await axios.get('http://localhost:4000/eshop/api/categories');
            setCategories(response.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/eshop/api/products/${id}`);
            setProduct(response.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchCategory();
        fetchProduct();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleUpdateProduct = async (event) => {
        event.preventDefault();
        console.log(product);

        const headers = {
            'Content-Type': 'multipart/form-data',
        };

        try {
            const response = await axios.put(
                `http://localhost:4000/eshop/api/products/${id}`,
                product,
                {
                    headers: headers,
                }
            );
            console.log('posted data', response.data);
            navigate('/');
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <Container fluid>
            <Row className="justify-content-center mt-3 rounded p-5 rounded" style={{ backgroundColor: '#FEF5E7' }}>
                <Col lg={6} md={6} sm={12}>
                    <div className="card m-auto">
                        <Image src={product?.image}
                            className="card-img" alt="product-image" />
                    </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                    <div>
                        <div>
                            <h2>
                                {product?.name}
                            </h2>
                        </div>
                        <div className="d-flex justify-content-around">
                            <h5>
                                {product?.brand}
                            </h5>
                            <h3> Featured: {product?.isFeatured}</h3>
                        </div>
                        <div className="d-flex justify-content-around">
                            <h4>
                                Rs. {product?.price}
                            </h4>
                            <h6>
                                No. of Items: {product?.countInStock}
                            </h6>
                        </div>
                        <div>
                            <h5>Description:</h5> <p> {product?.description}</p>
                        </div>
                        <div>
                            <h5>Detailed Description:</h5> <p> {product?.richDescription}</p>
                        </div>
                        {
                            !edit && (<Button onClick={handleEditClick}
                                className="background border-0" >
                                <FaPen />
                            </Button>)
                        }
                    </div>
                </Col>
                {/* Form  */}
                <Col className={`p-5 ${edit ? '' : 'd-none'} color-overlay justify-content-center align-items-center`}>
                    <div className="text-center mb-0">
                        <Image src='../images/logo.png' 
                        alt='logo' />
                        <h4>Update Product</h4>
                    </div>
                    <hr />
                    <Form
                        className="rounded p-4 p-sm-3 text-start"
                        onSubmit={handleUpdateProduct}
                        encType="multipart/form-data"
                        method="post"
                    >
                        <Form.Group className="mb-3"
                            controlId="exampleForm.ControlInput1">
                            <Form.Label>Product</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={product?.name || ''}
                                placeholder={product?.name || ''}
                                onChange={handleChange} // Add this line
                            />
                        </Form.Group>
                        <Form.Group className="mb-3"
                            controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                placeholder={product?.description || ''}
                                value={product?.description || ''}
                                onChange={handleChange} // Add this line
                                rows={3}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3"
                            controlId="exampleForm.ControlTextarea2">
                            <Form.Label>Product Detailed Description</Form.Label>
                            <Form.Control as="textarea"
                                name="richDescription"
                                value={product?.richDescription || ''}
                                placeholder={product?.richDescription || ''}
                                onChange={handleChange}
                                rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3"
                            controlId="exampleForm.ControlInput2">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={product?.price || ''}
                                name="price"
                                value={product?.price || ''}
                                onChange={handleChange} // Add this line
                            />
                        </Form.Group>
                        <Form.Group className="mb-3"
                            controlId="exampleForm.ControlInput2">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={product?.brand || ''}
                                name="brand"
                                value={product?.brand || ''}
                                onChange={handleChange} // Add this line
                            />
                        </Form.Group>
                        <Form.Group className="mb-3"
                            controlId="exampleForm.ControlInput2">
                            <Form.Label>Count in stock</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder={product?.countInStock || ''}
                                name="countInStock"
                                value={product?.countInStock || ''}
                                onChange={handleChange} // Add this line
                            />
                        </Form.Group>
                        {/* Category select */}
                        <Form.Select
                            aria-label="Select Category"
                            id="categoryDropdown"
                            className="mb-3"
                            name="category"
                            onChange={handleChange}
                        >
                            <option value="">Category</option>
                            {categories && categories.map(({ name, id }) => (
                                <option value={id} key={id}>
                                    {name}
                                </option>
                            ))}
                        </Form.Select>

                        {/* IsFeatured select */}
                        <Form.Group>
                            <Form.Label>Featured</Form.Label>
                            <Form.Select
                                aria-label="Select Featured"
                                id="isFeaturedDropdown"
                                className="mb-3"
                                name="isFeatured"
                                onChange={handleChange}
                                value={product?.isFeatured || ''}
                            >
                                <option value="">Featured</option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Submit button */}
                        <Button variant="primary" type="submit">
                            Update Product
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default UpdateProduct;

