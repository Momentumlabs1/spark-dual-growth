import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Coaching", href: "#coaching" },
    { name: "Gesundheits-Rechner", href: "#rechner" },
    { name: "Team", href: "#team" },
    { name: "Kontakt", href: "#kontakt" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center">
              <img src="/main-logo.png" alt="NF Coaching Logo" className="h-12 w-auto" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-nf-black hover:text-nf-red transition-colors font-medium text-base"
              >
                {item.name}
              </a>
            ))}
            <Button className="bg-nf-red hover:bg-nf-red/90 text-white font-semibold">Kostenloses Gespräch</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-nf-black hover:text-nf-red p-2">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-nf-black hover:text-nf-red transition-colors font-medium text-base py-2"
                >
                  {item.name}
                </a>
              ))}
              <Button className="bg-nf-red hover:bg-nf-red/90 text-white font-semibold w-full mt-2">
                Kostenloses Gespräch
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
