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

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section ref={containerRef} className="relative bg-black overflow-hidden py-12 sm:py-16 md:py-20">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Title Section - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-8"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-nf-red text-[10px] sm:text-xs font-medium tracking-wider uppercase mb-3"
          >
            ✨ DEIN WEG ZUR BESTEN VERSION
          </motion.span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.85] mb-2">
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
            className="text-sm sm:text-base md:text-lg text-white/50 font-light mt-2"
          >
            Ganzheitliches Online Coaching
          </motion.p>
        </motion.div>

        {/* Main Container with Characters + Everything */}
        <div className="relative max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto">
          {/* Characters Image Container */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <img
              src="/assets/niklas-fabienne-hero22.png"
              alt="Niklas & Fabienne"
              className="w-full h-auto relative z-10"
            />

            {/* Stats Cards - Float AROUND characters */}
            {/* LEFT - 500+ */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute left-0 top-[42%] md:top-[45%] bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-2 shadow-2xl z-20"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-nf-red" />
                <div>
                  <div className="text-lg md:text-2xl font-bold text-white leading-none">500+</div>
                  <div className="text-[9px] md:text-[10px] text-white/40">Kunden</div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT - 4.9/5 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute right-0 top-[38%] md:top-[42%] bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-2 shadow-2xl z-20"
            >
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                <div>
                  <div className="text-lg md:text-2xl font-bold text-white leading-none">4.9/5</div>
                  <div className="text-[9px] md:text-[10px] text-white/40">Rating</div>
                </div>
              </div>
            </motion.div>

            {/* BOTTOM - 95% - On the lower body, NOT at feet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-[25%] md:bottom-[28%] bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-2 shadow-2xl z-20"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                <div>
                  <div className="text-lg md:text-2xl font-bold text-white leading-none">95%</div>
                  <div className="text-[9px] md:text-[10px] text-white/40">Erfolgsrate</div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons - OVERLAPPING the bottom/feet area with NEGATIVE MARGIN */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="absolute left-0 right-0 -bottom-6 sm:-bottom-8 md:-bottom-10 z-30"
            >
              <div className="flex flex-col sm:flex-row gap-3 justify-center px-2">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => scrollToSection("#booking-funnel")}
                    className="w-full sm:w-auto bg-nf-red hover:bg-nf-red/90 text-white px-6 md:px-8 py-4 md:py-5 text-xs md:text-sm font-bold rounded-xl shadow-lg"
                    size="lg"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    KOSTENLOSES GESPRÄCH
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => scrollToSection("#testimonials")}
                    variant="outline"
                    className="w-full sm:w-auto bg-white/5 border-2 border-white/20 text-white hover:bg-white hover:text-black px-6 md:px-8 py-4 md:py-5 text-xs md:text-sm font-bold rounded-xl"
                    size="lg"
                  >
                    <Award className="w-4 h-4 mr-2" />
                    ERFOLGE ANSEHEN
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Trust Indicator - Below buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="flex items-center justify-center gap-2 mt-16 sm:mt-20 md:mt-24 text-white/30 text-xs"
        >
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            ))}
          </div>
          <span>von 500+ Kunden</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
