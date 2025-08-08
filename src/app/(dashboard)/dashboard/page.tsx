import Sidebar from '@/containers/navigation/sidebar';

const DashboardPage = () => {
  return (
    <main className="w-full flex min-h-screen bg-[#f4f1eb]">
      <div className="">
        <Sidebar />
      </div>
      <div className=" px-6 mt-10">
        <div className="flex items-center justify-between">
          <div className="flex-1 w-full">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome!</h1>
            <p className="text-gray-600 text-sm leading-relaxed ">Your profile has been created! Now you can start browsing the trading panel and use the profile page to complete all the necessary information.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
