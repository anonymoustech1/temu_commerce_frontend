import React, { useState } from 'react'
import { Container, Row, Col, Card, Table, Button, Badge, Form } from 'react-bootstrap'

const VendorOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: 'ORD001',
      customer: 'John Doe',
      email: 'john@example.com',
      total: 99.99,
      status: 'pending',
      paymentStatus: 'paid',
      items: 2,
      date: '2024-01-15'
    },
    {
      id: 2,
      orderNumber: 'ORD002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      total: 149.50,
      status: 'processing',
      paymentStatus: 'paid',
      items: 1,
      date: '2024-01-14'
    },
    {
      id: 3,
      orderNumber: 'ORD003',
      customer: 'Bob Wilson',
      email: 'bob@example.com',
      total: 79.99,
      status: 'shipped',
      paymentStatus: 'paid',
      items: 3,
      date: '2024-01-13'
    }
  ])

  const getStatusVariant = (status) => {
    const variants = {
      pending: 'warning',
      processing: 'info',
      shipped: 'primary',
      delivered: 'success',
      cancelled: 'danger'
    }
    return variants[status] || 'secondary'
  }

  const getPaymentStatusVariant = (status) => {
    const variants = {
      paid: 'success',
      pending: 'warning',
      failed: 'danger',
      refunded: 'secondary'
    }
    return variants[status] || 'secondary'
  }

  const handleStatusUpdate = (orderId, newStatus) => {
    // In real app, you'd make API call here
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h2>Order Management</h2>
          <p className="text-muted">Manage your customer orders</p>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">All Orders</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>
                        <strong>{order.orderNumber}</strong>
                      </td>
                      <td>
                        <div>
                          <strong>{order.customer}</strong>
                          <br />
                          <small className="text-muted">{order.email}</small>
                        </div>
                      </td>
                      <td>{order.date}</td>
                      <td>{order.items}</td>
                      <td>${order.total}</td>
                      <td>
                        <Badge bg={getStatusVariant(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                      <td>
                        <Badge bg={getPaymentStatusVariant(order.paymentStatus)}>
                          {order.paymentStatus}
                        </Badge>
                      </td>
                      <td>
                        <div className="btn-group">
                          <Button size="sm" variant="outline-primary">
                            View
                          </Button>
                          <Form.Select 
                            size="sm" 
                            value={order.status}
                            onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                            style={{ width: 'auto' }}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </Form.Select>
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
    </Container>
  )
}

export default VendorOrders