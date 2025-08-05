import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Contact = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-sm border-primary">
            <h3 className="text-primary fw-bold mb-3">📍 Visit Us</h3>
            <p className="mb-1"><strong>Address:</strong> JHANDA CHOWK, Sarsawa, Uttar Pradesh 247232</p>
            <p className="mb-3"><strong>Phone:</strong> <a href="tel:9584534433">7417448827</a></p>
            <iframe
              title="Google Map Location"
              src="https://maps.google.com/maps?q=JHANDA%20CHOWK,%20Sarsawa,%20Uttar%20Pradesh%20247232&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="300"
              style={{ border: "1px solid #ccc", borderRadius: "8px" }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
