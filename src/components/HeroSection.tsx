import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Users, TrendingUp, Zap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section ref={containerRef} className="relative bg-black overflow-hidden min-h-screen flex items-center">
      {/* Animated Gradient Background - BEHIND Characters */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 30%, rgba(239, 68, 68, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(239, 68, 68, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0"
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_40%,transparent_100%)]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12">
        {/* Title Section */}
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-nf-red text-xs font-medium tracking-wider uppercase mb-3"
          >
            ✨ DEIN WEG ZUR BESTEN VERSION
          </motion.span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.85] mb-2">
            <span className="text-white">KÖRPER</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nf-red via-pink-500 to-pink-600">
              & GEIST
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-lg text-white/50 font-light mt-2"
          >
            Ganzheitliches Online Coaching
          </motion.p>
        </motion.div>

        {/* Characters with Layered Effects */}
        <div className="relative max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto">
          {/* Glow Effect Layer - BEHIND Characters */}
          <motion.div style={{ y: y1 }} className="absolute inset-0 -z-10">
            <div className="absolute left-1/4 top-1/2 w-64 h-64 md:w-96 md:h-96 bg-nf-red/20 rounded-full blur-[120px] animate-pulse" />
            <div
              className="absolute right-1/4 top-1/3 w-48 h-48 md:w-72 md:h-72 bg-pink-500/10 rounded-full blur-[100px] animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </motion.div>

          {/* Characters with Parallax */}
          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative"
          >
            {/* Bottom Glow - Under Characters */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-nf-red/30 via-nf-red/5 to-transparent blur-2xl" />

            {/* Characters Image - TRANSPARENT BACKGROUND SHOWS EFFECTS */}
            <img
              src="/assets/niklas-fabienne-hero22.png"
              alt="Niklas & Fabienne"
              className="w-full h-auto relative z-10 drop-shadow-2xl"
            />

            {/* Floating Stats Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, type: "spring" }}
              whileHover={{ scale: 1.05, x: -5 }}
              className="absolute left-0 md:left-4 top-[40%] md:top-[43%] bg-black/80 backdrop-blur-2xl border border-nf-red/20 rounded-2xl px-4 py-3 shadow-[0_20px_60px_-15px_rgba(239,68,68,0.4)] z-20"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nf-red to-pink-600 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white leading-none">500+</div>
                  <div className="text-[10px] text-white/50 mt-0.5">Kunden</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, type: "spring" }}
              whileHover={{ scale: 1.05, x: 5 }}
              className="absolute right-0 md:right-4 top-[36%] md:top-[40%] bg-black/80 backdrop-blur-2xl border border-yellow-500/20 rounded-2xl px-4 py-3 shadow-[0_20px_60px_-15px_rgba(234,179,8,0.4)] z-20"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                  <Star className="w-5 h-5 text-white fill-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white leading-none">4.9/5</div>
                  <div className="text-[10px] text-white/50 mt-0.5">Rating</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, type: "spring" }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-[22%] md:bottom-[25%] bg-black/80 backdrop-blur-2xl border border-green-500/20 rounded-2xl px-4 py-3 shadow-[0_20px_60px_-15px_rgba(34,197,94,0.4)] z-20"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white leading-none">95%</div>
                  <div className="text-[10px] text-white/50 mt-0.5">Erfolgsrate</div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons - Floating over feet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="absolute left-0 right-0 -bottom-8 md:-bottom-10 z-30"
            >
              <div className="flex flex-col sm:flex-row gap-3 justify-center px-2">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => scrollToSection("#booking-funnel")}
                    className="group relative overflow-hidden w-full sm:w-auto bg-gradient-to-r from-nf-red to-pink-600 hover:from-nf-red/90 hover:to-pink-500 text-white px-8 py-5 text-sm font-bold rounded-xl shadow-[0_20px_60px_-15px_rgba(239,68,68,0.6)] border border-nf-red/20"
                    size="lg"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4" />
                      KOSTENLOSES GESPRÄCH
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-nf-red opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => scrollToSection("#testimonials")}
                    variant="outline"
                    className="w-full sm:w-auto bg-white/5 backdrop-blur-xl border-2 border-white/30 text-white hover:bg-white hover:text-black px-8 py-5 text-sm font-bold rounded-xl transition-all duration-300"
                    size="lg"
                  >
                    <Award className="w-4 h-4 mr-2" />
                    ERFOLGE ANSEHEN
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Trust Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="flex items-center justify-center gap-2 mt-20 md:mt-24 text-white/30 text-xs"
        >
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            ))}
          </div>
          <span>von 500+ Kunden</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
