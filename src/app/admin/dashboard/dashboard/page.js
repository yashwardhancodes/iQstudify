"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCheckCircle,
  FaHourglassHalf,
  FaFileAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import CountUp from "react-countup";

const DashboardStats = () => {
  const [approved, setApproved] = useState(0);
  const [pending, setPending] = useState(0);
  const [draft, setDraft] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const total = approved + pending + draft;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const approvedRes = await axios.get(
          "https://iqstudify.com/api/superadmin/allstatusquestions?status=approved"
        );
        const pendingRes = await axios.get(
          "https://iqstudify.com/api/superadmin/allstatusquestions?status=pending"
        );
        const draftRes = await axios.get(
          "https://iqstudify.com/api/superadmin/allstatusquestions?status=draft"
        );

        setApproved(approvedRes?.data?.length || 0);
        setPending(pendingRes?.data?.length || 0);
        setDraft(draftRes?.data?.length || 0);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching counts:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const boxStyle =
    "flex items-center gap-2 bg-white rounded-md shadow-sm px-6 py-4 w-[20vw]";

  const iconWrapStyle =
    "flex items-center justify-center h-12 w-12 bg-blue-50 rounded-full border border-blue-200";

  const textWrap = "flex flex-col text-left";

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Operator Dashboard</h2>

      <div className="flex gap-6 flex-wrap justify-between">
        {/* Total */}
        <div className={boxStyle}>
          <div className={iconWrapStyle}>
            <FaQuestionCircle className="text-yellow-500 text-xl" />
          </div>
          <div className={textWrap}>
            <span className="text-xl font-semibold">
              <CountUp end={isLoading ? 0 : total} duration={1.5} />
            </span>
            <span className="text-gray-500 text-sm">Total Questions</span>
          </div>
        </div>

        {/* Approved */}
        <div className={boxStyle}>
          <div className={iconWrapStyle}>
            <FaCheckCircle className="text-blue-500 text-xl" />
          </div>
          <div className={textWrap}>
            <span className="text-xl font-semibold">
              <CountUp end={isLoading ? 0 : approved} duration={1.5} />
            </span>
            <span className="text-gray-500 text-sm">Approved MCQ&apos;s</span>
          </div>
        </div>

        {/* Pending */}
        <div className={boxStyle}>
          <div className={iconWrapStyle}>
            <FaHourglassHalf className="text-orange-400 text-xl" />
          </div>
          <div className={textWrap}>
            <span className="text-xl font-semibold">
              <CountUp end={isLoading ? 0 : pending} duration={1.5} />
            </span>
            <span className="text-gray-500 text-sm">Pending MCQ&apos;s</span>
          </div>
        </div>

        {/* Draft */}
        <div className={boxStyle}>
          <div className={iconWrapStyle}>
            <FaFileAlt className="text-orange-400 text-xl" />
          </div>
          <div className={textWrap}>
            <span className="text-xl font-semibold">
              <CountUp end={isLoading ? 0 : draft} duration={1.5} />
            </span>
            <span className="text-gray-500 text-sm">Draft MCQ&apos;s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
