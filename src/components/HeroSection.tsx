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
      <div className="absolute inset-0 bg-gradient-radial from-nf-red/8 via-transparent to-transparent will-change-transform" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Title - MOBILE OPTIMIERT, NICHT ABGESCHNITTEN */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-6xl mx-auto"
        >
          <h1 className="text-[2.75rem] leading-[0.95] sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold mb-3 sm:mb-4 px-2">
            <span className="text-white block">KÖRPER</span>
            <span
              className="block font-black"
              style={{
                color: "rgb(220, 38, 38)",
                textShadow: "0 0 20px rgba(220, 38, 38, 0.5), 0 0 40px rgba(220, 38, 38, 0.3)",
              }}
            >
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative will-change-transform"
          >
            {/* OPTIMIERTES GRADIENT - weniger Layer, bessere Performance */}
            <div className="absolute inset-0 -z-10 will-change-transform">
              {/* Einziger optimierter Gradient */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-nf-red/35 via-nf-red/10 to-transparent"
                style={{ filter: "blur(80px)" }}
              />

              {/* Zentraler Glow - reduziert */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-2/3 bg-nf-red/25"
                style={{ filter: "blur(100px)" }}
              />
            </div>

            <img
              src="/assets/niklas-fabienne-hero22.png"
              alt="Niklas & Fabienne"
              className="w-full h-auto relative z-10"
              loading="eager"
            />

            {/* CTA Button - OPTIMIERT */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute bottom-[1%] sm:bottom-[2%] left-0 right-0 z-30 flex flex-col items-center px-4"
            >
              <motion.button
                onClick={() => scrollToSection("#booking-funnel")}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                style={{ backgroundColor: "rgb(220, 38, 38)" }}
                className="relative text-white px-8 py-4 sm:px-10 sm:py-5 md:px-12 md:py-6 text-sm sm:text-base md:text-lg font-bold rounded-xl shadow-2xl border border-white/10 transition-all duration-200 hover:opacity-90 flex items-center justify-center mb-2 sm:mb-3"
              >
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                KOSTENLOSES GESPRÄCH
              </motion.button>

              {/* Trust Badges - Keine Animation */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-white/90 text-xs">
                {/* Badge 1 */}
                <div className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-full border border-nf-red/30">
                  <svg className="w-3.5 h-3.5 text-nf-red" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold">4.9/5</span>
                </div>

                {/* Badge 2 */}
                <div className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-full border border-nf-red/30">
                  <svg className="w-3.5 h-3.5 text-nf-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-semibold whitespace-nowrap">500+ Kunden</span>
                </div>

                {/* Badge 3 */}
                <div className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-full border border-nf-red/30">
                  <svg className="w-3.5 h-3.5 text-nf-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
