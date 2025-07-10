
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import Alert from "@/components/Alert";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";


// export default function AdminCustomizationPage() {
//   const [customizations, setCustomizations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [alert, setAlert] = useState({ type: "", message: "" });
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [rejectionNote, setRejectionNote] = useState("");
//   const [showRejectionModal, setShowRejectionModal] = useState(false);
//   const [rejectionId, setRejectionId] = useState(null);
//   const [editNote, setEditNote] = useState("");
//   const [editId, setEditId] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
  

//   const token = localStorage.getItem("adminToken");

//   const fetchCustomizations = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("/api/customizations/admin/all", {
//         headers: { Authorization: `Bearer ${token}` },
//         params: {
//           search,
//           status: statusFilter,
//           fromDate,
//           toDate,
//         },
//       });
//       setCustomizations(res.data.customizations);
//     } catch (err) {
//       setAlert({ type: "error", message: "❌ Failed to fetch customizations." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusChange = (id, status) => {
//     if (status === "Rejected") {
//       setRejectionId(id);
//       setShowRejectionModal(true);
//     } else {
//       updateStatus(id, status);
//     }
//   };

//   const updateStatus = async (id, status, note = "") => {
//     try {
//       await axios.put(
//         `/api/customizations/${id}`,
//         { status, note },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setAlert({ type: "success", message: `✅ Status updated to "${status}".` });
//       fetchCustomizations();
//     } catch (err) {
//       console.error("Update error:", err);
//       setAlert({ type: "error", message: "❌ Failed to update status." });
//     }
//   };

//   const submitRejection = () => {
//     if (!rejectionNote.trim()) {
//       return setAlert({ type: "error", message: "Please provide a rejection note." });
//     }
//     updateStatus(rejectionId, "Rejected", rejectionNote.trim());
//     setRejectionNote("");
//     setRejectionId(null);
//     setShowRejectionModal(false);
//   };

//   useEffect(() => {
//     fetchCustomizations();
//   }, [search, statusFilter, fromDate, toDate]);
//   const navigate = useNavigate();
//   return (
//     <div className="p-6">
       
//         <div className="flex items-center gap-4 mb-4">
//   <button
//     onClick={() => navigate("/admin/dashboard")}
//     className="text-[#6D2932] hover:text-yellow-600 transition"
//   >
//     <ArrowLeft className="w-6 h-6" />
//   </button>
//   <h2 className="text-2xl font-bold text-[#6D2932]">Customization Requests</h2>
// </div>

//       {/* <h2 className="text-2xl font-bold text-[#6D2932] mb-4">Customization Requests</h2> */}

//       {/* Filters */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search by product or buyer"
//           className="border px-3 py-2 rounded text-sm"
//         />
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="border px-3 py-2 rounded text-sm"
//         >
//           <option value="">All Status</option>
//           <option value="Pending">Pending</option>
//           <option value="Accepted">Accepted</option>
//           <option value="Rejected">Rejected</option>
//         </select>
//         <input
//           type="date"
//           value={fromDate}
//           onChange={(e) => setFromDate(e.target.value)}
//           className="border px-3 py-2 rounded text-sm"
//         />
//         <input
//           type="date"
//           value={toDate}
//           onChange={(e) => setToDate(e.target.value)}
//           className="border px-3 py-2 rounded text-sm"
//         />
//       </div>

//       {alert.message && (
//         <Alert type={alert.type} onClose={() => setAlert({ type: "", message: "" })}>
//           {alert.message}
//         </Alert>
//       )}

