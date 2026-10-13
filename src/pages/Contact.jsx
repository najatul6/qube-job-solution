const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Contact Info Section */}
          <div className="bg-indigo-600 p-10 text-white flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold mb-4">Get in Touch</h2>
            <p className="text-indigo-100 mb-8 leading-relaxed">
              Have questions about govt job circulars, tech notes, or need support? We'd love to hear from you. Drop us a message!
            </p>
            <div className="space-y-4">
              <p className="flex items-center gap-3 font-medium">
                <svg className="w-5 h-5 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                support@qubejobsolution.com
              </p>
              <p className="flex items-center gap-3 font-medium">
                <svg className="w-5 h-5 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Rangpur, Bangladesh
              </p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="p-10">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md active:scale-95">
                Send Message
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;