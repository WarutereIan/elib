import { Request, Response, NextFunction } from "express";
import { Admin } from "../models/Admin";

export const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.user.id);

    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(403).json({ error: "Admin access required" });
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "Admin authorization failed" });
  }
};
