import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, BookMarked, LogIn, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';
import { supabase } from '../lib/supabase';

const Navbar = () => {
  const { user, setUser } = useStore();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookMarked className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">Digital Books</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/favorites"
                  className="text-gray-600 hover:text-indigo-600 flex items-center"
                >
                  <Heart className="h-6 w-6" />
                </Link>
                <Link
                  to="/cart"
                  className="text-gray-600 hover:text-indigo-600 flex items-center"
                >
                  <ShoppingCart className="h-6 w-6" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-indigo-600 flex items-center"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-gray-600 hover:text-indigo-600 flex items-center"
              >
                <LogIn className="h-6 w-6" />
                <span className="ml-1">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;