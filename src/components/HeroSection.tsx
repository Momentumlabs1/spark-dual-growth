import { motion } from 'framer-motion';
import { Star, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoEmbed from '@/components/VideoEmbed';

const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const stats = [
    { icon: Users, label: '500+ Kunden', value: '500+' },
    { icon: Star, label: '4.9/5 ⭐', value: '4.9/5' },
    { icon: TrendingUp, label: '95% Erfolgsrate', value: '95%' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-nf-black via-nf-black/95 to-nf-red/20 py-20">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-nf-white mb-6 tracking-tight text-balance">
            <span className="block">NIK & FABIENNE</span>
            <span className="block text-nf-red">DEIN COACHING</span>
            <span className="block">FÜR KÖRPER & GEIST</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-nf-white/90 mb-10 max-w-3xl mx-auto text-balance">
            Ganzheitliches Online Health & Fitness Coaching
          </p>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-10"
          >
            <VideoEmbed 
              src="/funnel/Niklas-Kompletter-Fitness-Funnel"
              ctaLabel="Jetzt starten - Prüfe, wie wir dir helfen können"
            />
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center items-center gap-6 md:gap-12 mb-10 text-nf-white/80"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex items-center gap-2">
                <stat.icon className="h-5 w-5 text-nf-red" />
                <span className="text-sm md:text-base font-medium">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={() => scrollToSection('#kontakt')}
              className="bg-nf-red hover:bg-nf-red/90 text-nf-white px-8 py-4 text-lg font-semibold shadow-red-glow animate-pulse-red transition-smooth"
              size="lg"
            >
              KOSTENLOSES GESPRÄCH
            </Button>
            <Button
              onClick={() => scrollToSection('#team')}
              variant="outline"
              className="border-nf-white text-nf-white hover:bg-nf-white hover:text-nf-black px-8 py-4 text-lg font-semibold transition-smooth"
              size="lg"
            >
              MEHR ERFAHREN
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-nf-white/60"
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-nf-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-nf-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;