import { useState } from "react";
import { Widget } from "@typeform/embed-react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TYPEFORM_ID = "p2cV3eQb";

const Bewerbung = () => {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="min-h-screen bg-nf-white flex flex-col">
      {/* Schlanker Header – bewusst ohne Navigation, damit im Funnel nichts ablenkt */}
      <header className="flex-shrink-0 w-full bg-nf-white border-b border-nf-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            className="flex items-center cursor-pointer"
          >
            <img src="/assets/main-logo-weiss.png" alt="NF Coaching Logo" className="h-10 sm:h-12 w-auto" />
          </a>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-medium text-nf-black/70 hover:text-nf-red transition-smooth"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zur Seite
          </button>
        </div>
      </header>

      {/* Typeform */}
      <main className="flex-1 relative">
        {!isReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-nf-white">
            <Loader2 className="h-8 w-8 animate-spin text-nf-red" />
            <p className="text-sm text-nf-black/60">Deine Fragen werden geladen …</p>
          </div>
        )}

        <Widget
          id={TYPEFORM_ID}
          className="w-full h-full"
          style={{ width: "100%", height: "100%", minHeight: "calc(100vh - 4rem)" }}
          onReady={() => setIsReady(true)}
          inlineOnMobile
        />
      </main>
    </div>
  );
};

export default Bewerbung;
