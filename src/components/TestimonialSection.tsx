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
    badge: "15 kg abgenommen",
    shortQuote: "Endlich wieder selbstbewusst und voller Energie!",
    fullQuote:
      "Nach der Schwangerschaft fühlte ich mich in meinem Körper nicht mehr wohl. Mit dem Team-Coaching habe ich nicht nur 15 kg abgenommen, sondern auch meine Lebensfreude wiedergefunden. Ich bin stolz auf mich!",
    weightLoss: {
      startWeight: 82,
      endWeight: 67,
      totalLoss: 15,
      weeks: 18,
      chartData: [
        { week: 0, weight: 82 },
        { week: 6, weight: 77 },
        { week: 12, weight: 72 },
        { week: 18, weight: 67 },
      ],
    },
    images: {
      before: ["/lara-vorne-alt.png", "/lara-seite-alt.png", "/lara-hinten-alt.png"],
      after: ["/lara-vorne-neu.png", "/lara-seite-neu.png", "/lara-hinten-neu.png"],
    },
  },
  {
    id: "3",
    name: "Tanja K.",
    age: 35,
    avatar: "/assets/tanja-avatar.jpg",
    useGenericAvatar: true,
    rating: 5,
    badge: "12 kg abgenommen",
    shortQuote: "Mein Leben hat sich komplett verändert!",
    fullQuote:
      "Ich hatte schon so viele Diäten probiert, aber nichts hat nachhaltig funktioniert. Mit Niklas und Fabienne habe ich endlich verstanden, wie Ernährung wirklich funktioniert. 12 kg weniger und ich fühle mich großartig!",
    weightLoss: {
      startWeight: 78,
      endWeight: 66,
      totalLoss: 12,
      weeks: 14,
      chartData: [
        { week: 0, weight: 78 },
        { week: 4, weight: 74 },
        { week: 8, weight: 70 },
        { week: 12, weight: 67 },
        { week: 14, weight: 66 },
      ],
    },
    images: {
      before: ["/tanja-vorne-alt.png", "/tanja-seite-alt.png", "/tanja-hinten-alt.png"],
      after: ["/tanja-vorne-neu.png", "/tanja-seite-neu.png", "/tanja-hinten-neu.png"],
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
      before: ["/sarah-vorne-alt.png", "/sarah-seite-alt.png", "/sarah-hinten-alt.png"],
      after: ["/sarah-vorne-neu.png", "/sarah-seite-neu.png", "/sarah-hinten-neu.png"],
    },
  },
  {
    id: "5",
    name: "David M.",
    age: 29,
    avatar: "/assets/david-avatar.jpg",
    useGenericAvatar: true,
    rating: 5,
    badge: "13 kg abgenommen",
    shortQuote: "Endlich die Transformation die ich wollte!",
    fullQuote:
      "Mit Niklas und Fabienne habe ich endlich meine Ziele erreicht. Die Kombination aus Training und Ernährung war perfekt auf mich abgestimmt. Ich fühle mich stärker und fitter als je zuvor!",
    weightLoss: {
      startWeight: 95,
      endWeight: 82,
      totalLoss: 13,
      weeks: 20,
      chartData: [
        { week: 0, weight: 95 },
        { week: 5, weight: 91 },
        { week: 10, weight: 87 },
        { week: 15, weight: 84 },
        { week: 20, weight: 82 },
      ],
    },
    images: {
      before: ["/david-vorne-alt.png", "/david-seite-alt.png", "/david-hinten-alt.png"],
      after: ["/david-vorne-neu.png", "/david-seite-neu.png", "/david-hinten-neu.png"],
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
    shortQuote: "Vom Büromenschen zum Fitnessfan!",
    fullQuote:
      "Ich saß nur am Schreibtisch und hatte null Motivation für Sport. Das Team hat mich motiviert und mir gezeigt, wie ich Training in meinen Alltag integrieren kann. 16 kg weniger und endlich wieder fit!",
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
      before: ["/marco-vorne-alt.png", "/marco-seite-alt.png", "/marco-hinten-alt.png"],
      after: ["/marco-vorne-neu.png", "/marco-seite-neu.png", "/marco-hinten-neu.png"],
    },
  },
  {
    id: "7",
    name: "Alex F.",
    age: 26,
    avatar: "/assets/alex-avatar.jpg",
    useGenericAvatar: true,
    rating: 5,
    badge: "14 kg abgenommen",
    shortQuote: "Beste Entscheidung für meine Gesundheit!",
    fullQuote:
      "Ich wollte schon lange etwas ändern, aber wusste nicht wie. Das Coaching hat mir den Weg gezeigt. 14 kg weniger, mehr Muskeln und ein komplett neues Lebensgefühl!",
    weightLoss: {
      startWeight: 92,
      endWeight: 78,
      totalLoss: 14,
      weeks: 19,
      chartData: [
        { week: 0, weight: 92 },
        { week: 5, weight: 87 },
        { week: 10, weight: 83 },
        { week: 15, weight: 80 },
        { week: 19, weight: 78 },
      ],
    },
    images: {
      before: ["/alex-vorne-alt.png", "/alex-seite-alt.png", "/alex-hinten-alt.png"],
      after: ["/alex-vorne-neu.png", "/alex-seite-neu.png", "/alex-hinten-neu.png"],
    },
  },
  {
    id: "8",
    name: "Tahsin K.",
    age: 27,
    avatar: "/assets/tahsin-avatar.jpg",
    useGenericAvatar: true,
    rating: 5,
    badge: "14 kg abgenommen",
    shortQuote: "Beste Entscheidung meines Lebens!",
    fullQuote:
      "Das Team-Coaching hat den Unterschied gemacht. Ich fühle mich fitter und gesünder als je zuvor. Die Betreuung war top und die Ergebnisse sprechen für sich!",
    weightLoss: {
      startWeight: 102,
      endWeight: 88,
      totalLoss: 14,
      weeks: 18,
      chartData: [
        { week: 0, weight: 102 },
        { week: 6, weight: 96 },
        { week: 12, weight: 91 },
        { week: 18, weight: 88 },
      ],
    },
    images: {
      before: ["/tahsin-vorne-alt.png", "/tahsin-seite-alt.png", "/tahsin-hinten-alt.png"],
      after: ["/tahsin-vorne-neu.png", "/tahsin-seite-neu.png", "/tahsin-hinten-neu.png"],
    },
  },
];

