import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import {
  TrendingUp,
  Target,
  Users,
  Flame,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Moon,
  Brain,
  Activity,
  Award,
  Calendar,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const TerminVorbereitungPage = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [sleepHours, setSleepHours] = useState<string>("");
  const [stressLevel, setStressLevel] = useState<string>("");

  const totalSteps = 7; // Ohne Ergebnisseite!

  const calculateMetrics = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseFloat(age);

    if (!h || !w || !a || h <= 0 || w <= 0 || a <= 0 || !gender || !activityLevel) return null;

    const heightInMeters = h / 100;
    const bmiValue = w / (heightInMeters * heightInMeters);
    const bmi = Math.round(bmiValue * 10) / 10;

    let bmrValue: number;
    if (gender === "male") {
      bmrValue = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmrValue = 10 * w + 6.25 * h - 5 * a - 161;
    }
    const bmr = Math.round(bmrValue);

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      "very-active": 1.9,
    };

    let tdeeValue = bmrValue * activityMultipliers[activityLevel as keyof typeof activityMultipliers];

    if (sleepHours === "less-than-6") {
      tdeeValue *= 1.05;
    }

    if (stressLevel === "high" || stressLevel === "very-high") {
      tdeeValue *= 1.03;
    }

    const tdee = Math.round(tdeeValue);

    // Kalorienziel berechnen
    let deficitMultiplier = 500;
    let surplusMultiplier = 300;

    if (sleepHours === "less-than-6" || stressLevel === "high" || stressLevel === "very-high") {
      deficitMultiplier = 350;
    }

    let recommendedCalories = tdee;
    switch (goal) {
      case "lose":
        recommendedCalories = tdee - deficitMultiplier;
        break;
      case "maintain":
        recommendedCalories = tdee;
        break;
      case "gain":
        recommendedCalories = tdee + surplusMultiplier;
        break;
    }

    return {
      bmi,
      bmr,
      tdee,
      height,
      weight,
      age,
      gender,
      goal,
      activityLevel,
      sleepHours,
      stressLevel,
      recommendedCalories,
    };
  };

  const nextStep = () => {
    // Wenn letzter Schritt (Step 6 - Stress), dann direkt zur Booking-Seite
    if (currentStep === 6) {
      const healthData = calculateMetrics();
      if (healthData) {
        navigate("/booking", { state: { healthData } });
      }
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return goal !== "";
      case 1:
        return gender !== "";
      case 2:
        return age !== "" && parseFloat(age) > 0;
      case 3:
        return height !== "" && weight !== "" && parseFloat(height) > 0 && parseFloat(weight) > 0;
      case 4:
        return activityLevel !== "";
      case 5:
        return sleepHours !== "";
      case 6:
        return stressLevel !== "";
      default:
        return true;
    }
  };

  const fadeVariants = {
    enter: { opacity: 0, scale: 0.98 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            key="step0"
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-nf-red/10 rounded-full mb-4">
                  <ClipboardList className="h-8 w-8 text-nf-red" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-nf-black leading-tight">
                  Ein paar Fragen zu dir
                </h1>

                <p className="text-xl md:text-2xl text-nf-gray max-w-2xl mx-auto leading-relaxed">
                  Damit wir uns optimal auf dein Beratungsgespräch vorbereiten können.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <Label className="text-lg md:text-xl font-bold text-nf-black block text-center">
                Was ist dein Hauptziel?
              </Label>

              <div className="grid gap-3 md:gap-4">
                {[
                  {
                    value: "lose",
                    icon: TrendingUp,
                    gradient: "from-red-500 to-orange-500",
                    label: "Abnehmen",
                    desc: "Erreiche dein Wunschgewicht nachhaltig",
                  },
                  {
                    value: "maintain",
                    icon: Activity,
                    gradient: "from-green-500 to-emerald-500",
                    label: "Gesunder Lifestyle",
                    desc: "Halte dein Gewicht und fühle dich wohl",
                  },
                  {
                    value: "gain",
                    icon: Award,
                    gradient: "from-blue-500 to-cyan-500",
                    label: "Zunehmen",
                    desc: "Baue gesund Muskeln und Masse auf",
                  },
                ].map((option) => {
                  const IconComponent = option.icon;
                  const isSelected = goal === option.value;
                  return (
                    <motion.button
                      key={option.value}
                      onClick={() => setGoal(option.value)}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative p-5 md:p-6 rounded-xl text-left transition-all duration-300 group ${
                        isSelected
                          ? "bg-gradient-to-br " +
                            option.gradient +
                            " text-white shadow-2xl ring-4 ring-offset-2 ring-nf-red/30"
                          : "bg-white border-2 border-gray-200 hover:border-nf-red/50 hover:shadow-lg"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                            isSelected ? "bg-white/20" : "bg-gradient-to-br " + option.gradient + " group-hover:scale-110"
                          }`}
                        >
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`font-bold text-lg md:text-xl mb-1 ${isSelected ? "text-white" : "text-nf-black"}`}>
                            {option.label}
                          </div>
                          <div className={`text-sm md:text-base ${isSelected ? "text-white/90" : "text-nf-gray"}`}>
                            {option.desc}
                          </div>
                        </div>
                        {isSelected && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-4 right-4">
                            <div className="bg-white rounded-full p-1">
                              <CheckCircle2 className="h-5 w-5 text-nf-red" />
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            key="step1"
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="text-center mb-6 md:mb-8">
              <Users className="h-12 w-12 md:h-16 md:w-16 text-nf-red mx-auto mb-3 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-nf-black mb-2">Über dich</h3>
              <p className="text-sm md:text-base text-nf-gray">
                Diese Infos helfen uns, dein Gespräch <span className="font-semibold text-nf-red">perfekt vorzubereiten</span>
              </p>
            </div>
            <div className="space-y-3">
              <Label className="text-base md:text-lg font-semibold">Geschlecht</Label>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[
                  { value: "male", label: "👨 Männlich" },
                  { value: "female", label: "👩 Weiblich" },
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => setGender(option.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 md:p-6 rounded-lg border-2 text-center transition-all duration-200 relative ${
                      gender === option.value
                        ? "border-nf-red bg-nf-red/10 shadow-lg ring-2 ring-nf-red/20"
                        : "border-gray-200 hover:border-nf-red/50 hover:bg-gray-50"
                    }`}
                  >
                    <div className="text-lg md:text-xl font-semibold">{option.label}</div>
                    {gender === option.value && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2">
                        <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-nf-red" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="text-center mb-6 md:mb-8">
              <CheckCircle2 className="h-12 w-12 md:h-16 md:w-16 text-nf-red mx-auto mb-3 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-nf-black mb-2">Wie alt bist du?</h3>
              <p className="text-sm md:text-base text-nf-gray">
                Das Alter spielt eine wichtige Rolle für deine{" "}
                <span className="font-semibold text-nf-red">individuelle Beratung</span>
              </p>
            </div>
            <div className="space-y-3">
              <Label htmlFor="age" className="text-base md:text-lg font-semibold">
                Alter (Jahre)
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="30"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="text-xl md:text-2xl h-14 md:h-16 text-center"
                autoFocus
              />
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="text-center mb-6 md:mb-8">
              <TrendingUp className="h-12 w-12 md:h-16 md:w-16 text-nf-red mx-auto mb-3 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-nf-black mb-2">Deine Körpermaße</h3>
              <p className="text-sm md:text-base text-nf-gray">
                Diese Daten helfen uns, deine <span className="font-semibold text-nf-red">Ausgangssituation</span> zu verstehen
              </p>
            </div>
            <div className="space-y-4 md:space-y-5">
              <div className="space-y-2">
                <Label htmlFor="height" className="text-base md:text-lg font-semibold">
                  Körpergröße (cm)
                </Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="text-xl md:text-2xl h-14 md:h-16 text-center"
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-base md:text-lg font-semibold">
                  Gewicht (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="text-xl md:text-2xl h-14 md:h-16 text-center"
                />
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="text-center mb-6 md:mb-8">
              <Flame className="h-12 w-12 md:h-16 md:w-16 text-nf-red mx-auto mb-3 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-nf-black mb-2">Wie aktiv bist du?</h3>
              <p className="text-sm md:text-base text-nf-gray">
                Dein Aktivitätslevel ist wichtig für deinen{" "}
                <span className="font-semibold text-nf-red">personalisierten Plan</span>
              </p>
            </div>
            <div className="space-y-3">
              <Label className="text-base md:text-lg font-semibold">Aktivitätslevel</Label>
              <div className="grid gap-3">
                {[
                  { value: "sedentary", label: "🪑 Wenig Bewegung", desc: "Bürojob, wenig Sport" },
                  { value: "light", label: "🚶 Leicht aktiv", desc: "1-3 Tage Sport/Woche" },
                  { value: "moderate", label: "🏃 Moderat aktiv", desc: "3-5 Tage Sport/Woche" },
                  { value: "active", label: "💪 Sehr aktiv", desc: "6-7 Tage Sport/Woche" },
                  { value: "very-active", label: "🔥 Extrem aktiv", desc: "Zweimal täglich Training" },
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => setActivityLevel(option.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 md:p-4 rounded-lg border-2 text-left transition-all duration-200 relative ${
                      activityLevel === option.value
                        ? "border-nf-red bg-nf-red/10 shadow-lg ring-2 ring-nf-red/20"
                        : "border-gray-200 hover:border-nf-red/50 hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-semibold text-sm md:text-base text-nf-black">{option.label}</div>
                    <div className="text-xs md:text-sm text-nf-gray">{option.desc}</div>
                    {activityLevel === option.value && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2">
                        <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-nf-red" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            key="step5"
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="text-center mb-6 md:mb-8">
              <Moon className="h-12 w-12 md:h-16 md:w-16 text-nf-red mx-auto mb-3 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-nf-black mb-2">Wie ist dein Schlaf?</h3>
              <p className="text-sm md:text-base text-nf-gray">
                Schlaf ist ein <span className="font-semibold text-nf-red">wichtiger Faktor</span> für deinen Erfolg
              </p>
            </div>
            <div className="space-y-3">
              <Label className="text-base md:text-lg font-semibold">Durchschnittliche Schlafdauer</Label>
              <div className="grid gap-3">
                {[
                  { value: "less-than-6", label: "😴 Weniger als 6h", desc: "Zu wenig Schlaf" },
                  { value: "6-7", label: "😊 6-7 Stunden", desc: "Akzeptabel" },
                  { value: "7-8", label: "✨ 7-8 Stunden", desc: "Optimal!" },
                  { value: "more-than-8", label: "😴 Mehr als 8h", desc: "Sehr gut" },
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => setSleepHours(option.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 md:p-4 rounded-lg border-2 text-left transition-all duration-200 relative ${
                      sleepHours === option.value
                        ? "border-nf-red bg-nf-red/10 shadow-lg ring-2 ring-nf-red/20"
                        : "border-gray-200 hover:border-nf-red/50 hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-semibold text-sm md:text-base text-nf-black">{option.label}</div>
                    <div className="text-xs md:text-sm text-nf-gray">{option.desc}</div>
                    {sleepHours === option.value && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2">
                        <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-nf-red" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            key="step6"
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="text-center mb-6 md:mb-8">
              <Brain className="h-12 w-12 md:h-16 md:w-16 text-nf-red mx-auto mb-3 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-nf-black mb-2">Wie gestresst bist du?</h3>
              <p className="text-sm md:text-base text-nf-gray">
                Stress beeinflusst deine <span className="font-semibold text-nf-red">Gesundheit</span> und{" "}
                <span className="font-semibold text-nf-red">Ergebnisse</span>
              </p>
            </div>
            <div className="space-y-3">
              <Label className="text-base md:text-lg font-semibold">Aktuelles Stresslevel</Label>
              <div className="grid gap-3">
                {[
                  { value: "low", label: "🧘 Niedrig", desc: "Entspannt, gut im Griff" },
                  { value: "medium", label: "😊 Mittel", desc: "Manchmal gestresst" },
                  { value: "high", label: "😰 Hoch", desc: "Dauerhaft unter Druck" },
                  { value: "very-high", label: "🔥 Sehr hoch", desc: "Überwältigt" },
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => setStressLevel(option.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 md:p-4 rounded-lg border-2 text-left transition-all duration-200 relative ${
                      stressLevel === option.value
                        ? "border-nf-red bg-nf-red/10 shadow-lg ring-2 ring-nf-red/20"
                        : "border-gray-200 hover:border-nf-red/50 hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-semibold text-sm md:text-base text-nf-black">{option.label}</div>
                    <div className="text-xs md:text-sm text-nf-gray">{option.desc}</div>
                    {stressLevel === option.value && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2">
                        <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-nf-red" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-nf-light">
      <Navigation />

      <main className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentStep >= 1 && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 md:mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs md:text-sm text-nf-gray">
                  Schritt {currentStep + 1} von {totalSteps}
                </span>
                <span className="text-xs md:text-sm font-semibold text-nf-red">
                  {Math.round(((currentStep + 1) / totalSteps) * 100)}% komplett
                </span>
              </div>
              <Progress value={((currentStep + 1) / totalSteps) * 100} className="h-2" />
            </motion.div>
          )}

          <Card className="shadow-elegant border-t-4 border-nf-red">
            <CardContent className="p-6 md:p-8">
              <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

              <div className="flex gap-2 md:gap-3 mt-6 md:mt-8">
                {currentStep > 0 && (
                  <Button onClick={prevStep} variant="outline" className="flex-1 text-sm md:text-base">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Zurück
                  </Button>
                )}
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className={`bg-nf-red hover:bg-nf-red/90 text-white font-semibold text-sm md:text-base ${
                    currentStep === 0 ? "flex-1" : "flex-[2]"
                  }`}
                >
                  {currentStep === 6 ? (
                    <>
                      Weiter zur Terminbuchung
                      <Calendar className="h-4 w-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Weiter
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {currentStep === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 md:mt-6 text-center text-xs md:text-sm text-nf-gray"
            >
              <p>✓ Über 500 zufriedene Kunden ✓ Kostenlose Beratung ✓ Unverbindlich</p>
            </motion.div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-nf-gray">
            <p>© 2024 NutriForm. Alle Rechte vorbehalten.</p>
            <div className="flex justify-center gap-4 mt-2">
              <Link to="/datenschutz" className="hover:text-nf-red transition-colors">
                Datenschutz
              </Link>
              <span>•</span>
              <Link to="/impressum" className="hover:text-nf-red transition-colors">
                Impressum
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TerminVorbereitungPage;
