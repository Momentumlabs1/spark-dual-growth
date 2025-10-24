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

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section ref={containerRef} className="relative bg-black min-h-screen flex items-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-nf-red/20 via-purple-900/20 to-pink-900/20 opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-nf-red/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16">
        {/* Clean Title - NO red text above */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-black leading-[0.85] tracking-tight mb-4">
            <span className="text-white">KÖRPER</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nf-red via-pink-500 to-pink-600">
              & GEIST
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 font-light tracking-wide">Ganzheitliches Online Coaching</p>
        </motion.div>

        {/* Characters with Gradient Background */}
        <div className="relative max-w-2xl md:max-w-3xl mx-auto">
          {/* Cool Gradient Behind Characters */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[120%] h-[80%] bg-gradient-to-br from-nf-red/30 via-pink-600/20 to-purple-600/30 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] h-[60%] bg-gradient-to-t from-nf-red/40 via-pink-500/20 to-transparent blur-[80px]" />
          </div>

          <motion.div
            style={{ y }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            {/* Characters Image */}
            <img
              src="/assets/niklas-fabienne-hero22.png"
              alt="Niklas & Fabienne"
              className="w-full h-auto relative z-10"
            />

            {/* Big Button OVER Feet - Positioned absolute */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute left-0 right-0 bottom-[8%] md:bottom-[10%] z-20 px-4"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => scrollToSection("#booking-funnel")}
                  className="w-full bg-gradient-to-r from-nf-red to-pink-600 hover:from-nf-red/90 hover:to-pink-500 text-white px-8 py-7 md:py-9 text-lg md:text-2xl font-black rounded-2xl shadow-[0_20px_60px_-15px_rgba(239,68,68,0.6)] border-2 border-white/10"
                  size="lg"
                >
                  <Zap className="w-6 h-6 md:w-7 md:h-7 mr-3" />
                  KOSTENLOSES GESPRÄCH
                </Button>
              </motion.div>
            </motion.div>

            {/* Subtle Stats Line Below Characters */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute left-0 right-0 -bottom-8 md:-bottom-12 z-10 flex items-center justify-center gap-6 text-white/40 text-xs md:text-sm"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-nf-red" />
                500+ Kunden
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                4.9/5 Rating
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                95% Erfolgsrate
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
