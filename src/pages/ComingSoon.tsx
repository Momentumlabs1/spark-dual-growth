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
    { icon: Instagram, href: 'https://www.instagram.com/niklas.hauger', name: 'Instagram' },
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Youtube, href: '#', name: 'YouTube' }
  ];

  const legalLinks = [
    { name: 'Impressum', href: '/impressum' },
    { name: 'Datenschutz', href: '/datenschutz' },
    { name: 'AGB', href: '/agb' }
  ];

  return (
    <div className="min-h-screen gradient-card flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-4">
              Niklas Hauger Coaching
            </h1>
            <div className="w-24 h-1 gradient-red mx-auto mb-6 rounded-full"></div>
            <p className="text-2xl md:text-3xl text-muted-foreground mb-8">
              Coming Soon
            </p>
          </div>

          {/* Team Photo */}
          <div className="mb-12 animate-fade-in">
            <div className="relative max-w-md mx-auto mb-8">
              <img 
                src="/assets/team-photo.png" 
                alt="Niklas und Fabienne - Dein Coaching Team"
                className="w-full h-auto rounded-2xl shadow-large border border-border"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/20 to-transparent pointer-events-none"></div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
              Ganzheitliches Online Health & Fitness Coaching
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-balance">
              Niklas und Fabienne bereiten etwas Großartiges für dich vor. 
              Erhalte als Erste*r Updates über unser revolutionäres Coaching-Programm.
            </p>
          </div>

          {/* Email Signup */}
          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto mb-12 animate-fade-in">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Deine E-Mail Adresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 shadow-soft border-border"
                required
              />
              <Button type="submit" variant="secondary" className="transition-smooth hover:shadow-medium">
                <Mail className="h-4 w-4 mr-2" />
                Benachrichtigen
              </Button>
            </div>
          </form>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8 animate-slide-in-right">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="bg-card shadow-soft hover:shadow-medium p-4 rounded-full transition-smooth group border border-border hover:-translate-y-1"
                aria-label={social.name}
              >
                <social.icon className="h-6 w-6 text-muted-foreground group-hover:text-secondary transition-smooth" />
              </a>
            ))}
          </div>

          <p className="text-muted-foreground animate-fade-in">
            Kontakt: <a href="mailto:info@niklashauger.de" className="text-secondary hover:underline transition-smooth">info@niklashauger.de</a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 shadow-large">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/70 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Niklas Hauger Coaching. Alle Rechte vorbehalten.
            </p>
            
            <div className="flex space-x-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-primary-foreground/70 hover:text-secondary text-sm transition-smooth hover:underline"
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