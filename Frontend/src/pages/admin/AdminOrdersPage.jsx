import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "@/utils/adminAPI";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const navigate = useNavigate();

  const fetchOrders = async (page = 1) => {
    setLoading(true);
    try {
      const res = await getAllOrders(page);
      if (res.data.success) {
        setOrders(res.data.orders);
        setPagination(res.data.pagination);
      }
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      fetchOrders(pagination.page); // ✅ Refresh after status change
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

//   const filteredOrders = orders.filter((order) => {
//     const matchesStatus =
//       statusFilter === "all" || order.orderStatus === statusFilter;
//     const matchesSearch =
//       order?.buyerId?.name?.toLowerCase().includes(searchQuery) ||
//       order?.buyerId?.email?.toLowerCase().includes(searchQuery);
//     return matchesStatus && matchesSearch;
//   });


const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "all" || order.orderStatus === statusFilter;
  
    const buyerName = order?.buyerId?.name?.toLowerCase() || '';
    const buyerEmail = order?.buyerId?.email?.toLowerCase() || '';
    const productTitle = order?.productId?.title?.toLowerCase() || '';
  
    const query = searchQuery.toLowerCase();
  
    const matchesSearch =
      buyerName.includes(query) ||
      buyerEmail.includes(query) ||
      productTitle.includes(query);
  
    return matchesStatus && matchesSearch;
  });
  
  return (
    <div className="min-h-screen bg-[#f9f9f9] p-6">
      {/* Back button */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="text-[#6D2932] hover:text-yellow-600 transition"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-[#6D2932]">All Orders</h2>
      </div>

     
      {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 ">
        <input
          type="text"
          placeholder="🔍 Search by buyer name or email"
          className="border p-2 rounded w-full sm:w-100"
          value={searchQuery}
          onChange={handleSearch}
        />
        <select
          className="border p-2 rounded w-full sm:w-48"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div> */}
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
  <input
    type="text"
    placeholder="🔍 Search by buyer, email, or product name"
    className="border p-2 rounded w-full sm:w-100"
    value={searchQuery}
    onChange={handleSearch}
  />
  <select
    className="border p-2 rounded w-full sm:w-48"
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="all">All Statuses</option>
    <option value="pending">Pending</option>
    <option value="confirmed">Confirmed</option>
    <option value="delivered">Delivered</option>
    <option value="cancelled">Cancelled</option>
  </select>
</div>


      {loading ? (
        <p>Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-gray-500">No matching orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow border">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Buyer</th>
                <th className="p-3">Product</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Change</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">
                    <div className="font-medium">{order.buyerId?.name}</div>
                    <div className="text-sm text-gray-500">
                      {order.buyerId?.email}
                    </div>
                  </td>
                  <td className="p-3">{order.productId?.title}</td>
                  <td className="p-3">{order.quantity}</td>
                  <td className="p-3">₹{order.totalAmount}</td>
                  <td className="p-3 capitalize">{order.orderStatus}</td>
                  <td className="p-3">
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="border p-1 rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="mt-6 flex items-center justify-between">
        <Button
          disabled={pagination.page <= 1}
          onClick={() => fetchOrders(pagination.page - 1)}
        >
          ◀ Prev
        </Button>
        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <Button
          disabled={pagination.page >= pagination.totalPages}
          onClick={() => fetchOrders(pagination.page + 1)}
        >
          Next ▶
        </Button>
      </div>
    </div>
  );
}
