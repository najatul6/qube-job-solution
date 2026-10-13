const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">Terms & Conditions</h1>
        
        <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing this website, we assume you accept these terms and conditions. Do not continue to use Qube Job Solution if you do not agree to take all of the terms and conditions stated on this page.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-3">2. License & Copyright</h2>
            <p>Unless otherwise stated, Qube Job Solution and/or its licensors own the intellectual property rights for all material on the website. All intellectual property rights are reserved. You may access this from Qube Job Solution for your own personal use subjected to restrictions set in these terms and conditions.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-3">3. Educational Use</h2>
            <p>The tech notes and study materials provided on this platform are for educational purposes only. Users are encouraged to verify information with official textbooks and notices.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;