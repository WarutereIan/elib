import { model, Schema } from "mongoose";
import { IBook } from "../types/IBooks";

const BookSchema = new Schema<IBook>({
  name: String,
  filename: String,
  filepath: String,
  uploadedAt: String,
  category: String,
  is_guide: Boolean,
});

export const Book = model("Book", BookSchema);
