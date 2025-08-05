import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Offcanvas,
  Nav
} from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import ProductGrid from "./components/ProductGrid";
import CategoryTabs from "./components/CategoryTabs";
import Filters from "./components/Filters";
import Contact from "./pages/Contact";
import productData from "./data/products.json";

const products = productData;

const categories = {
  Male: ["Uppers", "Lowers", "Undergarments", "Night wears"],
  Female: ["Uppers", "Lowers", "Undergarments", "Night wears"],
  Children: ["Undergarments", "Dresses and Suits", "Shoes", "Blanket"],
  Others: ["Towels", "Hand Towel", "Hanky", "Socks"]
};

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("Male");
  const [selectedSubsection, setSelectedSubsection] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  const subcategories = categories[selectedCategory];

  let filteredProducts = products.filter(
    (product) =>
      product.category === selectedCategory &&
      (!selectedSubsection || product.type === selectedSubsection) &&
      (sizeFilter ? product.sizes.includes(sizeFilter) : true) &&
      (ageFilter ? product.age === ageFilter : true) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOption === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "name") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  const Home = () => (
    <Container fluid className="py-4">
      <Row>
        <Col xs={12} className="d-md-none text-end mb-3 px-4">
          <Button variant="outline-primary" onClick={() => setShowSidebar(true)} className="rounded-pill">
            ☰ Categories
          </Button>
        </Col>

        <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} responsive="md">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Categories</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {Object.keys(categories).map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "primary" : "outline-primary"}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedSubsection("");
                  setShowSidebar(false);
                }}
                className="mb-2 w-100 rounded-pill"
              >
                {cat}
              </Button>
            ))}
          </Offcanvas.Body>
        </Offcanvas>

        <Col md={10} className="py-4 px-4 px-md-5">
          <h1 className="mb-4 text-center fw-bold text-primary" style={{ fontFamily: 'Poppins, sans-serif' }}>
            🧵 SHREE JI COLLECTION
          </h1>

          <Form.Control
            className="mb-4 shadow-sm rounded-pill px-4 border border-primary"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="mb-4 d-flex gap-2 flex-wrap justify-content-center">
            {subcategories.map((sub) => (
              <Button
                key={sub}
                variant={selectedSubsection === sub ? "primary" : "outline-primary"}
                onClick={() => setSelectedSubsection(sub)}
                className="rounded-pill shadow-sm"
              >
                {sub}
              </Button>
            ))}
          </div>

          <Row className="mb-4 align-items-center">
            <Col md={6}>
              <Filters setSizeFilter={setSizeFilter} setAgeFilter={setAgeFilter} />
            </Col>
            <Col md={6} className="text-end">
              <Form.Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-auto d-inline-block rounded-pill shadow-sm border-primary"
              >
                <option value="">Sort By</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name (A-Z)</option>
              </Form.Select>
            </Col>
          </Row>

          {selectedSubsection ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            subcategories.map((sub) => {
              const subsectionProducts = filteredProducts.filter(p => p.type === sub);
              return (
                subsectionProducts.length > 0 && (
                  <div key={sub} className="mb-5">
                    <h4 className="fw-bold mb-3 text-secondary border-bottom pb-2">{sub}</h4>
                    <ProductGrid products={subsectionProducts} />
                  </div>
                )
              );
            })
          )}
        </Col>
      </Row>
    </Container>
  );

  return (
    <Router>
      <Nav className="bg-primary text-white px-4 py-2 justify-content-between align-items-center">
        <div className="fw-bold">🧵 ShreeJi Clothing</div>
        <div>
          <Link to="/" className="text-white me-4 text-decoration-none">Home</Link>
          <Link to="/contact" className="text-white text-decoration-none">Contact</Link>
        </div>
      </Nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
