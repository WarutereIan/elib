"use client";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import SchoolManagement from "./app/(school)/schoolDashboard";
import AdminDashboard from "./app/(admin)/dashboard/adminDashboard";

import ELibraryApp from "./app/home/page";
import AdminSignUpPage from "./app/(auth)/register/admin";
import TeacherSignUpPage from "./app/(auth)/register/teacher";
import StudentSignUpPage from "./app/(auth)/register/student";
import SchoolSignUpPage from "./app/(auth)/register/school";
import StudentLoginPage from "./app/(auth)/login/student";
import TeacherLoginPage from "./app/(auth)/login/teacher";
import AdminLoginPage from "./app/(auth)/login/admin";
import SchoolLoginPage from "./app/(auth)/login/school";

export default function App() {
  return (
    <>
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
          <Route path="/school/dashboard" element={<SchoolManagement />} />

          {/*    <Route path="*" element={<div>Page Not Found</div>} /> */}
        </Routes>
      </Router>
    </>
  );
}
