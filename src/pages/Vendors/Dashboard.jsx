import React from 'react'
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useAuth } from "../../context/AuthContext";


const VendorDashboard = () => {
  const { user } = useAuth()

  // Mock data - in real app, you'd fetch from API
  const dashboardStats = {
    totalProducts: 45,
    totalOrders: 128,
    pendingOrders: 12,
    totalRevenue: 12560.50,
    lowStockProducts: 3
  }

  const recentOrders = [
    { id: 1, orderNumber: 'ORD001', customer: 'John Doe', total: 99.99, status: 'processing', date: '2024-01-15' },
    { id: 2, orderNumber: 'ORD002', customer: 'Jane Smith', total: 149.50, status: 'shipped', date: '2024-01-14' },
    { id: 3, orderNumber: 'ORD003', customer: 'Bob Wilson', total: 79.99, status: 'pending', date: '2024-01-14' }
  ]

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

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h2>Vendor Dashboard</h2>
          <p className="text-muted">Welcome back, {user?.company_name || user?.first_name}!</p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={6} lg={3} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <Card.Title className="text-primary h4">${dashboardStats.totalRevenue.toLocaleString()}</Card.Title>
                  <Card.Text className="text-muted">Total Revenue</Card.Text>
                </div>
                <div className="text-primary h3">💰</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <Card.Title className="text-success h4">{dashboardStats.totalOrders}</Card.Title>
                  <Card.Text className="text-muted">Total Orders</Card.Text>
                </div>
                <div className="text-success h3">📦</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <Card.Title className="text-warning h4">{dashboardStats.pendingOrders}</Card.Title>
                  <Card.Text className="text-muted">Pending Orders</Card.Text>
                </div>
                <div className="text-warning h3">⏳</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <Card.Title className="text-danger h4">{dashboardStats.lowStockProducts}</Card.Title>
                  <Card.Text className="text-muted">Low Stock</Card.Text>
                </div>
                <div className="text-danger h3">⚠️</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Orders */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent Orders</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id}>
                      <td>{order.orderNumber}</td>
                      <td>{order.customer}</td>
                      <td>{order.date}</td>
                      <td>${order.total}</td>
                      <td>
                        <Badge bg={getStatusVariant(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">
                          View
                        </button>
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

export default VendorDashboard