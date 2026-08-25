import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Inhalt entspricht dem von NF Coaching gelieferten AGB-Dokument (9 Seiten, 23 Abschnitte).
const SECTIONS: { title: string; items: string[] }[] = [
  {
    title: "1. Geltungsbereich",
    items: [
      "1.1 Diese Allgemeinen Geschäftsbedingungen gelten für sämtliche Verträge zwischen NF Coaching, Inhaber Niklas Hauger, Saarlandstraße 11b, 47839 Krefeld, E Mail: info@niklashauger.de, nachfolgend „Anbieter“, und seinen Kunden über die Erbringung von Online Coaching Leistungen.",
      "1.2 Das Angebot des Anbieters richtet sich ausschließlich an volljährige Personen. Ein Vertragsschluss mit Minderjährigen ist ausgeschlossen.",
      "1.3 Der Anbieter richtet sich insbesondere an Kunden mit Wohnsitz in Deutschland, Österreich und der Schweiz. Es gilt deutsches Recht, soweit dem keine zwingenden gesetzlichen Verbraucherschutzvorschriften des Staates entgegenstehen, in dem der Kunde seinen gewöhnlichen Aufenthalt hat.",
      "1.4 Abweichende, entgegenstehende oder ergänzende Bedingungen des Kunden werden nicht Vertragsbestandteil, es sei denn, der Anbieter stimmt deren Geltung ausdrücklich in Textform zu.",
      "1.5 Individuelle Vereinbarungen zwischen Anbieter und Kunde gehen diesen Allgemeinen Geschäftsbedingungen vor.",
    ],
  },
  {
    title: "2. Vertragsschluss",
    items: [
      "2.1 Die Leistungen des Anbieters sind erklärungsbedürftig. Ein Vertragsschluss erfolgt regelmäßig nach einem vorherigen Erstgespräch oder Beratungsgespräch.",
      "2.2 Der Vertrag kommt je nach Buchungsweg zustande durch Annahme eines dem Kunden über Zenfit übermittelten Angebots durch Anklicken der hierfür vorgesehenen Schaltfläche und Eingabe der Zahlungsdaten, durch Kauf eines Coaching Produkts über Ablefy durch Abschluss des dortigen Bestellvorgangs oder durch eine anderweitige ausdrückliche Annahme eines individuellen Angebots in Textform.",
      "2.3 Rein unverbindliche Fragen wie „Kann ich kündigen?“, „Kann ich früher raus?“, „Kann ich das Coaching beenden?“ oder vergleichbare Formulierungen stellen keine Kündigung und keine Vertragsbeendigung dar. Für eine Kündigung ist eine eindeutige Erklärung erforderlich, aus der klar hervorgeht, dass der Kunde den Vertrag kündigen will.",
      "2.4 Der Anbieter ist berechtigt, den Vertragsschluss abzulehnen, insbesondere wenn aus Sicht des Anbieters gesundheitliche, organisatorische oder sonstige Gründe gegen eine verantwortbare Durchführung des Coachings sprechen.",
      "2.5 Mündliche Aussagen im Erstgespräch dienen der Erläuterung des Angebots. Maßgeblich für Laufzeit, Preis, Zahlungsweise und Leistungsumfang ist das jeweils vom Kunden angenommene Angebot oder der jeweilige Checkout.",
    ],
  },
  {
    title: "3. Vertragsarten über Zenfit und Ablefy",
    items: [
      "3.1 Bei Verträgen über Zenfit handelt es sich regelmäßig um Coaching Verträge mit einer vereinbarten Mindestlaufzeit. Nach Ablauf der Mindestlaufzeit verlängert sich der Vertrag jeweils um einen weiteren Monat, sofern er nicht wirksam gekündigt wird.",
      "3.2 Bei Verträgen über Ablefy handelt es sich regelmäßig um Coaching Produkte mit fester Laufzeit. Diese Verträge enden automatisch mit Ablauf der gebuchten Laufzeit, sofern im jeweiligen Angebot nicht ausdrücklich etwas anderes vereinbart wurde. Eine Kündigung ist bei diesen Verträgen grundsätzlich nicht erforderlich.",
      "3.3 Die konkrete Vertragsart, Laufzeit, Vergütung und Zahlungsweise ergeben sich aus dem jeweiligen Angebot, Checkout oder der individuellen Vereinbarung.",
    ],
  },
  {
    title: "4. Leistungsgegenstand",
    items: [
      "4.1 Der Anbieter erbringt Online Coaching Leistungen in den Bereichen Ernährung, Training, Gewichtsreduktion, Alltagsstruktur und Lifestyle Begleitung.",
      "4.2 Das Coaching dient der alltagsnahen Unterstützung bei der Umsetzung von Ernährungs und Trainingszielen. Es handelt sich nicht um eine medizinische, heilkundliche, psychotherapeutische oder psychologische Behandlung.",
      "4.3 Der Anbieter schuldet keine ärztliche Diagnose, keine Therapie, keine Heilbehandlung und keinen bestimmten gesundheitlichen oder körperlichen Erfolg.",
      "4.4 Der konkrete Leistungsumfang richtet sich nach dem jeweils gebuchten Paket oder der individuell getroffenen Vereinbarung. Leistungen können insbesondere individuelle Ernährungsplanung, individuelle Trainingsplanung, individuelle Rezepte, Kalorien und Makro Vorgaben, wöchentliche Check ins, Chat Betreuung über die Coaching App, Technikvideos, Feedback auf eingesendete Trainingsvideos, Anpassungen von Ernährung und Training, Lifestyle Begleitung, allgemeine Einordnung von Supplements auf Lifestyle Ebene sowie allgemeine Einordnung von Blutwerten auf Lifestyle Ebene umfassen, sofern dies Bestandteil des gebuchten Angebots ist.",
      "4.5 Eine medizinische Bewertung von Blutbildern, Diagnosen, Erkrankungen, Medikamenten oder Beschwerden erfolgt nicht. Der Kunde ist verpflichtet, medizinische Fragen mit einem Arzt oder sonstigen qualifizierten Behandler zu klären.",
    ],
  },
  {
    title: "5. App Zugang und digitale Inhalte",
    items: [
      "5.1 Die Betreuung erfolgt grundsätzlich über die Zenfit App oder eine vom Anbieter hierfür eingesetzte vergleichbare Coaching Plattform.",
      "5.2 Nach Vertragsschluss erhält der Kunde Zugang zur Coaching Plattform. Der Zugang dient der Kommunikation, dem Ausfüllen des Fragebogens, der Bereitstellung von Inhalten und der Durchführung des Coachings.",
      "5.3 Die vom Anbieter bereitgestellten Pläne, Rezepte, Videos, Auswertungen, Nachrichten, PDF Dokumente und sonstigen Inhalte werden grundsätzlich digital bereitgestellt.",
      "5.4 Die Inhalte werden dem Kunden ausschließlich für die Dauer der aktiven Vertragslaufzeit zur Verfügung gestellt, sofern im jeweiligen Angebot nichts anderes vereinbart wurde.",
      "5.5 Nach Vertragsende ist der Anbieter berechtigt, den Zugang zur Coaching Plattform und zu den dort bereitgestellten Inhalten zu deaktivieren oder zu löschen.",
      "5.6 Der Kunde darf bereitgestellte Inhalte ausschließlich für eigene private Zwecke nutzen. Screenshots zur eigenen privaten Nutzung sind erlaubt. Eine Weitergabe, Veröffentlichung, Vervielfältigung, kommerzielle Nutzung, Überlassung an Dritte oder Nutzung für andere Personen ist untersagt.",
      "5.7 Zugangsdaten dürfen nicht an Dritte weitergegeben werden.",
    ],
  },
  {
    title: "6. Onboarding Fragebogen und Planerstellung",
    items: [
      "6.1 Der Kunde ist verpflichtet, den vom Anbieter bereitgestellten Onboarding Fragebogen vollständig, richtig und wahrheitsgemäß auszufüllen.",
      "6.2 Der Fragebogen kann insbesondere Angaben zu Person, Adresse, Körperdaten, Zielsetzung, Gewicht, Fotos, Gesundheitszustand, Medikamenten, Trainingsstand, Essverhalten, Alltag und sonstigen coachingrelevanten Umständen enthalten.",
      "6.3 Die vollständige und richtige Beantwortung des Fragebogens ist Voraussetzung für die individuelle Planerstellung.",
      "6.4 Verzögerungen, die durch fehlende, verspätete, unvollständige oder falsche Angaben des Kunden entstehen, gehen nicht zulasten des Anbieters. Die Vertragslaufzeit und Zahlungspflichten bleiben hiervon unberührt.",
      "6.5 Nach vollständigem Eingang der erforderlichen Angaben erfolgt die Ausarbeitung der individuellen Pläne in der Regel innerhalb von drei bis fünf Werktagen. Samstage, Sonntage und gesetzliche Feiertage am Sitz des Anbieters gelten nicht als Werktage.",
    ],
  },
  {
    title: "7. Mitwirkungspflichten des Kunden",
    items: [
      "7.1 Das Coaching setzt eine aktive Mitwirkung des Kunden voraus. Der Kunde ist verpflichtet, die für die Betreuung erforderlichen Informationen vollständig, richtig und rechtzeitig bereitzustellen.",
      "7.2 Der Kunde ist verpflichtet, gesundheitliche Einschränkungen, Erkrankungen, Schwangerschaft, Stillzeit, Essstörungen, Medikamente, ärztliche Anordnungen oder sonstige Umstände, die für Ernährung, Training oder Coaching relevant sein können, vollständig und wahrheitsgemäß mitzuteilen.",
      "7.3 Verschweigt der Kunde relevante Informationen oder macht er falsche Angaben, haftet der Anbieter nicht für hieraus entstehende Nachteile, Schäden, Fehlanpassungen oder sonstige Folgen.",
      "7.4 Der Anbieter ist berechtigt, bei gesundheitlichen Risiken eine ärztliche Abklärung oder Freigabe zu verlangen. Bis zur Vorlage einer solchen Freigabe kann der Anbieter die Betreuung ganz oder teilweise aussetzen.",
      "7.5 Ergibt sich, dass eine verantwortbare Betreuung nicht möglich ist, ist der Anbieter berechtigt, den Vertrag aus wichtigem Grund zu beenden oder die Betreuung abzulehnen.",
    ],
  },
  {
    title: "8. Check ins",
    items: [
      "8.1 Soweit Check ins Bestandteil des gebuchten Pakets sind, ist der Kunde verpflichtet, diese regelmäßig, vollständig und wahrheitsgemäß einzureichen.",
      "8.2 Ein Check in kann insbesondere Gewicht, Bilder, Angaben zu Ernährung, Training, Schlaf, Stress, Verdauung, Umsetzung, Alltag und sonstige für die Betreuung relevante Informationen enthalten.",
      "8.3 Ohne vollständige und regelmäßige Check ins ist eine sachgerechte Anpassung der Pläne und Betreuung nur eingeschränkt möglich.",
      "8.4 Unterbleiben Check ins oder erforderliche Rückmeldungen des Kunden, stellt dies keinen Leistungsmangel des Anbieters dar.",
      "8.5 Etwaige individuell vereinbarte Garantien oder Sonderzusagen setzen stets die vollständige, ehrliche und regelmäßige Mitwirkung des Kunden voraus, sofern nicht ausdrücklich etwas anderes vereinbart wurde.",
    ],
  },
  {
    title: "9. Vergütung und Zahlungsbedingungen",
    items: [
      "9.1 Die Vergütung richtet sich nach dem jeweils angenommenen Angebot, Checkout oder der individuellen Vereinbarung.",
      "9.2 Die Vergütung kann je nach Laufzeit, Paket, Zahlungsart, Aktion oder individueller Vereinbarung variieren.",
      "9.3 Zahlungen erfolgen je nach Vertragsmodell und Anbieterplattform insbesondere über Zenfit, Stripe, SEPA Lastschrift, Kreditkarte, Ablefy, PayPal, Klarna oder Sofortüberweisung.",
      "9.4 Bei SEPA Zahlungen erteilt der Kunde ein entsprechendes SEPA Lastschriftmandat. Der Kunde hat sicherzustellen, dass das angegebene Konto ausreichend gedeckt ist und die Zahlung eingezogen werden kann.",
      "9.5 Monatliche Zahlungen sind, soweit nicht anders vereinbart, im Voraus für den jeweiligen Abrechnungszeitraum zu leisten.",
      "9.6 Eine Nichtnutzung des Coachings entbindet den Kunden nicht von seiner Zahlungspflicht.",
      "9.7 Eine anteilige Rückerstattung für nicht genutzte Leistungen erfolgt nicht, sofern nicht gesetzlich zwingend etwas anderes gilt oder ausdrücklich individuell etwas anderes vereinbart wurde.",
    ],
  },
  {
    title: "10. Rücklastschrift, Zahlungsverzug und Zugangssperrung",
    items: [
      "10.1 Wird eine Zahlung nicht eingelöst oder zurückgebucht und hat der Kunde dies zu vertreten, ist der Anbieter berechtigt, dem Kunden die tatsächlich entstandenen und erforderlichen Rücklastschriftkosten in Rechnung zu stellen.",
      "10.2 Dem Kunden bleibt der Nachweis vorbehalten, dass kein oder ein geringerer Schaden entstanden ist.",
      "10.3 Gerät der Kunde mit einer Zahlung in Verzug, ist der Anbieter berechtigt, Mahnungen zu versenden und die gesetzlichen Verzugszinsen sowie erforderliche Mahn, Inkasso und Rechtsverfolgungskosten geltend zu machen.",
      "10.4 Der Anbieter ist berechtigt, offene Forderungen an ein Inkassounternehmen oder einen sonstigen Rechtsdienstleister zu übergeben oder abzutreten.",
      "10.5 Bei Zahlungsverzug ist der Anbieter berechtigt, den Zugang zur Coaching Plattform und die weitere Betreuung bis zum Ausgleich der offenen Beträge ganz oder teilweise zu sperren.",
      "10.6 Die Sperrung wegen Zahlungsverzugs lässt die Zahlungspflicht des Kunden unberührt.",
    ],
  },
  {
    title: "11. Laufzeit, Verlängerung und Kündigung bei Zenfit Verträgen",
    items: [
      "11.1 Bei Zenfit Verträgen gilt die im jeweiligen Angebot vereinbarte Mindestlaufzeit.",
      "11.2 Während der Mindestlaufzeit ist eine ordentliche Kündigung ausgeschlossen.",
      "11.3 Nach Ablauf der Mindestlaufzeit verlängert sich der Vertrag jeweils um einen weiteren Monat, sofern der Kunde nicht mit einer Frist von einem Monat zum Ende des jeweiligen individuellen Vertragsmonats kündigt.",
      "11.4 Maßgeblich für den individuellen Vertragsmonat ist der jeweilige Vertragsbeginn beziehungsweise der jeweilige wiederkehrende Abrechnungstag.",
      "11.5 Beispiel: Beginnt der Vertrag am 31. eines Monats und kündigt der Kunde am 15. eines Monats, endet der Vertrag nicht am unmittelbar folgenden 31., sondern zum 31. des darauffolgenden Monats, sofern die Mindestlaufzeit bereits abgelaufen ist.",
      "11.6 Kündigt der Kunde während einer laufenden Mindestlaufzeit, wird die Kündigung frühestens zum Ende der vereinbarten Mindestlaufzeit wirksam, sofern die Kündigungsfrist eingehalten ist. Beispiel: Bei einer Mindestlaufzeit von sechs Monaten endet der Vertrag bei einer Kündigung im dritten Monat frühestens mit Ablauf der sechsmonatigen Mindestlaufzeit.",
      "11.7 Die Kündigung muss eindeutig erklären, dass der Kunde den Vertrag kündigen will. Unverbindliche Nachfragen, Bitten um Auskunft, Beschwerden, Unzufriedenheitsäußerungen oder Fragen zu möglichen Ausstiegsmöglichkeiten stellen keine Kündigung dar.",
      "11.8 Die Kündigung kann per E Mail an info@niklashauger.de oder per WhatsApp an die bekannte WhatsApp Business Nummer des Anbieters erklärt werden, über die der Kunde bereits mit dem Anbieter kommuniziert hat.",
      "11.9 Der Kunde trägt die Verantwortung für den rechtzeitigen Zugang der Kündigung.",
      "11.10 Gesetzlich vorgeschriebene weitere Kündigungsmöglichkeiten bleiben unberührt.",
      "11.11 Das Recht beider Parteien zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.",
    ],
  },
  {
    title: "12. Laufzeit bei Ablefy Verträgen",
    items: [
      "12.1 Bei Ablefy Verträgen gilt die im Checkout oder Angebot angegebene feste Laufzeit.",
      "12.2 Der Vertrag endet mit Ablauf der gebuchten Laufzeit automatisch, sofern nicht ausdrücklich etwas anderes vereinbart wurde.",
      "12.3 Eine Kündigung ist bei Ablefy Verträgen mit fester Laufzeit nicht erforderlich.",
      "12.4 Eine Nichtnutzung der gebuchten Leistungen begründet keinen Anspruch auf Rückerstattung, sofern nicht gesetzlich zwingend etwas anderes gilt.",
    ],
  },
  {
    title: "13. Widerrufsrecht, vorzeitiger Leistungsbeginn und digitale Inhalte",
    items: [
      "13.1 Ist der Kunde Verbraucher, steht ihm bei Fernabsatzverträgen grundsätzlich ein gesetzliches Widerrufsrecht zu, soweit dieses nicht nach den gesetzlichen Vorschriften ausgeschlossen ist oder erlischt.",
      "13.2 Der Kunde wird vor Vertragsschluss über sein Widerrufsrecht informiert und erhält eine Widerrufsbelehrung sowie ein Muster Widerrufsformular.",
      "13.3 Der Kunde kann im Rahmen des Bestellprozesses ausdrücklich verlangen, dass der Anbieter bereits vor Ablauf der Widerrufsfrist mit der Vertragserfüllung beginnt.",
      "13.4 Verlangt der Kunde den sofortigen Beginn der Vertragserfüllung, beginnt der Anbieter unmittelbar mit der Leistungserbringung. Dies kann insbesondere die Freischaltung des Zugangs, die Sichtung der Kundendaten, die Kommunikation über die Coaching Plattform, die Vorbereitung, Erstellung und Bereitstellung individueller Ernährungspläne, Trainingspläne, Rezepte, Auswertungen, Videos, digitaler Inhalte und sonstiger Coaching Leistungen umfassen.",
      "13.5 Der Kunde stimmt im Bestellprozess ausdrücklich zu, dass der Anbieter ihm individuell erstellte digitale Inhalte bereits vor Ablauf der Widerrufsfrist bereitstellt. Der Kunde bestätigt zugleich seine Kenntnis davon, dass sein Widerrufsrecht hinsichtlich dieser digitalen Inhalte mit Beginn der Bereitstellung nach Maßgabe der gesetzlichen Vorschriften erlischt.",
      "13.6 Hat der Kunde dem sofortigen Beginn der Vertragserfüllung und der Bereitstellung individueller digitaler Inhalte zugestimmt, ist ein später erklärter Widerruf hinsichtlich der bereits bereitgestellten digitalen Inhalte ausgeschlossen, soweit das Widerrufsrecht nach den gesetzlichen Vorschriften erloschen ist.",
      "13.7 Soweit aus zwingenden gesetzlichen Gründen dennoch ein Widerruf wirksam sein sollte, schuldet der Kunde Wertersatz für die bis zum Widerruf bereits erbrachten Leistungen, sofern die gesetzlichen Voraussetzungen hierfür vorliegen.",
      "13.8 Bereits individuell erstellte, vorbereitete, freigeschaltete oder bereitgestellte Leistungen und digitale Inhalte können bei der Berechnung des Wertersatzes berücksichtigt werden, soweit gesetzlich zulässig.",
      "13.9 Der Anbieter wird Widerrufe, die nach wirksamem Erlöschen des Widerrufsrechts erklärt werden, zurückweisen.",
    ],
  },
  {
    title: "14. Keine Erfolgsgarantie",
    items: [
      "14.1 Der Anbieter schuldet eine sorgfältige und fachgerechte Erbringung der vereinbarten Coaching Leistungen, jedoch keinen bestimmten Gewichtsverlust, keine bestimmte körperliche Veränderung und keinen bestimmten gesundheitlichen Erfolg.",
      "14.2 Ergebnisse hängen maßgeblich von Ausgangslage, Gesundheitszustand, Alltag, Umsetzung, Kommunikation, Ehrlichkeit und Mitwirkung des Kunden ab.",
      "14.3 Aussagen zu möglichen Ergebnissen, Erfahrungswerte, Beispiele oder Transformationen anderer Kunden stellen keine Garantie für ein bestimmtes Ergebnis dar.",
      "14.4 Individuelle Garantien oder Sonderzusagen gelten nur, wenn sie ausdrücklich und nachweisbar individuell vereinbart wurden.",
    ],
  },
  {
    title: "15. Urheberrecht und Nutzungsrechte",
    items: [
      "15.1 Sämtliche vom Anbieter bereitgestellten Inhalte, insbesondere Pläne, Rezepte, Videos, PDF Dokumente, Texte, Nachrichten, Auswertungen, Konzepte und sonstige Unterlagen, sind urheberrechtlich oder sonst rechtlich geschützt.",
      "15.2 Der Kunde erhält ein einfaches, nicht übertragbares, nicht unterlizenzierbares Nutzungsrecht ausschließlich für eigene private Zwecke und nur im Rahmen der Vertragsdurchführung.",
      "15.3 Eine Weitergabe an Dritte, Veröffentlichung, Vervielfältigung, entgeltliche oder unentgeltliche Überlassung, kommerzielle Nutzung oder Nutzung für andere Personen ist untersagt.",
      "15.4 Dies gilt auch für die Weitergabe an Familienmitglieder, Freunde, andere Coaches, Trainer oder sonstige Dritte.",
      "15.5 Bei Verstößen ist der Anbieter berechtigt, den Zugang zu sperren, den Vertrag außerordentlich zu kündigen und weitere Ansprüche geltend zu machen.",
    ],
  },
  {
    title: "16. Kommunikation und Betreuungskanäle",
    items: [
      "16.1 Coachingbezogene Kommunikation erfolgt ausschließlich über die vom Anbieter eingesetzte Coaching Plattform.",
      "16.2 Coaching Fragen werden grundsätzlich nur über die Coaching Plattform beantwortet.",
      "16.3 Vertragsbezogene und organisatorische Fragen können per E Mail oder über die bekannte WhatsApp Business Nummer des Anbieters gestellt werden.",
      "16.4 Instagram Direktnachrichten oder sonstige Social Media Nachrichten sind kein offizieller Kommunikationskanal für Coaching, Vertragsfragen oder Kündigungen.",
      "16.5 Der Anbieter schuldet keine jederzeitige Erreichbarkeit und keine bestimmten Antwortzeiten, sofern nicht ausdrücklich etwas anderes vereinbart wurde.",
      "16.6 Die Betreuung kann durch Niklas Hauger, Fabienne Lemke oder durch geeignete dritte Personen aus dem Team des Anbieters erfolgen. Der Anbieter behält sich vor, die Betreuung ganz oder teilweise durch entsprechend geeignete Teammitglieder durchführen zu lassen. Ein Anspruch auf Betreuung durch eine bestimmte Person besteht nicht.",
    ],
  },
  {
    title: "17. Pflichtverstöße, Sperrung und außerordentliche Kündigung",
    items: [
      "17.1 Der Anbieter ist berechtigt, den Zugang des Kunden ganz oder teilweise zu sperren oder den Vertrag außerordentlich zu kündigen, wenn ein wichtiger Grund vorliegt.",
      "17.2 Ein wichtiger Grund liegt insbesondere vor bei Zahlungsverzug, wiederholter oder erheblicher Verletzung von Mitwirkungspflichten, falschen oder verschwiegenen Gesundheitsangaben, Weitergabe oder Missbrauch von Inhalten oder Zugangsdaten, Beleidigungen, Drohungen oder respektlosem Verhalten gegenüber dem Anbieter, Teammitgliedern oder sonstigen Beteiligten, missbräuchlicher Nutzung der Coaching Plattform, gesundheitlichen Risiken, die eine weitere Betreuung aus Sicht des Anbieters nicht verantwortbar erscheinen lassen, oder sonstigen schwerwiegenden Pflichtverletzungen.",
      "17.3 Bereits entstandene Zahlungsansprüche bleiben von einer Sperrung oder außerordentlichen Kündigung unberührt.",
      "17.4 Weitere gesetzliche Rechte und Ansprüche des Anbieters bleiben unberührt.",
    ],
  },
  {
    title: "18. Gesundheitliche Eigenverantwortung",
    items: [
      "18.1 Der Kunde ist für seine Gesundheit, sein Training, seine Ernährung und die Umsetzung der Empfehlungen eigenverantwortlich.",
      "18.2 Das Coaching ersetzt keine ärztliche Untersuchung, Diagnose, Behandlung, Psychotherapie, Ernährungsberatung im medizinischen Sinne oder sonstige heilkundliche Leistung.",
      "18.3 Bei bestehenden Erkrankungen, Beschwerden, Medikamenteneinnahme, Schwangerschaft, Stillzeit, Essstörung, Verdacht auf Essstörung oder sonstigen gesundheitlichen Besonderheiten hat der Kunde vor Umsetzung der Empfehlungen ärztlichen Rat einzuholen.",
      "18.4 Der Kunde verpflichtet sich, Übungen nur auszuführen, soweit sie für ihn gesundheitlich geeignet sind, und bei Schmerzen, Unwohlsein oder sonstigen Warnsignalen die Übung abzubrechen und ärztlichen Rat einzuholen.",
    ],
  },
  {
    title: "19. Haftung",
    items: [
      "19.1 Der Anbieter haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit.",
      "19.2 Bei Verletzung von Leben, Körper oder Gesundheit haftet der Anbieter nach den gesetzlichen Vorschriften.",
      "19.3 Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung des Anbieters auf den vertragstypischen, vorhersehbaren Schaden begrenzt. Wesentliche Vertragspflichten sind solche Pflichten, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht und auf deren Einhaltung der Kunde regelmäßig vertrauen darf.",
      "19.4 Im Übrigen ist die Haftung ausgeschlossen.",
      "19.5 Der Anbieter haftet nicht für Schäden oder Nachteile, die daraus entstehen, dass der Kunde unvollständige, falsche oder verspätete Angaben macht, gesundheitliche Umstände verschweigt, Empfehlungen eigenmächtig verändert oder entgegen ärztlichem Rat handelt.",
      "19.6 Die Haftungsbeschränkungen gelten auch zugunsten der gesetzlichen Vertreter, Mitarbeiter, freien Mitarbeiter, Erfüllungsgehilfen und Teammitglieder des Anbieters.",
    ],
  },
  {
    title: "20. Vorher Nachher Bilder, Erfahrungsberichte und Testimonials",
    items: [
      "20.1 Die Nutzung von Vorher Nachher Bildern, Erfahrungsberichten, Nachrichten, Namen, Aliasangaben oder sonstigen personenbezogenen Inhalten zu Marketingzwecken erfolgt ausschließlich auf Grundlage einer gesonderten Einwilligung des Kunden.",
      "20.2 Der konkrete Umfang der Nutzung, insbesondere Plattformen, Sichtbarkeit von Gesicht, Verwendung von Name oder Alias und Art der Darstellung, richtet sich nach der jeweiligen Einwilligung.",
      "20.3 Der Kunde kann eine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.",
      "20.4 Die Rechtmäßigkeit der bis zum Widerruf erfolgten Nutzung bleibt unberührt.",
    ],
  },
  {
    title: "21. Datenschutz",
    items: [
      "21.1 Der Anbieter verarbeitet personenbezogene Daten des Kunden zur Durchführung des Vertrags und nach Maßgabe der geltenden datenschutzrechtlichen Vorschriften.",
      "21.2 Einzelheiten ergeben sich aus der Datenschutzerklärung des Anbieters.",
    ],
  },
  {
    title: "22. Verbraucherschlichtung",
    items: [
      "22.1 Der Anbieter ist weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    ],
  },
  {
    title: "23. Schlussbestimmungen",
    items: [
      "23.1 Es gilt deutsches Recht unter Ausschluss des UN Kaufrechts, soweit dem keine zwingenden Verbraucherschutzvorschriften des Staates entgegenstehen, in dem der Kunde seinen gewöhnlichen Aufenthalt hat.",
      "23.2 Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich rechtliches Sondervermögen, ist Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit diesem Vertrag der Sitz des Anbieters.",
      "23.3 Gegenüber Verbrauchern gelten die gesetzlichen Gerichtsstände.",
      "23.4 Sollte eine Bestimmung dieser Allgemeinen Geschäftsbedingungen ganz oder teilweise unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
      "23.5 Der Anbieter ist berechtigt, diese Allgemeinen Geschäftsbedingungen mit Wirkung für die Zukunft zu ändern, sofern hierfür ein sachlicher Grund besteht und der Kunde hierdurch nicht unangemessen benachteiligt wird. Bestandskunden werden über Änderungen in geeigneter Weise informiert. Gesetzliche Rechte des Kunden bleiben unberührt.",
    ],
  },
];

const AGB = () => {
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
          <h1 className="text-4xl font-bold text-nf-white mb-2">Allgemeine Geschäftsbedingungen</h1>
          <p className="text-nf-white/80">NF Coaching</p>
        </div>

        <div className="bg-nf-black/50 border border-nf-white/10 rounded-lg p-8 md:p-12 shadow-soft">
          <div className="mb-10 pb-8 border-b border-nf-white/10">
            <p className="text-nf-white/80 mb-1">NF Coaching</p>
            <p className="text-nf-white/80 mb-1">Niklas Hauger, Saarlandstraße 11b, 47839 Krefeld</p>
            <p className="text-nf-white/80 mb-6">
              E-Mail:{' '}
              <a href="mailto:info@niklashauger.de" className="text-nf-red hover:underline">
                info@niklashauger.de
              </a>
            </p>
            <p className="text-nf-white/80">Diese Allgemeinen Geschäftsbedingungen regeln die Vertragsbeziehung zwischen NF Coaching, Inhaber Niklas Hauger, und den Kunden über die Erbringung von Online Coaching Leistungen. Maßgeblich ist stets das vom Kunden angenommene Angebot einschließlich Laufzeit, Vergütung, Zahlungsart und Leistungsumfang.</p>
          </div>

          {SECTIONS.map((section) => (
            <section key={section.title} className="mb-10 last:mb-0">
              <h2 className="text-2xl font-semibold text-nf-white mb-4">{section.title}</h2>
              {section.items.map((item) => (
                <p key={item} className="text-nf-white/80 mb-4 leading-relaxed">
                  {item}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AGB;
