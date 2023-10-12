
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Image } 
from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddProduct = () => {
  const navigate = useNavigate()
  const form = [
    {
      id: 'formBasicName',
      name: 'Name',
      type: 'text',
      placeholder: 'Enter Name',
      value: 'name'
    },
    {
      id: 'formBasicDescription',
      name: 'Description',
      type: 'text',
      placeholder: 'Enter Description',
      value: 'description'
    },
    {
      id: 'formBasicRicdescription',
      name: 'Rich Description',
      type: 'text',
      placeholder: 'Enter Rich Description',
      value: 'richDescription'
    },
    {
      id: 'formBasicBrand',
      name: 'Brand',
      type: 'text',
      placeholder: 'Enter Brand',
      value: 'brand'
    },
    {
      id: 'formBasicPrice',
      name: 'Price',
      type: 'text',
      placeholder: 'Enter Price',
      value: 'price'
    },
    {
      id: 'formBasicCountinstock',
      name: 'Count In Stock',
      type: 'number',
      placeholder: 'Enter Count in stock',
      value: 'countInStock'
    }
  ]

  const initialFormData = {
    name: '',
    description: '',
    richDescription: '',
    brand: '',
    price: '',
    category: '',
    countInStock: '',
    isFeatured: '',
    image: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [categories, setCategories] = useState('');

  const fetchCategory = async () => {
    await axios.get('http://localhost:4000/eshop/api/categories')
      .then(res => {
        setCategories(res.data);
      }).catch(err => {
        console.log(err.message);
      })
  }

  useEffect(() => {
    fetchCategory()
  }, []);

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

  const handleAddProduct = async (event) => {
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
        `http://localhost:4000/eshop/api/products`,
        dataToSend,
        {
          headers: headers,
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-center mt-3 rounded p-5 rounded"
        style={{ backgroundColor: '#FEF5E7' }}>
        <Col className="color-overlayjustify-content-center align-items-center">
          <div className="text-center">
            <Image src='./images/logo.png' alt='logo' className='App-logo' />
            <h4>Add Product</h4>
          </div>
          <hr />
          <Form
            className="rounded p-4 p-sm-3 text-start"
            onSubmit={handleAddProduct}
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

            {/* Category select */}
            <Form.Select
              aria-label="Select Category"
              id="categoryDropdown"
              className="mb-3"
              name="category"
              onChange={handleChange}
              value={formData.category}
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
                value={formData.isFeatured}
              >
                <option value="">Featured</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Form.Select>
            </Form.Group>

            {/* Submit button */}
            <Button variant="primary" type="submit">
              Add Product
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProduct;

