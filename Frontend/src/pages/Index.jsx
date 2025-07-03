import React from 'react';
import Navbar from '@/components/Navbar';
import HeroCarousel from '@/components/HeroCarousel';
import CategoriesSection from '@/components/CategoriesSection';
import CustomizationPreview from '@/components/CustomizationPreview';
import CustomizationForm from '@/components/CustomizationForm';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import About from '@/components/About';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroCarousel />
      <CategoriesSection />
      <CustomizationPreview />
      <CustomizationForm />
      <TestimonialsSection />
      <About />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;