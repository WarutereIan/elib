import { connect } from "mongoose";
import { config } from "./config";

("0ztN4ndOoM1H9Jri");

export const connectDB = async () => {
  console.log(`- - -`.repeat(10));
  try {
    const options = {
      useUnifiedTopology: true,
      //keepAlive: true,
      connectTimeoutMS: 60000,
      socketTimeoutMS: 60000,
    };
    const db = await connect(
      "mongodb+srv://nmwanik111:0ztN4ndOoM1H9Jri@cluster0.nqu7tdp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      options
    );
    console.log("Connected to MongoDB ✅✅✅");
    return db;
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};
