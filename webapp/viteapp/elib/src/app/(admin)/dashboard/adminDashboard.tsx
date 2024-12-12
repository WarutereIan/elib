import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pen, Trash2, BookOpen, School, Plus } from "lucide-react";
import FileUploader from "../../../components/fileUploader";
import axios from "axios";
import PaymentManagement from "../../../components/admin/PaymentManagement";
import SubscriptionManagement from "../../../components/admin/SubscriptionManagement";

const AdminDashboard = () => {
  const [schools, setSchools] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);

  //getBookMetadata
  let url = "http://localhost:5000/user/get-books";

  const getBooks = async () => {
    try {
      const response = await axios.get(url);

      setBooks(response.data.books);

      return response.data.books;
    } catch (error) {
      console.log(error);
    }
  };

  const getSchools = async () => {
    let url = "http://localhost:5000/admin/get-schools";

    try {
      const response = await axios.get(url);

      setSchools(response.data.schools);

      return response.data.schools;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks().then();
    getSchools().then();
  }, []);

  const handleEdit = async (id) => {
    console.log("Edit school:", id);
    //will toggle payment status
    const url = "http://localhost:5000/admin/edit-school";

    try {
      const request = {
        method: "post",
        data: id,
        url: url,
      };

      const response = await axios(request);
      await getSchools();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleDeleteSchool = async (id) => {
    console.log("Delete school:", id);
    const url = "http://localhost:5000/admin/delete-school";

    try {
      const request = {
        method: "post",
        data: id,
        url: url,
      };

      const response = await axios(request);

      await getSchools();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  const handleDeleteBook = async (id) => {
    console.log("Delete school:", id);
    const url = "http://localhost:5000/admin/delete-book";

    try {
      const request = {
        method: "delete",
        data: id,
        url: url,
      };

      const response = await axios(request);

      await getBooks();
    } catch (error) {
      console.log(error);
      alert(error);
    }
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
          <a
            href="/"
            onClick={() => {
              localStorage.setItem("adm_token", "");
            }}
          >
            Log Out
          </a>
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
                  <TableRow key={school._id}>
                    <TableCell>{school._id}</TableCell>
                    <TableCell>{school.name}</TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          school.has_paid
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {school.has_paid ? "Successful" : "Unsuccessful"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(school._id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Pen className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteSchool(school._id)}
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
        <main className="p-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-2 ">
              <h3 className="text-xl font-semibold mb-6">Books</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-blue-500 hover:bg-blue-600">
                    <Plus className="mr-2 h-4 w-4" /> Add Book
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Book</DialogTitle>
                  </DialogHeader>

                  <FileUploader />
                </DialogContent>
              </Dialog>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>Book ID</TableHead>
                  <TableHead>Book Name</TableHead>
                  <TableHead>Book Category</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book._id}>
                    <TableCell>{book._id}</TableCell>
                    <TableCell>{book.name}</TableCell>
                    <TableCell>{book.category}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteBook(book._id)}
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
        <PaymentManagement />
        <SubscriptionManagement />
      </div>
    </div>
  );
};

export default AdminDashboard;
