import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";

const ProductGrid = ({ products }) => {
  return (
    <Row>
      {products.map((product, index) => (
        <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
          <Card className="h-100 shadow-sm border-0 product-card">
            <div className="position-relative overflow-hidden">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
                className="img-fluid hover-zoom"
              />
              {product.tags?.includes("New Arrival") && (
                <Badge
                  bg="success"
                  className="position-absolute top-0 start-0 m-2 rounded-pill"
                >
                  New Arrival
                </Badge>
              )}
              {product.tags?.includes("Best Seller") && (
                <Badge
                  bg="warning"
                  text="dark"
                  className="position-absolute top-0 end-0 m-2 rounded-pill"
                >
                  Best Seller
                </Badge>
              )}
            </div>
            <Card.Body className="d-flex flex-column">
              <Card.Title className="text-primary fw-semibold">
                {product.name}
              </Card.Title>
              <Card.Text className="mb-1 text-muted">₹{product.price}</Card.Text>
              <Card.Text className="small text-muted">
                Sizes: {product.sizes.join(", ")}
              </Card.Text>
              <div className="mt-auto">
                <a
                  href={`https://wa.me/91XXXXXXXXXX?text=Hi, I am interested in the product: ${product.name}`}
                  className="btn btn-outline-success rounded-pill btn-sm w-100"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📲 Enquire on WhatsApp
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductGrid;




// import React from "react";
// import { Row, Col, Card } from "react-bootstrap";

// const ProductGrid = ({ products }) => (
//   <Row className="g-4">
//     {products.map((item) => (
//       <Col md={4} key={item.id}>
//         <Card className="h-100">
//           <Card.Img variant="top" src={item.image} />
//           <Card.Body>
//             <Card.Title>{item.name}</Card.Title>
//             <Card.Text>
//               <strong>Type:</strong> {item.type}<br />
//               <strong>Sizes:</strong> {item.sizes.join(", ")}<br />
//               <strong>Colors:</strong> {item.colors.join(", ")}<br />
//               <strong>Price:</strong> ₹{item.price}<br />
//               <strong>In Stock:</strong> {item.stock}
//             </Card.Text>
//           </Card.Body>
//         </Card>
//       </Col>
//     ))}
//   </Row>
// );

// export default ProductGrid;
