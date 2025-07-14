'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Switch } from '@headlessui/react';
import { IoMdPersonAdd } from "react-icons/io";


export default function AddOperatorPage() {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        contactNumber: '',
        email: '',
        dateOfJoining: '',
        password: '',
        confirmPassword: '',
        permissions: {
            approveRejectQuestion: true,
            addOperators: true,
            editOperators: true,
            addEditCategory: false,
            addEditTopics: true,
            addEditQuestions: false,
            deleteCategory: true,
            deleteQuestions: false,
            viewAnalytics: true,
        },
    });

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleToggle = (key) => {
        setFormData(prev => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [key]: !prev.permissions[key],
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/superadmin/addoperator', formData);
            router.push('/admin/superAdminDashboard/alloperator');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className=" h-[calc(100vh-180px)] flex flex-col justify-between     ">
            <div className="w-full flex items-center justify-between py-4 pr-6  shadow-md text-[rgba(7,43,120,1)]">
                    <div className="flex items-center pl-6 h-10 space-x-3">
                      <IoMdPersonAdd className="text-4xl text-[rgba(239,156,1,1)" />
                      <h1 className="text-xl">Question Request</h1>
                    </div>
                     <button
                        type="submit"
                        className="bg-[rgba(7,43,120,1)] text-white     py-2 px-4 rounded"
                    >
                       + Add Operator
                    </button>
                  </div>
            <div className="     p-12   w-full max-w-6xl flex space-x-6">
                {/* Left Section: Form */}
                <form
                    onSubmit={handleSubmit}
                    className="w-1/2 border  border-[rgba(0,0,0,0.27)] rounded-xl p-6 space-y-4"
                >
                    <div className="flex gap-4">
                        <div className="flex flex-col w-1/2">
                            <label className="text-sm font-medium">First Name</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter Name"
                                className="border border-[rgba(0,0,0,0.27)] rounded px-3 py-2"
                                required
                            />
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label className="text-sm font-medium">Last Name</label>
                            <input
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Enter Name"
                                className="border rounded border-[rgba(0,0,0,0.27)]  px-3 py-2"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Email ID</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter"
                            className="border rounded border-[rgba(0,0,0,0.27)]  px-3 py-2"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Contact No</label>
                        <input
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            placeholder="Enter"
                            className="border rounded border-[rgba(0,0,0,0.27)]  px-3 py-2"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Date of Joining</label>
                        <input
                            name="dateOfJoining"
                            type="date"
                            value={formData.dateOfJoining}
                            onChange={handleChange}
                            className="border rounded border-[rgba(0,0,0,0.27)]  px-3 py-2"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Password</label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter"
                            className="border rounded border-[rgba(0,0,0,0.27)]  px-3 py-2"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Confirm Password</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Enter"
                            className="border border-[rgba(0,0,0,0.27)]  rounded px-3 py-2"
                            required
                        />
                    </div>
                   
                </form>

                {/* Right Section: Permissions */}
                <div className="w-1/2 border border-[rgba(0,0,0,0.27)]  rounded-xl p-6 space-y-4">
                    {Object.entries(formData.permissions).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center   pb-2">
                            <label className="text-gray-800 text-[16px]">
                                {formatLabel(key)}
                            </label>
                            <Switch
                                checked={value}
                                onChange={() => handleToggle(key)}
                                className={`${value ? 'bg-green-500' : 'bg-gray-300'
                                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                            >
                                <span
                                    className={`${value ? 'translate-x-6' : 'translate-x-1'
                                        } inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
                                />
                            </Switch>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Helper function to make permission keys user-friendly
function formatLabel(key) {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^\w/, (c) => c.toUpperCase())
        .replace("Add Edit", "Add / Edit")
        .replace("AddEdit", "Add / Edit")
        .replace("Approve Reject", "Approve /Reject");
}
