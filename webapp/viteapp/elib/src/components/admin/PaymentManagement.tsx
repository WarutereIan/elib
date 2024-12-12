import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CreditCard, DollarSign, Newspaper, Users } from "lucide-react";
import { log } from "console";
import axios from "axios";
import { usePDF } from "react-to-pdf";

interface PaymentAnalytics {
  totalPayments: number;
  totalRevenue: number;
  activeSubscriptions: number;
}

interface Payment {
  _id: string;
  school_id: {
    _id: string;
    name: string;
    email: string;
  };
  amount: number;
  status: string;
  payment_method: string;
  payment_date: string;
}

const PaymentManagement = () => {
  const [payments, setPayments] = React.useState<Payment[]>([]);
  const [analytics, setAnalytics] = React.useState<PaymentAnalytics>({
    totalPayments: 0,
    totalRevenue: 0,
    activeSubscriptions: 0,
  });
  const token = localStorage.getItem("adm_token");

  React.useEffect(() => {
    fetchPayments();
    fetchAnalytics();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/admin-analytics/payments",
        {
          headers: { Authorization: token! },
        }
      );
      const data = response.data;
      setPayments(data.payments);
    } catch (error) {
      console.log(error);

      console.error("Error fetching payments:", error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/admin-analytics/analytics",
        {
          headers: { Authorization: token! },
        }
      );
      const data = response.data;
      setAnalytics(data);
    } catch (error) {
      console.log(error);

      console.error("Error fetching analytics:", error);
    }
  };

  const { toPDF: pdfGenPaymentHistory, targetRef: targetRefPaymentHistory } =
    usePDF({
      filename: "Payment History.pdf",
    });

  return (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analytics.totalRevenue}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Payments
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalPayments}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Subscriptions
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.activeSubscriptions}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <Card ref={targetRefPaymentHistory}>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <Button
            size="sm"
            variant="ghost"
            className="text-red-500 hover:text-red-700"
            onClick={() => pdfGenPaymentHistory()}
          >
            <Newspaper className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>School</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Payment Method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell>{payment.school_id.name}</TableCell>
                  <TableCell>${payment.amount}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        payment.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : payment.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(payment.payment_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{payment.payment_method}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentManagement;
