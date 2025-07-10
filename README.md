# Infection Management System

Ein digitales Gesundheitssystem zur Verwaltung von Infektionsfällen, Kontaktverfolgung und Maßnahmenkoordination.

## 🎯 Projektübersicht

Das Infection Management System ist eine webbasierte Anwendung zur effizienten Verwaltung von Infektionsfällen und deren Kontaktverfolgung. Das System unterstützt Gesundheitsbehörden dabei, Infektionsketten zu identifizieren, Kontakte zu verfolgen und geeignete Maßnahmen zu koordinieren.

### Hauptfunktionen

- **Fallverwaltung**: Erfassung und Verwaltung von Infektionsfällen
- **Kontaktverfolgung**: Automatische Identifikation und Verwaltung von Kontaktpersonen
- **Maßnahmenmanagement**: Intelligente Empfehlungen für Präventions- und Kontrollmaßnahmen
- **Dashboard & Statistiken**: Übersichtliche Darstellung von Fallzahlen und Trends
- **Benutzerverwaltung**: Rollenbasierte Zugriffskontrolle für verschiedene Benutzertypen

## 🏗️ Technologie-Stack

### Frontend
- **React.js** - Benutzeroberfläche
- **CSS3** - Styling und Layout
- **Context API** - State Management

### Backend
- **FastAPI** - REST API
- **SQLAlchemy** - ORM
- **Alembic** - Datenbankmigrationen
- **PostgreSQL** - Datenbank

### DevOps
- **Docker** - Containerisierung
- **Docker Compose** - Multi-Container Setup

## 🚀 Quick Start

### Voraussetzungen
- Docker und Docker Compose
- Node.js (für lokale Frontend-Entwicklung)
- Python 3.8+ (für lokale Backend-Entwicklung)

### Installation mit Docker

1. **Repository klonen**
   ```bash
   git clone <repository-url>
   cd infection-management
   ```

2. **Umgebungsvariablen konfigurieren**
   ```bash
   cp .env.example .env
   # .env Datei anpassen
   ```

3. **System starten**
   ```bash
   docker-compose up -d
   ```

4. **Datenbankmigrationen ausführen**
   ```bash
   docker-compose exec backend alembic upgrade head
   ```

5. **Anwendung öffnen**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Dokumentation: http://localhost:8000/docs

### Lokale Entwicklung

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# oder: venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 📁 Projektstruktur

```
infection-management/
├── backend/                 # FastAPI Backend
│   ├── app/
│   │   ├── api/            # API Endpoints
│   │   ├── core/           # Konfiguration & Security
│   │   ├── crud/           # Datenbankoperationen
│   │   ├── models/         # SQLAlchemy Models
│   │   ├── schemas/        # Pydantic Schemas
│   │   └── services/       # Business Logic
│   ├── alembic/            # Datenbankmigrationen
│   └── tests/              # Backend Tests
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/     # React Komponenten
│   │   ├── pages/          # Seitenkomponenten
│   │   ├── services/       # API Services
│   │   └── context/        # React Context
├── database/               # Datenbank Setup
└── docs/                   # Projekt Dokumentation
```

## 🔧 Konfiguration

### Umgebungsvariablen

Erstelle eine `.env` Datei im Root-Verzeichnis:

```env
# Datenbank
DATABASE_URL=postgresql://user:password@localhost:5432/infection_db

# Security
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Frontend
REACT_APP_API_URL=http://localhost:8000
```

## 📚 Dokumentation

- [API Dokumentation](docs/api.md) - Detaillierte API Endpunkte
- [Architektur](docs/architecture.md) - Systemarchitektur und Design
- [Datenmodell](docs/data_model.md) - Datenbankschema und Beziehungen

## 🧪 Tests

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🤝 Beitragen

1. Fork das Repository
2. Erstelle einen Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Committe deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## 📄 Lizenz

Dieses Projekt steht unter der MIT Lizenz - siehe [LICENSE](LICENSE) Datei für Details.

## 📞 Support

Bei Fragen oder Problemen:
- Erstelle ein Issue im Repository
- Kontaktiere das Entwicklungsteam

---

**Entwickelt für** Gesundheitsbehörden und Infektionsschutz 

## 🛡️ Validierte Randfälle & Fehlerbehandlung

Das System prüft und verhindert fehlerhafte oder unplausible Eingaben sowohl im Backend (API) als auch im Frontend (Formular). Zu den wichtigsten validierten Randfällen gehören:

- **Name:** Mindestens 2 Zeichen, nur Buchstaben, Leerzeichen und Bindestriche erlaubt
- **Alter:** Muss zwischen 0 und 120 liegen
- **Telefonnummer:** Nur Ziffern, Leerzeichen, +, - und Klammern erlaubt
- **E-Mail:** Muss gültiges Format haben
- **Region:** Pflichtfeld, Auswahl aus vordefinierten Regionen
- **Symptome:** Mindestens ein Symptom muss angegeben werden
- **Erkrankungsdatum:** Darf nicht in der Zukunft liegen
- **Testdatum:** Darf nicht vor dem Erkrankungsdatum liegen
- **Alle Pflichtfelder:** Müssen ausgefüllt sein
- **Backend:** Fängt alle Validierungsfehler ab und gibt verständliche Fehlermeldungen zurück
- **Frontend:** Zeigt Fehler direkt im Formular an und verhindert das Absenden bei ungültigen Eingaben

## 📝 Beispiel-Workflows

### 1. Neuen Infektionsfall anlegen
1. Klicke im Dashboard auf **"+ Neuer Fall"**
2. Fülle alle Pflichtfelder aus (Name, Alter, Region, Symptome, etc.)
3. Klicke auf **"Speichern"**
4. Bei fehlerhaften Eingaben erscheint eine Fehlermeldung direkt im Formular
5. Nach erfolgreicher Anlage erscheint der neue Fall in der Fallübersicht

### 2. Kontaktverfolgung durchführen
1. Wähle einen bestehenden Fall in der Übersicht aus und öffne die Detailansicht
2. Klicke auf **"Kontakte verfolgen"**
3. Sieh dir die automatisch ermittelten und manuell erfassten Kontakte an
4. Ergänze bei Bedarf weitere Kontaktpersonen

### 3. Maßnahmen anordnen
1. Wähle einen Fall aus und öffne die Detailansicht
2. Klicke auf **"Maßnahmen anordnen"**
3. Wähle eine Maßnahme (z.B. Quarantäne, Test) und gib die Details ein
4. Speichere die Maßnahme – sie erscheint in der Maßnahmenliste des Falls

### 4. Fehlerhafte Eingabe testen
1. Versuche, einen Fall mit ungültigen Daten (z.B. Name = "1", Alter = 200) anzulegen
2. Das System zeigt eine passende Fehlermeldung und verhindert die Speicherung 