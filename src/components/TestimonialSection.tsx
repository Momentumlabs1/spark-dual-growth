import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';

interface WeightLossData {
  startWeight: number;
  endWeight: number;
  weeks: number;
  chartData: Array<{ week: number; weight: number }>;
}

interface Testimonial {
  id: string;
  name: string;
  age: number;
  imagePlaceholder: string;
  rating: 5;
  shortQuote: string;
  fullQuote: string;
  achievement: string;
  weightLoss: WeightLossData;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Lisa T.",
    age: 34,
    imagePlaceholder: "/placeholder.svg",
    rating: 5,
    shortQuote: "Nach 3 Jahren erfolglosen Diäten war ich skeptisch.",
    fullQuote: "Nach 3 Jahren erfolglosen Diäten war ich skeptisch. Aber der individuelle Ansatz und die persönliche Betreuung haben alles verändert. Ich fühle mich endlich wieder wohl in meiner Haut.",
    achievement: "Traumfigur erreicht",
    weightLoss: {
      startWeight: 82,
      endWeight: 68,
      weeks: 16,
      chartData: [
        { week: 0, weight: 82 },
        { week: 4, weight: 78 },
        { week: 8, weight: 74 },
        { week: 12, weight: 71 },
        { week: 16, weight: 68 }
      ]
    }
  },
  {
    id: "2",
    name: "Michael K.",
    age: 29,
    imagePlaceholder: "/placeholder.svg",
    rating: 5,
    shortQuote: "15 kg in 20 Wochen - nachhaltig und ohne Verzicht.",
    fullQuote: "15 kg in 20 Wochen - nachhaltig und ohne Verzicht. Das Team-Coaching hat den Unterschied gemacht. Training UND Ernährung perfekt abgestimmt.",
    achievement: "Wunschgewicht erreicht",
    weightLoss: {
      startWeight: 95,
      endWeight: 80,
      weeks: 20,
      chartData: [
        { week: 0, weight: 95 },
        { week: 5, weight: 91 },
        { week: 10, weight: 87 },
        { week: 15, weight: 83 },
        { week: 20, weight: 80 }
      ]
    }
  },
  {
    id: "3",
    name: "Sarah M.",
    age: 42,
    imagePlaceholder: "/placeholder.svg",
    rating: 5,
    shortQuote: "Endlich habe ich mein Selbstvertrauen zurück!",
    fullQuote: "Endlich habe ich mein Selbstvertrauen zurück! Nach zwei Schwangerschaften dachte ich, ich würde nie wieder in Form kommen. Niklas und Fabienne haben mir gezeigt, dass es möglich ist.",
    achievement: "Selbstvertrauen gewonnen",
    weightLoss: {
      startWeight: 78,
      endWeight: 63,
      weeks: 18,
      chartData: [
        { week: 0, weight: 78 },
        { week: 6, weight: 73 },
        { week: 12, weight: 68 },
        { week: 18, weight: 63 }
      ]
    }
  },
  {
    id: "4",
    name: "Thomas B.",
    age: 38,
    imagePlaceholder: "/placeholder.svg",
    rating: 5,
    shortQuote: "Von Größe XXL zu L - unglaublich!",
    fullQuote: "Von Größe XXL zu L - unglaublich! Ich hätte nie gedacht, dass ich so viel erreichen kann. Die Betreuung ist individuell und motivierend.",
    achievement: "Kleidergröße reduziert",
    weightLoss: {
      startWeight: 108,
      endWeight: 88,
      weeks: 24,
      chartData: [
        { week: 0, weight: 108 },
        { week: 6, weight: 103 },
        { week: 12, weight: 97 },
        { week: 18, weight: 92 },
        { week: 24, weight: 88 }
      ]
    }
  },
  {
    id: "5",
    name: "Anna L.",
    age: 31,
    imagePlaceholder: "/placeholder.svg",
    rating: 5,
    shortQuote: "Nie wieder Jo-Jo-Effekt!",
    fullQuote: "Nie wieder Jo-Jo-Effekt! Ich habe endlich gelernt, wie man nachhaltig und gesund abnimmt. Das Coaching war lebensverändernd.",
    achievement: "Nachhaltig verändert",
    weightLoss: {
      startWeight: 72,
      endWeight: 61,
      weeks: 14,
      chartData: [
        { week: 0, weight: 72 },
        { week: 4, weight: 69 },
        { week: 8, weight: 66 },
        { week: 11, weight: 63 },
        { week: 14, weight: 61 }
      ]
    }
  },
  {
    id: "6",
    name: "Daniel R.",
    age: 45,
    imagePlaceholder: "/placeholder.svg",
    rating: 5,
    shortQuote: "Mit 45 in der besten Form meines Lebens!",
    fullQuote: "Mit 45 in der besten Form meines Lebens! Ich dachte, es sei zu spät. Aber Niklas und Fabienne haben mir gezeigt, dass das Alter nur eine Zahl ist.",
    achievement: "Beste Form erreicht",
    weightLoss: {
      startWeight: 102,
      endWeight: 85,
      weeks: 22,
      chartData: [
        { week: 0, weight: 102 },
        { week: 6, weight: 97 },
        { week: 12, weight: 92 },
        { week: 17, weight: 88 },
        { week: 22, weight: 85 }
      ]
    }
  }
];

