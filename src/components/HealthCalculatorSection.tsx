import React from 'react';
import { ArrowRight, Activity, Target, Zap } from 'lucide-react';

const HealthCalculatorCTA = () => {
  return (
    <section className="py-12 sm:py-20 px-4 bg-gradient-to-b from-white to-red-50/30">
      <div className="max-w-5xl mx-auto">
        {/* Main Card */}
        <div className="relative bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-12 md:p-16 text-center border-2 border-red-100 shadow-2xl overflow-hidden">
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-red-200/30 rounded-full blur-3xl -z-0"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-200/30 rounded-full blur-3xl -z-0"></div>
          
          {/* Content */}
          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-red-600 mb-6 shadow-md">
              <Zap className="w-4 h-4 fill-red-600" />
              Nur 2 Minuten
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Dein<br className="sm:hidden" /> Gesundheits-Check
            </h2>
            
            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
              Berechne deinen <span className="font-bold text-red-600">BMI</span> und erhalte 
              <span className="font-bold text-red-600"> personalisierte Health-Tipps</span> – 
              wissenschaftlich fundiert & einfach umzusetzen
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 max-w-3xl mx-auto">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">BMI-Berechnung</h3>
                <p className="text-xs sm:text-sm text-gray-600">Exakte Analyse deines Körpergewichts</p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Kalorienbedarf</h3>
                <p className="text-xs sm:text-sm text-gray-600">Personalisiert auf deine Ziele</p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Health-Tipps</h3>
                <p className="text-xs sm:text-sm text-gray-600">Praktische Empfehlungen für deinen Alltag</p>
              </div>
            </div>

            {/* CTA Button */}
            <button 
              className="bg-red-600 hover:bg-red-700 text-white px-8 sm:px-12 py-6 sm:py-7 text-lg sm:text-xl font-bold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group w-full sm:w-auto inline-flex items-center justify-center"
              onClick={() => alert('Weiterleitung zu /gesundheits-rechner')}
            >
              Jetzt kostenlos starten
              <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-6 sm:mt-8 text-gray-600">
              <span className="flex items-center gap-2 text-xs sm:text-sm">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Keine Anmeldung
              </span>
              <span className="flex items-center gap-2 text-xs sm:text-sm">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                100% kostenlos
              </span>
              <span className="flex items-center gap-2 text-xs sm:text-sm">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                2 Minuten
              </span>
            </div>

            {/* Social Proof */}
            <div className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500">
              <p>🔥 Bereits über <span className="font-bold text-red-600">10.000+</span> zufriedene Nutzer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthCalculatorCTA;