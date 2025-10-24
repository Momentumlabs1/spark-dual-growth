import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Users, TrendingUp, Zap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section ref={containerRef} className="relative bg-black overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-nf-red text-[10px] sm:text-xs md:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4"
          >
            ✨ DEIN WEG ZUR BESTEN VERSION
          </motion.span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] mb-3 sm:mb-4">
            <span className="text-white">KÖRPER</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nf-red via-pink-500 to-pink-600">
              & GEIST
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white/50 font-light"
          >
            Ganzheitliches Online Coaching
          </motion.p>
        </motion.div>

        {/* Characters Container - RESPONSIVE WIDTH */}
        <div className="relative max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
          {/* Characters Image */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <img src="/assets/niklas-fabienne-hero22.png" alt="Niklas & Fabienne" className="w-full h-auto" />

            {/* Floating Stats Cards - RESPONSIVE */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute left-0 sm:left-2 md:left-4 lg:left-6 top-[35%] sm:top-[38%] md:top-[40%] bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg sm:rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 shadow-2xl"
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-nf-red flex-shrink-0" />
                <div>
                  <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white leading-none">
                    500+
                  </div>
                  <div className="text-[8px] sm:text-[9px] md:text-[10px] text-white/40 mt-0.5">Kunden</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute right-0 sm:right-2 md:right-4 lg:right-6 top-[30%] sm:top-[33%] md:top-[35%] bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg sm:rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 shadow-2xl"
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-500 flex-shrink-0" />
                <div>
                  <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white leading-none">
                    4.9/5
                  </div>
                  <div className="text-[8px] sm:text-[9px] md:text-[10px] text-white/40 mt-0.5">Rating</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-1 sm:bottom-2 md:bottom-3 lg:bottom-4 xl:bottom-6 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg sm:rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 shadow-2xl"
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
                <div>
                  <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white leading-none">
                    95%
                  </div>
                  <div className="text-[8px] sm:text-[9px] md:text-[10px] text-white/40 mt-0.5">Erfolgsrate</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* CTA Buttons - RESPONSIVE OVERLAP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="relative -mt-8 sm:-mt-10 md:-mt-14 lg:-mt-16 xl:-mt-20 z-30 max-w-3xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Button
                onClick={() => scrollToSection("#booking-funnel")}
                className="w-full bg-nf-red hover:bg-nf-red/90 text-white px-5 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 text-xs sm:text-sm md:text-base font-bold rounded-lg sm:rounded-xl shadow-lg"
                size="lg"
              >
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-2" />
                KOSTENLOSES GESPRÄCH
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Button
                onClick={() => scrollToSection("#testimonials")}
                variant="outline"
                className="w-full bg-white/5 border-2 border-white/20 text-white hover:bg-white hover:text-black px-5 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 text-xs sm:text-sm md:text-base font-bold rounded-lg sm:rounded-xl"
                size="lg"
              >
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-2" />
                ERFOLGE ANSEHEN
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Trust Indicator - RESPONSIVE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="flex items-center justify-center gap-1.5 sm:gap-2 mt-5 sm:mt-6 md:mt-8 text-white/30 text-[10px] sm:text-xs md:text-sm"
        >
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 fill-yellow-500 text-yellow-500" />
            ))}
          </div>
          <span>von 500+ Kunden</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
