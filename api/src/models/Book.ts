import { model, Schema } from "mongoose";
import { IBook } from "../types/IBooks";

const BookSchema = new Schema<IBook>({
  name: String,
  url: String,
  img: String,
  publisher: String,
  is_guide: Boolean,
});

export const Book = model("Book", BookSchema);
