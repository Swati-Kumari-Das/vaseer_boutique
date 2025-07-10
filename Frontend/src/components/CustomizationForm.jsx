// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Upload, Send } from 'lucide-react';
// import { toast } from 'sonner';

// const CustomizationForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     description: '',
//     image: null
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFormData(prev => ({ ...prev, image: file }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.email || !formData.description) {
//       toast.error('Please fill in all required fields.');
//       return;
//     }
    
//     console.log('Customization request:', formData);
//     toast.success('Your customization request has been submitted! We\'ll get back to you soon.');
    
//     setFormData({
//       name: '',
//       email: '',
//       phone: '',
//       description: '',
//       image: null
//     });
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
//             Customization Request
//           </h2>
//           <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto">
//             Share your ideas with us and let's create something beautiful together.
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
//                 Tell Us About Your Dream Outfit
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Name *
//                     </label>
//                     <Input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       placeholder="Your full name"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email *
//                     </label>
//                     <Input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       placeholder="your.email@example.com"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Phone (Optional)
//                   </label>
//                   <Input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     placeholder="Your phone number"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Describe Your Idea *
//                   </label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     placeholder="Tell us about your dream outfit - style, colors, occasion, inspiration, etc."
//                     rows={4}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Reference Image (Optional)
//                   </label>
//                   <div className="flex items-center justify-center w-full">
//                     <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <Upload className="w-8 h-8 mb-2 text-gray-500" />
//                         <p className="mb-2 text-sm text-gray-500">
//                           <span className="font-semibold">Click to upload</span> or drag and drop
//                         </p>
//                         <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
//                       </div>
//                       <input
//                         type="file"
//                         onChange={handleImageChange}
//                         accept="image/*"
//                         className="hidden"
//                       />
//                     </label>
//                   </div>
//                   {formData.image && (
//                     <p className="mt-2 text-sm text-green-600">
//                       Selected: {formData.image.name}
//                     </p>
//                   )}
//                 </div>

//                 <Button
//                   type="submit"
//                   size="lg"
//                   className="w-full bg-yellow-600 hover:bg-gold-700 text-black px-8 py-3 text-lg font-medium transition-all duration-300"
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


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Send } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/utils/api'; // Your Axios instance

const CustomizationForm = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productId: '',
    contactEmail: '',
    phone: '',
    size: '',
    color: '',
    occasion: '',
    additionalNotes: '',
    designChangeNotes: '',
    image: null
  });

  const fetchProducts = async () => {
    try {
      const res = await api.get('/product'); // Adjust based on your actual endpoint
      setProducts(res.data.products || []);
    } catch (err) {
      toast.error("Failed to load products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      productId, contactEmail, phone, size, color
    } = formData;

    if (!productId || !contactEmail || !phone || !size || !color) {
      toast.error('Please fill all required fields.');
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const res = await api.post('/customizations/create', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Customization request submitted!');
      setFormData({
        productId: '',
        contactEmail: '',
        phone: '',
        size: '',
        color: '',
        occasion: '',
        additionalNotes: '',
        designChangeNotes: '',
        image: null
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Submission failed.');
    }
  };

  return (
    <section  id="customization-form" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">Customization Request</h2>
          <p className="text-lg text-gray-600">Describe your dream outfit, and we’ll bring it to life.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-center">Tell Us About Your Design</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm mb-1">Select Product *</label>
                    <select
                      name="productId"
                      value={formData.productId}
                      onChange={handleInputChange}
                      className="w-full border px-3 py-2 rounded"
                      required
                    >
                      <option value="">-- Select Product --</option>
                      {products.map((prod) => (
                        <option key={prod._id} value={prod._id}>
                          {prod.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Email *</label>
                    <Input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Phone *</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Size *</label>
                    <select
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                      required
                      className="w-full border px-3 py-2 rounded"
                    >
                      <option value="">-- Select Size --</option>
                      {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Color *</label>
                    <Input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      placeholder="e.g. Pastel Blue"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Occasion</label>
                    <select
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleInputChange}
                      className="w-full border px-3 py-2 rounded"
                    >
                      <option value="">-- Select Occasion --</option>
                      {["Wedding", "Party", "Casual", "Festive", "Other"].map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1">Design Change Notes</label>
                  <textarea
                    name="designChangeNotes"
                    value={formData.designChangeNotes}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Additional Notes</label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Reference Image (Optional)</label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="border w-full rounded p-2"
                  />
                  {formData.image && (
                    <p className="mt-2 text-sm text-green-600">Selected: {formData.image.name}</p>
                  )}
                </div>

                <Button type="submit" size="lg" className="w-full bg-yellow-600 hover:bg-yellow-700 text-black">
                  <Send className="mr-2 h-5 w-5" />
                  Submit Request
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
