import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Smile,
  Frown,
  Scale,
  Dumbbell,
  Activity,
  Heart,
  Briefcase,
  Users,
  GraduationCap,
  User,
  Sofa,
  PersonStanding,
  Bike,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

interface FunnelState {
  isStarted: boolean;
  currentStep: number;
  answers: {
    bodyHappy: boolean | null;
    change: string;
    goal: "abnehmen" | "muskeln" | "beides" | "lifestyle" | null;
    situation: string;
    activity: string;
    weightGoal: string;
    challenge: string;
    investment: number | null;
    contact: {
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
      countryCode: string;
    };
  };
}

const BookingFunnel = () => {
  const [funnelState, setFunnelState] = useState<FunnelState>({
    isStarted: false,
    currentStep: 1,
    answers: {
      bodyHappy: null,
      change: "",
      goal: null,
      situation: "",
      activity: "",
      weightGoal: "",
      challenge: "",
      investment: null,
      contact: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        countryCode: "+49",
      },
    },
  });

  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // VEREINFACHTE STEP LOGIK
  const getStepConfig = () => {
    const steps = [
      { id: 1, name: "bodyHappy", always: true },
      { id: 2, name: "change", condition: () => funnelState.answers.bodyHappy === false },
      { id: 3, name: "goal", always: true },
      { id: 4, name: "situation", always: true },
      { id: 5, name: "activity", always: true },
      {
        id: 6,
        name: "weightGoal",
        condition: () => funnelState.answers.goal === "abnehmen" || funnelState.answers.goal === "beides",
      },
      { id: 7, name: "challenge", always: true },
      { id: 8, name: "investment", always: true },
      { id: 9, name: "contact", always: true },
    ];

    return steps.filter((step) => step.always || (step.condition && step.condition()));
  };

  const calculateTotalSteps = () => {
    return getStepConfig().length;
  };

  const calculateProgress = () => {
    const total = calculateTotalSteps();
    return Math.round((funnelState.currentStep / total) * 100);
  };

  const getCurrentStepName = () => {
    const config = getStepConfig();
    return config[funnelState.currentStep - 1]?.name;
  };

  const startFunnel = () => {
    setFunnelState({ ...funnelState, isStarted: true });
  };

  const nextStep = () => {
    setFunnelState({ ...funnelState, currentStep: funnelState.currentStep + 1 });
  };

  const previousStep = () => {
    setFunnelState({ ...funnelState, currentStep: funnelState.currentStep - 1 });
  };

  const updateAnswer = (key: string, value: any) => {
    setFunnelState({
      ...funnelState,
      answers: { ...funnelState.answers, [key]: value },
    });
  };

  const updateContact = (key: string, value: string) => {
    setFunnelState({
      ...funnelState,
      answers: {
        ...funnelState.answers,
        contact: { ...funnelState.answers.contact, [key]: value },
      },
    });
  };

  const handleBodyHappyAnswer = (isHappy: boolean) => {
    updateAnswer("bodyHappy", isHappy);
    setTimeout(nextStep, 300);
  };

  const handleGoalSelect = (goal: "abnehmen" | "muskeln" | "beides" | "lifestyle") => {
    updateAnswer("goal", goal);
    setTimeout(nextStep, 300);
  };

  const handleSituationSelect = (situation: string) => {
    updateAnswer("situation", situation);

    if (situation === "Schüler/Azubi/Student/Arbeitssuchend") {
      toast({
        title: "Perfekt! Wir haben ein kostenloses Angebot für dich 🎁",
        description: "Du wirst zu unserem Freebie weitergeleitet...",
      });
      setTimeout(() => {
        window.location.href = "/freebie";
      }, 2000);
      return;
    }

    setTimeout(nextStep, 300);
  };

  const handleActivitySelect = (activity: string) => {
    updateAnswer("activity", activity);
    setTimeout(nextStep, 300);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\d{10,15}$/.test(phone.replace(/\s/g, ""));
  };

  const validateContactForm = () => {
    const newErrors: Record<string, string> = {};

    if (!funnelState.answers.contact.firstName) {
      newErrors.firstName = "Vorname ist erforderlich";
    }
    if (!funnelState.answers.contact.lastName) {
      newErrors.lastName = "Nachname ist erforderlich";
    }
    if (!funnelState.answers.contact.phone) {
      newErrors.phone = "Telefonnummer ist erforderlich";
    } else if (!validatePhone(funnelState.answers.contact.phone)) {
      newErrors.phone = "Ungültige Telefonnummer";
    }
    if (!funnelState.answers.contact.email) {
      newErrors.email = "E-Mail ist erforderlich";
    } else if (!validateEmail(funnelState.answers.contact.email)) {
      newErrors.email = "Ungültige E-Mail-Adresse";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const openCalendarModal = () => {
    if (validateContactForm()) {
      setCalendarModalOpen(true);
    }
  };

  const handleContactSubmit = () => {
    if (validateContactForm()) {
      const data = {
        contact: funnelState.answers.contact,
        funnelAnswers: funnelState.answers,
      };

      console.log("Funnel Data:", data);

      toast({
        title: "Danke! Wir melden uns in 24h 📧",
        description: "Deine Daten wurden erfolgreich übermittelt.",
      });
    }
  };

  const currentStepName = getCurrentStepName();

  if (!funnelState.isStarted) {
    return (
      <section id="booking-funnel" className="py-16 md:py-24 bg-gradient-to-br from-nf-black/5 to-nf-red/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-sm border-2 border-nf-red/20 rounded-2xl p-8 md:p-12 text-center shadow-2xl"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-nf-black mb-4">Starte deine Transformation</h3>
            <p className="text-lg md:text-xl text-nf-black/70 mb-8 max-w-2xl mx-auto">
              Vereinbare jetzt dein kostenloses Beratungsgespräch und finde heraus, wie wir dir helfen können
            </p>
            <Button
              onClick={startFunnel}
              className="bg-nf-red hover:bg-nf-red/90 text-white text-xl px-12 py-6 shadow-red-glow animate-pulse-red"
              size="lg"
            >
              🚀 JETZT STARTEN
            </Button>
            <p className="text-sm text-nf-black/60 mt-4">Dauert nur 2 Minuten</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking-funnel" className="py-16 md:py-24 bg-gradient-to-br from-nf-black/5 to-nf-red/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-nf-black">
                Schritt {funnelState.currentStep} von {calculateTotalSteps()}
              </span>
              <span className="text-sm font-semibold text-nf-red">{calculateProgress()}%</span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
          </div>

          {/* Back Button */}
          {funnelState.currentStep > 1 && (
            <button
              onClick={previousStep}
              className="flex items-center gap-2 text-nf-black/70 hover:text-nf-black mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Zurück</span>
            </button>
          )}

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={funnelState.currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Body Happiness */}
              {currentStepName === "bodyHappy" && (
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-nf-black text-center mb-8">
                    Bist du zufrieden mit deinem Körper?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleBodyHappyAnswer(true)}
                      className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-8 cursor-pointer hover:shadow-lg transition-all"
                    >
                      <Smile className="h-16 w-16 text-green-600 mx-auto mb-4" />
                      <p className="text-xl font-semibold text-center text-nf-black">Ja, sehr!</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleBodyHappyAnswer(false)}
                      className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-8 cursor-pointer hover:shadow-lg transition-all"
                    >
                      <Frown className="h-16 w-16 text-red-600 mx-auto mb-4" />
                      <p className="text-xl font-semibold text-center text-nf-black">Nein, leider nicht...</p>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Step 2: Change Wish (only if unhappy) */}
              {currentStepName === "change" && (
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-nf-black text-center mb-4">
                    Was müsste sich verändern?
                  </h3>
                  <p className="text-center text-nf-black/70 mb-8">Damit du zufrieden mit deinem Körper bist</p>
                  <Textarea
                    value={funnelState.answers.change}
                    onChange={(e) => updateAnswer("change", e.target.value)}
                    placeholder="Optional - Erzähl uns gerne mehr..."
                    className="min-h-[120px] text-lg"
                  />
                  <Button onClick={nextStep} className="w-full bg-nf-red hover:bg-nf-red/90 text-white py-6 text-lg">
                    Weiter
                  </Button>
                </div>
              )}

              {/* Step 3: Goal */}
              {currentStepName === "goal" && (
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-nf-black text-center mb-8">Was ist dein Ziel?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: "abnehmen", icon: Scale, label: "Abnehmen" },
                      { id: "muskeln", icon: Dumbbell, label: "Muskeln aufbauen" },
                      { id: "beides", icon: Activity, label: "Beides" },
                      { id: "lifestyle", icon: Heart, label: "Gesunder Lifestyle" },
                    ].map((goal) => (
                      <motion.div
                        key={goal.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleGoalSelect(goal.id as any)}
                        className="bg-white border-2 border-nf-black/10 hover:border-nf-red rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all"
                      >
                        <goal.icon className="h-12 w-12 text-nf-red mx-auto mb-3" />
                        <p className="text-lg font-semibold text-center text-nf-black">{goal.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Situation */}
              {currentStepName === "situation" && (
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-nf-black text-center mb-2">
                    Erzähl mir doch gerne mehr von Dir
                  </h3>
                  <p className="text-center text-nf-black/70 mb-8">Was ist Deine aktuelle Alltagssituation?</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: "Berufstätig in Teilzeit", icon: Briefcase },
                      { id: "Berufstätig in Vollzeit", icon: Briefcase },
                      { id: "Schüler/Azubi/Student/Arbeitssuchend", icon: GraduationCap },
                      { id: "Andere Situation", icon: User },
                    ].map((situation) => (
                      <motion.div
                        key={situation.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSituationSelect(situation.id)}
                        className="bg-white border-2 border-nf-black/10 hover:border-nf-red rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all"
                      >
                        <situation.icon className="h-12 w-12 text-nf-red mx-auto mb-3" />
                        <p className="text-lg font-semibold text-center text-nf-black">{situation.id}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Activity Level */}
              {currentStepName === "activity" && (
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-nf-black text-center mb-2">
                    Vielleicht bist Du sogar schon aktiv?
                  </h3>
                  <p className="text-center text-nf-black/70 mb-8">Wie bewegst Du Dich in Deinem Alltag?</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: "Gar nicht", icon: Sofa },
                      { id: "Ab und zu mal", icon: PersonStanding },
                      { id: "Regelmäßige Bewegung", icon: Bike },
                      { id: "Regelmäßiges Training", icon: Trophy },
                    ].map((activity) => (
                      <motion.div
                        key={activity.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleActivitySelect(activity.id)}
                        className="bg-white border-2 border-nf-black/10 hover:border-nf-red rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all"
                      >
                        <activity.icon className="h-12 w-12 text-nf-red mx-auto mb-3" />
                        <p className="text-lg font-semibold text-center text-nf-black">{activity.id}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 6: Weight Goal (conditional) */}
              {currentStepName === "weightGoal" && (
                <div className="space-y-6">
                  <h3 className="text-xl md:text-2xl font-bold text-nf-black text-center mb-2">
                    Stell Dir bitte 🙏 einmal kurz vor
                  </h3>
                  <p className="text-center text-nf-black/70 mb-8">
                    Du könntest wirklich jedes körperliche Ziel erreichen, ohne zu scheitern! Wie viel würdest Du dann
                    abnehmen wollen?
                  </p>
                  <RadioGroup
                    value={funnelState.answers.weightGoal}
                    onValueChange={(val) => updateAnswer("weightGoal", val)}
                  >
                    <div className="space-y-3">
                      {[
                        "2-5 kg",
                        "5-10 kg",
                        "10-20 kg",
                        "20-30 kg",
                        "Mehr als 30 kg",
                        "Die Zahl ist mir nicht so wichtig",
                      ].map((option) => (
                        <div
                          key={option}
                          className="flex items-center space-x-3 p-4 border-2 border-nf-black/10 rounded-lg hover:border-nf-red transition-colors"
                        >
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option} className="text-lg cursor-pointer flex-1">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                  <Button
                    onClick={nextStep}
                    disabled={!funnelState.answers.weightGoal}
                    className="w-full bg-nf-red hover:bg-nf-red/90 text-white py-6 text-lg"
                  >
                    Weiter
                  </Button>
                </div>
              )}

              {/* Step 7: Challenge */}
              {currentStepName === "challenge" && (
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-nf-black text-center mb-8">
                    Was ist Deine größte Herausforderung?
                  </h3>
                  <p className="text-center text-nf-black/70 mb-4">
                    Die Dich abhält, in Deinen Wohlfühlkörper zu kommen?
                  </p>
                  <Textarea
                    value={funnelState.answers.challenge}
                    onChange={(e) => updateAnswer("challenge", e.target.value)}
                    placeholder="z.B. Süßigkeiten am Abend, fehlende Disziplin/Motivation..."
                    className="min-h-[120px] text-lg"
                  />
                  <Button onClick={nextStep} className="w-full bg-nf-red hover:bg-nf-red/90 text-white py-6 text-lg">
                    Weiter
                  </Button>
                </div>
              )}

              {/* Step 8: Investment */}
              {currentStepName === "investment" && (
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-nf-black text-center mb-8">
                    Investitionsbereitschaft
                  </h3>
                  <p className="text-center text-nf-black/70 mb-8">
                    Wieviel wärst du bereit MONATLICH zu investieren, wenn du dein Ziel SICHER erreichen würdest?
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[150, 250, 350].map((amount) => (
                      <motion.div
                        key={amount}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          updateAnswer("investment", amount);
                          setTimeout(nextStep, 300);
                        }}
                        className="bg-white border-2 border-nf-black/10 hover:border-nf-red rounded-xl p-8 cursor-pointer hover:shadow-lg transition-all"
                      >
                        <p className="text-4xl font-bold text-center text-nf-red">{amount} €</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 9: Contact & Booking */}
              {currentStepName === "contact" && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-nf-black text-center mb-2">
                    Danke, dass Du Dir die Zeit genommen hast! 💪
                  </h3>
                  <p className="text-center text-lg text-nf-black/70 mb-8">
                    Ich freue mich schon, Dich persönlich kennenzulernen!
                  </p>
                  <p className="text-center text-xl font-semibold text-nf-red mb-6">
                    Vereinbare jetzt Deinen KOSTENLOSEN Beratungstermin
                  </p>

                  <div className="space-y-4">
                    <div>
                      <Input
                        value={funnelState.answers.contact.firstName}
                        onChange={(e) => updateContact("firstName", e.target.value)}
                        placeholder="Vorname *"
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>

                    <div>
                      <Input
                        value={funnelState.answers.contact.lastName}
                        onChange={(e) => updateContact("lastName", e.target.value)}
                        placeholder="Nachname *"
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>

                    <div className="flex gap-2">
                      <Select
                        value={funnelState.answers.contact.countryCode}
                        onValueChange={(val) => updateContact("countryCode", val)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+49">🇩🇪 +49</SelectItem>
                          <SelectItem value="+43">🇦🇹 +43</SelectItem>
                          <SelectItem value="+41">🇨🇭 +41</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex-1">
                        <Input
                          value={funnelState.answers.contact.phone}
                          onChange={(e) => updateContact("phone", e.target.value)}
                          placeholder="Telefonnummer *"
                          className={errors.phone ? "border-red-500" : ""}
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <Input
                        type="email"
                        value={funnelState.answers.contact.email}
                        onChange={(e) => updateContact("email", e.target.value)}
                        placeholder="E-Mail *"
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Button
                      onClick={openCalendarModal}
                      className="w-full bg-nf-red hover:bg-nf-red/90 text-white py-6 text-lg font-semibold"
                      size="lg"
                    >
                      Kostenlosen & unverbindlichen
                      <br />
                      Termin buchen
                    </Button>

                    <Button
                      onClick={handleContactSubmit}
                      variant="outline"
                      className="w-full border-2 border-nf-black hover:bg-nf-black hover:text-white py-6 text-lg"
                      size="lg"
                    >
                      Lieber von euch kontaktiert werden
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Google Calendar Modal */}
      <Dialog open={calendarModalOpen} onOpenChange={setCalendarModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <iframe
            src="https://calendar.app.google/4FV2w2sL4KL9Gtq89"
            width="100%"
            height="600px"
            frameBorder="0"
            className="rounded-lg"
            title="Termin buchen"
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BookingFunnel;
