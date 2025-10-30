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
      className="relative bg-black overflow-hidden pt-32 sm:pt-36 md:pt-40 pb-14 sm:pb-16 md:pb-20"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-nf-red/8 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* HERO CONTAINER - zentriert */}
        <div className="relative mx-auto mb-6 sm:mb-8 w-[88%] sm:w-[85%] max-w-md md:max-w-lg">
          <motion.div
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

            {/* BILD CONTAINER */}
            <div className="relative w-full">
              {/* PARALLAX NUR HIER AUF DEM BILD! */}
              <motion.div
                style={{ y }}
                className="relative rounded-2xl overflow-hidden h-[50vh] sm:h-[56vh] md:h-[60vh] lg:h-[64vh]"
              >
                <img
                  src="/assets/niklas-fabienne-hero22.png"
                  alt="Niklas & Fabienne"
                  className="w-full h-full object-contain md:object-cover object-top md:object-[center_20%] pointer-events-none select-none"
                  loading="eager"
                  fetchPriority="high"
                />

                {/* TEXT - EIN H1 mit Spans für richtige Zentrierung */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
                  className="absolute top-1/2 left-0 right-0 -translate-y-1/2 text-center px-4"
                >
                  <div className="text-center">
                    <h1 className="font-black tracking-tight leading-none text-[1.8rem] sm:text-4xl md:text-5xl lg:text-6xl">
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
                      className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl text-white/95 font-light"
                      style={{
                        textShadow: "0 2px 12px rgba(0,0,0,.95)",
                      }}
                    >
                      Ganzheitliches Online Coaching
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* BUTTON + TRUST BADGES ZUSAMMEN IN EINEM CONTAINER! */}
              <div className="mt-5 sm:mt-6 md:mt-7 space-y-4 sm:space-y-5">
                {/* BUTTON */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <motion.button
                    onClick={() => scrollToSection("#booking-funnel")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ backgroundColor: "rgb(220, 38, 38)" }}
                    className="w-full text-white px-5 py-4 sm:px-6 sm:py-4.5 md:px-10 md:py-5 text-sm sm:text-base md:text-lg lg:text-xl font-bold rounded-xl shadow-2xl border border-white/10 transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
                    <span className="whitespace-nowrap">KOSTENLOSES GESPRÄCH</span>
                  </motion.button>
                </motion.div>

                {/* TRUST BADGES - NUR FADE IN, KEIN translateY! */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 md:gap-4 text-white/90 text-[0.7rem] sm:text-xs md:text-sm max-w-2xl mx-auto"
                >
                  {/* 4.9/5 Rating */}
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-black/70 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-nf-red/40">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-nf-red" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold">4.9/5</span>
                  </div>

                  {/* 500+ Kunden */}
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-black/70 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-nf-red/40">
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-nf-red"
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

                  {/* 100% Diskret */}
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-black/70 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-nf-red/40">
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-nf-red"
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
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
