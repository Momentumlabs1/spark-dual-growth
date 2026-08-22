import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
            className="space-y-8"
          >
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-nf-red to-red-600 rounded-full shadow-xl mb-2"
              >
                <Target className="h-10 w-10 md:h-12 md:w-12 text-white" />
              </motion.div>
              
              <div className="space-y-3">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-nf-black leading-tight">
                  Dein persönlicher<br />Gesundheits-Check
                </h3>
                
                <p className="text-base md:text-lg text-nf-gray max-w-md mx-auto leading-relaxed">
                  Erfahre in nur <span className="font-bold text-nf-red">2 Minuten</span> deinen BMI und
                  personalisierten Kalorienbedarf
                </p>
              </div>
            </div>

            {/* Goal Selection */}
            <div className="space-y-4">
              <Label className="text-base md:text-lg font-bold text-nf-black block text-center">
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
                          ? "bg-gradient-to-br " + option.gradient + " text-white shadow-2xl ring-4 ring-offset-2 ring-nf-red/30"
                          : "bg-white border-2 border-gray-200 hover:border-nf-red/50 hover:shadow-lg"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div
                          className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                            isSelected
                              ? "bg-white/20"
                              : "bg-gradient-to-br " + option.gradient + " group-hover:scale-110"
                          }`}
                        >
                          <IconComponent className={`h-6 w-6 ${isSelected ? "text-white" : "text-white"}`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className={`font-bold text-lg md:text-xl mb-1 ${isSelected ? "text-white" : "text-nf-black"}`}>
                            {option.label}
                          </div>
                          <div className={`text-sm md:text-base ${isSelected ? "text-white/90" : "text-nf-gray"}`}>
                            {option.desc}
                          </div>
                        </div>

                        {/* Check Icon */}
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-4 right-4"
                          >
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

            {/* BMI Section - REDESIGNED */}
            {bmi && bmiCategory && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="shadow-xl border-0 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${bmiCategory.color === "#3B82F6" ? "from-blue-500 to-blue-600" : bmiCategory.color === "#10B981" ? "from-green-500 to-green-600" : bmiCategory.color === "#F59E0B" ? "from-orange-500 to-orange-600" : "from-red-500 to-red-600"}`} />
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${bmiCategory.color === "#3B82F6" ? "bg-blue-100" : bmiCategory.color === "#10B981" ? "bg-green-100" : bmiCategory.color === "#F59E0B" ? "bg-orange-100" : "bg-red-100"}`}>
                        <TrendingUp className={`h-5 w-5 ${bmiCategory.color === "#3B82F6" ? "text-blue-600" : bmiCategory.color === "#10B981" ? "text-green-600" : bmiCategory.color === "#F59E0B" ? "text-orange-600" : "text-red-600"}`} />
                      </div>
                      <h4 className="text-xl font-bold text-nf-black">Dein Body Mass Index</h4>
                    </div>

                    <div className="flex items-end justify-between mb-6">
                      <div>
                        <div className="text-6xl md:text-7xl font-bold text-nf-black mb-1">{bmi}</div>
                        <div className="text-sm text-nf-gray">BMI Wert</div>
                      </div>
                      <Badge
                        className={`${bmiCategory.bgColor} ${bmiCategory.textColor} text-lg px-5 py-2 font-bold`}
                      >
                        {bmiCategory.category}
                      </Badge>
                    </div>

                    <div className={`p-4 rounded-xl ${bmiCategory.color === "#3B82F6" ? "bg-blue-50 border-l-4 border-blue-500" : bmiCategory.color === "#10B981" ? "bg-green-50 border-l-4 border-green-500" : bmiCategory.color === "#F59E0B" ? "bg-orange-50 border-l-4 border-orange-500" : "bg-red-50 border-l-4 border-red-500"}`}>
                      <p className="text-nf-black font-medium">{getBMIAdvice(bmi)}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Calorie Section - REDESIGNED */}
            {tdee && bmr && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card className="shadow-xl border-0 overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-orange-500 to-red-500" />
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                        <Flame className="h-5 w-5 text-orange-600" />
                      </div>
                      <h4 className="text-xl font-bold text-nf-black">Dein Kalorienbedarf</h4>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">
                        <div className="text-xs text-blue-600 font-bold mb-2 uppercase tracking-wide">Grundumsatz</div>
                        <div className="text-4xl font-bold text-blue-900 mb-1">{bmr}</div>
                        <div className="text-xs text-blue-600">kcal/Tag (BMR)</div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-xl border border-orange-200">
                        <div className="text-xs text-orange-600 font-bold mb-2 uppercase tracking-wide">Gesamtumsatz</div>
                        <div className="text-4xl font-bold text-orange-900 mb-1">{tdee}</div>
                        <div className="text-xs text-orange-600">kcal/Tag (TDEE)</div>
                      </div>
                    </div>

                    {/* Recommendation */}
                    {goal && (
                      <div className="bg-gradient-to-r from-nf-red to-red-600 p-6 rounded-xl text-white">
                        <div className="flex items-center gap-2 mb-3">
                          <Award className="h-5 w-5" />
                          <div className="text-sm font-bold uppercase tracking-wide">
                            {goal === "lose" && "Empfohlen zum Abnehmen"}
                            {goal === "maintain" && "Empfohlen zum Gewicht halten"}
                            {goal === "gain" && "Empfohlen zum Zunehmen"}
                          </div>
                        </div>
                        <div className="flex items-baseline gap-3">
                          <div className="text-5xl md:text-6xl font-bold">{getCalorieGoal(tdee, goal)}</div>
                          <div className="text-2xl font-semibold">kcal/Tag</div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Lifestyle Insights - REDESIGNED */}
            {insights.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="shadow-xl border-0">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-purple-600" />
                      </div>
                      <h4 className="text-xl font-bold text-nf-black">Deine Lifestyle-Analyse</h4>
                    </div>
                    <div className="space-y-3">
                      {insights.map((insight, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-xl border-l-4 ${
                            insight.type === "warning"
                              ? "bg-orange-50 border-orange-500"
                              : insight.type === "success"
                                ? "bg-green-50 border-green-500"
                                : "bg-blue-50 border-blue-500"
                          }`}
                        >
                          <div className="flex gap-3 items-start">
                            <div className="text-2xl flex-shrink-0">{insight.icon}</div>
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-nf-black mb-1">{insight.title}</div>
                              <div className="text-sm text-nf-gray leading-relaxed">{insight.description}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
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
                    // Ensure metrics are calculated
                    if (!bmi || !bmr || !tdee) {
                      calculateMetrics();
                    }
                    
                    // Build health data object
                    const healthData = {
                      bmi: bmi || 0,
                      bmr: bmr || 0,
                      tdee: tdee || 0,
                      height: height,
                      weight: weight,
                      age: age,
                      gender: gender,
                      goal: goal,
                      activityLevel: activityLevel,
                      sleepHours: sleepHours,
                      stressLevel: stressLevel,
                      recommendedCalories: tdee ? getCalorieGoal(tdee, goal) : 0,
                    };
                    
                    // Navigate with health data
                    navigate('/bewerbung');
                  }}
                  className="w-full bg-white text-nf-red hover:bg-gray-100 font-bold py-5 text-base md:text-lg shadow-lg hover:shadow-xl transition-all"
                  size="lg"
                >
                  <span className="mr-2">🎯</span>
                  Jetzt kostenloses Gespräch anfragen
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