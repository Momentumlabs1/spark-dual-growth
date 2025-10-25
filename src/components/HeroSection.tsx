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
      className="relative bg-black overflow-hidden pt-12 sm:pt-16 md:pt-12 lg:pt-16 pb-8 sm:pb-12 md:pb-10 lg:pb-12"
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

            {/* BILD MIT HÖHENBESCHRÄNKUNG - Mobile KLEIN (35vh), Desktop (55vh) */}
            <div className="relative overflow-hidden rounded-b-2xl h-[35vh] sm:h-[40vh] md:h-[55vh] lg:h-[60vh]">
              <img
                src="/assets/niklas-fabienne-hero22.png"
                alt="Niklas & Fabienne"
                className="w-full h-full object-cover object-top relative z-10"
                loading="eager"
              />

              {/* ÜBERSCHRIFT - Desktop horizontal, Mobile größer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 2,
                  duration: 2,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-8 sm:pb-12 md:pb-20 lg:pb-24 xl:pb-28 px-4"
              >
                {/* Desktop: Horizontal nebeneinander, Mobile: Größer */}
                <h1 className="text-center">
                  {/* Mobile: Kompakt */}
                  <div className="block md:hidden">
                    <div className="flex items-center justify-center gap-1.5 text-[1.75rem] sm:text-[2rem] font-bold leading-none">
                      <span
                        className="text-white"
                        style={{
                          textShadow: "0 2px 8px rgba(0, 0, 0, 0.8), 0 0 2px rgba(0, 0, 0, 0.5)",
                        }}
                      >
                        KÖRPER
                      </span>
                      <span
                        className="font-black"
                        style={{
                          color: "rgb(220, 38, 38)",
                          textShadow: "0 2px 8px rgba(0, 0, 0, 0.8), 0 0 2px rgba(0, 0, 0, 0.5)",
                        }}
                      >
                        & GEIST
                      </span>
                    </div>
                  </div>

                  {/* Desktop: Horizontal - KÖRPER (Niklas) | GEIST (Fabienne) */}
                  <div className="hidden md:flex items-center justify-center gap-4 lg:gap-6 text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-none">
                    <span
                      className="text-white"
                      style={{
                        textShadow: "0 2px 8px rgba(0, 0, 0, 0.8), 0 0 2px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      KÖRPER
                    </span>
                    <span
                      className="font-black"
                      style={{
                        color: "rgb(220, 38, 38)",
                        textShadow: "0 2px 8px rgba(0, 0, 0, 0.8), 0 0 2px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      & GEIST
                    </span>
                  </div>
                </h1>

                <p
                  className="text-xs sm:text-sm md:text-lg lg:text-xl text-white/80 font-light mt-2 sm:mt-3"
                  style={{
                    textShadow: "0 2px 6px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  Ganzheitliches Online Coaching
                </p>
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
            className="w-full max-w-md md:max-w-lg lg:max-w-xl text-white px-6 py-4 sm:px-8 sm:py-5 md:px-14 md:py-7 lg:px-16 lg:py-8 text-sm sm:text-base md:text-xl lg:text-2xl font-bold rounded-xl shadow-2xl border border-white/10 transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5"
          >
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
            <span className="whitespace-nowrap">KOSTENLOSES GESPRÄCH</span>
          </motion.button>

          {/* Trust Badges - Kompakter auf Mobile */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 text-white/90 text-[0.65rem] sm:text-xs md:text-sm">
            {/* Badge 1 - Rating */}
            <div className="flex items-center gap-1.5 sm:gap-2 bg-black/70 px-2 py-1 sm:px-3 sm:py-1.5 md:py-2 rounded-full border border-nf-red/40">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-nf-red" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold">4.9/5</span>
            </div>

            {/* Badge 2 - Kunden */}
            <div className="flex items-center gap-1.5 sm:gap-2 bg-black/70 px-2 py-1 sm:px-3 sm:py-1.5 md:py-2 rounded-full border border-nf-red/40">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-nf-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div className="flex items-center gap-1.5 sm:gap-2 bg-black/70 px-2 py-1 sm:px-3 sm:py-1.5 md:py-2 rounded-full border border-nf-red/40">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-nf-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
