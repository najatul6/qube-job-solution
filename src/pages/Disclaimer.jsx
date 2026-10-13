const Disclaimer = () => {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">Disclaimer</h1>
        
        <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            All the information on this website - <strong>Qube Job Solution</strong> - is published in good faith and for general information and educational purposes only.
          </p>
          
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 rounded-r-lg">
            <p className="font-bold text-yellow-800 dark:text-yellow-200">Important Note:</p>
            <p className="text-yellow-700 dark:text-yellow-300 mt-1">We are NOT a government portal or official recruitment agency. The job circulars and study materials provided here are gathered from various public sources, official websites, and daily newspapers for the convenience of job seekers and students.</p>
          </div>

          <p>
            We do not make any warranties about the completeness, reliability, and accuracy of this information. Any action you take upon the information you find on this website is strictly at your own risk. Qube Job Solution will not be liable for any losses and/or damages in connection with the use of our website.
          </p>
          
          <p>
            From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;