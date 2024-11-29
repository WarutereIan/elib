//get books

import { Request, Response } from "express";
import { Book } from "../models/Book";
import { Teacher } from "../models/Teacher";
import { sign } from "jsonwebtoken";

import { config } from "../config/config";
import { Password } from "../helpers/password";

export const getBooksTeacher = async (req: Request, res: Response) => {
  try {
    let books = await Book.find();

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
export const getBookTeacher = async (req: Request, res: Response) => {
  try {
    let { book_id } = req.params;

    let book = await Book.findOne({
      id: book_id,
    });
    if (!book) {
      return res.status(404).json({ success: false, msg: " No book found" });
    }
    return res.status(200).json({
      success: true,
      book,
    });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).send("Internal server error");
  }
};

//signup
export const teacherSignUp = async (req: Request, res: Response) => {
  try {
    let { name, tsc_no, teacher_no, password, school_id } = req.body;
    let teacher = await Teacher.create({
      name,
      tsc_no,
      school_id,
      teacher_no,
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
export const teacherLogin = async (req: Request, res: Response) => {
  try {
    let { tsc_no, password } = req.body;

    let teacher = await Teacher.findOne({ tsc_no: tsc_no });

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
