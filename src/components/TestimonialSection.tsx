import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Star, X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from "recharts";

interface Testimonial {
  id: string;
  name: string;
  age: number;
  avatar: string;
  useGenericAvatar: boolean;
  rating: 5;
  badge: string;
  goal: "weightLoss" | "muscleGain"; // NEW: Goal type for color coding
  shortQuote: string;
  fullQuote: string;
  weightLoss: {
    startWeight: number;
    endWeight: number;
    totalLoss: number;
    weeks: number;
    chartData: Array<{ week: number; weight: number }>;
  };
  images: {
    before: string[];
    after: string[];
  };
}

const VIEW_LABELS = ["Vorne", "Seite", "Hinten"];

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Lisa S.",
    age: 32,
    avatar: "/assets/INFO.jpg",
    useGenericAvatar: false,
    rating: 5,
    badge: "13 kg abgenommen",
    goal: "weightLoss",
    shortQuote: "Von 'nur funktionieren' zu wirklich leben - mental, körperlich, emotional.",
    fullQuote:
      "Ich war überfordert, skeptisch und gestresst. Aber ich habe mich entschieden, mich selbst nicht mehr im Weg zu stehen. Mit Niklas und Fabienne habe ich von 88 kg auf 75 kg abgenommen – aber vor allem: Ich habe klaren Kopf statt Dauer-Frust, Energie statt Erschöpfung, und einen Wohlfühlkörper ohne Verzicht und Verbote bekommen.",
    weightLoss: {
      startWeight: 88.1,
      endWeight: 74.9,
      totalLoss: 13.2,
      weeks: 16,
      chartData: [
        { week: 0, weight: 88.1 },
        { week: 4, weight: 84.5 },
        { week: 8, weight: 81.2 },
        { week: 12, weight: 77.8 },
        { week: 16, weight: 74.9 },
      ],
    },
    images: {
      before: ["/assets/lisa-before-front.png", "/assets/lisa-before-side.png", "/assets/lisa-before-back.png"],
      after: ["/assets/lisa-after-front.png", "/assets/lisa-after-side.png", "/assets/lisa-after-back.png"],
    },
  },
  {
    id: "2",
    name: "Lara M.",
    age: 28,
    avatar: "/assets/lara-avatar.jpg",
    useGenericAvatar: true,
    rating: 5,
    badge: "13 kg abgenommen",
    goal: "weightLoss",
    shortQuote: "Endlich wieder selbstbewusst und voller Energie!",
    fullQuote:
      "Nach der Schwangerschaft fühlte ich mich in meinem Körper nicht mehr wohl. Mit dem Team-Coaching habe ich nicht nur 13 kg abgenommen, sondern auch meine Lebensfreude wiedergefunden. Ich bin stolz auf mich!",
    weightLoss: {
      startWeight: 90,
      endWeight: 77,
      totalLoss: 13,
      weeks: 12,
      chartData: [
        { week: 0, weight: 90 },
        { week: 4, weight: 85 },
        { week: 8, weight: 81 },
        { week: 12, weight: 77 },
      ],
    },
    images: {
      before: ["/assets/lara-vorne-alt.png", "/assets/lara-seite-alt.png", "/assets/lara-hinten-alt.png"],
      after: ["/assets/lara-vorne-neu.png", "/assets/lara-seite-neu.png", "/assets/lara-hinten-neu.png"],
    },
  },
  {
    id: "3",
    name: "Tanja K.",
    age: 35,
    avatar: "/assets/tanja-avatar.jpg",
    useGenericAvatar: true,
    rating: 5,
    badge: "4 kg abgenommen",
    goal: "weightLoss",
    shortQuote: "Mein Leben hat sich komplett verändert!",
    fullQuote:
      "Ich hatte schon so viele Diäten probiert, aber nichts hat nachhaltig funktioniert. Mit Niklas und Fabienne habe ich endlich verstanden, wie Ernährung wirklich funktioniert. Ich fühle mich großartig und bin auf dem besten Weg zu meinem Ziel!",
    weightLoss: {
      startWeight: 62.3,
      endWeight: 58.2,
      totalLoss: 4.1,
      weeks: 16,
      chartData: [
        { week: 0, weight: 62.3 },
        { week: 4, weight: 61 },
        { week: 8, weight: 60 },
        { week: 12, weight: 59 },
        { week: 16, weight: 58.2 },
      ],
    },
    images: {
      before: ["/assets/tanja-vorne-alt.png", "/assets/tanja-seite-alt.png", "/assets/tanja-hinten-alt.png"],
      after: ["/assets/tanja-vorne-neu.png", "/assets/tanja-seite-neu.png", "/assets/tanja-hinten-neu.png"],
    },
  },
  {
    id: "4",
    name: "Sarah L.",
    age: 30,
    avatar: "/assets/sarah-avatar.jpg",
    useGenericAvatar: true,
    rating: 5,
    badge: "11 kg abgenommen",
    goal: "weightLoss",
    shortQuote: "Ich habe meine Traumfigur erreicht!",
    fullQuote:
      "Das Coaching war genau das, was ich gebraucht habe. Die Kombination aus persönlicher Betreuung und flexibler Ernährung hat perfekt funktioniert. 11 kg weniger und ich fühle mich so gut wie noch nie!",
    weightLoss: {
      startWeight: 75,
      endWeight: 64,
      totalLoss: 11,
      weeks: 15,
      chartData: [
        { week: 0, weight: 75 },
        { week: 5, weight: 71 },
        { week: 10, weight: 67 },
        { week: 15, weight: 64 },
      ],
    },
    images: {
      before: ["/assets/sarah-vorne-alt.png", "/assets/sarah-seite-alt.png", "/assets/sarah-hinten-alt.png"],
      after: ["/assets/sarah-vorne-neu.png", "/assets/sarah-seite-neu.png.png", "/assets/sarah-hinten-neu.png"],
    },
  },
  {
    id: "5",
    name: "David M.",
    age: 29,
    avatar: "/assets/david-avatar.jpg",
    useGenericAvatar: true,
    rating: 5,
    badge: "10 kg Muskeln aufgebaut",
    goal: "muscleGain",
    shortQuote: "Körperlich wie mental ein völlig neuer Mensch! 💪",
    fullQuote:
      "In nur 15 Monaten Coaching habe ich mehr verändert als in 5 Jahren alleine. Mit dem Wunsch 'fitter zu werden' gestartet - heute stehe ich mit 102,5 Kilo Muskelmasse vor dem Spiegel. Kein Gramm ist Zufall, sondern durchdachter Muskelaufbau mit System. Fitness ist für mich kein Ziel mehr, sondern Alltag. Ich gehe heute mit einem Selbstbewusstsein durchs Leben, das spürbar ist.",
    weightLoss: {
      startWeight: 89,
      endWeight: 99,
      totalLoss: -10,
      weeks: 30,
      chartData: [
        { week: 0, weight: 89 },
        { week: 6, weight: 91 },
        { week: 12, weight: 93 },
        { week: 18, weight: 95 },
        { week: 24, weight: 97 },
        { week: 30, weight: 99 },
      ],
    },
    images: {
      before: ["/assets/2david-vorne-alt.png", "/assets/4david-seite-alt.png", "/assets/6david-hinten-alt.png"],
      after: ["/assets/1david-vorne-neu.png", "/assets/3david-seite-neu.png", "/assets/5david-hinten-neu.png"],
    },
  },
  {
    id: "6",
    name: "Marco T.",
    age: 33,
    avatar: "/assets/marco-avatar.jpg",
    useGenericAvatar: true,
    rating: 5,
    badge: "16 kg abgenommen",
    goal: "weightLoss",
    shortQuote: "Stick to the plan! 💪",
    fullQuote:
      "Ich habe schon mal ein wenig abgenommen, aber das Gewicht war dann meist auch schnell wieder da. Ich habe also nach einem nachhaltigen Weg gesucht, dauerhaft abzunehmen und das gewünschte Gewicht zu halten. Ich habe im März mit diesem Programm angefangen und kann es nach anfänglicher Skepsis beruhigt weiterempfehlen. Der Plan für die Ernährung lässt sich super in den Alltag integrieren und die Gerichteauswahl ist sehr vielfältig. Der Sportplan funktioniert für mich auch super. Top Coach, Top Pläne, Top App!",
    weightLoss: {
      startWeight: 98,
      endWeight: 82,
      totalLoss: 16,
      weeks: 22,
      chartData: [
        { week: 0, weight: 98 },
        { week: 6, weight: 93 },
        { week: 12, weight: 88 },
        { week: 18, weight: 85 },
        { week: 22, weight: 82 },
      ],
    },
    images: {
      before: ["/assets/marco-vorne-alt.png", "/assets/marco-seite-alt.png", "/assets/marco-hinten-alt.png"],
      after: ["/assets/marco-vorne-neu.png", "/assets/marco-seite-neu.png", "/assets/marco-hinten-neu.png"],
    },
  },
  {
    id: "7",
    name: "Alex F.",
    age: 26,
    avatar: "/assets/alex-avatar.jpg",
    useGenericAvatar: true,
    rating: 5,
    badge: "12 kg abgenommen",
    goal: "weightLoss",
    shortQuote: "Anfangs war ich skeptisch - jetzt bin ich überzeugt! 💪",
    fullQuote:
      "Ich hatte jahrelang Erfahrung im Krafttraining, Boxen und Fußball. Motivation war nie mein Problem, aber bei der Ernährung hat immer der letzte Feinschliff gefehlt. Mit dem Coaching hat sich das komplett verändert. Kein Druck, kein Zwang, sondern Struktur, ehrliche Unterstützung und alltagstaugliche Tipps. In 4 Monaten 12 Kilo abgenommen - und das ganz ohne Verzicht, sondern mit einem Plan, der zu meinem Leben passt.",
    weightLoss: {
      startWeight: 97.4,
      endWeight: 85.4,
      totalLoss: 12,
      weeks: 16,
      chartData: [
        { week: 0, weight: 97.4 },
        { week: 4, weight: 94 },
        { week: 8, weight: 90 },
        { week: 12, weight: 87 },
        { week: 16, weight: 85.4 },
      ],
    },
    images: {
      before: ["/assets/2alex-vorne-alt.png", "/assets/4alex-seite-alt.png", "/assets/6alex-hinten-alt.png"],
      after: ["/assets/1alex-vorne-neu.png", "/assets/3alex-seite-neu.png", "/assets/5alex-hinten-neu.png"],
    },
  },
  {
    id: "8",
    name: "Tahsin K.",
    age: 27,
    avatar: "/assets/tahsin-avatar.jpg",
    useGenericAvatar: true,
    rating: 5,
    badge: "9 kg abgenommen",
    goal: "weightLoss",
    shortQuote: "Das Coaching war der Schlüssel zum Erfolg!",
    fullQuote:
      "Meine Geschichte: Es ist nicht deine Frau, Freundin, die Familie oder der Freundeskreis der aus einem das macht was man sich erarbeitet. Sondern du selbst... Das Leben hat mich erst vor kurzem zu Boden geworfen, aber ich habe nicht den Mut und die Kraft verloren trotz alle dem an mich zu glauben und weiter zu machen. Das Coaching von und mit Niklas war für mich der Schlüssel zum Erfolg! Mit Nik an meiner Seite habe ich das geschafft worauf ich schon lange hingearbeitet habe.",
    weightLoss: {
      startWeight: 83.4,
      endWeight: 74.7,
      totalLoss: 8.7,
      weeks: 12,
      chartData: [
        { week: 0, weight: 83.4 },
        { week: 3, weight: 80 },
        { week: 6, weight: 78 },
        { week: 9, weight: 76 },
        { week: 12, weight: 74.7 },
      ],
    },
    images: {
      before: ["/assets/tahsin-vorne-alt.png", "/assets/tahsin-seite-alt.png", "/assets/tahsin-hinten-alt.png"],
      after: ["/assets/tahsin-vorne-neu.png", "/assets/tahsin-seite-neu.png", "/assets/tahsin-hinten-neu.png"],
    },
  },
  {
    id: "9",
    name: "Florian J.",
    age: 29,
    avatar: "/assets/florian-avatar.jpg",
    useGenericAvatar: true,
    rating: 5,
    badge: "12 kg Muskeln aufgebaut",
    goal: "muscleGain",
    shortQuote: "Aktuell in meiner besten Form! 💪",
    fullQuote:
      "War über ein Jahr bei Niklas im Coaching. Wir haben zusammen viel erreicht, was mir davor alleine über Jahre nicht gelungen war. Aktuell beste Form! Top Coach, Top Pläne, Top App.",
    weightLoss: {
      startWeight: 80,
      endWeight: 92,
      totalLoss: -12,
      weeks: 52,
      chartData: [
        { week: 0, weight: 80 },
        { week: 12, weight: 83 },
        { week: 24, weight: 86 },
        { week: 36, weight: 89 },
        { week: 52, weight: 92 },
      ],
    },
    images: {
      before: ["/assets/2flo-vorne-alt.png", "/assets/4flo-seite-alt.png", "/assets/6flo-hinten-alt.png"],
      after: ["/assets/1flo-vorne-neu.png", "/assets/3flo-seite-neu.png", "/assets/5flo-hinten-neu.png"],
    },
  },
];

