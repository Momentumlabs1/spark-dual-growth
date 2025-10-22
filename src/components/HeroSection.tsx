import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoEmbed from "@/components/VideoEmbed";
import { useRef } from "react";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const stats = [
    { icon: Users, label: "500+ Kunden", value: "500+" },
    { icon: Star, label: "4.9/5 ⭐", value: "4.9/5" },
    { icon: TrendingUp, label: "95% Erfolgsrate", value: "95%" },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-nf-black via-nf-black/95 to-nf-red/20 py-12 md:py-20"
    >
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          style={{ y, opacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 md:mb-8"
        >
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="mb-6 md:mb-8"
          >
            <img
              src="/assets/hero-image.png"
              alt="Niklas und Fabienne - Dein Coaching Team für Körper & Geist"
              className="w-full max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md mx-auto h-auto rounded-2xl shadow-red-glow border border-nf-white/20"
              loading="eager"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl text-nf-white/90 mb-8 md:mb-10 max-w-3xl mx-auto text-balance font-medium"
          >
            Ganzheitliches Online Health & Fitness Coaching
          </motion.p>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-12 mb-8 md:mb-10 text-nf-white/80"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex items-center gap-2">
                <stat.icon className="h-4 w-4 md:h-5 md:w-5 text-nf-red" />
                <span className="text-xs md:text-sm lg:text-base font-medium">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center"
          >
            <Button
              onClick={() => scrollToSection("#booking-funnel")}
              className="w-full sm:w-auto bg-nf-red hover:bg-nf-red/90 text-nf-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold shadow-red-glow animate-pulse-red transition-smooth"
              size="lg"
            >
              KOSTENLOSES GESPRÄCH
            </Button>
            <Button
              onClick={() => scrollToSection("#team")}
              variant="outline"
              className="w-full sm:w-auto border-nf-white text-nf-white hover:bg-nf-white hover:text-nf-black px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold transition-smooth"
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
