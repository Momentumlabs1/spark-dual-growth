import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Dumbbell, Apple, Heart, Target } from 'lucide-react';

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'Nick',
      role: 'Training & Muskelaufbau',
      image: '/api/placeholder/400/500',
      specialties: [
        'Krafttraining & Hypertrophie',
        'Bewegungsoptimierung',
        'Körperkomposition',
        'Trainingsperiodisierung'
      ],
      icon: Dumbbell,
      color: 'from-nf-black to-nf-gray-600'
    },
    {
      name: 'Fabienne',
      role: 'Ernährung & Lifestyle',
      image: '/api/placeholder/400/500',
      specialties: [
        'Individuelle Ernährungspläne',
        'Stoffwechseloptimierung',
        'Lifestyle-Coaching',
        'Nachhaltigkeit'
      ],
      icon: Apple,
      color: 'from-nf-red to-nf-red/80'
    }
  ];

  return (
    <section id="team" className="py-20 bg-nf-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-nf-black mb-6">
            Unser <span className="text-nf-red">Team</span>
          </h2>
          <p className="text-xl text-nf-gray-600 max-w-3xl mx-auto text-balance">
            Warum wir als Team? Doppelte Expertise aus einer Hand
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="overflow-hidden shadow-medium hover:shadow-large transition-smooth border-0">
                <div className="relative">
                  {/* Image Placeholder */}
                  <div className="aspect-[4/5] bg-gradient-to-br from-nf-gray-200 to-nf-gray-100 flex items-center justify-center relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-20`}></div>
                    <div className="relative z-10 text-center text-nf-gray-600">
                      <member.icon className="h-16 w-16 mx-auto mb-4" />
                      <p className="text-lg font-medium">{member.name}</p>
                      <p className="text-sm">{member.role}</p>
                    </div>
                  </div>
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-nf-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end">
                    <div className="p-6 text-nf-white">
                      <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                      <p className="text-nf-red font-medium">{member.role}</p>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <member.icon className="h-6 w-6 text-nf-red mr-3" />
                    <h3 className="text-xl font-bold text-nf-black">{member.name}</h3>
                  </div>
                  <p className="text-nf-red font-semibold mb-4">{member.role}</p>
                  <ul className="space-y-2">
                    {member.specialties.map((specialty, idx) => (
                      <li key={idx} className="flex items-center text-nf-gray-600">
                        <div className="w-2 h-2 bg-nf-red rounded-full mr-3 flex-shrink-0"></div>
                        <span>{specialty}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Team Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="max-w-4xl mx-auto shadow-medium border-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-nf-red mr-3" />
                <Target className="h-8 w-8 text-nf-black" />
              </div>
              <h3 className="text-2xl font-bold text-nf-black mb-4">
                Ganzheitlicher Ansatz
              </h3>
              <p className="text-lg text-nf-gray-600 text-balance">
                Training und Ernährung sind untrennbar miteinander verbunden. 
                Durch unsere Expertise in beiden Bereichen erreichst du nachhaltige 
                Ergebnisse - für Körper und Geist.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;