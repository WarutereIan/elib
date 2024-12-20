import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherLoginPage = () => {
  const [credentials, setCredentials] = useState({
    tsc_no: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle registration logic here
    const url = "http://localhost:5000/user/teacher-login";

    try {
      const signupRequest = {
        method: "post",
        data: credentials,
        url: url,
      };

      const response = await axios(signupRequest);
      console.log(response.data);
      //store token in local stoage
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error: any) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="min-h-screen flex">
        {/* Left Panel */}
        <div className="w-1/3 bg-sky-400 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">KICD_ELIBRARY</h1>
          </div>
          <div className="flex justify-center">
            <img
              src="/api/placeholder/150/150"
              alt="KICD Logo"
              className="w-32 h-32"
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-2/3 bg-gray-100 flex items-center justify-center p-8">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-8 text-center">
                Teacher Log In
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="id" className="block text-gray-600">
                    TSC No.
                  </label>
                  <Input
                    id="id"
                    name="id"
                    type="text"
                    value={credentials.id}
                    onChange={handleChange}
                    className="w-full rounded-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-gray-600">
                    Password
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={credentials.password}
                    onChange={handleChange}
                    className="w-full rounded-full"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-full py-2"
                  onClick={() => {}}
                >
                  Log In
                </Button>
                <p
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  {" "}
                  Not signed up? Register{" "}
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default TeacherLoginPage;
