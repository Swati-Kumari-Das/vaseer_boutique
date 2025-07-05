import React, { useState,useEffect } from 'react';
import { Menu, X, Heart, ShoppingBag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

function getUserRoleFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role; // either "admin" or "buyer"
  } catch (error) {
    return null;
  }
}
const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(getUserRoleFromToken());

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };
  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
      setUserRole(getUserRoleFromToken());
    };
  
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="font-playfair text-2xl font-bold text-gray-900 ">
              Vaseer Boutique
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-gray-700 hover:text-yellow-600 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-yellow-600 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('customization')}
              className="text-gray-700 hover:text-yellow-600 transition-colors"
            >
              Customization
            </button>
            <button
              onClick={() => scrollToSection('categories')}
              className="text-gray-700 hover:text-yellow-600 transition-colors"
            >
              Products
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4 ">
  {isLoggedIn ? (
    <>
      {/* ✅ Dashboard only for admin */}
      {userRole === 'admin' && (
        <Button
          className="text-gray-700 hover:text-yellow-600 transition-colors"
          variant="ghost"
          size="sm"
          onClick={() => navigate('/admin/dashboard')}
        >
          Dashboard
        </Button>
      )}

      {/* ✅ Common for all logged-in users */}
      <Button
        className="text-gray-700 hover:text-yellow-600 transition-colors"
        variant="ghost"
        size="sm"
        onClick={() => navigate('/account')}
      >
        <User className="h-4 w-4 mr-1" />
        My Account
      </Button>

      <Button
        className="text-gray-700 hover:text-yellow-600 transition-colors"
        variant="ghost"
        size="sm"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </>
  ) : (
    <>
      <Button
        className="text-gray-700 hover:text-yellow-600 transition-colors"
        variant="ghost"
        size="sm"
        onClick={() => navigate('/auth?type=login')}
      >
        <User className="h-4 w-4 mr-2" />
        Login
      </Button>
      <Button
        className="text-gray-700 hover:text-yellow-600 transition-colors"
        variant="ghost"
        size="sm"
        onClick={() => navigate('/auth?type=signup')}
      >
        Sign Up
      </Button>
    </>
  )}

  {/* Common Icons */}
  <Button
    className="text-gray-700 hover:text-yellow-600 transition-colors"
    variant="ghost"
    size="sm"
  >
    <Heart className="h-4 w-4" />
  </Button>
  <Button
    className="text-gray-700 hover:text-yellow-600 transition-colors"
    variant="ghost"
    size="sm"
  >
    <ShoppingBag className="h-4 w-4" />
  </Button>
</div>


          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-yellow-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-4">
              <button
                onClick={() => scrollToSection('hero')}
                className="block w-full text-left text-gray-700 hover:text-yellow-600 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left text-gray-700 hover:text-yellow-600 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('customization')}
                className="block w-full text-left text-gray-700 hover:text-yellow-600 transition-colors"
              >
                Customization
              </button>
              <button
                onClick={() => scrollToSection('categories')}
                className="block w-full text-left text-gray-700 hover:text-yellow-600 transition-colors"
              >
                Products
              </button>
              <div className="pt-4 border-t border-gray-200 space-y-2">
  {isLoggedIn ? (
    <>
      {/* ✅ Dashboard only for admin */}
      {userRole === 'admin' && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            navigate('/admin/dashboard');
            setIsMenuOpen(false);
          }}
          className="w-full justify-start text-gray-700 hover:text-yellow-600 transition-colors"
        >
          Dashboard
        </Button>
      )}

      {/* ✅ Common for logged-in users */}
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start text-gray-700 hover:text-yellow-600 transition-colors"
        onClick={() => navigate('/account')}
      >
        <User className="h-4 w-4 mr-1" />
        My Account
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          handleLogout();
          setIsMenuOpen(false);
        }}
        className="w-full justify-start text-gray-700 hover:text-yellow-600 transition-colors"
      >
        Logout
      </Button>
    </>
  ) : (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/auth?type=login')}
        className="w-full justify-start text-gray-700 hover:text-yellow-600 transition-colors"
      >
        <User className="h-4 w-4 mr-2" />
        Login
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/auth?type=signup')}
        className="w-full justify-start text-gray-700 hover:text-yellow-600 transition-colors"
      >
        Sign Up
      </Button>
    </>
  )}

  {/* ❤️ 🛍 Icons (always visible) */}
  <div className="flex space-x-2 pt-2">
    <Button variant="ghost" size="sm">
      <Heart className="h-4 w-4" />
    </Button>
    <Button variant="ghost" size="sm">
      <ShoppingBag className="h-4 w-4" />
    </Button>
  </div>
</div>


            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;