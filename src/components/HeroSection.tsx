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
          <h1 className="text-[3.5rem] leading-[0.85] sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold mb-3 sm:mb-4 px-2">
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
            {/* LEUCHTENDES ROTES GRADIENT HINTER FIGUREN - GLEICHE FARBE WIE TEXT */}
            <div className="absolute inset-0 -z-10">
              {/* Hauptgradient - Rot leuchtend */}
              <div className="absolute inset-0 bg-gradient-to-t from-nf-red/30 via-nf-red/10 to-transparent blur-3xl" />

              {/* Zusätzliche rote Glows für mehr Leuchtkraft */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-3/4 bg-nf-red/25 blur-[100px]" />
              <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-nf-red/20 rounded-full blur-[80px]" />
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-nf-red/20 rounded-full blur-[80px]" />

              {/* Subtiler radialer Glow */}
              <div className="absolute inset-0 bg-gradient-radial from-nf-red/15 via-transparent to-transparent" />
            </div>

            <img
              src="/assets/niklas-fabienne-hero22.png"
              alt="Niklas & Fabienne"
              className="w-full h-auto relative z-10"
            />

            {/* CTA Button - PERFEKT ÜBER FÜSSEN, NF-RED FARBE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-[3%] sm:bottom-[4%] md:bottom-[5%] left-1/2 -translate-x-1/2 w-[92%] sm:w-[88%] md:w-[85%] lg:w-[80%] z-30"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative group">
                {/* Subtiler Glow beim Hover */}
                <div className="absolute inset-0 bg-nf-red/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <Button
                  onClick={() => scrollToSection("#booking-funnel")}
                  className="relative w-full bg-nf-red hover:bg-nf-red/90 text-white px-5 py-5 sm:px-6 sm:py-6 md:px-8 md:py-7 lg:py-8 text-sm sm:text-base md:text-lg lg:text-xl font-bold rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl border border-white/10 transition-all duration-300"
                  size="lg"
                >
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2" />
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
