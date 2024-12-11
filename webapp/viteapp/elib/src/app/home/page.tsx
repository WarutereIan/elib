"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import axios from "axios";

const ELibraryApp = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Mathematics", "Languages", "Sciences"];

  /*   const books = [
    { id: 1, title: "Mathematics Form 1", category: "Mathematics", form: 1 },
    { id: 2, title: "Mathematics Form 2", category: "Mathematics", form: 2 },
    { id: 3, title: "Mathematics Form 3", category: "Mathematics", form: 3 },
    { id: 4, title: "Mathematics Form 4", category: "Mathematics", form: 4 },
    { id: 5, title: "English Form 1", category: "Languages", form: 1 },
    { id: 6, title: "English Form 2", category: "Languages", form: 2 },
    { id: 7, title: "English Form 3", category: "Languages", form: 3 },
    { id: 8, title: "English Form 4", category: "Languages", form: 4 },
  ]; */

  const [books, setBooks] = useState<any[]>([]);

  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;
    const matchesSearch = book.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

  useEffect(() => {
    getBooks().then();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-300 p-6 flex flex-col">
        <h1 className="text-xl font-bold mb-8">KICD_ELIBRARY</h1>

        <nav className="flex-1">
          <h2 className="text-lg font-semibold mb-4">BOOKS</h2>
          {categories.map((category) => (
            <button
              key={category}
              className={`w-full text-left p-2 mb-2 rounded ${
                selectedCategory === category ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </nav>

        <button className="mt-auto bg-amber-400 text-black p-2 rounded">
          Log Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-orange-500">WELCOME!!!</h1>
            <div className="flex gap-2">
              {/* Cartoon illustrations would go here */}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-full w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <a href={`http://localhost:5000/user/get-book/${book.filename}`}>
              <Card
                key={book._id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-center">{book.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-200 h-40 mb-4 rounded flex items-center justify-center">
                    {/* Book cover placeholder */}
                    <span className="text-gray-500">Book Cover</span>
                  </div>
                  <p className="text-center text-sm text-gray-600"></p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ELibraryApp;
