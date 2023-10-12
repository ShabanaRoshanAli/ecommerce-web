import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Image, CloseButton }
  from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import StatusProgress from '../components/StatusProgress';

const CheckoutScreen = () => {
  const { state } = useLocation();
  const { id } = useParams();

  const [productId, setProductId] = useState(null);
  const [productData, setProductData] = useState(null);
  const [productStatus, setProductStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [now, setNow] = useState(null);
  const [hideForm, setHideform] = useState(false)

  const [order, setOrder] = useState({
    orderItems: state,
    shippingAddress1: '',
    shippingAddress2: '',
    city: '',
    zip: '',
    country: '',
    user: id
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(e, state);
    e.preventDefault();
    const { shippingAddress1, shippingAddress2, city, country, zip } = order;
    if (shippingAddress1 === '' || shippingAddress2 === '' || city === '' || country === '' || zip === '') {
      console.log('Please fill in all required fields.');
    } else {
      try {
        const response = await axios.post(`http://localhost:4000/eshop/api/orders`, order);

        if (response.status === 200) {
          console.log('Order submitted successfully.');
          setHideform(true)
          fetchOrder();
        } else {
          console.log('Server returned an error:', response.status);
        }
      } catch (error) {
        console.error('An error occurred:', error.message);
      }
    }
  };

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/eshop/api/orders/get/userorders/${id}`)
      if (response.status == 200) {
        setProductData(response.data);
        setProductStatus(response.data.map((product) => product.status));
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message)
    }
  }

  useEffect(() => {
    fetchOrder();
  }, [])
  return (
    <Container>
      <Row className='d-flex justify-content-center mt-5 pt-5'>
        {
          !state ?
            <Col lg={6} md={6} sm={12}>
              <Form onSubmit={handleSubmit} className='w-100 m-auto'>
                <Form.Group controlId="shippingAddress1">
                  <Form.Label>Shipping Address </Form.Label>
                  <Form.Control
                    type="text"
                    name="shippingAddress1"
                    value={order.shippingAddress1}
                    onChange={handleChange}
                    placeholder='shipping address 1'
                    className='mb-2'
                  />
                  <Form.Control
                    type="text"
                    name="shippingAddress2"
                    value={order.shippingAddress2}
                    onChange={handleChange}
                    placeholder='shipping address 2'
                    className='mb-2'
                  />
                  <Form.Label>
                    User Info
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={order.city}
                    onChange={handleChange}
                    placeholder='city'
                    className='mb-2'
                  />
                  <Form.Control
                    type="text"
                    name="zip"
                    value={order.zip}
                    onChange={handleChange}
                    placeholder='zip'
                    className='mb-2'
                  />
                  <Form.Control
                    type="text"
                    name="country"
                    value={order.country}
                    onChange={handleChange}
                    placeholder='country'
                    className='mb-2'
                  />
                  <Form.Control
                    type="text"
                    name="phone"
                    value={order.phone}
                    onChange={handleChange}
                    placeholder='phone'
                    className='mb-2'
                  />
                </Form.Group>
                <br />
                <Button className='w-100'
                  variant="primary"
                  type="submit">
                  Place Order
                </Button>
              </Form>
            </Col>
            :
            <Col className='my-2 custom-vertical-scrollbar'>
              {
                productData &&
                productData.map((product, i) => (
                  <div key={i} >
                    <div className='my-2'>
                      <h3 className='text-center text-secondary'>
                        Order no: {i + 1}
                      </h3>
                    </div>
                    {/* <hr /> */}
                    <div className='text-center my-2'>
                      <StatusProgress data={product.status} />
                      <div>
                        {product.orderItems.map((item, j) => (
                          <div key={j}
                            className='w-100'>
                            <div className="card mt-3 mb-3 w-100 h-auto border-0 boxShadow"
                              // style={{ maxHeight: "200px" }} 
                              >
                              <div className="row no-gutters">
                                <div className="col-md-4"
                                  style={{ backgroundColor: '#FEF5E7' }}>
                                  <img src={item.product.image}
                                    className="card-img"
                                    style={{ maxHeight: "190px" }}
                                    alt="..." />
                                </div>
                                <div className="col-md-8" >
                                  <div className="card-body">
                                    <h5 className="card-title">
                                      {item.product.name}
                                    </h5>
                                    <hr />
                                  </div>
                                  <div className='d-flex justify-content-around'>
                                    <h6>
                                      {item.product.brand}
                                    </h6>
                                    <h6>
                                      Rs. {item.product.price}
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              }
            </Col>
        }

      </Row>
    </Container>
  )
}

export default CheckoutScreen