import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Datenschutz = () => {
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
          <h1 className="text-4xl font-bold text-nf-white mb-2">Datenschutzerklärung</h1>
          <p className="text-nf-white/80">Schutz Ihrer persönlichen Daten</p>
        </div>

        <div className="prose prose-xl max-w-none">
          <div className="bg-nf-black/50 border border-nf-white/10 rounded-lg p-8 md:p-12 shadow-soft">
            <h2 className="text-2xl font-semibold text-nf-white mb-4">1. Datenschutz auf einen Blick</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-nf-white mb-2">Allgemeine Hinweise</h3>
              <p className="text-nf-white/80 mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, 
                wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. 
                Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
              </p>

              <h3 className="text-lg font-semibold text-nf-white mb-2">Datenerfassung auf dieser Website</h3>
              <h4 className="font-semibold text-nf-white mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
              <p className="text-nf-white/80 mb-4">
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt 
                „Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
              </p>

              <h4 className="font-semibold text-nf-white mb-2">Wie erfassen wir Ihre Daten?</h4>
              <p className="text-nf-white/80 mb-4">
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, 
                die Sie in ein Kontaktformular eingeben.
              </p>
              <p className="text-nf-white/80 mb-4">
                Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. 
                Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). 
                Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
              </p>

              <h4 className="font-semibold text-nf-white mb-2">Wofür nutzen wir Ihre Daten?</h4>
              <p className="text-nf-white/80 mb-4">
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur 
                Analyse Ihres Nutzerverhaltens verwendet werden. Sofern über die Website Verträge geschlossen oder angebahnt werden können, 
                werden die übermittelten Daten auch für Vertragsangebote, Bestellungen oder sonstige Auftragsanfragen verarbeitet.
              </p>

              <h4 className="font-semibold text-nf-white mb-2">Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
              <p className="text-nf-white/80 mb-4">
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen 
                Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine 
                Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. 
                Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. 
                Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
              </p>
              <p className="text-nf-white/80 mb-4">
                Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
              </p>

              <h3 className="text-lg font-semibold text-nf-white mb-2">Analyse-Tools und Tools von Drittanbietern</h3>
              <p className="text-nf-white/80 mb-4">
                Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit sogenannten Analyseprogrammen.
              </p>
              <p className="text-nf-white/80 mb-4">
                Detaillierte Informationen zu diesen Analyseprogrammen finden Sie in der folgenden Datenschutzerklärung.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-white mb-4">2. Hosting</h2>
            <div className="mb-6">
              <p className="text-nf-white/80 mb-4">Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</p>
              
              <h3 className="text-lg font-semibold text-nf-white mb-2">Strato</h3>
              <p className="text-nf-white/80 mb-4">
                Anbieter ist die Strato AG, Otto-Ostrowski-Straße 7, 10249 Berlin (nachfolgend „Strato"). Wenn Sie unsere Website besuchen, 
                erfasst Strato verschiedene Logfiles inklusive Ihrer IP-Adressen.
              </p>
              <p className="text-nf-white/80 mb-4">
                Weitere Informationen entnehmen Sie der Datenschutzerklärung von Strato: 
                <a href="https://www.strato.de/datenschutz/" target="_blank" rel="noopener noreferrer" className="text-nf-red hover:text-nf-red/80 underline ml-1">
                  https://www.strato.de/datenschutz/
                </a>.
              </p>
              <p className="text-nf-white/80 mb-4">
                Die Verwendung von Strato erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer 
                möglichst zuverlässigen Darstellung unserer Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die 
                Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die 
                Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des 
                TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-white mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-nf-white mb-2">Datenschutz</h3>
              <p className="text-nf-white/80 mb-4">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten 
                vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>
              <p className="text-nf-white/80 mb-4">
                Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen 
                Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir 
                sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
              </p>
              <p className="text-nf-white/80 mb-4">
                Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. 
                Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
              </p>

              <h3 className="text-lg font-semibold text-nf-white mb-2">Hinweis zur verantwortlichen Stelle</h3>
              <p className="text-nf-white/80 mb-2">Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
              <div className="text-nf-white/80 mb-4">
                <p>Niklas Hauger</p>
                <p>Düsseldorfer Straße 38</p>
                <p>40667 Meerbusch</p>
                <p>Telefon: +49 1525 6961651</p>
                <p>E-Mail: Nikhauger@gmail.com</p>
              </div>
              <p className="text-nf-white/80 mb-4">
                Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und 
                Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-white mb-4">4. Datenerfassung auf dieser Website</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-nf-white mb-2">Cookies</h3>
              <p className="text-nf-white/80 mb-4">
                Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. 
                Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. 
                Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese 
                selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-white mb-4">5. Soziale Medien</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-nf-white mb-2">Instagram</h3>
              <p className="text-nf-white/80 mb-4">
                Auf dieser Website sind Funktionen des Dienstes Instagram eingebunden. Diese Funktionen werden angeboten durch die Meta Platforms Ireland Limited, 
                Merrion Road, Dublin 4, D04 X2K5, Irland.
              </p>
              <p className="text-nf-white/80 mb-4">
                Wenn das Social-Media-Element aktiv ist, wird eine direkte Verbindung zwischen Ihrem Endgerät und dem Instagram-Server hergestellt. 
                Instagram erhält dadurch Informationen über den Besuch dieser Website durch Sie.
              </p>
              <p className="text-nf-white/80 mb-4">
                Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von Instagram: 
                <a href="https://privacycenter.instagram.com/policy/" target="_blank" rel="noopener noreferrer" className="text-nf-red hover:text-nf-red/80 underline ml-1">
                  https://privacycenter.instagram.com/policy/
                </a>.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-white mb-4">6. Newsletter</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-nf-white mb-2">Newsletterdaten</h3>
              <p className="text-nf-white/80 mb-4">
                Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine E-Mail-Adresse sowie Informationen, 
                welche uns die Überprüfung gestatten, dass Sie der Inhaber der angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters 
                einverstanden sind. Weitere Daten werden nicht bzw. nur auf freiwilliger Basis erhoben. Diese Daten verwenden wir ausschließlich für 
                den Versand der angeforderten Informationen und geben diese nicht an Dritte weiter.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-white mb-4">7. Kontakt</h2>
            <div className="mb-6">
              <p className="text-nf-white/80">
                Bei Fragen zum Datenschutz wenden Sie sich bitte an: info@niklashauger.de
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Datenschutz;