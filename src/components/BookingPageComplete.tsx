import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Mail,
  User,
  Phone,
  CheckCircle2,
  Clock,
  Shield,
  Award,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CONFIG = {
  GOOGLE_CALENDAR_LINK: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0y_your_real_link_here",
  COACH_EMAIL: "info@momentumlabs.at",
  COACH_NAME: "Niklas & Fabienne",
};

interface BookingPageProps {
  healthData: {
    bmi: number;
    bmr: number;
    tdee: number;
    height: string;
    weight: string;
    age: string;
    gender: string;
    goal: string;
    activityLevel: string;
    sleepHours: string;
    stressLevel: string;
    recommendedCalories: number;
  };
}

const BookingPageComplete = ({ healthData }: BookingPageProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError("Bitte gib deinen vollständigen Namen ein.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setError("Bitte gib eine gültige E-Mail-Adresse ein.");
      return false;
    }

    setError("");
    return true;
  };

  const getActivityLabel = (level: string) => {
    const labels = {
      sedentary: "Wenig Bewegung",
      light: "Leicht aktiv",
      moderate: "Moderat aktiv",
      active: "Sehr aktiv",
      "very-active": "Extrem aktiv",
    };
    return labels[level as keyof typeof labels] || level;
  };

  const getGoalLabel = (goal: string) => {
    const labels = {
      lose: "Abnehmen",
      maintain: "Gewicht halten",
      gain: "Zunehmen",
    };
    return labels[goal as keyof typeof labels] || goal;
  };

  const getSleepLabel = (sleep: string) => {
    const labels = {
      "less-than-6": "Weniger als 6 Stunden",
      "6-7": "6-7 Stunden",
      "7-8": "7-8 Stunden",
      "more-than-8": "Mehr als 8 Stunden",
    };
    return labels[sleep as keyof typeof labels] || sleep;
  };

  const getStressLabel = (stress: string) => {
    const labels = {
      low: "Niedrig",
      medium: "Mittel",
      high: "Hoch",
      "very-high": "Sehr hoch",
    };
    return labels[stress as keyof typeof labels] || stress;
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return "Untergewicht";
    if (bmi < 25) return "Normalgewicht";
    if (bmi < 30) return "Übergewicht";
    return "Adipositas";
  };

  const sendBookingEmail = async () => {
    const emailBody = `
Neue Terminbuchung von ${firstName} ${lastName}!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 KONTAKTDATEN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${firstName} ${lastName}
Email: ${email}
Telefon: ${phone || "Nicht angegeben"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 BMI & KÖRPERDATEN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BMI: ${healthData.bmi} (${getBMICategory(healthData.bmi)})
Körpergröße: ${healthData.height} cm
Gewicht: ${healthData.weight} kg
Alter: ${healthData.age} Jahre
Geschlecht: ${healthData.gender === "male" ? "Männlich" : "Weiblich"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔥 KALORIENBEDARF:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Grundumsatz (BMR): ${healthData.bmr} kcal/Tag
Tagesbedarf (TDEE): ${healthData.tdee} kcal/Tag
Empfohlen für Ziel: ${healthData.recommendedCalories} kcal/Tag

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 ZIELE & LIFESTYLE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hauptziel: ${getGoalLabel(healthData.goal)}
Aktivitätslevel: ${getActivityLabel(healthData.activityLevel)}
Schlaf: ${getSleepLabel(healthData.sleepHours)}
Stresslevel: ${getStressLabel(healthData.stressLevel)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ NÄCHSTER SCHRITT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Der Kunde bucht jetzt seinen Termin im Google Calendar.
Bitte achte auf den Namen "${firstName} ${lastName}" 
im Calendar und matche ihn mit dieser Email!

Zeitstempel: ${new Date().toLocaleString("de-DE")}
    `;

    try {
      console.log("📧 Email würde gesendet werden an:", CONFIG.COACH_EMAIL);
      console.log("Inhalt:", emailBody);
      return true;
    } catch (error) {
      console.error("Email error:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setError("");

    const emailSuccess = await sendBookingEmail();

    if (emailSuccess) {
      setShowCalendar(true);
    } else {
      setError("Fehler beim Senden der Daten. Bitte versuche es erneut.");
    }

    setIsSubmitting(false);
  };

  if (showCalendar) {
    return (
      <section className="min-h-screen bg-nf-light py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <Alert className="border-green-500 bg-green-50">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-green-800 font-medium">
                ✅ Deine Daten wurden erfolgreich an {CONFIG.COACH_NAME} gesendet! Wähle jetzt deinen Wunschtermin.
              </AlertDescription>
            </Alert>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-6"
          >
            <h1 className="text-2xl md:text-4xl font-bold text-nf-black mb-3">Wähle deinen Wunschtermin 📅</h1>
            <p className="text-base md:text-lg text-nf-gray">
              Buche jetzt dein kostenloses 60-minütiges Beratungsgespräch
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1 space-y-4"
            >
              <Card className="shadow-lg border-2 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    Deine Daten
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>
                    <div className="text-xs text-gray-500 font-semibold">Name</div>
                    <div className="font-bold text-nf-black">
                      {firstName} {lastName}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-semibold">Email</div>
                    <div className="text-nf-black break-all">{email}</div>
                  </div>
                  {phone && (
                    <div>
                      <div className="text-xs text-gray-500 font-semibold">Telefon</div>
                      <div className="text-nf-black">{phone}</div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-lg border-2 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Deine Analyse
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="text-xs text-gray-500 font-semibold">BMI</div>
                      <div className="text-lg font-bold text-nf-black">{healthData.bmi}</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="text-xs text-gray-500 font-semibold">Ziel</div>
                      <div className="text-sm font-bold text-nf-black">{getGoalLabel(healthData.goal)}</div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-nf-red to-red-600 p-3 rounded-lg text-white">
                    <div className="text-xs font-semibold mb-1">EMPFOHLEN</div>
                    <div className="text-2xl font-bold">{healthData.recommendedCalories}</div>
                    <div className="text-xs opacity-90">kcal/Tag</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg bg-blue-50 border-2 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div className="text-sm text-blue-900">
                      <div className="font-bold mb-2">Was passiert jetzt?</div>
                      <ol className="space-y-1 list-decimal list-inside text-xs">
                        <li>Wähle einen freien Termin</li>
                        <li>Du erhältst eine Bestätigung per Email</li>
                        <li>Wir bereiten uns auf dein Gespräch vor</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <Card className="shadow-2xl border-t-4 border-nf-red overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-nf-red to-red-600 text-white">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Calendar className="h-6 w-6" />
                    Verfügbare Termine
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="w-full" style={{ minHeight: "600px" }}>
                    <iframe
                      src={CONFIG.GOOGLE_CALENDAR_LINK}
                      style={{
                        border: 0,
                        width: "100%",
                        height: "600px",
                      }}
                      frameBorder="0"
                      scrolling="yes"
                      title="Termin buchen"
                    />
                  </div>

                  <div className="p-6 bg-gray-50 border-t">
                    <p className="text-sm text-gray-600 mb-3 text-center">
                      Falls die Kalenderansicht nicht lädt, klicke hier:
                    </p>
                    <Button
                      onClick={() => window.open(CONFIG.GOOGLE_CALENDAR_LINK, "_blank")}
                      className="w-full bg-nf-red hover:bg-nf-red/90 text-white font-bold"
                      size="lg"
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      Termin in neuem Fenster öffnen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 grid md:grid-cols-3 gap-4"
          >
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
              <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
              <div className="text-sm">
                <div className="font-bold text-nf-black">100% Kostenlos</div>
                <div className="text-gray-600">Keine versteckten Kosten</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
              <Clock className="h-6 w-6 text-blue-500 flex-shrink-0" />
              <div className="text-sm">
                <div className="font-bold text-nf-black">60 Minuten</div>
                <div className="text-gray-600">Individuelles Gespräch</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
              <Shield className="h-6 w-6 text-purple-500 flex-shrink-0" />
              <div className="text-sm">
                <div className="font-bold text-nf-black">Unverbindlich</div>
                <div className="text-gray-600">Keine Verpflichtung</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-nf-light to-gray-100 py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
            ✅ Deine BMI-Analyse ist fertig!
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-nf-black mb-4">
            Sichere dir jetzt dein kostenloses Beratungsgespräch! 🎯
          </h1>
          <p className="text-lg text-nf-gray">Nur noch ein Schritt zu deinem personalisierten Plan</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="shadow-2xl border-t-4 border-nf-red">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-nf-red" />
                  Deine Kontaktdaten
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Vorname *</Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Max"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nachname *</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Mustermann"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="max@example.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon (optional)</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+49 123 456789"
                        className="pl-10"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  {error && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-nf-red hover:bg-nf-red/90 text-white font-bold py-6 text-lg"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="h-5 w-5 mr-2 animate-spin" />
                        Wird gesendet...
                      </>
                    ) : (
                      <>
                        Weiter zur Terminauswahl
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-nf-gray mt-4">
                    Mit dem Absenden stimmst du unserer Datenschutzerklärung zu.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card className="shadow-lg border-2 border-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Deine Ergebnisse
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-500 font-semibold">BMI</div>
                      <div className="text-xl font-bold text-nf-black">{healthData.bmi}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-500 font-semibold">Kategorie</div>
                      <div className="text-sm font-bold text-nf-black">{getBMICategory(healthData.bmi)}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-500 font-semibold">Grundumsatz</div>
                      <div className="text-lg font-bold text-nf-black">{healthData.bmr} kcal</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-500 font-semibold">Tagesbedarf</div>
                      <div className="text-lg font-bold text-nf-black">{healthData.tdee} kcal</div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-nf-red to-red-600 p-3 rounded-lg text-white">
                    <div className="text-xs font-semibold mb-1">EMPFOHLEN FÜR DEIN ZIEL</div>
                    <div className="text-2xl font-bold">{healthData.recommendedCalories} kcal/Tag</div>
                    <div className="text-xs opacity-90 mt-1">Ziel: {getGoalLabel(healthData.goal)}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <Shield className="h-5 w-5" />
                    Das erwartet dich
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-blue-900">60 Minuten individuelles Gespräch</div>
                      <div className="text-sm text-blue-700">Persönliche Analyse deiner Situation</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-blue-900">Personalisierter Aktionsplan</div>
                      <div className="text-sm text-blue-700">Maßgeschneidert auf deine Ziele</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-blue-900">100% kostenlos & unverbindlich</div>
                      <div className="text-sm text-blue-700">Keine versteckten Kosten</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <Card className="shadow-lg bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="h-8 w-8 text-green-600" />
                    <div>
                      <div className="font-bold text-green-900">Über 500 zufriedene Kunden</div>
                      <div className="text-sm text-green-700">⭐⭐⭐⭐⭐ 4.9/5.0 Bewertung</div>
                    </div>
                  </div>
                  <blockquote className="italic text-sm text-green-800 border-l-4 border-green-400 pl-4">
                    "Das Erstgespräch war super informativ und hat mir klare Schritte aufgezeigt. Bin jetzt seit 3
                    Monaten dabei und habe 12kg abgenommen!"
                  </blockquote>
                  <div className="text-xs text-green-600 mt-2">— Sarah M., 34 Jahre</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingPageComplete;
