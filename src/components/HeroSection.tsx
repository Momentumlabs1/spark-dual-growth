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
      className="relative bg-black overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20"
    >
      <div className="absolute inset-0 bg-gradient-radial from-nf-red/10 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Title - KOMPAKT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-10 md:mb-12 max-w-5xl mx-auto"
        >
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11rem] font-bold leading-[0.85] mb-3 sm:mb-4">
            <span className="text-white block">KÖRPER</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nf-red via-pink-500 to-pink-600 block">
              & GEIST
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/40 font-light">Ganzheitliches Online Coaching</p>
        </motion.div>

        {/* Characters Container - KOMPAKTER */}
        <div className="relative max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
          <motion.div
            style={{ y }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            {/* SUBTILER GRADIENT HINTER CHARAKTEREN */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-t from-nf-red/25 via-purple-900/15 to-transparent blur-3xl" />
              <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-nf-red/20 rounded-full blur-[120px]" />
              <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-pink-600/15 rounded-full blur-[100px]" />
            </div>

            <img
              src="/assets/niklas-fabienne-hero22.png"
              alt="Niklas & Fabienne"
              className="w-full h-auto relative z-10"
            />

            {/* CTA Button - PERFEKT POSITIONIERT ÜBER FÜSSEN */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[90%] sm:w-[85%] md:w-[80%] z-30"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative group">
                {/* Subtiler Glow */}
                <div className="absolute inset-0 bg-nf-red/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <Button
                  onClick={() => scrollToSection("#booking-funnel")}
                  className="relative w-full bg-nf-red hover:bg-nf-red/90 text-white px-6 py-6 sm:py-7 md:py-8 lg:py-9 text-base sm:text-lg md:text-xl lg:text-2xl font-bold rounded-xl sm:rounded-2xl shadow-2xl border border-white/10 transition-all duration-300"
                  size="lg"
                >
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 mr-2 sm:mr-3" />
                  KOSTENLOSES GESPRÄCH
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
