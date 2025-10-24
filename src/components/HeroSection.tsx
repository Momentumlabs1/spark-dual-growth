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

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center"
    >
      {/* Subtle red glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-nf-red/5" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20">
        {/* Floating Title Above Characters */}
        <motion.div
          style={{ y: titleY, opacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-nf-red text-sm font-medium tracking-wider uppercase mb-4"
          >
            ✨ Dein Weg zur besten Version
          </motion.span>

          <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold leading-none">
            <span className="text-white">KÖRPER</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nf-red to-pink-500">& GEIST</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/60 mt-6 font-light"
          >
            Ganzheitliches Online Coaching
          </motion.p>
        </motion.div>

        {/* Characters Image */}
        <motion.div
          style={{ y: imageY }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-5xl mx-auto mb-0"
        >
          {/* Subtle glow under characters */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-nf-red/10 blur-[100px]" />

          <img
            src="/assets/niklas-fabienne-hero22.png"
            alt="Niklas & Fabienne"
            className="relative z-10 w-full h-auto"
          />

          {/* Floating Stats - Positioned around characters */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute left-8 md:left-16 top-1/4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-nf-red flex-shrink-0" />
              <div>
                <div className="text-3xl font-bold text-white leading-none mb-1">500+</div>
                <div className="text-xs text-white/50">Kunden</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute right-8 md:right-16 top-1/3 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-500 flex-shrink-0" />
              <div>
                <div className="text-3xl font-bold text-white leading-none mb-1">4.9/5</div>
                <div className="text-xs text-white/50">Rating</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-8 md:bottom-12 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-500 flex-shrink-0" />
              <div>
                <div className="text-3xl font-bold text-white leading-none mb-1">95%</div>
                <div className="text-xs text-white/50">Erfolgsrate</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Buttons - Overlapping bottom of image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative -mt-20 z-30 flex flex-col sm:flex-row gap-4 justify-center px-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
            <Button
              onClick={() => scrollToSection("#booking-funnel")}
              className="group relative overflow-hidden bg-nf-red hover:bg-nf-red/90 text-white px-10 py-7 text-lg font-bold rounded-xl shadow-[0_20px_60px_-15px_rgba(239,68,68,0.6)] transition-all duration-300"
              size="lg"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                KOSTENLOSES GESPRÄCH
              </span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
            <Button
              onClick={() => scrollToSection("#testimonials")}
              variant="outline"
              className="bg-white/5 backdrop-blur-xl border-2 border-white/20 text-white hover:bg-white hover:text-black px-10 py-7 text-lg font-bold rounded-xl transition-all duration-300"
              size="lg"
            >
              <Award className="w-5 h-5 mr-2" />
              ERFOLGE ANSEHEN
            </Button>
          </motion.div>
        </motion.div>

        {/* Minimal Trust Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="flex items-center justify-center gap-2 mt-8 text-white/30 text-sm"
        >
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            ))}
          </div>
          <span>von 500+ Kunden</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
