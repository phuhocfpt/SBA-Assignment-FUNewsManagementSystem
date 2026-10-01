// src/pages/admin/ReportDashboard.jsx
import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Table, Badge } from "react-bootstrap";
import { mockNews } from "../../common/mockData";

export default function ReportDashboard() {
  const [startDate, setStartDate] = useState("2026-09-01");
  const [endDate, setEndDate] = useState("2026-09-30");

  const filteredNews = mockNews.filter((item) => {
    return item.createdDate >= startDate && item.createdDate <= endDate;
  });

  const totalArticles = filteredNews.length;
  const activeArticles = filteredNews.filter((i) => i.status === 1).length;
  const inactiveArticles = filteredNews.filter((i) => i.status === 0).length;

  return (
    <Container className="py-4">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Báo Cáo & Thống Kê</h2>
        <p className="text-secondary mb-0">Thống kê số lượng bài viết theo khoảng ngày</p>
      </div>

      {/* Bộ chọn khoảng ngày */}
      <Card className="shadow-sm border-0 mb-4 bg-light">
        <Card.Body>
          <Row className="g-3 align-items-end">
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-semibold">Từ ngày:</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-semibold">Đến ngày:</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Button
                variant="primary"
                className="w-100 fw-semibold"
                onClick={() => {
                  setStartDate("2026-09-01");
                  setEndDate("2026-09-30");
                }}
              >
                Đặt Lại Mặc Định
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Thẻ chỉ số tổng quan */}
      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="border-0 shadow-sm bg-primary text-white text-center py-3">
            <Card.Body>
              <h1 className="fw-bold display-4 text-white">{totalArticles}</h1>
              <p className="mb-0 fs-6 text-white-50">Tổng Số Bài Viết</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm bg-success text-white text-center py-3">
            <Card.Body>
              <h1 className="fw-bold display-4 text-white">{activeArticles}</h1>
              <p className="mb-0 fs-6 text-white-50">Bài Viết Hoạt Động</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm bg-secondary text-white text-center py-3">
            <Card.Body>
              <h1 className="fw-bold display-4 text-white">{inactiveArticles}</h1>
              <p className="mb-0 fs-6 text-white-50">Bài Viết Tạm Ẩn</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Bảng chi tiết các bài viết */}
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-white py-3">
          <h5 className="mb-0 fw-bold">Chi Tiết Các Bài Viết</h5>
        </Card.Header>
        <Table responsive hover className="align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Tiêu Đề</th>
              <th>Thể Loại</th>
              <th>Tác Giả</th>
              <th>Ngày Tạo</th>
              <th>Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {filteredNews.length > 0 ? (
              filteredNews.map((news) => (
                <tr key={news.id}>
                  <td>#{news.id}</td>
                  <td className="fw-semibold">{news.title}</td>
                  <td>
                    <Badge bg="info" className="text-dark">
                      {news.categoryName}
                    </Badge>
                  </td>
                  <td>{news.authorName}</td>
                  <td>{news.createdDate}</td>
                  <td>
                    <Badge bg={news.status === 1 ? "success" : "secondary"}>
                      {news.status === 1 ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-muted">
                  Không có bài viết nào trong khoảng thời gian này!
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
