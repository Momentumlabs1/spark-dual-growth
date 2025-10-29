import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, Apple, Heart, Target, ChevronDown } from "lucide-react";
import { useState } from "react";

const TeamSection = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const teamMembers = [
    {
      name: "Niklas",
      role: "🍎 & 💪",
      miniDescription: "Training • Ernährung • Performance",
      image: "/assets/niklas-team.png",
      bgGradient: "from-gray-900 to-gray-700",
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
      role: "🧠❤️ & 🍎",
      miniDescription: "Mental Health • Balance • Ernährung",
      image: "/assets/fabienne-team.png",
      bgGradient: "from-rose-600 to-rose-400",
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

  const toggleCard = (name: string) => {
    setExpandedCard(expandedCard === name ? null : name);
  };

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

        <div className="grid grid-cols-2 gap-4 lg:gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                {/* Bild mit farbigem Hintergrund */}
                <div className="relative">
                  <div className={`aspect-square relative overflow-hidden bg-gradient-to-br ${member.bgGradient}`}>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top mix-blend-normal"
                    />
                  </div>
                </div>

                {/* Kompakte Info */}
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center mb-3">
                    <member.icon className="h-5 w-5 lg:h-6 lg:w-6 text-nf-red mr-2 flex-shrink-0" />
                    <h3 className="text-lg lg:text-xl font-bold text-nf-black">{member.name}</h3>
                  </div>

                  {/* Mini-Beschreibung */}
                  <p className="text-sm lg:text-base text-nf-gray-600 mb-4 font-medium">{member.miniDescription}</p>

                  {/* Aufklappbarer Bereich */}
                  <div>
                    <button
                      onClick={() => toggleCard(member.name)}
                      className="flex items-center justify-between w-full text-nf-red hover:text-nf-red/80 transition-colors font-semibold text-sm lg:text-base mb-3"
                    >
                      <span>{expandedCard === member.name ? "Weniger anzeigen" : "Mehr erfahren"}</span>
                      <ChevronDown
                        className={`h-4 w-4 lg:h-5 lg:w-5 transition-transform duration-300 ${
                          expandedCard === member.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedCard === member.name ? "auto" : 0,
                        opacity: expandedCard === member.name ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-2 pt-2 border-t border-gray-200">
                        {member.specialties.map((specialty, idx) => (
                          <li key={idx} className="flex items-start text-nf-gray-700 text-xs lg:text-sm">
                            <div className="w-1.5 h-1.5 bg-nf-red rounded-full mr-2 flex-shrink-0 mt-1.5"></div>
                            <span className="leading-relaxed">{specialty}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
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
            <CardContent className="p-6 lg:p-8">
              <div className="flex items-center justify-center mb-4 lg:mb-6">
                <Heart className="h-6 w-6 lg:h-8 lg:w-8 text-nf-red mr-3" />
                <Target className="h-6 w-6 lg:h-8 lg:w-8 text-nf-black" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-nf-black mb-3 lg:mb-4 text-center">
                Ganzheitlicher Ansatz
              </h3>
              <p className="text-base lg:text-lg text-nf-gray-600 text-center leading-relaxed">
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