//       {loading ? (
//         <p className="text-gray-500">Loading...</p>
//       ) : customizations.length === 0 ? (
//         <p className="text-gray-500">No customization requests found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {customizations.map((req) => (
//             <div
//               key={req._id}
//               className="border border-gray-200 rounded-xl p-4 shadow hover:shadow-md transition bg-white"
//             >
//               <div className="mb-3 flex gap-4">
//                 {req.imageUrl && (
//                   <img
//                     src={req.imageUrl}
//                     alt="Design Preview"
//                     className="w-24 h-32 rounded-md object-cover border"
//                   />
//                 )}
//                 <div className="flex-1 text-sm">
//                   <p><span className="font-semibold">Product:</span> {req.productId?.title || "N/A"}</p>
//                   <p><span className="font-semibold">Buyer:</span> {req.buyerId?.name} ({req.buyerId?.email})</p>
//                   <p><span className="font-semibold">Size:</span> {req.size}</p>
//                   <p><span className="font-semibold">Color:</span> {req.color}</p>
//                   <p><span className="font-semibold">Phone:</span> {req.phone}</p>
//                   <p><span className="font-semibold">Occasion:</span> {req.occasion || "Other"}</p>
//                   <p><span className="font-semibold">Notes:</span> {req.additionalNotes || "—"}</p>
//                   <p><span className="font-semibold">Design Notes:</span> {req.designChangeNotes || "—"}</p>
//                   <p><span className="font-semibold">Created:</span> {new Date(req.createdAt).toLocaleString()}</p>
//                   {req.status === "Rejected" && req.rejectionNote && (
//                     <p className="mt-2 text-sm text-red-600">
//                       <span className="font-semibold">Rejection Note:</span> {req.rejectionNote}
//                     </p>
//                   )}
//                   {req.status === "Rejected" && req.rejectionNote && (
//   <div className="mt-2 text-sm text-red-600">
//     <p>
//       <span className="font-semibold">Rejection Note:</span> {req.rejectionNote}
//     </p>
//     <button
//       onClick={() => {
//         setEditNote(req.rejectionNote || "");
//         setEditId(req._id);
//         setShowEditModal(true);
//       }}
//       className="mt-1 text-xs text-yellow-600 hover:underline"
//     >
//       ✏️ Edit Note
//     </button>
//   </div>
// )}

//                 </div>
//               </div>

//               <div className="flex justify-between items-center mt-4">
//                 <p className="text-sm font-semibold text-[#6D2932]">
//                   Status:{" "}
//                   <span
//                     className={`px-2 py-1 rounded ${
//                       req.status === "Accepted"
//                         ? "bg-green-100 text-green-700"
//                         : req.status === "Rejected"
//                         ? "bg-red-100 text-red-700"
//                         : "bg-yellow-100 text-yellow-700"
//                     }`}
//                   >
//                     {req.status}
//                   </span>
//                 </p>

//                 <select
//                   value={req.status}
//                   onChange={(e) => handleStatusChange(req._id, e.target.value)}
//                   className="border px-2 py-1 text-sm rounded-md"
//                 >
//                   <option value="Pending">Pending</option>
//                   <option value="Accepted">Accepted</option>
//                   <option value="Rejected">Rejected</option>
//                 </select>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* 🔴 Rejection Modal */}
//       {showRejectionModal && (
//         <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
//             <h3 className="text-lg font-semibold text-red-700 mb-4">Rejection Reason</h3>
//             <textarea
//               value={rejectionNote}
//               onChange={(e) => setRejectionNote(e.target.value)}
//               rows={4}
//               className="w-full border rounded p-2 mb-4"
//               placeholder="Enter reason for rejection"
//             />
//             <div className="flex justify-end gap-2">
//               <Button variant="outline" onClick={() => {
//                 setShowRejectionModal(false);
//                 setRejectionNote("");
//                 setRejectionId(null);
//               }}>
//                 Cancel
//               </Button>
//               <Button className="bg-red-600 text-white" onClick={submitRejection}>
//                 Submit Rejection
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}


// {showEditModal && (
//   <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
//     <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
//       <h3 className="text-lg font-semibold text-yellow-700 mb-4">Edit Rejection Note</h3>
//       <textarea
//         value={editNote}
//         onChange={(e) => setEditNote(e.target.value)}
//         rows={4}
//         className="w-full border rounded p-2 mb-4"
//         placeholder="Update rejection reason"
//       />
//       <div className="flex justify-end gap-2">
//         <Button variant="outline" onClick={() => {
//           setShowEditModal(false);
//           setEditNote("");
//           setEditId(null);
//         }}>
//           Cancel
//         </Button>
//         <Button
//           className="bg-yellow-600 text-white"
//           onClick={async () => {
//             if (!editNote.trim()) {
//               setAlert({ type: "error", message: "Rejection note cannot be empty." });
//               return;
//             }
//             try {
//               await axios.put(`/api/customizations/${editId}`, {
//                 status: "Rejected",
//                 note: editNote.trim()
//               }, {
//                 headers: { Authorization: `Bearer ${token}` }
//               });
//               setAlert({ type: "success", message: "✅ Rejection note updated." });
//               fetchCustomizations();
//               setShowEditModal(false);
//               setEditNote("");
//               setEditId(null);
//             } catch (err) {
//               setAlert({ type: "error", message: "❌ Failed to update note." });
//             }
//           }}
//         >
//           Save Note
//         </Button>
//       </div>
//     </div>
//   </div>
// )}

