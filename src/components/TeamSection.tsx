import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, Apple, Heart, Target } from "lucide-react";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Niklas",
      role: "Training & Muskelaufbau",
      image: "/images/niklas.jpg", // Passe diesen Pfad an dein hochgeladenes Bild an
      specialties: [
        "Krafttraining & Hypertrophie",
        "Bewegungsoptimierung",
        "Körperkomposition",
        "Trainingsperiodisierung",
      ],
      icon: Dumbbell,
      color: "from-nf-black to-nf-gray-600",
      gradient: "from-gray-900/40 via-gray-900/20 to-transparent",
    },
    {
      name: "Fabienne",
      role: "Ernährung & Lifestyle",
      image: "/images/fabienne.jpg", // Passe diesen Pfad an dein hochgeladenes Bild an
      specialties: ["Individuelle Ernährungspläne", "Stoffwechseloptimierung", "Lifestyle-Coaching", "Nachhaltigkeit"],
      icon: Apple,
      color: "from-nf-red to-nf-red/80",
      gradient: "from-rose-900/40 via-rose-900/20 to-transparent",
    },
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

        {/* WICHTIG: grid-cols-2 statt md:grid-cols-2 sorgt dafür, dass die Bilder auch auf mobilen Geräten nebeneinander sind */}
        <div className="grid grid-cols-2 gap-4 lg:gap-12">
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
                  {/* Echtes Bild mit Fade-Effekt */}
                  <div className="aspect-[4/5] relative overflow-hidden bg-nf-gray-100">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover object-center" />
                    {/* Farblicher Fade-Effekt über dem Bild */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${member.gradient}`}></div>
                  </div>

                  {/* Content Overlay bei Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-nf-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end">
                    <div className="p-4 lg:p-6 text-nf-white">
                      <h3 className="text-lg lg:text-2xl font-bold mb-1 lg:mb-2">{member.name}</h3>
                      <p className="text-nf-red font-medium text-sm lg:text-base">{member.role}</p>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center mb-3 lg:mb-4">
                    <member.icon className="h-5 w-5 lg:h-6 lg:w-6 text-nf-red mr-2 lg:mr-3 flex-shrink-0" />
                    <h3 className="text-base lg:text-xl font-bold text-nf-black">{member.name}</h3>
                  </div>
                  <p className="text-nf-red font-semibold mb-3 lg:mb-4 text-sm lg:text-base">{member.role}</p>
                  <ul className="space-y-1.5 lg:space-y-2">
                    {member.specialties.map((specialty, idx) => (
                      <li key={idx} className="flex items-start text-nf-gray-600 text-xs lg:text-base">
                        <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-nf-red rounded-full mr-2 lg:mr-3 flex-shrink-0 mt-1.5 lg:mt-2"></div>
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
          className="mt-16"
        >
          <Card className="max-w-4xl mx-auto shadow-medium border-0">
            <CardContent className="p-6 lg:p-8">
              <div className="flex items-center justify-center mb-4 lg:mb-6">
                <Heart className="h-6 w-6 lg:h-8 lg:w-8 text-nf-red mr-3" />
                <Target className="h-6 w-6 lg:h-8 lg:w-8 text-nf-black" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-nf-black mb-3 lg:mb-4 text-center">
                Ganzheitlicher Ansatz
              </h3>
              <p className="text-base lg:text-lg text-nf-gray-600 text-balance text-center">
                Training und Ernährung sind untrennbar miteinander verbunden. Durch unsere Expertise in beiden Bereichen
                erreichst du nachhaltige Ergebnisse - für Körper und Geist.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
