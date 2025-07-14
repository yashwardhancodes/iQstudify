"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { LuUserRoundCog } from "react-icons/lu";
import "react-toastify/dist/ReactToastify.css";

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [deletingId, setDeletingId] = useState(null); // Track the ID of the user being deleted

    // Fetch all users
    const fetchUsers = async () => {
        try {
            const { data } = await axios.get("/api/user/getalluser");
            setUsers(data.users);
            setLoading(false);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch users.");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Handle delete user
    const handleDelete = async (id) => {
        try {
            setDeletingId(id); // Set the ID of the user being deleted
            await axios.delete(`/api/user/deleteuser/${id}`);
            toast.success("User deleted successfully!");
            fetchUsers(); // Refresh the user list
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete user.");
        } finally {
            setDeletingId(null); // Reset the deleting ID
        }
    };

    // Handle edit user
    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    // Handle update user
    const handleUpdate = async () => {
        setIsUpdating(true);
        try {
            const { data } = await axios.put(`/api/user/updateuser/${selectedUser._id}`, selectedUser);
            toast.success("User updated successfully!");
            setIsModalOpen(false);
            fetchUsers();
        } catch (err) {
            console.error(err);
            toast.error("Failed to update user.");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="container mx-auto   text-gray-800  ">
            <ToastContainer />
            <div className="w-full flex items-center justify-start py-3 shadow-sm text-[rgba(7,43,120,1)]">
                <div className="flex items-center h-10 pl-6 space-x-3">
                    <LuUserRoundCog className="text-2xl text-[rgba(7,43,120,1)]" />
                    <h1 className="text-lg font-medium">User Management</h1>
                </div>
            </div>

            {loading ? (
                <p>Loading users...</p>
            ) : (
                <div className="overflow-x-auto p-4">
                    <table className="min-w-full table-auto text-left text-sm rounded-xl overflow-hidden shadow-md">
                        <thead className="bg-[rgba(116,205,255,0.15)] text-gray-800 font-semibold">
                            <tr>
                                <th className="px-6 py-4">Customer Name</th>
                                <th className="px-6 py-4">Contact No</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Registeration Date</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white max-h-[calc(100vh-180px)] overflow-y-auto text-gray-700">
                            {users.map((user) => (
                                <tr key={user._id} className="  hover:bg-gray-50">
                                    <td className="px-6 py-4">{user.name}</td>
                                    <td className="px-6 py-4">{user.contactNumber}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.registeredDate}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className={`text-red-500 hover:text-red-700 transition-colors duration-200 ${deletingId === user._id ? "opacity-50 cursor-not-allowed" : ""
                                                }`}
                                            disabled={deletingId === user._id}
                                            title="Delete"
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            )}

            {/* Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Edit User</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                value={selectedUser.name}
                                onChange={(e) =>
                                    setSelectedUser({ ...selectedUser, name: e.target.value })
                                }
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Username</label>
                            <input
                                type="text"
                                value={selectedUser.username}
                                onChange={(e) =>
                                    setSelectedUser({ ...selectedUser, username: e.target.value })
                                }
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="text"
                                value={selectedUser.password}
                                onChange={(e) =>
                                    setSelectedUser({ ...selectedUser, password: e.target.value })
                                }
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Contact Number</label>
                            <input
                                type="text"
                                value={selectedUser.contactNumber}
                                onChange={(e) =>
                                    setSelectedUser({ ...selectedUser, contactNumber: e.target.value })
                                }
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${isUpdating ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                disabled={isUpdating}
                            >
                                {isUpdating ? "Updating..." : "Update"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}