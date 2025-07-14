import { FaCogs, FaDesktop, FaCode, FaGlobe, FaArrowRight } from "react-icons/fa";
import { IoEarthSharp } from "react-icons/io5";

export default function ExamCategories() {
    return (
        <section className="py-10 bg-white">
            <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-2xl font-semibold">Browse Top Exam Categories</h2>
                <p className="text-gray-600 mb-8">Choose your target exam and start practicing now.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {/* Engineering */}
                    <div className="bg-blue-700 text-white rounded-4xl p-8 text-left space-y-2">
                        <FaCogs className="text-6xl" />
                        <h3 className="font-bold">Engineering</h3>
                        <p className="text-sm">Computer Science, Civil, Electrical, Mechanical</p>
                    </div>

                    {/* Basic Computer */}
                    <div className="bg-blue-400 text-white rounded-4xl p-5   text-left space-y-2">
                        <FaDesktop className="text-6xl" />
                        <h3 className="font-bold">Basic Computer</h3>
                        <p className="text-sm">Hardware, Software, MS Office, OS, HTML</p>
                    </div>

                    {/* IT & Programming */}
                    <div className="bg-yellow-400 text-black rounded-4xl p-5 text-left space-y-2">
                        <FaCode className="text-6xl" />
                        <h3 className="font-bold">IT & Programming</h3>
                        <p className="text-sm">Python, Java, HTML/CSS, C++, Git</p>
                    </div>

                    {/* General Knowledge */}
                    <div className="bg-sky-500 text-white rounded-4xl p-5 text-left space-y-2">
                        <IoEarthSharp className="text-6xl" />
                        <h3 className="font-bold">General Knowledge</h3>
                        <p className="text-sm">Static GK, Affairs, Geo, Polity</p>
                    </div>

                    {/* Browse All */}
                    <div className="flex justify-center items-center">
                        <button className="group text-black hover:text-blue-500 transition-all flex flex-col items-center">
                            {/* Gradient Circular Border */}
                            <div className="p-[2px] rounded-full bg-gradient-to-tr from-[#021B79] to-[#0575E6]">
                                <div className="bg-white rounded-full p-6">
                                    <FaArrowRight className="text-4xl group-hover:text-[#0575E6] transition" />
                                </div>
                            </div>

                            {/* Text Below */}
                            <span className="mt-2 text-sm">Browse All</span>
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
