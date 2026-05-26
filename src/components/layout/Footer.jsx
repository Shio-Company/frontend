import React from 'react';
import logo from '../../assets/logo/logo.svg';

export default function Footer() {
  return (
    <footer className="bg-[#F0F0F0] pt-20 pb-10 font-maginia text-shio-gray">
      <div className="mx-auto px-6 lg:px-8 w-full">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between mb-20 gap-12 lg:gap-8">
          
          {/* Logo Area */}
          <div className="lg:w-1/4 flex justify-start">
            <img src={logo} alt="Shio Logo" className="w-[250px] h-[150px]" />
          </div>

          {/* Links Grid */}
          <div className="lg:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            
            {/* Column 1: Company */}
            <div>
              <h3 className="text-[13px] font-semibold tracking-[0.2em] uppercase mb-6 text-shio-black">Company</h3>
              <ul className="space-y-4 text-[14px] text-black/60 font-light">
                <li><a href="#" className="hover:text-shio-black transition-colors">About</a></li>
                <li><a href="#" className="hover:text-shio-black transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-shio-black transition-colors">Works</a></li>
                <li><a href="#" className="hover:text-shio-black transition-colors">Career</a></li>
              </ul>
            </div>

            {/* Column 2: Help */}
            <div>
              <h3 className="text-[13px] font-semibold tracking-[0.2em] uppercase mb-6 text-shio-black">Help</h3>
              <ul className="space-y-4 text-[14px] text-black/60 font-light">
                <li><a href="#" className="hover:text-shio-black transition-colors">Customer Support</a></li>
                <li><a href="#" className="hover:text-shio-black transition-colors">Delivery Details</a></li>
                <li><a href="#" className="hover:text-shio-black transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-shio-black transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Column 3: FAQ */}
            <div>
              <h3 className="text-[13px] font-semibold tracking-[0.2em] uppercase mb-6 text-shio-black">FAQ</h3>
              <ul className="space-y-4 text-[14px] text-black/60 font-light">
                <li><a href="#" className="hover:text-shio-black transition-colors">Account</a></li>
                <li><a href="#" className="hover:text-shio-black transition-colors">Manage Deliveries</a></li>
                <li><a href="#" className="hover:text-shio-black transition-colors">Orders</a></li>
                <li><a href="#" className="hover:text-shio-black transition-colors">Payments</a></li>
              </ul>
            </div>

            {/* Column 4: Resources */}
            <div>
              <h3 className="text-[13px] font-semibold tracking-[0.2em] uppercase mb-6 text-shio-black">Resources</h3>
              <ul className="space-y-4 text-[14px] text-black/60 font-light">
                <li><a href="#" className="hover:text-shio-black transition-colors">Free eBooks</a></li>
                <li><a href="#" className="hover:text-shio-black transition-colors">Development Tutorial</a></li>
                <li><a href="#" className="hover:text-shio-black transition-colors">How to - Blog</a></li>
                <li><a href="#" className="hover:text-shio-black transition-colors">Youtube Playlist</a></li>
              </ul>
            </div>
            
          </div>
        </div>

        {/* Bottom Section (Divider & Payments) */}
        <div className="border-t border-[rgba(0,0,0,0.6)] pt-6 flex justify-center md:justify-end">
          <div className="flex gap-3">
            
            {/* VISA */}
            <div className="bg-white px-2 rounded-[4px] shadow-sm flex items-center justify-center w-11 h-7">
              <span className="text-[11px] font-black text-[#1a1f71] italic tracking-tighter">VISA</span>
            </div>
            
            {/* Mastercard */}
            <div className="bg-white px-2 rounded-[4px] shadow-sm flex items-center justify-center w-11 h-7 relative overflow-hidden">
               <div className="w-4 h-4 bg-[#eb001b] rounded-full absolute left-2 mix-blend-multiply"></div>
               <div className="w-4 h-4 bg-[#f79e1b] rounded-full absolute right-2 mix-blend-multiply"></div>
            </div>
            
            {/* PayPal */}
            <div className="bg-white px-2 rounded-[4px] shadow-sm flex items-center justify-center w-11 h-7">
              <span className="text-[10px] font-bold text-[#003087] italic tracking-tight">PayPal</span>
            </div>
            
            {/* Apple Pay */}
            <div className="bg-white px-1 rounded-[4px] shadow-sm flex items-center justify-center w-11 h-7 gap-[2px]">
              <svg className="w-2.5 h-2.5 text-black" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
              <span className="text-[9px] font-semibold text-black">Pay</span>
            </div>
            
            {/* Google Pay */}
            <div className="bg-white px-1 rounded-[4px] shadow-sm flex items-center justify-center w-11 h-7 gap-[2px]">
               <span className="text-[10px] font-bold text-[#4285F4]">G</span> 
               <span className="text-[9px] font-semibold text-gray-600">Pay</span>
            </div>

          </div>
        </div>
        
      </div>
    </footer>
  );
}
