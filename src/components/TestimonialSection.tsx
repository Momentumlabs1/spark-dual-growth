import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Star, X, ChevronLeft, ChevronRight } from "lucide-react";
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
    before: string[]; // [front, back, side]
    after: string[]; // [front, back, side]
  };
}

const VIEW_LABELS = ["Vorne", "Seite", "Hinten"];

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Lisa S.",
    age: 32,
    avatar: "/assets/testimonials/INFO.jpg",
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
      before: [
        "/assets/testimonials/lisa-before-front.png",
        "/assets/testimonials/lisa-before-side.png",
        "/assets/testimonials/lisa-before-back.png",
      ],
      after: [
        "/assets/testimonials/lisa-after-front.png",
        "/assets/testimonials/lisa-after-side.png",
        "/assets/testimonials/lisa-after-back.png",
      ],
    },
  },
  {
    id: "2",
    name: "David M.",
    age: 29,
    avatar: "/assets/testimonials/david-avatar.jpg",
    useGenericAvatar: false,
    rating: 5,
    badge: "Traumfigur erreicht",
    shortQuote: "Endlich die Transformation die ich wollte!",
    fullQuote:
      "Mit Niklas und Fabienne habe ich endlich meine Ziele erreicht. Die Kombination aus Training und Ernährung war perfekt auf mich abgestimmt.",
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
      before: [
        "/assets/testimonials/david-before-front.jpg",
        "/assets/testimonials/david-before-side.jpg",
        "/assets/testimonials/david-before-back.jpg",
      ],
      after: [
        "/assets/testimonials/david-after-front.jpg",
        "/assets/testimonials/david-after-side.jpg",
        "/assets/testimonials/david-after-back.jpg",
      ],
    },
  },
  {
    id: "3",
    name: "Tahsin K.",
    age: 27,
    avatar: "/assets/testimonials/tahsin-avatar.jpg",
    useGenericAvatar: true,
    rating: 5,
    badge: "Wunschgewicht erreicht",
    shortQuote: "Beste Entscheidung meines Lebens!",
    fullQuote: "Das Team-Coaching hat den Unterschied gemacht. Ich fühle mich fitter und gesünder als je zuvor.",
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
      before: [
        "/assets/testimonials/tahsin-before-front.jpg",
        "/assets/testimonials/tahsin-before-side.jpg",
        "/assets/testimonials/tahsin-before-back.jpg",
      ],
      after: [
        "/assets/testimonials/tahsin-after-front.jpg",
        "/assets/testimonials/tahsin-after-side.jpg",
        "/assets/testimonials/tahsin-after-back.jpg",
      ],
    },
  },
];

const TestimonialSection = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBefore, setShowBefore] = useState(true);

  const handleCardClick = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setCurrentImageIndex(0);
    setShowBefore(true);
  };

  const closeModal = () => {
    setSelectedTestimonial(null);
  };

  const nextImage = () => {
    if (selectedTestimonial) {
      setCurrentImageIndex((prev) => (prev + 1) % 3);
    }
  };

  const prevImage = () => {
    if (selectedTestimonial) {
      setCurrentImageIndex((prev) => (prev - 1 + 3) % 3);
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
              <div className="relative bg-white rounded-2xl">
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                  {/* LEFT SIDE: Info & Images */}
                  <div className="space-y-6">
                    {/* Avatar & Info */}
                    <div className="text-center">
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

                    {/* Full Quote */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="text-gray-700 italic text-lg leading-relaxed">"{selectedTestimonial.fullQuote}"</p>
                    </div>

                    {/* Before/After Image Slider */}
                    <div className="space-y-4">
                      {/* Toggle Buttons */}
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => setShowBefore(true)}
                          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                            showBefore ? "bg-red-600 text-white" : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                          }`}
                        >
                          Vorher
                        </button>
                        <button
                          onClick={() => setShowBefore(false)}
                          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                            !showBefore ? "bg-red-600 text-white" : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                          }`}
                        >
                          Nachher
                        </button>
                      </div>

                      {/* View Label - NEW */}
                      <div className="text-center">
                        <span className="inline-block bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium">
                          Ansicht: {VIEW_LABELS[currentImageIndex]}
                        </span>
                      </div>

                      {/* Image Slider */}
                      <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden">
                        <img
                          src={
                            showBefore
                              ? selectedTestimonial.images.before[currentImageIndex]
                              : selectedTestimonial.images.after[currentImageIndex]
                          }
                          alt={`${showBefore ? "Vorher" : "Nachher"} - ${VIEW_LABELS[currentImageIndex]}`}
                          className="w-full h-full object-cover"
                        />

                        {/* Navigation Arrows */}
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>

                        {/* Image Indicator with Labels - IMPROVED */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {VIEW_LABELS.map((label, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                                currentImageIndex === index
                                  ? "bg-white text-gray-900"
                                  : "bg-white/50 text-white hover:bg-white/70"
                              }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE: Chart */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">Gewichtsverlauf</h4>
                    </div>

                    {/* Chart */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={selectedTestimonial.weightLoss.chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="week" label={{ value: "Wochen", position: "bottom" }} stroke="#6b7280" />
                          <YAxis label={{ value: "Gewicht (kg)", angle: -90, position: "left" }} stroke="#6b7280" />
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

                    {/* Weight Loss Highlight */}
                    <div className="bg-gradient-to-br from-red-50 to-red-100/50 rounded-xl p-8 text-center">
                      <div className="text-6xl font-bold text-red-600 mb-2">
                        -{selectedTestimonial.weightLoss.totalLoss} kg
                      </div>
                      <div className="text-xl text-gray-600 font-medium">
                        in {selectedTestimonial.weightLoss.weeks} Wochen
                      </div>
                    </div>

                    {/* Stats */}
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
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TestimonialSection;
