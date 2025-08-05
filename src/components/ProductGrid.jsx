import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const ProductGrid = ({ products }) => (
  <Row className="g-4">
    {products.map((item) => (
      <Col md={4} key={item.id}>
        <Card className="h-100">
          <Card.Img variant="top" src={item.image} />
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
              <strong>Type:</strong> {item.type}<br />
              <strong>Sizes:</strong> {item.sizes.join(", ")}<br />
              <strong>Colors:</strong> {item.colors.join(", ")}<br />
              <strong>Price:</strong> ₹{item.price}<br />
              <strong>In Stock:</strong> {item.stock}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
);

export default ProductGrid;
