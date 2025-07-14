"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function SubcategoryPage() {
  const { subcategoryId } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [categoryName, setCategoryName] = useState("...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subcategoryId) return;

    const fetchSubcategories = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/admin/getallsubcategory");
        const allSubs = res.data.subcategories || [];

        const filtered = allSubs.filter(
          (sub) => sub?.category?._id === subcategoryId
        );

        setSubcategories(filtered);

        // Set category name if exists
        if (filtered.length > 0) {
          setCategoryName(filtered[0]?.category?.name || "Unnamed Category");
        } else {
          setCategoryName("Unknown Category");
        }
      } catch (err) {
        console.error("Failed to fetch subcategories:", err);
        setSubcategories([]);
        setCategoryName("Unknown Category");
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [subcategoryId]);

  return (
    <div className=" min-h-screen bg-[#74CDFF26] p-4">
      <h1 className="text-2xl  mb-4 text-black">
        Subcategories
      </h1>

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent "></div>
        </div>
      ) : subcategories.length > 0 ? (
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
          {subcategories.map((sub) => (
            <div
              key={sub._id}
              className="p-4 bg-white shadow rounded-md text-center h-[15vh] w-[20vw]"
            >
              <h2 className="text-md font-medium text-[#072B78] truncate overflow-hidden whitespace-nowrap">
                {sub.name}
              </h2>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-6">
          No subcategories found for this category.
        </p>
      )}
    </div>
  );
}
