
// // "use client";

// // import Link from "next/link";
// // import { useRouter } from "next/navigation";
// // import { useState, useEffect, useRef } from "react";
// // import { FaChevronUp, FaChevronDown, FaUserCircle } from "react-icons/fa";

// // export default function ProfileDropdown() {
// //     const router = useRouter();
// //     const [profileOpen, setProfileOpen] = useState(false);
// //     const [userName, setUserName] = useState(null);
// //     const dropdownRef = useRef(null);

// //     const toggleProfile = () => {
// //         setProfileOpen((prev) => !prev);
// //     };

// //     // Close dropdown on outside click
// //     useEffect(() => {
// //         const handleClickOutside = (event) => {
// //             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //                 setProfileOpen(false);
// //             }
// //         };

// //         document.addEventListener("mousedown", handleClickOutside);
// //         return () => document.removeEventListener("mousedown", handleClickOutside);
// //     }, []);

// //     const goToProfile = () => {
// //         router.push("/user/profile");
// //     };

// //     useEffect(() => {
// //         const name = localStorage.getItem("name");
// //         if (name) {
// //             setUserName(name);
// //         }
// //     }, []);

// //     const logout = () => {
// //         localStorage.removeItem("token");
// //         localStorage.removeItem("userId");
// //         router.push("/user/login");
// //     };

// //     return (
// //         <div className="relative" ref={dropdownRef}>
// //             <button
// //                 onClick={toggleProfile}
// //                 className="flex items-center gap-2 text-white hover:text-yellow-400 transition duration-200"
// //             >
// //                 <FaUserCircle className="text-2xl" />
// //                 <span className="hidden sm:block">{userName}</span>
// //                 {profileOpen ? <FaChevronUp /> : <FaChevronDown />}
// //             </button>

// //             {profileOpen && (
// //                 <ul className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-lg w-48 border border-gray-200 z-50">
// //                     <li
// //                         className="hover:bg-blue-100 px-4 py-2 cursor-pointer transition duration-150"
// //                         onClick={goToProfile}
// //                     >
// //                         Profile
// //                     </li>
// //                     <li className="hover:bg-blue-100 px-4 py-2">
// //                         <Link href="/user/savedQuestions">Saved Questions</Link>
// //                     </li>
// //                     <li
// //                         className="hover:bg-blue-100 px-4 py-2 cursor-pointer transition duration-150"
// //                         onClick={logout}
// //                     >
// //                         Logout
// //                     </li>
// //                 </ul>
// //             )}
// //         </div>
// //     );
// // }


// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState, useEffect, useRef } from "react";
// import {
//     FaChevronUp,
//     FaChevronDown,
//     FaUserCircle,
//     FaUser,
//     FaSignOutAlt,
//     FaBookmark,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// export default function ProfileDropdown() {
//     const router = useRouter();
//     const [profileOpen, setProfileOpen] = useState(false);
//     const [userName, setUserName] = useState(null);
//     const dropdownRef = useRef(null);

//     const toggleProfile = () => {
//         setProfileOpen((prev) => !prev);
//     };

