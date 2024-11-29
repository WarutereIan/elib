import { Router } from "express";
import { validateRequest } from "../../middlewares/validate-request";
import {
  deleteBook,
  deleteSchool,
  editBook,
  updateSchool,
  uploadBook,
} from "../../controllers/admin";
import { model } from "mongoose";

const router = Router();

router.post("/upload-book", validateRequest, uploadBook);
router.post("/edit-book", validateRequest, editBook);
router.delete("/delete-book", validateRequest, deleteBook);
router.post("/update-school", validateRequest, updateSchool);
router.post("/delete-school", validateRequest, deleteSchool);

//add login and sign up functions

module.exports = router;
