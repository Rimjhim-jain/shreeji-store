import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Offcanvas
} from "react-bootstrap";
import ProductGrid from "../components/ProductGrid";
import Filters from "../components/Filters";
import logo from "../assets/logo.jpeg";
import productData from "../data/products.json";

const categories = {
  Male: ["Uppers", "Lowers", "Undergarments", "Night wears"],
  Female: ["Uppers", "Lowers", "Undergarments", "Night wears"],
  Children: ["Undergarments", "Dresses and Suits", "Shoes", "Blanket"],
  Others: ["Towels", "Hand Towel", "Hanky", "Socks"]
};

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubsection, setSelectedSubsection] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const products = productData;
  const subcategories = categories[selectedCategory] || [];

  // Watch screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Set default category for desktop
  useEffect(() => {
    if (!isMobile && selectedCategory === "") {
      setSelectedCategory("Male");
    }
  }, [isMobile, selectedCategory]);

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

  return (
    <Container fluid className="py-4">
      <Row>
        <Col xs={12} className="d-md-none text-end mb-3 px-4">
          <Button
            variant="outline-light"
            onClick={() => setShowSidebar(true)}
            className="rounded-pill border-warning text-dark"
          >
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

        <Col className="py-4 px-4 px-md-5">
          <div className="text-center mb-4">
            <img
              src={logo}
              alt="Shree Ji Logo"
              height="90"
              className="mb-2 border border-warning p-1 rounded-circle"
            />
            <h1 className="fw-bold" style={{ fontFamily: 'Poppins, sans-serif', color: '#0C1E3B' }}>
              🧵 SHREE JI COLLECTION
            </h1>
            <p className="text-muted">Complete Family Wear Destination</p>
          </div>

          <Form.Control
            className="mb-4 shadow-sm rounded-pill px-4 border border-warning"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="mb-4 d-flex gap-2 flex-wrap justify-content-center">
            {subcategories.map((sub) => (
              <Button
                key={sub}
                variant={selectedSubsection === sub ? "dark" : "outline-dark"}
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
                className="w-auto d-inline-block rounded-pill shadow-sm border-warning"
              >
                <option value="">Sort By</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name (A-Z)</option>
              </Form.Select>
            </Col>
          </Row>
       
        {selectedCategory === "" ? (
            <div className="text-center">
                <h5 className="text-secondary mb-4">Please select a category to get started:</h5>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                {Object.keys(categories).map((cat) => (
                    <Button
                    key={cat}
                    variant="outline-warning"
                    onClick={() => setSelectedCategory(cat)}
                    className="rounded-pill px-4"
                    >
                    {cat}
                    </Button>
                ))}
                </div>
            </div>
            ) : selectedSubsection ? (
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

        {filteredProducts.length === 0 && (
            <div className="text-center text-muted mt-5">
                No products found.
            </div>
        )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;





// import React from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Button,
//   Form,
//   Offcanvas
// } from "react-bootstrap";
// import ProductGrid from "../components/ProductGrid";
// import Filters from "../components/Filters";
// import logo from "../assets/logo.jpeg";
// import productData from "../data/products.json";
// import { useEffect, useState } from "react";

// const isMobile = window.innerWidth <= 768;


// const categories = {
//   Male: ["Uppers", "Lowers", "Undergarments", "Night wears"],
//   Female: ["Uppers", "Lowers", "Undergarments", "Night wears"],
//   Children: ["Undergarments", "Dresses and Suits", "Shoes", "Blanket"],
//   Others: ["Towels", "Hand Towel", "Hanky", "Socks"]
// };

// const products = productData;


// const Home = ({
//   selectedCategory,
//   setSelectedCategory,
//   selectedSubsection,
//   setSelectedSubsection,
//   sizeFilter,
//   setSizeFilter,
//   ageFilter,
//   setAgeFilter,
//   searchTerm,
//   setSearchTerm,
//   sortOption,
//   setSortOption,
//   showSidebar,
//   setShowSidebar
// }) => {
//   const subcategories = categories[selectedCategory];

//   let filteredProducts = products.filter(
//     (product) =>
//       product.category === selectedCategory &&
//       (!selectedSubsection || product.type === selectedSubsection) &&
//       (sizeFilter ? product.sizes.includes(sizeFilter) : true) &&
//       (ageFilter ? product.age === ageFilter : true) &&
//       product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (sortOption === "price-asc") {
//     filteredProducts.sort((a, b) => a.price - b.price);
//   } else if (sortOption === "price-desc") {
//     filteredProducts.sort((a, b) => b.price - a.price);
//   } else if (sortOption === "name") {
//     filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
//   }

//   return (
//     <Container fluid className="py-4">
//       <Row>
//         <Col xs={12} className="d-md-none text-end mb-3 px-4">
//           <Button
//             variant="outline-light"
//             onClick={() => setShowSidebar(true)}
//             className="rounded-pill border-warning text-dark"
//           >
//             ☰ Categories
//           </Button>
//         </Col>

//         <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} responsive="md">
//           <Offcanvas.Header closeButton>
//             <Offcanvas.Title>Categories</Offcanvas.Title>
//           </Offcanvas.Header>
//           <Offcanvas.Body>
//             {Object.keys(categories).map((cat) => (
//               <Button
//                 key={cat}
//                 variant={selectedCategory === cat ? "primary" : "outline-primary"}
//                 onClick={() => {
//                   setSelectedCategory(cat);
//                   setSelectedSubsection("");
//                   setShowSidebar(false);
//                 }}
//                 className="mb-2 w-100 rounded-pill"
//               >
//                 {cat}
//               </Button>
//             ))}
//           </Offcanvas.Body>
//         </Offcanvas>

//         <Col className="py-4 px-4 px-md-5">
//           <div className="text-center mb-4">
//             <img
//               src={logo}
//               alt="Shree Ji Logo"
//               height="90"
//               className="mb-2 border border-warning p-1 rounded-circle"
//             />
//             <h1 className="fw-bold" style={{ fontFamily: 'Poppins, sans-serif', color: '#0C1E3B' }}>
//               🧵 SHREE JI COLLECTION
//             </h1>
//             <p className="text-muted">Complete Family Wear Destination</p>
//           </div>

//           <Form.Control
//             className="mb-4 shadow-sm rounded-pill px-4 border border-warning"
//             placeholder="Search for products..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />

//           <div className="mb-4 d-flex gap-2 flex-wrap justify-content-center">
//             {subcategories.map((sub) => (
//               <Button
//                 key={sub}
//                 variant={selectedSubsection === sub ? "dark" : "outline-dark"}
//                 onClick={() => setSelectedSubsection(sub)}
//                 className="rounded-pill shadow-sm"
//               >
//                 {sub}
//               </Button>
//             ))}
//           </div>

//           <Row className="mb-4 align-items-center">
//             <Col md={6}>
//               <Filters setSizeFilter={setSizeFilter} setAgeFilter={setAgeFilter} />
//             </Col>
//             <Col md={6} className="text-end">
//               <Form.Select
//                 value={sortOption}
//                 onChange={(e) => setSortOption(e.target.value)}
//                 className="w-auto d-inline-block rounded-pill shadow-sm border-warning"
//               >
//                 <option value="">Sort By</option>
//                 <option value="price-asc">Price: Low to High</option>
//                 <option value="price-desc">Price: High to Low</option>
//                 <option value="name">Name (A-Z)</option>
//               </Form.Select>
//             </Col>
//           </Row>

//           {selectedSubsection ? (
//             <ProductGrid products={filteredProducts} />
//           ) : (
//             subcategories.map((sub) => {
//               const subsectionProducts = filteredProducts.filter(p => p.type === sub);
//               return (
//                 subsectionProducts.length > 0 && (
//                   <div key={sub} className="mb-5">
//                     <h4 className="fw-bold mb-3 text-secondary border-bottom pb-2">{sub}</h4>
//                     <ProductGrid products={subsectionProducts} />
//                   </div>
//                 )
//               );
//             })
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Home;