//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Alert from "@/components/Alert";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AdminCustomizationPage() {
  const [customizations, setCustomizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [rejectionNote, setRejectionNote] = useState("");
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectionId, setRejectionId] = useState(null);
  const [editNote, setEditNote] = useState("");
  const [editId, setEditId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);


  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  const handleDownload = async (imageUrl, fileName = "custom-design.jpg") => {
    try {
      const response = await fetch(imageUrl, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
  
      // Optional: clean up
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("❌ Failed to download image.");
    }
  };
  
  const fetchCustomizations = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/customizations/admin/all", {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, status: statusFilter, fromDate, toDate },
      });
      setCustomizations(res.data.customizations);
    } catch (err) {
      setAlert({ type: "error", message: "❌ Failed to fetch customizations." });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (id, status) => {
    if (status === "Rejected") {
      setRejectionId(id);
      setShowRejectionModal(true);
    } else {
      updateStatus(id, status);
    }
  };

  const updateStatus = async (id, status, note = "") => {
    try {
      await axios.put(
        `/api/customizations/${id}`,
        { status, note },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAlert({ type: "success", message: `✅ Status updated to "${status}".` });
      fetchCustomizations();
    } catch (err) {
      setAlert({ type: "error", message: "❌ Failed to update status." });
    }
  };

  const submitRejection = () => {
    if (!rejectionNote.trim()) {
      return setAlert({ type: "error", message: "Please provide a rejection note." });
    }
    updateStatus(rejectionId, "Rejected", rejectionNote.trim());
    setRejectionNote("");
    setRejectionId(null);
    setShowRejectionModal(false);
  };

  useEffect(() => {
    fetchCustomizations();
  }, [search, statusFilter, fromDate, toDate]);

  return (
    <div className="p-6">
      {/* Back Navigation */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="text-[#6D2932] hover:text-yellow-600 transition"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-[#6D2932]">Customization Requests</h2>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by product or buyer"
          className="border px-3 py-2 rounded text-sm"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded text-sm"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
      
          type="date" 
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border px-3 py-2 rounded text-sm"
        />
        <input
          type="date"
       
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border px-3 py-2 rounded text-sm"
        />
      </div>

      {/* Alerts */}
      {alert.message && (
        <Alert type={alert.type} onClose={() => setAlert({ type: "", message: "" })}>
          {alert.message}
        </Alert>
      )}

      {/* Customization Cards */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : customizations.length === 0 ? (
        <p className="text-gray-500">No customization requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {customizations.map((req) => (
            <div
              key={req._id}
              className="border border-gray-200 rounded-xl p-4 shadow hover:shadow-md transition bg-white"
            >
             <div className="mb-3 flex flex-col md:flex-row gap-4">
                {/* {req.imageUrl && (
                  <img
                    src={req.imageUrl}
                    alt="Design Preview"
                    className="w-24 h-32 rounded-md object-cover border"
                  />
                )} */}

                  {/* User Uploaded Image */}
 
                  <div className="flex flex-wrap gap-4">
  {/* User Uploaded Image */}
  {req.imageUrl && (
    <div className="flex flex-col items-start">
      <img
        src={req.imageUrl}
        alt="User Uploaded Design"
        className="w-24 h-32 rounded-md object-cover border cursor-pointer"
        onClick={() => setPreviewImage(req.imageUrl)}
      />
      <p className="text-xs mt-1 font-medium text-gray-600">User Provided Image</p>
      <button
  onClick={() => handleDownload(req.imageUrl, "custom-image.jpg")}
  className="mt-1 text-xs text-blue-600 underline hover:text-blue-800"
>
  ⬇️ Download Image
</button>

    </div>
  )}

  {/* Product Image */}
  {req.productId?.imageUrl && (
    <div className="flex flex-col items-start">
      <img
        src={req.productId.imageUrl}
        alt="Product Image"
        className="w-24 h-32 rounded-md object-cover border cursor-pointer"
        onClick={() => setPreviewImage(req.productId.imageUrl)}
      />
      <p className="text-xs mt-1 font-medium text-gray-600">Product Image</p>
    </div>
  )}
</div>

              
                <div className="flex-1 text-sm">
                  <p><span className="font-semibold">Product:</span> {req.productId?.title || "N/A"}</p>
                  <p><span className="font-semibold">Buyer:</span> {req.buyerId?.name} ({req.buyerId?.email})</p>
                  <p><span className="font-semibold">Size:</span> {req.size}</p>
                  <p><span className="font-semibold">Color:</span> {req.color}</p>
                  <p><span className="font-semibold">Phone:</span> {req.phone}</p>
                  <p><span className="font-semibold">Occasion:</span> {req.occasion || "Other"}</p>
                  <p><span className="font-semibold">Notes:</span> {req.additionalNotes || "—"}</p>
                  <p><span className="font-semibold">Design Notes:</span> {req.designChangeNotes || "—"}</p>
                  <p><span className="font-semibold">Created:</span> {new Date(req.createdAt).toLocaleString()}</p>

                  {req.status === "Rejected" && req.rejectionNote && (
                    <div className="mt-2 text-sm text-red-600">
                      <p>
                        <span className="font-semibold">Rejection Note:</span> {req.rejectionNote}
                      </p>
                      <button
                        onClick={() => {
                          setEditNote(req.rejectionNote || "");
                          setEditId(req._id);
                          setShowEditModal(true);
                        }}
                        className="mt-1 text-xs hover:underline "
                      >
                        ✏️ Edit Note
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <p className="text-sm font-semibold text-[#6D2932]">
                  Status:{" "}
                  <span
                    className={`px-2 py-1 rounded ${
                      req.status === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : req.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {req.status}
                  </span>
                </p>

                <select
                  value={req.status}
                  onChange={(e) => handleStatusChange(req._id, e.target.value)}
                  className="border px-2 py-1 text-sm rounded-md"
                >
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rejection Note Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold text-red-700 mb-4">Rejection Reason</h3>
            <textarea
              value={rejectionNote}
              onChange={(e) => setRejectionNote(e.target.value)}
              rows={4}
              className="w-full border rounded p-2 mb-4"
              placeholder="Enter reason for rejection"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => {
                setShowRejectionModal(false);
                setRejectionNote("");
                setRejectionId(null);
              }}>
                Cancel
              </Button>
              <Button className="bg-red-600 text-white" onClick={submitRejection}>
                Submit Rejection
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Rejection Note Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold text-yellow-700 mb-4">Edit Rejection Note</h3>
            <textarea
              value={editNote}
              onChange={(e) => setEditNote(e.target.value)}
              rows={4}
              className="w-full border rounded p-2 mb-4"
              placeholder="Update rejection reason"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => {
                setShowEditModal(false);
                setEditNote("");
                setEditId(null);
              }}>
                Cancel
              </Button>
              <Button
                className="bg-yellow-600 text-white"
                onClick={async () => {
                  if (!editNote.trim()) {
                    setAlert({ type: "error", message: "Rejection note cannot be empty." });
                    return;
                  }
                  try {
                    await axios.put(`/api/customizations/${editId}`, {
                      status: "Rejected",
                      note: editNote.trim()
                    }, {
                      headers: { Authorization: `Bearer ${token}` }
                    });
                    setAlert({ type: "success", message: "✅ Rejection note updated." });
                    fetchCustomizations();
                    setShowEditModal(false);
                    setEditNote("");
                    setEditId(null);
                  } catch (err) {
                    setAlert({ type: "error", message: "❌ Failed to update note." });
                  }
                }}
              >
                Save Note
              </Button>
            </div>
          </div>
        </div>
      )}

{/* Fullscreen Image Preview */}
{previewImage && (
  <div
    className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
    onClick={() => setPreviewImage(null)}
  >
    <div className="relative max-w-full max-h-full p-4">
      <button
        onClick={() => setPreviewImage(null)}
        className="absolute top-2 right-2 text-white text-2xl font-bold"
      >
       ❌
      </button>
      <img
        src={previewImage}
        alt="Preview"
        className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-lg"
      />
    </div>
  </div>
)}


    </div>
  );
}


