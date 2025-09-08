import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Coaching', href: '#coaching' },
    { label: 'Team', href: '#team' },
    { label: 'Kontakt', href: '#kontakt' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-nf-white/95 backdrop-blur-sm border-b border-nf-gray-200 z-50 transition-smooth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-nf-black tracking-tight">
              NF COACHING
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-nf-black hover:text-nf-red px-3 py-2 text-sm font-medium transition-smooth relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-nf-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </button>
              ))}
              <Button 
                onClick={() => scrollToSection('#kontakt')}
                variant="default"
                className="bg-nf-red hover:bg-nf-red/90 text-nf-white px-6 py-2 ml-4"
              >
                Kostenloses Gespräch
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-nf-black hover:text-nf-red"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden bg-nf-white border-t border-nf-gray-200`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="text-nf-black hover:text-nf-red block px-3 py-2 text-base font-medium w-full text-left transition-smooth"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2">
            <Button 
              onClick={() => scrollToSection('#kontakt')}
              variant="default"
              className="bg-nf-red hover:bg-nf-red/90 text-nf-white w-full"
            >
              Kostenloses Gespräch
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;