import React, { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
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

const SchoolManagement = () => {
  const [teachers, setTeachers] = useState([
    { id: "001", name: "Brett Josh", tscNumber: "123456" },
    { id: "002", name: "Tiffany Ashley", tscNumber: "789012" },
    { id: "003", name: "Jenn Naliaka", tscNumber: "345678" },
    { id: "004", name: "Steve Kinuthia", tscNumber: "567890" },
    { id: "005", name: "Amari Hassan", tscNumber: "456789" },
  ]);

  const [editTeacher, setEditTeacher] = useState(null);
  const [newTeacher, setNewTeacher] = useState({
    id: "",
    name: "",
    tscNumber: "",
  });

  const handleDelete = (teacherId) => {
    if (confirm("Are you sure you want to delete this teacher?")) {
      setTeachers(teachers.filter((teacher) => teacher.id !== teacherId));
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

        <button className="mt-auto bg-amber-400 text-black p-2 rounded">
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
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-500 hover:bg-blue-600">
                  <Plus className="mr-2 h-4 w-4" /> Add Teacher
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Teacher</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Teacher ID"
                    value={newTeacher.id}
                    onChange={(e) =>
                      setNewTeacher({ ...newTeacher, id: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Name"
                    value={newTeacher.name}
                    onChange={(e) =>
                      setNewTeacher({ ...newTeacher, name: e.target.value })
                    }
                  />
                  <Input
                    placeholder="TSC Number"
                    value={newTeacher.tscNumber}
                    onChange={(e) =>
                      setNewTeacher({
                        ...newTeacher,
                        tscNumber: e.target.value,
                      })
                    }
                  />
                  <DialogClose asChild>
                    <Button onClick={handleAdd}>Add Teacher</Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
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
                    <tr key={teacher.id} className="border-t">
                      <td className="p-4">{teacher.id}</td>
                      <td className="p-4">{teacher.name}</td>
                      <td className="p-4">{teacher.tscNumber}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-blue-500 hover:text-blue-700"
                                onClick={() => handleEdit(teacher)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
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
                            onClick={() => handleDelete(teacher.id)}
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
      </div>
    </div>
  );
};

export default SchoolManagement;
