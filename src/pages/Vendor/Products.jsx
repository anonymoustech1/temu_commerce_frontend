import React, { useState } from 'react'
import { Container, Row, Col, Card, Table, Button, Badge, Form, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const VendorProducts = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'Wireless Headphones', 
      sku: 'WH-001', 
      price: 99.99, 
      stock: 45, 
      status: 'active', 
      featured: true,
      createdAt: '2024-01-10'
    },
    { 
      id: 2, 
      name: 'Smart Watch', 
      sku: 'SW-001', 
      price: 199.99, 
      stock: 23, 
      status: 'active', 
      featured: false,
      createdAt: '2024-01-12'
    },
    { 
      id: 3, 
      name: 'Phone Case', 
      sku: 'PC-001', 
      price: 24.99, 
      stock: 0, 
      status: 'out_of_stock', 
      featured: false,
      createdAt: '2024-01-08'
    }
  ])

  const getStatusVariant = (status) => {
    const variants = {
      active: 'success',
      draft: 'secondary',
      inactive: 'warning',
      out_of_stock: 'danger'
    }
    return variants[status] || 'secondary'
  }

  const getStockVariant = (stock) => {
    if (stock === 0) return 'danger'
    if (stock < 10) return 'warning'
    return 'success'
  }

  const handleAddProduct = (e) => {
    e.preventDefault()
    // In real app, you'd make API call here
    setShowAddModal(false)
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2>My Products</h2>
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              Add Product
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Product List</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Featured</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td>
                        <strong>{product.name}</strong>
                      </td>
                      <td>{product.sku}</td>
                      <td>${product.price}</td>
                      <td>
                        <Badge bg={getStockVariant(product.stock)}>
                          {product.stock}
                        </Badge>
                      </td>
                      <td>
                        <Badge bg={getStatusVariant(product.status)}>
                          {product.status.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td>
                        {product.featured ? '⭐' : '—'}
                      </td>
                      <td>{product.createdAt}</td>
                      <td>
                        <div className="btn-group">
                          <Button size="sm" variant="outline-primary">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline-danger">
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add Product Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddProduct}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter product name" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>SKU</Form.Label>
                  <Form.Control type="text" placeholder="Enter SKU" required />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" step="0.01" placeholder="0.00" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Compare Price</Form.Label>
                  <Form.Control type="number" step="0.01" placeholder="0.00" />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Product description" />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock Quantity</Form.Label>
                  <Form.Control type="number" placeholder="0" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select>
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Featured product" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add Product
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}

export default VendorProducts