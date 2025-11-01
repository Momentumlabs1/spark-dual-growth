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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1a0000] to-[#2d0a0a] pt-24 sm:pt-28 md:pt-32 lg:pt-20 xl:pt-24 pb-8 sm:pb-10 lg:pb-10 xl:pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Hero Image Container with Text and Button Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative w-full max-w-[340px] sm:max-w-md md:max-w-lg lg:max-w-lg xl:max-w-xl mb-0 overflow-hidden rounded-2xl"
          >
            <motion.img
              src="/assets/niklas-fabienne-hero22.png"
              alt="Niklas und Fabienne - Körper & Geist Coaching"
              className="w-full h-full object-cover object-center pointer-events-none select-none"
              loading="eager"
            />

            {/* Title Overlay - positioned on their bodies */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute top-[40%] lg:top-[35%] xl:top-[36%] left-0 right-0 text-center px-4 z-10"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="text-white">KÖRPER </span>
                <span className="text-[#ff4444]">& GEIST</span>
              </h1>
              <p className="text-white text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl mt-2 sm:mt-3 font-light">
                Deine Fitness-Transformation mit
                <br />
                ganzheitlichem Online Coaching
              </p>
            </motion.div>

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
                className="pointer-events-auto w-[92%] sm:w-[86%] md:w-[80%] lg:w-[75%] xl:w-[70%] text-white px-5 py-4 sm:px-7 sm:py-5 md:px-12 md:py-6 lg:px-10 lg:py-4 xl:px-12 xl:py-5 text-sm sm:text-base md:text-lg lg:text-base xl:text-lg font-bold rounded-xl shadow-2xl border border-white/10 transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2 -translate-y-6 sm:-translate-y-7 md:-translate-y-8 lg:-translate-y-6"
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-5 lg:h-5 xl:w-5 xl:h-5 flex-shrink-0" />
                <span className="whitespace-nowrap">KOSTENLOSES GESPRÄCH</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="relative z-10 mt-4 lg:mt-2 flex flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-2 items-center justify-center w-full max-w-2xl"
          >
            <div className="bg-white text-gray-800 px-4 sm:px-6 md:px-8 lg:px-5 py-2.5 sm:py-3 md:py-4 lg:py-2.5 rounded-full flex items-center gap-1.5 sm:gap-2 shadow-lg">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4 text-[#e74c3c] fill-[#e74c3c] flex-shrink-0" />
              <span className="font-semibold text-xs sm:text-sm md:text-base lg:text-sm whitespace-nowrap">4.9★ Bewertung</span>
            </div>
            <button
              onClick={() => scrollToSection("#testimonials")}
              className="bg-[#e74c3c] text-white px-4 sm:px-6 md:px-8 lg:px-5 py-2.5 sm:py-3 md:py-4 lg:py-2.5 rounded-full flex items-center gap-1.5 sm:gap-2 shadow-lg hover:bg-[#c0392b] transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4 flex-shrink-0" />
              <span className="font-semibold text-xs sm:text-sm md:text-base lg:text-sm whitespace-nowrap">Erfolgsgeschichten</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;