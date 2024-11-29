import { model, Schema } from "mongoose";
import { IAdmin } from "../types/IAdmin";
import { Password } from "../helpers/password";
import { IStudent } from "../types/IStudent";

const StudentSchema = new Schema<IStudent>({
  name: String,
  adm_no: String,
  password: String,
  school_id: String,
});

//hooks
StudentSchema.pre("save", async function (done) {
  //encrypt password
  if (this.isModified("password")) {
    const hashed = await Password.Hash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

export const Student = model("Student", StudentSchema);
