import { Request, Response } from "express";
import multer, { diskStorage } from "multer";
import { Book } from "../models/Book";
import { Teacher } from "../models/Teacher";
import { Student } from "../models/Student";
import { School } from "../models/School";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { Admin } from "../models/Admin";
import { Password } from "../helpers/password";

//add book

export const uploadBook = async (req: Request, res: Response) => {
  const path = require("path");
  try {
    const storage = diskStorage({
      destination: (req, file, cb) => {
        cb(null, "uploads/"); // Directory to save the uploaded files
      },
      filename: (req, file, cb) => {
        cb(null, path.extname(file.originalname)); //
      },
    });

    const upload = multer({ storage: storage });

    // Create a directory to save uploaded files
    const fs = require("fs");
    const dir = "./uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    let filename = req.file?.filename;
    let filepath = req.file?.path;

    const book = await Book.create({
      name: filename,
      url: filepath,
    });

    return res.json({ success: true, book });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).send("Internal server error");
  }
};

//edit book
export const editBook = async (req: Request, res: Response) => {
  try {
    let { name, img, publisher, is_guide } = req.body;
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).send("Internal server error");
  }
};

//delete book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    let { book_id } = req.body;

    let deletedBook = await Book.deleteOne({ id: book_id });
    //implement logic to delete it from file strorage too

    return res.json({ success: true, deletedBook });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).send("Internal server error");
  }
};

//update school
export const updateSchool = async (req: Request, res: Response) => {
  try {
    let { name, has_paid, school_id } = req.body;

    let updatedSchool = await School.updateOne(
      { id: school_id },
      {
        has_paid: has_paid,
      }
    );

    return res.json({ success: true, updatedSchool });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).send("Internal server error");
  }
};

export const getSchools = async (req: Request, res: Response) => {
  try {
    let schools = await School.find();
    return res.json({ success: true, schools });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).send("Internal server error");
  }
};

//delete school
export const deleteSchool = async (req: Request, res: Response) => {
  try {
    let { school_id } = req.body;

    let deletedSchool = await School.deleteOne({ id: school_id });

    return res.json({ success: true, deletedSchool });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).send("Internal server error");
  }
};

//add log in and sign up functions
//signup
export const adminSignUp = async (req: Request, res: Response) => {
  try {
    let { firstName, lastName, email, password } = req.body;
    let teacher = await Admin.create({
      name: firstName + lastName,
      email,
      password,
    });

    const payload = {
      user: {
        id: teacher._id,
      },
    };

    sign(
      payload,
      config.JWT_SECRET,
      {
        expiresIn: "1h",
      },
      (err: any, token) => {
        if (err) throw err;
        res.status(200).json({ token, success: true });
      }
    );
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).send("Internal server error");
  }
};

//login
export const adminLogin = async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;

    let teacher = await Admin.findOne({ email: email });

    if (!teacher || !(await Password.compare(teacher.password, password))) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials", success: false });
    }

    const payload = {
      id: teacher.id,
    };
    sign(
      payload,
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_TOKEN_EXPIRES_IN,
      },
      (err, token) => {
        if (err) throw err;

        res.json({
          token,
          success: true,
        });
      }
    );
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).send("Internal server error");
  }
};
