"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import MainHomePage from "../user/homepage/page";
import Footer from "../component/footer/page";
import NewHeroPage from "../user/newLandingPage/page";
import Navbar from "../component/NewNavbar/page";
import { FiMenu, FiX } from "react-icons/fi";
import LoginPage from "../user/login/page";
import SignupPage from "../user/signup/page";

export default function ClientLayout({ children }) {
    const pathname = usePathname();
    const isFooterHidden =
        pathname.startsWith("/admin") || pathname.startsWith("/user/categorydetails");

    const [showModal, setShowModal] = useState(null);
    const [navKey, setNavKey] = useState(0);

    useEffect(() => {
        setShowModal(null);
    }, [pathname]);

    useEffect(() => {
        const handleAuthChange = () => {
            setNavKey((prev) => prev + 1);
        };
        window.addEventListener("user-auth-changed", handleAuthChange);
        return () => window.removeEventListener("user-auth-changed", handleAuthChange);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {!pathname.startsWith("/admin") && (
                <Navbar key={navKey} setShowModal={setShowModal} />
            )}

            <main className="flex-1">
                <Suspense fallback={<div className="p-4">Loading...</div>}>
                    {children}
                </Suspense>
            </main>

            {!isFooterHidden && <Footer className="mt-auto" />}

            {/* Modal Handling */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
                    <div
                        className={`bg-white rounded-xl w-full relative ${showModal === 'category'
                            ? 'max-w-4xl max-h-[90vh] overflow-y-auto p-4'
                            : 'max-w-xl'
                            }`}
                    >
                        <button
                            className="absolute top-5 right-8 text-gray-500 hover:text-black"
                            onClick={() => setShowModal(null)}
                        >
                            ✕
                        </button>

                        {showModal === 'login' && <LoginPage setShowModal={setShowModal} />}
                        {showModal === 'signup' && <SignupPage setShowModal={setShowModal} />}
                        {showModal === 'category' && <MainHomePage />}
                    </div>
                </div>
            )}
        </div>
    );
}
