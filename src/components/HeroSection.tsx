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
      className="relative bg-black overflow-hidden pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16"
    >
      <div className="absolute inset-0 bg-gradient-radial from-nf-red/8 via-transparent to-transparent will-change-transform" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Characters Container - BILD MIT TEXT DARÜBER */}
        <div className="relative max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto mb-6 sm:mb-8">
          <motion.div
            style={{ y }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative will-change-transform"
          >
            {/* OPTIMIERTES GRADIENT */}
            <div className="absolute inset-0 -z-10 will-change-transform">
              <div
                className="absolute inset-0 bg-gradient-to-t from-nf-red/35 via-nf-red/10 to-transparent"
                style={{ filter: "blur(80px)" }}
              />
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-2/3 bg-nf-red/25"
                style={{ filter: "blur(100px)" }}
              />
            </div>

            {/* BILD MIT HÖHENBESCHRÄNKUNG - Beine werden abgeschnitten */}
            <div className="relative overflow-hidden rounded-b-2xl" style={{ maxHeight: "65vh" }}>
              <img
                src="/assets/niklas-fabienne-hero22.png"
                alt="Niklas & Fabienne"
                className="w-full h-auto relative z-10"
                style={{
                  objectFit: "cover",
                  objectPosition: "center top",
                  maxHeight: "65vh",
                }}
                loading="eager"
              />

              {/* ÜBERSCHRIFT ÜBER DEM BILD MIT DURCHFADE-EFFEKT */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1.2,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-start pt-8 sm:pt-12 md:pt-16 lg:pt-20"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{
                    opacity: [0, 1, 1, 0.85],
                    y: [30, 0, 0, 0],
                    scale: [0.95, 1, 1, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    times: [0, 0.3, 0.7, 1],
                    ease: "easeOut",
                  }}
                  className="text-[3.5rem] leading-[0.85] sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold mb-3 sm:mb-4 px-2 text-center"
                  style={{
                    mixBlendMode: "screen",
                  }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0.9] }}
                    transition={{ duration: 2.5, times: [0, 0.3, 0.7, 1] }}
                    className="text-white block drop-shadow-2xl"
                    style={{
                      textShadow: "0 0 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    KÖRPER
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0.95] }}
                    transition={{ duration: 2.5, times: [0, 0.35, 0.7, 1], delay: 0.2 }}
                    className="block font-black drop-shadow-2xl"
                    style={{
                      color: "rgb(220, 38, 38)",
                      textShadow:
                        "0 0 60px rgba(220, 38, 38, 0.8), 0 0 30px rgba(220, 38, 38, 0.6), 0 0 80px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    & GEIST
                  </motion.span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: [0, 1, 1, 0.7], y: [20, 0, 0, 0] }}
                  transition={{ duration: 2.5, times: [0, 0.4, 0.7, 1], delay: 0.3 }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-light px-2 mt-2 sm:mt-3"
                  style={{
                    textShadow: "0 0 20px rgba(0, 0, 0, 1), 0 2px 10px rgba(0, 0, 0, 0.8)",
                    mixBlendMode: "screen",
                  }}
                >
                  Ganzheitliches Online Coaching
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* CTA Button & Badges - UNTERHALB DES BILDES, NICHT MEHR ÜBERLAGERT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="relative z-30 flex flex-col items-center max-w-2xl mx-auto px-4"
        >
          <motion.button
            onClick={() => scrollToSection("#booking-funnel")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ backgroundColor: "rgb(220, 38, 38)" }}
            className="w-full max-w-md text-white px-8 py-5 sm:px-10 sm:py-6 md:px-12 md:py-7 text-base sm:text-lg md:text-xl font-bold rounded-xl shadow-2xl border border-white/10 transition-all duration-200 hover:opacity-90 flex items-center justify-center mb-4 sm:mb-5"
          >
            <Zap className="w-6 h-6 sm:w-7 sm:h-7 mr-3" />
            KOSTENLOSES GESPRÄCH
          </motion.button>

          {/* Trust Badges - BESSER POSITIONIERT UND GRÖSSERE ICONS */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-white/90 text-xs sm:text-sm">
            {/* Badge 1 - Rating */}
            <div className="flex items-center gap-2 bg-black/70 px-3 py-1.5 sm:py-2 rounded-full border border-nf-red/40">
              <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-nf-red" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold">4.9/5</span>
            </div>

            {/* Badge 2 - Kunden */}
            <div className="flex items-center gap-2 bg-black/70 px-3 py-1.5 sm:py-2 rounded-full border border-nf-red/40">
              <svg
                className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-nf-red"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-semibold whitespace-nowrap">500+ Kunden</span>
            </div>

            {/* Badge 3 - Diskret */}
            <div className="flex items-center gap-2 bg-black/70 px-3 py-1.5 sm:py-2 rounded-full border border-nf-red/40">
              <svg
                className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-nf-red"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="font-semibold whitespace-nowrap">100% Diskret</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
