// src/components/Footer.jsx
import React from "react";
import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto border-top border-secondary">
      <Container className="text-center">
        <p className="mb-1 fw-semibold">FU News Management System</p>
      </Container>
    </footer>
  );
}
