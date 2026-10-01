// src/pages/staff/NewsManagement.jsx
import React, { useState, useContext, useEffect } from "react";
import { Container, Table, Button, Badge, Modal, Form, Row, Col, Card, InputGroup, Spinner, Alert } from "react-bootstrap";
import { mockNews, mockCategories } from "../../common/mockData";
import { AuthContext } from "../../context/AuthContext";

export default function NewsManagement() {
  const { currentUser } = useContext(AuthContext);
  const [allNews, setAllNews] = useState(mockNews);
  const [displayedNews, setDisplayedNews] = useState(mockNews);

  // Search & Filter State
  const [searchInput, setSearchInput] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modal State (Thêm/Sửa)
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentNewsId, setCurrentNewsId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    headline: "",
    content: "",
    categoryId: 1,
    status: 1,
    image: "https://picsum.photos/seed/default/600/350"
  });

  // Modal Xóa
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const executeSearch = async (keyword = searchInput, category = filterCategory, status = filterStatus) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 250));

      const query = keyword.trim().toLowerCase();

      const results = allNews.filter((item) => {
        const matchesSearch =
          !query ||
          item.title.toLowerCase().includes(query) ||
          item.headline.toLowerCase().includes(query);

        const matchesCategory =
          category === "all" || item.categoryId === Number(category);

        const matchesStatus =
          status === "all" || item.status === Number(status);

        return matchesSearch && matchesCategory && matchesStatus;
      });

      setDisplayedNews(results);

      if (results.length === 0) {
        setError("Không tìm thấy bài viết nào!");
      }
    } catch (err) {
      console.error("Search failed:", err);
      setDisplayedNews([]);
      setError("Lỗi trong quá trình tìm kiếm bài viết.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    executeSearch("", "all", "all");
  }, [allNews]);

  const handleSearch = (e) => {
    e.preventDefault();
    executeSearch(searchInput, filterCategory, filterStatus);
  };

  const handleCategoryChange = (e) => {
    const newCat = e.target.value;
    setFilterCategory(newCat);
    executeSearch(searchInput, newCat, filterStatus);
  };

  const handleStatusChange = (e) => {
    const newStat = e.target.value;
    setFilterStatus(newStat);
    executeSearch(searchInput, filterCategory, newStat);
  };

  // Mở Modal Thêm mới
  const handleOpenAdd = () => {
    setModalMode("add");
    setFormData({
      title: "",
      headline: "",
      content: "",
      categoryId: 1,
      status: 1,
      image: `https://picsum.photos/seed/${Date.now()}/600/350`
    });
    setShowModal(true);
  };

  // Mở Modal Sửa
  const handleOpenEdit = (item) => {
    setModalMode("edit");
    setCurrentNewsId(item.id);
    setFormData({
      title: item.title,
      headline: item.headline,
      content: item.content,
      categoryId: item.categoryId,
      status: item.status,
      image: item.image
    });
    setShowModal(true);
  };

  // Xử lý lưu form (Thêm / Sửa)
  const handleSave = (e) => {
    e.preventDefault();
    const category = mockCategories.find((c) => c.id === Number(formData.categoryId));

    if (modalMode === "add") {
      const newArticle = {
        id: Date.now(),
        ...formData,
        categoryId: Number(formData.categoryId),
        categoryName: category?.name || "Uncategorized",
        status: Number(formData.status),
        authorId: currentUser?.id || 2,
        authorName: currentUser?.name || "Nguyễn Đình Phú",
        createdDate: new Date().toISOString().split("T")[0]
      };
      setAllNews([newArticle, ...allNews]);
    } else {
      setAllNews(
        allNews.map((item) =>
          item.id === currentNewsId
            ? {
                ...item,
                ...formData,
                categoryId: Number(formData.categoryId),
                categoryName: category?.name || item.categoryName,
                status: Number(formData.status)
              }
            : item
        )
      );
    }
    setShowModal(false);
  };

  // Xử lý xóa
  const handleConfirmDelete = () => {
    setAllNews(allNews.filter((item) => item.id !== itemToDelete.id));
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="fw-bold mb-1">Quản Lý Bài Viết</h2>
          <p className="text-secondary mb-0">Quản lý và xuất bản các bài viết tin tức</p>
        </div>
        <Button variant="success" onClick={handleOpenAdd} className="fw-semibold">
          Thêm Bài Viết Mới
        </Button>
      </div>

      {/* Form tìm kiếm & bộ lọc */}
      <Card className="mb-4 shadow-sm border-0">
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <Row className="g-3">
              <Col md={6}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Nhập tiêu đề tìm kiếm (ấn Enter để tìm)..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : "Tìm Kiếm"}
                  </Button>
                </InputGroup>
              </Col>
              <Col md={3}>
                <Form.Select
                  value={filterCategory}
                  onChange={handleCategoryChange}
                  disabled={loading}
                >
                  <option value="all">Tất cả thể loại</option>
                  {mockCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Select
                  value={filterStatus}
                  onChange={handleStatusChange}
                  disabled={loading}
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </Form.Select>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {error && !loading && <Alert variant="warning">{error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-muted">Đang tải danh sách bài viết...</p>
        </div>
      ) : (
        <Card className="shadow-sm border-0 overflow-hidden">
          <Table responsive hover className="align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th style={{ width: "80px" }}>Ảnh</th>
                <th>Tiêu Đề & Tóm Tắt</th>
                <th>Thể Loại</th>
                <th>Tác Giả</th>
                <th>Ngày Tạo</th>
                <th>Trạng Thái</th>
                <th className="text-center" style={{ width: "180px" }}>
                  Thao Tác
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedNews.length > 0 ? (
                displayedNews.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="rounded"
                        style={{ width: "60px", height: "45px", objectFit: "cover" }}
                      />
                    </td>
                    <td>
                      <div className="fw-bold">{item.title}</div>
                      <small className="text-muted text-truncate d-block" style={{ maxWidth: "350px" }}>
                        {item.headline}
                      </small>
                    </td>
                    <td>
                      <Badge bg="info" className="text-dark">
                        {item.categoryName}
                      </Badge>
                    </td>
                    <td>{item.authorName}</td>
                    <td>{item.createdDate}</td>
                    <td>
                      <Badge bg={item.status === 1 ? "success" : "secondary"}>
                        {item.status === 1 ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="text-center">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleOpenEdit(item)}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => {
                          setItemToDelete(item);
                          setShowDeleteModal(true);
                        }}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">
                    Không tìm thấy bài viết nào!
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      )}

      {/* Modal Thêm / Sửa */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" backdrop="static">
        <Form onSubmit={handleSave}>
          <Modal.Header closeButton>
            <Modal.Title>{modalMode === "add" ? "Thêm Bài Viết Mới" : "Chỉnh Sửa Bài Viết"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Tiêu đề bài viết *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tiêu đề tin tức..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Tiêu đề phụ / Tóm tắt (Headline) *</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Tóm tắt ngắn gọn nội dung..."
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                required
              />
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Thể loại (Category) *</Form.Label>
                  <Form.Select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  >
                    {mockCategories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Trạng thái</Form.Label>
                  <Form.Select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: Number(e.target.value) })}
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Nội dung chi tiết (Content) *</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Nhập toàn bộ nội dung bài viết..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Hủy Bỏ
            </Button>
            <Button variant="primary" type="submit">
              {modalMode === "add" ? "Tạo Bài Viết" : "Lưu Thay Đổi"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal Xác nhận Xóa */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Xác Nhận Xóa Bài Viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa bài viết: <strong>"{itemToDelete?.title}"</strong> không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Xác Nhận Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
