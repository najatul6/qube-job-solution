const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 font-medium">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-3">1. Introduction</h2>
            <p>Welcome to Qube Job Solution. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-3">2. Google AdSense & Cookies</h2>
            <p>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-3">3. Data We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows: Identity Data, Contact Data, and Usage Data. We do not collect any Special Categories of Personal Data about you.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;