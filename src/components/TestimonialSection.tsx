import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

const TestimonialSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: 'Sarah M.',
      rating: 5,
      text: 'Dank Nick und Fabienne habe ich nicht nur 15kg abgenommen, sondern auch eine völlig neue Beziehung zu meinem Körper entwickelt. Das ganzheitliche Coaching hat mir gezeigt, dass es nicht nur um das Training geht.',
      result: '-15kg in 6 Monaten'
    },
    {
      name: 'Marcus K.',
      rating: 5,
      text: 'Als Geschäftsführer hatte ich nie Zeit für komplizierte Diäten. Das Team hat mir einen Weg gezeigt, wie ich trotz vollem Terminkalender fit und gesund bleiben kann. Einfach genial!',
      result: '+8kg Muskelmasse'
    },
    {
      name: 'Lisa T.',
      rating: 5,
      text: 'Nach 3 Jahren erfolgloser Diäten war ich skeptisch. Aber der individuelle Ansatz und die persönliche Betreuung haben alles verändert. Ich fühle mich endlich wieder wohl in meiner Haut.',
      result: 'Traumfigur erreicht'
    },
    {
      name: 'Tom R.',
      rating: 5,
      text: 'Die Kombination aus professionellem Training und durchdachter Ernährung hat bei mir Wunder bewirkt. Besonders die mentale Unterstützung war Gold wert.',
      result: '+12kg Muskeln'
    },
    {
      name: 'Anna S.',
      rating: 5,
      text: 'Endlich ein Coaching, das wirklich individuell ist! Nick und Fabienne haben einen Plan entwickelt, der perfekt zu meinem Leben als berufstätige Mutter passt.',
      result: 'Mehr Energie & Kraft'
    }
  ];

  const stats = [
    { number: '500+', label: 'Zufriedene Kunden' },
    { number: '4.9/5', label: 'Durchschnittliche Bewertung' },
    { number: '95%', label: 'Erfolgsrate' },
    { number: '2+', label: 'Jahre Erfahrung' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-nf-gray-200'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-nf-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-nf-black mb-6">
            Was unsere <span className="text-nf-red">Kunden</span> sagen
          </h2>
          <p className="text-xl text-nf-gray-600 max-w-3xl mx-auto text-balance">
            Echte Ergebnisse von echten Menschen
          </p>
        </motion.div>

        {/* Stats Counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <Card key={stat.label} className="text-center border-0 shadow-soft">
              <CardContent className="p-6">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold text-nf-red mb-2"
                >
                  {stat.number}
                </motion.div>
                <p className="text-nf-gray-600 font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Testimonial Slider */}
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="border-0 shadow-medium">
                    <CardContent className="p-8 text-center">
                      <div className="mb-6">
                        <Quote className="h-8 w-8 text-nf-red mx-auto mb-4" />
                        <p className="text-lg text-nf-gray-600 italic leading-relaxed text-balance">
                          "{testimonial.text}"
                        </p>
                      </div>
                      
                      <div className="flex justify-center mb-4">
                        {renderStars(testimonial.rating)}
                      </div>
                      
                      <div className="text-center">
                        <p className="font-bold text-nf-black text-lg">{testimonial.name}</p>
                        <p className="text-nf-red font-semibold">{testimonial.result}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-smooth ${
                  index === currentSlide ? 'bg-nf-red' : 'bg-nf-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-nf-white/80 hover:bg-nf-white text-nf-black p-3 rounded-full shadow-medium transition-smooth"
          >
            ←
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % testimonials.length)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-nf-white/80 hover:bg-nf-white text-nf-black p-3 rounded-full shadow-medium transition-smooth"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;