import { useEffect } from "react";

const About = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);
    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-6">About Us</h1>

                <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    <p>
                        Welcome to <strong>Qube Job Solution</strong>, your number one source for all Govt Job circulars, IT/Private Job updates, and comprehensive Computer Tech notes.
                    </p>
                    <p>
                        We are dedicated to providing you the very best of educational resources, with an emphasis on accuracy, timely updates, and a user-friendly experience. Founded with a vision to help Diploma Computer Technology students and job seekers in Bangladesh, Qube Job Solution aims to bridge the gap between academic learning and professional career preparation.
                    </p>
                    <p>
                        We hope you enjoy our resources as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;