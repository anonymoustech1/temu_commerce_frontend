import React from 'react'
import { Navbar, Nav, Container, Badge, Dropdown } from 'react-bootstrap'
import { link, useNavigate } from 'react-router-dom'
import { useAuth } from  '../../context/AuthContext'
import { useCart } from '../../context/AuthContext'
import './Header.css'

const handlelogout = () => {
        logout()
        navigate('/')
}
return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Container>
                        <Navbar.Brand as={link} to="/">
                        Temu Commerce
                        </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                        <nav className='me-auto'>
                                <nav.link as={link} to="/">Home</nav.link>
                                <nav.link as={link} to="/products">Products</nav.link>
                                <nav.link as={link} to="/categories">Categories</nav.link>
                        </nav>

                        <Nav>
                                {isAuthenticated ? (
                                        <>
                                        <nav.link as={link} to="/cart" className="position-relative">
                                        Cart
                                        {cartItemsCount > 0 && (
                                                <Badge bg="danger" className="cart-badge">
                                                        {cartItemsCount}
                                                </Badge>
                                        )}
                                        </nav.link>   

                                        <Dropdown align="end">
                                                <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                                                        {user?.first_name || user?.email}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                        <Dropdown.Item as={link} to="/profile">
                                                        Profile
                                                        </Dropdown.Item>
                                                        <Dropdown.Item as={link} to="/orders">
                                                        My Orders
                                                        </Dropdown.Item>
                                                        {user?.user_type === 'vendor' && (
                                                        <Dropdown.Item as={link} to="/vendor/dashboard">
                                                                Vendor Dashboard 
                                                        </Dropdown.Item>
                                                        )}
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item onClick={handleLogout}>
                                                                Logout
                                                        </Dropdown.Item>
                                                </Dropdown.Menu>
                                        </Dropdown>
                                        </>
                                ):(
                                        <>
                                        <nav.link as={link} to="/login">Login</nav.link>
                                        <nav.link as={link} to="/register">Register</nav.link>
                                        </>
                                )}
                        </Nav>
                </Navbar.Collapse>
                </Container>

        </Navbar>
)

export default Header