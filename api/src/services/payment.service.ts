import { Payment } from "../models/Payment";
import { School } from "../models/School";
import { Subscription } from "../models/Subscription";
import { IPayment } from "../types/IPayment";
import { generateTransactionId } from "../utils/payment.utils";

export class PaymentService {
  static async createPayment(
    schoolId: string,
    amount: number,
    paymentMethod: string
  ): Promise<IPayment> {
    const school = await School.findOne({ _id: schoolId });
    if (!school) {
      throw new Error("School not found");
    }

    const payment = new Payment({
      school_id: schoolId,
      amount,
      payment_method: paymentMethod,
      transaction_id: generateTransactionId(),
      status: "pending",
    });

    await payment.save();
    return payment;
  }

  static async getPaymentHistory(schoolId: string): Promise<IPayment[]> {
    return Payment.find({ school_id: schoolId }).sort({ payment_date: -1 });
  }

  static async processPayment(paymentId: string): Promise<IPayment> {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      throw new Error("Payment not found");
    }

    // Here you would integrate with a payment gateway
    // For demo purposes, we'll just mark it as completed
    payment.status = "completed";
    await payment.save();

    // Update school's payment status

    console.log(payment);

    await School.findByIdAndUpdate(payment.school_id, {
      has_paid: true,
      last_paid: new Date().toISOString(),
    });

    return payment;
  }
}
