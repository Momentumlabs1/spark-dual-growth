import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Star, Users, TrendingUp, Sparkles, Zap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Mouse parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set((e.clientX - centerX) / 25);
      mouseY.set((e.clientY - centerY) / 25);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const stats = [
    { icon: Users, label: "Kunden", value: "500+", color: "from-blue-500 to-cyan-500" },
    { icon: Star, label: "Rating", value: "4.9/5", color: "from-yellow-500 to-orange-500" },
    { icon: TrendingUp, label: "Erfolgsrate", value: "95%", color: "from-green-500 to-emerald-500" },
  ];

  const floatingIcons = [
    { Icon: Sparkles, delay: 0, duration: 3 },
    { Icon: Zap, delay: 0.5, duration: 2.5 },
    { Icon: Award, delay: 1, duration: 3.5 },
  ];

  return (
    <section ref={heroRef} className="relative bg-nf-black overflow-hidden pt-20 pb-16 md:pt-24 md:pb-20">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(239, 68, 68, 0.2) 0%, transparent 50%)`,
            backgroundSize: "200% 200%",
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_40%,transparent_100%)]" />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map(({ Icon, delay, duration }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: [0, 0.3, 0],
              y: [-20, -80],
              x: [0, i % 2 === 0 ? 30 : -30],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="absolute text-nf-red/20"
            style={{
              left: `${20 + i * 30}%`,
              top: "60%",
            }}
          >
            <Icon className="w-12 h-12 md:w-16 md:h-16" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Image with 3D Effect */}
          <motion.div
            style={{ x, y }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            {/* Glow Effect behind image */}
            <div className="absolute inset-0 bg-gradient-to-r from-nf-red/30 to-pink-500/30 blur-3xl opacity-50 animate-pulse" />

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              <img
                src="/assets/hero-image.png"
                alt="Niklas & Fabienne"
                className="relative z-10 w-full h-auto rounded-2xl shadow-2xl border border-nf-red/20"
              />

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-nf-red to-pink-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 font-bold text-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Top Rated</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2 space-y-6 md:space-y-8">
            {/* Animated Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-block"
              >
                <span className="bg-gradient-to-r from-nf-red via-pink-500 to-nf-red bg-clip-text text-transparent font-bold text-lg md:text-xl animate-gradient bg-[length:200%_auto]">
                  ✨ Dein Weg zur besten Version
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-nf-white leading-tight">
                KÖRPER{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-nf-red to-pink-500 inline-block animate-gradient bg-[length:200%_auto]">
                  & GEIST
                </span>
              </h1>

              <p className="text-lg md:text-xl text-nf-white/80 max-w-xl">
                Ganzheitliches Online Coaching für deine Transformation.
                <span className="block mt-2 text-nf-white/60">Körper. Mindset. Lifestyle.</span>
              </p>
            </motion.div>

            {/* Stats Cards - Bento Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-3 md:gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-nf-red/20 to-pink-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />

                  <div className="relative bg-nf-black/50 backdrop-blur-sm border border-nf-white/10 rounded-xl p-4 hover:border-nf-red/50 transition-all">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}
                    >
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-nf-white mb-1">{stat.value}</div>
                    <div className="text-xs md:text-sm text-nf-white/60">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons - Magnetic Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-nf-red to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200 animate-pulse" />
                <Button
                  onClick={() => scrollToSection("#booking-funnel")}
                  className="relative w-full sm:w-auto bg-gradient-to-r from-nf-red to-pink-600 hover:from-nf-red/90 hover:to-pink-500 text-white px-8 py-6 text-lg font-bold rounded-lg shadow-lg"
                  size="lg"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  KOSTENLOSES GESPRÄCH
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => scrollToSection("#testimonials")}
                  variant="outline"
                  className="w-full sm:w-auto bg-nf-white/5 backdrop-blur-sm border-2 border-nf-white/20 text-nf-white hover:bg-nf-white hover:text-nf-black px-8 py-6 text-lg font-bold rounded-lg"
                  size="lg"
                >
                  <Award className="w-5 h-5 mr-2" />
                  ERFOLGE ANSEHEN
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-6 text-nf-white/60 text-sm pt-4 border-t border-nf-white/10"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-nf-red to-pink-500 border-2 border-nf-black"
                    />
                  ))}
                </div>
                <span>500+ zufriedene Kunden</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Custom CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
