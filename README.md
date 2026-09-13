# Diwan — Website

Statische Produkt-Website für **Diwan** (diwan-sa.de): Vorstellung in fünf Sprachen,
Funktionen mit Live-Aufnahmen aus der App, Präsentationsvideo, und die Rechtstexte
(Impressum, Datenschutz, AGB, AVV, KI-Hinweis).

## Aufbau

| Pfad | Inhalt |
| --- | --- |
| `index.html` | Startseite Deutsch (Standard) — **generiert** |
| `ar/`, `en/`, `ru/`, `uk/` | Startseite Arabisch (RTL), Englisch, Russisch, Ukrainisch — **generiert** |
| `impressum.html`, `datenschutz.html`, `ki-hinweis.html` | Rechtstexte der Website (von Hand gepflegt) |
| `agb.html`, `avv.html`, `datenschutz-app.html` | Rechtstexte der **Anwendung** — **generiert** aus `src/legal/` |
| `src/content/<sprache>.mjs` | Alle Texte der Startseite; Deutsch ist die Quelle, jede Sprache muss jeden Schlüssel haben |
| `src/legal/*.html` | Die Rechtstexte der Anwendung, exportiert aus dem App-Repository (siehe unten) |
| `src/build.mjs` | Erzeugt alle generierten Seiten |
| `diwan-pitch-de.mp4`, `poster.jpg` | Präsentationsvideo (Deutsch) und Vorschaubild |
| `*.mp4` (explain, write, clarify, paper, print, tasks) | Kurze Aufnahmen aus der App für den Funktionsteil |
| `*.ttf` | Schriften, lokal ausgeliefert — keine Drittanbieter-Requests |

## Seiten bauen

```bash
node src/build.mjs
```

Die erzeugten Dateien werden **mit eingecheckt**, damit der Host (Netlify) keinen
Build-Schritt braucht. Nach jeder Änderung an `src/` also bauen und die Ausgabe
mit committen.

## Rechtstexte der Anwendung aktualisieren

AGB, AVV und die Datenschutzerklärung der Anwendung werden im App-Repository
(`Swift-Assets/diwan`, `components/legal/`) gepflegt — dort hängt der Annahme-Hash
an ihnen. Diese Website zeigt denselben Text zur Einsicht ohne Konto. Nach einer
Änderung dort:

```bash
# im App-Repository
npx tsx --tsconfig scripts/tsconfig.legal-export.json scripts/export-legal-html.tsx --out /tmp/legal
# hier
cp /tmp/legal/{agb,avv,datenschutz}.html src/legal/ && node src/build.mjs
```

Die deutsche Fassung ist die verbindliche; die Startseite ist übersetzt, die
Rechtstexte bewusst nicht.

## Video

Das Präsentationsvideo wird im App-Repository erzeugt (Workflow *Diwan Marketing*,
`kind = pitch`) und hier als `diwan-pitch-de.mp4` abgelegt. Ältere Fassungen liegen
unter **Releases** (Workflow *Archive website video*).

Hosting: Netlify, Projekt `diwanws`, Deploy aus `main`. Kein Build-Schritt nötig.

© Swift Assets UG (haftungsbeschränkt) · Kontakt: Info@Diwan-sa.de
