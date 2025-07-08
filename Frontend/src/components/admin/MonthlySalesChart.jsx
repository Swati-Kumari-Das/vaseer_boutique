// src/components/admin/MonthlySalesChart.jsx
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  } from "recharts";
  
  export default function MonthlySalesChart({ data }) {
    const formatted = data.map(item => ({
      name: `${item._id.month}/${item._id.year}`,
      sales: item.totalSales,
      orders: item.count
    }));
  
    return (
      <div className="bg-white p-5 rounded-xl shadow-md border mt-8">
        <h3 className="text-lg font-bold text-[#6D2932] mb-4">Monthly Sales</h3>
        {formatted.length === 0 ? (
          <p className="text-gray-500">No sales data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={formatted} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#FACC15" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    );
  }
  