import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Impressum = () => {
  return (
    <div className="min-h-screen bg-nf-black pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4 text-nf-white hover:bg-nf-red/20">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zur Startseite
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-nf-white mb-2">Impressum</h1>
          <p className="text-nf-white/80">Angaben gemäß § 5 TMG</p>
        </div>

        <div className="prose prose-xl max-w-none">
          <div className="bg-nf-black/50 border border-nf-white/10 rounded-lg p-8 md:p-12 shadow-soft">
            <div className="mb-6">
              <p className="text-nf-white"><strong>Niklas Hauger</strong></p>
              <p className="text-nf-white/80">Fitness Online Coaching</p>
              <p className="text-nf-white/80">Düsseldorfer Straße 38</p>
              <p className="text-nf-white/80">40667 Meerbusch</p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-white mb-4">Kontakt</h2>
            <div className="mb-6">
              <p className="text-nf-white/80">Telefon: +49 1525 6961651</p>
              <p className="text-nf-white/80">E-Mail: info@niklashauger.de</p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-white mb-4">Umsatzsteuer-ID</h2>
            <div className="mb-6">
              <p className="text-nf-white/80">Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
              <p className="text-nf-white/80">DE313550708</p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-white mb-4">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
            <div className="mb-6">
              <p className="text-nf-white/80">Berufsbezeichnung: Online Coach</p>
              <p className="text-nf-white/80">Verliehen in: Deutschland</p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-white mb-4">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
            <div className="mb-6">
              <p className="text-nf-white/80">Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impressum;