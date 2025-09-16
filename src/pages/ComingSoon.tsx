import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Instagram, Facebook, Youtube, Mail } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);

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
    <div ref={containerRef} className="min-h-screen gradient-card flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          
          {/* Hero Image */}
          <motion.div 
            className="mb-8 animate-fade-in"
            style={{ y: imageY, scale: imageScale }}
          >
            <div className="relative max-w-2xl mx-auto mb-8">
              <img 
                src="/assets/niklas-fabienne-hero.png" 
                alt="Niklas und Fabienne - Dein Coaching Team"
                className="w-full h-auto rounded-3xl shadow-large border border-border"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-primary/10 to-transparent pointer-events-none"></div>
            </div>
          </motion.div>

          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="text-2xl md:text-3xl text-muted-foreground mb-8">
              Coming Soon
            </p>
            <div className="w-24 h-1 gradient-red mx-auto mb-8 rounded-full"></div>
          </motion.div>

          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
              Ganzheitliches Online Health & Fitness Coaching
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 text-balance max-w-2xl mx-auto">
              Niklas und Fabienne bereiten etwas Großartiges für dich vor. 
              Erhalte als Erste*r Updates über unser revolutionäres Coaching-Programm.
            </p>
          </motion.div>

          {/* Email Signup */}
          <motion.form 
            onSubmit={handleEmailSubmit} 
            className="max-w-md mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Deine E-Mail Adresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 shadow-soft border-border h-12 text-base"
                required
              />
              <Button type="submit" variant="secondary" className="transition-smooth hover:shadow-medium h-12 px-6">
                <Mail className="h-4 w-4 mr-2" />
                Benachrichtigen
              </Button>
            </div>
          </motion.form>

          {/* Social Links */}
          <motion.div 
            className="flex justify-center space-x-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                className="bg-card shadow-soft hover:shadow-medium p-4 rounded-full transition-smooth group border border-border hover:-translate-y-1"
                aria-label={social.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
              >
                <social.icon className="h-6 w-6 text-muted-foreground group-hover:text-secondary transition-smooth" />
              </motion.a>
            ))}
          </motion.div>

          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            Kontakt: <a href="mailto:info@niklashauger.de" className="text-secondary hover:underline transition-smooth">info@niklashauger.de</a>
          </motion.p>
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