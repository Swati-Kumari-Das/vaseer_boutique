import { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Alert from '@/components/Alert';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'buyer'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
const [messageType, setMessageType] = useState('');
useEffect(() => {
  if (message) {
    const timer = setTimeout(() => setMessage(null), 3000); // auto-dismiss in 3 sec
    return () => clearTimeout(timer); // cleanup on unmount or re-render
  }
}, [message]);


  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match!');
      setMessageType('error');
      setIsLoading(false);
      return;
    }
    try {
        const res = await api.post('/auth/register', {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: 'buyer' // 👈 always buyer
        });
    
        setMessage(`Account created successfully as ${formData.role}!`);
        setMessageType('success');
        // Optionally store token
        // localStorage.setItem('token', res.data.token);
        localStorage.setItem('token', res.data.token);

        navigate('/');   
    } catch (err) {
        console.error(err.response?.data || err.message);
        const backendMsg = err.response?.data?.msg || 'Signup failed ❌';
        setMessage(backendMsg);
        setMessageType('error');
      } finally {
        setIsLoading(false);
      }
     
    // Simulate API call
   
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
     {message && <Alert type={messageType}>{message}</Alert>}


      {/* Full name field */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-gray-900 text-sm font-medium">
          Full Name
        </Label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20 shadow-sm"
          placeholder="Enter your full name"
          required
        />
      </div>

      {/* Email field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-900 text-sm font-medium">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20 shadow-sm"
          placeholder="Enter your email"
          required
        />
      </div>

      {/* Password field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-gray-900 text-sm font-medium">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20 shadow-sm"
          placeholder="Create a password"
          required
        />
      </div>

      {/* Confirm password field */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-gray-900 text-sm font-medium">
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20 shadow-sm"
          placeholder="Confirm your password"
          required
        />
      </div>

      {/* Terms and conditions */}
      {/* <div className="flex items-center space-x-2">
        <input
          id="terms"
          type="checkbox"
          className="w-4 h-4 rounded border-gray-300 bg-white text-yellow-500 focus:ring-yellow-400/20"
          required
        />
        <label htmlFor="terms" className="text-sm text-gray-600">
          I agree to the{' '}
          <button type="button" className="text-yellow-600 hover:text-yellow-700 underline">
            Terms and Conditions
          </button>
        </label>
      </div> */}

      {/* Submit button */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-lg font-medium mt-4 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 ${
            formData.role === 'admin'
              ? 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white'
              : 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className={`w-5 h-5 border-2 ${formData.role === 'admin' ? 'border-gray-300 border-t-white' : 'border-yellow-600 border-t-black'} rounded-full animate-spin mr-2`}></div>
              Creating account...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <UserPlus className="w-5 h-5 mr-2" />
              Create {formData.role} account
            </div>
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default SignupForm;
