
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  User, 
  Car, 
  QrCode, 
  Search, 
  Upload, 
  Calendar 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <QrCode className="w-5 h-5" /> },
    { name: 'Employees', path: '/employees', icon: <User className="w-5 h-5" /> },
    { name: 'Vehicles', path: '/vehicles', icon: <Car className="w-5 h-5" /> },
    { name: 'Scanner', path: '/scanner', icon: <QrCode className="w-5 h-5" /> },
    { name: 'Search', path: '/search', icon: <Search className="w-5 h-5" /> },
    { name: 'Bulk Upload', path: '/upload', icon: <Upload className="w-5 h-5" /> },
    { name: 'Expiration', path: '/expiration', icon: <Calendar className="w-5 h-5" /> },
  ];

  return (
    <div className={`bg-white shadow-lg ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
      <div className="h-16 flex items-center justify-center border-b">
        <span className={`text-access-primary font-bold ${isOpen ? 'block' : 'hidden'}`}>
          ACCESS SWIFT
        </span>
        {!isOpen && <QrCode className="h-8 w-8 text-access-primary" />}
      </div>
      <nav className="mt-5 px-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-4 py-3 mt-1 text-sm font-medium rounded-md transition-colors duration-200 ${
              location.pathname === item.path
                ? 'bg-access-secondary text-white'
                : 'text-gray-600 hover:bg-access-highlight hover:text-access-primary'
            }`}
          >
            {item.icon}
            <span className={`ml-4 ${isOpen ? 'block' : 'hidden'}`}>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
