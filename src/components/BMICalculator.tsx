import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, TrendingUp, Flame, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const BMICalculatorCompact = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    height: "", weight: "", age: "", gender: "", activityLevel: "", goal: ""
  });
  const [results, setResults] = useState<{ bmi: number; bmr: number; tdee: number } | null>(null);

  const calculateAll = () => {
    const { height: h, weight: w, age: a, gender, activityLevel } = formData;
    const [hNum, wNum, aNum] = [parseFloat(h), parseFloat(w), parseFloat(a)];
    
    if (!hNum || !wNum || !aNum || hNum <= 0 || wNum <= 0 || aNum <= 0 || !gender || !activityLevel) return;

    // BMI
    const bmi = wNum / ((hNum / 100) ** 2);
    
    // BMR (Mifflin-St Jeor)
    const bmr = gender === "male" 
      ? 10 * wNum + 6.25 * hNum - 5 * aNum + 5
      : 10 * wNum + 6.25 * hNum - 5 * aNum - 161;
    
    // TDEE
    const multipliers = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, "very-active": 1.9 };
    const tdee = bmr * multipliers[activityLevel as keyof typeof multipliers];
    
    setResults({ bmi: Math.round(bmi * 10) / 10, bmr: Math.round(bmr), tdee: Math.round(tdee) });
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Untergewicht", color: "hsl(var(--chart-1))", bg: "bg-blue-50" };
    if (bmi < 25) return { category: "Normalgewicht", color: "hsl(var(--chart-2))", bg: "bg-green-50" };
    if (bmi < 30) return { category: "Übergewicht", color: "hsl(var(--chart-3))", bg: "bg-yellow-50" };
    return { category: "Adipositas", color: "hsl(var(--chart-4))", bg: "bg-red-50" };
  };

  const getCalorieGoal = (tdee: number) => {
    const { goal } = formData;
    if (goal === "lose") return tdee - 500;
    if (goal === "gain") return tdee + 300;
    return tdee;
  };

  const nextStep = () => {
    if (currentStep === 1) calculateAll();
    setCurrentStep(prev => Math.min(prev + 1, 2));
  };

  const canProceed = () => {
    const { height, weight, age, gender, activityLevel, goal } = formData;
    if (currentStep === 0) return height && weight && age && gender && parseFloat(height) > 0 && parseFloat(weight) > 0 && parseFloat(age) > 0;
    if (currentStep === 1) return activityLevel && goal;
    return true;
  };

  const slideVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Basis-Daten
        return (
          <motion.div key="step0" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-6">
            <div className="text-center mb-6">
              <Calculator className="h-14 w-14 text-nf-red mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-nf-black mb-2">Deine Basis-Daten</h3>
              <p className="text-nf-gray">Alles auf einmal - spart Zeit! ⚡</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Größe (cm)</Label>
                <Input type="number" value={formData.height} onChange={e => setFormData({...formData, height: e.target.value})} placeholder="175" />
              </div>
              <div>
                <Label>Gewicht (kg)</Label>
                <Input type="number" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} placeholder="70" />
              </div>
              <div>
                <Label>Alter</Label>
                <Input type="number" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} placeholder="30" />
              </div>
              <div>
                <Label>Geschlecht</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {["male", "female"].map(g => (
                    <button key={g} onClick={() => setFormData({...formData, gender: g})} 
                      className={`p-2 rounded border-2 transition-all ${formData.gender === g ? "border-nf-red bg-nf-red/5" : "border-gray-200"}`}>
                      {g === "male" ? "♂️ Mann" : "♀️ Frau"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 1: // Aktivität & Ziel
        return (
          <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-6">
            <div className="text-center mb-6">
              <Flame className="h-14 w-14 text-nf-red mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-nf-black mb-2">Aktivität & Ziel</h3>
              <p className="text-nf-gray">Fast geschafft! 🎯</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-base font-semibold mb-2 block">Aktivitätslevel</Label>
                <div className="grid gap-2">
                  {[
                    { value: "sedentary", label: "Wenig aktiv", desc: "Bürojob, kaum Sport" },
                    { value: "light", label: "Leicht aktiv", desc: "1-3x/Woche Sport" },
                    { value: "moderate", label: "Mäßig aktiv", desc: "3-5x/Woche Sport" },
                    { value: "active", label: "Sehr aktiv", desc: "6-7x/Woche Sport" },
                    { value: "very-active", label: "Extrem aktiv", desc: "Täglich intensiv" }
                  ].map(opt => (
                    <button key={opt.value} onClick={() => setFormData({...formData, activityLevel: opt.value})}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${formData.activityLevel === opt.value ? "border-nf-red bg-nf-red/5" : "border-gray-200"}`}>
                      <div className="font-semibold text-sm">{opt.label}</div>
                      <div className="text-xs text-nf-gray">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-base font-semibold mb-2 block">Dein Ziel</Label>
                <div className="grid gap-2">
                  {[
                    { value: "lose", label: "🔥 Abnehmen" },
                    { value: "maintain", label: "⚖️ Halten" },
                    { value: "gain", label: "💪 Zunehmen" }
                  ].map(opt => (
                    <button key={opt.value} onClick={() => setFormData({...formData, goal: opt.value})}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${formData.goal === opt.value ? "border-nf-red bg-nf-red/5" : "border-gray-200"}`}>
                      <div className="font-semibold">{opt.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 2: // Ergebnisse
        if (!results) return null;
        const { bmi, bmr, tdee } = results;
        const bmiInfo = getBMICategory(bmi);
        const calorieGoal = getCalorieGoal(tdee);

        return (
          <motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-5">
            <div className="text-center mb-6">
              <CheckCircle2 className="h-14 w-14 text-green-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-nf-black">Deine Ergebnisse! 🎉</h3>
            </div>

            {/* BMI */}
            <Card className="border-2 border-nf-red/20">
              <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-nf-red" />Dein BMI</CardTitle></CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-5xl font-bold text-nf-black mb-2">{bmi}</div>
                  <Badge className={`text-lg px-4 py-2 ${bmiInfo.bg}`}>{bmiInfo.category}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Kalorien */}
            <Card className="border-2 border-nf-red/20">
              <CardHeader><CardTitle className="flex items-center gap-2"><Flame className="h-5 w-5 text-nf-red" />Dein Kalorienbedarf</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-nf-light rounded-lg">
                    <div className="text-2xl font-bold">{bmr}</div>
                    <div className="text-xs text-nf-gray">Grundumsatz</div>
                  </div>
                  <div className="p-3 bg-nf-red/10 rounded-lg">
                    <div className="text-2xl font-bold text-nf-red">{tdee}</div>
                    <div className="text-xs text-nf-gray">Tagesbedarf</div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200 text-center">
                  <div className="text-sm text-nf-gray mb-1">
                    {formData.goal === "lose" && "Zum Abnehmen:"}
                    {formData.goal === "maintain" && "Zum Halten:"}
                    {formData.goal === "gain" && "Zum Zunehmen:"}
                  </div>
                  <div className="text-3xl font-bold text-nf-black">{calorieGoal}<span className="text-sm ml-1">kcal</span></div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="bg-gradient-to-br from-nf-red to-nf-red/80 p-5 rounded-lg text-white">
              <h4 className="text-xl font-bold mb-2">🎯 Bereit durchzustarten?</h4>
              <p className="mb-3 text-sm opacity-90">Kostenlose Beratung + persönlicher Plan!</p>
              <Button onClick={() => document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full bg-white text-nf-red hover:bg-gray-100 font-bold py-5">
                Jetzt Beratung sichern →
              </Button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <section id="bmi-rechner" className="py-20 bg-nf-light">
      <div className="max-w-2xl mx-auto px-4">
        {currentStep < 2 && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-nf-gray">Schritt {currentStep + 1} von 3</span>
              <span className="text-sm font-semibold text-nf-red">{Math.round(((currentStep + 1) / 3) * 100)}%</span>
            </div>
            <Progress value={((currentStep + 1) / 3) * 100} className="h-2" />
          </motion.div>
        )}

        <Card className="shadow-lg border-t-4 border-nf-red">
          <CardContent className="p-6">
            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
            
            {currentStep < 2 && (
              <div className="flex gap-3 mt-6">
                {currentStep > 0 && (
                  <Button onClick={() => setCurrentStep(prev => prev - 1)} variant="outline" className="flex-1">
                    <ArrowLeft className="h-4 w-4 mr-2" />Zurück
                  </Button>
                )}
                <Button onClick={nextStep} disabled={!canProceed()} 
                  className={`bg-nf-red hover:bg-nf-red/90 text-white font-semibold ${currentStep === 0 ? "flex-1" : "flex-[2]"}`}>
                  {currentStep === 1 ? <>Ergebnisse anzeigen<Flame className="h-4 w-4 ml-2" /></> : <>Weiter<ArrowRight className="h-4 w-4 ml-2" /></>}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BMICalculatorCompact;