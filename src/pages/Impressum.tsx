import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Impressum = () => {
  return (
    <div className="min-h-screen bg-nf-white pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zur Startseite
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-nf-black mb-2">Impressum</h1>
          <p className="text-nf-gray-600">Angaben gemäß § 5 TMG</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-nf-white border border-nf-gray-200 rounded-lg p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-nf-black mb-4">Anbieter</h2>
            <div className="mb-6">
              <p className="text-nf-black"><strong>NF COACHING</strong></p>
              <p className="text-nf-gray-600">Niklas Fuchs & Fabienne Meyer</p>
              <p className="text-nf-gray-600">Musterstraße 123</p>
              <p className="text-nf-gray-600">12345 Musterstadt</p>
              <p className="text-nf-gray-600">Deutschland</p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-black mb-4">Kontakt</h2>
            <div className="mb-6">
              <p className="text-nf-gray-600">Telefon: +49 (0) 123 456789</p>
              <p className="text-nf-gray-600">E-Mail: info@nf-coaching.de</p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-black mb-4">Umsatzsteuer-ID</h2>
            <div className="mb-6">
              <p className="text-nf-gray-600">Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
              <p className="text-nf-gray-600">DE123456789 (Beispiel - durch echte ID ersetzen)</p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-black mb-4">Verantwortlich für den Inhalt</h2>
            <div className="mb-6">
              <p className="text-nf-gray-600">Nach § 55 Abs. 2 RStV:</p>
              <p className="text-nf-gray-600">Niklas Fuchs & Fabienne Meyer</p>
              <p className="text-nf-gray-600">Musterstraße 123</p>
              <p className="text-nf-gray-600">12345 Musterstadt</p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-black mb-4">Haftungsausschluss</h2>
            <div className="space-y-4 text-nf-gray-600">
              <div>
                <h3 className="font-semibold text-nf-black">Haftung für Inhalte</h3>
                <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-nf-black">Haftung für Links</h3>
                <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-nf-gray-50 rounded-lg">
              <p className="text-sm text-nf-gray-600">
                <strong>Hinweis:</strong> Dies ist ein Muster-Impressum. Bitte passen Sie alle Angaben an Ihre tatsächlichen Daten an und lassen Sie es rechtlich prüfen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impressum;