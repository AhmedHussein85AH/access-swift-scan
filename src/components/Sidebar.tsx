
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  User, 
  Car, 
  QrCode, 
  Search, 
  Upload, 
  Calendar,
  ChevronRight,
  FileText
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <QrCode className="w-5 h-5" /> },
    { name: 'الصلاحيات', path: '/permissions', icon: <FileText className="w-5 h-5" /> },
    { name: 'المديرين', path: '/managers', icon: <User className="w-5 h-5" /> },
    { name: 'إدارة المكونات', path: '/components', icon: <QrCode className="w-5 h-5" /> },
    { name: 'افراد الامن', path: '/security', icon: <User className="w-5 h-5" /> },
    { name: 'الموظفين و العمال', path: '/employees', icon: <User className="w-5 h-5" /> },
    { name: 'التقارير', path: '/reports', icon: <FileText className="w-5 h-5" /> },
    { name: 'Vehicles', path: '/vehicles', icon: <Car className="w-5 h-5" /> },
    { name: 'Scanner', path: '/scanner', icon: <QrCode className="w-5 h-5" /> },
    { name: 'Search', path: '/search', icon: <Search className="w-5 h-5" /> },
  ];

  return (
    <div className={`bg-white shadow-lg ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
      <div className="h-16 flex items-center justify-center border-b">
        <div className="text-center py-4">
          <div className="text-sm text-gray-500">APPS & PAGES</div>
        </div>
      </div>
      <nav className="mt-5 px-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center justify-between px-4 py-3 mt-1 text-sm font-medium rounded-md transition-colors duration-200 ${
              location.pathname === item.path
                ? 'bg-indigo-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center">
              {item.icon}
              <span className={`ml-4 ${isOpen ? 'block' : 'hidden'}`}>{item.name}</span>
            </div>
            {location.pathname === item.path && (
              <ChevronRight className="w-4 h-4" />
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
