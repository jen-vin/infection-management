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