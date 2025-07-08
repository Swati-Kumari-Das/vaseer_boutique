// src/components/admin/StatCard.jsx
import { BarChart3, Users, DollarSign, Package } from "lucide-react";

export default function StatCard({ label, value }) {
  const iconMap = {
    Buyers: <Users className="text-yellow-600" />,
    Orders: <Package className="text-yellow-600" />,
    Customizations: <BarChart3 className="text-yellow-600" />,
    Revenue: <DollarSign className="text-yellow-600" />,
  };

  const key = Object.keys(iconMap).find((k) =>
    label.toLowerCase().includes(k.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
      <div className="text-3xl">{iconMap[key] || <BarChart3 />}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h3 className="text-2xl font-bold text-[#6D2932]">{value}</h3>
      </div>
    </div>
  );
}
