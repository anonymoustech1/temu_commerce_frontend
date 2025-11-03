import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { productsAPI } from '../../services/api'
import ProductCard from '../../components/Products/ProductCard'
import LoadingSpinner from '../../components/UI/LoadingSpinner'

const ProductList = () => {

  const [filters, setFilters] = useState({
    category: '',
    search: '',
    min_price: '',
    max_price: '',
    in_stock: false,
    featured: false,
    ordering: '-created_at'
  })

  const { data, isLoading, isError } = useQuery(
    ['products', filters],
    () => productsAPI.list(filters),
    { keepPreviousData: true }
  )

  const categoriesQuery = useQuery('categories', productsAPI.categories)

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      category: '',
      search: '',
      min_price: '',
      max_price: '',
      in_stock: false,
      featured: false,
      ordering: '-created_at'
    })
  }

  const products = data?.data?.results || []

  const hasFilters = Object.values(filters).some(
    value => value !== '' && value !== false && value !== '-created_at'
  )

  return (
    <Container className="py-4">
      <Row>

        {/* Sidebar */}
        <Col lg={3}>
          <div className="filter-sidebar sticky-top" style={{ top: '100px' }}>
            <h5>Filters</h5>

            <Form.Group className="mb-3">
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {categoriesQuery.data?.data?.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Min Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="0"
                    value={filters.min_price}
                    onChange={(e) => handleFilterChange('min_price', e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Max Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="1000"
                    value={filters.max_price}
                    onChange={(e) => handleFilterChange('max_price', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="In Stock Only"
                checked={filters.in_stock}
                onChange={(e) => handleFilterChange('in_stock', e.target.checked)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Featured Products"
                checked={filters.featured}
                onChange={(e) => handleFilterChange('featured', e.target.checked)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sort By</Form.Label>
              <Form.Select
                value={filters.ordering}
                onChange={(e) => handleFilterChange('ordering', e.target.value)}
              >
                <option value="-created_at">Newest First</option>
                <option value="created_at">Oldest First</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
                <option value="-name">Name: Z to A</option>
              </Form.Select>
            </Form.Group>

            {hasFilters && (
              <Button variant="outline-secondary" onClick={clearFilters} className="w-100">
                Clear Filters
              </Button>
            )}
          </div>
        </Col>

        {/* Products Section */}
        <Col lg={9}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>Products</h4>
            <small className="text-muted">
              Showing {products.length} of {data?.data?.count || 0} products
            </small>
          </div>

          {isLoading ? (
            <LoadingSpinner />
          ) : isError ? (
            <div className="text-center py-5">
              <p className="text-danger">Failed to load products. Please try again.</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-5">
              <p>No products found. Try adjusting your filters.</p>
            </div>
          ) : (
            <Row>
              {products.map(product => (
                <Col key={product.id} lg={4} md={6} className="mb-4">
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </Col>

      </Row>
    </Container>
  )
}

export default ProductList
