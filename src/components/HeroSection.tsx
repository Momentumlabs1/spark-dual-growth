import { motion } from "framer-motion";
import { Star, Zap, CheckCircle } from "lucide-react";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#1a0000] to-[#2d0a0a] pt-52 sm:pt-56 md:pt-60 lg:pt-64 pb-12 sm:pb-16 md:pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6 sm:mb-8 md:mb-10 relative z-10"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-white">KÖRPER </span>
              <span className="text-[#e74c3c]">& GEIST</span>
            </h1>
            <p className="text-white text-lg sm:text-xl md:text-2xl mt-4 sm:mt-6 font-light">
              Deine Fitness-Transformation mit
              <br className="hidden sm:block" />
              ganzheitlichem Online Coaching
            </p>
          </motion.div>

          {/* Hero Image Container with Button Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mb-6 sm:mb-8 overflow-hidden rounded-2xl"
          >
            <motion.img
              src="/assets/niklas-fabienne-hero22.png"
              alt="Niklas und Fabienne - Körper & Geist Coaching"
              className="w-full h-full object-cover object-[center_20%] pointer-events-none select-none"
              loading="eager"
            />

            {/* Button Overlay - overlaps bottom of image */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center">
              <motion.button
                onClick={() => scrollToSection("#booking-funnel")}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ backgroundColor: "rgb(220, 38, 38)" }}
                className="pointer-events-auto w-[92%] sm:w-[86%] md:w-[80%] text-white px-4 py-3.5 sm:px-6 sm:py-4 md:px-10 md:py-5 text-xs sm:text-sm md:text-base lg:text-lg font-bold rounded-xl shadow-2xl border border-white/10 transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2 -translate-y-6 sm:-translate-y-7 md:-translate-y-8"
              >
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                <span className="whitespace-nowrap">KOSTENLOSES GESPRÄCH</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="relative z-10 mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center w-full max-w-2xl"
          >
            <div className="bg-white text-gray-800 px-6 sm:px-8 py-3 sm:py-4 rounded-full flex items-center gap-2 shadow-lg">
              <Star className="w-5 h-5 text-[#e74c3c] fill-[#e74c3c]" />
              <span className="font-semibold text-sm sm:text-base">4.9★ Bewertung</span>
            </div>
            <button
              onClick={() => scrollToSection("#testimonials")}
              className="bg-[#e74c3c] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full flex items-center gap-2 shadow-lg hover:bg-[#c0392b] transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold text-sm sm:text-base">Unzählige Erfolgsgeschichten</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
