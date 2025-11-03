import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { link } from 'react-router-dom'
import { useQuery } from "react-query";
import { productsAPI } from "../services/api";
import ProductCard from '../components/Products/ProductCard'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const Home = ()=> {
        const { data: featuredProducts, isloading } = useQuery(
                'featured-product',
                ()=> productsAPI.list({ featured: true, limit: 8})
        )
        return (

                <div>
                        {/* Hero section */}
                        <section className="hero-section">
                                <Container>
                                        <Row className="align-items-center">
                                                <col lg={6}>
                                                <h1 className="display-4 fw-bold mb-4">
                                                        Welcome to Our Temu Commerce
                                                        </h1>
                                                        <p className="lead mb-4">
                                                        Discover amazing products at great prices. Shop with confidence and enjoy fast delivery and excellent customer service.
                                                        </p> 
                                                                <button as={link}
                                                                        to="/products"
                                                                        varient="light"
                                                                        size="lg"
                                                                        >
                                                                         Shop Now
                                                                        
                                                                </button>
                                                </col>
                                                <col lg={6}>
                                                <div className="text-center">
                                                        <img 
                                                        src="/images/hero-image.png" 
                                                        alt="Shopping" 
                                                        className="img-fluid"
                                                        style={{ maxHeight: '400px' }}

                                                        />

                                                </div>
                                                </col>
                                        </Row>
                                </Container>

                        </section>

                        {/* Featured Product */}
                        <section className="py-5">
                                <Container>
                                        <Row className="mb-4">
                                                <col>
                                                <h2 className="text-center">Featured Products</h2>
                                                <p className="text-center text-muted">Check out our most popular products

                                                </p>
                                                </col>
                                        </Row>
                                        {isloading ? (
                                                <LoadingSpinner/>
                                        ) :(
                                                <Row>
                                                        {featuredProducts?.data?.results?.map(product =>(
                                                                <col key={product.id} lg={3} md={6} className="mb-4">
                                                                        <ProductCard product={product}/>
                                                                </col>
                                                        ))}
                                                </Row>
                                        )}
                                        <Row className="mt-4">
                                                <col className="text-center">
                                                <button as={link} to="/products" varient="outline-primary">
                                                View All Products
                                                </button>
                                                </col>
                                        </Row>
                                </Container>

                        </section>

                        {/* Features Section */}
                        <section className="py-5 bg-light">
                                <Container>
                                        <Row>
                                                <col md={4} className="text-container mb-4">
                                                <card className="border-0 bg-transparent">
                                                        <Card.Body>
                                                                <div className="mb-3">
                                                                        <span style={{ fontSize: '3rem'}}>CAR-ICON</span>

                                                                </div>
                                                                <card.Title>Fast Delivery</card.Title>
                                                                <Card.Text>
                                                                        Free shipping on orders over $50. Fast and reliable delivery to your doorstep.
                                                                </Card.Text>
                                                        </Card.Body>
                                                </card>
                                                </col>
                                                <col md={4} className="text-center mb-4">
                                                <Card className="border-0 bg-transparent">
                                                        <Card.Body>
                                                                <div className="mb-3">
                                                                        <span style={{ fontSize: '3rem'}}>LOCK ICON</span>

                                                                </div>
                                                                <Card.Title>Secured Payment</Card.Title>
                                                                <Card.Text>
                                                                        Your payment are safe with us. we use industry-standard encryption to product your data.
                                                                </Card.Text>
                                                        </Card.Body>
                                                </Card>
                                                </col>
                                                <Col md={4} className="text-center mb-4">
                                                <Card className="border-0 bg-transparent">
                                                        <Card.Body>
                                                                <div className="mb-3">
                                                                        <span style={{fontSize: '3rem' }}>100%</span>

                                                                </div>
                                                                <Card.Title>Quality Guarantee</Card.Title>
                                                                <Card.Text>
                                                                        30-day money-back guarantee. We stand behind quality of our products.
                                                                </Card.Text>
                                                        </Card.Body>
                                                </Card>
                                                </Col>
                                        </Row>
                                </Container>
                        </section>
                </div>
        )
}
export default Home