const TestimonialSection = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  const renderStars = (rating: number) => {
    return Array.from({ length: rating }).map((_, i) => (
      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
    ));
  };

  return (
    <section className="py-16 md:py-24 bg-nf-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-nf-black mb-4">
            Was unsere Kunden sagen
          </h2>
          <p className="text-lg md:text-xl text-nf-black/70">
            Echte Ergebnisse von echten Menschen
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedTestimonial(testimonial)}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-nf-black/5"
            >
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-nf-red/20 to-nf-black/20 flex items-center justify-center">
                  <img 
                    src={testimonial.imagePlaceholder} 
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-3">
                {renderStars(testimonial.rating)}
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-nf-black text-center mb-2">
                {testimonial.name}
              </h3>

              {/* Achievement Badge */}
              <div className="text-center mb-4">
                <span className="inline-block bg-nf-red/10 text-nf-red px-3 py-1 rounded-full text-sm font-semibold">
                  {testimonial.achievement}
                </span>
              </div>

              {/* Short Quote */}
              <p className="text-nf-black/70 text-center mb-4 line-clamp-2">
                "{testimonial.shortQuote}"
              </p>

              {/* Click Badge */}
              <div className="text-center">
                <span className="text-xs text-nf-black/50 bg-nf-black/5 px-3 py-1 rounded-full">
                  Klicken für Details
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <Dialog open={!!selectedTestimonial} onOpenChange={() => setSelectedTestimonial(null)}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            {selectedTestimonial && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
                {/* Left Side - User Details */}
                <div className="flex flex-col items-center space-y-4">
                  {/* Large Avatar */}
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-nf-red/20 to-nf-black/20 flex items-center justify-center">
                    <img 
                      src={selectedTestimonial.imagePlaceholder} 
                      alt={selectedTestimonial.name}
                      className="w-28 h-28 rounded-full object-cover"
                    />
                  </div>

                  {/* Name & Age */}
                  <h3 className="text-2xl font-bold text-nf-black">
                    {selectedTestimonial.name}, {selectedTestimonial.age}
                  </h3>

                  {/* Stars */}
                  <div className="flex gap-1">
                    {renderStars(selectedTestimonial.rating)}
                  </div>

                  {/* Achievement */}
                  <span className="inline-block bg-nf-red text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {selectedTestimonial.achievement}
                  </span>

                  {/* Full Quote */}
                  <p className="text-nf-black/80 text-center leading-relaxed">
                    "{selectedTestimonial.fullQuote}"
                  </p>
                </div>

                {/* Right Side - Chart */}
                <div className="flex flex-col space-y-4">
                  <h4 className="text-xl font-bold text-nf-black text-center">
                    Gewichtsverlauf
                  </h4>

                  {/* Recharts Line Chart */}
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={selectedTestimonial.weightLoss.chartData}>
                      <defs>
                        <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#DC2626" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#DC2626" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="week" 
                        label={{ value: 'Wochen', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis 
                        label={{ value: 'Gewicht (kg)', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip 
                        contentStyle={{ background: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="weight" 
                        stroke="none" 
                        fill="url(#colorWeight)" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="weight" 
                        stroke="#DC2626" 
                        strokeWidth={3}
                        dot={{ fill: '#DC2626', r: 5 }}
                        activeDot={{ r: 8 }}
                        animationDuration={1500}
                        animationEasing="ease-in-out"
                      />
                    </LineChart>
                  </ResponsiveContainer>

                  {/* Weight Loss Highlight */}
                  <div className="text-center mt-6 p-6 bg-gradient-to-br from-nf-red/10 to-nf-black/5 rounded-xl">
                    <p className="text-4xl font-bold text-nf-red">
                      -{selectedTestimonial.weightLoss.startWeight - selectedTestimonial.weightLoss.endWeight} kg
                    </p>
                    <p className="text-xl text-nf-black/70 mt-2">
                      in {selectedTestimonial.weightLoss.weeks} Wochen
                    </p>
  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default TestimonialSection;
