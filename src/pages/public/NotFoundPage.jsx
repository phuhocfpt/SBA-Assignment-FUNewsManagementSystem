// src/pages/public/NotFoundPage.jsx
import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Container className="py-5 text-center my-auto">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="mb-3">Không Tìm Thấy Trang</h2>
      <p className="text-secondary mb-4">
        Đường dẫn bạn vừa truy cập không tồn tại hoặc đã bị thay đổi.
      </p>
      <Button as={Link} to="/" variant="primary" size="lg">
        Quay Về Trang Chủ
      </Button>
    </Container>
  );
}
