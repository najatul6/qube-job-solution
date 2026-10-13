import { useEffect, useRef } from 'react';

const AdBanner = ({ width, height, dataKey }) => {
  const bannerRef = useRef(null);

  useEffect(() => {
    // অ্যাড যদি একবার লোড হয়ে যায়, তবে দ্বিতীয়বার লোড হওয়া বন্ধ করবে
    if (!bannerRef.current || bannerRef.current.hasChildNodes()) return;

    // Adsterra এর অপশন স্ক্রিপ্ট
    const confScript = document.createElement('script');
    confScript.type = 'text/javascript';
    confScript.innerHTML = `atOptions = {
      'key' : '${dataKey}',
      'format' : 'iframe',
      'height' : ${height},
      'width' : ${width},
      'params' : {}
    };`;

    // Adsterra এর মেইন স্ক্রিপ্ট
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = `//www.highperformanceformat.com/${dataKey}/invoke.js`;
    invokeScript.async = true;

    // স্ক্রিপ্টগুলো আমাদের div এর ভেতর পুশ করা
    bannerRef.current.appendChild(confScript);
    bannerRef.current.appendChild(invokeScript);
  }, [dataKey, height, width]);

  return (
    <div className="w-full flex justify-center items-center overflow-hidden my-4">
      <div ref={bannerRef}></div>
    </div>
  );
};

export default AdBanner;