import { Instagram, Facebook, Youtube, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = [
    { name: 'Impressum', href: '/impressum' },
    { name: 'Datenschutz', href: '/datenschutz' },
    { name: 'AGB', href: '/agb' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Youtube, href: '#', name: 'YouTube' }
  ];

  return (
    <footer className="bg-nf-black text-nf-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">NF COACHING</h3>
            <p className="text-nf-white/70 leading-relaxed">
              Ganzheitliches Online Health & Fitness Coaching für nachhaltigen Erfolg. 
              Niklas und Fabienne - dein Team für Körper und Geist.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    const element = document.querySelector('#coaching');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-nf-white/70 hover:text-nf-red transition-smooth"
                >
                  Coaching
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.querySelector('#team');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-nf-white/70 hover:text-nf-red transition-smooth"
                >
                  Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.querySelector('#kontakt');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-nf-white/70 hover:text-nf-red transition-smooth"
                >
                  Kontakt
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Folge uns</h4>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="bg-nf-white/10 hover:bg-nf-red p-3 rounded-full transition-smooth group"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5 group-hover:text-nf-white" />
                </a>
              ))}
            </div>
            <div className="text-nf-white/70">
              <p className="mb-2">
                📧 <a href="mailto:info@nf-coaching.de" className="hover:text-nf-red transition-smooth">info@nf-coaching.de</a>
              </p>
              <p>
                📱 <a href="tel:+491234567890" className="hover:text-nf-red transition-smooth">+49 (0) 123 456789</a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-nf-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
              <p className="text-nf-white/70 text-sm">
                © {new Date().getFullYear()} NF COACHING. Alle Rechte vorbehalten.
              </p>
              <button
                onClick={scrollToTop}
                className="text-nf-white/70 hover:text-nf-red text-sm transition-smooth flex items-center gap-1"
              >
                <ArrowUp className="h-4 w-4" />
                Nach oben
              </button>
            </div>
            
            <div className="flex space-x-6">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-nf-white/70 hover:text-nf-red text-sm transition-smooth"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;