import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Instagram, Facebook, Youtube, Mail } from 'lucide-react';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    toast({
      title: "Vielen Dank!",
      description: "Du wirst benachrichtigt, sobald wir starten.",
    });
    setEmail('');
  };

  const socialLinks = [
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Youtube, href: '#', name: 'YouTube' }
  ];

  const legalLinks = [
    { name: 'Impressum', href: '/impressum' },
    { name: 'Datenschutz', href: '/datenschutz' },
    { name: 'AGB', href: '/agb' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-nf-white via-nf-gray-50 to-nf-white flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-nf-black mb-4">
              NF COACHING
            </h1>
            <div className="w-24 h-1 bg-nf-red mx-auto mb-6"></div>
            <p className="text-2xl md:text-3xl text-nf-gray-600 mb-8">
              Coming Soon
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-semibold text-nf-black mb-4">
              Ganzheitliches Online Health & Fitness Coaching
            </h2>
            <p className="text-lg text-nf-gray-600 leading-relaxed mb-8">
              Niklas und Fabienne bereiten etwas Großartiges für dich vor. 
              Erhalte als Erste*r Updates über unser revolutionäres Coaching-Programm.
            </p>
          </div>

          {/* Email Signup */}
          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Deine E-Mail Adresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" className="bg-nf-red hover:bg-nf-red/90">
                <Mail className="h-4 w-4 mr-2" />
                Benachrichtigen
              </Button>
            </div>
          </form>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="bg-nf-white shadow-soft hover:shadow-elegant p-4 rounded-full transition-smooth group border border-nf-gray-200"
                aria-label={social.name}
              >
                <social.icon className="h-6 w-6 text-nf-gray-600 group-hover:text-nf-red transition-smooth" />
              </a>
            ))}
          </div>

          <p className="text-nf-gray-600">
            Kontakt: <a href="mailto:info@nf-coaching.de" className="text-nf-red hover:underline">info@nf-coaching.de</a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-nf-black text-nf-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-nf-white/70 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} NF COACHING. Alle Rechte vorbehalten.
            </p>
            
            <div className="flex space-x-6">
              {legalLinks.map((link) => (
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
      </footer>
    </div>
  );
};

export default ComingSoon;