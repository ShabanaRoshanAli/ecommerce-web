import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row, Image, Spinner } from "react-bootstrap"; // Import Spinner from react-bootstrap
import { useDataContext } from "../../config/DataContext";
import { useNavigate } from "react-router-dom";

const CategoryCard = () => {
    const navigate = useNavigate();
    const { setDataFromCategoryCard } = useDataContext();
    const [categories, setCategories] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(true);
    const fetchCategories = async () => {
        try {
            await axios
                .get("http://localhost:4000/eshop/api/categories")
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
            setErrorMessage(error.message)
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCategory = (id) => {
        setDataFromCategoryCard(id);
        const targetSection = document.getElementById("targetSection");
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleAllCategory = () => {
        setDataFromCategoryCard(null);
    };

    return (
        <>
            {
                loading ? (
                    null
                ) : (
                    <div className="catDiv">
                        <div className="custom-horizontal-scrollbar">
                            {categories &&
                                categories.map((e, i) => (
                                    <Col key={i} className="p-2">
                                        <div
                                            onClick={() => handleCategory(e.id)}
                                            className="contentScroll d-flex flex-column align-items-center"
                                            style={{ cursor: "pointer", width: "200px", margin: "5px" }}
                                        >
                                            <Image
                                                src={e.icon}
                                                className="rounded-circle mx-auto"
                                                style={{ width: "100px", height: "100px" }}
                                            />
                                            <div
                                                className="card w-100 px-2 text-center mt-2"
                                                style={{ backgroundColor: e.color }}
                                            >
                                                {e.name}
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            <Col>
                                <div
                                    onClick={handleAllCategory}
                                    className="d-flex flex-column justify-content-center align-items-center"
                                    style={{ cursor: "pointer", width: "200px", height: "200px", margin: "5px" }}
                                >
                                    <div className="card w-auto px-2 text-center mt-2" style={{ backgroundColor: "#F0B27A" }}>
                                        All Products
                                    </div>
                                </div>
                            </Col>
                        </div>
                    </div>

                )}
        </>
    );
};

export default CategoryCard;
