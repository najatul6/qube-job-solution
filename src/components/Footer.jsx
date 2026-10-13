import { Link } from 'react-router-dom';
import AdBanner from './AdBanner';

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-auto pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold text-indigo-700 mb-4">
              Qube <span className="text-gray-800">Job Solution</span>
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Your ultimate destination for Diploma Computer Technology notes, IT sector career guidelines, and the latest government job circulars in Bangladesh.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-500 font-medium">
              <li><Link to="/category/govt-jobs" className="hover:text-indigo-600 transition-colors">Govt Job Circulars</Link></li>
              <li><Link to="/category/private-jobs" className="hover:text-indigo-600 transition-colors">IT & Private Jobs</Link></li>
              <li><Link to="/category/tech-notes" className="hover:text-indigo-600 transition-colors">Computer Tech Notes</Link></li>
              <li><Link to="/category/study-material" className="hover:text-indigo-600 transition-colors">Exam Study Materials</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal & Support (AdSense Mandatory) */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Important Links</h4>
            <ul className="space-y-2 text-sm text-gray-500 font-medium">
              <li><Link to="/about" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-indigo-600 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/disclaimer" className="hover:text-indigo-600 transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
          <div className="w-full flex justify-center md:hidden my-4">
            <AdBanner width={320} height={50} dataKey="e4095009000197e7d9ad4881df1372f9" />
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-100 pt-6 text-center text-gray-500 text-sm font-medium">
          <p>&copy; {new Date().getFullYear()} Qube Job Solution. All rights reserved.</p>
          <p className="mt-1">Developed with ❤️ for IT Professionals in Bangladesh.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;