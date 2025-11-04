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

      // ... (Cases 1-6 sind identisch mit GesundheitscheckPage)
      // Ich zeige dir den Rest im nächsten Teil, sonst wird's zu lang!

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-nf-light">
      <Navigation />
      {/* ... Rest wie in der vollständigen Datei oben ... */}
    </div>
  );
};

export default TerminVorbereitungPage;
