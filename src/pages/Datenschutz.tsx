import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Datenschutz = () => {
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
          <h1 className="text-4xl font-bold text-nf-black mb-2">Datenschutzerklärung</h1>
          <p className="text-nf-gray-600">Schutz Ihrer persönlichen Daten</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-nf-white border border-nf-gray-200 rounded-lg p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-nf-black mb-4">1. Datenschutz auf einen Blick</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-nf-black mb-2">Allgemeine Hinweise</h3>
              <p className="text-nf-gray-600 mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, 
                wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-black mb-4">2. Allgemeine Hinweise und Pflichtinformationen</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-nf-black mb-2">Datenschutz</h3>
              <p className="text-nf-gray-600 mb-4">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre 
                personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie 
                dieser Datenschutzerklärung.
              </p>
              
              <h3 className="text-lg font-semibold text-nf-black mb-2">Verantwortliche Stelle</h3>
              <p className="text-nf-gray-600 mb-2">Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
              <div className="text-nf-gray-600 mb-4">
                <p>NF COACHING</p>
                <p>Niklas Fuchs & Fabienne Meyer</p>
                <p>Musterstraße 123</p>
                <p>12345 Musterstadt</p>
                <p>Telefon: +49 (0) 123 456789</p>
                <p>E-Mail: info@nf-coaching.de</p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-nf-black mb-4">3. Datenerfassung auf dieser Website</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-nf-black mb-2">Kontaktformular</h3>
              <p className="text-nf-gray-600 mb-4">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular 
                inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall 
                von Anschlussfragen bei uns gespeichert.
              </p>
              
              <h3 className="text-lg font-semibold text-nf-black mb-2">Server-Log-Dateien</h3>
              <p className="text-nf-gray-600 mb-4">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, 
                die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc pl-6 text-nf-gray-600 mb-4">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-nf-black mb-4">4. Ihre Rechte</h2>
            <div className="mb-6">
              <p className="text-nf-gray-600 mb-4">Sie haben jederzeit das Recht:</p>
              <ul className="list-disc pl-6 text-nf-gray-600 mb-4">
                <li>unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten</li>
                <li>die Berichtigung oder Löschung dieser Daten zu verlangen</li>
                <li>eine Einschränkung der Datenverarbeitung zu verlangen</li>
                <li>der Datenverarbeitung zu widersprechen</li>
                <li>sich bei einer Aufsichtsbehörde zu beschweren</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-nf-black mb-4">5. Kontakt</h2>
            <div className="mb-6">
              <p className="text-nf-gray-600">
                Bei Fragen zum Datenschutz wenden Sie sich bitte an: info@nf-coaching.de
              </p>
            </div>

            <div className="mt-8 p-4 bg-nf-gray-50 rounded-lg">
              <p className="text-sm text-nf-gray-600">
                <strong>Hinweis:</strong> Dies ist eine Muster-Datenschutzerklärung. Bitte passen Sie sie an Ihre 
                tatsächlichen Gegebenheiten an und lassen Sie sie rechtlich prüfen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Datenschutz;