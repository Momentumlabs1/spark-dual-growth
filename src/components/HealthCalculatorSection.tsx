import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Activity, Target, Zap } from 'lucide-react';

const HealthCalculatorCTA = () => {
  const navigate = useNavigate();
  return (
    <section className="py-6 sm:py-20 px-3 sm:px-4 bg-gradient-to-b from-white to-red-50/30">
      <div className="max-w-5xl mx-auto">
        {/* Main Card */}
        <div className="relative bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-12 md:p-16 text-center border-2 border-red-100 shadow-2xl overflow-hidden">
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-200/30 rounded-full blur-3xl -z-0"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-200/30 rounded-full blur-3xl -z-0"></div>
          
          {/* Content */}
          <div className="relative z-10">
            {/* Heading */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-6 leading-tight">
              Dein Gesundheits-Check
            </h2>
            
            {/* Description */}
            <p className="text-sm sm:text-lg md:text-xl text-gray-700 mb-5 sm:mb-10 max-w-2xl mx-auto">
              Berechne deinen <span className="font-bold text-red-600">BMI</span> und erhalte 
              <span className="font-bold text-red-600"> personalisierte Health-Tipps</span> – 
              wissenschaftlich fundiert & einfach umzusetzen
            </p>

            {/* Feature Grid */}
            <div className="flex justify-center items-center gap-6 sm:gap-12 mb-5 sm:mb-10">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mb-2">
                  <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-xs sm:text-base text-center">BMI-<br/>Berechnung</h3>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-xs sm:text-base text-center">Kalorien-<br/>bedarf</h3>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-pink-100 rounded-full flex items-center justify-center mb-2">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-xs sm:text-base text-center">Health-<br/>Tipps</h3>
              </div>
            </div>

            {/* CTA Button */}
            <button 
              className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-12 py-4 sm:py-7 text-base sm:text-xl font-bold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group w-full sm:w-auto inline-flex items-center justify-center"
              onClick={() => navigate('/gesundheitscheck')}
            >
              Jetzt kostenlos starten
              <ArrowRight className="ml-2 w-4 h-4 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-8 mt-4 sm:mt-8 text-gray-600">
              <span className="flex items-center gap-1.5 text-xs sm:text-sm">
                <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Keine Anmeldung
              </span>
              <span className="flex items-center gap-1.5 text-xs sm:text-sm">
                <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                100% kostenlos
              </span>
              <span className="flex items-center gap-1.5 text-xs sm:text-sm">
                <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                2 Minuten
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthCalculatorCTA;