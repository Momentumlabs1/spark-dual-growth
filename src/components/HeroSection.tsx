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
      className="relative bg-black overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-24 md:pb-28"
    >
      <div className="absolute inset-0 bg-gradient-radial from-nf-red/10 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Title */}
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

        {/* Characters Container */}
        <div className="relative max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <motion.div
            style={{ y }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative mb-8 sm:mb-10 md:mb-12"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-nf-red/20 via-transparent to-transparent blur-3xl" />

            <img
              src="/assets/niklas-fabienne-hero22.png"
              alt="Niklas & Fabienne"
              className="w-full h-auto relative z-10"
            />

            {/* LEFT - 500+ - DEUTLICH GRÖSSER */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute left-0 sm:left-2 md:left-4 lg:left-6 top-[38%] sm:top-[40%] md:top-[42%] bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 shadow-2xl z-20"
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-none">500+</div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-white/50 mt-1">Kunden</div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT - 4.9/5 - DEUTLICH GRÖSSER */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute right-0 sm:right-2 md:right-4 lg:right-6 top-[34%] sm:top-[36%] md:top-[38%] bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 shadow-2xl z-20"
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white fill-white" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-none">4.9/5</div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-white/50 mt-1">Rating</div>
                </div>
              </div>
            </motion.div>

            {/* BOTTOM - 95% - AUF HÜFTHÖHE, NICHT ZU HOCH - DEUTLICH GRÖSSER */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-[28%] sm:bottom-[26%] md:bottom-[24%] bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 shadow-2xl z-20"
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-none">95%</div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-white/50 mt-1">Erfolgsrate</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* CTA Button - KEIN OVERLAP MEHR, UNTER DEM BILD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="relative z-30 px-3 sm:px-4"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => scrollToSection("#booking-funnel")}
                className="w-full bg-nf-red hover:bg-nf-red/90 text-white px-8 py-6 sm:py-7 md:px-12 md:py-8 text-base sm:text-lg md:text-xl font-bold rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-nf-red/20 transition-all duration-300"
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
