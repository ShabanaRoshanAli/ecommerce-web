import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, CloseButton, Image, FormSelect } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CartScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [totalPrice, setPrice] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState('')
  const [quantity, setQuantity] = useState([])
  const [checked, setChecked] = useState(false)
  const handleCart = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/eshop/api/carts/${id}`);
      if (response.status === 200) {
        setCarts(response.data);

      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const deleteCartItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:4000/eshop/api/carts/${itemId}`);
      handleCart();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  useEffect(() => {
    handleCart();
  }, []);
  const handleChange = async (e, cartId) => {
    setSelectedQuantity(e)
    try {
      const response = await axios.put(`http://localhost:4000/eshop/api/carts/${cartId.id}`, {
        quantity: e,
        price: cartId.product.price * e
      });
      if (response.status === 200) {
        console.log(cartId);
        setCarts((prevCarts) =>
          prevCarts.map((cart) =>
            cart.id === cartId ? 
            { ...cart, quantity: selectedQuantity } 
            : cart
          ));
        handleCart()
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  const handleCheckboxChange = (event, cartItem) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedItems([...selectedItems, cartItem]);
      setChecked(true)
      setPrice(cartItem.price * selectedQuantity)
    } else {
      setSelectedItems(selectedItems.filter(item => item !== cartItem));
      setChecked(false)
    }
  };
  const deleteCarts = async () => {
    const ids = selectedItems.map(e => e.id);
    try {
      await Promise.all(ids.map(id => axios.delete(`http://localhost:4000/eshop/api/carts/${id}`)));
      handleCart();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }
  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      setErrorMessage('Please add something!');
    } else {
      const orderItems = selectedItems.map(item => ({
        product: item.product.id,
        quantity: selectedQuantity,
        user: item.user.id,
      }));
      navigate(`/checkout/${id}`, { state: orderItems });
      deleteCarts()
    }
  }
  return (
    <Container>
      <Row className="d-flex justify-content-center mt-5">
        <Col lg={8} md={8} sm={12}
          className='d-flex justify-content-center align-items-center'>
          <div className='w-100 custom-vertical-scrollbar'>
            {carts && carts.map(item => (
              <div key={item.id} className="card mb-3 w-100 border-0 boxShadow"
                style={{ maxHeight: "250px" }} >
                <div className="row">
                  <div className='col-12'>
                    <div className='float-end'>
                      <CloseButton onClick={() => deleteCartItem(item.id)} />
                    </div>
                  </div>
                  <div className="col-4 d-flex justify-content-around align-items-center bg-light">
                    <div className='mx-3'>
                      <input
                        type="checkbox"
                        name="completed"
                        onChange={(event) => handleCheckboxChange(event, item)}
                      />
                    </div>
                    <img src={item.product.image}
                      className="card-img"
                      style={{ maxHeight: "190px" }}
                      alt="..." />
                  </div>
                  <div className="col-8">
                    <div className="card-body">
                      <h5 className="card-title">
                        {item.product.name}
                      </h5>
                      <hr />
                      <p className="card-text">
                        <small className="text-muted">
                          Quantity {item.quantity}
                        </small>
                      </p>
                      <div
                        className='d-flex justify-content-around'>
                        <h5 className='mt-1'>
                          Rs. {item.price}
                        </h5>
                        <div className='d-flex rounded-pill bg-light px-3'>
                          <div className='m-1'>
                            <p><b>Quantity</b></p>
                            <Form.Select
                              onChange={(e) => handleChange(e.target.value, item)} className='mx-1'>
                              {[...Array(10).keys()].map((i) => (
                                <option key={i} value={i + 1}>
                                  {i + 1}
                                </option>
                              ))}
                            </Form.Select>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Col>
        {checked ? (
          <Col lg={4} md={4} sm={12}
            className=' d-flex justify-content-center'>
            <div className="card w-100">
              <div className="card-header fs-5 text-center">
                Order Summary
              </div>
              <div className="card-body">
                <div className='d-flex lh-lg mb-2 justify-content-around'>
                  <span>Subtotal </span>
                  <span>Rs. {totalPrice} </span>
                </div>
                <div className='d-flex lh-lg mb-2 justify-content-around'>
                  <span>Shipping </span>
                  <span>Free </span>
                </div>
                <div className='d-flex lh-lg mb-2 p-2 justify-content-around'>
                  <span className='fw-bold'>Total </span>
                  <span className='fw-bold'>Rs. {totalPrice} </span>
                </div>
                <div onClick={handleCheckout}
                  className="w-100 p-2 text-center bg">
                  Checkout
                </div>
              </div>
            </div>
          </Col>
        )
          :
          null
        }
      </Row>
    </Container>
  );
};

export default CartScreen;
