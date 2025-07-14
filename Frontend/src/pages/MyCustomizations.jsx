import React, { useEffect, useState } from 'react';
import api from '@/utils/api';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderCircle, Trash2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Alert from '@/components/Alert';

const MyCustomizations = () => {
  const [customizations, setCustomizations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [alert, setAlert] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const fetchCustomizations = async () => {
    try {
      const res = await api.get('/customizations/my-customizations');
      setCustomizations(res.data.customizations);
      setFiltered(res.data.customizations);
    } catch (err) {
      console.error('Failed to fetch:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/customizations/${deleteId}`);
      setCustomizations(prev => prev.filter(c => c._id !== deleteId));
      setAlert({ type: 'success', message: 'Customization deleted successfully' });
    } catch (err) {
      console.error(err);
      setAlert({ type: 'error', message: 'Failed to delete customization' });
    } finally {
      setDeleteId(null);
      setShowConfirm(false);
    }
  };

  useEffect(() => {
    fetchCustomizations();
  }, []);

  useEffect(() => {
    let result = [...customizations];
    if (search) {
      result = result.filter(c =>
        (c.productId?.title || '').toLowerCase().includes(search.toLowerCase()) ||
        (c.occasion || '').toLowerCase().includes(search.toLowerCase()) ||
        (c.additionalNotes || '').toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusFilter) {
      result = result.filter(c => c.status === statusFilter);
    }
    if (dateFilter) {
      result = result.filter(c => new Date(c.createdAt).toLocaleDateString() === dateFilter);
    }
    setFiltered(result);
  }, [search, statusFilter, dateFilter, customizations]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 relative">
      <h2 className="text-3xl font-playfair font-bold text-center mb-6 text-[#6D2932]">
        My Customization Requests
      </h2>

      {alert && (
        <Alert type={alert.type} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <Input
          placeholder="Search by title, occasion, or notes"
          className="w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border px-3 py-2 rounded-md"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
        <Input
          type="date"
          className="w-48"
          onChange={(e) => setDateFilter(new Date(e.target.value).toLocaleDateString())}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoaderCircle className="animate-spin h-8 w-8 text-yellow-600" />
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No customization requests found.</p>
      ) : (
        <div className="space-y-6">
          {filtered.map((c) => (
            <Card key={c._id} className="shadow-md border border-gray-200 p-4">
              <div className="flex flex-col md:flex-row gap-4">
                {(c.imageUrl || c.productId?.imageUrl) && (
                  <div className="flex gap-4 md:w-1/3 w-full">
                    {c.imageUrl && (
                      <img
                        src={c.imageUrl}
                        alt="User Provided"
                        className="w-full md:w-48 h-48 object-cover rounded"
                      />
                    )}
                    {c.productId?.imageUrl && (
                      <img
                        src={c.productId.imageUrl}
                        alt="Product"
                        className="w-full md:w-48 h-48 object-cover rounded cursor-pointer"
                        onClick={() => navigate(`/product/${c.productId._id}`)}
                      />
                    )}
                  </div>
                )}

                <div className="flex-1 space-y-1 text-sm text-gray-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {c.productId ? c.productId.title : '🧵 General Request'}
                      </h3>
                      <Badge
                        className={`text-white ${
                          c.status === 'Accepted'
                            ? 'bg-green-600'
                            : c.status === 'Rejected'
                            ? 'bg-red-500'
                            : 'bg-yellow-500'
                        }`}
                      >
                        {c.status}
                      </Badge>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setDeleteId(c._id);
                        setShowConfirm(true);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>

                  <p><strong>Occasion:</strong> {c.occasion}</p>
                  <p><strong>Size:</strong> {c.size || 'N/A'}</p>
                  <p><strong>Color:</strong> {c.color || 'N/A'}</p>
                  <p><strong>Phone:</strong> {c.phone}</p>
                  <p><strong>Notes:</strong> {c.additionalNotes}</p>
                  <p><strong>Design Notes:</strong> {c.designChangeNotes}</p>
                  {c.rejectionNote && (
                    <p className="text-red-600">
                      <strong>Rejection Note:</strong> {c.rejectionNote}
                    </p>
                  )}
                  <p className="text-xs text-gray-400">
                    Requested on: {new Date(c.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="text-center mt-10">
        <Button
          onClick={() => navigate('/#customization')}
          className="bg-[#6D2932] hover:bg-[#5a232a] text-white"
        >
          Want to Customize More?
        </Button>
      </div>

      {/* Custom delete confirmation */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 relative">
            <button
              onClick={() => {
                setShowConfirm(false);
                setDeleteId(null);
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-3 text-[#6D2932]">Delete Customization</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this customization request? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowConfirm(false);
                  setDeleteId(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Yes, Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCustomizations;
