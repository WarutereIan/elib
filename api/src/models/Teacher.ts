import { model, Schema } from "mongoose";
import { IAdmin } from "../types/IAdmin";
import { Password } from "../helpers/password";
import { ITeacher } from "../types/ITeacher";

const TeacherSchema = new Schema<ITeacher>({
  name: String,
  school_id: String,
  password: String,
  tsc_no: String,
  teacher_no: String,
});

//hooks
TeacherSchema.pre("save", async function (done) {
  //encrypt password
  if (this.isModified("password")) {
    const hashed = await Password.Hash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

export const Teacher = model("Teacher", TeacherSchema);
