import { Request, Response, Router } from "express";
import { validateRequest } from "../../middlewares/validate-request";
import {
  deleteBook,
  deleteSchool,
  editBook,
  updateSchool,
  uploadBook,
} from "../../controllers/admin";
import { model } from "mongoose";
import multer from "multer";
import path from "path";

const router: any = Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure this uploads directory exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Create Multer upload instance
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB file size limit
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /pdf|doc|docx/;
    const extname = allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(
        new Error("Invalid file type. Only images and documents are allowed.")
      );
    }
  },
});

router.post(
  "/upload-book",
  validateRequest,
  upload.single("file"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { bookName, category, subject } = req.body;

    // Create covers directory if not exists
    const coversDir = path.join(__dirname, "uploads", "covers");
    await fs.mkdir(coversDir, { recursive: true });

    // Extract or generate cover
    let coverPath = null;
    try {
      coverPath = await BookCoverExtractor.extractCover(
        req.file.path,
        coversDir
      );

      // If no cover found, generate placeholder
      if (!coverPath) {
        coverPath = await BookCoverExtractor.generatePlaceholderCover(
          bookName,
          coversDir
        );
      }
    } catch (coverError) {
      console.error("Cover extraction error:", coverError);
      // Fallback to placeholder if extraction fails
      coverPath = await BookCoverExtractor.generatePlaceholderCover(
        bookName,
        coversDir
      );
    }

    // Book metadata object
    const bookMetadata = {
      bookName,
      category,
      subject,
      filename: req.file.filename,
      filePath: req.file.path,
      coverPath: coverPath ? path.basename(coverPath) : null,
      uploadedAt: new Date(),
    };

     console.log("Book Metadata:", bookMetadata);


    //save book metadata to db
    

    res.json({
      message: "File uploaded successfully",
      filename: req.file.filename,
      path: req.file.path,
    });
  }
);
router.post("/edit-book", validateRequest, editBook);
router.delete("/delete-book", validateRequest, deleteBook);
router.post("/update-school", validateRequest, updateSchool);
router.post("/delete-school", validateRequest, deleteSchool);

//add login and sign up functions

module.exports = router;
