import React from "react";
import { Row, Col, Form } from "react-bootstrap";

const Filters = ({ setSizeFilter, setAgeFilter }) => (
  <Row className="mb-4 g-3">
    <Col md={6}>
      <Form.Select onChange={(e) => setSizeFilter(e.target.value)} defaultValue="">
        <option value="">All Sizes</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
        <option value="Free Size">Free Size</option>
      </Form.Select>
    </Col>
    <Col md={6}>
      <Form.Select onChange={(e) => setAgeFilter(e.target.value)} defaultValue="">
        <option value="">All Ages</option>
        <option value="Adult">Adult</option>
        <option value="Child">Child</option>
        <option value="All">All</option>
      </Form.Select>
    </Col>
  </Row>
);

export default Filters;
