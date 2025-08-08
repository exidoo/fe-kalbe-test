// "use client" wajib digunakan karena komponen ini menggunakan hooks seperti useState dan useEffect
'use client';

// React Tools
import { useState, useEffect } from 'react';

// Icons dari lucide-react dan react-icons
import { Home, Menu, X, FileText, Clock, Database, User, Key } from 'lucide-react';
import { MdOutlineScience } from 'react-icons/md';

// Router dari Next.js
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = usePathname();

  // State untuk mendeteksi apakah di desktop
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isCurrentDesktop = window.innerWidth >= 768;
      setIsDesktop(isCurrentDesktop);
      if (isCurrentDesktop && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);

  const sidebarItems = [
    {
      title: 'MAIN MENU',
      items: [
        { icon: Home, label: 'Dashboard', to: '/dashboard' },
        { icon: MdOutlineScience, label: 'Analyses', to: '/analyses' },
        { icon: FileText, label: 'Request', to: '#' },
        { icon: Clock, label: 'Tracking Progress', to: '#' },
        { icon: Database, label: 'Data History', to: '#' },
        { icon: FileText, label: 'Documents', to: '#' },
      ],
    },
    {
      title: 'USER',
      items: [
        { icon: User, label: 'Profile', to: '#' },
        { icon: Key, label: 'Change Password', to: '#' },
      ],
    },
  ];

  return (
    <>
      {/* Overlay untuk Mobile (muncul saat sidebar terbuka) */}
      {sidebarOpen && !isDesktop && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSidebarOpen(false)}></div>}

      {/* Tombol Hamburger/Close untuk Mobile */}
      {!isDesktop && (
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`fixed top-4 left-4 z-50 p-2 rounded-lg cursor-pointer bg-[#2d2d2d34] ${sidebarOpen ? 'text-white' : 'text-[#1E201E]'}`}>
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      {/* Sidebar Container */}
      <div
        className={`
          h-full bg-[#1E201E] shadow-2xl flex flex-col transition-all duration-300
          
          /* Styling untuk Mobile (< md breakpoint) */
          ${!isDesktop ? 'fixed top-0 left-0 z-40' : ''}
          ${!isDesktop && sidebarOpen ? 'translate-x-0 w-64' : ''}
          ${!isDesktop && !sidebarOpen ? '-translate-x-full w-0 overflow-hidden' : ''}

          /* Styling untuk Desktop (md breakpoint ke atas) */
          ${isDesktop ? 'relative' : ''}
          ${isDesktop && sidebarOpen ? 'w-64' : 'w-20'}
          ${isDesktop ? 'md:translate-x-0' : ''}
        `}
      >
        {/* Sidebar Header */}
        {/* <div className="flex items-center justify-between p-4 ">
          <h1 className="text-[#dfdcdc] text-center font-bold">Ex</h1>
        </div> */}

        {/* Navigation */}
        <div className="h-full flex flex-col">
          <nav className="p-4">
            {sidebarItems.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-2 text-center">{group.title}</h3>
                <ul className="space-y-2">
                  {group.items.map((item, itemIndex) => {
                    const IconComponent = item.icon;
                    const isActive = location === item.to;

                    return (
                      <li key={itemIndex} className="relative">
                        <Link
                          href={item.to}
                          onClick={() => {
                            if (!isDesktop) setSidebarOpen(false);
                          }}
                          className={`flex items-center rounded-lg transition-colors p-[6px] group
                            ${isActive ? 'text-[#dfdcdc] border-r-2 border-[#d3d3d3]' : 'text-gray-600 hover:bg-[#dfdcdc] hover:text-gray-900'}
                            ${!sidebarOpen ? 'justify-center' : ''}
                          `}
                        >
                          <IconComponent size={20} />
                          {sidebarOpen && <span className="ml-3 font-medium whitespace-nowrap">{item.label}</span>}

                          {/* Tooltip (muncul saat sidebar tertutup dan di-hover) */}
                          {!sidebarOpen && (
                            <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#2d2d2d] text-white text-xs rounded-md shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap">
                              {item.label}
                            </div>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
