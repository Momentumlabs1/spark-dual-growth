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
    // Poor sleep increases metabolic demand
    if (sleepHours === "less-than-6") {
      tdeeValue *= 1.05; // 5% increase due to stress on body
    }

    // High stress increases cortisol and metabolic rate
    if (stressLevel === "high" || stressLevel === "very-high") {
      tdeeValue *= 1.03; // 3% increase
    }

    setTDEE(Math.round(tdeeValue));
  };

  const getBMICategory = (bmiValue: number) => {
    if (bmiValue < 18.5) return { category: "Untergewicht", color: "hsl(var(--chart-1))", bgColor: "bg-blue-50" };
    if (bmiValue < 25) return { category: "Normalgewicht", color: "hsl(var(--chart-2))", bgColor: "bg-green-50" };
    if (bmiValue < 30) return { category: "Übergewicht", color: "hsl(var(--chart-3))", bgColor: "bg-yellow-50" };
    return { category: "Adipositas", color: "hsl(var(--chart-4))", bgColor: "bg-red-50" };
  };

  const getBMIAdvice = (bmiValue: number) => {
    if (bmiValue < 18.5) return "Wir helfen dir, auf gesunde Weise zuzunehmen.";
    if (bmiValue < 25) return "Großartig! Wir helfen dir, dein Gewicht zu halten.";
    if (bmiValue < 30) return "Wir helfen dir, nachhaltig abzunehmen.";
    return "Wir begleiten dich professionell auf deinem Weg.";
  };

  const getCalorieGoal = (tdeeValue: number, goalType: string) => {
    // Adjust deficit/surplus based on stress and sleep
    let deficitMultiplier = 500;
    let surplusMultiplier = 300;

    // Reduce deficit if poor sleep or high stress (body needs more recovery)
    if (sleepHours === "less-than-6" || stressLevel === "high" || stressLevel === "very-high") {
      deficitMultiplier = 350; // Smaller deficit for better adherence
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

    // Sleep insights
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

    // Stress insights
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

    // Combined poor sleep + high stress
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
        { name: "Rest", value: Math.max(0, 35 - bmi), fill: "hsl(var(--muted))" },
      ]
    : [];

  const calorieChartData = tdee
    ? [
        { name: "Abnehmen", value: getCalorieGoal(tdee, "lose"), fill: "hsl(var(--chart-1))" },
        { name: "Halten", value: tdee, fill: "hsl(var(--chart-2))" },
        { name: "Zunehmen", value: getCalorieGoal(tdee, "gain"), fill: "hsl(var(--chart-3))" },
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

  // ✅ VERBESSERTE ANIMATIONEN - Nur sanftes Fade, kein störender Slide-Effekt!
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
              <Target className="h-16 w-16 text-nf-red mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-nf-black mb-2">Willkommen zum Gesundheits-Check!</h3>
              <p className="text-nf-gray">
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
                    className={`p-4 rounded-lg border-2 text-left transition-all duration-200 relative ${
                      goal === option.value
                        ? "border-nf-red bg-nf-red/10 shadow-lg ring-2 ring-nf-red/20"
                        : "border-gray-200 hover:border-nf-red/50 hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-semibold text-nf-black">{option.label}</div>
                    <div className="text-sm text-nf-gray">{option.desc}</div>
                    {goal === option.value && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2">
                        <CheckCircle2 className="h-5 w-5 text-nf-red" />
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
            <div className="text-center mb-8">
              <Users className="h-16 w-16 text-nf-red mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-nf-black mb-2">Über dich</h3>
              <p className="text-nf-gray">
                Wir passen die <span className="font-semibold text-nf-red">Berechnung</span> auf dich an
              </p>
            </div>
            <div className="space-y-3">
              <Label className="text-lg font-semibold">Geschlecht</Label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "male", label: "👨 Männlich" },
                  { value: "female", label: "👩 Weiblich" },
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => setGender(option.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-6 rounded-lg border-2 text-center transition-all duration-200 relative ${
                      gender === option.value
                        ? "border-nf-red bg-nf-red/10 shadow-lg ring-2 ring-nf-red/20"
                        : "border-gray-200 hover:border-nf-red/50 hover:bg-gray-50"
                    }`}
                  >
                    <div className="text-xl font-semibold">{option.label}</div>
                    {gender === option.value && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2">
                        <CheckCircle2 className="h-5 w-5 text-nf-red" />
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
            <div className="text-center mb-8">
              <CheckCircle2 className="h-16 w-16 text-nf-red mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-nf-black mb-2">Wie alt bist du?</h3>
              <p className="text-nf-gray">
                Das Alter beeinflusst deinen <span className="font-semibold text-nf-red">Kalorienbedarf</span>
              </p>
            </div>
            <div className="space-y-3">
              <Label htmlFor="age" className="text-lg font-semibold">
                Alter (Jahre)
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="30"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="text-2xl h-16 text-center"
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
            <div className="text-center mb-8">
              <TrendingUp className="h-16 w-16 text-nf-red mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-nf-black mb-2">Deine Körpermaße</h3>
              <p className="text-nf-gray">
                Damit berechnen wir deinen <span className="font-semibold text-nf-red">BMI</span>
              </p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="height" className="text-lg font-semibold">
                  Körpergröße (cm)
                </Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="text-2xl h-16 text-center"
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-lg font-semibold">
                  Gewicht (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="text-2xl h-16 text-center"
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
            <div className="text-center mb-8">
              <Flame className="h-16 w-16 text-nf-red mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-nf-black mb-2">Wie aktiv bist du?</h3>
              <p className="text-nf-gray">
                Damit berechnen wir deinen täglichen <span className="font-semibold text-nf-red">Kalorienbedarf</span>
              </p>
            </div>
            <div className="space-y-3">
              <Label className="text-lg font-semibold">Aktivitätslevel</Label>
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
                    className={`p-4 rounded-lg border-2 text-left transition-all duration-200 relative ${
                      activityLevel === option.value
                        ? "border-nf-red bg-nf-red/10 shadow-lg ring-2 ring-nf-red/20"
                        : "border-gray-200 hover:border-nf-red/50 hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-semibold text-nf-black">{option.label}</div>
                    <div className="text-sm text-nf-gray">{option.desc}</div>
                    {activityLevel === option.value && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2">
                        <CheckCircle2 className="h-5 w-5 text-nf-red" />
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
            <div className="text-center mb-8">
              <Moon className="h-16 w-16 text-nf-red mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-nf-black mb-2">Wie ist dein Schlaf?</h3>
              <p className="text-nf-gray">
                Schlaf beeinflusst deinen <span className="font-semibold text-nf-red">Stoffwechsel massiv</span>
              </p>
            </div>
            <div className="space-y-3">
              <Label className="text-lg font-semibold">Durchschnittliche Schlafdauer</Label>
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
                    className={`p-4 rounded-lg border-2 text-left transition-all duration-200 relative ${
                      sleepHours === option.value
                        ? "border-nf-red bg-nf-red/10 shadow-lg ring-2 ring-nf-red/20"
                        : "border-gray-200 hover:border-nf-red/50 hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-semibold text-nf-black">{option.label}</div>
                    <div className="text-sm text-nf-gray">{option.desc}</div>
                    {sleepHours === option.value && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2">
                        <CheckCircle2 className="h-5 w-5 text-nf-red" />
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
            <div className="text-center mb-8">
              <Brain className="h-16 w-16 text-nf-red mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-nf-black mb-2">Wie gestresst bist du?</h3>
              <p className="text-nf-gray">
                Stress erhöht <span className="font-semibold text-nf-red">Cortisol</span> und beeinflusst deine{" "}
                <span className="font-semibold text-nf-red">Ergebnisse</span>
              </p>
            </div>
            <div className="space-y-3">
              <Label className="text-lg font-semibold">Aktuelles Stresslevel</Label>
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
                    className={`p-4 rounded-lg border-2 text-left transition-all duration-200 relative ${
                      stressLevel === option.value
                        ? "border-nf-red bg-nf-red/10 shadow-lg ring-2 ring-nf-red/20"
                        : "border-gray-200 hover:border-nf-red/50 hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-semibold text-nf-black">{option.label}</div>
                    <div className="text-sm text-nf-gray">{option.desc}</div>
                    {stressLevel === option.value && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2">
                        <CheckCircle2 className="h-5 w-5 text-nf-red" />
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

        return (
          <motion.div
            key="step7"
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-nf-black mb-2">Deine Ergebnisse sind bereit! 🎉</h3>
              <p className="text-nf-gray">Hier ist deine persönliche Analyse</p>
            </div>

            {/* BMI Card */}
            {bmi && (
              <Card className="shadow-elegant border-2 border-nf-red/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-nf-red" />
                    Dein BMI
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-nf-black mb-3">{bmi}</div>
                    <Badge variant="secondary" className={`text-lg px-4 py-2 ${getBMICategory(bmi).bgColor}`}>
                      {getBMICategory(bmi).category}
                    </Badge>
                  </div>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={bmiChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={50}
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
                  <p className="text-center text-nf-gray">{getBMIAdvice(bmi)}</p>
                </CardContent>
              </Card>
            )}

            {/* Calorie Card */}
            {tdee && bmr && (
              <Card className="shadow-elegant border-2 border-nf-red/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-nf-red" />
                    Dein Kalorienbedarf
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-nf-light rounded-lg">
                      <div className="text-3xl font-bold text-nf-black">{bmr}</div>
                      <div className="text-sm text-nf-gray mt-1">Grundumsatz (BMR)</div>
                    </div>
                    <div className="p-4 bg-nf-red/10 rounded-lg">
                      <div className="text-3xl font-bold text-nf-red">{tdee}</div>
                      <div className="text-sm text-nf-gray mt-1">Tagesbedarf (TDEE)</div>
                    </div>
                  </div>

                  {goal && (
                    <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                      <div className="text-center">
                        <div className="text-sm text-nf-gray mb-1">
                          {goal === "lose" && "Zum Abnehmen empfohlen:"}
                          {goal === "maintain" && "Zum Gewicht halten:"}
                          {goal === "gain" && "Zum Zunehmen empfohlen:"}
                        </div>
                        <div className="text-4xl font-bold text-nf-black">
                          {getCalorieGoal(tdee, goal)}
                          <span className="text-lg ml-1">kcal</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={calorieChartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                        <XAxis dataKey="name" fontSize={11} stroke="hsl(var(--muted-foreground))" />
                        <YAxis hide />
                        <Tooltip
                          formatter={(value) => [`${value} kcal`, "Kalorien"]}
                          labelStyle={{ color: "hsl(var(--foreground))" }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Lifestyle Insights */}
            {insights.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-nf-black text-lg">📊 Deine Lifestyle-Analyse</h4>
                {insights.map((insight, index) => (
                  <Alert
                    key={index}
                    className={`border-2 ${
                      insight.type === "warning"
                        ? "bg-orange-50 border-orange-200"
                        : insight.type === "success"
                          ? "bg-green-50 border-green-200"
                          : "bg-blue-50 border-blue-200"
                    }`}
                  >
                    <AlertDescription>
                      <div className="flex gap-3">
                        <div className="text-2xl">{insight.icon}</div>
                        <div>
                          <div className="font-semibold text-nf-black mb-1">{insight.title}</div>
                          <div className="text-sm text-nf-gray">{insight.description}</div>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            )}

            {/* CTA Section - KOMPAKT */}
            <div className="bg-gradient-to-br from-nf-red to-nf-red/80 p-5 rounded-lg text-white">
              <h4 className="text-xl font-bold mb-2">🎯 Bereit, deine Ziele zu erreichen?</h4>
              <p className="mb-3 opacity-90 text-sm">Sichere dir jetzt dein kostenloses Beratungsgespräch!</p>
              <Button
                onClick={() => {
                  // ✅ WEITERLEITUNG ZUM BOOKING:

                  // Option 1 - Standard HTML (funktioniert immer):
                  window.location.href = "/booking";

                  // Option 2 - React Router:
                  // navigate('/booking');

                  // Option 3 - Next.js App Router:
                  // router.push('/booking');

                  // Option 4 - Komponente im gleichen Projekt anzeigen:
                  // setShowBooking(true);
                }}
                className="w-full bg-white text-nf-red hover:bg-gray-100 font-bold py-5 text-base"
                size="lg"
              >
                Jetzt Termin buchen →
              </Button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="bmi-rechner" className="py-20 bg-nf-light">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar - Only show after first step */}
        {currentStep >= 1 && currentStep < 7 && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-nf-gray">
                Schritt {currentStep + 1} von {totalSteps}
              </span>
              <span className="text-sm font-semibold text-nf-red">
                {Math.round(((currentStep + 1) / totalSteps) * 100)}% komplett
              </span>
            </div>
            <Progress value={((currentStep + 1) / totalSteps) * 100} className="h-2" />
          </motion.div>
        )}

        {/* Main Card */}
        <Card className="shadow-elegant border-t-4 border-nf-red">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep < 7 && (
              <div className="flex gap-3 mt-8">
                {currentStep > 0 && (
                  <Button onClick={prevStep} variant="outline" className="flex-1">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Zurück
                  </Button>
                )}
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className={`bg-nf-red hover:bg-nf-red/90 text-white font-semibold ${
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
            className="mt-6 text-center text-sm text-nf-gray"
          >
            <p>✓ Über 500 zufriedene Kunden ✓ Wissenschaftlich fundiert ✓ 100% kostenlos</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BMICalculatorFunnel;
