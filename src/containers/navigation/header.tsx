'use client';

// React Tools
import { useState, useRef, useEffect } from 'react';

// Import hooks
import { useAuthUser } from '@/hooks/auth/useUserAuth';
import { useLogout } from '@/hooks/auth/useLogout';

// Import ikon dari react-icons
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = useAuthUser();
  const logout = useLogout();

  useEffect(() => {
    if (user) {
      setUserName(user.full_name || user.username || 'User');
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-transparent px-6 py-4 relative">
      <div className="flex items-center justify-end gap-x-2">
        <div className="flex items-center space-x-4 pl-10 md:pl-0">
          <h2 className=" text-[14px] md:text-lg font-bold text-gray-700">{userName || 'Pengguna'}</h2>
        </div>

        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setShowDropdown((prev) => !prev)}>
            {/* Menggunakan ikon dari react-icons */}
            <FaUserCircle className="w-8 h-8 text-gray-400" />
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
              <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
