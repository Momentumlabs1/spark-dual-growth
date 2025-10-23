import { motion } from "framer-motion";
import { Star, Users, TrendingUp, Zap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const stats = [
    { icon: Users, label: "Kunden", value: "500+" },
    { icon: Star, label: "Rating", value: "4.9/5" },
    { icon: TrendingUp, label: "Erfolgsrate", value: "95%" },
  ];

  return (
    <section className="relative bg-gradient-to-b from-nf-black via-nf-black to-nf-red/10 pt-24 pb-16 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nf-red/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="inline-flex items-center gap-2 bg-nf-red/10 border border-nf-red/20 text-nf-red px-4 py-2 rounded-full text-sm font-medium">
              ✨ Dein Weg zur besten Version
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-nf-white mb-4">
              KÖRPER <span className="text-nf-red">& GEIST</span>
            </h1>
            <p className="text-xl md:text-2xl text-nf-white/80 mb-2">
              Ganzheitliches Online Coaching für deine Transformation.
            </p>
            <p className="text-lg text-nf-white/60">Körper. Mindset. Lifestyle.</p>
          </motion.div>

          {/* Hero Image - Niklas & Fabienne */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-w-2xl mx-auto"
          >
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-t from-nf-red/30 via-transparent to-transparent blur-3xl" />

            <img
              src="/assets/niklas-fabienne-hero.png"
              alt="Niklas und Fabienne"
              className="relative z-10 w-full h-auto"
            />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-nf-black/50 backdrop-blur-sm border border-nf-white/10 rounded-xl p-4 hover:border-nf-red/30 transition-all"
              >
                <stat.icon className="w-6 h-6 text-nf-red mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-nf-white mb-1">{stat.value}</div>
                <div className="text-sm text-nf-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => scrollToSection("#booking-funnel")}
              className="bg-nf-red hover:bg-nf-red/90 text-white px-8 py-6 text-lg font-bold rounded-lg shadow-lg hover:shadow-nf-red/50 transition-all"
              size="lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              KOSTENLOSES GESPRÄCH
            </Button>
            <Button
              onClick={() => scrollToSection("#testimonials")}
              variant="outline"
              className="border-2 border-nf-white/20 text-nf-white hover:bg-nf-white hover:text-nf-black px-8 py-6 text-lg font-bold rounded-lg transition-all"
              size="lg"
            >
              <Award className="w-5 h-5 mr-2" />
              ERFOLGE ANSEHEN
            </Button>
          </motion.div>

          {/* Trust Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-6 text-nf-white/60 text-sm pt-6"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-nf-red to-pink-600 border-2 border-nf-black"
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
    </section>
  );
};

export default HeroSection;
