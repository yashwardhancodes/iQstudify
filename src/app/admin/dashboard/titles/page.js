"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const [titles, setTitles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const titleRes = await axios.get("/api/admin/getalltitlecategory");
        console.log("Title API Response:", titleRes.data);
        setTitles(titleRes.data);
      } catch (error) {
        console.error("Error fetching title categories:", error);
      }
    };

    fetchTitles();
  }, []);

  return (
    <div className="p- bg-[#74CDFF26] min-h-screen p-4">
      <h1 className="text-xl  mb-2 text-black">Category Titles</h1>

      
      <div className="flex flex-wrap justify-between gap-2">
        {titles.map((title) => (
          <div
            key={title._id}
            className="px-4 py-4 rounded-lg shadow-md cursor-pointer text-md font-medium bg-white text-[#072B78] transition-[0.3s] hover:shadow-lg w-[20vw] h-[15vh]"
            onClick={() => router.push(`/admin/dashboard/category/${title._id}`)} 
          >
            {title.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
