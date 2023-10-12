import axios from 'axios';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Image, InputGroup } 
from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessgae, setErrorMessage] = useState(null);
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    const formData = {
      email,
      password
    }
    try {
      const response = await axios.post('http://localhost:4000/eshop/api/users/login', formData)
      if (response.status == 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('user', response.data.user);
        localStorage.setItem('isAdmin', response.data.isAdmin);
        navigate('/');
        navigate(0);
      }
    } catch (error) {
      setErrorMessage('Invalid credentials')
    }
  }

  return (
    <Container className=''>
      <Row className='center'>
        <Col lg={6} md={6} sm={12} style={{ backgroundColor: '#FEF5E7' }}
          className='m-auto shadow pt-5 pb-5 d-block justify-content-center align-item-center ' >
          <div className='mt-5 mb-5 p-5 mt-sm-2 text-center'>
            <h2 style={{ color: '#4E342E' }}>
              We are more than just a company
            </h2>
            <p className='lh-lg fs-5'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </Col>
        <Col className='m-auto boxShadow p-2'>
          <div className='text-center' style={{ height: '' }}>
            <Image src='./images/logo.png'
              alt='logo'
              style={{ width: '300px', height: '230px' }} />
          </div>
          <hr />
          <Form noValidate validated={validated} onSubmit={handleSubmit} className='w-100 ps-2 pb-3'>
            <p>Please login to your account</p>
            <Form.Group
              controlId="validationCustomEmail">
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="email"
                  placeholder="admin@gmail.com"
                  aria-describedby="inputGroupPrepend"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a password.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group
              controlId="validationCustomPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="password"
                  placeholder="admin123"
                  aria-describedby="inputGroupPrepend"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a password.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <br />
            <div className='w-100 text-center'>
              <Button type="submit" className='w-100 background'>
                Login
              </Button>
              <Link to='/signup'
                className='my-5 text-secondary text-decoration-none mt-3'>
                Don't have an account?
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
export default LoginScreen;