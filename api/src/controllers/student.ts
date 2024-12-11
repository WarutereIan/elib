//get books

import { Request, Response } from "express";
import { Book } from "../models/Book";
import { Student } from "../models/Student";
import { Password } from "../helpers/password";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";

export const getBooksStudent = async (req: Request, res: Response) => {
  try {
    let books = await Book.find({});

    console.log(books);

    if (!books) {
      return res.status(404).json({ success: false, msg: " No books found" });
    }
    return res.status(200).json({
      success: true,
      books,
    });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).send("Internal server error");
  }
};

//get specific book
export const getBookStudent = async (req: Request, res: Response) => {
  const path = require("path");
  try {
    let { book_id } = req.params;

    let book = await Book.findOne({
      id: book_id,
      is_guide: false,
    });
    if (!book) {
      return res.status(404).json({ success: false, msg: " No book found" });
    }

    const filePath = path.join(__dirname, book.filepath);
    return res.download(filePath, book.name, (err) => {
      if (err) {
        console.error("File download error:", err);
        res.status(500).send("An error occurred while downloading the file.");
      }
    });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).send("Internal server error");
  }
};

//signup
export const studentSignUp = async (req: Request, res: Response) => {
  try {
    let { firstName, lastName, adm_no, password, school } = req.body;
    let student = await Student.create({
      name: firstName + lastName,
      adm_no,
      school_id: school,
      password,
    });

    const payload = {
      user: {
        id: student._id,
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
export const studentLogin = async (req: Request, res: Response) => {
  try {
    let { adm_no, password } = req.body;

    let student = await Student.findOne({ adm_no: adm_no });

    if (!student || !(await Password.compare(student.password, password))) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials", success: false });
    }

    const payload = {
      id: student.id,
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
