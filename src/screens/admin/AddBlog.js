
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Image }
    from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddProduct = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(null)
    const userId = localStorage.getItem('userId')
    const form = [
        {
            id: 'formBasicAuthor',
            name: 'Author',
            type: 'text',
            placeholder: 'Enter Author',
            value: 'author'
        },
        {
            id: 'formBasicTitle',
            name: 'Title',
            type: 'text',
            placeholder: 'Enter Title',
            value: 'title'
        },
        {
            id: 'formBasicContent',
            name: 'Content',
            type: 'text',
            placeholder: 'Enter Content',
            value: 'content'
        },
    ]

    const initialFormData = {
        author: '',
        title: '',
        content: '',
        image: null,
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (event) => {
        const { name, value, files, type } = event.target;
        if (type === "file") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                image: files[0]
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };

    const handleAddBlog = async (event) => {
        event.preventDefault();

        const dataToSend = new FormData();
        for (const key in formData) {
            dataToSend.append(key, formData[key]);
        }

        const headers = {
            'Content-Type': 'multipart/form-data',
        };

        try {
            const response = await axios.post(
                `http://localhost:4000/eshop/api/blogs/${userId}`,
                dataToSend,
                {
                    headers: headers,
                }
            );
            navigate('/blogs')
        } catch (err) {
            setErrorMessage(err.message)
        }
    };

    return (
        <Container fluid style={{ backgroundColor: '#FEF5E7', height: '100vh' }}>
            <Row>
                <Col className="d-flex justify-content-center align-items-center">
                    <div className="text-center">
                        <Image src='./images/logo.png'
                            alt='logo'
                            style={{ width: 200, margin: 'auto' }} />
                        <h4>
                            Add Blog
                        </h4>
                        <hr />
                        <Form
                            className=" p-4 p-sm-3 text-start"
                            onSubmit={handleAddBlog}
                            encType="multipart/form-data"
                            method="post"
                        >
                            {/* Mapping form fields */}
                            {form.map(({ id, name, type, placeholder, value }) => (
                                <Form.Group className="mb-3" key={id} controlId={id}>
                                    <Form.Label>{name}</Form.Label>
                                    <Form.Control
                                        type={type}
                                        name={value}
                                        onChange={handleChange}
                                        placeholder={placeholder}
                                        value={formData[value]}
                                    />
                                </Form.Group>
                            ))}

                            {/* Image upload */}
                            <Form.Group className="mb-3" controlId="formBasicFile">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="image"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Button variant="primary"
                                type="submit" className="w-100">
                                Add Blog
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AddProduct;

