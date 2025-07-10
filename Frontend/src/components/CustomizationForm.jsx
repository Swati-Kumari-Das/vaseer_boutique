// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useLocation } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Upload, Send } from 'lucide-react';
// import { toast } from 'sonner';
// import api from '@/utils/api';

// const CustomizationForm = () => {
//   const { search } = useLocation();
//   const productId = new URLSearchParams(search).get('productId');

//   const [formData, setFormData] = useState({
//     size: '',
//     color: '',
//     additionalNotes: '',
//     designChangeNotes: '',
//     contactEmail: '',
//     phone: '',
//     occasion: '',
//     image: null
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFormData((prev) => ({ ...prev, image: file }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.contactEmail || !formData.phone) {
//       toast.error('Email and phone are required');
//       return;
//     }

//     const payload = new FormData();
//     if (productId) payload.append('productId', productId);

//     Object.entries(formData).forEach(([key, value]) => {
//       if (value) payload.append(key, value);
//     });

//     try {
//       const res = await api.post('/customizations/create', payload, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       toast.success('Customization request submitted!');
//       setFormData({
//         size: '',
//         color: '',
//         additionalNotes: '',
//         designChangeNotes: '',
//         contactEmail: '',
//         phone: '',
//         occasion: '',
//         image: null,
//       });
//     } catch (err) {
//       console.error(err);
//       toast.error('Failed to submit customization request.');
//     }
//   };

//   return (
//     <section id="customization-form" className="py-20 bg-white">
//       <div className="max-w-4xl mx-auto px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             {productId ? 'Customize This Product' : 'Customization Request'}
//           </h2>
//           <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto">
//             {productId
//               ? 'Make changes to this product and submit your preferences.'
//               : 'Share your creative vision with us, even if it’s not based on any existing product.'}
//           </p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           viewport={{ once: true }}
//         >
//           <Card className="shadow-2xl">
//             <CardHeader>
//               <CardTitle className="font-playfair text-2xl text-center">
//                 {productId ? 'Your Product Customization' : 'Describe Your Dream Outfit'}
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email *
//                     </label>
//                     <Input
//                       type="email"
//                       name="contactEmail"
//                       value={formData.contactEmail}
//                       onChange={handleInputChange}
//                       placeholder="your.email@example.com"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Phone *
//                     </label>
//                     <Input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       placeholder="Your phone number"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
//                     <select
//                       name="size"
//                       value={formData.size}
//                       onChange={handleInputChange}
//                       className="w-full p-2 border border-gray-300 rounded"
//                     >
//                       <option value="">Select</option>
//                       <option value="XS">XS</option>
//                       <option value="S">S</option>
//                       <option value="M">M</option>
//                       <option value="L">L</option>
//                       <option value="XL">XL</option>
//                       <option value="XXL">XXL</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
//                     <Input
//                       type="text"
//                       name="color"
//                       value={formData.color}
//                       onChange={handleInputChange}
//                       placeholder="Preferred color"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Occasion</label>
//                   <select
//                     name="occasion"
//                     value={formData.occasion}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 rounded"
//                   >
//                     <option value="">Select</option>
//                     <option value="Wedding">Wedding</option>
//                     <option value="Party">Party</option>
//                     <option value="Casual">Casual</option>
//                     <option value="Festive">Festive</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Additional Notes
//                   </label>
//                   <textarea
//                     name="additionalNotes"
//                     value={formData.additionalNotes}
//                     onChange={handleInputChange}
//                     placeholder="Details about your outfit, fabric preference, etc."
//                     rows={4}
//                     className="w-full p-2 border border-gray-300 rounded"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Design Change Notes
//                   </label>
//                   <textarea
//                     name="designChangeNotes"
//                     value={formData.designChangeNotes}
//                     onChange={handleInputChange}
//                     placeholder="What modifications would you like?"
//                     rows={3}
//                     className="w-full p-2 border border-gray-300 rounded"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Reference Image (Optional)
//                   </label>
//                   <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
//                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                       <Upload className="w-8 h-8 mb-2 text-gray-500" />
//                       <p className="text-sm text-gray-500">
//                         <span className="font-semibold">Click to upload</span> or drag and drop
//                       </p>
//                       <p className="text-xs text-gray-500">JPG, PNG, JPEG (Max 5MB)</p>
//                     </div>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageChange}
//                       className="hidden"
//                     />
//                   </label>
//                   {formData.image && (
//                     <p className="mt-2 text-sm text-green-600">Selected: {formData.image.name}</p>
//                   )}
//                 </div>

//                 <Button
//                   type="submit"
//                   size="lg"
//                   className="w-full bg-yellow-600 hover:bg-yellow-700 text-black px-8 py-3 text-lg font-medium transition-all duration-300"
//                 >
//                   <Send className="mr-2 h-5 w-5" />
//                   Submit Request
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default CustomizationForm;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Send } from 'lucide-react';
import api from '@/utils/api';
import Alert from '@/components/Alert';

const CustomizationForm = () => {
  const { search } = useLocation();
  const productId = new URLSearchParams(search).get('productId');

  const [formData, setFormData] = useState({
    size: '',
    color: '',
    additionalNotes: '',
    designChangeNotes: '',
    contactEmail: '',
    phone: '',
    occasion: '',
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null); // { type: 'error' | 'success', message: '...' }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const validateForm = () => {
    const { contactEmail, phone } = formData;

    if (!contactEmail || !phone) {
      setAlert({ type: 'error', message: 'Email and phone are required.' });
      return false;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      setAlert({ type: 'error', message: 'Phone must be a valid 10-digit Indian number.' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    if (!validateForm()) return;

    const payload = new FormData();
    if (productId) payload.append('productId', productId);
    Object.entries(formData).forEach(([key, value]) => {
      if (value) payload.append(key, value);
    });

    try {
      setLoading(true);

      await api.post('/customizations/create', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setAlert({ type: 'success', message: 'Customization request submitted successfully!' });

      // Reset form
      setFormData({
        size: '',
        color: '',
        additionalNotes: '',
        designChangeNotes: '',
        contactEmail: '',
        phone: '',
        occasion: '',
        image: null,
      });
    } catch (err) {
      const message = err?.response?.data?.message || 'Something went wrong.';
      setAlert({ type: 'error', message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="customization-form" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {productId ? 'Customize This Product' : 'Customization Request'}
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto">
            {productId
              ? 'Make changes to this product and submit your preferences.'
              : 'Share your creative vision with us, even if it’s not based on any existing product.'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="font-playfair text-2xl text-center">
                {productId ? 'Your Product Customization' : 'Describe Your Dream Outfit'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {alert && (
                <Alert type={alert.type} onClose={() => setAlert(null)}>
                  {alert.message}
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                    <select
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="">Select</option>
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                    <Input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      placeholder="Preferred color"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Occasion</label>
                  <select
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Party">Party</option>
                    <option value="Casual">Casual</option>
                    <option value="Festive">Festive</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    placeholder="Details about your outfit, fabric preference, etc."
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Design Change Notes
                  </label>
                  <textarea
                    name="designChangeNotes"
                    value={formData.designChangeNotes}
                    onChange={handleInputChange}
                    placeholder="What modifications would you like?"
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reference Image (Optional)
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">JPG, PNG, JPEG (Max 5MB)</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {formData.image && (
                    <p className="mt-2 text-sm text-green-600">Selected: {formData.image.name}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-black px-8 py-3 text-lg font-medium transition-all duration-300"
                >
                  {loading ? 'Submitting...' : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Submit Request
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomizationForm;
