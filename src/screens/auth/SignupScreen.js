import axios from 'axios';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Image, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {

  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [street, setStreet] = useState('');
  const [apartment, setApartment] = useState('');
  const [errorMessgae, setErrorMessage] = useState(null);
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    // validation 
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    // signup 
    const formData = {
      name,
      phone,
      email,
      password,
      country,
      state,
      city,
      street, 
      zip, 
      apartment
    }
    try {
      const response = await axios.post('http://localhost:4000/eshop/api/users/register', formData)
      if(response.status == 200){
        navigate('/login')
      }
      navigate('/signup')
    } catch (error) {
      setErrorMessage("Inavlid Credentials")
    }
  };
  return (
    <Container fluid>
      <Row className=' pb-5 bt-5 d-flex justify-content-center align-items-center'
       style={{ backgroundColor: '#FEF5E7', minHeight: '100vh' }}>
        <Col md={8} 
          className=' m-auto shadow bg-light m-auto px-3 d-block justify-content-center align-item-center' >
          <div className='text-center' style={{height: '150px'}}>
            <Image src='./images/logo.png'
              alt='logo'
              style={{ width: '200px' }} />
          </div>
          <hr />
        {
          errorMessgae?
          <div>
            <h5 className='text-danger'>
            {errorMessgae}
            </h5>
          </div>
        :
        null
        }
          <p className='fs-4' >Please create account</p>
          <Form noValidate validated={validated} 
          onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" 
              controlId="validationCustom01">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Name"
                  name='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" 
              controlId="validationCustom02">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Phone number"
                  name='phone'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className='mb-3'>
              <Form.Group as={Col} md="6" 
              controlId="validationCustomEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    aria-describedby="inputGroupPrepend"
                    required
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a password.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" 
              controlId="validationCustomPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    aria-describedby="inputGroupPrepend"
                    required
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a password.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Country</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Country" 
                required 
                name='country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid country.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label>City</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="City" 
                required
                name='city'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                 />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" 
              controlId="validationCustomState">
                <Form.Label>State</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="State"
                name='state' 
                required
                value={state}
                onChange={(e) => setState(e.target.value)} 
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" 
              controlId="validationCustomZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Zip" 
                name='zip'
                required
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                 />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid zip.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" 
              controlId="validationCustomApartment">
                <Form.Label>Appartement</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Apartment" 
                required
                name='apartemnt'
                value={apartment}
                onChange={(e) => setApartment(e.target.value)} />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid apartment.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" 
              controlId="validationCustomStreet">
                <Form.Label>Street</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Street" 
                required
                name='street'
                value={street}
                onChange={(e) => setStreet(e.target.value)} />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid street.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div className='text-center mb-5'>
            <Button type="submit"
              className='w-50 py-2'>
              Create account
            </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};


export default Signup;
