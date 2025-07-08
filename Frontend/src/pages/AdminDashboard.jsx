
// // /pages/AdminDashboard.jsx
// import React, { useEffect, useState } from 'react';
// import { getDashboardStats, getMonthlySales, createProduct } from '../utils/adminAPI';
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';

// const AdminDashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [monthlySales, setMonthlySales] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '', category: '', price: '', description: '', customizable: false, fabricType: 'Cotton'
//   });
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const statsRes = await getDashboardStats();
//         const salesRes = await getMonthlySales();
  
//         setStats(statsRes?.data?.stats || null);
//         setMonthlySales(Array.isArray(salesRes?.data?.monthlyData) ? salesRes.data.monthlyData : []);
//       } catch (error) {
//         console.error("Dashboard fetch failed:", error);
//       }
//     };
//     fetchData();
//   }, []);
  
//   const handleCreateProduct = async (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     Object.entries(formData).forEach(([k, v]) => form.append(k, v));
//     if (image) form.append('image', image);

//     try {
//       await createProduct(form);
//       alert('Product created!');
//       setShowForm(false);
//     } catch (err) {
//       alert('Error creating product');
//     }
//   };

//   return (
//     <div className="p-6 pt-20 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold text-[#6D2932] mb-4">Admin Dashboard</h1>

//       {stats === null ? (
//   <p>Loading stats...</p>
// ) : stats &&
//   (stats.totalUsers > 0 ||
//    stats.totalOrders > 0 ||
//    stats.totalCustomizations > 0 ||
//    stats.totalRevenue > 0) ? (
//   <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
//     <StatCard label="Users" value={stats.totalUsers} />
//     <StatCard label="Orders" value={stats.totalOrders} />
//     <StatCard label="Customizations" value={stats.totalCustomizations} />
//     <StatCard label="Revenue" value={`₹${stats.totalRevenue}`} />
//   </div>
// ) : (
//   <p className="text-gray-500 italic">No stats to show.</p>
// )}


//       <div className="mb-6">
//         <Button onClick={() => setShowForm(!showForm)} className="bg-[#6D2932] text-white">
//           + Add Product
//         </Button>
//       </div>

//       {showForm && (
//         <form
//           onSubmit={handleCreateProduct}
//           className="bg-white shadow p-4 rounded-lg space-y-4"
//           encType="multipart/form-data"
//         >
//           <div className="grid grid-cols-2 gap-4">
//             <Input placeholder="Title" required onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
//             <Input placeholder="Category" required onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
//             <Input type="number" placeholder="Price" required onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
//             <select className="border rounded px-3 py-2" onChange={(e) => setFormData({ ...formData, fabricType: e.target.value })}>
//               <option value="Cotton">Cotton</option>
//               <option value="Silk">Silk</option>
//               <option value="Linen">Linen</option>
//             </select>
//           </div>
//           <textarea
//             placeholder="Description"
//             className="w-full border px-3 py-2 rounded"
//             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//           />
//           <div className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               onChange={(e) => setFormData({ ...formData, customizable: e.target.checked })}
//             />
//             <label>Customizable</label>
//           </div>
//           <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
//           <Button type="submit" className="bg-[#6D2932] text-white">Create</Button>
//         </form>
//       )}

// {Array.isArray(monthlySales) && monthlySales.length > 0 && (
//         <div className="mt-10 bg-white shadow rounded-lg p-4">
//           <h2 className="text-lg font-semibold text-[#6D2932] mb-4">Monthly Sales</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart
//               data={monthlySales.map(item => ({
//                 name: `${item._id.month}/${item._id.year}`,
//                 sales: item.totalSales
//               }))}
//             >
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="sales" stroke="#6D2932" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       )}
//     </div>
//   );
// };

// const StatCard = ({ label, value }) => (
//   <div className="bg-white rounded-xl p-4 shadow text-center">
//     <p className="text-gray-600 text-sm">{label}</p>
//     <p className="text-2xl font-bold text-[#6D2932]">{value}</p>
//   </div>
// );

// export default AdminDashboard;




//2nd try
// src/pages/AdminDashboard.jsx
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
//   const [lastUpdated, setLastUpdated] = useState(null); // ✅ Add this

//   const token = localStorage.getItem("adminToken");

//   // 🔁 Function to fetch stats
//   const fetchStats = async () => {
//     try {
//       const res = await axios.get("/api/admin/stats", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.data.success) {
//         setStats(res.data.stats);
//         setLastUpdated(new Date().toLocaleTimeString()); // ✅ update timestamp
//       }
//     } catch (err) {
//       console.error("Error fetching dashboard stats:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔁 Function to fetch monthly sales
//   const fetchMonthlySales = async () => {
//     try {
//       const res = await axios.get("/api/admin/monthly-sales", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.data.success) {
//         setMonthlySales(res.data.monthlyData);
//       }
//     } catch (err) {
//       console.error("Error fetching monthly sales:", err);
//     }
//   };

//   // 🔁 Fetch both on mount & every 30 seconds
//   useEffect(() => {
//     fetchStats();
//     fetchMonthlySales();

//     const interval = setInterval(() => {
//       fetchStats();
//       fetchMonthlySales();
//     }, 30000); // every 30s

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
//                 <p className="text-gray-400 col-span-full">No customization data available</p>
//               )}
//             </div>

//             <MonthlySalesChart data={monthlySales} />
//           </>
//         )}
//       </main>
//     </div>
//   );
// }

//3rd try

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/admin/Sidebar";
import StatCard from "../components/admin/StatCard";
import MonthlySalesChart from "../components/admin/MonthlySalesChart";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [monthlySales, setMonthlySales] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("adminToken");

  // ✅ Fetch dashboard stats
  const fetchStats = async () => {
    try {
      const res = await axios.get("/api/dashboard/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("📊 Stats API response:", res.data); // 🔍 Add this log
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

  // ✅ Fetch monthly sales data
  const fetchMonthlySales = async () => {
    try {
      const res = await axios.get("/api/dashboard/monthly-sales", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("📈 Monthly sales response:", res.data); // 🔍 Add this log
      if (res.data.success) {
        setMonthlySales(res.data.monthlyData);
        setError("");
      }
    } catch (err) {
      console.error("Error fetching monthly sales:", err);
      setError("Failed to load monthly sales.");
    }
  };

  // ⏱️ Auto-fetch every 30 seconds
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
  console.log("📦 Render stats object:", stats);


  return (
    <div className="flex bg-[#f9f9f9] min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#333]">Admin Dashboard</h1>
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


