import { motion, useScroll, useTransform } from "framer-motion";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative bg-black overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-24 md:pb-28"
    >
      <div className="absolute inset-0 bg-gradient-radial from-nf-red/10 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Title - CLEANER & BREITER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20 max-w-5xl mx-auto"
        >
          <span className="inline-block text-nf-red text-xs sm:text-sm md:text-base font-semibold tracking-[0.2em] uppercase mb-6 md:mb-8">
            DEIN WEG ZUR BESTEN VERSION
          </span>

          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-bold leading-[0.9] mb-6">
            <span className="text-white block">KÖRPER</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nf-red via-pink-500 to-pink-600 block">
              & GEIST
            </span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl text-white/50 font-light tracking-wide">
            Ganzheitliches Online Coaching
          </p>
        </motion.div>

        {/* Characters Container */}
        <div className="relative max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
          <motion.div
            style={{ y }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            {/* COOLER GRADIENT EFFEKT HINTER CHARAKTEREN */}
            <div className="absolute inset-0 -z-10">
              {/* Hauptgradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-nf-red/30 via-pink-500/20 to-transparent blur-3xl" />

              {/* Zusätzliche Glows */}
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-nf-red/40 rounded-full blur-[100px] animate-pulse" />
              <div
                className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-500/30 rounded-full blur-[120px] animate-pulse"
                style={{ animationDelay: "1s" }}
              />
              <div
                className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-purple-500/20 rounded-full blur-[140px] animate-pulse"
                style={{ animationDelay: "2s" }}
              />

              {/* Radiale Wellen */}
              <div className="absolute inset-0 bg-gradient-radial from-nf-red/20 via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 bg-gradient-radial from-pink-500/20 via-transparent to-transparent opacity-40" />
            </div>

            <img
              src="/assets/niklas-fabienne-hero22.png"
              alt="Niklas & Fabienne"
              className="w-full h-auto relative z-10"
            />

            {/* CTA Button - GROSS UND ÜBER FÜSSE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] sm:w-[80%] md:w-[75%] z-30"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="relative">
                {/* Glow Effekt um Button */}
                <div className="absolute inset-0 bg-gradient-to-r from-nf-red via-pink-500 to-nf-red blur-xl opacity-50" />

                <Button
                  onClick={() => scrollToSection("#booking-funnel")}
                  className="relative w-full bg-gradient-to-r from-nf-red via-pink-600 to-nf-red hover:from-nf-red/90 hover:via-pink-600/90 hover:to-nf-red/90 text-white px-8 py-7 sm:py-8 md:py-10 lg:py-12 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold rounded-2xl shadow-2xl border-2 border-white/10 backdrop-blur-sm"
                  size="lg"
                >
                  <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mr-2 sm:mr-3 animate-pulse" />
                  KOSTENLOSES GESPRÄCH
                  <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ml-2 sm:ml-3 animate-pulse" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
