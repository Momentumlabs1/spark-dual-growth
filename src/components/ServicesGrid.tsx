import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Apple, Heart, TrendingUp } from 'lucide-react';

const ServicesGrid = () => {
  const services = [
    {
      icon: Target,
      title: 'Professionelle Trainingspläne',
      description: 'Individuell angepasste Trainingspläne basierend auf deinen Zielen, deinem Fitnesslevel und verfügbarer Zeit.',
      color: 'from-nf-red/10 to-nf-red/5'
    },
    {
      icon: Apple,
      title: 'Individuelle Ernährungsberatung',
      description: 'Maßgeschneiderte Ernährungsstrategien, die zu deinem Lifestyle passen und nachhaltige Ergebnisse liefern.',
      color: 'from-nf-black/10 to-nf-black/5'
    },
    {
      icon: Heart,
      title: 'Ganzheitliche Betreuung',
      description: 'Umfassende Unterstützung bei Training, Ernährung, Regeneration und mentaler Stärke für optimale Resultate.',
      color: 'from-nf-red/10 to-nf-red/5'
    },
    {
      icon: TrendingUp,
      title: 'Nachhaltiger Erfolg',
      description: 'Langfristige Strategien und Gewohnheitsaufbau für dauerhaften Erfolg ohne Verzicht und Jo-Jo-Effekt.',
      color: 'from-nf-black/10 to-nf-black/5'
    }
  ];

  return (
    <section id="coaching" className="py-20 bg-nf-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-nf-black mb-6">
            Unser <span className="text-nf-red">Coaching</span>
          </h2>
          <p className="text-xl text-nf-gray-600 max-w-3xl mx-auto text-balance">
            Vier Säulen für deinen nachhaltigen Erfolg
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full border-0 shadow-soft hover:shadow-medium transition-smooth group-hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:scale-110 transition-smooth`}>
                    <service.icon className="h-8 w-8 text-nf-red group-hover:text-nf-black transition-smooth" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-nf-black mb-4 text-balance">
                    {service.title}
                  </h3>
                  
                  <p className="text-nf-gray-600 leading-relaxed text-balance">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="max-w-4xl mx-auto shadow-medium border-0 bg-gradient-to-br from-nf-black to-nf-red/10">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-nf-white mb-4">
                Bereit für deine Transformation?
              </h3>
              <p className="text-nf-white/80 mb-6 text-lg">
                Starte noch heute mit unserem ganzheitlichen Coaching-Ansatz.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.querySelector('#kontakt');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="bg-nf-red hover:bg-nf-red/90 text-nf-white px-8 py-4 rounded-lg font-semibold text-lg transition-smooth shadow-red-glow"
              >
                Kostenloses Beratungsgespräch
              </motion.button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;