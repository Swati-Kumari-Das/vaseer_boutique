// // import { Link, useLocation } from "react-router-dom";

// // const links = [
// //   { label: "Dashboard", path: "/admin/dashboard" },
// //   { label: "Products", path: "/admin/products" },
// //   { label: "Customization Requests", path: "/admin/customizations" },
// //   { label: "Orders", path: "/admin/orders" },
// //   { label: "Product Reviews", path: "/admin/reviews/products" },
// //   { label: "Boutique Reviews", path: "/admin/reviews/boutique" },
// // ];

// // export default function Sidebar() {
// //   const location = useLocation();

// //   return (
// //     <aside className="bg-white shadow-md border-r border-gray-200 w-64 h-screen fixed top-0 left-0 p-6 hidden md:block">
// //       <h2 className="text-xl font-bold mb-6 text-[#6D2932]">Admin Panel</h2>
// //       <ul className="space-y-2">
// //         {links.map((link) => (
// //           <li key={link.path}>
// //             <Link
// //               to={link.path}
// //               className={`block px-4 py-2 rounded-lg transition ${
// //                 location.pathname === link.path
// //                   ? "bg-yellow-400 text-white font-semibold"
// //                   : "hover:bg-yellow-100 text-gray-700"
// //               }`}
// //             >
// //               {link.label}
// //             </Link>
// //           </li>
// //         ))}
// //       </ul>
// //     </aside>
// //   );
// // }
// import { Link, useLocation } from "react-router-dom";

// const links = [
//   { label: "Dashboard", path: "/admin/dashboard" },
//   { label: "Products", path: "/admin/products" },
//   { label: "Customization Requests", path: "/admin/customizations" },
//   { label: "Orders", path: "/admin/orders" },
//   { label: "Product Reviews", path: "/admin/reviews/products" },
//   { label: "Boutique Reviews", path: "/admin/reviews/boutique" },
// ];

// export default function Sidebar({ isMobile = false, onClose }) {
//   const location = useLocation();

//   return (
//     <aside
//       className={`bg-white shadow-md border-r border-gray-200 w-64 h-full ${
//         isMobile ? "p-6 fixed top-0 left-0 z-50" : "p-6 hidden md:block"
//       }`}
//     >
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold text-[#6D2932]">Admin Panel</h2>

//         {/* ✅ Close button only for mobile */}
//         {isMobile && (
//           <button onClick={onClose} className="text-gray-600 hover:text-red-500 text-xl font-bold">
//             ✕
//           </button>
//         )}
//       </div>

//       <ul className="space-y-2">
//         {links.map((link) => (
//           <li key={link.path}>
//             <Link
//               to={link.path}
//               onClick={onClose} // ✅ Auto-close on mobile after click
//               className={`block px-4 py-2 rounded-lg transition ${
//                 location.pathname === link.path
//                   ? "bg-yellow-400 text-white font-semibold"
//                   : "hover:bg-yellow-100 text-gray-700"
//               }`}
//             >
//               {link.label}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </aside>
//   );
// }



import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";

const links = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Products", path: "/admin/products" },
  { label: "Customization Requests", path: "/admin/customizations" },
  { label: "Orders", path: "/admin/orders" },
  { label: "Product Reviews", path: "/admin/reviews/products" },
  { label: "Boutique Reviews", path: "/admin/reviews/boutique" },
];

export default function Sidebar({ isMobile, onClose }) {
  const location = useLocation();

  return (
    <aside
      className={`w-64 h-full bg-white shadow-md border-r border-gray-200 z-50
        ${isMobile ? "fixed top-0 left-0 p-6" : "hidden md:block fixed top-0 left-0 p-6"}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#6D2932]">Admin Panel</h2>
        {isMobile && (
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>

      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              onClick={onClose}
              className={`block px-4 py-2 rounded-lg transition ${
                location.pathname === link.path
                  ? "bg-yellow-400 text-white font-semibold"
                  : "hover:bg-yellow-100 text-gray-700"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
