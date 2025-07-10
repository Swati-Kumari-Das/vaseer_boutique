

//3rd try

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../components/admin/Sidebar";
// import StatCard from "../components/admin/StatCard";
// import MonthlySalesChart from "../components/admin/MonthlySalesChart";
// import { Button } from "@/components/ui/button";

// export default function AdminDashboard() {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [monthlySales, setMonthlySales] = useState([]);
//   const [lastUpdated, setLastUpdated] = useState(null);
//   const [error, setError] = useState("");

//   const token = localStorage.getItem("adminToken");

//   // ✅ Fetch dashboard stats
//   const fetchStats = async () => {
//     try {
//       const res = await axios.get("/api/dashboard/stats", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("📊 Stats API response:", res.data); // 🔍 Add this log
//       if (res.data.success) {
//         setStats(res.data.stats);
//         setLastUpdated(new Date().toLocaleTimeString());
//         setError("");
//       }
//     } catch (err) {
//       console.error("Error fetching dashboard stats:", err);
//       setError("Failed to load dashboard stats.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Fetch monthly sales data
//   const fetchMonthlySales = async () => {
//     try {
//       const res = await axios.get("/api/dashboard/monthly-sales", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("📈 Monthly sales response:", res.data); // 🔍 Add this log
//       if (res.data.success) {
//         setMonthlySales(res.data.monthlyData);
//         setError("");
//       }
//     } catch (err) {
//       console.error("Error fetching monthly sales:", err);
//       setError("Failed to load monthly sales.");
//     }
//   };

//   // ⏱️ Auto-fetch every 30 seconds
//   useEffect(() => {
//     fetchStats();
//     fetchMonthlySales();
//     const interval = setInterval(() => {
//       fetchStats();
//       fetchMonthlySales();
//     }, 30000);

//     return () => clearInterval(interval);
//   }, []);

//   const handleManualRefresh = () => {
//     setLoading(true);
//     fetchStats();
//     fetchMonthlySales();
//   };

//   const statData = [
//     { label: "Total Buyers", value: stats?.totalUsers ?? 0 },
//     { label: "Total Orders", value: stats?.totalOrders ?? 0 },
//     { label: "Customizations", value: stats?.totalCustomizations ?? 0 },
//     { label: "Revenue", value: `₹${stats?.totalRevenue ?? 0}` },
//   ];
//   console.log("📦 Render stats object:", stats);


//   return (
//     <div className="flex bg-[#f9f9f9] min-h-screen">
//       <Sidebar />
//       <main className="flex-1 ml-0 md:ml-64 p-6">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-[#333]">Admin Dashboard</h1>
//             {lastUpdated && (
//               <p className="text-sm text-gray-500 mt-1">
//                 Last updated at: {lastUpdated}
//               </p>
//             )}
//           </div>
//           <Button onClick={handleManualRefresh} className="bg-[#6D2932] text-white">
//             🔄 Refresh
//           </Button>
//         </div>

//         {error && (
//           <div className="text-red-500 text-sm mb-4">{error}</div>
//         )}

//         {loading ? (
//           <div className="text-gray-500 text-lg">Loading statistics...</div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {statData.map((stat, idx) => (
//                 <StatCard key={idx} label={stat.label} value={stat.value} />
//               ))}
//             </div>

//             <h2 className="mt-10 text-xl font-semibold text-[#333]">Customization Status</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
//               {stats?.customizationStatusCount?.length > 0 ? (
//                 stats.customizationStatusCount.map((s, i) => (
//                   <StatCard
//                     key={i}
//                     label={s._id.charAt(0).toUpperCase() + s._id.slice(1)}
//                     value={s.count}
//                   />
//                 ))
//               ) : (
//                 <p className="text-gray-400 col-span-full">
//                   No customization data available
//                 </p>
//               )}
//             </div>

//             <MonthlySalesChart data={monthlySales} />
//           </>
//         )}
//       </main>
//     </div>
//   );
// }


//4th

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/admin/Sidebar";
import StatCard from "../components/admin/StatCard";
import MonthlySalesChart from "../components/admin/MonthlySalesChart";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react"; // ✅ Hamburger icon

import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [monthlySales, setMonthlySales] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ✅ Toggle for mobile sidebar

  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  const fetchStats = async () => {
    try {
      const res = await axios.get("/api/dashboard/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setStats(res.data.stats);
        setLastUpdated(new Date().toLocaleTimeString());
        setError("");
      }
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
      setError("Failed to load dashboard stats.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthlySales = async () => {
    try {
      const res = await axios.get("/api/dashboard/monthly-sales", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setMonthlySales(res.data.monthlyData);
        setError("");
      }
    } catch (err) {
      console.error("Error fetching monthly sales:", err);
      setError("Failed to load monthly sales.");
    }
  };

  useEffect(() => {
    fetchStats();
    fetchMonthlySales();
    const interval = setInterval(() => {
      fetchStats();
      fetchMonthlySales();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    setLoading(true);
    fetchStats();
    fetchMonthlySales();
  };

  const statData = [
    { label: "Total Buyers", value: stats?.totalUsers ?? 0 },
    { label: "Total Orders", value: stats?.totalOrders ?? 0 },
    { label: "Customizations", value: stats?.totalCustomizations ?? 0 },
    { label: "Revenue", value: `₹${stats?.totalRevenue ?? 0}` },
  ];

  return (
    <div className="flex bg-[#f9f9f9] min-h-screen">
      {/* ✅ Sidebar for large screens */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

     {/* Sidebar overlay for mobile */}
     {isSidebarOpen && (
  <div
    className="fixed inset-0 bg-opacity-40 z-40 md:hidden"
    onClick={() => setIsSidebarOpen(false)}
  >
    <div
      className="absolute top-0 left-0 z-50"
      onClick={(e) => e.stopPropagation()} // ✅ prevent closing when clicking inside sidebar
    >
      <Sidebar isMobile onClose={() => setIsSidebarOpen(false)} />
    </div>
  </div>
)}


<main className="flex-1 md:ml-64 p-4 sm:p-6 transition-all duration-300 relative">

        {/* ✅ Hamburger Button (visible on small screens only) */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden mb-4 p-2 rounded-md text-gray-600 bg-white shadow border border-gray-200"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex items-center justify-between mb-6">
          <div>
          <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => navigate("/")}
          className="text-[#6D2932] hover:text-yellow-600 transition"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-[#6D2932]">Admin DashBoard</h2>
      </div>
          
            {lastUpdated && (
              <p className="text-sm text-gray-500 mt-1">
                Last updated at: {lastUpdated}
              </p>
            )}
          </div>
          <Button onClick={handleManualRefresh} className="bg-[#6D2932] text-white">
            🔄 Refresh
          </Button>
        </div>

        {error && (
          <div className="text-red-500 text-sm mb-4">{error}</div>
        )}

        {loading ? (
          <div className="text-gray-500 text-lg">Loading statistics...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {statData.map((stat, idx) => (
                <StatCard key={idx} label={stat.label} value={stat.value} />
              ))}
            </div>

            <h2 className="mt-10 text-xl font-semibold text-[#333]">Customization Status</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
              {stats?.customizationStatusCount?.length > 0 ? (
                stats.customizationStatusCount.map((s, i) => (
                  <StatCard
                    key={i}
                    label={s._id.charAt(0).toUpperCase() + s._id.slice(1)}
                    value={s.count}
                  />
                ))
              ) : (
                <p className="text-gray-400 col-span-full">
                  No customization data available
                </p>
              )}
            </div>

            <MonthlySalesChart data={monthlySales} />
          </>
        )}
      </main>
    </div>
  );
}
