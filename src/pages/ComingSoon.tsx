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
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 md:pt-32">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Coming Soon Title */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 tracking-tight leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              DEINE TRANSFORMATION
              <motion.span 
                className="block text-nf-red"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                BEGINNT BALD
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mt-4 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Ganzheitliches Health & Fitness Coaching
            </motion.p>
            <motion.div 
              className="w-32 h-1.5 bg-nf-red mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            ></motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            className="mb-16"
            style={{ y: imageY, scale: imageScale }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <div className="relative max-w-2xl mx-auto">
              <motion.div
                className="absolute -inset-2 bg-nf-black/5 dark:bg-nf-white/5 rounded-3xl blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
              />
              <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-3xl">
                <img 
                  src="/assets/niklas-fabienne-hero.png" 
                  alt="Niklas und Fabienne - Dein Coaching Team"
                  className="w-full h-full object-cover object-center shadow-2xl border border-border/50"
                  loading="lazy"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-nf-black/10 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div 
            className="mb-16 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-6">
                Revolutionäres Online Coaching Erlebnis
              </h2>
              <motion.div 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-nf-red rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              />
            </motion.div>

            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                Niklas und Fabienne bereiten etwas <span className="text-nf-red font-semibold">Großartiges</span> für dich vor.
              </motion.p>
              
              <motion.p 
                className="text-base md:text-lg text-muted-foreground/80"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.6 }}
              >
                Erhalte als Erste*r Updates über unser revolutionäres Coaching-Programm.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Email Signup */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <motion.div
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 max-w-lg mx-auto shadow-2xl"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3 
                className="text-xl font-semibold text-foreground mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.6 }}
              >
                Sei der Erste, der erfährt wenn es losgeht! 🚀
              </motion.h3>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.4, duration: 0.6 }}
                >
                  <Input
                    type="email"
                    placeholder="Deine E-Mail Adresse"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-base bg-background/80 border-border shadow-soft focus:shadow-medium transition-all duration-300"
                    required
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.6, duration: 0.6 }}
                >
                  <Button 
                    type="submit" 
                    variant="secondary" 
                    className="w-full h-12 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Jetzt benachrichtigen lassen
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex justify-center space-x-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.8 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                className="relative bg-card/70 backdrop-blur-sm shadow-soft hover:shadow-xl p-5 rounded-2xl transition-all duration-300 group border border-border/50"
                aria-label={social.name}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  delay: 2.8 + index * 0.2, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-nf-red/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <social.icon className="relative h-7 w-7 text-muted-foreground group-hover:text-nf-red transition-all duration-300" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.4, duration: 0.8 }}
          >
            <p className="text-muted-foreground/80 text-sm mb-2">
              Hast du Fragen? Wir sind für dich da!
            </p>
            <motion.a 
              href="mailto:info@niklashauger.de" 
              className="inline-flex items-center text-nf-red hover:text-nf-red/80 font-medium transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <Mail className="h-4 w-4 mr-2" />
              info@niklashauger.de
            </motion.a>
          </motion.div>
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
                  className="text-primary-foreground/70 hover:text-nf-red text-sm transition-smooth hover:underline"
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