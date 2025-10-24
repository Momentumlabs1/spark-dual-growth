import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calculator,
  Ruler,
  Weight,
  Calendar,
  User,
  Activity,
  TrendingUp,
  Flame,
  Target,
  CheckCircle2,
  Heart,
  ChevronRight,
  Sofa,
  PersonStanding,
  Bike,
  Trophy,
  Dumbbell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
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

interface HealthState {
  isStarted: boolean;
  currentStep: number;
  data: {
    height: string;
    weight: string;
    age: string;
    gender: "male" | "female" | null;
    activityLevel:
      | "sedentary"
      | "light"
      | "moderate"
      | "active"
      | "very-active"
      | null;
  };
  results: {
    bmi: number | null;
    bmr: number | null;
    tdee: number | null;
  };
}

const HealthCalculatorFunnel = () => {
  const [healthState, setHealthState] = useState<HealthState>({
    isStarted: false,
    currentStep: 1,
    data: {
      height: "",
      weight: "",
      age: "",
      gender: null,
      activityLevel: null,
    },
    results: {
      bmi: null,
      bmr: null,
      tdee: null,
    },
  });

  const totalSteps = 6;

  const calculateProgress = () => {
    return Math.round((healthState.currentStep / totalSteps) * 100);
  };

  const startFunnel = () => {
    setHealthState({ ...healthState, isStarted: true });
  };

  const calculateMetrics = () => {
    const h = parseFloat(healthState.data.height);
    const w = parseFloat(healthState.data.weight);
    const a = parseFloat(healthState.data.age);

    if (
      !h ||
      !w ||
      !a ||
      h <= 0 ||
      w <= 0 ||
      a <= 0 ||
      !healthState.data.gender ||
      !healthState.data.activityLevel
    ) {
      console.log("Missing data for calculation");
      return;
    }

    // Calculate BMI
    const heightInMeters = h / 100;
    const bmiValue = w / (heightInMeters * heightInMeters);

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmrValue: number;
    if (healthState.data.gender === "male") {
      bmrValue = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmrValue = 10 * w + 6.25 * h - 5 * a - 161;
    }

    // Calculate TDEE based on activity level
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      "very-active": 1.9,
    };

    const tdeeValue =
      bmrValue *
      activityMultipliers[
        healthState.data.activityLevel as keyof typeof activityMultipliers
      ];

    setHealthState({
      ...healthState,
      currentStep: 6,
      results: {
        bmi: Math.round(bmiValue * 10) / 10,
        bmr: Math.round(bmrValue),
        tdee: Math.round(tdeeValue),
      },
    });
  };

  const nextStep = () => {
    if (healthState.currentStep === 5) {
      // Before going to results, calculate everything
      calculateMetrics();
    } else {
      setHealthState({ ...healthState, currentStep: healthState.currentStep + 1 });
    }
  };

  const previousStep = () => {
    setHealthState({ ...healthState, currentStep: healthState.currentStep - 1 });
  };

  const updateData = (key: string, value: any) => {
    setHealthState({
      ...healthState,
      data: { ...healthState.data, [key]: value },
    });
  };

  const getBMICategory = (bmiValue: number) => {
    if (bmiValue < 18.5)
      return {
        category: "Untergewicht",
        color: "#3b82f6",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
      };
    if (bmiValue < 25)
      return {
        category: "Normalgewicht",
        color: "#22c55e",
        bgColor: "bg-green-50",
        textColor: "text-green-700",
      };
    if (bmiValue < 30)
      return {
        category: "Übergewicht",
        color: "#f59e0b",
        bgColor: "bg-yellow-50",
        textColor: "text-yellow-700",
      };
    return {
      category: "Adipositas",
      color: "#ef4444",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
    };
  };

  const getBMIAdvice = (bmiValue: number) => {
    if (bmiValue < 18.5)
      return "Spreche mit einem Arzt über gesunde Gewichtszunahme.";
    if (bmiValue < 25) return "Großartig! Du hast ein gesundes Gewicht.";
    if (bmiValue < 30)
      return "Leichtes Übergewicht. Wir können dir beim Abnehmen helfen.";
    return "Deutliches Übergewicht. Professionelle Betreuung ist empfehlenswert.";
  };

  const scrollToContact = () => {
    const element = document.querySelector("#kontakt");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const genderOptions = [
    { id: "male", label: "Männlich", icon: User },
    { id: "female", label: "Weiblich", icon: User },
  ];

  const activityOptions = [
    {
      id: "sedentary",
      label: "Wenig/keine Bewegung",
      description: "Bürojob, wenig Sport",
      icon: Sofa,
    },
    {
      id: "light",
      label: "Leichte Aktivität",
      description: "1-3 Tage/Woche Sport",
      icon: PersonStanding,
    },
    {
      id: "moderate",
      label: "Moderate Aktivität",
      description: "3-5 Tage/Woche Sport",
      icon: Bike,
    },
    {
      id: "active",
      label: "Hohe Aktivität",
      description: "6-7 Tage/Woche Sport",
      icon: Dumbbell,
    },
    {
      id: "very-active",
      label: "Sehr hohe Aktivität",
      description: "2x täglich Training",
      icon: Trophy,
    },
  ];

  const bmiChartData = healthState.results.bmi
    ? [
        {
          name: "Dein BMI",
          value: healthState.results.bmi,
          fill: getBMICategory(healthState.results.bmi).color,
        },
        {
          name: "Rest",
          value: Math.max(0, 35 - healthState.results.bmi),
          fill: "#e5e7eb",
        },
      ]
    : [];

  const calorieChartData = healthState.results.tdee
    ? [
        {
          name: "Abnehmen",
          value: healthState.results.tdee - 500,
          fill: "#3b82f6",
        },
        { name: "Halten", value: healthState.results.tdee, fill: "#22c55e" },
        {
          name: "Zunehmen",
          value: healthState.results.tdee + 300,
          fill: "#f59e0b",
        },
      ]
    : [];

  // START SCREEN
  if (!healthState.isStarted) {
    return (
      <section
        id="bmi-rechner"
        className="relative py-24 overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-red-50/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(239,68,68,0.06),transparent_50%)]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center"
          >
            {/* Main Card */}
            <div className="relative bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_70px_-10px_rgba(0,0,0,0.1)] border border-white/20 p-8 md:p-16 overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-nf-red/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-nf-red/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10">
                {/* Header */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-nf-red/10 to-nf-red/5 px-4 py-2 rounded-full mb-6"
                >
                  <div className="w-2 h-2 bg-nf-red rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-nf-red">
                    Wissenschaftlich fundiert
                  </span>
                </motion.div>

                <div className="flex items-center justify-center gap-4 mb-6">
                  <motion.div
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-nf-red/20 blur-xl rounded-full" />
                      <Calculator className="relative h-16 w-16 text-nf-red" />
                    </div>
                  </motion.div>
                  <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-nf-black via-nf-black to-nf-red/80 bg-clip-text text-transparent">
                    Gesundheits-Analyse
                  </h2>
                </div>

                <p className="text-xl md:text-2xl text-nf-gray/80 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                  Erhalte in <span className="font-semibold text-nf-red">unter 2 Minuten</span> deine 
                  persönliche Gesundheitsanalyse mit BMI und Kalorienbedarf
                </p>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-14">
                  {[
                    {
                      icon: TrendingUp,
                      title: "BMI-Analyse",
                      description: "Präzise Berechnung deines Body-Mass-Index",
                      gradient: "from-blue-500 to-blue-600"
                    },
                    {
                      icon: Flame,
                      title: "Kalorienbedarf",
                      description: "Dein individueller Tagesbedarf in Echtzeit",
                      gradient: "from-orange-500 to-red-500"
                    },
                    {
                      icon: Target,
                      title: "Personalisiert",
                      description: "Maßgeschneidert auf deine Daten & Ziele",
                      gradient: "from-purple-500 to-pink-500"
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="group relative bg-gradient-to-br from-white to-slate-50/50 p-8 rounded-2xl border border-slate-200/50 hover:border-nf-red/30 hover:shadow-xl transition-all duration-300"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="font-bold text-nf-black mb-2 text-lg">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-nf-gray/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={startFunnel}
                    className="group relative bg-gradient-to-r from-nf-red to-nf-red/90 hover:from-nf-red/90 hover:to-nf-red text-white px-14 py-8 text-xl font-bold rounded-2xl shadow-[0_10px_40px_-10px_rgba(239,68,68,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(239,68,68,0.6)] transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Jetzt kostenlos analysieren
                      <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  </Button>
                </motion.div>

                {/* Trust Signals */}
                <div className="flex items-center justify-center gap-8 mt-8 text-sm">
                  {[
                    { icon: CheckCircle2, text: "100% Kostenlos" },
                    { icon: CheckCircle2, text: "Keine Anmeldung" },
                    { icon: CheckCircle2, text: "Sofort-Ergebnis" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-center gap-2 text-nf-gray/70"
                    >
                      <item.icon className="h-4 w-4 text-green-500" />
                      <span className="font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // FUNNEL STEPS
  return (
    <section
      id="bmi-rechner"
      className="relative py-20 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-red-50/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.05),transparent_50%)]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-nf-red to-nf-red/80 flex items-center justify-center text-white font-bold shadow-lg">
                  {healthState.currentStep}
                </div>
                <div>
                  <span className="text-xs font-semibold text-nf-gray/60 uppercase tracking-wider block">
                    Schritt {healthState.currentStep} von {totalSteps}
                  </span>
                  <span className="text-sm font-bold text-nf-black">
                    {healthState.currentStep === 1 && "Körpergröße"}
                    {healthState.currentStep === 2 && "Gewicht"}
                    {healthState.currentStep === 3 && "Alter"}
                    {healthState.currentStep === 4 && "Geschlecht"}
                    {healthState.currentStep === 5 && "Aktivität"}
                    {healthState.currentStep === 6 && "Deine Ergebnisse"}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold bg-gradient-to-r from-nf-red to-nf-red/80 bg-clip-text text-transparent">
                  {calculateProgress()}%
                </span>
                <span className="text-xs text-nf-gray/60 block">abgeschlossen</span>
              </div>
            </div>
            <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${calculateProgress()}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-nf-red to-nf-red/80 rounded-full shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-shimmer" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Funnel Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_70px_-10px_rgba(0,0,0,0.15)] border border-white/50 p-8 md:p-14 overflow-hidden"
        >
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-nf-red/5 to-transparent rounded-full blur-3xl" />
          {/* Back Button */}
          {healthState.currentStep > 1 && healthState.currentStep < 6 && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={previousStep}
              className="relative group flex items-center gap-2 text-nf-gray hover:text-nf-black mb-8 transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 group-hover:bg-slate-200 transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold">Zurück</span>
            </motion.button>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={healthState.currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Height */}
              {healthState.currentStep === 1 && (
                <div className="space-y-8">
                  <div className="text-center mb-10">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", duration: 0.7 }}
                      className="inline-block relative mb-6"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-2xl rounded-full" />
                      <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-xl">
                        <Ruler className="h-10 w-10 text-white" />
                      </div>
                    </motion.div>
                    <h3 className="text-3xl md:text-5xl font-bold text-nf-black mb-4 leading-tight">
                      Wie groß bist du?
                    </h3>
                    <p className="text-lg md:text-xl text-nf-gray/70 max-w-xl mx-auto">
                      Gib deine Körpergröße in Zentimetern an
                    </p>
                  </div>

                  <div className="max-w-md mx-auto">
                    <Label
                      htmlFor="height"
                      className="text-base font-semibold mb-4 block text-nf-black"
                    >
                      Körpergröße
                    </Label>
                    <div className="relative group">
                      <Input
                        id="height"
                        type="number"
                        placeholder="175"
                        value={healthState.data.height}
                        onChange={(e) => updateData("height", e.target.value)}
                        className="text-4xl py-10 text-center font-bold border-2 border-slate-200 hover:border-nf-red/30 focus:border-nf-red focus:ring-4 focus:ring-nf-red/10 transition-all rounded-2xl bg-slate-50/50"
                        autoFocus
                      />
                      <span className="absolute right-8 top-1/2 -translate-y-1/2 text-2xl text-nf-gray/40 font-semibold pointer-events-none">
                        cm
                      </span>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button
                      onClick={nextStep}
                      disabled={
                        !healthState.data.height ||
                        parseFloat(healthState.data.height) <= 0
                      }
                      className="w-full bg-gradient-to-r from-nf-red to-nf-red/90 hover:from-nf-red/90 hover:to-nf-red text-white py-7 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Weiter
                        <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </motion.div>
                </div>
              )}

              {/* Step 2: Weight */}
              {healthState.currentStep === 2 && (
                <div className="space-y-8">
                  <div className="text-center mb-10">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", duration: 0.7 }}
                      className="inline-block relative mb-6"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 blur-2xl rounded-full" />
                      <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-xl">
                        <Weight className="h-10 w-10 text-white" />
                      </div>
                    </motion.div>
                    <h3 className="text-3xl md:text-5xl font-bold text-nf-black mb-4 leading-tight">
                      Wie viel wiegst du?
                    </h3>
                    <p className="text-lg md:text-xl text-nf-gray/70 max-w-xl mx-auto">
                      Gib dein aktuelles Gewicht in Kilogramm an
                    </p>
                  </div>

                  <div className="max-w-md mx-auto">
                    <Label
                      htmlFor="weight"
                      className="text-base font-semibold mb-4 block text-nf-black"
                    >
                      Gewicht
                    </Label>
                    <div className="relative group">
                      <Input
                        id="weight"
                        type="number"
                        placeholder="75"
                        value={healthState.data.weight}
                        onChange={(e) => updateData("weight", e.target.value)}
                        className="text-4xl py-10 text-center font-bold border-2 border-slate-200 hover:border-nf-red/30 focus:border-nf-red focus:ring-4 focus:ring-nf-red/10 transition-all rounded-2xl bg-slate-50/50"
                        autoFocus
                      />
                      <span className="absolute right-8 top-1/2 -translate-y-1/2 text-2xl text-nf-gray/40 font-semibold pointer-events-none">
                        kg
                      </span>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button
                      onClick={nextStep}
                      disabled={
                        !healthState.data.weight ||
                        parseFloat(healthState.data.weight) <= 0
                      }
                      className="w-full bg-gradient-to-r from-nf-red to-nf-red/90 hover:from-nf-red/90 hover:to-nf-red text-white py-7 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Weiter
                        <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </motion.div>
                </div>
              )}

              {/* Step 3: Age */}
              {healthState.currentStep === 3 && (
                <div className="space-y-8">
                  <div className="text-center mb-10">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", duration: 0.7 }}
                      className="inline-block relative mb-6"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-2xl rounded-full" />
                      <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl">
                        <Calendar className="h-10 w-10 text-white" />
                      </div>
                    </motion.div>
                    <h3 className="text-3xl md:text-5xl font-bold text-nf-black mb-4 leading-tight">
                      Wie alt bist du?
                    </h3>
                    <p className="text-lg md:text-xl text-nf-gray/70 max-w-xl mx-auto">
                      Dein Alter hilft uns bei der Berechnung deines Stoffwechsels
                    </p>
                  </div>

                  <div className="max-w-md mx-auto">
                    <Label htmlFor="age" className="text-base font-semibold mb-4 block text-nf-black">
                      Alter
                    </Label>
                    <div className="relative group">
                      <Input
                        id="age"
                        type="number"
                        placeholder="30"
                        value={healthState.data.age}
                        onChange={(e) => updateData("age", e.target.value)}
                        className="text-4xl py-10 text-center font-bold border-2 border-slate-200 hover:border-nf-red/30 focus:border-nf-red focus:ring-4 focus:ring-nf-red/10 transition-all rounded-2xl bg-slate-50/50"
                        autoFocus
                      />
                      <span className="absolute right-8 top-1/2 -translate-y-1/2 text-2xl text-nf-gray/40 font-semibold pointer-events-none">
                        Jahre
                      </span>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button
                      onClick={nextStep}
                      disabled={
                        !healthState.data.age || parseFloat(healthState.data.age) <= 0
                      }
                      className="w-full bg-gradient-to-r from-nf-red to-nf-red/90 hover:from-nf-red/90 hover:to-nf-red text-white py-7 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Weiter
                        <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </motion.div>
                </div>
              )}

              {/* Step 4: Gender */}
              {healthState.currentStep === 4 && (
                <div className="space-y-8">
                  <div className="text-center mb-10">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", duration: 0.7 }}
                      className="inline-block relative mb-6"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 blur-2xl rounded-full" />
                      <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-xl">
                        <User className="h-10 w-10 text-white" />
                      </div>
                    </motion.div>
                    <h3 className="text-3xl md:text-5xl font-bold text-nf-black mb-4 leading-tight">
                      Welches Geschlecht hast du?
                    </h3>
                    <p className="text-lg md:text-xl text-nf-gray/70 max-w-xl mx-auto">
                      Männer und Frauen haben unterschiedliche Stoffwechselraten
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
                    {genderOptions.map((option, index) => (
                      <motion.div
                        key={option.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.03, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          updateData("gender", option.id);
                          setTimeout(nextStep, 300);
                        }}
                        className="group relative bg-gradient-to-br from-white to-slate-50/50 border-2 border-slate-200 hover:border-nf-red rounded-3xl p-10 cursor-pointer hover:shadow-2xl transition-all duration-300 overflow-hidden"
                      >
                        {/* Hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-nf-red/0 to-nf-red/0 group-hover:from-nf-red/5 group-hover:to-nf-red/10 transition-all duration-300" />
                        
                        <div className="relative z-10">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-nf-red/10 group-hover:to-nf-red/20 flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:scale-110">
                            <option.icon className="h-8 w-8 text-nf-gray group-hover:text-nf-red transition-colors" />
                          </div>
                          <p className="text-2xl font-bold text-center text-nf-black group-hover:text-nf-red transition-colors">
                            {option.label}
                          </p>
                        </div>

                        {/* Arrow indicator */}
                        <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-slate-100 group-hover:bg-nf-red flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-white" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Activity Level */}
              {healthState.currentStep === 5 && (
                <div className="space-y-8">
                  <div className="text-center mb-10">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", duration: 0.7 }}
                      className="inline-block relative mb-6"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 blur-2xl rounded-full" />
                      <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-xl">
                        <Activity className="h-10 w-10 text-white" />
                      </div>
                    </motion.div>
                    <h3 className="text-3xl md:text-5xl font-bold text-nf-black mb-4 leading-tight">
                      Wie aktiv bist du?
                    </h3>
                    <p className="text-lg md:text-xl text-nf-gray/70 max-w-xl mx-auto">
                      Wähle dein durchschnittliches Aktivitätslevel
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
                    {activityOptions.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          updateData("activityLevel", activity.id);
                          setTimeout(nextStep, 300);
                        }}
                        className="group relative bg-gradient-to-r from-white to-slate-50/50 border-2 border-slate-200 hover:border-nf-red rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden"
                      >
                        {/* Background hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-nf-red/0 to-nf-red/0 group-hover:from-nf-red/5 group-hover:to-nf-red/10 transition-all duration-300" />
                        
                        <div className="relative z-10 flex items-center gap-5">
                          {/* Icon */}
                          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-nf-red/20 group-hover:to-nf-red/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                            <activity.icon className="h-7 w-7 text-nf-gray group-hover:text-nf-red transition-colors" />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <p className="text-lg font-bold text-nf-black group-hover:text-nf-red transition-colors mb-1">
                              {activity.label}
                            </p>
                            <p className="text-sm text-nf-gray/70">
                              {activity.description}
                            </p>
                          </div>
                          
                          {/* Arrow */}
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 group-hover:bg-nf-red flex items-center justify-center transition-all duration-300">
                            <ChevronRight className="h-5 w-5 text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 6: Results */}
              {healthState.currentStep === 6 &&
                healthState.results.bmi &&
                healthState.results.tdee && (
                  <div className="space-y-8">
                    {/* Success Header */}
                    <div className="text-center mb-12">
                      <motion.div
                        initial={{ scale: 0, rotate: 90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
                        className="inline-block relative mb-6"
                      >
                        <div className="absolute inset-0 bg-green-500/30 blur-2xl rounded-full animate-pulse" />
                        <CheckCircle2 className="relative h-24 w-24 text-green-500" strokeWidth={2} />
                      </motion.div>
                      
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-3xl md:text-5xl font-bold text-nf-black mb-4"
                      >
                        Deine Gesundheits-Analyse
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg md:text-xl text-nf-gray/70 max-w-2xl mx-auto"
                      >
                        Basierend auf deinen Angaben haben wir deine persönlichen Werte berechnet
                      </motion.p>
                    </div>

                    {/* BMI Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="relative bg-gradient-to-br from-white via-white to-slate-50/50 border-2 border-slate-200/50 rounded-3xl p-8 shadow-xl overflow-hidden"
                    >
                      {/* Decorative gradient */}
                      <div className={`absolute top-0 right-0 w-64 h-64 ${getBMICategory(healthState.results.bmi).bgColor.replace('bg-', 'bg-gradient-to-br from-')} opacity-20 blur-3xl`} />
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                            <TrendingUp className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-nf-black">
                              Body Mass Index
                            </h4>
                            <p className="text-sm text-nf-gray/60">Dein BMI-Wert</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 items-center">
                          {/* Left: BMI Value */}
                          <div>
                            <div className="text-7xl font-black text-nf-black mb-4 tracking-tight">
                              {healthState.results.bmi}
                            </div>
                            <div
                              className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-lg ${
                                getBMICategory(healthState.results.bmi).bgColor
                              } ${getBMICategory(healthState.results.bmi).textColor} shadow-lg`}
                            >
                              <div className={`w-3 h-3 rounded-full ${getBMICategory(healthState.results.bmi).textColor.replace('text-', 'bg-')} animate-pulse`} />
                              {getBMICategory(healthState.results.bmi).category}
                            </div>
                            <p className="text-nf-gray/80 mt-6 leading-relaxed">
                              {getBMIAdvice(healthState.results.bmi)}
                            </p>
                          </div>

                          {/* Right: BMI Chart */}
                          <div className="relative">
                            <div className="w-48 h-48 mx-auto">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={bmiChartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    startAngle={90}
                                    endAngle={450}
                                    dataKey="value"
                                    strokeWidth={0}
                                  >
                                    {bmiChartData.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                  </Pie>
                                </PieChart>
                              </ResponsiveContainer>
                              
                              {/* Center label */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                  <div className="text-3xl font-black text-nf-black">
                                    {healthState.results.bmi}
                                  </div>
                                  <div className="text-xs text-nf-gray font-semibold uppercase tracking-wider">
                                    BMI
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Calorie Needs Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="relative bg-gradient-to-br from-white via-white to-orange-50/30 border-2 border-slate-200/50 rounded-3xl p-8 shadow-xl overflow-hidden"
                    >
                      {/* Decorative gradient */}
                      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-red-500/10 blur-3xl" />
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                            <Flame className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-nf-black">
                              Kalorienbedarf
                            </h4>
                            <p className="text-sm text-nf-gray/60">Dein täglicher Energiebedarf</p>
                          </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-5 mb-8">
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all" />
                            <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
                              <div className="text-4xl font-black text-nf-black mb-2">
                                {healthState.results.bmr}
                              </div>
                              <div className="text-xs text-nf-gray/60 font-semibold uppercase tracking-wider mb-1">
                                Grundumsatz
                              </div>
                              <div className="text-sm font-bold text-blue-600">
                                kcal/Tag
                              </div>
                            </div>
                          </div>

                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-nf-red/10 to-orange-500/10 rounded-2xl group-hover:from-nf-red/20 group-hover:to-orange-500/20 transition-all" />
                            <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
                              <div className="text-4xl font-black bg-gradient-to-r from-nf-red to-orange-600 bg-clip-text text-transparent mb-2">
                                {healthState.results.tdee}
                              </div>
                              <div className="text-xs text-nf-gray/60 font-semibold uppercase tracking-wider mb-1">
                                Gesamtbedarf
                              </div>
                              <div className="text-sm font-bold text-nf-red">
                                kcal/Tag
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Calorie Goals Chart */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
                          <h5 className="text-sm font-bold text-nf-black mb-4 uppercase tracking-wider">
                            Kalorienziele
                          </h5>
                          <div className="h-56">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={calorieChartData} barSize={60}>
                                <defs>
                                  <linearGradient id="colorAbnehmen" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                                    <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.8} />
                                  </linearGradient>
                                  <linearGradient id="colorHalten" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
                                    <stop offset="100%" stopColor="#4ade80" stopOpacity={0.8} />
                                  </linearGradient>
                                  <linearGradient id="colorZunehmen" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.9} />
                                    <stop offset="100%" stopColor="#fbbf24" stopOpacity={0.8} />
                                  </linearGradient>
                                </defs>
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  stroke="#e5e7eb"
                                  vertical={false}
                                />
                                <XAxis
                                  dataKey="name"
                                  fontSize={13}
                                  stroke="#6b7280"
                                  fontWeight={600}
                                  tickLine={false}
                                  axisLine={false}
                                />
                                <YAxis hide />
                                <Tooltip
                                  formatter={(value) => [`${value} kcal`, ""]}
                                  contentStyle={{
                                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                                    border: "none",
                                    borderRadius: "12px",
                                    boxShadow: "0 10px 40px -10px rgba(0,0,0,0.2)",
                                    padding: "12px",
                                  }}
                                  labelStyle={{
                                    color: "#1f2937",
                                    fontWeight: "bold",
                                    marginBottom: "4px",
                                  }}
                                  cursor={{ fill: "rgba(239, 68, 68, 0.05)" }}
                                />
                                <Bar
                                  dataKey="value"
                                  radius={[12, 12, 0, 0]}
                                  fill="url(#colorHalten)"
                                >
                                  {calorieChartData.map((entry, index) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      fill={
                                        index === 0
                                          ? "url(#colorAbnehmen)"
                                          : index === 1
                                          ? "url(#colorHalten)"
                                          : "url(#colorZunehmen)"
                                      }
                                    />
                                  ))}
                                </Bar>
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        {/* Tip Box */}
                        <div className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-5 border border-blue-100/50">
                          <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                              <Target className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-blue-900 mb-1">
                                💡 Expertentipp
                              </p>
                              <p className="text-sm text-blue-800 leading-relaxed">
                                Für gesundes Abnehmen: Reduziere deine tägliche
                                Kalorienzufuhr um ca. 500 kcal auf{" "}
                                <span className="font-bold">{healthState.results.tdee! - 500} kcal</span>.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="relative bg-gradient-to-br from-nf-red via-nf-red to-red-600 rounded-3xl p-10 md:p-12 shadow-2xl overflow-hidden"
                    >
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl" />
                      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-black/10 to-transparent rounded-full blur-3xl" />
                      
                      {/* Animated shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
                      
                      <div className="relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          <span className="text-sm font-bold text-white uppercase tracking-wider">
                            Exklusives Angebot
                          </span>
                        </div>

                        <Heart className="h-16 w-16 text-white/90 mx-auto mb-6" />
                        
                        <h4 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                          Bereit für deine Transformation?
                        </h4>
                        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                          Jetzt hast du deine Ausgangslage. Lass uns gemeinsam daran arbeiten, 
                          deine Ziele zu erreichen! Sichere dir dein <span className="font-bold">kostenloses Beratungsgespräch</span>.
                        </p>
                        
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Button
                            onClick={scrollToContact}
                            className="group bg-white hover:bg-slate-50 text-nf-red px-10 py-7 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-[0_20px_60px_-10px_rgba(255,255,255,0.5)] transition-all duration-300"
                          >
                            <span className="flex items-center gap-3">
                              <span>Kostenloses Beratungsgespräch sichern</span>
                              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </Button>
                        </motion.div>

                        <div className="flex items-center justify-center gap-6 mt-8">
                          {[
                            "Persönliche Beratung",
                            "Individueller Plan",
                            "100% unverbindlich"
                          ].map((item, index) => (
                            <div key={index} className="flex items-center gap-2 text-white/90">
                              <CheckCircle2 className="h-4 w-4" />
                              <span className="text-sm font-medium">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* Restart Button */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="text-center pt-6"
                    >
                      <button
                        onClick={() =>
                          setHealthState({
                            isStarted: false,
                            currentStep: 1,
                            data: {
                              height: "",
                              weight: "",
                              age: "",
                              gender: null,
                              activityLevel: null,
                            },
                            results: { bmi: null, bmr: null, tdee: null },
                          })
                        }
                        className="group inline-flex items-center gap-2 text-nf-gray hover:text-nf-black text-sm font-semibold transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-colors">
                          <Calculator className="h-4 w-4" />
                        </div>
                        <span>Neue Berechnung starten</span>
                      </button>
                    </motion.div>
                  </div>
                )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default HealthCalculatorFunnel;