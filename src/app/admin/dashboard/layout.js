"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useRouter, usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaShieldAlt, FaQuestionCircle, FaPlusSquare, FaEdit, FaFolderOpen, FaSitemap } from "react-icons/fa";
import { icon } from "@fortawesome/fontawesome-svg-core";
import Image from "next/image";
// import logo from '/logo.png'


export default function DashboardLayout({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [operatorName, setOperatorName] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    const menuItems = [
        { title: "Dashboard", path: "/admin/dashboard/dashboard", icon: <FaShieldAlt /> },
        { title: "Total MCQ's", path: "/admin/dashboard/totalmcqs", icon: <FaSitemap /> },
        { title: "Add Questions", path: "/admin/dashboard/addedquestions", icon: <FaQuestionCircle /> },
        { title: "Add Title Category", path: "/admin/dashboard/addtitlecategory", icon: <FaPlusSquare /> },
        { title: "Add Category", path: "/admin/dashboard/addcategory", icon: <FaEdit /> },
        { title: "Add Section", path: "/admin/dashboard/addSection", icon: <FaFolderOpen /> },
        { title: "Categories and Subcategories", path: "/admin/dashboard/titles", icon: <FaSitemap /> },
    ];

    useEffect(() => {
        const operator = localStorage.getItem("operatorInfo");
        if (operator) {
            try {
                const parsed = JSON.parse(operator);
                setOperatorName(parsed?.name || "Operator");
            } catch (err) {
                console.error("Invalid operatorInfo in storage");
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("operatorInfo");
        localStorage.removeItem("operatorToken");
        router.push("/admin/OperatorLogin");
    };

    return (
        <>
            <div className="flex flex-col h-screen">

                

                <header className="h-16 text-black flex items-center justify-between px-6 shadow-md z-40">
                    <Image
                    src="/logo.png"
                    alt="Logo"
                    width={100}
                    height={100}
                    className=""
                />
                    <div className="flex items-center gap-2">
                        <button
                            className="md:hidden text-black"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
                        </button>
                        {/* <h1 className="text-xl font-semibold">Operator Panel</h1> */}
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-black">Hi, {operatorName}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            Logout
                        </button>
                    </div>
                </header>


                <div className="flex flex-1 overflow-hidden ">

                    <aside
                        className={`  w-64 p-4 transition-transform duration-300 overflow-y-auto z-30 shadow-lg
                            ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                            fixed md:relative md:translate-x-0 md:block h-full`}
                    >
                        <nav className="space-y-2">
                            {menuItems.map((item, index) => {
                                const isActive = pathname === item.path;

                                return (
                                    <div key={index} className="flex items-center gap-4 ">
                                        <p className={`text-xl transition-[0.3s] p-2 bg-[#74CDFF26] rounded-full ${isActive ? "text-white bg-[#EF9C01]" : "text-gray-600 "}`}>
                                            {item?.icon}
                                        </p>
                                        <a
                                            href={item.path}
                                            className={`block px-3 py-2 rounded-md text-sm font-medium transition-[0.3s] ${isActive ? "text-blue-800" : "hover:text-blue-800"
                                                }`}
                                        >
                                            {item.title}
                                        </a>
                                    </div>
                                );
                            })}
                        </nav>

                    </aside>

                    {/* Content */}
                    <main className="flex-1 overflow-auto p-6">
                        {children}
                    </main>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ zIndex: 9999 }}
            />
        </>
    );
}
