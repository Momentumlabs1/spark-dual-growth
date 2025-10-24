import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Users, TrendingUp, Zap } from "lucide-react";
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
      className="relative bg-black overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20"
    >
      {/* Subtle glow */}
      <div className="absolute inset-0 bg-gradient-radial from-nf-red/10 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Title - BIGGER & NICER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-14 md:mb-16"
        >
          <span className="inline-block text-nf-red text-sm md:text-base font-semibold tracking-wider uppercase mb-5">
            ✨ DEIN WEG ZUR BESTEN VERSION
          </span>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.85] mb-4">
            <span className="text-white">KÖRPER</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nf-red via-pink-500 to-pink-600">
              & GEIST
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/60 font-light">Ganzheitliches Online Coaching</p>
        </motion.div>

        {/* Characters + Floating Stats - SMALLER ON DESKTOP */}
        <div className="relative max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto">
          <motion.div
            style={{ y }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-nf-red/20 via-transparent to-transparent blur-3xl" />

            {/* Characters */}
            <img
              src="/assets/niklas-fabienne-hero22.png"
              alt="Niklas & Fabienne"
              className="w-full h-auto relative z-10"
            />

            {/* Floating Stats - LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute left-0 sm:left-2 md:left-4 top-[40%] md:top-[43%] bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-2.5 md:px-4 md:py-3 shadow-2xl z-20"
            >
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
                  <Users className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold text-white leading-none">500+</div>
                  <div className="text-[9px] md:text-[10px] text-white/40 mt-0.5">Kunden</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Stats - RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute right-0 sm:right-2 md:right-4 top-[36%] md:top-[40%] bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-2.5 md:px-4 md:py-3 shadow-2xl z-20"
            >
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                  <Star className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold text-white leading-none">4.9/5</div>
                  <div className="text-[9px] md:text-[10px] text-white/40 mt-0.5">Rating</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Stats - BOTTOM CENTER - HIGHER ON MOBILE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-[28%] sm:bottom-[26%] md:bottom-[25%] bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-2.5 md:px-4 md:py-3 shadow-2xl z-20"
            >
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold text-white leading-none">95%</div>
                  <div className="text-[9px] md:text-[10px] text-white/40 mt-0.5">Erfolgsrate</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* CTA Button - BIGGER ON MOBILE, BIGGER ON DESKTOP, HIGHER ON MOBILE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="absolute left-0 right-0 -bottom-8 sm:-bottom-8 md:-bottom-10 z-30 px-3 sm:px-4"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => scrollToSection("#booking-funnel")}
                className="w-full bg-nf-red hover:bg-nf-red/90 text-white px-8 py-6 sm:py-7 md:px-12 md:py-8 text-base sm:text-lg md:text-xl font-bold rounded-xl shadow-lg"
                size="lg"
              >
                <Zap className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                KOSTENLOSES GESPRÄCH
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
