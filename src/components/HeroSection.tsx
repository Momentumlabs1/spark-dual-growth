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
        {/* Title - MOBILE OPTIMIERT, NICHT ABGESCHNITTEN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-6xl mx-auto"
        >
          <h1 className="text-[2.75rem] leading-[0.95] sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold mb-3 sm:mb-4 px-2">
            <span className="text-white block">KÖRPER</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nf-red via-pink-500 to-pink-600 block">
              & GEIST
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/40 font-light px-2">
            Ganzheitliches Online Coaching
          </p>
        </motion.div>

        {/* Characters Container */}
        <div className="relative max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
          <motion.div
            style={{ y }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            {/* STARKES LEUCHTENDES ROTES GRADIENT HINTER FIGUREN */}
            <div className="absolute inset-0 -z-10">
              {/* Hauptgradient - Starkes Rot von unten */}
              <div className="absolute inset-0 bg-gradient-to-t from-nf-red/40 via-nf-red/15 to-transparent blur-3xl" />

              {/* Mehrere Glow-Layer für intensive Leuchtkraft */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-3/4 bg-nf-red/35 blur-[120px]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-2/3 bg-nf-red/30 blur-[100px]" />

              {/* Seitliche rote Glows */}
              <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-nf-red/25 rounded-full blur-[90px]" />
              <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-nf-red/25 rounded-full blur-[90px]" />

              {/* Zentraler intensiver Glow */}
              <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-nf-red/20 rounded-full blur-[110px]" />

              {/* Radialer Glow von der Mitte */}
              <div className="absolute inset-0 bg-gradient-radial from-nf-red/20 via-nf-red/5 to-transparent" />
            </div>

            <img
              src="/assets/niklas-fabienne-hero22.png"
              alt="Niklas & Fabienne"
              className="w-full h-auto relative z-10"
            />

            {/* CTA Button - JETZT WIRKLICH PERFEKT MITTIG */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-[3%] left-0 right-0 z-30 flex justify-center px-4"
            >
              <motion.button
                onClick={() => scrollToSection("#booking-funnel")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ backgroundColor: "rgb(220, 38, 38)" }}
                className="relative text-white px-8 py-5 sm:px-10 sm:py-6 md:px-12 md:py-7 text-sm sm:text-base md:text-lg font-bold rounded-xl shadow-2xl border border-white/10 transition-all duration-300 hover:opacity-90 flex items-center justify-center"
              >
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                KOSTENLOSES GESPRÄCH
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
