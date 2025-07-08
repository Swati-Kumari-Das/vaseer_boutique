import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Products", path: "/admin/products" },
  { label: "Customization Requests", path: "/admin/customizations" },
  { label: "Orders", path: "/admin/orders" },
  { label: "Product Reviews", path: "/admin/reviews/products" },
  { label: "Boutique Reviews", path: "/admin/reviews/boutique" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="bg-white shadow-md border-r border-gray-200 w-64 h-screen fixed top-0 left-0 p-6 hidden md:block">
      <h2 className="text-xl font-bold mb-6 text-[#6D2932]">Admin Panel</h2>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
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
