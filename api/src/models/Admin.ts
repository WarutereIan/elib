import { model, Schema } from "mongoose";
import { IAdmin } from "../types/IAdmin";
import { Password } from "../helpers/password";

const AdminSchema = new Schema<IAdmin>({
  name: String,
  email: String,
  password: String,
});

//hooks
AdminSchema.pre("save", async function (done) {
  //encrypt password
  if (this.isModified("password")) {
    const hashed = await Password.Hash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

export const Admin = model("Admin", AdminSchema);
