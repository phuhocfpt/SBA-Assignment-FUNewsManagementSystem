import React, { useState, useContext } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const result = login(username, password);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card className="shadow-sm border-0" style={{ maxWidth: "420px", width: "100%" }}>
        <Card.Body className="p-4 p-md-5">
          <div className="text-center mb-4">
            <h3 className="fw-bold">Đăng Nhập</h3>
            <p className="text-muted small">Hệ thống Quản lý Tin Tức FU News</p>
          </div>

          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="loginUsername">
              <Form.Label className="fw-semibold">Tên đăng nhập (Username) *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên đăng nhập..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="loginPassword">
              <Form.Label className="fw-semibold">Mật khẩu (Password) *</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 py-2 fw-semibold">
              Đăng Nhập
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
