// src/context/AuthContext.jsx
import React, { createContext, useState } from "react";
import { mockAccounts } from "../common/mockData";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (username, password) => {
    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    // Đối chiếu theo Username và Password
    const account = mockAccounts.find(
      (acc) =>
        acc.username.toLowerCase() === trimmedUser.toLowerCase() &&
        acc.password === trimmedPass
    );

    if (account) {
      const userSession = {
        id: account.id,
        username: account.username,
        name: account.name,
        role: account.role // 1: Admin, 2: Staff
      };
      setCurrentUser(userSession);
      return { success: true, user: userSession };
    }
    return { success: false, message: "Tên đăng nhập hoặc mật khẩu không chính xác!" };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
    isAdmin: currentUser?.role === 1,
    isStaff: currentUser?.role === 2
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
