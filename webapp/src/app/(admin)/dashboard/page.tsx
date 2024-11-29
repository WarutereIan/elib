import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pen, Trash2, BookOpen, School } from "lucide-react";

const AdminDashboard = () => {
  const [schools, setSchools] = useState([
    { id: "001", name: "Nairobi School", paymentStatus: "Successful" },
    { id: "002", name: "Light Academy", paymentStatus: "Unsuccessful" },
    { id: "003", name: "Kenya High", paymentStatus: "Successful" },
    { id: "004", name: "Kahuhia Girls", paymentStatus: "Successful" },
    { id: "005", name: "Lenana School", paymentStatus: "Unsuccessful" },
  ]);

  const handleEdit = (id) => {
    console.log("Edit school:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete school:", id);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-sky-500 p-6 flex flex-col">
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-white">KICD_ELIBRARY</h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-sky-600"
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Manage Books
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-sky-600"
          >
            <School className="mr-2 h-5 w-5" />
            Manage Schools
          </Button>
        </nav>

        {/* Logout Button */}
        <Button className="mt-auto w-full bg-amber-500 hover:bg-amber-600 text-white rounded-full">
          Log Out
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-gray-200 p-4">
          <h2 className="text-xl font-semibold">Admin</h2>
        </header>

        {/* Content */}
        <main className="p-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-6">Schools</h3>

            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>School ID</TableHead>
                  <TableHead>School Name</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schools.map((school) => (
                  <TableRow key={school.id}>
                    <TableCell>{school.id}</TableCell>
                    <TableCell>{school.name}</TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          school.paymentStatus === "Successful"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {school.paymentStatus}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(school.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Pen className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(school.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>

      {/* Footer Logo */}
      <img
        src="/api/placeholder/150/150"
        alt="KICD Logo"
        className="fixed bottom-4 right-4 w-24 h-24"
      />
    </div>
  );
};

export default AdminDashboard;