//     // Close dropdown on outside click
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (
//                 dropdownRef.current &&
//                 !dropdownRef.current.contains(event.target)
//             ) {
//                 setProfileOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     const goToProfile = () => {
//         router.push("/user/profile");
//     };

//     useEffect(() => {
//         const name = localStorage.getItem("name");
//         if (name) {
//             setUserName(name);
//         }
//     }, []);

//     const logout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("userId");
//         router.push("/user/login");
//     };

//     return (
//         <div className="relative z-50" ref={dropdownRef}>
//             <button
//                 onClick={toggleProfile}
//                 className="flex items-center gap-2 text-white hover:text-yellow-400 transition duration-200"
//             >
//                 <FaUserCircle className="text-2xl" />
//                 <span className="hidden sm:block">{userName}</span>
//                 {profileOpen ? <FaChevronUp /> : <FaChevronDown />}
//             </button>

//             <AnimatePresence>
//                 {profileOpen && (
//                     <motion.ul
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         transition={{ duration: 0.2 }}
//                         className="fixed right-4 top-72 sm:right-10 sm:top-20 bg-white text-black shadow-lg rounded-lg w-56 border border-gray-200 overflow-hidden z-[9999]"
//                     >


//                         <li
//                             className="flex items-center gap-2 hover:bg-blue-100 px-4 py-2 cursor-pointer transition duration-150"
//                             onClick={goToProfile}
//                         >
//                             <FaUser className="text-blue-500" /> Profile
//                         </li>
//                         <li className="flex items-center gap-2 hover:bg-blue-100 px-4 py-2">
//                             <FaBookmark className="text-yellow-500" />
//                             <Link href="/user/savedQuestions">Saved Questions</Link>
//                         </li>
//                         <li
//                             className="flex items-center gap-2 hover:bg-blue-100 px-4 py-2 cursor-pointer transition duration-150"
//                             onClick={logout}
//                         >
//                             <FaSignOutAlt className="text-red-500" /> Logout
//                         </li>
//                     </motion.ul>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// }


// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState, useEffect, useRef } from "react";
// import { FaChevronUp, FaChevronDown, FaUserCircle, FaUser, FaSignOutAlt, FaBookmark } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// export default function ProfileDropdown({ handleLogout }) {
//     const router = useRouter();
//     const [profileOpen, setProfileOpen] = useState(false);
//     const [userName, setUserName] = useState(null);
//     const dropdownRef = useRef(null);

//     useEffect(() => {
//         const name = localStorage.getItem("name");
//         if (name) setUserName(name);
//     }, []);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setProfileOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     // const logout = () => {
//     //     localStorage.removeItem("token");
//     //     localStorage.removeItem("userId");
//     //     router.push("/user/login");
//     // };
//     // const logout = () => {
//     //     localStorage.removeItem("userId");
//     //     window.dispatchEvent(new Event("user-auth-changed")); // 🔥 Fire custom event
//     //     setUserId(null); // Optional, but good to keep it synced immediately
//     //     router.push("/user/login");
//     //     setIsOpen(false); // Close sidebar after logout
//     // };

//     return (
//         <div className="relative z-50" ref={dropdownRef}>
//             <button
//                 onClick={() => setProfileOpen((prev) => !prev)}
//                 className="flex items-center gap-2 text-white hover:text-yellow-400"
//             >
//                 <FaUserCircle className="text-2xl" />
//                 <span className="hidden sm:block">{userName}</span>
//                 {profileOpen ? <FaChevronUp /> : <FaChevronDown />}
//             </button>

//             <AnimatePresence>
//                 {profileOpen && (
//                     <motion.ul
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         transition={{ duration: 0.2 }}
//                         className="absolute right-0 mt-2 w-48 bg-white text-black border shadow-md rounded-md overflow-hidden"
//                     >
//                         <li className="flex items-center gap-2 px-4 py-2 hover:bg-blue-100 cursor-pointer" onClick={() => router.push("/user/profile")}> <FaUser /> Profile </li>
//                         <li className="flex items-center gap-2 px-4 py-2 hover:bg-blue-100 cursor-pointer">
//                             <Link href="/user/savedQuestions" className="flex items-center gap-2"> <FaBookmark /> Saved Questions </Link>
//                         </li>
//                         <li className="flex items-center gap-2 px-4 py-2 hover:bg-blue-100 cursor-pointer" onClick={handleLogout}> <FaSignOutAlt /> Logout </li>
//                     </motion.ul>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// }
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { FaChevronUp, FaChevronDown, FaUserCircle, FaUser, FaSignOutAlt, FaBookmark } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfileDropdown({ handleLogout }) {
    const router = useRouter();
    const [profileOpen, setProfileOpen] = useState(false);
    const [userName, setUserName] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const name = localStorage.getItem("name");
        if (name) setUserName(name);

        const handleAuthChange = () => {
            const updatedName = localStorage.getItem("name");
            setUserName(updatedName);
        };

        window.addEventListener("user-auth-changed", handleAuthChange);

        return () => {
            window.removeEventListener("user-auth-changed", handleAuthChange);
        };
    }, []);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    console.log(userName, 'userName');

    return (
        <div className="relative z-50" ref={dropdownRef}>
            <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 text-white hover:text-yellow-400"
            >
                <FaUserCircle className="text-2xl" />
                <span className="hidden sm:block">{userName}</span>
                {profileOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            <AnimatePresence>
                {profileOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white text-black border border-blue-100 shadow-md rounded-md overflow-hidden"
                    >
                        <li
                            className="flex items-center gap-2 px-4 py-2 hover:bg-blue-100 text-gray-600 font-semibold cursor-pointer"
                            onClick={() => router.push("/user/profile")}
                        >
                            <FaUser /> Profile
                        </li>
                        <li className="flex items-center gap-2 px-4 py-2 hover:bg-blue-100 cursor-pointer">
                            <Link href="/user/savedQuestions" className="flex items-center gap-2 text-gray-600 font-semibold">
                                <FaBookmark /> Saved Questions
                            </Link>
                        </li>
                        <li
                            className="flex items-center gap-2 px-4 py-2  cursor-pointer  text-red-600 font-semibold"
                            onClick={handleLogout}
                        >
                            <FaSignOutAlt /> Logout
                        </li>
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}