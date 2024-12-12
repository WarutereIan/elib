import { Request, Response } from "express";
import { PaymentService } from "../services/payment.service";
import { SubscriptionService } from "../services/subscription.service";

export class PaymentController {
  static async createPayment(req: Request, res: Response) {
    try {
      const { amount, payment_method } = req.body;
      const schoolId = req.user.id; // Assuming auth middleware sets user

      const payment = await PaymentService.createPayment(
        schoolId,
        amount,
        payment_method
      );

      res.status(201).json({ payment });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getPaymentHistory(req: Request, res: Response) {
    try {
      const schoolId = req.user.id;
      const payments = await PaymentService.getPaymentHistory(schoolId);
      res.json({ payments });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async processPayment(req: Request, res: Response) {
    try {
      const { payment_id, plan, amount } = req.body;
      const schoolId = req.user.id;
      console.log(schoolId);

      //create payment if does not exist
      let _payment = await PaymentService.createPayment(
        schoolId,
        amount,
        "card"
      );

      console.log(_payment);

      const payment = await PaymentService.processPayment(_payment.id);

      // If payment is successful, update subscription
      if (payment.status === "completed") {
        await SubscriptionService.createOrUpdateSubscription(
          schoolId,
          "premium"
        );
      }

      res.json({ payment });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
