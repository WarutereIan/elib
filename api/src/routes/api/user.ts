import { Router } from "express";
import {
  getBookTeacher,
  getBooksTeacher,
  teacherLogin,
  teacherSignUp,
} from "../../controllers/teachers";
import { validateRequest } from "../../middlewares/validate-request";
import {
  getBookStudent,
  getBooksStudent,
  studentLogin,
  studentSignUp,
} from "../../controllers/student";
import {
  deleteStudent,
  deleteTeacher,
  editStudent,
  editTeacher,
  getStudents,
  getTeachers,
  schoolLogin,
  schoolSignUp,
} from "../../controllers/school";

const router = Router();

//teacher routes
router.get("/get-book-teacher/:book_id", validateRequest, getBookTeacher);
router.get("/get-books-teacher", validateRequest, getBooksTeacher);

router.post("/teacher-login", teacherLogin);
router.post("/teacher-signup", teacherSignUp);

//student routes
router.get("/get-book/:book_id", validateRequest, getBookStudent);
router.get("/get-books", validateRequest, getBooksStudent);

router.post("/student-signup", studentSignUp);
router.post("/student-login", studentLogin);

//school routes
router.get("/getTeachers", validateRequest, getTeachers);
router.get("/getStudents", validateRequest, getStudents);

router.post("/school-login", schoolLogin);
router.post("/school-signup", schoolSignUp);

router.post("/updateStudent", validateRequest, editStudent);
router.post("/updateTeacher", validateRequest, editTeacher);

router.delete("/delete-student", validateRequest, deleteStudent);
router.delete("/delete/teacher", validateRequest, deleteTeacher);

module.exports = router;
