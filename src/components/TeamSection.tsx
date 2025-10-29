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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 h-full flex flex-col">
                <div className="relative">
                  <div className="aspect-square relative overflow-hidden bg-white">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-nf-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                    <div className="p-6 text-nf-white w-full">
                      <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                      <p className="text-nf-red font-medium">{member.role}</p>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center mb-4">
                    <member.icon className="h-6 w-6 text-nf-red mr-3 flex-shrink-0" />
                    <h3 className="text-xl font-bold text-nf-black">{member.name}</h3>
                  </div>
                  <p className="text-nf-red font-semibold mb-4">{member.role}</p>
                  <ul className="space-y-2 flex-1">
                    {member.specialties.map((specialty, idx) => (
                      <li key={idx} className="flex items-start text-nf-gray-700 text-sm">
                        <div className="w-1.5 h-1.5 bg-nf-red rounded-full mr-3 flex-shrink-0 mt-2"></div>
                        <span className="leading-relaxed">{specialty}</span>
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
          <Card className="max-w-4xl mx-auto shadow-lg border border-gray-200">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-nf-red mr-3" />
                <Target className="h-8 w-8 text-nf-black" />
              </div>
              <h3 className="text-2xl font-bold text-nf-black mb-4 text-center">Ganzheitlicher Ansatz</h3>
              <p className="text-lg text-nf-gray-600 text-center leading-relaxed">
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
