import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RequireAuth({ children, allowedRoles }) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    // Chưa đăng nhập: chuyển hướng về trang login
    return <Navigate to="/login" replace />;
  }

  // Kiểm tra quyền theo Role ID (1: Admin, 2: Staff)
  // Nếu allowRole != null và role hiện tại được cho phép
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
