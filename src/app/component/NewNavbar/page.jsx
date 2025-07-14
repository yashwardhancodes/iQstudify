// components/Navbar.js
"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function Navbar({ setShowModal }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef();
    const router = useRouter();

    useEffect(() => {
        const handleUserChange = () => {
            const id = localStorage.getItem("userId");
            const name = localStorage.getItem("name");
            setUserId(id);
            setUserName(name);
        };

        handleUserChange(); // initialize on mount
        window.addEventListener("user-auth-changed", handleUserChange);

        return () => {
            window.removeEventListener("user-auth-changed", handleUserChange);
        };
    }, []);




    // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userId");
        window.dispatchEvent(new Event("user-auth-changed"));
        setUserId(null);
        setDropdownOpen(false);
        router.push("/");
    };

    return (
        <header className="bg-white fixed top-0 left-0 mt-5 z-50 w-[calc(100%-5rem)] mx-10 rounded-md shadow">
            <div className="flex justify-between items-center py-2 px-4 sm:px-6 lg:px-10">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 font-bold text-xl">
                    <img src="/logo.png" alt="Logo" className="w-20 h-10 object-contain" />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
                    <Link href="/">Home</Link>
                    <span onClick={() => setShowModal('category')} className="cursor-pointer">Category</span>
                    <Link href="#about">About Us</Link>
                    <Link href="#exam">Exam</Link>
                </nav>

                {/* Right side - Desktop */}
                <div className="hidden md:flex items-center space-x-4">
                    {!userId ? (
                        <>
                            <button
                                onClick={() => setShowModal("login")}
                                className="px-4 py-2 border border-blue-800 text-blue-800 rounded-sm hover:bg-blue-50"
                            >
                                Log In
                            </button>
                            <button
                                onClick={() => setShowModal("signup")}
                                className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900"
                            >
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <div className="relative" ref={dropdownRef}>
                            <div className="flex items-center gap-5">

                                {userName && (
                                    <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                                        {userName}
                                    </span>
                                )}
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="p-2 rounded-full border hover:bg-blue-100"
                                >
                                    <FiUser className="text-xl text-blue-800" />
                                </button>
                            </div>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                                    <button
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            router.push("/user/profile");
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Profile
                                    </button>
                                    <button
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            router.push("/user/savedQuestions");
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Saved Questions
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile menu toggle */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {menuOpen && (
                <div className="md:hidden px-6 pb-4 bg-white shadow">
                    <nav className="flex flex-col space-y-3 text-gray-700 font-medium">
                        <Link href="/">Home</Link>
                        <span onClick={() => setShowModal("category")} className="cursor-pointer">Category</span>
                        <Link href="#about">About Us</Link>
                        <Link href="#exam">Exam</Link>
                    </nav>
                    <div className="mt-4 flex flex-col space-y-2">
                        {!userId ? (
                            <>
                                <button
                                    onClick={() => setShowModal("login")}
                                    className="px-4 py-2 border border-blue-800 text-blue-800 rounded-md"
                                >
                                    Log In
                                </button>
                                <button
                                    onClick={() => setShowModal("signup")}
                                    className="px-4 py-2 bg-blue-800 text-white rounded-md"
                                >
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => router.push("/profile")}
                                    className="px-4 py-2 rounded-md bg-gray-100 text-left"
                                >
                                    Profile
                                </button>
                                <button
                                    onClick={() => router.push("/saved-questions")}
                                    className="px-4 py-2 rounded-md bg-gray-100 text-left"
                                >
                                    Saved Questions
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-red-600 rounded-md hover:bg-gray-100 text-left"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}