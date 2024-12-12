import { model, Schema } from "mongoose";
import { IAdmin } from "../types/IAdmin";
import { Password } from "../helpers/password";
import { ISchool } from "../types/ISchool";

const SchoolSchema = new Schema<ISchool>(
  {
    name: String,
    email: String,
    password: String,
    list_of_students: { type: [], default: [] },
    list_of_teachers: { type: [], default: [] },
    last_paid: { type: String, default: Date.now().toString() },
    institution_level: { type: String, default: "Elementary" },
    has_paid: {
      type: Boolean,
      default: false,
    },
    subscription: {
      plan: { type: String, default: "free" },
      status: {
        type: String,
        enum: ["active", "inactive", "expired"],
        default: "inactive",
      },
      startDate: { type: Date },
      endDate: { type: Date },
    },
  },
  { timestamps: true }
);
//hooks
SchoolSchema.pre("save", async function (done) {
  //encrypt password
  if (this.isModified("password")) {
    const hashed = await Password.Hash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

export const School = model("School", SchoolSchema);
