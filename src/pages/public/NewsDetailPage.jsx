// src/pages/public/NewsDetailPage.jsx
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Card, Badge, Button } from "react-bootstrap";
import { mockNews } from "../../common/mockData";

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const article = mockNews.find((item) => item.id === Number(id));

  if (!article) {
    return (
      <Container className="py-5 text-center">
        <h2 className="text-danger mb-3">Không tìm thấy bài viết!</h2>
        <Button as={Link} to="/" variant="primary">
          Quay lại trang chủ
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Button variant="outline-secondary" size="sm" onClick={() => navigate("/")} className="mb-3">
        Quay lại
      </Button>

      <Card className="shadow-sm border-0">
        <Card.Img
          variant="top"
          src={article.image}
          alt={article.title}
          style={{ maxHeight: "450px", objectFit: "cover" }}
        />
        <Card.Body className="p-4 p-md-5">
          <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
            <Badge bg="primary" className="fs-6">
              {article.categoryName}
            </Badge>
            <span className="text-muted">
              Ngày đăng: {article.createdDate}
            </span>
            <span className="text-muted">
              Tác giả: {article.authorName}
            </span>
          </div>

          <h1 className="fw-bold mb-3">{article.title}</h1>
          <p className="lead text-secondary fw-semibold border-start border-4 border-primary ps-3 mb-4">
            {article.headline}
          </p>

          <hr />

          <div className="fs-5 lh-lg text-dark my-4" style={{ whiteSpace: "pre-line" }}>
            {article.content}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
