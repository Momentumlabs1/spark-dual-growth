import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AGB = () => {
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
          <h1 className="text-4xl font-bold text-nf-black mb-2">Allgemeine Geschäftsbedingungen</h1>
          <p className="text-nf-gray-600">Vertragsbedingungen für NF COACHING Services</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-nf-white border border-nf-gray-200 rounded-lg p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-nf-black mb-4">1. Geltungsbereich</h2>
            <div className="mb-6">
              <p className="text-nf-gray-600 mb-4">
                Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen NF COACHING 
                (Niklas Fuchs & Fabienne Meyer) und den Kunden über die Erbringung von Coaching-Dienstleistungen 
                im Bereich Health & Fitness.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-black mb-4">2. Vertragsgegenstand</h2>
            <div className="mb-6">
              <p className="text-nf-gray-600 mb-4">
                NF COACHING bietet ganzheitliche Online Health & Fitness Coaching Services an, bestehend aus:
              </p>
              <ul className="list-disc pl-6 text-nf-gray-600 mb-4">
                <li>Individuelle Ernährungsberatung und -pläne</li>
                <li>Personalisierte Trainingspläne</li>
                <li>Lifestyle und Mindset Coaching</li>
                <li>Regelmäßige Betreuung und Anpassungen</li>
                <li>Online Beratungsgespräche</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-nf-black mb-4">3. Vertragsabschluss</h2>
            <div className="mb-6">
              <p className="text-nf-gray-600 mb-4">
                Der Vertrag kommt durch die Buchung eines Coaching-Pakets und die Bestätigung durch NF COACHING zustande. 
                Die Buchung erfolgt über die Website oder im direkten Kontakt. Ein kostenloses Erstberatungsgespräch 
                dient der Bedarfsermittlung und stellt noch keinen Vertragsabschluss dar.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-black mb-4">4. Leistungen und Pflichten</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-nf-black mb-2">Unsere Leistungen:</h3>
              <ul className="list-disc pl-6 text-nf-gray-600 mb-4">
                <li>Professionelle und individuelle Beratung</li>
                <li>Regelmäßige Kommunikation und Betreuung</li>
                <li>Anpassung der Pläne basierend auf Fortschritt</li>
                <li>Unterstützung bei der Zielerreichung</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-nf-black mb-2">Kundenpflichten:</h3>
              <ul className="list-disc pl-6 text-nf-gray-600 mb-4">
                <li>Ehrliche und vollständige Angaben zur Gesundheit</li>
                <li>Aktive Mitarbeit und Umsetzung der Empfehlungen</li>
                <li>Regelmäßige Kommunikation und Feedback</li>
                <li>Termingerechte Zahlung der vereinbarten Beträge</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-nf-black mb-4">5. Preise und Zahlung</h2>
            <div className="mb-6">
              <p className="text-nf-gray-600 mb-4">
                Die Preise richten sich nach dem gewählten Coaching-Paket und sind auf der Website oder im 
                individuellen Angebot ersichtlich. Die Zahlung erfolgt per Banküberweisung oder anderen 
                vereinbarten Zahlungsmethoden.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-black mb-4">6. Widerrufsrecht</h2>
            <div className="mb-6">
              <p className="text-nf-gray-600 mb-4">
                Als Verbraucher haben Sie ein 14-tägiges Widerrufsrecht ab Vertragsabschluss. Das Widerrufsrecht 
                erlischt bei Dienstleistungen, wenn der Vertrag vollständig erfüllt wurde und die Ausführung 
                mit Ihrer ausdrücklichen Zustimmung begonnen hat.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-black mb-4">7. Haftungsausschluss</h2>
            <div className="mb-6">
              <p className="text-nf-gray-600 mb-4">
                NF COACHING haftet nur für Schäden, die auf vorsätzlichem oder grob fahrlässigem Verhalten beruhen. 
                Die Coaching-Dienstleistungen ersetzen keine medizinische Behandlung. Bei gesundheitlichen Problemen 
                konsultieren Sie bitte einen Arzt.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-black mb-4">8. Schlussbestimmungen</h2>
            <div className="mb-6">
              <p className="text-nf-gray-600 mb-4">
                Es gilt deutsches Recht. Gerichtsstand ist der Sitz von NF COACHING. Sollten einzelne Bestimmungen 
                dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
              </p>
            </div>

            <div className="mt-8 p-4 bg-nf-gray-50 rounded-lg">
              <p className="text-sm text-nf-gray-600">
                <strong>Hinweis:</strong> Dies sind Muster-AGB. Bitte lassen Sie diese von einem Rechtsanwalt 
                an Ihr Geschäftsmodell anpassen und rechtlich prüfen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AGB;