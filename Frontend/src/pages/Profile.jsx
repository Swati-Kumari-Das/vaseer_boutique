import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, Trash2, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import { userAPI } from '../utils/userAPI'; // ✅ adjust path if needed


const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [profileData, setProfileData] = useState(null);
  const [alert, setAlert] = useState({ type: '', message: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userAPI.getProfile();
        console.log(res);
        const user = res?.data?.user;
        setFormData({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          address: user.address || '',
        });
        setProfileData(user);
      } catch (err) {
        console.error("Fetch profile error:", err.response || err.message);
        setAlert({ type: 'error', message: 'Failed to load profile' });
      }
    };
  
    fetchProfile();
  }, []);
  

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePictureChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await userAPI.updateProfile(formData);
      setAlert({ type: 'success', message: 'Profile updated!' });
    } catch {
      setAlert({ type: 'error', message: 'Update failed' });
    }
  };
  

  const handleUploadPicture = async () => {
    if (!profilePicture) return;
    try {
      await userAPI.uploadProfilePicture(profilePicture);
      setAlert({ type: 'success', message: 'Picture updated' });
      setProfilePicture(null);
      setPreviewUrl('');
      fetchProfile(); // refresh updated pic
    } catch {
      setAlert({ type: 'error', message: 'Upload failed' });
    }
  };
  
  const handleDeleteProfile = async () => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await userAPI.deleteProfile();
      localStorage.removeItem('token');
      setAlert({ type: 'info', message: 'Profile deleted' });
      navigate('/');
    } catch {
      setAlert({ type: 'error', message: 'Delete failed' });
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-50 py-8 overflow-x-hidden ">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Link to="/" className="flex items-center text-gray-600 hover:text-gray-800 mb-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your personal details and settings</p>
        </motion.div>

        {alert.message && <Alert type={alert.type}>{alert.message}</Alert>}

        {/* Profile Picture */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg text-center">Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
              {previewUrl || profileData?.profilePicture ? (
                <img
                  src={previewUrl || profileData?.profilePicture}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-gray-400" />
              )}
            </div>
            <div className="space-y-2">
              <input id="file-input" type="file" accept="image/*" onChange={handlePictureChange} hidden />
              <label htmlFor="file-input">
                <Button variant="outline">
                  <Camera className="w-4 h-4 mr-2" />
                  Choose Picture
                </Button>
              </label>
              {profilePicture && (
                <Button onClick={handleUploadPicture}>Upload Picture</Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Profile Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {['name', 'email', 'phone', 'address'].map((field) => (
              <div key={field}>
                <Label htmlFor={field} className="capitalize text-gray-700">
                  {field}
                </Label>
                <Input
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  placeholder={`Enter your ${field}`}
                />
              </div>
            ))}
            <div className="flex gap-4 mt-4">
              <Button onClick={handleUpdateProfile} className="bg-yellow-500 text-white w-full">
                Update Profile
              </Button>
              <Button onClick={handleDeleteProfile} variant="destructive" className="w-full">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
