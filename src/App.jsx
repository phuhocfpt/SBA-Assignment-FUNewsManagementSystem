// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import RequireAuth from "./components/RequireAuth";

// Public Pages (Khách & Độc giả)
import HomePage from "./pages/public/HomePage";
import NewsDetailPage from "./pages/public/NewsDetailPage";
import LoginPage from "./pages/public/LoginPage";
import NotFoundPage from "./pages/public/NotFoundPage";

// Staff Pages (Phóng viên / Biên tập viên)
import NewsManagement from "./pages/staff/NewsManagement";
import CategoryManagement from "./pages/staff/CategoryManagement";

// Admin Pages (Quản trị viên)
import AccountManagement from "./pages/admin/AccountManagement";
import ReportDashboard from "./pages/admin/ReportDashboard";

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <NavigationBar />

      <main className="flex-grow-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Menu 1: Dashboard */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth allowedRoles={[1, 2]}>
                <ReportDashboard />
              </RequireAuth>
            }
          />

          {/* Menu 2: Category */}
          <Route
            path="/categories"
            element={
              <RequireAuth allowedRoles={[1, 2]}>
                <CategoryManagement />
              </RequireAuth>
            }
          />

          {/* Menu 3: News */}
          <Route
            path="/news-management"
            element={
              <RequireAuth allowedRoles={[1, 2]}>
                <NewsManagement />
              </RequireAuth>
            }
          />

          {/* Menu 4: Users (Admin Role 1 only) */}
          <Route
            path="/users"
            element={
              <RequireAuth allowedRoles={[1]}>
                <AccountManagement />
              </RequireAuth>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
