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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { usePDF } from "react-to-pdf";
import { Newspaper } from "lucide-react";

interface Subscription {
  _id: string;
  school_id: {
    _id: string;
    name: string;
    email: string;
  };
  plan: string;
  status: string;
  start_date: string;
  end_date: string;
}

const SubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = React.useState<Subscription[]>([]);
  const token = localStorage.getItem("adm_token");

  React.useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/admin-analytics/subscriptions",
        {
          headers: { Authorization: token! },
        }
      );
      console.log(response);

      const data = await response.data;
      setSubscriptions(data.subscriptions);
    } catch (error) {
      console.log(error);

      console.error("Error fetching subscriptions:", error);
    }
  };

  const updateSubscriptionStatus = async (
    subscriptionId: string,
    status: string
  ) => {
    try {
      await fetch(
        "http://localhost:5000/admin-analytics/subscription/update-status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token!,
          },
          body: JSON.stringify({ subscriptionId, status }),
        }
      );
      fetchSubscriptions();
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };

  const {
    toPDF: pdfGenSubscriptionHistory,
    targetRef: targetRefSubscriptionHistory,
  } = usePDF({
    filename: "Subscription History.pdf",
  });

  return (
    <Card ref={targetRefSubscriptionHistory}>
      <CardHeader>
        <CardTitle>Subscriptions</CardTitle>
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>School</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((subscription) => (
              <TableRow key={subscription._id}>
                <TableCell>{subscription.school_id.name}</TableCell>
                <TableCell className="capitalize">
                  {subscription.plan}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      subscription.status === "active"
                        ? "bg-green-100 text-green-800"
                        : subscription.status === "inactive"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {subscription.status}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(subscription.start_date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(subscription.end_date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Update Status
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Subscription Status</DialogTitle>
                      </DialogHeader>
                      <Select
                        onValueChange={(value) =>
                          updateSubscriptionStatus(subscription._id, value)
                        }
                        defaultValue={subscription.status}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="expired">Expired</SelectItem>
                        </SelectContent>
                      </Select>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SubscriptionManagement;