const TestimonialSection = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  const [allImagesPreloaded, setAllImagesPreloaded] = useState(false);

  // Preload ALL images on component mount
  useEffect(() => {
    const allImages: string[] = [];
    testimonials.forEach((t) => {
      allImages.push(...t.images.before, ...t.images.after);
    });

    allImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Preload all images when modal opens
  useEffect(() => {
    if (selectedTestimonial) {
      setAllImagesPreloaded(false);
      const imagesToPreload = [...selectedTestimonial.images.before, ...selectedTestimonial.images.after];

      let loadedCount = 0;
      const totalImages = imagesToPreload.length;

      imagesToPreload.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setAllImagesPreloaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setAllImagesPreloaded(true);
          }
        };
      });

      // Timeout fallback
      setTimeout(() => setAllImagesPreloaded(true), 3000);
    }
  }, [selectedTestimonial]);

  // Track loading for current image pair
  useEffect(() => {
    if (selectedTestimonial && allImagesPreloaded) {
      setImagesLoaded({ [currentImageIndex]: true });
    }
  }, [currentImageIndex, selectedTestimonial, allImagesPreloaded]);

  const handleCardClick = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setCurrentImageIndex(0);
    setImagesLoaded({});
  };

  const closeModal = () => {
    setSelectedTestimonial(null);
    setImagesLoaded({});
    setAllImagesPreloaded(false);
  };

  const nextImage = () => {
    if (selectedTestimonial && allImagesPreloaded) {
      setCurrentImageIndex((prev) => (prev + 1) % 3);
    }
  };

  const prevImage = () => {
    if (selectedTestimonial && allImagesPreloaded) {
      setCurrentImageIndex((prev) => (prev - 1 + 3) % 3);
    }
  };

  const handleImageIndexChange = (index: number) => {
    if (allImagesPreloaded) {
      setCurrentImageIndex(index);
    }
  };

  const GenericAvatar = () => (
    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500/20 to-gray-900/20 flex items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-red-500/30 flex items-center justify-center">
        <span className="text-3xl font-bold text-gray-900">?</span>
      </div>
    </div>
  );

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Was unsere <span className="text-red-600">Kunden</span> sagen
          </h2>
          <p className="text-lg md:text-xl text-gray-600">Echte Ergebnisse von echten Menschen</p>
        </motion.div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              onClick={() => handleCardClick(testimonial)}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-gray-100 hover:border-red-300"
            >
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                {testimonial.useGenericAvatar ? (
                  <GenericAvatar />
                ) : (
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-red-100">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement!.innerHTML =
                          '<div class="w-full h-full bg-gradient-to-br from-red-500/20 to-gray-900/20 flex items-center justify-center"><span class="text-3xl font-bold text-gray-900">?</span></div>';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{testimonial.name}</h3>

              {/* Badge */}
              <div className="flex justify-center mb-4">
                <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-semibold">
                  {testimonial.badge}
                </span>
              </div>

              {/* Short Quote */}
              <p className="text-gray-600 text-center text-sm mb-4 line-clamp-2">"{testimonial.shortQuote}"</p>

              {/* CTA */}
              <div className="text-center">
                <button className="text-red-600 hover:text-red-700 text-sm font-semibold transition-colors">
                  Klicken für Details →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-20"
        >
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Willst du auch so eine Transformation?
            </h3>
            <p className="text-xl md:text-2xl text-red-50 mb-8 max-w-2xl mx-auto">
              Starte jetzt deine Reise zu deinem Traumkörper – genauso wie unsere 500+ erfolgreichen Kunden!
            </p>
            <button
              onClick={() => (window.location.href = "/#contact")}
              className="bg-white text-red-600 px-10 py-4 rounded-full text-lg md:text-xl font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              Jetzt starten! 🔥
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedTestimonial && (
          <Dialog open={!!selectedTestimonial} onOpenChange={closeModal}>
            <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto p-0">
              <div className="relative bg-white rounded-2xl">
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="p-8">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                      {selectedTestimonial.useGenericAvatar ? (
                        <GenericAvatar />
                      ) : (
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-red-100">
                          <img
                            src={selectedTestimonial.avatar}
                            alt={selectedTestimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedTestimonial.name}, {selectedTestimonial.age}
                    </h3>

                    <div className="flex justify-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    <span className="inline-block bg-red-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                      {selectedTestimonial.badge}
                    </span>
                  </div>

                  {/* Loading State */}
                  {!allImagesPreloaded && (
                    <div className="flex flex-col items-center justify-center py-20">
                      <Loader2 className="h-12 w-12 animate-spin text-red-600 mb-4" />
                      <p className="text-gray-600">Bilder werden geladen...</p>
                    </div>
                  )}

                  {/* Content - Only show when images are loaded */}
                  {allImagesPreloaded && (
                    <>
                      {/* CONTEXT SECTION - Shows Journey */}
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Die Transformation</h3>
                        <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Ausgangssituation */}
                            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                📍 Ausgangssituation
                              </div>
                              <div className="text-4xl font-bold text-gray-900 mb-2">
                                {selectedTestimonial.weightLoss.startWeight} kg
                              </div>
                              <div className="text-sm text-gray-600">{selectedTestimonial.age} Jahre alt</div>
                            </div>

                            {/* Das Ziel */}
                            <div
                              className={`text-center p-4 rounded-xl shadow-sm ${
                                selectedTestimonial.goal === "muscleGain"
                                  ? "bg-blue-50 border-2 border-blue-200"
                                  : "bg-red-50 border-2 border-red-200"
                              }`}
                            >
                              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                🎯 Das Ziel
                              </div>
                              <div
                                className={`text-3xl font-bold mb-2 ${
                                  selectedTestimonial.goal === "muscleGain" ? "text-blue-600" : "text-red-600"
                                }`}
                              >
                                {selectedTestimonial.goal === "muscleGain" ? "Muskelaufbau 💪" : "Abnehmen 🔥"}
                              </div>
                              <div className="text-sm text-gray-700 font-medium">
                                {selectedTestimonial.weightLoss.weeks} Wochen Coaching
                              </div>
                            </div>

                            {/* Das Ergebnis */}
                            <div
                              className={`text-center p-4 rounded-xl shadow-sm ${
                                selectedTestimonial.goal === "muscleGain"
                                  ? "bg-blue-50 border-2 border-blue-300"
                                  : "bg-red-50 border-2 border-red-300"
                              }`}
                            >
                              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                ✨ Das Ergebnis
                              </div>
                              <div
                                className={`text-4xl font-bold mb-2 ${
                                  selectedTestimonial.goal === "muscleGain" ? "text-blue-600" : "text-red-600"
                                }`}
                              >
                                {selectedTestimonial.weightLoss.endWeight} kg
                              </div>
                              <div
                                className={`text-sm font-bold ${
                                  selectedTestimonial.goal === "muscleGain" ? "text-blue-700" : "text-red-700"
                                }`}
                              >
                                {selectedTestimonial.goal === "muscleGain" ? "+" : ""}
                                {Math.abs(selectedTestimonial.weightLoss.totalLoss)} kg Transformation!
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quote */}
                      <div className="mb-8 bg-gray-50 rounded-xl p-6">
                        <p className="text-lg text-gray-700 italic leading-relaxed text-center">
                          "{selectedTestimonial.fullQuote}"
                        </p>
                      </div>

                      {/* Chart & Stats - TOP SECTION */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Chart */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-center gap-3 mb-2">
                            <h4 className="text-2xl font-bold text-gray-900">Gewichtsverlauf</h4>
                            <span
                              className={`px-4 py-1 rounded-full text-sm font-semibold ${
                                selectedTestimonial.goal === "muscleGain"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              Ziel: {selectedTestimonial.goal === "muscleGain" ? "Muskelaufbau 💪" : "Abnehmen 🔥"}
                            </span>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-6">
                            <ResponsiveContainer width="100%" height={300}>
                              <LineChart data={selectedTestimonial.weightLoss.chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                  dataKey="week"
                                  label={{ value: "Wochen", position: "bottom" }}
                                  stroke="#6b7280"
                                />
                                <YAxis
                                  label={{ value: "Gewicht (kg)", angle: -90, position: "left" }}
                                  stroke="#6b7280"
                                />
                                <Tooltip
                                  contentStyle={{
                                    backgroundColor: "#1f2937",
                                    border: "none",
                                    borderRadius: "8px",
                                    color: "#fff",
                                  }}
                                  formatter={(value: any) => [`${value} kg`, "Gewicht"]}
                                  labelFormatter={(label) => `Woche ${label}`}
                                />
                                <defs>
                                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                      offset="5%"
                                      stopColor={selectedTestimonial.goal === "muscleGain" ? "#2563EB" : "#DC2626"}
                                      stopOpacity={0.3}
                                    />
                                    <stop
                                      offset="95%"
                                      stopColor={selectedTestimonial.goal === "muscleGain" ? "#2563EB" : "#DC2626"}
                                      stopOpacity={0}
                                    />
                                  </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="weight" stroke="none" fill="url(#colorWeight)" />
                                <Line
                                  type="monotone"
                                  dataKey="weight"
                                  stroke={selectedTestimonial.goal === "muscleGain" ? "#2563EB" : "#DC2626"}
                                  strokeWidth={3}
                                  dot={{
                                    fill: selectedTestimonial.goal === "muscleGain" ? "#2563EB" : "#DC2626",
                                    r: 6,
                                  }}
                                  activeDot={{ r: 8 }}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="space-y-4">
                          <div
                            className={`rounded-xl p-8 text-center ${
                              selectedTestimonial.goal === "muscleGain"
                                ? "bg-gradient-to-br from-blue-50 to-blue-100/50"
                                : "bg-gradient-to-br from-red-50 to-red-100/50"
                            }`}
                          >
                            <div
                              className={`text-6xl font-bold mb-2 ${
                                selectedTestimonial.goal === "muscleGain" ? "text-blue-600" : "text-red-600"
                              }`}
                            >
                              {selectedTestimonial.goal === "muscleGain" ? "+" : "-"}
                              {Math.abs(selectedTestimonial.weightLoss.totalLoss)} kg
                            </div>
                            <div className="text-xl text-gray-600 font-medium">
                              in {selectedTestimonial.weightLoss.weeks} Wochen
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center">
                              <div className="text-2xl font-bold text-gray-900 mb-1">
                                {selectedTestimonial.weightLoss.startWeight} kg
                              </div>
                              <div className="text-sm text-gray-600">Startgewicht</div>
                            </div>
                            <div className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center">
                              <div
                                className={`text-2xl font-bold mb-1 ${
                                  selectedTestimonial.goal === "muscleGain" ? "text-blue-600" : "text-red-600"
                                }`}
                              >
                                {selectedTestimonial.weightLoss.endWeight} kg
                              </div>
                              <div className="text-sm text-gray-600">Aktuell</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* View Selector */}
                      <div className="flex justify-center gap-2 mb-8">
                        {VIEW_LABELS.map((label, index) => (
                          <button
                            key={index}
                            onClick={() => handleImageIndexChange(index)}
                            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                              currentImageIndex === index
                                ? "bg-red-600 text-white shadow-lg"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>

                      {/* Side-by-Side Images */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* VORHER */}
                        <div className="space-y-2">
                          <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">
                            Vorher
                          </p>
                          <div className="relative h-[45vh] bg-gray-100 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
                            <img
                              src={selectedTestimonial.images.before[currentImageIndex]}
                              alt={`Vorher - ${VIEW_LABELS[currentImageIndex]}`}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                console.error(
                                  "Failed to load image:",
                                  selectedTestimonial.images.before[currentImageIndex],
                                );
                                e.currentTarget.src = selectedTestimonial.images.after[currentImageIndex];
                              }}
                            />
                            <button
                              onClick={prevImage}
                              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors z-10"
                            >
                              <ChevronLeft className="h-6 w-6" />
                            </button>
                          </div>
                        </div>

                        {/* NACHHER */}
                        <div className="space-y-2">
                          <p className="text-center text-sm font-semibold text-red-600 uppercase tracking-wider">
                            Nachher
                          </p>
                          <div className="relative h-[45vh] bg-gray-100 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
                            <img
                              src={selectedTestimonial.images.after[currentImageIndex]}
                              alt={`Nachher - ${VIEW_LABELS[currentImageIndex]}`}
                              className="w-full h-full object-contain"
                            />
                            <button
                              onClick={nextImage}
                              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors z-10"
                            >
                              <ChevronRight className="h-6 w-6" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Full Quote */}
                      <div className="bg-gray-50 rounded-xl p-6 text-center">
                        <p className="text-lg text-gray-700 italic">"{selectedTestimonial.fullQuote}"</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TestimonialSection;
