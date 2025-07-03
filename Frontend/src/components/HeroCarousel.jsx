import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/images/img5.jpg",
      title: "Festive Collection 2025",
      subtitle: "Celebrate in Style",
      description: "Discover our exclusive festive wear collection designed for special moments"
    },
    {
      image: "/images/img6.jpg",
      title: "Evening Elegance",
      subtitle: "Timeless Beauty",
      description: "Sophisticated evening wear for unforgettable occasions"
    },
    {
      image:"/images/image1.jpg",
      title: "Casual Chic",
      subtitle: "Everyday Comfort",
      description: "Effortless style for your daily adventures"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('${slides[currentSlide].image}')`
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
        <motion.div
          key={`content-${currentSlide}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto px-6"
        >
          <h2 className="font-inter text-lg md:text-xl text-gold-400 mb-4">
            {slides[currentSlide].subtitle}
          </h2>
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6">
            {slides[currentSlide].title}
          </h1>
          <p className="font-inter text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            {slides[currentSlide].description}
          </p>
          <Button 
            size="lg" 
            className="bg-yellow-600 hover:bg-yellow-700 text-black px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105"
          >
            Shop Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-gold-500' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
