import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Newspaper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import PaymentManagement from "../../components/PaymentManagement";

const SchoolManagement = () => {
  const [teachers, setTeachers] = useState<any[]>([]);

  const [editTeacher, setEditTeacher] = useState(null);
  const [newTeacher, setNewTeacher] = useState({
    id: "",
    name: "",
    tscNumber: "",
  });

  const [students, setstudents] = useState<any[]>([]);

  //getStudents
  let urlStudents = "http://localhost:5000/user/getStudents";
  const token = localStorage.getItem("sch_token");

  console.log("token", token);

  const navigate = useNavigate();

  const getstudents = async () => {
    try {
      const response = await axios.get(urlStudents, {
        headers: {
          Authorization: token,
        },
      });

      setstudents(response.data.students);

      return response.data.students;
    } catch (error) {
      console.log(error);
    }
  };

  let urlTeachers = "http://localhost:5000/user/getTeachers";

  const getTeachers = async () => {
    try {
      const response = await axios.get(urlTeachers, {
        headers: {
          Authorization: token,
        },
      });

      setTeachers(response.data.teachers);

      return response.data.teachers;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getstudents().then();
    getTeachers().then();
  }, []);

  const handleDeleteTeacher = async (teacherId) => {
    if (true) {
      const url = "http://localhost:5000/admin/delete-teacher";

      try {
        const request = {
          method: "delete",
          data: teacherId,
          url: url,
        };

        const response = await axios(request);

        await getTeachers();
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  };
  const handleDeleteStudent = async (studentId) => {
    if (true) {
      const url = "http://localhost:5000/admin/delete-student";

      try {
        const request = {
          method: "delete",
          data: studentId,
          url: url,
        };

        const response = await axios(request);

        await getstudents();
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  };

  const handleEdit = (teacher) => {
    setEditTeacher({ ...teacher });
  };

  const handleUpdate = () => {
    if (editTeacher) {
      setTeachers(
        teachers.map((t) => (t.id === editTeacher.id ? editTeacher : t))
      );
      setEditTeacher(null);
    }
  };

  const handleAdd = () => {
    if (newTeacher.id && newTeacher.name && newTeacher.tscNumber) {
      setTeachers([...teachers, newTeacher]);
      setNewTeacher({ id: "", name: "", tscNumber: "" });
    }
  };

  const { toPDF: pdfGenTeachers, targetRef: targetRefTeachers } = usePDF({
    filename: "exported-data-teachers.pdf",
  });

  const { toPDF: pdfGenStudents, targetRef: targetRefStudents } = usePDF({
    filename: "exported-data-students.pdf",
  });
  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-300 p-6 flex flex-col">
        <h1 className="text-xl font-bold mb-8">KICD_ELIBRARY</h1>

        <nav className="flex-1 space-y-4">
          <button className="w-full text-left p-2 bg-blue-400 rounded">
            Manage Teachers
          </button>
          <button className="w-full text-left p-2 hover:bg-blue-400 rounded">
            Manage Students
          </button>
          <button className="w-full text-left p-2 hover:bg-blue-400 rounded">
            Payments
          </button>
        </nav>

        <button
          className="mt-auto bg-amber-400 text-black p-2 rounded"
          onClick={() => {
            localStorage.setItem("sch_token", "");
            navigate("/");
          }}
        >
          Log Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-gray-200 p-4 mb-6">
          <h1 className="text-xl font-bold">School Management</h1>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Teachers</CardTitle>
            <Button
              size="sm"
              variant="ghost"
              className="text-red-500 hover:text-red-700"
              onClick={() => pdfGenTeachers()}
            >
              <Newspaper className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div ref={targetRefTeachers} className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 text-left">Teacher ID</th>
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">TSC Number</th>
                    <th className="p-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher) => (
                    <tr key={teacher._id} className="border-t">
                      <td className="p-4">{teacher._id}</td>
                      <td className="p-4">{teacher.name}</td>
                      <td className="p-4">{teacher.tsc_no}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteTeacher(teacher.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-5">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Students</CardTitle>
            <Button
              size="sm"
              variant="ghost"
              className="text-red-500 hover:text-red-700"
              onClick={() => pdfGenStudents()}
            >
              <Newspaper className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div ref={targetRefStudents} className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 text-left">Student ID</th>
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Adm Number</th>
                    <th className="p-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((teacher) => (
                    <tr key={teacher._id} className="border-t">
                      <td className="p-4">{teacher._id}</td>
                      <td className="p-4">{teacher.name}</td>
                      <td className="p-4">{teacher.adm_no}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild></DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Teacher</DialogTitle>
                              </DialogHeader>
                              {editTeacher && (
                                <div className="space-y-4">
                                  <Input
                                    value={editTeacher.name}
                                    onChange={(e) =>
                                      setEditTeacher({
                                        ...editTeacher,
                                        name: e.target.value,
                                      })
                                    }
                                  />
                                  <Input
                                    value={editTeacher.tscNumber}
                                    onChange={(e) =>
                                      setEditTeacher({
                                        ...editTeacher,
                                        tscNumber: e.target.value,
                                      })
                                    }
                                  />
                                  <DialogClose asChild>
                                    <Button onClick={handleUpdate}>
                                      Update
                                    </Button>
                                  </DialogClose>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteStudent(teacher._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <PaymentManagement />
      </div>
    </div>
  );
};

export default SchoolManagement;
