import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Target, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const BMICalculator = () => {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [bmi, setBMI] = useState<number | null>(null);

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    
    if (!h || !w || h <= 0 || w <= 0) return;

    let bmiValue: number;
    
    if (unit === 'metric') {
      // height in cm, weight in kg
      const heightInMeters = h / 100;
      bmiValue = w / (heightInMeters * heightInMeters);
    } else {
      // height in inches, weight in pounds
      bmiValue = (w / (h * h)) * 703;
    }
    
    setBMI(Math.round(bmiValue * 10) / 10);
  };

  const getBMICategory = (bmiValue: number) => {
    if (bmiValue < 18.5) return { category: 'Untergewicht', color: 'hsl(var(--chart-1))', bgColor: 'bg-blue-50' };
    if (bmiValue < 25) return { category: 'Normalgewicht', color: 'hsl(var(--chart-2))', bgColor: 'bg-green-50' };
    if (bmiValue < 30) return { category: 'Übergewicht', color: 'hsl(var(--chart-3))', bgColor: 'bg-yellow-50' };
    return { category: 'Adipositas', color: 'hsl(var(--chart-4))', bgColor: 'bg-red-50' };
  };

  const getBMIAdvice = (bmiValue: number) => {
    if (bmiValue < 18.5) return 'Spreche mit einem Arzt über gesunde Gewichtszunahme.';
    if (bmiValue < 25) return 'Großartig! Du hast ein gesundes Gewicht.';
    if (bmiValue < 30) return 'Leichtes Übergewicht. Wir können dir beim Abnehmen helfen.';
    return 'Deutliches Übergewicht. Professionelle Betreuung ist empfehlenswert.';
  };

  const chartData = bmi ? [
    { name: 'Dein BMI', value: bmi, fill: getBMICategory(bmi).color },
    { name: 'Rest', value: Math.max(0, 35 - bmi), fill: 'hsl(var(--muted))' }
  ] : [];

  const scrollToContact = () => {
    const element = document.querySelector('#kontakt');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            <h2 className="text-3xl md:text-4xl font-bold text-nf-black">
              BMI Rechner
            </h2>
          </div>
          <p className="text-lg text-nf-gray max-w-2xl mx-auto">
            Berechne deinen Body-Mass-Index und erfahre, wie wir dir helfen können
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
                {/* Unit Toggle */}
                <div className="flex gap-2">
                  <Button
                    variant={unit === 'metric' ? 'default' : 'outline'}
                    onClick={() => setUnit('metric')}
                    className="flex-1"
                  >
                    Metrisch (cm/kg)
                  </Button>
                  <Button
                    variant={unit === 'imperial' ? 'default' : 'outline'}
                    onClick={() => setUnit('imperial')}
                    className="flex-1"
                  >
                    Imperial (in/lbs)
                  </Button>
                </div>

                {/* Height Input */}
                <div className="space-y-2">
                  <Label htmlFor="height">
                    Körpergröße {unit === 'metric' ? '(cm)' : '(inches)'}
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder={unit === 'metric' ? '175' : '69'}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>

                {/* Weight Input */}
                <div className="space-y-2">
                  <Label htmlFor="weight">
                    Gewicht {unit === 'metric' ? '(kg)' : '(lbs)'}
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder={unit === 'metric' ? '70' : '154'}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>

                {/* Calculate Button */}
                <Button 
                  onClick={calculateBMI}
                  className="w-full bg-nf-red hover:bg-nf-red/90 text-nf-white font-semibold py-3"
                  disabled={!height || !weight}
                >
                  BMI berechnen
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
            {bmi ? (
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-nf-red" />
                    Dein Ergebnis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* BMI Value */}
                  <div className="text-center">
                    <div className="text-4xl font-bold text-nf-black mb-2">{bmi}</div>
                    <Badge 
                      variant="secondary" 
                      className={`text-sm px-3 py-1 ${getBMICategory(bmi).bgColor}`}
                    >
                      {getBMICategory(bmi).category}
                    </Badge>
                  </div>

                  {/* Chart */}
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={50}
                          startAngle={90}
                          endAngle={450}
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Advice */}
                  <div className="bg-nf-light p-4 rounded-lg">
                    <p className="text-sm text-nf-gray mb-3">
                      {getBMIAdvice(bmi)}
                    </p>
                    <Button 
                      onClick={scrollToContact}
                      className="w-full bg-nf-red hover:bg-nf-red/90 text-nf-white"
                    >
                      Kostenloses Beratungsgespräch
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-elegant">
                <CardContent className="py-16">
                  <div className="text-center text-nf-gray/60">
                    <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">
                      Gib deine Daten ein, um deinen BMI zu berechnen
                    </p>
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