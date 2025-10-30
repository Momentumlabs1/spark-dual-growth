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
      className="relative bg-black overflow-hidden pt-44 sm:pt-48 md:pt-52 lg:pt-56 pb-16 sm:pb-20 md:pb-24"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-nf-red/8 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* HERO CONTAINER */}
        <div className="relative mx-auto w-[88%] sm:w-[85%] max-w-md md:max-w-lg">
          <div className="relative">
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

            {/* BILD CONTAINER - PARALLAX NUR AUF IMG */}
            <div className="relative rounded-2xl overflow-hidden h-[62vh] sm:h-[66vh] md:h-[68vh] lg:h-[70vh]">
              <motion.img
                style={{ y }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                src="/assets/niklas-fabienne-hero22.png"
                alt="Niklas & Fabienne"
                className="w-full h-full object-contain md:object-cover object-top md:object-[center_20%] pointer-events-none select-none"
                loading="eager"
                fetchPriority="high"
              />

              {/* TEXT IM BILD */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
                className="absolute top-1/2 left-0 right-0 -translate-y-1/2 text-center px-4"
              >
                <div className="text-center">
                  <h1 className="font-black tracking-tight leading-none text-[1.8rem] sm:text-3xl md:text-5xl lg:text-6xl">
                    <span className="text-white" style={{ textShadow: "0 4px 20px rgba(0,0,0,.95)" }}>
                      KÖRPER
                    </span>
                    <span
                      className="text-[.9em] font-black"
                      style={{
                        color: "rgb(220, 38, 38)",
                        textShadow: "0 4px 20px rgba(0,0,0,.95)",
                      }}
                    >
                      {" "}
                      &{" "}
                    </span>
                    <span
                      className="font-black"
                      style={{
                        color: "rgb(220, 38, 38)",
                        textShadow: "0 4px 20px rgba(0,0,0,.95)",
                      }}
                    >
                      GEIST
                    </span>
                  </h1>
                  <p
                    className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl text-white/95 font-medium"
                    style={{
                      textShadow: "0 2px 12px rgba(0,0,0,.95)",
                    }}
                  >
                    Deine Fitness-Transformation mit ganzheitlichem Online Coaching
                  </p>
                </div>
              </motion.div>

              {/* BUTTON INS BILD – ÜBERLAPPT DIE BEINE */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center">
                <motion.button
                  onClick={() => scrollToSection("#booking-funnel")}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ backgroundColor: "rgb(220, 38, 38)" }}
                  className="pointer-events-auto w-[92%] sm:w-[86%] md:w-[80%] text-white px-4 py-3.5 sm:px-6 sm:py-4 md:px-10 md:py-5 text-xs sm:text-sm md:text-base lg:text-lg font-bold rounded-xl shadow-2xl border border-white/10 transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2 translate-y-1/3 sm:translate-y-1/4"
                >
                  <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="whitespace-nowrap">KOSTENLOSES GESPRÄCH</span>
                </motion.button>
              </div>
            </div>

            {/* TRUST BADGES - UNTER DEM BUTTON */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="relative z-10 mt-10 sm:mt-12 md:mt-14 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 md:gap-3.5 text-white text-[0.7rem] sm:text-xs md:text-sm"
            >
              {/* 4.9★ Bewertung - WEISS */}
              <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-nf-red flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-bold text-gray-900 whitespace-nowrap">4.9★ Bewertung</span>
              </div>

              {/* 500+ Erfolgsgeschichten - WEISS */}
              <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-nf-red flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span className="font-bold text-gray-900 whitespace-nowrap">500+ Erfolgsgeschichten</span>
              </div>

              {/* Vertraulich & Sicher - WEISS */}
              <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-nf-red flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="font-bold text-gray-900 whitespace-nowrap">Vertraulich & Sicher</span>
              </div>
            </motion.div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default HeroSection;
