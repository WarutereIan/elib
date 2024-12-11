import { Request, Response, Router } from "express";
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
import { validateToken } from "../../middlewares/auth";
import path from "path";

const router = Router();

//teacher routes
router.get("/get-book-teacher/:book_id", validateRequest, getBookTeacher);
router.get("/get-books-teacher", validateRequest, getBooksTeacher);

router.post("/teacher-login", teacherLogin);
router.post("/teacher-signup", teacherSignUp);

//student routes
router.get(
  "/get-book/:filename",
  validateRequest,
  (req: Request, res: Response) => {
    const filename = req.params.filename;
    console.log(filename);

    ("api/uploads");

    const filePath = path.join(__dirname, "../../../", "uploads", filename);

    console.log(filePath);

    // Determine content type based on file extension
    const ext = path.extname(filename).toLowerCase();
    let contentType = "application/octet-stream";

    switch (ext) {
      case ".pdf":
        contentType = "application/pdf";
        break;
      case ".doc":
        contentType = "application/msword";
        break;
      case ".docx":
        contentType =
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        break;
    }

    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `inline; filename="${filename}"`);

    res.sendFile(filePath);
  }
);

router.get("/get-books", getBooksStudent);

router.post("/student-signup", studentSignUp);
router.post("/student-login", studentLogin);

//school routes
router.get("/getTeachers", validateRequest, validateToken, getTeachers);
router.get("/getStudents", validateRequest, validateToken, getStudents);

router.post("/school-login", schoolLogin);
router.post("/school-signup", schoolSignUp);

router.post("/updateStudent", validateRequest, editStudent);
router.post("/updateTeacher", validateRequest, editTeacher);

router.delete("/delete-student", validateRequest, deleteStudent);
router.delete("/delete/teacher", validateRequest, deleteTeacher);

module.exports = router;
