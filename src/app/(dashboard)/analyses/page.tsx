import Sidebar from '@/containers/navigation/sidebar';
import Header from '@/containers/navigation/header';

const AnalysesPage = () => {
  return (
    <main className="w-full flex min-h-screen bg-[#f4f1eb]">
      <div>
        <Sidebar />
      </div>

      <section className=" w-full flex flex-col  mx-auto">
        <Header />
      </section>
    </main>
  );
};

export default AnalysesPage;
