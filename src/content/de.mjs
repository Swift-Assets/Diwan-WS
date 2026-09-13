// Deutsch — die Quelle. Jede andere Sprache muss jeden Schlüssel hier haben
// (build.mjs prüft das). Aussagen, die NICHT hier stehen dürfen, bis sie wahr
// sind: „verlässt Deutschland nie“ (Suchindex + Ausfall-Reserve, siehe
// Datenschutzerklärung), ein Preis für die Tiefensuche, ein Zahlungsknopf.
export default {
  lang: "de",
  dir: "ltr",
  name: "Deutsch",
  meta: {
    title: "Diwan — Ihr Assistent für deutsche Korrespondenz",
    description:
      "Diwan versteht offizielle Post, schreibt die Antwort in korrektem Deutsch und versendet sie — als E-Mail oder als Brief. Mit Aufgaben, Fristen, Archiv und Rechnungen für Unternehmen. Oberfläche in fünf Sprachen.",
    ogTitle: "Diwan — deutsche Korrespondenz ohne Hürden",
    ogDescription:
      "Verstehen, schreiben, versenden — E-Mail und Briefpost in einer App. Erster Monat kostenlos, keine Vertragsbindung.",
  },
  nav: {
    problem: "Das Problem",
    features: "Funktionen",
    video: "Video",
    security: "Sicherheit",
    price: "Preis",
    open: "App öffnen",
    language: "Sprache",
  },
  hero: {
    h1: "Deutsche Korrespondenz soll <span class=\"gold\">niemanden ausbremsen</span>",
    sub: "Diwan versteht offizielle Post, schreibt die Antwort in korrektem Deutsch und versendet sie — als E-Mail oder als echter Brief. Für alle, die in Deutschland Post bekommen: erklärt in Ihrer Sprache, wenn Sie das möchten. Sie prüfen und geben frei.",
    ctaStart: "Jetzt kostenlos starten",
    ctaVideo: "Video ansehen",
    chip: "🎁 Der erste Monat ist kostenlos — dann ab €3,99/Monat, jederzeit kündbar",
  },
  problem: {
    kicker: "Das Problem",
    h2: "Offizielle Post kostet <span class=\"gold\">Zeit und Nerven</span>",
    lead: "Briefe und E-Mails von Ämtern, Versicherungen, Vermietern und Kunden verlangen Antworten in einer bestimmten Form, bis zu einem bestimmten Tag. Wer Deutsch nicht als Muttersprache spricht, versteht sie oft nicht. Und wer es spricht, hat selten die Zeit, sie richtig zu beantworten.",
    cards: [
      { icon: "⏰", title: "Fristen", text: "„Innerhalb von 14 Tagen“ — ab wann eigentlich? Wer den Brief liegen lässt, bekommt als Nächstes eine Mahnung." },
      { icon: "✍️", title: "Die richtige Form", text: "Amtsdeutsch zu lesen ist schwer. Es korrekt zu schreiben — mit Anrede, Aktenzeichen und Ton — ist Arbeit, auch für Muttersprachler." },
      { icon: "🖨️", title: "Papier", text: "Drucken, kuvertieren, zur Post, Einschreiben, Beleg aufheben — für jede einzelne Antwort." },
    ],
  },
  who: {
    kicker: "Für wen",
    h2: "Für <span class=\"gold\">alle</span>, die in Deutschland Post bekommen",
    lead: "Der größte Gewinn ist es für Menschen, die hier neu sind. Aber auch wer Deutsch spricht, schreibt mit Diwan schneller, sicherer und in der richtigen Form — privat wie im Unternehmen.",
    cards: [
      { icon: "🧑‍💼", title: "Privatpersonen", text: "verstehen und beantworten ihre Post sicher: Behörde, Vermieter, Versicherung, Krankenkasse. In der eigenen Sprache erklärt, auf Deutsch beantwortet, per Klick versendet." },
      { icon: "🏪", title: "Kleine Unternehmen", text: "Behörden-, Kunden- und Lieferantenpost aus einem Postfach — mit den Firmenangaben, die ein Geschäftsbrief tragen muss, und Rechnungen, die eine Prüfung bestehen." },
    ],
    langsLabel: "Die Oberfläche spricht fünf Sprachen:",
  },
  video: {
    kicker: "Diwan in zweieinhalb Minuten",
    h2: "Sehen Sie Diwan <span class=\"gold\">in Aktion</span>",
    lead: "Echte Aufnahmen aus der Anwendung: verstehen, schreiben, versenden, Fristen, Archiv, fünf Sprachen und Rechnungen — vertont auf Deutsch.",
    note: "Sprache des Videos: Deutsch.",
  },
  features: {
    kicker: "Funktionen im Detail",
    h2: "Vom Briefkasten bis zur Antwort — <span class=\"gold\">ein Werkzeug</span>",
    lead: "Alle Aufnahmen unten stammen direkt aus der laufenden Anwendung.",
    items: [
      {
        num: "01 — Verstehen",
        h3: "Ein Tipp. <span class=\"gold\">Verstanden.</span>",
        text: "Diwan verbindet sich mit Ihren vorhandenen E-Mail-Postfächern. Kommt eine offizielle Nachricht an, genügt ein Tipp — Diwan erklärt sie in Ihrer Sprache:",
        bullets: ["Was wird verlangt — als klare Liste", "Welche Unterlagen werden gebraucht", "Bis wann? Die Frist steht zuerst"],
        video: "explain.mp4",
      },
      {
        num: "02 — Schreiben",
        h3: "Notizen rein, <span class=\"gold\">korrektes Deutsch</span> raus",
        text: "Sie schreiben Ihre Antwort als einfache Notiz — auf Deutsch, Arabisch, Englisch, Russisch, Ukrainisch oder in jeder anderen Sprache. Diwan formuliert daraus ein korrektes deutsches Schreiben in der richtigen Form. Ihr Text bleibt jederzeit per Klick wiederherstellbar. Nichts wird automatisch versendet — Sie entscheiden.",
        video: "write.mp4",
      },
      {
        num: "03 — Rückfragen statt raten",
        h3: "Die KI <span class=\"gold\">rät nicht</span> — sie fragt nach",
        text: "Fehlen Informationen, stellt Diwan zuerst gezielte Rückfragen — „Liegt der Wohnungsnachweis bereits vor?“ — und formuliert erst nach Ihrer Antwort. So sind die Schreiben realistisch statt spekulativ, und die bestätigten Fakten werden verbindlich mitgegeben.",
        video: "clarify.mp4",
      },
      {
        num: "04 — Briefpost",
        h3: "Echte Briefe, <span class=\"gold\">komplett digital</span>",
        text: "Viele Stellen schreiben weiterhin auf Papier — Diwan schließt genau diese Lücke. Der Brief wird fotografiert, Diwan liest und erklärt ihn, erkennt Fristen und geforderte Unterlagen. Die Antwort geht als echter Brief direkt aus der App — ohne Drucker, ohne Gang zur Post.",
        video: "paper.mp4",
      },
      {
        num: "05 — Druck, Versand & Nachweis",
        h3: "Gedruckt, kuvertiert, <span class=\"gold\">zugestellt</span>",
        text: "Beim Versand übernimmt Diwan alles: drucken, kuvertieren, zustellen — auf Wunsch als Einschreiben. Anlagen werden mitgedruckt und im selben Brief verschickt. Der Versandnachweis bleibt in der App gespeichert, jederzeit abrufbar.",
        video: "print.mp4",
      },
      {
        num: "06 — Aufgaben & Fristen",
        h3: "Fristen werden <span class=\"gold\">Aufgaben</span> — automatisch",
        text: "Aus Briefen und E-Mails entstehen Aufgaben, Termine und Erinnerungen — mit Frist je geforderter Unterlage und Erinnerung vor jedem Termin. Nichts geht mehr aus Versehen verloren.",
        video: "tasks.mp4",
      },
    ],
  },
  more: {
    kicker: "Und darüber hinaus",
    h2: "Ein <span class=\"gold\">komplettes</span> Postfach-Cockpit",
    businessBadge: "Nur für Geschäftskonten",
    cards: [
      { icon: "🌍", title: "Fünf Sprachen", text: "Die Oberfläche in Deutsch, Arabisch, Englisch, Russisch oder Ukrainisch — der Brief bleibt korrektes Deutsch. Wechsel jederzeit, ohne Neuanmeldung." },
      { icon: "🗂️", title: "Sicheres Archiv", text: "E-Mails, Anhänge, Briefe und Dokumente bleiben gespeichert und sind bei jeder späteren Rückfrage sofort zur Hand. Diwan löscht Ihre Korrespondenz nie von selbst." },
      { icon: "🔍", title: "Tiefensuche", text: "Findet die eine Zeile in Jahren von Post — über E-Mails, Anhänge, Briefe und Entwürfe hinweg, mit wörtlichem Zitat." },
      { icon: "🧾", title: "Rechnungen", business: true, text: "Rechnungen an Ihre Kunden direkt aus Diwan — als PDF mit eingebetteter E-Rechnung (ZUGFeRD / EN 16931), mit Ihren Steuernummern, fortlaufend nummeriert und unveränderbar. Den Steuersatz wählen immer Sie." },
      { icon: "🏢", title: "Firmenangaben automatisch", business: true, text: "Handelsregister, Registergericht und USt-IdNr. einmal hinterlegen — Diwan setzt sie in jeden Geschäftsbrief, wie § 37a HGB und § 14 UStG es verlangen." },
      { icon: "📥", title: "Mehrere Postfächer", text: "Alle Konten an einem Ort — mit wählbarem Absender je E-Mail. Gmail per Google-Anmeldung, alle anderen per IMAP." },
      { icon: "📅", title: "Terminbuchung", text: "Eine eigene Buchungsseite: Kunden oder Mandanten wählen einen freien Termin, Diwan bestätigt und erinnert." },
      { icon: "🤖", title: "Automatische Antworten", text: "Global oder pro Absender — mit KI-Unterstützung, immer nach Ihren Regeln." },
      { icon: "🕐", title: "Geplanter Versand", text: "E-Mails zum Wunschtermin verschicken statt sofort. Unerwünschte Absender landen automatisch im Papierkorb." },
    ],
  },
  security: {
    kicker: "Sicherheit & Kontrolle",
    h2: "Ihre Daten. <span class=\"gold\">Ihre Kontrolle.</span>",
    cards: [
      { icon: "🇪🇺", title: "In Deutschland gespeichert", text: "Datenbank, Dokumente, Hintergrunddienst und die KI-Verarbeitung laufen in Frankfurt am Main — standardmäßig in der EU. Welcher Anbieter was verarbeitet, steht offen in der Datenschutzerklärung." },
      { icon: "🔒", title: "Kein Training mit Ihren Daten", text: "Ihre Post wird nicht zum Training von KI-Modellen verwendet. Das ist bei jedem eingesetzten KI-Anbieter vertraglich festgehalten und im Auftragsverarbeitungsvertrag nachlesbar." },
      { icon: "👤", title: "Der Mensch entscheidet", text: "Diwan versendet niemals automatisch. Jedes Schreiben wird von Ihnen geprüft und ausdrücklich freigegeben. KI-Vorschläge bleiben Vorschläge." },
      { icon: "🔌", title: "KI abschaltbar", text: "Die KI-Funktionen lassen sich jederzeit in den Einstellungen ausschalten. Dann verlässt kein Inhalt mehr Ihr Postfach — und der Rest von Diwan bleibt vollständig nutzbar." },
    ],
    links: "Ausführlich: <a href=\"/datenschutz-app.html\">Datenschutzerklärung der Anwendung</a> · <a href=\"/avv.html\">Auftragsverarbeitungsvertrag</a> · <a href=\"/ki-hinweis.html\">KI-Hinweis</a>",
  },
  pricing: {
    kicker: "Der Preis",
    h2: "Zwei Tarife. <span class=\"gold\">Keine Vertragsbindung.</span>",
    lead: "Der erste Monat ist kostenlos — mit allen Funktionen. Danach monatlich, jederzeit kündbar, ohne Mindestlaufzeit.",
    plans: [
      { name: "Privat", price: "3,99 €", per: "pro Monat", features: ["Verstehen, schreiben, versenden", "Aufgaben, Fristen, Archiv", "Bis zu 2 Postfächer", "Oberfläche in fünf Sprachen"] },
      { name: "Unternehmen", price: "9,99 €", per: "pro Monat", highlight: true, features: ["Alles aus Privat", "Rechnungen mit E-Rechnung", "Firmenangaben automatisch im Brief", "Tiefensuche inklusive", "Bis zu 6 Postfächer", "Auftragsverarbeitungsvertrag (AVV)"] },
    ],
    note: "Briefversand wird je Brief nach Seiten und Versandart abgerechnet — der Preis wird vor jeder Bestellung angezeigt. Alle Preise inkl. MwSt.",
    cta: "Jetzt kostenlos starten",
  },
  company: {
    kicker: "Das Unternehmen",
    h2: "Entwickelt von <span class=\"gold\">Swift Assets UG</span>",
    text: "Diwan ist ein Produkt der Swift Assets UG (haftungsbeschränkt) mit Sitz in Solingen, Nordrhein-Westfalen. Entwickelt aus eigener Erfahrung — für alle, die in Deutschland ankommen, arbeiten und gründen.",
    contact: "Kontakt:",
  },
  footer: {
    impressum: "Impressum",
    datenschutz: "Datenschutz",
    agb: "AGB",
    avv: "AVV",
    ki: "KI-Hinweis & Haftung",
    contact: "Kontakt",
    legalNote: "Rechtstexte in deutscher Sprache — die deutsche Fassung ist verbindlich.",
  },
};
