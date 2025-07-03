import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, User, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BASE_URL } from '@/utils/api';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Login attempt:', { email, password, role });
      alert(`Login as ${role} with email: ${email}`);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Role selection */}
      <div className="space-y-3">
        <Label className="text-gray-900 text-sm font-medium">Login as</Label>
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setRole('buyer')}
            className={`p-4 rounded-lg border-2 transition-all duration-300 shadow-md ${
              role === 'buyer'
                ? 'border-yellow-400 bg-yellow-50 text-gray-900 shadow-lg'
                : 'border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <User className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Buyer</span>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setRole('admin')}
            className={`p-4 rounded-lg border-2 transition-all duration-300 shadow-md ${
              role === 'admin'
                ? 'border-gray-400 bg-gray-100 text-gray-900 shadow-lg'
                : 'border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <UserPlus className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Admin</span>
          </motion.button>
        </div>
      </div>

      {/* Email field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-900 text-sm font-medium">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20 shadow-sm"
          placeholder="Enter your password"
          required
        />
      </div>

      {/* Forgot password */}
      <div className="text-right">
        <button
          type="button"
          className="text-sm text-gray-600 hover:text-yellow-600 transition-colors"
        >
          Forgot password?
        </button>
      </div>

      {/* Submit button */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 ${
            role === 'admin'
              ? 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white'
              : 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div
                className={`w-5 h-5 border-2 ${
                  role === 'admin'
                    ? 'border-gray-300 border-t-white'
                    : 'border-yellow-600 border-t-black'
                } rounded-full animate-spin mr-2`}
              ></div>
              Signing in...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <LogIn className="w-5 h-5 mr-2" />
              Sign in as {role}
            </div>
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default LoginForm;
