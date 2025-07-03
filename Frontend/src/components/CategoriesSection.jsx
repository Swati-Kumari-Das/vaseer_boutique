import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const CategoriesSection = () => {
  const categories = [
    {
      name: "Sarees",
      image: "/images/saree.jpg",
      description: "Traditional elegance"
    },
    {
      name: "Kurtis",
      image: "/images/suiit.jpg",
      description: "Comfortable style"
    },
    {
      name: "Lehengas",
      image: "/images/lengha.jpg",
      description: "Festive grandeur"
    },
    {
      name: "Salwar Suits",
      image: "/images/slwar-suit.jpg",
      description: "Classic comfort"
    },
    {
      name: "Indo-Western",
      image: "/images/indo-western.jpg",
      description: "Modern fusion"
    },
    {
      name: "Frock Suit",
      image: "/images/frock-suit.jpg",
      description: "Perfect finishing"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="categories" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collections designed for every occasion and style preference.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="font-playfair text-3xl font-bold mb-2">
                        {category.name}
                      </h3>
                      <p className="font-inter text-lg opacity-90">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;