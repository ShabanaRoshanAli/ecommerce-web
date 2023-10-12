import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDataContext } from "../config/DataContext";
import { FaTwitter, FaWhatsapp, FaFacebook, FaEnvelope, FaInstagram }
    from "react-icons/fa";

const Footer = () => {
    const { setDataFromCategoryCard } = useDataContext();
    const [categories, setCategories] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(true);
    const fetchCategories = async () => {
        try {
            await axios.get('http://localhost:4000/eshop/api/categories')
                .then((res) => {
                    setCategories(res.data);
                })
                .catch((err) => {
                    setErrorMessage(err.message)
                })
                .finally(() => {
                    setLoading(false);
                });
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchCategories();
    }, [])
    const handleCategory = (id) => {
        setDataFromCategoryCard(id);
    }
    return (
        <>
            {
                loading ? (
                    null
                )
                    :
                    (
                        <Container fluid 
                        style = {{ backgroundColor: '#FCE4EC', borderTop: '3px solid grey' }}>
            <Row>
                <Col className="d-flex justify-content-center align-items-center text-center mt-2 mb-2">
                    <span className="mx-5">
                        <h4 className="heading text-decoration-underline">
                            Follow the flock
                        </h4>
                        <br />
                        <p className="text-start fs-6">
                            Welcome to <span className="heading text-decoration-underline fw-bold">Shopping Online </span>
                            , your one-stop destination for top-quality fashion, innovative tech gadgets,
                            and artisanal crafts. We're dedicated to bringing you the latest trends
                            Explore our curated selection and experience affordable luxury and unmatched variety.
                            Thank you for choosing us!
                        </p>
                        <div className="d-flex justify-content-center">
                            <a href="mailto:shabanaroshanali331@gmail.com" className="nav-link">
                                <FaEnvelope className="m-2 fs-2" />
                            </a>
                            <a href="https://twitter.com/"
                                target="_blank" className="nav-link">
                                <FaTwitter className="m-2 fs-2" />
                            </a>
                            <a href="https://wa.me/03071302220"
                                target="_blank" className="nav-link">
                                <FaWhatsapp className="m-2 fs-2" />
                            </a>
                            <a href="https://www.facebook.com/"
                                target="_blank" className="nav-link">
                                <FaFacebook className="m-2 fs-2" />
                            </a>
                            <a href="https://www.instagram.com/"
                                target="_blank" className="nav-link">
                                <FaInstagram className="m-2 fs-2" />
                            </a>
                        </div>
                    </span>
                </Col>
                <Col className="d-flex justify-content-center align-items-center mt-3 mb-2">
                    <ul>
                        {
                            categories &&
                            categories.map((e, i) => {
                                return (
                                    <li key={i} onClick={() => handleCategory(e.id)}
                                        className="lh-base list-group-item"
                                        style={{ cursor: 'pointer' }} >
                                        {e.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </Col>
                <Col lg={12} md={12} sm={12}
                    className="d-flex justify-content-center align-items-center">
                    <h6 className="fs-5 p-3">
                        copyright&copy; 2023
                    </h6>
                </Col>
            </Row>
        </Container >
            )
        }
        </>
    )
}

export default Footer