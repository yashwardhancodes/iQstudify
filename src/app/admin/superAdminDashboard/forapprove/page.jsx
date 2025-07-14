'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaPen } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";

export default function AdminDashboard() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPendingQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("Authentication required. Please log in.");
          return;
        }

        const response = await axios.get("/api/admin/questionstatus?status=pending", {
          headers: {
            Authorization: `Bearer ${token.trim()}`,
          },
        });

        if (response.data.questions.length === 0) {
          setMessage("No pending questions available.");
        } else {
          setQuestions(response.data.questions);
          setMessage("");
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setMessage("No pending questions found or API route not available.");
        } else {
          setMessage(`Error: ${error.response?.data?.message || error.message}`);
        }
      }
    };

    fetchPendingQuestions();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedQuestions((prev) =>
      prev.includes(id) ? prev.filter((qid) => qid !== id) : [...prev, id]
    );
  };

  const handleApproveSelected = async (id = null) => {
    const questionsToApprove = id ? [id] : selectedQuestions;
    if (questionsToApprove.length === 0) return alert("No questions selected");

    try {
      await axios.put("/api/superadmin/appruvequestions", {
        questionIds: questionsToApprove,
      });

      alert("Questions Approved Successfully");
      setQuestions((prev) => prev.filter((q) => !questionsToApprove.includes(q._id)));
      setSelectedQuestions((prev) => prev.filter((qid) => !questionsToApprove.includes(qid)));
    } catch (error) {
      alert(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleReject = async (id) => {
    const reason = prompt("Enter rejection reason:");
    if (!reason) return;

    try {
      await axios.put(`/api/superadmin/approverejectquestion/${id}`, {
        status: "rejected",
        rejectionReason: reason,
      });

      alert("Question Rejected");
      setQuestions((prev) => prev.filter((q) => q._id !== id));
      setSelectedQuestions((prev) => prev.filter((qid) => qid !== id));
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-100px)]">
      <div className="w-full flex items-center justify-start py-4 shadow-md text-[rgba(7,43,120,1)]">
        <div className="flex items-center pl-6 h-10 space-x-3">
          <FaRegPenToSquare className="text-4xl text-[rgba(239,156,1,1)" />
          <h1 className="text-xl">Question Request</h1>
        </div>
      </div>

      {message && <p className="text-red-500 mb-4">{message}</p>}

      <div className="overflow-x-auto flex-grow p-4">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-[#EAF6FF] text-sm text-left">
            <tr>
              <th className="p-3">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedQuestions(e.target.checked ? questions.map((q) => q._id) : [])
                  }
                  checked={selectedQuestions.length === questions.length && questions.length > 0}
                />
              </th>
              <th className="p-3">Sr.</th>
              <th className="p-3">Question</th>
              <th className="p-3">Category</th>
              <th className="p-3">Sub Category</th>
              <th className="p-3">Topic</th>
              <th className="p-3">Answer & Explanation</th>
              <th className="p-3">Operator Name</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q, index) => (
              <tr key={q._id} className="hover:bg-gray-100 text-sm">
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    checked={selectedQuestions.includes(q._id)}
                    onChange={() => handleCheckboxChange(q._id)}
                  />
                </td>
                <td className="p-3">{index + 1}.</td>
                <td className="p-3">{q.questionText}</td>
                <td className="p-3">{q.category || "Engineering"}</td>
                <td className="p-3">{q.subCategory || "Computer Engineering"}</td>
                <td className="p-3">{q.topic || "Computer Networks"}</td>
                <td className="p-3 text-blue-600 underline cursor-pointer">View</td>
                <td className="p-3">John Doe</td>
                <td className="p-3 flex gap-3 items-center">
                  <FaPen
                    className="text-blue-600 cursor-pointer"
                    title="Edit"
                    onClick={() => alert("Edit Clicked")}
                  />
                  <FaTrash
                    className="text-red-600 cursor-pointer"
                    title="Delete"
                    onClick={() => handleReject(q._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Buttons - Bottom Right */}
      <div className="flex justify-end gap-4 mt-6 pr-8 pb-6">
        <button
          onClick={() => setSelectedQuestions(questions.map((q) => q._id))}
          className="bg-[#00356B] text-white px-6 py-2 rounded hover:bg-[#002c59]"
        >
          Select All
        </button>
        <button
          onClick={() => handleApproveSelected()}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Approve
        </button>
        <button
          onClick={() => {
            selectedQuestions.forEach((id) => handleReject(id));
          }}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
