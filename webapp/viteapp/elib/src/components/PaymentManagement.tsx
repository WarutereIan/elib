import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { CreditCard, Calendar, History, Newspaper } from "lucide-react";
import axios from "axios";
import { usePDF } from "react-to-pdf";

interface Payment {
  _id: string;
  amount: number;
  date: string;
  status: string;
}

interface Subscription {
  _id: string;
  plan: string;
  startDate: string;
  endDate: string;
  status: string;
}

const PaymentManagement = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    amount: "",
  });

  const token = localStorage.getItem("sch_token");

  useEffect(() => {
    fetchPayments();
    fetchSubscription();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/manage/payments/history",
        {
          headers: { Authorization: token },
        }
      );
      setPayments(response.data.payments);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const fetchSubscription = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/manage/subscription/status",
        {
          headers: { Authorization: token },
        }
      );
      console.log(response.data);

      setSubscription(response.data.subscription);
    } catch (error) {
      console.error("Error fetching subscription:", error);
    }
  };

  const handlePayment = async () => {
    try {
      await axios.post(
        "http://localhost:5000/manage/payments/process",
        paymentInfo,
        {
          headers: { Authorization: token },
        }
      );
      setShowPaymentForm(false);
      fetchPayments();
      fetchSubscription();
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  const {
    toPDF: pdfGenSubscriptionHistory,
    targetRef: targetRefSubscriptionHistory,
  } = usePDF({
    filename: "School Payment History.pdf",
  });

  return (
    <div className="space-y-6">
      {/* Subscription Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Current Subscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          {subscription ? (
            <div className="space-y-2">
              <p className="text-lg font-medium">Plan: {subscription.plan}</p>
              <p>Valid until: {subscription.endDate}</p>
              <p className="inline-flex items-center gap-2">
                Status:
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    subscription.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {subscription.status}
                </span>
              </p>
            </div>
          ) : (
            <p>No active subscription</p>
          )}
        </CardContent>
      </Card>

      {/* Payment Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Make a Payment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog open={showPaymentForm} onOpenChange={setShowPaymentForm}>
            <DialogTrigger asChild>
              <Button>Make Payment</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Payment Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <Input
                  placeholder="Card Number"
                  value={paymentInfo.cardNumber}
                  onChange={(e) =>
                    setPaymentInfo({
                      ...paymentInfo,
                      cardNumber: e.target.value,
                    })
                  }
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="MM/YY"
                    value={paymentInfo.expiryDate}
                    onChange={(e) =>
                      setPaymentInfo({
                        ...paymentInfo,
                        expiryDate: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="CVV"
                    type="password"
                    maxLength={3}
                    value={paymentInfo.cvv}
                    onChange={(e) =>
                      setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
                    }
                  />
                </div>
                <Input
                  placeholder="Amount"
                  type="number"
                  value={paymentInfo.amount}
                  onChange={(e) =>
                    setPaymentInfo({ ...paymentInfo, amount: e.target.value })
                  }
                />
                <Button onClick={handlePayment} className="w-full">
                  Process Payment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card ref={targetRefSubscriptionHistory}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Payment History
          </CardTitle>
          <Button
            size="sm"
            variant="ghost"
            className="text-red-500 hover:text-red-700"
            onClick={() => pdfGenSubscriptionHistory()}
          >
            <Newspaper className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id} className="border-t">
                    <td className="p-4">{new Date(payment.date).toString()}</td>
                    <td className="p-4">${payment.amount}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          payment.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentManagement;
