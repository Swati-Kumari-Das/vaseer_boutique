import React, { useState,useEffect } from 'react';
import { Menu, X, Heart, ShoppingBag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import axios from '@/utils/axios';
import { isTokenExpired } from '@/utils/jwt';
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Link } from 'react-router-dom';
// ✅ UPDATED: Check both adminToken and token
function getUserRoleFromToken() {
  const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
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
  //const [wishlistCount, setWishlistCount] = useState(0);
  //const [cartCount, setCartCount] = useState(0);

   // ✅ UPDATED: Check both tokens for initial login state
   const [isLoggedIn, setIsLoggedIn] = useState(
    !!(localStorage.getItem('adminToken') || localStorage.getItem('token'))
  );

  const [userRole, setUserRole] = useState(getUserRoleFromToken());

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };
 
  // ✅ UPDATED: Remove both tokens
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    navigate('/');
  };
//   useEffect(() => {
//   const token = localStorage.getItem('token');
//   if (!token) return;

//   const fetchWishlist = async () => {
//     try {
//       const res = await axios.get('/user/wishlist', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const wishlist = res.data.wishlist;
//       setWishlistCount(wishlist.length);
//       localStorage.setItem('wishlist', JSON.stringify(wishlist)); // optional
//     } catch (err) {
//       console.error('Error fetching wishlist');
//     }
//   };

//   fetchWishlist();
// }, []);
 

// useEffect(() => {
//   const fetchWishlist = async () => {
//     try {
//       const res = await axios.get('/wishlist'); // ✅ This becomes: http://localhost:5000/api/user/wishlist
//       const wishlist = res.data.wishlist;
//       setWishlistCount(wishlist.length);
//       localStorage.setItem('wishlist', JSON.stringify(wishlist)); // optional
//     } catch (err) {
//       console.error('Error fetching wishlist', err);
//     }
//   };

//   // Call fetch only if token exists
//   if (localStorage.getItem('token')) {
//     fetchWishlist();
//   }
// }, []);




