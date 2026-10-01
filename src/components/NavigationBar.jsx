// src/components/NavigationBar.jsx
import React, { useContext } from "react";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/FUNewsLogo.png";

export default function NavigationBar() {
  const { currentUser, logout, isAdmin, isStaff } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center py-1 me-3">
          <img
            src={logo}
            alt="FU News"
            style={{ height: "40px", borderRadius: "5px", backgroundColor: "#fff", padding: "3px 8px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Trang Chủ
            </Nav.Link>

            {(isStaff || isAdmin) && (
              <Nav.Link as={NavLink} to="/dashboard">
                Dashboard
              </Nav.Link>
            )}

            {(isStaff || isAdmin) && (
              <Nav.Link as={NavLink} to="/categories">
                Category
              </Nav.Link>
            )}

            {(isStaff || isAdmin) && (
              <Nav.Link as={NavLink} to="/news-management">
                News
              </Nav.Link>
            )}

            {isAdmin && (
              <Nav.Link as={NavLink} to="/users">
                Users
              </Nav.Link>
            )}
          </Nav>

          <Nav className="align-items-center gap-2">
            {currentUser ? (
              <>
                <span className="text-light me-2 d-inline-flex align-items-center">
                  Chào, <strong className="ms-1">{currentUser.name}</strong>
                  <Badge
                    bg={currentUser.role === 1 ? "danger" : "success"}
                    className="ms-2"
                  >
                    {currentUser.role === 1 ? "Admin" : "Staff"}
                  </Badge>
                </span>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                >
                  Đăng Xuất
                </Button>
              </>
            ) : (
              <Button
                as={Link}
                to="/login"
                variant="warning"
                size="sm"
                className="fw-semibold text-dark"
              >
                Đăng Nhập
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
