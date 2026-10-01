// src/pages/admin/AccountManagement.jsx
import React, { useState, useEffect } from "react";
import { Container, Table, Button, Badge, Modal, Form, Card, InputGroup, Row, Col, Spinner, Alert } from "react-bootstrap";
import { mockAccounts } from "../../common/mockData";

export default function AccountManagement() {
  const [allAccounts, setAllAccounts] = useState(mockAccounts);
  const [displayedAccounts, setDisplayedAccounts] = useState(mockAccounts);

  const [searchInput, setSearchInput] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
    role: 2
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const executeSearch = async (keyword = searchInput, role = filterRole) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const query = keyword.trim().toLowerCase();

      const results = allAccounts.filter((acc) => {
        const matchesSearch =
          !query ||
          acc.username.toLowerCase().includes(query) ||
          acc.name.toLowerCase().includes(query);

        const matchesRole =
          role === "all" || acc.role === Number(role);

        return matchesSearch && matchesRole;
      });

      setDisplayedAccounts(results);

      if (results.length === 0) {
        setError("Không tìm thấy tài khoản nào phù hợp!");
      }
    } catch (err) {
      console.error("Search failed:", err);
      setDisplayedAccounts([]);
      setError("Lỗi trong quá trình tìm kiếm tài khoản.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    executeSearch("", "all");
  }, [allAccounts]);

  const handleSearch = (e) => {
    e.preventDefault();
    executeSearch(searchInput, filterRole);
  };

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setFilterRole(newRole);
    executeSearch(searchInput, newRole);
  };

  const handleOpenAdd = () => {
    setModalMode("add");
    setFormData({ username: "", name: "", password: "", role: 2 });
    setShowModal(true);
  };

  const handleOpenEdit = (acc) => {
    setModalMode("edit");
    setCurrentId(acc.id);
    setFormData({
      username: acc.username,
      name: acc.name,
      password: acc.password,
      role: acc.role
    });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (modalMode === "add") {
      setAllAccounts([
        ...allAccounts,
        { id: Date.now(), ...formData, role: Number(formData.role) }
      ]);
    } else {
      setAllAccounts(
        allAccounts.map((a) =>
          a.id === currentId ? { ...a, ...formData, role: Number(formData.role) } : a
        )
      );
    }
    setShowModal(false);
  };

  const handleOpenDelete = (acc) => {
    setItemToDelete(acc);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setAllAccounts(allAccounts.filter((a) => a.id !== itemToDelete.id));
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="fw-bold mb-1">Quản Lý Tài Khoản</h2>
          <p className="text-secondary mb-0">Quản trị danh sách tài khoản và phân quyền người dùng</p>
        </div>
        <Button variant="success" onClick={handleOpenAdd} className="fw-semibold">
          Tạo Tài Khoản Mới
        </Button>
      </div>

      {/* Form tìm kiếm và lọc */}
      <Card className="mb-4 shadow-sm border-0">
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <Row className="g-3">
              <Col md={8}>
                <InputGroup>
                  <Form.Control
                    placeholder="Tìm kiếm tài khoản theo username, họ tên (ấn Enter để tìm)..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : "Tìm Kiếm"}
                  </Button>
                </InputGroup>
              </Col>


              <Col md={4}>
                <Form.Select
                  value={filterRole}
                  onChange={handleRoleChange}
                  disabled={loading}
                >
                  <option value="all">Tất cả vai trò</option>
                  <option value="1">Admin</option>
                  <option value="2">Staff</option>
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
          <p className="mt-2 text-muted">Đang tải danh sách tài khoản...</p>
        </div>
      ) : (
        <Card className="shadow-sm border-0 overflow-hidden">
          <Table responsive hover className="align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th style={{ width: "80px" }}>ID</th>
                <th>Tên Đăng Nhập (Username)</th>
                <th>Họ Và Tên</th>
                <th>Vai Trò</th>
                <th className="text-center" style={{ width: "160px" }}>
                  Thao Tác
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedAccounts.length > 0 ? (
                displayedAccounts.map((acc) => (
                  <tr key={acc.id}>
                    <td>#{acc.id}</td>
                    <td className="fw-bold text-primary">{acc.username}</td>
                    <td className="fw-semibold">{acc.name}</td>
                    <td>
                      <Badge bg={acc.role === 1 ? "danger" : "success"}>
                        {acc.role === 1 ? "Admin" : "Staff"}
                      </Badge>
                    </td>
                    <td className="text-center">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleOpenEdit(acc)}
                        title="Chỉnh sửa"
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleOpenDelete(acc)}
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
                    Không tìm thấy tài khoản nào!
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      )}

      {/* Modal Popup Thêm / Sửa Account */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered backdrop="static">
        <Form onSubmit={handleSave}> {/* Save tại đây khi ấn gửi thì formData đổi giá trị -> Gán vào edit */}
          <Modal.Header closeButton>
            <Modal.Title>{modalMode === "add" ? "Tạo Tài Khoản Mới" : "Sửa Thông Tin Tài Khoản"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Tên đăng nhập (Username) *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập username..."
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Họ và Tên *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập họ và tên..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Mật khẩu *</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu..."
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Vai trò</Form.Label>
              <Form.Select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: Number(e.target.value) })}
              >
                <option value={1}>Admin</option>
                <option value={2}>Staff</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              {modalMode === "add" ? "Tạo Tài Khoản" : "Lưu Thay Đổi"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal Prompt Xác Nhận Xóa */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Xác Nhận Xóa Tài Khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa tài khoản <strong>"{itemToDelete?.username}"</strong> ({itemToDelete?.name}) không?
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