const { wishlistCount } = useWishlist();
const { cartCount,fetchCart } = useCart();
  useEffect(() => {
    const checkLogin = () => {
      // ✅ UPDATED: Check both tokens again
      const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
      setIsLoggedIn(!!token);
      setUserRole(getUserRoleFromToken());
    };
  
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);



//const token = localStorage.getItem('token')
// useEffect(() => {

//   const fetchCartCount = async () => {
//     if (!token) return;
//     try {
//       const res = await axios.get('/user/cart', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       const cartItems = res.data.cart || [];
//       setCartCount(cartItems.length);
//     } catch (err) {
//       console.error("Cart fetch failed", err);
//     }
//   };

//   fetchCartCount();
// }, []);

useEffect(() => {
  const token = localStorage.getItem('token') || localStorage.getItem('adminToken');

  if (token && isTokenExpired(token)) {
    toast.error("Session expired. Please log in again.");
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    navigate('/auth?type=login');
  }
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
              onClick={() =>{
                 navigate('/');
                 scrollToSection('hero')}}
              className="text-gray-700 hover:text-yellow-600 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => {
                navigate('/');
                scrollToSection('about')}}
              className="text-gray-700 hover:text-yellow-600 transition-colors"
            >
              About
            </button>
              
              {isLoggedIn && userRole === 'buyer' ? (
  <Link
    to="/my-customizations"
    className="hover:text-yellow-700 font-medium transition-colors"
  >
    My Customizations
  </Link>
) : (
  <button
    onClick={() => scrollToSection('customization')}
    className="text-gray-700 hover:text-yellow-600 transition-colors"
  >
    Customization
  </button>
)}


            <button
              //onClick={() => scrollToSection('categories')}
              onClick={() => {
                navigate('/products');
                setIsMenuOpen(false); // if mobile
              }}
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
    className="text-gray-700 hover:text-yellow-600 transition-colors relative"
    variant="ghost"
    size="sm"
     onClick={() => navigate('/wishlist')}
  >
  
    <Heart className="h-4 w-4" />
    {wishlistCount > 0 && (
    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
      {wishlistCount}
    </span>
  )}
  
  </Button>
  <Button
    className="relative text-gray-700 hover:text-yellow-600 transition-colors"
    variant="ghost"
    size="sm"
     onClick={() => navigate('/cart')}
  >
    <ShoppingBag className="h-4 w-4" />
      {cartCount > 0 && (
    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
      {cartCount}
    </span>
  )}
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
                // onClick={() => scrollToSection('categories')}
                onClick={()=>{
                  navigate('/products');
                  setIsMenuOpen(false); // if mobile
                }}
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
    
    
   <Button
  variant="ghost"
  size="sm"
  onClick={() => navigate('/wishlist')}
  className="relative"
>
  <Heart className="h-5 w-5" />
  {wishlistCount > 0 && (
    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
      {wishlistCount}
    </span>
  )}
</Button>

    <Button variant="ghost" size="sm" className="relative">
  <ShoppingBag className="h-5 w-5 text-gray-700 hover:text-yellow-600 transition-colors" />
  {cartCount > 0 && (
    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
      {cartCount}
    </span>
  )}
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





// import React, { useState, useEffect } from 'react';
// import { Menu, X, Heart, ShoppingBag, User,Search } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useNavigate, useLocation } from 'react-router-dom';

// function getUserRoleFromToken() {
//   const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
//   if (!token) return null;

//   try {
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     return payload.role;
//   } catch {
//     return null;
//   }
// }

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(
//     !!(localStorage.getItem('adminToken') || localStorage.getItem('token'))
//   );
//   const [userRole, setUserRole] = useState(getUserRoleFromToken());

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('adminToken');
//     setIsLoggedIn(false);
//     navigate('/');
//   };

//   useEffect(() => {
//     const checkLogin = () => {
//       const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
//       setIsLoggedIn(!!token);
//       setUserRole(getUserRoleFromToken());
//     };
//     window.addEventListener('storage', checkLogin);
//     return () => window.removeEventListener('storage', checkLogin);
//   }, []);

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
//       setSearchQuery('');
//       setIsMenuOpen(false);
//     }
//   };

//   const handleNavScroll = (sectionId) => {
//     if (location.pathname !== '/') {
//       navigate(`/#${sectionId}`);
//     } else {
//       const section = document.getElementById(sectionId);
//       if (section) section.scrollIntoView({ behavior: 'smooth' });
//     }
//     setIsMenuOpen(false);
//   };

//   return (
//     <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex-shrink-0">
//             <h1 className="font-playfair text-2xl font-bold text-gray-900 cursor-pointer" onClick={() => navigate('/')}>
//               Vaseer Boutique
//             </h1>
//           </div>

//           {/* Desktop Links */}
//           <div className="hidden md:flex items-center space-x-6">
//             <button   onClick={() => {
//     navigate('/');
//     handleNavScroll('hero');
//   }} className="text-gray-700 hover:text-yellow-600 transition-colors">
//               Home
//             </button>
//             <button
//   onClick={() => {
//     navigate('/');
//     handleNavScroll('about');
//   }}
//   className="text-gray-700 hover:text-yellow-600 transition-colors"
// >
//   About
// </button>
//             <button onClick={() =>{
//                navigate('/');
//              handleNavScroll('customization');
//             } } className="text-gray-700 hover:text-yellow-600 transition-colors">
//               Customization
//             </button>
//             <button
//               onClick={() => {
//                 navigate('/products');
//                 setIsMenuOpen(false);
//               }}
//               className="text-gray-700 hover:text-yellow-600 transition-colors"
//             >
//               Products
//             </button>

//             {/* Search Bar */}
//             {/* <form onSubmit={handleSearchSubmit} className="relative">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="px-9 py-1.5 border rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               />
//               <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-yellow-600 text-sm font-medium">
//               <Search className="w-4 h-4" />
//               </button>
//             </form> */}

//           </div>

//           {/* Right-side Buttons */}
//           <div className="hidden md:flex items-center space-x-4">
//             {isLoggedIn ? (
//               <>
//                 {userRole === 'admin' && (
//                   <Button
//                     className="text-gray-700 hover:text-yellow-600 transition-colors"
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => navigate('/admin/dashboard')}
//                   >
//                     Dashboard
//                   </Button>
//                 )}
//                 <Button
//                   className="text-gray-700 hover:text-yellow-600 transition-colors"
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => navigate('/account')}
//                 >
//                   <User className="h-4 w-4 mr-1" />
//                   My Account
//                 </Button>
//                 <Button
//                   className="text-gray-700 hover:text-yellow-600 transition-colors"
//                   variant="ghost"
//                   size="sm"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Button
//                   className="text-gray-700 hover:text-yellow-600 transition-colors"
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => navigate('/auth?type=login')}
//                 >
//                   <User className="h-4 w-4 mr-2" />
//                   Login
//                 </Button>
//                 <Button
//                   className="text-gray-700 hover:text-yellow-600 transition-colors"
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => navigate('/auth?type=signup')}
//                 >
//                   Sign Up
//                 </Button>
//               </>
//             )}

