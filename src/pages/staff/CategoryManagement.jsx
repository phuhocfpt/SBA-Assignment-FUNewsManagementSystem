// src/pages/staff/CategoryManagement.jsx
import React, { useState } from "react";
import { Container, Table, Button, Modal, Form, Card, Badge, Row, Col } from "react-bootstrap";
import { mockCategories } from "../../common/mockData";

export default function CategoryManagement() {
  const [categories, setCategories] = useState(mockCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", status: 1 });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleOpenAdd = () => {
    setModalMode("add");
    setFormData({ name: "", description: "", status: 1 });
    setShowModal(true);
  };

  const handleOpenEdit = (cat) => {
    setModalMode("edit");
    setCurrentId(cat.id);
    setFormData({ name: cat.name, description: cat.description, status: cat.status });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (modalMode === "add") {
      setCategories([
        ...categories,
        { id: Date.now(), name: formData.name, description: formData.description, status: Number(formData.status) }
      ]);
    } else {
      setCategories(
        categories.map((c) =>
          c.id === currentId
            ? { ...c, name: formData.name, description: formData.description, status: Number(formData.status) }
            : c
        )
      );
    }
    setShowModal(false);
  };

  const handleOpenDelete = (cat) => {
    setItemToDelete(cat);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setCategories(categories.filter((c) => c.id !== itemToDelete.id));
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const filteredCategories = categories.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || c.status === Number(filterStatus);
    return matchesSearch && matchesStatus;
  });

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="fw-bold mb-1">Quản Lý Thể Loại</h2>
          <p className="text-secondary mb-0">Quản lý danh sách thể loại tin tức</p>
        </div>
        <Button variant="success" onClick={handleOpenAdd} className="fw-semibold">
          Thêm Thể Loại Mới
        </Button>
      </div>

      <Card className="mb-4 shadow-sm border-0">
        <Card.Body>
          <Row className="g-3">
            <Col md={8}>
              <Form.Control
                placeholder="Tìm kiếm thể loại theo tên, mô tả..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Form.Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow-sm border-0 overflow-hidden">
        <Table responsive hover className="align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th style={{ width: "80px" }}>ID</th>
              <th style={{ width: "220px" }}>Tên Thể Loại</th>
              <th>Mô Tả</th>
              <th style={{ width: "160px" }}>Trạng Thái</th>
              <th className="text-center" style={{ width: "160px" }}>
                Thao Tác
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <tr key={cat.id}>
                  <td>#{cat.id}</td>
                  <td className="fw-bold text-primary">{cat.name}</td>
                  <td className="text-secondary">{cat.description}</td>
                  <td>
                    <Badge bg={cat.status === 1 ? "success" : "secondary"}>
                      {cat.status === 1 ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="text-center">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleOpenEdit(cat)}
                      title="Chỉnh sửa"
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleOpenDelete(cat)}
                      title="Xóa"
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-muted">
                  Không tìm thấy thể loại nào!
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered backdrop="static">
        <Form onSubmit={handleSave}>
          <Modal.Header closeButton>
            <Modal.Title>{modalMode === "add" ? "Thêm Thể Loại" : "Sửa Thể Loại"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Tên Thể Loại *</Form.Label>
              <Form.Control
                type="text"
                placeholder="VD: Technology, Business..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Mô Tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Mô tả chi tiết thể loại..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Trạng Thái</Form.Label>
              <Form.Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: Number(e.target.value) })}
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              {modalMode === "add" ? "Thêm Mới" : "Lưu Thay Đổi"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Xác Nhận Xóa Thể Loại</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa thể loại <strong>"{itemToDelete?.name}"</strong> không?
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
