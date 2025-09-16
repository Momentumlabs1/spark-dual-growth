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
          <p className="text-nf-gray-600">für die Erbringung von Dienstleistungen von Niklas Hauger Coaching</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-nf-white border border-nf-gray-200 rounded-lg p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-nf-black mb-4">1. Allgemeines</h2>
            <div className="mb-6">
              <p className="text-nf-gray-600 mb-4">
                1.1 Diese Allgemeinen Geschäftsbedingungen (AGB) für die Erbringung von Dienstleistungen gelten für Verträge, 
                die zwischen dem Auftraggeber und dem Auftragnehmer unter Einbeziehung dieser AGB geschlossen werden.
              </p>
              <p className="text-nf-gray-600 mb-4">
                1.2 Der Auftragnehmer ist berechtigt, in eigenem Namen und auf eigene Rechnung die erforderlichen Leistungen 
                an Subunternehmer zu vergeben, die ihrerseits ebenfalls Subunternehmer einsetzen dürfen. Der Auftragnehmer bleibt 
                hierbei alleiniger Vertragspartner des Auftraggebers.
              </p>
              <p className="text-nf-gray-600 mb-4">
                1.3 Soweit neben diesen AGB weitere Vertragsdokumente oder andere Geschäftsbedingungen in Text- oder Schriftform 
                Vertragsbestandteil geworden sind, gehen die Regelungen dieser weiteren Vertragsdokumente im Widerspruchsfalle 
                den vorliegenden AGB vor.
              </p>
              <p className="text-nf-gray-600 mb-4">
                1.4 Von diesen Geschäftsbedingungen abweichende AGB, die durch den Auftraggeber verwendet werden, erkennt 
                Auftragnehmer – vorbehaltlich einer ausdrücklichen Zustimmung – nicht an.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-black mb-4">2. Vertragsgegenstand und Leistungsumfang</h2>
            <div className="mb-6">
              <p className="text-nf-gray-600 mb-4">
                2.1 Der Auftragnehmer erbringt als selbständiger Unternehmer folgende Leistungen gegenüber dem Auftraggeber:
              </p>
              <p className="text-nf-gray-600 mb-4">
                Erstellung individueller Ernährungs- und Trainingspläne (digitale Produkte) mit regelmäßiger Betreuung
              </p>
              <p className="text-nf-gray-600 mb-4">
                2.2 Der spezifische Leistungsumfang ist Gegenstand von Individualvereinbarungen zwischen Auftragnehmer und dem Auftraggeber.
              </p>
              <p className="text-nf-gray-600 mb-4">
                2.3 Der Auftragnehmer erbringt die vertragsgemäßen Leistungen mit größtmöglicher Sorgfalt und Gewissenhaftigkeit 
                nach dem jeweils neuesten Stand, neuesten Regeln und Erkenntnissen.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-black mb-4">3. Mitwirkungspflichten des Auftraggebers</h2>
            <div className="mb-6">
              <p className="text-nf-gray-600 mb-4">
                Es obliegt dem Auftraggeber, die von ihm zum Zwecke der Leistungserfüllung zur Verfügung zu stellenden Informationen, 
                Daten und sonstigen Inhalte vollständig und korrekt mitzuteilen. Für Verzögerungen und Verspätungen bei der 
                Leistungserbringung, die durch eine verspätete und notwendige Mit- bzw. Zuarbeit des Kunden entstehen, ist der 
                Auftragnehmer gegenüber dem Kunden in keinerlei Hinsicht verantwortlich.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-black mb-4">4. Vergütung</h2>
            <div className="mb-6">
              <p className="text-nf-gray-600 mb-4">4.1 Die Vergütung wird individualvertraglich vereinbart.</p>
              <p className="text-nf-gray-600 mb-4">
                4.2 Die Vergütung ist nach der Leistung der Dienste zu entrichten. Ist die Vergütung nach Zeitabschnitten bemessen, 
                so ist sie nach dem Ablauf der einzelnen Zeitabschnitte zu entrichten (§ 614 BGB).
              </p>
              <p className="text-nf-gray-600 mb-4">
                4.3 Der Auftragnehmer stellt dem Auftraggeber nach Erbringung der Leistungen eine Rechnung per Post oder per E-Mail 
                (z.B. als PDF). Die Vergütung ist innerhalb von 14 Tagen nach Zugang der Rechnung zur Zahlung fällig.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-black mb-4">5. Haftung / Freistellung</h2>
            <div className="mb-6">
              <p className="text-nf-gray-600 mb-4">
                5.1 Der Auftragnehmer haftet aus jedem Rechtsgrund uneingeschränkt bei Vorsatz oder grober Fahrlässigkeit, bei 
                vorsätzlicher oder fahrlässiger Verletzung des Lebens, des Körpers oder der Gesundheit, aufgrund eines Garantieversprechens, 
                soweit diesbezüglich nichts anderes geregelt ist oder aufgrund zwingender Haftung.
              </p>
              <p className="text-nf-gray-600 mb-4">
                5.2 Der Auftraggeber stellt den Auftragnehmer von jeglichen Ansprüchen Dritter frei, die gegen den Auftragnehmer 
                aufgrund von Verstößen des Kunden gegen diese Vertragsbedingungen oder gegen geltendes Recht geltend gemacht werden.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-black mb-4">6. Vertragsdauer und Kündigung</h2>
            <div className="mb-6">
              <p className="text-nf-gray-600 mb-4">
                6.1 Die Vertragsdauer und die Fristen zur ordentlichen Kündigung vereinbaren die Parteien individuell.
              </p>
              <p className="text-nf-gray-600 mb-4">
                6.2 Das Recht beider Parteien zur fristlosen Kündigung aus wichtigem Grund bleibt unberührt.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-black mb-4">7. Vertraulichkeit und Datenschutz</h2>
            <div className="mb-6">
              <p className="text-nf-gray-600 mb-4">
                7.1 Der Auftragnehmer wird alle ihm im Zusammenhang mit dem Auftrag zur Kenntnis gelangenden Vorgänge streng vertraulich behandeln.
              </p>
              <p className="text-nf-gray-600 mb-4">
                7.2 Der Auftragnehmer verpflichtet sich, bei der Durchführung des Auftrags sämtliche datenschutzrechtlichen Vorschriften 
                – insbesondere die Vorschriften der Datenschutzgrundverordnung und des Bundesdatenschutzgesetzes – einzuhalten.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-black mb-4">8. Schlussbestimmungen</h2>
            <div className="mb-6">
              <p className="text-nf-gray-600 mb-4">8.1 Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des CISG.</p>
              <p className="text-nf-gray-600 mb-4">
                8.2 Sollte eine Bestimmung dieser AGB unwirksam sein oder werden, so wird die Gültigkeit der AGB im Übrigen hiervon nicht berührt.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-black mb-4">9. Informationen zur Online-Streitbeilegung / Verbraucherschlichtung</h2>
            <div className="mb-6">
              <p className="text-nf-gray-600 mb-4">
                Die EU-Kommission stellt im Internet unter folgendem Link eine Plattform zur Online-Streitbeilegung bereit: 
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
              <p className="text-nf-gray-600 mb-4">
                Diese Plattform dient als Anlaufstelle zur außergerichtlichen Beilegung von Streitigkeiten aus Online-Kauf- oder 
                Dienstleistungsverträgen, an denen ein Verbraucher beteiligt ist. Der Anbieter ist weder bereit noch verpflichtet, 
                an einem Verbraucherstreitschlichtungsverfahren nach dem VSBG teilzunehmen.
              </p>
              <p className="text-nf-gray-600 mb-4">Unsere E-Mail-Adresse: info@niklashauger.de</p>
            </div>

            <h2 className="text-2xl font-semibold text-nf-black mb-4">Widerrufsbelehrung</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-nf-black mb-2">Widerrufsrecht für Verbraucher</h3>
              <p className="text-nf-gray-600 mb-4">
                <em>Verbraucher ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer 
                gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können.</em>
              </p>
              <p className="text-nf-gray-600 mb-4">
                Sie haben das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt 
                14 Tage ab dem Tag des Vertragsabschlusses.
              </p>
              <p className="text-nf-gray-600 mb-4">
                Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Niklas Hauger Coaching, Wiener Straße 61, 42657 Solingen, 
                Telefon: +49 1525 6961651, E-Mail: info@niklashauger.de) mittels einer eindeutigen Erklärung (z. B. ein mit der Post 
                versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.
              </p>

              <h3 className="text-lg font-semibold text-nf-black mb-2">Folgen des Widerrufs</h3>
              <p className="text-nf-gray-600 mb-4">
                Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich 
                der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung 
                als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn 
                Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AGB;