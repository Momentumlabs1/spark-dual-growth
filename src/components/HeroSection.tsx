import { motion, useScroll, useTransform } from "framer-motion";
import { Zap } from "lucide-react";
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
      className="relative bg-black overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-nf-red/8 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* ========== HERO CONTAINER ========== */}
        <div className="relative mx-auto mb-6 sm:mb-8">
          <motion.div
            style={{ y }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Red Gradient Glow */}
            <div className="absolute inset-0 -z-10">
              <div
                className="absolute inset-0 bg-gradient-to-t from-nf-red/30 via-nf-red/10 to-transparent"
                style={{ filter: "blur(80px)" }}
              />
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-2/3 bg-nf-red/20"
                style={{ filter: "blur(100px)" }}
              />
            </div>

            {/* CONTENT Container - alles zentriert */}
            <div className="relative w-[88%] sm:w-[85%] max-w-md md:max-w-lg mx-auto">
              
              {/* TEXT - KÖRPER & GEIST - über dem Bild */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
                className="relative z-10 text-center mb-4 sm:mb-6"
              >
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-none">
                    <span
                      className="text-white"
                      style={{
                        textShadow: "0 4px 20px rgba(0, 0, 0, 0.95)",
                      }}
                    >
                      KÖRPER
                    </span>
                  </h1>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none">
                    <span
                      style={{
                        color: "rgb(220, 38, 38)",
                        textShadow: "0 4px 20px rgba(0, 0, 0, 0.95)",
                      }}
                    >
                      & GEIST
                    </span>
                  </h1>
                </div>

                <p
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 font-light"
                  style={{
                    textShadow: "0 2px 12px rgba(0, 0, 0, 0.95)",
                  }}
                >
                  Ganzheitliches Online Coaching
                </p>
              </motion.div>

              {/* BILD - Charaktere komplett sichtbar, skaliert */}
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/assets/niklas-fabienne-hero22.png"
                  alt="Niklas & Fabienne"
                  className="w-full h-auto object-contain"
                  loading="eager"
                />
                
                {/* Button über dem unteren Teil des Bildes */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="absolute bottom-0 left-0 right-0 pb-6 sm:pb-8"
                >
                  <motion.button
                    onClick={() => scrollToSection("#booking-funnel")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ backgroundColor: "rgb(220, 38, 38)" }}
                    className="w-full text-white px-5 py-4 sm:px-8 sm:py-5 md:px-12 md:py-6 text-sm sm:text-base md:text-lg lg:text-xl font-bold rounded-xl shadow-2xl border border-white/10 transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2 sm:gap-3"
                  >
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
                    <span className="whitespace-nowrap">KOSTENLOSES GESPRÄCH</span>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ========== TRUST BADGES UNTEN ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-white/90 text-xs sm:text-sm max-w-2xl mx-auto"
        >
          {/* 4.9/5 Rating */}
          <div className="flex items-center gap-2 bg-black/70 px-4 py-2 rounded-full border border-nf-red/40">
            <svg className="w-4 h-4 text-nf-red" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-semibold">4.9/5</span>
          </div>

          {/* 500+ Kunden */}
          <div className="flex items-center gap-2 bg-black/70 px-4 py-2 rounded-full border border-nf-red/40">
            <svg className="w-4 h-4 text-nf-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-semibold whitespace-nowrap">500+ Kunden</span>
          </div>

          {/* 100% Diskret */}
          <div className="flex items-center gap-2 bg-black/70 px-4 py-2 rounded-full border border-nf-red/40">
            <svg className="w-4 h-4 text-nf-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span className="font-semibold whitespace-nowrap">100% Diskret</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;