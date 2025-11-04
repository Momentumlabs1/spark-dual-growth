import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HealthCalculatorCTA = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-red-50 via-orange-50 to-red-50 rounded-3xl p-12 md:p-16 text-center border-2 border-red-100 shadow-xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Dein Gesundheits-Check
          </h2>
          
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Berechne deinen BMI und personalisierten Kalorienbedarf in nur 2 Minuten
          </p>

          <Button 
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-12 py-7 text-xl font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all group"
            onClick={() => window.location.href = '/gesundheits-rechner'}
          >
            Jetzt kostenlos starten
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>

          <div className="flex items-center justify-center gap-8 mt-8 text-gray-600">
            <span className="text-sm">✓ Keine Anmeldung</span>
            <span className="text-sm">✓ 100% kostenlos</span>
            <span className="text-sm">✓ 2 Minuten</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthCalculatorCTA;
