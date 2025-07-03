import React from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-playfair text-3xl font-bold mb-4 text-gold-400">
              Vaseer Boutique
            </h3>
            <p className="font-inter text-gray-300 leading-relaxed mb-6 max-w-md">
              Where timeless elegance meets contemporary style. Discover fashion that speaks to your unique story.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gold-600 transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gold-600 transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gold-600 transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-playfair text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="font-inter space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-gold-400 transition-colors">Collections</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Sale</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Lookbook</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Size Guide</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-playfair text-xl font-semibold mb-6">Contact</h4>
            <ul className="font-inter space-y-3 text-gray-300">
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gold-400" />
                <span>Ajnala Punjab</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gold-400" />
                <span>(+91) 8195936499</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gold-400" />
                <span>hello@vaseerboutique.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-inter text-gray-400 text-sm">
              © 2024 Vaseer Boutique. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="font-inter text-gray-400 text-sm hover:text-gold-400 transition-colors">Privacy Policy</a>
              <a href="#" className="font-inter text-gray-400 text-sm hover:text-gold-400 transition-colors">Terms of Service</a>
              <a href="#" className="font-inter text-gray-400 text-sm hover:text-gold-400 transition-colors">Returns</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;