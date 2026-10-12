import PostCard from '../components/PostCard';

const Home = () => {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Daily Tech & Govt Job Prep Notes</h1>
        <p className="text-gray-600">Your daily dose of computer technology notes and job solutions.</p>
      </div>
      
      {/* 728x90 Horizontal Ad Placement (Responsive: Hidden on very small screens, block on md) */}
      <div className="w-full h-[90px] bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center mb-8 text-gray-500 rounded-lg">
        Horizontal Ad (728x90)
      </div>

      <div className="flex flex-col gap-6">
        <PostCard 
          id="1" 
          title="Database Normalization Complete Guide (1NF to BCNF)" 
          date="Oct 12, 2026" 
          category="DBMS" 
          snippet="Learn how to reduce data redundancy and improve data integrity in database systems using normalization techniques. Essential for 10th-grade govt IT jobs."
        />
        <PostCard 
          id="2" 
          title="OSI Model 7 Layers Explained with Shortcuts" 
          date="Oct 11, 2026" 
          category="Networking" 
          snippet="A deep dive into the OSI model layers, protocols, and devices used in each layer. Includes mnemonic shortcuts for easy memorization."
        />
      </div>
    </div>
  );
};

export default Home;