import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Star } from 'lucide-react';

const CustomizationPreview = () => {
  const scrollToCustomization = () => {
    const element = document.getElementById('customization-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Custom Designs",
      description: "Unique pieces tailored to your vision"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Personal Touch",
      description: "Made with love and attention to detail"
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Premium Quality",
      description: "Finest fabrics and expert craftsmanship"
    }
  ];

  return (
    <section id="customization" className="py-20 bg-gradient-to-br from-yellow-50 to-yellow-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Want Something Special?
            </h2>
            <p className="font-inter text-xl text-gray-600 mb-8 leading-relaxed">
              Let us bring your dream outfit to life. Our expert designers will work with you to create a unique piece that perfectly captures your style and personality.
            </p>
            
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-700">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="font-inter text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button
              onClick={scrollToCustomization}
              size="lg"
              className="bg-yellow-600 hover:bg-yellow-700 text-black px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105"
            >
              Start Customization
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2070"
                alt="Custom Design 1"
                className="rounded-lg shadow-lg w-full h-48 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=2070"
                alt="Custom Design 2"
                className="rounded-lg shadow-lg w-full h-48 object-cover mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2070"
                alt="Custom Design 3"
                className="rounded-lg shadow-lg w-full h-48 object-cover -mt-8"
              />
              <img
                src="/images/frock-suit.jpg"
                alt="Custom Design 4"
                className="rounded-lg shadow-lg w-full h-48 object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CustomizationPreview;