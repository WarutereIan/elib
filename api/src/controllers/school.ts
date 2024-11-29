//manage teachers:
import { Request, Response } from "express";
import { Teacher } from "../models/Teacher";
import { Student } from "../models/Student";
import { School } from "../models/School";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { Password } from "../helpers/password";

//get teachers
export const getTeachers = async (req: Request, res: Response) => {
  try {
    let school_id = req.user;
    let teachers = await Teacher.find({ school_id: school_id });

    if (!teachers) {
      return res
        .status(404)
        .json({ success: false, msg: " No teachers found" });
    }
    return res.status(200).json({
      success: true,
      teachers,
    });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).send("Internal server error");
  }
};

//edit teacher
export const editTeacher = async (req: Request, res: Response) => {
  try {
    let { name, tsc_no, teacher_no } = req.body;

    let edited_Teacher = await Teacher.updateOne(
      { teacher_no: teacher_no },
      { name: name, tsc_no: tsc_no }
    );

    return res.json({ success: true, edited_Teacher });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).send("Internal server error");
  }
};

//delete teacher
export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    let { teacher_id } = req.body;

    let deletedTeacher = await Teacher.deleteOne({ id: teacher_id });

    return res.json({ success: true, deletedTeacher });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).send("Internal server error");
  }
};

//get students
export const getStudents = async (req: Request, res: Response) => {
  try {
    let school_id = req.user;
    let students = await Student.find({ school_id: school_id });

    if (!students) {
      return res
        .status(404)
        .json({ success: false, msg: " No students found" });
    }
    return res.status(200).json({
      success: true,
      students,
    });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).send("Internal server error");
  }
};

//edit student
export const editStudent = async (req: Request, res: Response) => {
  try {
    let { name, adm_no, student_id } = req.body;

    let edited_Student = await Student.updateOne(
      { id: student_id },
      { name: name, adm_no: adm_no }
    );

    return res.json({ success: true, edited_Student });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).send("Internal server error");
  }
};

//delete student
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    let { student_id } = req.body;

    let deletedStudent = await Student.deleteOne({ id: student_id });

    return res.json({ success: true, deletedStudent });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).send("Internal server error");
  }
};

//signup
export const schoolSignUp = async (req: Request, res: Response) => {
  try {
    let { name, email, password } = req.body;
    let school = await School.create({
      name,
      email,
      password,
    });

    const payload = {
      user: {
        id: school._id,
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
export const schoolLogin = async (req: Request, res: Response) => {
  try {
    let { name, password } = req.body;

    let school = await Student.findOne({ name: name });

    if (!school || !(await Password.compare(school.password, password))) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials", success: false });
    }

    const payload = {
      id: school.id,
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

//make payment
//get payment history