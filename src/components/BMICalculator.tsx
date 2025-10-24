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
  Zap,
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
    activityLevel: "sedentary" | "light" | "moderate" | "active" | "very-active" | null;
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

  const nextStep = () => {
    if (healthState.currentStep === 5) {
      // Before going to results, calculate everything
      calculateMetrics();
    }
    setHealthState({ ...healthState, currentStep: healthState.currentStep + 1 });
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

  const calculateMetrics = () => {
    const h = parseFloat(healthState.data.height);
    const w = parseFloat(healthState.data.weight);
    const a = parseFloat(healthState.data.age);

    if (!h || !w || !a || h <= 0 || w <= 0 || a <= 0 || !healthState.data.gender || !healthState.data.activityLevel)
      return;

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
      bmrValue * activityMultipliers[healthState.data.activityLevel as keyof typeof activityMultipliers];

    setHealthState({
      ...healthState,
      results: {
        bmi: Math.round(bmiValue * 10) / 10,
        bmr: Math.round(bmrValue),
        tdee: Math.round(tdeeValue),
      },
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
    if (bmiValue < 18.5) return "Spreche mit einem Arzt über gesunde Gewichtszunahme.";
    if (bmiValue < 25) return "Großartig! Du hast ein gesundes Gewicht.";
    if (bmiValue < 30) return "Leichtes Übergewicht. Wir können dir beim Abnehmen helfen.";
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

  if (!healthState.isStarted) {
    return (
      <section id="bmi-rechner" className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Hero Section */}
            <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Calculator className="h-14 w-14 text-nf-red" />
                <h2 className="text-4xl md:text-5xl font-bold text-nf-black">Gesundheits-Rechner</h2>
              </div>

              <p className="text-xl text-nf-gray mb-8 max-w-2xl mx-auto">
                Berechne in nur 2 Minuten deinen BMI und täglichen Kalorienbedarf für optimale Ergebnisse
              </p>

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gradient-to-br from-red-50 to-white p-6 rounded-xl border border-nf-black/5">
                  <TrendingUp className="h-10 w-10 text-nf-red mx-auto mb-3" />
                  <h3 className="font-semibold text-nf-black mb-2">BMI-Analyse</h3>
                  <p className="text-sm text-nf-gray">Erfahre, ob dein Gewicht im gesunden Bereich liegt</p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-white p-6 rounded-xl border border-nf-black/5">
                  <Flame className="h-10 w-10 text-nf-red mx-auto mb-3" />
                  <h3 className="font-semibold text-nf-black mb-2">Kalorienbedarf</h3>
                  <p className="text-sm text-nf-gray">Berechne deinen täglichen Grundumsatz und Gesamtbedarf</p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-white p-6 rounded-xl border border-nf-black/5">
                  <Target className="h-10 w-10 text-nf-red mx-auto mb-3" />
                  <h3 className="font-semibold text-nf-black mb-2">Personalisiert</h3>
                  <p className="text-sm text-nf-gray">Auf Basis deiner individuellen Daten und Aktivität</p>
                </div>
              </div>

              {/* CTA Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={startFunnel}
                  className="bg-nf-red hover:bg-nf-red/90 text-white px-12 py-7 text-xl font-semibold rounded-xl shadow-lg"
                >
                  Jetzt kostenlos berechnen
                  <ChevronRight className="ml-2 h-6 w-6" />
                </Button>
              </motion.div>

              <p className="text-sm text-nf-gray mt-4">
                ✓ Komplett kostenlos &nbsp; ✓ Keine Anmeldung nötig &nbsp; ✓ Sofortige Ergebnisse
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="bmi-rechner" className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-nf-gray">
              Schritt {healthState.currentStep} von {totalSteps}
            </span>
            <span className="text-sm font-medium text-nf-red">{calculateProgress()}% abgeschlossen</span>
          </div>
          <Progress value={calculateProgress()} className="h-2" />
        </div>

        {/* Funnel Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Back Button */}
          {healthState.currentStep > 1 && healthState.currentStep < 6 && (
            <button
              onClick={previousStep}
              className="flex items-center gap-2 text-nf-gray hover:text-nf-black mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Zurück</span>
            </button>
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
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <Ruler className="h-16 w-16 text-nf-red mx-auto mb-4" />
                    <h3 className="text-3xl md:text-4xl font-bold text-nf-black mb-3">Wie groß bist du?</h3>
                    <p className="text-lg text-nf-gray">Gib deine Körpergröße in Zentimetern an</p>
                  </div>

                  <div className="max-w-md mx-auto">
                    <Label htmlFor="height" className="text-lg font-medium mb-3 block">
                      Körpergröße (cm)
                    </Label>
                    <div className="relative">
                      <Input
                        id="height"
                        type="number"
                        placeholder="z.B. 175"
                        value={healthState.data.height}
                        onChange={(e) => updateData("height", e.target.value)}
                        className="text-2xl py-8 text-center font-semibold"
                        autoFocus
                      />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xl text-nf-gray font-medium">
                        cm
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={nextStep}
                    disabled={!healthState.data.height || parseFloat(healthState.data.height) <= 0}
                    className="w-full bg-nf-red hover:bg-nf-red/90 text-white py-6 text-lg font-semibold mt-8"
                  >
                    Weiter
                  </Button>
                </div>
              )}

              {/* Step 2: Weight */}
              {healthState.currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <Weight className="h-16 w-16 text-nf-red mx-auto mb-4" />
                    <h3 className="text-3xl md:text-4xl font-bold text-nf-black mb-3">Wie viel wiegst du?</h3>
                    <p className="text-lg text-nf-gray">Gib dein aktuelles Gewicht in Kilogramm an</p>
                  </div>

                  <div className="max-w-md mx-auto">
                    <Label htmlFor="weight" className="text-lg font-medium mb-3 block">
                      Gewicht (kg)
                    </Label>
                    <div className="relative">
                      <Input
                        id="weight"
                        type="number"
                        placeholder="z.B. 75"
                        value={healthState.data.weight}
                        onChange={(e) => updateData("weight", e.target.value)}
                        className="text-2xl py-8 text-center font-semibold"
                        autoFocus
                      />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xl text-nf-gray font-medium">
                        kg
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={nextStep}
                    disabled={!healthState.data.weight || parseFloat(healthState.data.weight) <= 0}
                    className="w-full bg-nf-red hover:bg-nf-red/90 text-white py-6 text-lg font-semibold mt-8"
                  >
                    Weiter
                  </Button>
                </div>
              )}

              {/* Step 3: Age */}
              {healthState.currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <Calendar className="h-16 w-16 text-nf-red mx-auto mb-4" />
                    <h3 className="text-3xl md:text-4xl font-bold text-nf-black mb-3">Wie alt bist du?</h3>
                    <p className="text-lg text-nf-gray">Dein Alter hilft uns bei der Berechnung deines Stoffwechsels</p>
                  </div>

                  <div className="max-w-md mx-auto">
                    <Label htmlFor="age" className="text-lg font-medium mb-3 block">
                      Alter (Jahre)
                    </Label>
                    <div className="relative">
                      <Input
                        id="age"
                        type="number"
                        placeholder="z.B. 30"
                        value={healthState.data.age}
                        onChange={(e) => updateData("age", e.target.value)}
                        className="text-2xl py-8 text-center font-semibold"
                        autoFocus
                      />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xl text-nf-gray font-medium">
                        Jahre
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={nextStep}
                    disabled={!healthState.data.age || parseFloat(healthState.data.age) <= 0}
                    className="w-full bg-nf-red hover:bg-nf-red/90 text-white py-6 text-lg font-semibold mt-8"
                  >
                    Weiter
                  </Button>
                </div>
              )}

              {/* Step 4: Gender */}
              {healthState.currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <User className="h-16 w-16 text-nf-red mx-auto mb-4" />
                    <h3 className="text-3xl md:text-4xl font-bold text-nf-black mb-3">Welches Geschlecht hast du?</h3>
                    <p className="text-lg text-nf-gray">Männer und Frauen haben unterschiedliche Stoffwechselraten</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {genderOptions.map((option) => (
                      <motion.div
                        key={option.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          updateData("gender", option.id);
                          setTimeout(nextStep, 300);
                        }}
                        className="bg-white border-2 border-nf-black/10 hover:border-nf-red rounded-xl p-8 cursor-pointer hover:shadow-lg transition-all"
                      >
                        <option.icon className="h-12 w-12 text-nf-red mx-auto mb-3" />
                        <p className="text-xl font-semibold text-center text-nf-black">{option.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Activity Level */}
              {healthState.currentStep === 5 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <Activity className="h-16 w-16 text-nf-red mx-auto mb-4" />
                    <h3 className="text-3xl md:text-4xl font-bold text-nf-black mb-3">Wie aktiv bist du?</h3>
                    <p className="text-lg text-nf-gray">Wähle dein durchschnittliches Aktivitätslevel</p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {activityOptions.map((activity) => (
                      <motion.div
                        key={activity.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          updateData("activityLevel", activity.id);
                          setTimeout(nextStep, 300);
                        }}
                        className="bg-white border-2 border-nf-black/10 hover:border-nf-red rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all flex items-center gap-4"
                      >
                        <activity.icon className="h-10 w-10 text-nf-red flex-shrink-0" />
                        <div className="text-left flex-1">
                          <p className="text-lg font-semibold text-nf-black">{activity.label}</p>
                          <p className="text-sm text-nf-gray">{activity.description}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-nf-gray flex-shrink-0" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 6: Results */}
              {healthState.currentStep === 6 && healthState.results.bmi && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.6 }}
                    >
                      <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-3xl md:text-4xl font-bold text-nf-black mb-3">Deine Gesundheits-Analyse</h3>
                    <p className="text-lg text-nf-gray">Hier sind deine persönlichen Ergebnisse</p>
                  </div>

                  {/* BMI Card */}
                  <div className="bg-gradient-to-br from-slate-50 to-white border-2 border-nf-black/5 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="h-6 w-6 text-nf-red" />
                      <h4 className="text-xl font-bold text-nf-black">Body Mass Index (BMI)</h4>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-5xl font-bold text-nf-black mb-2">{healthState.results.bmi}</div>
                        <div
                          className={`inline-block px-4 py-2 rounded-full font-semibold ${
                            getBMICategory(healthState.results.bmi).bgColor
                          } ${getBMICategory(healthState.results.bmi).textColor}`}
                        >
                          {getBMICategory(healthState.results.bmi).category}
                        </div>
                      </div>

                      <div className="h-32 w-32">
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
                    </div>

                    <p className="text-nf-gray">{getBMIAdvice(healthState.results.bmi)}</p>
                  </div>

                  {/* Calorie Needs Card */}
                  <div className="bg-gradient-to-br from-slate-50 to-white border-2 border-nf-black/5 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <Flame className="h-6 w-6 text-nf-red" />
                      <h4 className="text-xl font-bold text-nf-black">Dein Kalorienbedarf</h4>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white rounded-xl p-4 border border-nf-black/5">
                        <div className="text-3xl font-bold text-nf-black mb-1">{healthState.results.bmr}</div>
                        <div className="text-sm text-nf-gray">Grundumsatz (BMR)</div>
                        <div className="text-xs text-nf-gray mt-1">kcal/Tag</div>
                      </div>

                      <div className="bg-white rounded-xl p-4 border border-nf-black/5">
                        <div className="text-3xl font-bold text-nf-red mb-1">{healthState.results.tdee}</div>
                        <div className="text-sm text-nf-gray">Gesamtbedarf (TDEE)</div>
                        <div className="text-xs text-nf-gray mt-1">kcal/Tag</div>
                      </div>
                    </div>

                    {/* Calorie Chart */}
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={calorieChartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="name" fontSize={12} stroke="#6b7280" />
                          <YAxis hide />
                          <Tooltip
                            formatter={(value) => [`${value} kcal`, "Kalorien"]}
                            contentStyle={{
                              backgroundColor: "white",
                              border: "1px solid #e5e7eb",
                              borderRadius: "8px",
                            }}
                          />
                          <Bar dataKey="value" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="mt-4 bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <p className="text-sm text-blue-900">
                        <strong>Tipp:</strong> Für gesundes Abnehmen reduziere deine tägliche Kalorienzufuhr um ca. 500
                        kcal auf <strong>{healthState.results.tdee! - 500} kcal</strong>.
                      </p>
                    </div>
                  </div>

                  {/* CTA Section */}
                  <div className="bg-gradient-to-br from-red-50 to-white border-2 border-nf-red/20 rounded-2xl p-8 text-center">
                    <Heart className="h-12 w-12 text-nf-red mx-auto mb-4" />
                    <h4 className="text-2xl font-bold text-nf-black mb-3">Bereit für deine Transformation?</h4>
                    <p className="text-nf-gray mb-6">
                      Lass uns gemeinsam an deinen Zielen arbeiten. Sichere dir jetzt dein kostenloses
                      Beratungsgespräch!
                    </p>
                    <Button
                      onClick={scrollToContact}
                      className="bg-nf-red hover:bg-nf-red/90 text-white px-8 py-6 text-lg font-semibold"
                    >
                      Kostenloses Beratungsgespräch sichern
                    </Button>
                  </div>

                  {/* Restart Button */}
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
                    className="text-nf-gray hover:text-nf-black text-sm font-medium mx-auto block"
                  >
                    Neue Berechnung starten
                  </button>
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
