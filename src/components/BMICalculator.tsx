import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Target, Users, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

const BMICalculator = () => {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState<string>("");
  const [bmi, setBMI] = useState<number | null>(null);
  const [bmr, setBMR] = useState<number | null>(null);
  const [tdee, setTDEE] = useState<number | null>(null);

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

    const tdeeValue = bmrValue * activityMultipliers[activityLevel as keyof typeof activityMultipliers];
    setTDEE(Math.round(tdeeValue));
  };

  const getBMICategory = (bmiValue: number) => {
    if (bmiValue < 18.5) return { category: "Untergewicht", color: "hsl(var(--chart-1))", bgColor: "bg-blue-50" };
    if (bmiValue < 25) return { category: "Normalgewicht", color: "hsl(var(--chart-2))", bgColor: "bg-green-50" };
    if (bmiValue < 30) return { category: "Übergewicht", color: "hsl(var(--chart-3))", bgColor: "bg-yellow-50" };
    return { category: "Adipositas", color: "hsl(var(--chart-4))", bgColor: "bg-red-50" };
  };

  const getBMIAdvice = (bmiValue: number) => {
    if (bmiValue < 18.5) return "Spreche mit einem Arzt über gesunde Gewichtszunahme.";
    if (bmiValue < 25) return "Großartig! Du hast ein gesundes Gewicht.";
    if (bmiValue < 30) return "Leichtes Übergewicht. Wir können dir beim Abnehmen helfen.";
    return "Deutliches Übergewicht. Professionelle Betreuung ist empfehlenswert.";
  };

  const bmiChartData = bmi
    ? [
        { name: "Dein BMI", value: bmi, fill: getBMICategory(bmi).color },
        { name: "Rest", value: Math.max(0, 35 - bmi), fill: "hsl(var(--muted))" },
      ]
    : [];

  const calorieChartData = tdee
    ? [
        { name: "Abnehmen (-500)", value: tdee - 500, fill: "hsl(var(--chart-1))" },
        { name: "Halten", value: tdee, fill: "hsl(var(--chart-2))" },
        { name: "Zunehmen (+300)", value: tdee + 300, fill: "hsl(var(--chart-3))" },
      ]
    : [];

  const scrollToContact = () => {
    const element = document.querySelector("#kontakt");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="bmi-rechner" className="py-20 bg-nf-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calculator className="h-8 w-8 text-nf-red" />
            <h2 className="text-3xl md:text-4xl font-bold text-nf-black">Gesundheits-Rechner</h2>
          </div>
          <p className="text-lg text-nf-gray max-w-2xl mx-auto">
            Berechne deinen BMI und täglichen Kalorienbedarf für optimale Ergebnisse
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Calculator Input */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-nf-red" />
                  Deine Daten eingeben
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Height Input */}
                <div className="space-y-2">
                  <Label htmlFor="height">Körpergröße (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>

                {/* Weight Input */}
                <div className="space-y-2">
                  <Label htmlFor="weight">Gewicht (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>

                {/* Age Input */}
                <div className="space-y-2">
                  <Label htmlFor="age">Alter (Jahre)</Label>
                  <Input id="age" type="number" placeholder="30" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>

                {/* Gender Selection */}
                <div className="space-y-2">
                  <Label>Geschlecht</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger>
                      <SelectValue placeholder="Geschlecht auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Männlich</SelectItem>
                      <SelectItem value="female">Weiblich</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Activity Level */}
                <div className="space-y-2">
                  <Label>Aktivitätslevel</Label>
                  <Select value={activityLevel} onValueChange={setActivityLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Aktivitätslevel auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Wenig/keine Bewegung</SelectItem>
                      <SelectItem value="light">Leichte Aktivität (1-3 Tage/Woche)</SelectItem>
                      <SelectItem value="moderate">Moderate Aktivität (3-5 Tage/Woche)</SelectItem>
                      <SelectItem value="active">Hohe Aktivität (6-7 Tage/Woche)</SelectItem>
                      <SelectItem value="very-active">Sehr hohe Aktivität (2x täglich)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Calculate Button */}
                <Button
                  onClick={calculateMetrics}
                  className="w-full bg-nf-red hover:bg-nf-red/90 text-nf-white font-semibold py-3"
                  disabled={!height || !weight || !age || !gender || !activityLevel}
                >
                  Werte berechnen
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {bmi || tdee ? (
              <div className="space-y-6">
                {/* BMI Results */}
                {bmi && (
                  <Card className="shadow-elegant">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-nf-red" />
                        Dein BMI
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-nf-black mb-2">{bmi}</div>
                        <Badge variant="secondary" className={`text-sm px-3 py-1 ${getBMICategory(bmi).bgColor}`}>
                          {getBMICategory(bmi).category}
                        </Badge>
                      </div>
                      <div className="h-24">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={bmiChartData}
                              cx="50%"
                              cy="50%"
                              innerRadius={20}
                              outerRadius={40}
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
                    </CardContent>
                  </Card>
                )}

                {/* Calorie Results */}
                {tdee && bmr && (
                  <Card className="shadow-elegant">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Flame className="h-5 w-5 text-nf-red" />
                        Dein Kalorienbedarf
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-nf-black">{bmr}</div>
                          <div className="text-sm text-nf-gray">Grundumsatz (BMR)</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-nf-black">{tdee}</div>
                          <div className="text-sm text-nf-gray">Tagesbedarf (TDEE)</div>
                        </div>
                      </div>
                      <div className="h-32">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={calorieChartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                            <XAxis dataKey="name" fontSize={10} stroke="hsl(var(--muted-foreground))" />
                            <YAxis hide />
                            <Tooltip
                              formatter={(value) => [`${value} kcal`, "Kalorien"]}
                              labelStyle={{ color: "hsl(var(--foreground))" }}
                            />
                            <Bar dataKey="value" radius={[2, 2, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Advice */}
                {bmi && tdee && (
                  <div className="bg-nf-light p-4 rounded-lg">
                    <p className="text-sm text-nf-gray mb-3">
                      {getBMIAdvice(bmi)} Dein täglicher Kalorienbedarf beträgt {tdee} kcal.
                    </p>
                    <Button onClick={scrollToContact} className="w-full bg-nf-red hover:bg-nf-red/90 text-nf-white">
                      Kostenloses Beratungsgespräch
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <Card className="shadow-elegant">
                <CardContent className="py-16">
                  <div className="text-center text-nf-gray/60">
                    <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Gib deine Daten ein, um BMI und Kalorienbedarf zu berechnen</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BMICalculator;
