import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "#" },
    { name: "Über mich", href: "#about" },
    { name: "Leistungen", href: "#services" },
    { name: "Kontakt", href: "#contact" },
  ];

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - JETZT MIT BILD! */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center">
              <img src="/assets/main-logo.png" alt="NF Coaching Logo" className="h-12 w-auto" />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-nf-black hover:text-nf-accent px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="bg-nf-accent text-white px-6 py-2 rounded-full hover:bg-nf-black transition-colors font-medium"
            >
              Termin buchen
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-nf-black hover:text-nf-accent">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-nf-black hover:text-nf-accent hover:bg-gray-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              className="block px-3 py-2 text-base font-medium bg-nf-accent text-white rounded-md hover:bg-nf-black text-center"
              onClick={() => setIsOpen(false)}
            >
              Termin buchen
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
