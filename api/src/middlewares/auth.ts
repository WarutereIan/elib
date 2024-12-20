import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { config } from "../config/config";
import jwt from "jsonwebtoken";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ msg: "Unauthorized request!", success: false });
  }

  try {
    verify(token, config.JWT_SECRET, (err, decoded: any) => {
      if (err || !decoded) {
        return res
          .status(401)
          .json({ msg: "Unauthorized request!", success: false });
      } else {
        req.user = decoded?.user || decoded;
        next();
      }
    });
  } catch (err) {
    console.error(`Internal auth error - error in token validation middleware`);
    res.status(500).json({ msg: "Internal auth error" });
  }
};

export interface AuthRequest extends Request {
  user: any;
}

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ msg: "Unauthorized request!", success: false });
    }

    verify(token, config.JWT_SECRET, (err, decoded: any) => {
      if (err || !decoded) {
        return res
          .status(401)
          .json({ msg: "Unauthorized request!", success: false });
      } else {
        req.user = decoded?.user || decoded;
        next();
      }
    });
  } catch (error) {
    res.status(401).json({ error: "Please authenticate" });
  }
};
