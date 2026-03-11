import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
    additionalInfo?: string;
    recommendedCalories: number;
  };
}

// Common country codes for European/DACH region
const COUNTRY_CODES = [
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+43", country: "AT", flag: "🇦🇹" },
  { code: "+41", country: "CH", flag: "🇨🇭" },
  { code: "+31", country: "NL", flag: "🇳🇱" },
  { code: "+32", country: "BE", flag: "🇧🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+39", country: "IT", flag: "🇮🇹" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+45", country: "DK", flag: "🇩🇰" },
  { code: "+46", country: "SE", flag: "🇸🇪" },
  { code: "+47", country: "NO", flag: "🇳🇴" },
  { code: "+48", country: "PL", flag: "🇵🇱" },
  { code: "+34", country: "ES", flag: "🇪🇸" },
  { code: "+351", country: "PT", flag: "🇵🇹" },
  { code: "+420", country: "CZ", flag: "🇨🇿" },
  { code: "+36", country: "HU", flag: "🇭🇺" },
  { code: "+1", country: "US", flag: "🇺🇸" },
];

const BookingPageComplete = ({ healthData }: BookingPageProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+49");
  const [phone, setPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [meetLink, setMeetLink] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [error, setError] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  
  // Preloading state for next 5 weekdays
  const [slotsCache, setSlotsCache] = useState<Map<string, string[]>>(new Map());
  const [isPreloading, setIsPreloading] = useState(true);
  const [bookableWeekdays, setBookableWeekdays] = useState<Date[]>([]);

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

    if (!phone.trim()) {
      setError("Bitte gib deine Telefonnummer ein.");
      return false;
    }

    if (!selectedDate) {
      setError("Bitte wähle ein Datum aus.");
      return false;
    }

    if (!selectedTime) {
      setError("Bitte wähle eine Uhrzeit aus.");
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

  // Helper functions for date validation
  const isWeekend = (d: Date) => {
    const wd = d.getDay();
    return wd === 0 || wd === 6;
  };

  const isBeforeLeadTime = (d: Date) => {
    const now = new Date();
    const cutoff = new Date(now.getTime() + 18 * 60 * 60 * 1000);
    const dayEnd = new Date(d);
    dayEnd.setHours(23, 59, 59, 999);
    return dayEnd < cutoff;
  };

  // Maximal bis zu den nächsten 5 Werktagen buchbar (ohne Wochenenden)
  const getMaxBookableDate = () => {
    const base = new Date();
    const probe = new Date(base);
    let remaining = 5;
    while (remaining > 0) {
      probe.setDate(probe.getDate() + 1);
      const wd = probe.getDay();
      if (wd !== 0 && wd !== 6) {
        remaining--;
      }
    }
    // Ende des Tages
    probe.setHours(23, 59, 59, 999);
    return new Date(probe);
  };
  // Load availability range on mount (14 days)
  useEffect(() => {
    const loadRange = async () => {
      setIsPreloading(false); // Calendar is immediately interactive
      
      try {
        const now = new Date();
        const start = format(now, 'yyyy-MM-dd');
        
        const { data } = await supabase.functions.invoke('get-availability-range', {
          body: { startDate: start, days: 7 },
        });

        if (data?.success && data?.days) {
          const map = new Map<string, string[]>();
          for (const [ds, slots] of Object.entries(data.days)) {
            map.set(ds, slots as string[]);
          }
          setSlotsCache(map);
        }
      } catch (error) {
        // Silent fail - calendar remains interactive
        console.error('Error loading availability:', error);
      }
    };
    
    loadRange();
  }, []);

  // Fetch available slots when date is selected
  const fetchAvailableSlots = async (date: Date) => {
    setIsLoadingSlots(true);
    setSelectedTime(""); // Reset selected time
    try {
      const dateString = format(date, 'yyyy-MM-dd');
      console.log('🔍 Fetching available slots for:', dateString);

      const { data, error: functionError } = await supabase.functions.invoke('get-available-slots', {
        body: { date: dateString },
      });

      if (functionError) {
        console.error('Function error:', functionError);
        throw new Error(functionError.message);
      }

      if (!data.success) {
        throw new Error(data.error || 'Fehler beim Laden der verfügbaren Zeiten');
      }

      console.log('✅ Available slots:', data.availableSlots);
      setAvailableSlots(data.availableSlots);

      if (data.availableSlots.length === 0) {
        toast.error('Keine verfügbaren Zeiten', {
          description: 'Bitte wähle einen anderen Tag.',
        });
      }

    } catch (error: any) {
      console.error('❌ Error fetching slots:', error);
      toast.error('Fehler beim Laden der Zeiten', {
        description: 'Bitte versuche es erneut.',
      });
      setAvailableSlots([]);
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setError("");

    try {
      const appointmentDate = format(selectedDate!, 'yyyy-MM-dd');
      
      console.log('📅 Booking appointment:', {
        firstName,
        lastName,
        email,
        date: appointmentDate,
        time: selectedTime,
      });

      const { data, error: functionError } = await supabase.functions.invoke('create-booking', {
        body: {
          firstName,
          lastName,
          email,
          phone: phone ? `${countryCode} ${phone}` : "",
          appointmentDate,
          appointmentTime: selectedTime,
          healthData,
        },
      });

      if (functionError) {
        throw new Error(functionError.message);
      }

      if (!data.success) {
        throw new Error(data.error || 'Fehler beim Erstellen des Termins');
      }

      setEventLink(data.eventLink);
      setShowSuccess(true);

      toast.success('Termin erfolgreich gebucht! 🎉', {
        description: 'Der Coach wird dich zum vereinbarten Zeitpunkt telefonisch kontaktieren.',
      });

    } catch (error: any) {
      setError(error.message || "Fehler beim Buchen. Bitte versuche es erneut.");
      toast.error('Fehler beim Buchen', {
        description: error.message || 'Bitte versuche es erneut.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success View
  if (showSuccess) {
    return (
      <section className="min-h-screen bg-nf-light py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-nf-black mb-3">
              Termin erfolgreich gebucht! 🎉
            </h1>
            <p className="text-lg text-nf-gray">
              Der Coach wird dich zum vereinbarten Zeitpunkt telefonisch kontaktieren
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Contact Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="shadow-lg border-2 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    Deine Buchung
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <div className="text-xs text-gray-500 font-semibold">Name</div>
                    <div className="font-bold text-nf-black">{firstName} {lastName}</div>
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
                  <div className="pt-2 border-t">
                    <div className="text-xs text-gray-500 font-semibold">Termin</div>
                    <div className="font-bold text-nf-black">
                      {selectedDate && format(selectedDate, 'EEEE, dd. MMMM yyyy', { locale: de })}
                    </div>
                    <div className="text-lg font-bold text-nf-red">{selectedTime} Uhr</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Meeting Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="shadow-lg border-2 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-green-600" />
                    Dein Termin
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {eventLink && (
                    <div>
                      <Button
                        onClick={() => window.open(eventLink, '_blank')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        size="lg"
                      >
                        📅 Termin im Kalender anzeigen
                      </Button>
                      <p className="text-xs text-gray-600 mt-2 text-center">
                        Füge den Termin zu deinem Kalender hinzu
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Card className="shadow-lg bg-blue-50 border-2 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-blue-900 mb-3">Was passiert jetzt?</div>
                    <ol className="space-y-2 text-sm text-blue-800">
                      <li className="flex items-start gap-2">
                        <span className="font-bold">1.</span>
                        <span>Füge den Termin über den blauen Button zu deinem Kalender hinzu</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold">2.</span>
                        <span>Du erhältst eine Kalender-Erinnerung vor dem Termin</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold">3.</span>
                        <span>Dein Coach wird dich zum vereinbarten Zeitpunkt telefonisch kontaktieren</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold">4.</span>
                        <span>Achte darauf, dass du zur vereinbarten Zeit gut & fokussiert, über dieses wichtige Thema sprechen kannst</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  // Main Booking Form
  return (
    <section className="min-h-screen bg-gradient-to-br from-nf-light to-gray-100 py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
            ✅ Deine BMI-Analyse ist fertig!
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-nf-black mb-4">
            Sichere dir jetzt dein 30-minütiges Beratungsgespräch! 🎯
          </h1>
          <p className="text-lg text-nf-gray">
            Wähle deinen Wunschtermin und wir erstellen deinen persönlichen Plan
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-2xl border-t-4 border-nf-red">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-nf-red" />
                  Buchungsformular
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
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

                  {/* Email */}
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

                  {/* Phone with Country Code */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon *</Label>
                    <div className="flex gap-2">
                      <Select value={countryCode} onValueChange={setCountryCode}>
                        <SelectTrigger className="w-[110px] flex-shrink-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {COUNTRY_CODES.map((item) => (
                            <SelectItem key={item.code} value={item.code}>
                              <span className="flex items-center gap-2">
                                <span>{item.flag}</span>
                                <span>{item.code}</span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="123 456789"
                          className="pl-10"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Date Picker */}
                  <div className="space-y-2">
                    <Label>Wunschdatum *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {selectedDate ? (
                            format(selectedDate, "PPP", { locale: de })
                          ) : (
                            <span>Datum wählen</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarUI
                          mode="single"
                          selected={selectedDate}
                          fromDate={new Date()}
                          toDate={getMaxBookableDate()}
                          onSelect={async (date) => {
                            setSelectedDate(date);
                            setSelectedTime("");
                            if (!date) return;

                            const ds = format(date, 'yyyy-MM-dd');
                            const cached = slotsCache.get(ds);
                            
                            if (cached) {
                              setAvailableSlots(cached);
                              if (cached.length === 0) {
                                toast.error('Keine verfügbaren Zeiten für diesen Tag');
                              }
                              return;
                            }

                            // Lazy load this specific date
                            setIsLoadingSlots(true);
                            try {
                              const { data } = await supabase.functions.invoke('get-available-slots', {
                                body: { date: ds },
                              });
                              const slots = data?.availableSlots || [];
                              setAvailableSlots(slots);

                              setSlotsCache(prev => {
                                const next = new Map(prev);
                                next.set(ds, slots);
                                return next;
                              });

                              if (slots.length === 0) {
                                toast.error('Keine verfügbaren Zeiten für diesen Tag');
                              }
                            } catch {
                              toast.error('Fehler beim Laden der Zeiten');
                              setAvailableSlots([]);
                            } finally {
                              setIsLoadingSlots(false);
                            }
                          }}
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            if (date < today) return true;
                            if (isWeekend(date)) return true;
                            if (isBeforeLeadTime(date)) return true;

                            const maxBookableDate = getMaxBookableDate();
                            if (date > maxBookableDate) return true;

                            return false;
                          }}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Loading indicator for lazy load */}
                  {isLoadingSlots && (
                    <Alert className="border-blue-200 bg-blue-50">
                      <Clock className="h-4 w-4 text-blue-600 animate-spin" />
                      <AlertDescription className="text-blue-800">
                        Verfügbare Zeiten werden geladen...
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Time Picker */}
                  <div className="space-y-2">
                    <Label htmlFor="time">Wunschzeit *</Label>
                    <Select
                      value={selectedTime}
                      onValueChange={setSelectedTime}
                      disabled={!selectedDate || isLoadingSlots}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={
                          isLoadingSlots ? 'Termine werden geladen...' : 
                          !selectedDate ? 'Zuerst Datum wählen' : 
                          availableSlots.length === 0 ? 'Keine Zeiten verfügbar' : 
                          'Uhrzeit wählen'
                        } />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-950 max-h-[300px]">
                        {availableSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time} Uhr
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-nf-red hover:bg-nf-red/90 text-white font-bold py-6 text-lg"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="h-5 w-5 mr-2 animate-spin" />
                        Wird gebucht...
                      </>
                    ) : (
                      <>
                        Jetzt kostenfrei buchen
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

          {/* Right Column: Summary & Trust */}
          <div className="space-y-6">
            {/* Health Data Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
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

            {/* Trust Elements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
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
                      <div className="font-semibold text-blue-900">30 Minuten persönliches Gespräch</div>
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

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
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

// Wrapper component for standalone route
const BookingPage = () => {
  const location = useLocation();
  
  // Get health data from navigation state or use defaults
  const defaultHealthData = {
    bmi: 0,
    bmr: 0,
    tdee: 0,
    height: "0",
    weight: "0",
    age: "0",
    gender: "male",
    goal: "maintain",
    activityLevel: "moderate",
    sleepHours: "7-8",
    stressLevel: "medium",
    additionalInfo: "",
    recommendedCalories: 0,
  };
  
  const healthData = location.state?.healthData || defaultHealthData;

  return <BookingPageComplete healthData={healthData} />;
};

export default BookingPage;