//             <Button className="text-gray-700 hover:text-yellow-600" variant="ghost" size="sm">
//               <Heart className="h-4 w-4" />
//             </Button>
//             <Button className="text-gray-700 hover:text-yellow-600" variant="ghost" size="sm">
//               <ShoppingBag className="h-4 w-4" />
//             </Button>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-yellow-600">
//               {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden py-4 border-t border-gray-200">
//             {/* <form onSubmit={handleSearchSubmit} className="mb-4">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full px-3 py-2 border rounded text-sm"
//               />
//             </form> */}
//             <div className="space-y-4">
//               <button onClick={() => handleNavScroll('hero')} className="block w-full text-left text-gray-700 hover:text-yellow-600">
//                 Home
//               </button>
//               <button onClick={() => handleNavScroll('about')} className="block w-full text-left text-gray-700 hover:text-yellow-600">
//                 About
//               </button>
//               <button
//                 onClick={() => handleNavScroll('customization')}
//                 className="block w-full text-left text-gray-700 hover:text-yellow-600"
//               >
//                 Customization
//               </button>
//               <button
//                 onClick={() => {
//                   navigate('/products');
//                   setIsMenuOpen(false);
//                 }}
//                 className="block w-full text-left text-gray-700 hover:text-yellow-600"
//               >
//                 Products
//               </button>

//               <div className="pt-4 border-t border-gray-200 space-y-2">
//                 {isLoggedIn ? (
//                   <>
//                     {userRole === 'admin' && (
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         className="w-full justify-start text-gray-700 hover:text-yellow-600"
//                         onClick={() => {
//                           navigate('/admin/dashboard');
//                           setIsMenuOpen(false);
//                         }}
//                       >
//                         Dashboard
//                       </Button>
//                     )}
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="w-full justify-start text-gray-700 hover:text-yellow-600"
//                       onClick={() => {
//                         navigate('/account');
//                         setIsMenuOpen(false);
//                       }}
//                     >
//                       <User className="h-4 w-4 mr-1" />
//                       My Account
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="w-full justify-start text-gray-700 hover:text-yellow-600"
//                       onClick={() => {
//                         handleLogout();
//                         setIsMenuOpen(false);
//                       }}
//                     >
//                       Logout
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => {
//                         navigate('/auth?type=login');
//                         setIsMenuOpen(false);
//                       }}
//                       className="w-full justify-start text-gray-700 hover:text-yellow-600"
//                     >
//                       <User className="h-4 w-4 mr-2" />
//                       Login
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => {
//                         navigate('/auth?type=signup');
//                         setIsMenuOpen(false);
//                       }}
//                       className="w-full justify-start text-gray-700 hover:text-yellow-600"
//                     >
//                       Sign Up
//                     </Button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


