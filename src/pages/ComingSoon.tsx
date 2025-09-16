import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Instagram, Facebook, Youtube, Mail } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const {
    toast
  } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);

  // Countdown Timer Logic
  useEffect(() => {
    // Set target date to 3 weeks from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 21); // 3 weeks

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
          minutes: Math.floor(distance % (1000 * 60 * 60) / (1000 * 60)),
          seconds: Math.floor(distance % (1000 * 60) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast({
      title: "Vielen Dank!",
      description: "Du wirst benachrichtigt, sobald wir starten."
    });
    setEmail('');
  };
  const socialLinks = [{
    icon: Instagram,
    href: 'https://www.instagram.com/niklas.hauger',
    name: 'Instagram'
  }, {
    icon: Facebook,
    href: '#',
    name: 'Facebook'
  }, {
    icon: Youtube,
    href: '#',
    name: 'YouTube'
  }];
  const legalLinks = [{
    name: 'Impressum',
    href: '/impressum'
  }, {
    name: 'Datenschutz',
    href: '/datenschutz'
  }, {
    name: 'AGB',
    href: '/agb'
  }];
  return <div ref={containerRef} className="min-h-screen bg-nf-black flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 md:pt-24">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Coming Soon Title */}
          <motion.div className="mb-8" initial={{
          opacity: 0,
          y: -30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          ease: "easeOut"
        }}>
            <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-nf-white mb-4 tracking-tight leading-tight" initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: 0.2,
            duration: 0.8
          }}>
              DEINE TRANSFORMATION
              <motion.span initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.5,
              duration: 0.6
            }} className="block text-[#ff0000]">
                BEGINNT BALD
              </motion.span>
            </motion.h1>
            <motion.p initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.8,
            duration: 0.6
          }} className="text-lg text-nf-white/80 mt-4 font-extrabold md:text-xl">
              Ganzheitliches Health & Fitness Coaching
            </motion.p>
            
          </motion.div>

          {/* Rechtliche Informationen - prominent */}
          

          {/* Hero Image */}
          <motion.div className="mb-8" style={{
          y: imageY,
          scale: imageScale
        }} initial={{
          opacity: 0,
          y: 50
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4,
          duration: 1
        }}>
            <div className="relative max-w-2xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/10]">
                <img src="/assets/niklas-fabienne-hero.png" alt="Niklas und Fabienne - Dein Coaching Team" className="w-full h-full object-contain bg-transparent shadow-2xl" loading="lazy" />
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div className="mb-8 space-y-6" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.8,
          duration: 0.8
        }}>
            <motion.div className="max-w-3xl mx-auto" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 1,
            duration: 0.8
          }}>
              <motion.p className="text-xl sm:text-2xl md:text-3xl text-nf-white leading-relaxed text-balance mb-6 font-semibold" initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 1.2,
              duration: 0.8
            }}>
                Niklas und Fabienne bereiten etwas <span className="font-bold text-[#ff0000]">Großartiges</span> für dich vor.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div className="mb-12" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 1.5,
          duration: 0.8
        }}>
            <div className="max-w-2xl mx-auto">
              
            </div>
          </motion.div>

          {/* Email Signup & Legal Links Combined */}
          <motion.div className="mb-16 space-y-8" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 2,
          duration: 0.8
        }}>
            {/* Email Signup */}
            <motion.div whileHover={{
            scale: 1.02,
            y: -5
          }} transition={{
            duration: 0.3
          }} className="bg-nf-black/60 backdrop-blur-sm border border-nf-red/20 p-6 sm:p-8 max-w-lg mx-auto shadow-2xl rounded-2xl">
              <motion.h3 className="text-xl font-semibold text-nf-white mb-6" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              delay: 2.2,
              duration: 0.6
            }}>
                Sei der Erste, der erfährt wenn es losgeht! 🚀
              </motion.h3>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <motion.div initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 2.4,
                duration: 0.6
              }}>
                  <Input type="email" placeholder="Deine E-Mail Adresse" value={email} onChange={e => setEmail(e.target.value)} className="h-12 text-base bg-nf-black/80 border-nf-white/20 text-nf-white placeholder:text-nf-white/60 focus:border-nf-red transition-all duration-300" required />
                </motion.div>
                <motion.div initial={{
                opacity: 0,
                x: 20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 2.6,
                duration: 0.6
              }}>
                  <Button type="submit" className="w-full h-12 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 text-[#fffcfc] bg-[#ff0000]">
                    <Mail className="h-5 w-5 mr-2" />
                    Jetzt benachrichtigen lassen
                  </Button>
                </motion.div>
              </form>
            </motion.div>

            {/* Legal Links - Integrated */}
            <motion.div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 2.8,
            duration: 0.6
          }}>
              <div className="text-center">
                <h4 className="text-nf-white/80 font-medium text-sm mb-3">Rechtliche Informationen</h4>
                <div className="flex flex-wrap justify-center gap-3">
                  {legalLinks.map((link, index) => <motion.div key={link.name} initial={{
                  opacity: 0,
                  y: 10
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  delay: 3 + index * 0.1,
                  duration: 0.5
                }}>
                      <Link to={link.href} className="bg-nf-black/40 border border-nf-red/30 hover:border-nf-red px-4 py-2 rounded-lg text-nf-white hover:text-nf-red text-sm font-medium transition-all duration-300 hover:bg-nf-black/60 inline-block">
                        {link.name}
                      </Link>
                    </motion.div>)}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          

          <motion.div className="text-center" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 3.4,
          duration: 0.8
        }}>
            <p className="text-nf-white/70 text-sm mb-2">
              Hast du Fragen? Wir sind für dich da!
            </p>
            <motion.a href="mailto:info@niklashauger.de" className="inline-flex items-center text-nf-red hover:text-nf-red/80 font-medium transition-all duration-300 hover:scale-105" whileHover={{
            scale: 1.05
          }}>
              <Mail className="h-4 w-4 mr-2" />
              info@niklashauger.de
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-nf-black border-t border-nf-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-nf-white/60 text-sm">
              © {new Date().getFullYear()} Niklas Hauger Coaching. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>
    </div>;
};
export default ComingSoon;