import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { FaCartPlus } from "react-icons/fa";
import { useEffect, useState } from 'react';
import axios from 'axios';

function AppNav() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const isAdmin = localStorage.getItem('isAdmin');
    const [cartCount, setCartCount] = useState(0);
    const handleLogout = () => {
        localStorage.clear();
        navigate('/')
        navigate(0)
    }
    const getCartCount = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/eshop/api/carts/get/usercarts/${userId}`)
            if (response.status == 200) {
                const { data } = response;
                setCartCount([data].length);
            } else {
                setCartCount(0)
            }
        } catch (error) {
            setCartCount(0)
        }
    }
    useEffect(() => {
        if (userId) {
            getCartCount()
        }
    }, [cartCount])
    return (
        <Navbar collapseOnSelect expand="lg"
            style={{
                backgroundColor: '#FCE4EC',
                borderBottom: '3px solid grey'
            }}
            sticky='top'>
            <Container className='px-0'>
                <Navbar.Brand to='/' className='heading'
                    style={{ cursor: 'pointer' }}>
                    Shopping-Online
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav className="me-auto ms-auto">
                        <Link to='/' className='linkHover'>
                            Home
                        </Link>
                        <Link to='/about' className='linkHover'>
                            About
                        </Link>
                        <Link to='/blogs' className='linkHover'>
                            Blog
                        </Link>
                        {
                            isAdmin == 'ADMIN_USER' && (
                                <Link to='/order-management' className='linkHover'>
                                    Dashboard
                                </Link>
                            )
                        }
                    </Nav>
                    <Nav className='ml-auto'>
                        {
                            token ?
                                (
                                    <>
                                        {
                                            isAdmin !== 'ADMIN_USER' && (
                                                <Link to={`/carts/${userId}`}
                                                    className='d-flex nav-link'>
                                                    <FaCartPlus className='fs-1 text-white background rounded-circle p-2' />
                                                    <span className="badge badge-info">
                                                        {cartCount}
                                                    </span>
                                                </Link>
                                            )
                                        }
                                        <Link onClick={handleLogout}
                                            className='linkHover w-100 fw-bold shadow-lg text-dark border nav-link rounded px-5'>
                                            Logout
                                        </Link>
                                    </>
                                )
                                :
                                (
                                    <Link to='/login'>
                                        <Button
                                            className='w-100 bg-white text-dark border rounded-pill'
                                        >
                                            Login
                                        </Button>
                                    </Link>
                                )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppNav;