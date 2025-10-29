import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, Apple, Heart, Target } from "lucide-react";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Niklas",
      role: "🍎 & 💪 Apfel & Hantel",
      image: "/assets/niklas-team.png",
      specialties: [
        "Ernährungsanalyse & zielgerechte Optimierung",
        "Individuelle Trainingsplanung (Muskelaufbau & Leistungssteigerung)",
        "Stoffwechsel- und Energieoptimierung",
        "Optimierung der Körperkomposition (Fettabbau & Muskelzuwachs)",
        "Bewegungs- & Technikcoaching",
        "Trainingsperiodisierung & Progression",
        "Leistungsdiagnostik & -steigerung",
      ],
      icon: Dumbbell,
      color: "from-nf-black to-nf-gray-600",
    },
    {
      name: "Fabienne",
      role: "🧠❤️ & 🍎 Hirn|Herz & Apfel",
      image: "/assets/fabienne-team.png",
      specialties: [
        "Mental Coaching & Begleitung bei Veränderungsprozessen",
        "Female Balance & ganzheitliches Wohlbefinden",
        "Individuelle Ernährungspläne (zielorientiert & alltagstauglich)",
        "Nachhaltige Gewohnheitsbildung",
        "Stress- & Emotionsmanagement für mehr Gelassenheit im Alltag",
        "Achtsamkeit & Mindset-Arbeit für langfristigen Erfolg",
        "Unterstützung beim Aufbau neuer Routinen",
      ],
      icon: Apple,
      color: "from-nf-red to-nf-red/80",
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
              <Card className="overflow-hidden shadow-medium hover:shadow-large transition-smooth border border-nf-gray-200">
                <div className="relative">
                  <div className="aspect-[3/4] relative overflow-hidden bg-transparent">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover object-center" />
                    {/* Dezenter dunkler Overlay für bessere Lesbarkeit */}
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>

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
                  <ul className="space-y-1.5 lg:space-y-2 min-h-[280px] lg:min-h-[320px]">
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
