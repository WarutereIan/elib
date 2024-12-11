"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherSignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    school: "",
    tscNo: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    school: "",
    tscNo: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
      isValid = false;
    } else {
      newErrors.firstName = "";
    }

    if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
      isValid = false;
    } else {
      newErrors.lastName = "";
    }

    if (formData.school.trim().length < 2) {
      newErrors.school = "School name is required";
      isValid = false;
    } else {
      newErrors.school = "";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    } else {
      newErrors.confirmPassword = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle registration logic here
      const url = "http://localhost:5000/user/school-signup";

      try {
        const signupRequest = {
          method: "post",
          data: formData,
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
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
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
              Create Teacher Account
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-gray-600">
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="rounded-full"
                    required
                  />
                  {errors.firstName && (
                    <span className="text-red-500 text-sm">
                      {errors.firstName}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-gray-600">
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="rounded-full"
                    required
                  />
                  {errors.lastName && (
                    <span className="text-red-500 text-sm">
                      {errors.lastName}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="school" className="block text-gray-600">
                  School
                </label>
                <Input
                  id="school"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  className="rounded-full"
                  required
                />
                {errors.school && (
                  <span className="text-red-500 text-sm">{errors.school}</span>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="tscNo" className="block text-gray-600">
                  TSC No.
                </label>
                <Input
                  id="tscNo"
                  name="tscNo"
                  value={formData.tscNo}
                  onChange={handleChange}
                  className="rounded-full"
                  required
                />
                {errors.tscNo && (
                  <span className="text-red-500 text-sm">{errors.tscNo}</span>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-gray-600">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="rounded-full"
                  required
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-600"
                >
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="rounded-full"
                  required
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-full py-2 mt-6"
              >
                Sign Up
              </Button>
            </form>
            <p style={{ justifySelf: "center", marginTop: 2 }}>
              Already registered?{" "}
              <a style={{ color: "blue" }} href="/">
                {" "}
                Sign In
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherSignUpPage;
