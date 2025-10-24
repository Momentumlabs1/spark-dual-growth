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

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const stats = [
    { icon: Users, value: "500+", label: "Kunden", color: "from-red-500 to-pink-600" },
    { icon: Star, value: "4.9/5", label: "Rating", color: "from-yellow-500 to-orange-500" },
    { icon: TrendingUp, value: "95%", label: "Erfolgsrate", color: "from-green-500 to-emerald-600" },
  ];

  return (
    <section ref={containerRef} className="relative bg-black min-h-screen flex items-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-nf-red/5 via-transparent to-transparent opacity-50" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12">
        {/* Header Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <span className="inline-block text-nf-red text-xs font-medium tracking-wider uppercase mb-4">
            ✨ DEIN WEG ZUR BESTEN VERSION
          </span>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.85] mb-3">
            <span className="text-white">KÖRPER</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nf-red via-pink-500 to-pink-600">
              & GEIST
            </span>
          </h1>

          <p className="text-base md:text-lg text-white/60 font-light">Ganzheitliches Online Coaching</p>
        </motion.div>

        {/* Main Content - Bento Grid Layout */}
        <div className="grid md:grid-cols-12 gap-4 md:gap-6 max-w-6xl mx-auto">
          {/* LEFT: Stats Grid */}
          <div className="md:col-span-4 flex flex-col gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* CENTER/RIGHT: Characters Image */}
          <motion.div
            style={{ y }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="md:col-span-8"
          >
            <div className="relative">
              {/* Subtle glow behind */}
              <div className="absolute inset-0 bg-gradient-to-t from-nf-red/20 via-transparent to-transparent blur-3xl" />

              <img
                src="/assets/niklas-fabienne-hero22.png"
                alt="Niklas & Fabienne"
                className="relative z-10 w-full h-auto"
              />
            </div>
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8 max-w-2xl mx-auto"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => scrollToSection("#booking-funnel")}
              className="w-full sm:w-auto bg-nf-red hover:bg-nf-red/90 text-white px-8 py-6 text-sm md:text-base font-bold rounded-xl shadow-lg"
              size="lg"
            >
              <Zap className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              KOSTENLOSES GESPRÄCH
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => scrollToSection("#testimonials")}
              variant="outline"
              className="w-full sm:w-auto bg-white/5 border-2 border-white/20 text-white hover:bg-white hover:text-black px-8 py-6 text-sm md:text-base font-bold rounded-xl"
              size="lg"
            >
              <Award className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              ERFOLGE ANSEHEN
            </Button>
          </motion.div>
        </motion.div>

        {/* Trust Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex items-center justify-center gap-2 mt-6 text-white/30 text-xs"
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
