"use client";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import SchoolManagement from "./(admin)/dashboard/management/page";
import AdminDashboard from "./(admin)/dashboard/page";
import LoginPage from "./(auth)/login/student";
import SignUpPage from "./(auth)/register/teacher";
import ELibraryApp from "./home/page";
import AdminSignUpPage from "./(auth)/register/admin";
import TeacherSignUpPage from "./(auth)/register/teacher";
import StudentSignUpPage from "./(auth)/register/student";
import SchoolSignUpPage from "./(auth)/register/school";
import StudentLoginPage from "./(auth)/login/student";
import TeacherLoginPage from "./(auth)/login/teacher";
import AdminLoginPage from "./(auth)/login/admin";
import SchoolLoginPage from "./(auth)/login/school";

export default function Home() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentLoginPage />} />
        <Route path="/login/teacher" element={<TeacherLoginPage />} />
        <Route path="/login/admin" element={<AdminLoginPage />} />
        <Route path="/login/school" element={<SchoolLoginPage />} />

        <Route path="/signup" element={<StudentSignUpPage />} />
        <Route path="/signup/admin" element={<AdminSignUpPage />} />
        <Route path="/signup/teacher" element={<TeacherSignUpPage />} />
        <Route path="/signup/school" element={<SchoolSignUpPage />} />

        <Route path="/home" element={<ELibraryApp />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/school_management" element={<SchoolManagement />} />
        <Route path="/admin/book_management" element={<SchoolManagement />} />

        {/* Default/Redirect Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Optional: 404 Not Found Route */}
        {/*  <Route path="*" element={<div>Page Not Found</div>} /> */}
      </Routes>
    </Router>
  );
}
