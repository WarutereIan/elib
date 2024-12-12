import { Request, Response, NextFunction } from "express";

export const validatePayment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { amount, payment_method } = req.body;

  if (!amount || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ error: "Invalid payment amount" });
  }

  if (!payment_method) {
    return res.status(400).json({ error: "Payment method is required" });
  }

  next();
};
