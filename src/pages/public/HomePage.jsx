// src/pages/public/HomePage.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Badge, Button, InputGroup, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { mockNews, mockCategories } from "../../common/mockData";

export default function HomePage() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [displayedNews, setDisplayedNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeSearch = async (keyword = searchInput, category = selectedCategory) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const query = keyword.trim().toLowerCase();

      const results = mockNews.filter((item) => {
        const isActive = item.status === 1;

        const matchesSearch =
          !query ||
          item.title.toLowerCase().includes(query) ||
          item.headline.toLowerCase().includes(query);

        const matchesCat =
          category === "all" || item.categoryId === Number(category);

        return isActive && matchesSearch && matchesCat;
      });

      setDisplayedNews(results);

      if (results.length === 0) {
        setError("Không tìm thấy bài viết nào phù hợp!");
      }
    } catch (err) {
      console.error("Search failed:", err);
      setDisplayedNews([]);
      setError("Đã xảy ra lỗi khi tìm kiếm bài viết.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    executeSearch("", "all");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    executeSearch(searchInput, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    const newCat = e.target.value;
    setSelectedCategory(newCat);
    executeSearch(searchInput, newCat);
  };

  const handleReset = () => {
    setSearchInput("");
    setSelectedCategory("all");
    executeSearch("", "all");
  };

  return (
    <Container className="py-4">
      {/* Banner */}
      <div className="p-4 mb-4 bg-primary text-white rounded-3 shadow-sm">
        <h1 className="fw-bold text-white mb-2">Cổng Thông Tin Tin Tức FU News</h1>
        <p className="fs-5 mb-0 text-white-50">
          Cập nhật những tin tức mới nhất về công nghệ, giáo dục, sự kiện và đời sống sinh viên.
        </p>
      </div>

      {/* Form tìm kiếm & Bộ lọc */}
      <Card className="mb-4 shadow-sm border-0 bg-light">
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <Row className="g-3 align-items-center">
              <Col md={7}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Nhập từ khóa tìm kiếm (ấn Enter để tìm)..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : "Tìm Kiếm"}
                  </Button>
                </InputGroup>
              </Col>

              <Col md={5}>
                <Form.Select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  disabled={loading}
                >
                  <option value="all">Tất cả thể loại</option>
                  {mockCategories
                    .filter((cat) => cat.status === 1)
                    .map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                </Form.Select>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Thông báo lỗi */}
      {error && !loading && (
        <Alert variant="warning" className="d-flex justify-content-between align-items-center">
          <span>{error}</span>
          <Button variant="outline-warning" size="sm" onClick={handleReset} className="text-dark">
            Đặt lại bộ lọc
          </Button>
        </Alert>
      )}

      {/* Trạng thái loading */}
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-muted">Đang tải tin tức...</p>
        </div>
      )}

      {/* Danh sách bài viết */}
      {!loading && (
        <Row className="g-4">
          {displayedNews.map((news) => (
            <Col key={news.id} md={6} lg={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Img
                  variant="top"
                  src={news.image}
                  alt={news.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Badge bg="info" className="text-dark">
                      {news.categoryName}
                    </Badge>
                    <small className="text-muted">
                      {news.createdDate}
                    </small>
                  </div>
                  <Card.Title className="fs-5 fw-bold">
                    {news.title}
                  </Card.Title>
                  <Card.Text className="text-secondary flex-grow-1">
                    {news.headline}
                  </Card.Text>

                  <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
                    <small className="text-secondary">
                      {news.authorName}
                    </small>

                    <Button
                      as={Link}
                      to={`/news/${news.id}`}
                      variant="outline-primary"
                      size="sm"
                    >
                      Đọc chi tiết →
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
