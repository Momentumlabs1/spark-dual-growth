import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// 📍 ROUTING SETUP:
// Für React Router: import { useNavigate } from 'react-router-dom';
// Für Next.js: import { useRouter } from 'next/router'; oder import { useRouter } from 'next/navigation';

const BMICalculatorFunnel = () => {
  // Für React Router: const navigate = useNavigate();
  // Für Next.js: const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [sleepHours, setSleepHours] = useState<string>("");
  const [stressLevel, setStressLevel] = useState<string>("");
  const [bmi, setBMI] = useState<number | null>(null);
  const [bmr, setBMR] = useState<number | null>(null);
  const [tdee, setTDEE] = useState<number | null>(null);

  const totalSteps = 8;

  const calculateMetrics = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseFloat(age);

    if (!h || !w || !a || h <= 0 || w <= 0 || a <= 0 || !gender || !activityLevel) return;

    // Calculate BMI
    const heightInMeters = h / 100;
    const bmiValue = w / (heightInMeters * heightInMeters);
    setBMI(Math.round(bmiValue * 10) / 10);

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmrValue: number;
    if (gender === "male") {
      bmrValue = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmrValue = 10 * w + 6.25 * h - 5 * a - 161;
    }
    setBMR(Math.round(bmrValue));

    // Calculate TDEE based on activity level
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      "very-active": 1.9,
    };

    let tdeeValue = bmrValue * activityMultipliers[activityLevel as keyof typeof activityMultipliers];

    // Adjust TDEE based on sleep and stress
    if (sleepHours === "less-than-6") {
      tdeeValue *= 1.05;
    }

    if (stressLevel === "high" || stressLevel === "very-high") {
      tdeeValue *= 1.03;
    }

    setTDEE(Math.round(tdeeValue));
  };

  const getBMICategory = (bmiValue: number) => {
    if (bmiValue < 18.5)
      return {
        category: "Untergewicht",
        color: "#3B82F6",
        bgColor: "bg-blue-500",
        textColor: "text-white",
        borderColor: "border-blue-500",
      };
    if (bmiValue < 25)
      return {
        category: "Normalgewicht",
        color: "#10B981",
        bgColor: "bg-green-500",
        textColor: "text-white",
        borderColor: "border-green-500",
      };
    if (bmiValue < 30)
      return {
        category: "Übergewicht",
        color: "#F59E0B",
        bgColor: "bg-orange-500",
        textColor: "text-white",
        borderColor: "border-orange-500",
      };
    return {
      category: "Adipositas",
      color: "#EF4444",
      bgColor: "bg-red-500",
      textColor: "text-white",
      borderColor: "border-red-500",
    };
  };

  const getBMIAdvice = (bmiValue: number) => {
    if (bmiValue < 18.5) return "Wir helfen dir, auf gesunde Weise zuzunehmen.";
    if (bmiValue < 25) return "Großartig! Wir helfen dir, dein Gewicht zu halten.";
    if (bmiValue < 30) return "Wir helfen dir, nachhaltig abzunehmen.";
    return "Wir begleiten dich professionell auf deinem Weg.";
  };

  const getCalorieGoal = (tdeeValue: number, goalType: string) => {
    let deficitMultiplier = 500;
    let surplusMultiplier = 300;

    if (sleepHours === "less-than-6" || stressLevel === "high" || stressLevel === "very-high") {
      deficitMultiplier = 350;
    }

    switch (goalType) {
      case "lose":
        return tdeeValue - deficitMultiplier;
      case "maintain":
        return tdeeValue;
      case "gain":
        return tdeeValue + surplusMultiplier;
      default:
        return tdeeValue;
    }
  };

  const getLifestyleInsights = () => {
    const insights = [];

    if (sleepHours === "less-than-6") {
      insights.push({
        type: "warning",
        icon: "😴",
        title: "Schlafmangel erkannt",
        description:
          "Weniger als 6 Stunden Schlaf erhöhen Hunger-Hormone und erschweren das Abnehmen um bis zu 20%. Wir zeigen dir, wie du deinen Schlaf optimierst.",
      });
    } else if (sleepHours === "6-7") {
      insights.push({
        type: "info",
        icon: "😊",
        title: "Schlaf könnte besser sein",
        description: "7-8 Stunden sind optimal für maximale Ergebnisse. Kleine Anpassungen können große Wirkung haben.",
      });
    } else if (sleepHours === "7-8" || sleepHours === "more-than-8") {
      insights.push({
        type: "success",
        icon: "✨",
        title: "Optimaler Schlaf",
        description: "Super! Dein Schlaf unterstützt deinen Stoffwechsel optimal.",
      });
    }

    if (stressLevel === "very-high") {
      insights.push({
        type: "warning",
        icon: "🔥",
        title: "Hohes Stresslevel",
        description:
          "Chronischer Stress erhöht Cortisol und führt zu mehr Bauchfett. Stressmanagement ist ein wichtiger Teil deines Plans.",
      });
    } else if (stressLevel === "high") {
      insights.push({
        type: "info",
        icon: "⚡",
        title: "Erhöhter Stress",
        description: "Stress beeinflusst deine Ergebnisse. Wir integrieren Entspannungsstrategien in deinen Plan.",
      });
    } else if (stressLevel === "low") {
      insights.push({
        type: "success",
        icon: "🧘",
        title: "Ausgeglichen",
        description: "Perfekt! Dein niedriges Stresslevel ist eine solide Basis für schnelle Fortschritte.",
      });
    }

    if (sleepHours === "less-than-6" && (stressLevel === "high" || stressLevel === "very-high")) {
      insights.push({
        type: "warning",
        icon: "⚠️",
        title: "Doppelbelastung",
        description:
          "Die Kombination aus Schlafmangel und Stress macht Abnehmen besonders schwer. Ein ganzheitlicher Ansatz ist essentiell!",
      });
    }

    return insights;
  };

  const bmiChartData = bmi
    ? [
        { name: "Dein BMI", value: bmi, fill: getBMICategory(bmi).color },
        { name: "Rest", value: Math.max(0, 35 - bmi), fill: "#E5E7EB" },
      ]
    : [];

  const calorieChartData = tdee
    ? [
        { name: "Abnehmen", value: getCalorieGoal(tdee, "lose"), fill: "#EF4444" },
        { name: "Halten", value: tdee, fill: "#10B981" },
        { name: "Zunehmen", value: getCalorieGoal(tdee, "gain"), fill: "#3B82F6" },
      ]
    : [];

  const scrollToContact = () => {
    const element = document.querySelector("#kontakt");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const nextStep = () => {
    if (currentStep === 6) {
      calculateMetrics();
    }
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
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
    enter: {
      opacity: 0,
      scale: 0.98,
    },
    center: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.98,
    },
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
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <Target className="h-12 w-12 md:h-16 md:w-16 text-nf-red mx-auto mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-nf-black mb-2">Willkommen zum Gesundheits-Check!</h3>
              <p className="text-sm md:text-base text-nf-gray">
                In nur <span className="font-semibold text-nf-red">2 Minuten</span> erfährst du deinen BMI und
                personalisierten Kalorienbedarf
              </p>
            </div>
            <div className="space-y-3">
              <Label className="text-lg font-semibold">Was ist dein Hauptziel?</Label>
              <div className="grid gap-3">
                {[
                  { value: "lose", label: "🔥 Abnehmen", desc: "Gewicht verlieren" },
                  { value: "maintain", label: "⚖️ Gewicht halten", desc: "Aktuelle Form beibehalten" },
                  { value: "gain", label: "💪 Zunehmen", desc: "Muskeln aufbauen" },
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => setGoal(option.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 md:p-4 rounded-lg border-2 text-left transition-all duration-200 relative ${
                      goal === option.value
                        ? "border-nf-red bg-nf-red/10 shadow-lg ring-2 ring-nf-red/20"
                        : "border-gray-200 hover:border-nf-red/50 hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-semibold text-sm md:text-base text-nf-black">{option.label}</div>
                    <div className="text-xs md:text-sm text-nf-gray">{option.desc}</div>
                    {goal === option.value && (
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

      case 1:
        return (
          <motion.div
            key="step1"
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="space-y-6"
          >
            <div className="text-center mb-6 md:mb-8">
              <Users className="h-12 w-12 md:h-16 md:w-16 text-nf-red mx-auto mb-3 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-nf-black mb-2">Über dich</h3>
              <p className="text-sm md:text-base text-nf-gray">
                Wir passen die <span className="font-semibold text-nf-red">Berechnung</span> auf dich an
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
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="space-y-6"
          >
            <div className="text-center mb-6 md:mb-8">
              <CheckCircle2 className="h-12 w-12 md:h-16 md:w-16 text-nf-red mx-auto mb-3 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-nf-black mb-2">Wie alt bist du?</h3>
              <p className="text-sm md:text-base text-nf-gray">
                Das Alter beeinflusst deinen <span className="font-semibold text-nf-red">Kalorienbedarf</span>
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
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="space-y-6"
          >
            <div className="text-center mb-6 md:mb-8">
              <TrendingUp className="h-12 w-12 md:h-16 md:w-16 text-nf-red mx-auto mb-3 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-nf-black mb-2">Deine Körpermaße</h3>
              <p className="text-sm md:text-base text-nf-gray">
                Damit berechnen wir deinen <span className="font-semibold text-nf-red">BMI</span>
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
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="space-y-6"
          >
            <div className="text-center mb-6 md:mb-8">
              <Flame className="h-12 w-12 md:h-16 md:w-16 text-nf-red mx-auto mb-3 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-nf-black mb-2">Wie aktiv bist du?</h3>
              <p className="text-sm md:text-base text-nf-gray">
                Damit berechnen wir deinen täglichen <span className="font-semibold text-nf-red">Kalorienbedarf</span>
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
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="space-y-6"
          >
            <div className="text-center mb-6 md:mb-8">
              <Moon className="h-12 w-12 md:h-16 md:w-16 text-nf-red mx-auto mb-3 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-nf-black mb-2">Wie ist dein Schlaf?</h3>
              <p className="text-sm md:text-base text-nf-gray">
                Schlaf beeinflusst deinen <span className="font-semibold text-nf-red">Stoffwechsel massiv</span>
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
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="space-y-6"
          >
            <div className="text-center mb-6 md:mb-8">
              <Brain className="h-12 w-12 md:h-16 md:w-16 text-nf-red mx-auto mb-3 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-nf-black mb-2">Wie gestresst bist du?</h3>
              <p className="text-sm md:text-base text-nf-gray">
                Stress erhöht <span className="font-semibold text-nf-red">Cortisol</span> und beeinflusst deine{" "}
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

      case 7:
        const insights = getLifestyleInsights();
        const bmiCategory = bmi ? getBMICategory(bmi) : null;

        return (
          <motion.div
            key="step7"
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="space-y-5"
          >
            {/* Header */}
            <div className="text-center pb-4 border-b-2 border-gray-100">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                <CheckCircle2 className="h-14 w-14 md:h-16 md:w-16 text-green-500 mx-auto mb-3" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-bold text-nf-black mb-2">Deine Ergebnisse sind bereit! 🎉</h3>
              <p className="text-sm md:text-base text-nf-gray">Hier ist deine persönliche Analyse</p>
            </div>

            {/* BMI Section - VERBESSERT */}
            {bmi && bmiCategory && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className={`shadow-lg border-2 ${bmiCategory.borderColor}`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <TrendingUp className="h-5 w-5 text-nf-red" />
                      Dein BMI
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* BMI Value & Category */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="text-5xl md:text-6xl font-bold text-nf-black">{bmi}</div>
                        <div className="text-sm text-nf-gray mt-1">Body Mass Index</div>
                      </div>
                      <div className="flex-shrink-0">
                        <Badge
                          className={`${bmiCategory.bgColor} ${bmiCategory.textColor} text-base md:text-lg px-4 py-2 font-bold shadow-md`}
                        >
                          {bmiCategory.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Chart */}
                    <div className="h-32 md:h-36 bg-gray-50 rounded-lg p-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={bmiChartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={35}
                            outerRadius={55}
                            startAngle={90}
                            endAngle={450}
                            dataKey="value"
                          >
                            {bmiChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Advice */}
                    <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-nf-red">
                      <p className="text-sm md:text-base text-nf-black font-medium">{getBMIAdvice(bmi)}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Calorie Section - VERBESSERT */}
            {tdee && bmr && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card className="shadow-lg border-2 border-orange-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Flame className="h-5 w-5 text-orange-500" />
                      Dein Kalorienbedarf
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Primary Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-2 border-blue-200">
                        <div className="text-xs text-blue-600 font-semibold mb-1">GRUNDUMSATZ</div>
                        <div className="text-3xl font-bold text-blue-900">{bmr}</div>
                        <div className="text-xs text-blue-600 mt-1">kcal/Tag (BMR)</div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border-2 border-orange-200">
                        <div className="text-xs text-orange-600 font-semibold mb-1">GESAMTUMSATZ</div>
                        <div className="text-3xl font-bold text-orange-900">{tdee}</div>
                        <div className="text-xs text-orange-600 mt-1">kcal/Tag (TDEE)</div>
                      </div>
                    </div>

                    {/* Goal-Based Recommendation */}
                    {goal && (
                      <div className="bg-gradient-to-r from-nf-red to-red-600 p-4 rounded-lg text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="h-5 w-5" />
                          <div className="text-xs font-semibold uppercase tracking-wide">
                            {goal === "lose" && "Empfohlen zum Abnehmen"}
                            {goal === "maintain" && "Empfohlen zum Gewicht halten"}
                            {goal === "gain" && "Empfohlen zum Zunehmen"}
                          </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <div className="text-4xl md:text-5xl font-bold">{getCalorieGoal(tdee, goal)}</div>
                          <div className="text-xl">kcal/Tag</div>
                        </div>
                      </div>
                    )}

                    {/* Chart */}
                    <div className="h-40 md:h-48 bg-gray-50 rounded-lg p-3">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={calorieChartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                          <XAxis dataKey="name" fontSize={12} stroke="#6B7280" tick={{ fill: "#374151" }} />
                          <YAxis hide />
                          <Tooltip
                            formatter={(value) => [`${value} kcal`, "Kalorien"]}
                            contentStyle={{
                              backgroundColor: "white",
                              border: "2px solid #E5E7EB",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          />
                          <Bar dataKey="value" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Lifestyle Insights - KOMPAKTER */}
            {insights.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3"
              >
                <h4 className="font-bold text-nf-black text-base md:text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-nf-red" />
                  Deine Lifestyle-Analyse
                </h4>
                <div className="space-y-2">
                  {insights.map((insight, index) => (
                    <Alert
                      key={index}
                      className={`border-l-4 ${
                        insight.type === "warning"
                          ? "bg-orange-50 border-orange-500"
                          : insight.type === "success"
                            ? "bg-green-50 border-green-500"
                            : "bg-blue-50 border-blue-500"
                      }`}
                    >
                      <AlertDescription>
                        <div className="flex gap-3">
                          <div className="text-2xl flex-shrink-0">{insight.icon}</div>
                          <div className="flex-1">
                            <div className="font-bold text-nf-black text-sm mb-1">{insight.title}</div>
                            <div className="text-xs text-nf-gray leading-relaxed">{insight.description}</div>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA Section - OPTIMIERT */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6"
            >
              <div className="bg-gradient-to-br from-nf-red via-red-600 to-red-700 p-5 md:p-6 rounded-xl text-white shadow-2xl">
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Target className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl md:text-2xl font-bold mb-2">Bereit durchzustarten?</h4>
                    <p className="text-sm md:text-base opacity-95 leading-relaxed">
                      Sichere dir jetzt dein <span className="font-bold">kostenloses Beratungsgespräch</span> und starte
                      mit einem personalisierten Plan!
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    // ✅ WEITERLEITUNG ZUM BOOKING:
                    window.location.href = "/booking";
                    // Alternativ mit Router: navigate('/booking') oder router.push('/booking')
                  }}
                  className="w-full bg-white text-nf-red hover:bg-gray-100 font-bold py-5 text-base md:text-lg shadow-lg hover:shadow-xl transition-all"
                  size="lg"
                >
                  <span className="mr-2">🎯</span>
                  Jetzt kostenloses Gespräch buchen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-center text-xs mt-3 opacity-75">
                  ✓ Keine Verpflichtung ✓ 100% kostenlos ✓ Individuell auf dich zugeschnitten
                </p>
              </div>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="bmi-rechner" className="py-12 md:py-20 bg-nf-light">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        {currentStep >= 1 && currentStep < 7 && (
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

        {/* Main Card */}
        <Card className="shadow-elegant border-t-4 border-nf-red">
          <CardContent className="p-6 md:p-8">
            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep < 7 && (
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
                      Ergebnisse anzeigen
                      <Flame className="h-4 w-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Weiter
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        {currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 md:mt-6 text-center text-xs md:text-sm text-nf-gray"
          >
            <p>✓ Über 500 zufriedene Kunden ✓ Wissenschaftlich fundiert ✓ 100% kostenlos</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BMICalculatorFunnel;