const TestimonialSection = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  const [allImagesPreloaded, setAllImagesPreloaded] = useState(false);

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
                      {/* Chart & Stats - TOP SECTION */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Chart */}
                        <div className="space-y-4">
                          <h4 className="text-2xl font-bold text-gray-900 text-center">Gewichtsverlauf</h4>
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
                                    <stop offset="5%" stopColor="#DC2626" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
                                  </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="weight" stroke="none" fill="url(#colorWeight)" />
                                <Line
                                  type="monotone"
                                  dataKey="weight"
                                  stroke="#DC2626"
                                  strokeWidth={3}
                                  dot={{ fill: "#DC2626", r: 6 }}
                                  activeDot={{ r: 8 }}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="space-y-4">
                          <div className="bg-gradient-to-br from-red-50 to-red-100/50 rounded-xl p-8 text-center">
                            <div className="text-6xl font-bold text-red-600 mb-2">
                              -{selectedTestimonial.weightLoss.totalLoss} kg
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
                              <div className="text-2xl font-bold text-red-600 mb-1">
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
                          <motion.div
                            key={`before-${currentImageIndex}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden shadow-lg"
                          >
                            <img
                              src={selectedTestimonial.images.before[currentImageIndex]}
                              alt={`Vorher - ${VIEW_LABELS[currentImageIndex]}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={prevImage}
                              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                            >
                              <ChevronLeft className="h-6 w-6" />
                            </button>
                          </motion.div>
                        </div>

                        {/* NACHHER */}
                        <div className="space-y-2">
                          <p className="text-center text-sm font-semibold text-red-600 uppercase tracking-wider">
                            Nachher
                          </p>
                          <motion.div
                            key={`after-${currentImageIndex}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden shadow-lg"
                          >
                            <img
                              src={selectedTestimonial.images.after[currentImageIndex]}
                              alt={`Nachher - ${VIEW_LABELS[currentImageIndex]}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={nextImage}
                              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                            >
                              <ChevronRight className="h-6 w-6" />
                            </button>
                          </motion.div>
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
