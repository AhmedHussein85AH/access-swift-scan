
import React from 'react';
import { Button } from "@/components/ui/button";
import { Menu, User, Search, ChevronLeft } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  return (
    <header className="bg-white shadow-sm z-10 px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-4">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <User className="h-5 w-5 text-access-primary" />
            </div>
            <div>
              <h2 className="text-gray-800 font-medium">admin</h2>
              <p className="text-gray-500 text-xs">Admin</p>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-4">
            <h1 className="text-access-primary font-bold text-lg flex items-center">
              Marassi Security
              <span className="ml-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" fill="#1E40AF" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </h1>
          </div>
          <div className="flex items-center">
            <Badge variant="outline" className="rounded-md px-3 py-1 border-gray-300 text-gray-700">العربية</Badge>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
