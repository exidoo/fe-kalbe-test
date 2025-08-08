import Sidebar from '@/containers/navigation/sidebar';

const DashboardPage = () => {
  return (
    <main className="w-full flex min-h-screen bg-[#f4f1eb]">
      <div className="">
        <Sidebar />
      </div>
      <h1>Welcome To Dasboard Page</h1>
    </main>
  );
};

export default DashboardPage;
