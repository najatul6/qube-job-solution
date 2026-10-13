import { useEffect, useRef } from 'react';

const AdBanner = ({ width, height, dataKey }) => {
  const bannerRef = useRef(null);

  useEffect(() => {
    if (!bannerRef.current || bannerRef.current.hasChildNodes()) return;

    const confScript = document.createElement('script');
    confScript.type = 'text/javascript';
    confScript.innerHTML = `atOptions = {
      'key' : '${dataKey}',
      'format' : 'iframe',
      'height' : ${height},
      'width' : ${width},
      'params' : {}
    };`;

    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    // 🚀 আপনার দেওয়া নতুন লিংক অনুযায়ী আপডেট করা হয়েছে
    invokeScript.src = `https://bicea.org/22/${dataKey}`;
    invokeScript.async = true;

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