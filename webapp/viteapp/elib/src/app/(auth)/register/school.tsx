"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

const SchoolSignUpPage = () => {
  const [formData, setFormData] = useState({
    schoolName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    school: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (formData.schoolName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
      isValid = false;
    } else {
      newErrors.firstName = "";
    }

    if (formData.email.trim().length < 2) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle registration logic here
      console.log("Registration attempted with:", formData);
      navigate("/home");
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
              Create School Account
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* <div className="space-y-2">
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
                </div> */}
              </div>

              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-gray-600">
                  School Name
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.schoolName}
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
                <label htmlFor="school" className="block text-gray-600">
                  Email
                </label>
                <Input
                  id="school"
                  name="school"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-full"
                  required
                />
                {errors.school && (
                  <span className="text-red-500 text-sm">{errors.school}</span>
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
            <p>
              Already registered? <a href="/"> Sign In</a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SchoolSignUpPage;
