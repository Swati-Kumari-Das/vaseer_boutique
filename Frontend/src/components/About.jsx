import React from 'react';
import { Sparkles, Heart, Award } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Curated Excellence",
      description: "Every piece is carefully selected for its quality, craftsmanship, and timeless appeal."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Personal Style",
      description: "We believe fashion is personal. Our collections celebrate individual expression and confidence."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Premium Quality",
      description: "Only the finest materials and construction meet our standards for lasting beauty and comfort."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Vaseer Story
            </h2>
            <div className="space-y-6 font-inter text-lg text-gray-600 leading-relaxed">
              <p>
                Founded with a passion for exceptional fashion, Vaseer Boutique has become synonymous with 
                sophisticated style and uncompromising quality. Our journey began with a simple belief: 
                that everyone deserves to feel confident and beautiful.
              </p>
              <p>
                Today, we continue to source the finest pieces from emerging and established designers, 
                creating collections that speak to the modern individual who values both style and substance.
              </p>
              <p>
                From our carefully curated showroom to your wardrobe, every interaction with Vaseer 
                is designed to be memorable, personal, and inspiring.
              </p>
            </div>
          </div>
          
          <div className="grid gap-8">
            {values.map((value, index) => (
              <div key={index} className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 group-hover:bg-yellow-600 group-hover:text-white transition-colors duration-300">
                  {value.icon}
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="font-inter text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;