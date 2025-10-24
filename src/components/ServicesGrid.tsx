import { Target, Apple, Dumbbell, Brain } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CoachingSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Target,
      title: "Professionelle Trainingspläne",
      description:
        "Individuell angepasste Trainingspläne basierend auf deinen Zielen, deinem Fitnesslevel und verfügbarer Zeit.",
      color: "from-red-400 to-pink-500",
    },
    {
      icon: Apple,
      title: "Individuelle Ernährungsberatung",
      description:
        "Maßgeschneiderte Ernährungsstrategien, die zu deinem Lifestyle passen und nachhaltige Ergebnisse liefern.",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: Dumbbell,
      title: "Persönliche Betreuung",
      description: "Regelmäßiges Feedback, Anpassungen und Motivation durch dein persönliches Coaching-Team.",
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: Brain,
      title: "Mentale Stärke",
      description:
        "Entwickle die richtige Mindset und mentale Tools für langfristigen Erfolg und persönliches Wachstum.",
      color: "from-purple-400 to-pink-500",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-8 md:py-16 px-4 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-6 md:mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3">
            Unser{" "}
            <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Coaching</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600">Vier Säulen für deinen nachhaltigen Erfolg</p>
        </div>

        {/* Grid: 1 col mobile, 2 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white rounded-xl p-5 md:p-6 shadow-md hover:shadow-2xl
                  transition-all duration-500 border border-gray-100 cursor-pointer
                  hover:-translate-y-2 md:hover:scale-[1.02]
                  ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"}`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                }}
              >
                {/* Gradient Background Overlay on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} 
                    opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}
                />

                {/* Icon */}
                <div className="relative">
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-2xl 
                      bg-gradient-to-br ${feature.color}
                      flex items-center justify-center shadow-lg
                      group-hover:scale-110 group-hover:rotate-12
                      transition-all duration-500`}
                  >
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3
                    className="text-base md:text-lg font-bold text-center mb-2 text-gray-900
                      group-hover:text-transparent group-hover:bg-clip-text 
                      group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-pink-500
                      transition-all duration-300"
                  >
                    {feature.title}
                  </h3>

                  <p className="text-xs md:text-sm text-gray-600 text-center leading-relaxed">{feature.description}</p>

                  {/* Animated Bottom Line */}
                  <div
                    className={`mt-4 h-1 bg-gradient-to-r ${feature.color} rounded-full
                      scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoachingSection;
