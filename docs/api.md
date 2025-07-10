# API Dokumentation

## Übersicht

Die REST API des Infection Management Systems bietet Endpunkte zur Verwaltung von Infektionsfällen, Kontaktverfolgung und Maßnahmenkoordination.

**Base URL**: `http://localhost:8000`  
**API Version**: v1  
**Dokumentation**: `http://localhost:8000/docs` (Swagger UI)

## Authentifizierung

Die API verwendet JWT (JSON Web Tokens) für die Authentifizierung.

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### Verwendung
Füge den Token zum Authorization Header hinzu:
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Endpunkte

### Benutzerverwaltung

#### Benutzer erstellen
```http
POST /api/users/
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "full_name": "Max Mustermann",
  "role": "health_worker"
}
```

#### Benutzer abrufen
```http
GET /api/users/me
Authorization: Bearer <token>
```

#### Benutzer aktualisieren
```http
PUT /api/users/{user_id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "full_name": "Max Mustermann",
  "role": "admin"
}
```

### Fallverwaltung

#### Fall erstellen
```http
POST /api/cases/
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Max Mustermann",
  "age": 30,
  "status": "Aktiv",
  "date_reported": "2024-01-15",
  "region": "Berlin",
  "user_app_id": "abc123def456ghi789jkl012mno345pqr678stu901",
  "symptoms": ["Fieber", "Husten"],
  "phone": "+49123456789",
  "email": "max@example.com",
  "address": "Musterstraße 1, 12345 Berlin",
  "contacts": 0,
  "test_date": "2024-01-16",
  "test_result": "Positiv",
  "notes": "",
  "contact_history": [],
  "measures": []
}
```

**Wichtige Validierungsregeln:**
- `user_app_id`: **Genau 35 Zeichen**, nur erlaubte Zeichen: A-Z, a-z, 0-9, Bindestrich (-), Unterstrich (_)
- `name`: Mindestens 2 Zeichen, nur Buchstaben, Leerzeichen, Bindestriche
- `age`: Zwischen 0 und 120
- `phone`: Nur Ziffern, Leerzeichen, +, -, Klammern
- `email`: Gültige E-Mail-Adresse
- `region`: Pflichtfeld
- `symptoms`: Mindestens ein Symptom erforderlich

#### Fälle abrufen
```http
GET /api/cases/
Authorization: Bearer <token>
```

**Query Parameter:**
- `status`: Filter nach Status (Aktiv, Genesen, Quarantäne)
- `region`: Filter nach Region
- `date_from`: Startdatum
- `date_to`: Enddatum

## Fehlertoleranz und Validierung

### App-ID Validierung
Das System implementiert strenge Validierung für die `user_app_id`:

**Anforderungen:**
- **Exakte Länge**: 35 Zeichen
- **Erlaubte Zeichen**: A-Z, a-z, 0-9, Bindestrich (-), Unterstrich (_)
- **Format**: Alphanumerisch mit Sonderzeichen

**Fehlertoleranz-Features:**
- **Automatische Bereinigung**: Ungültige Zeichen werden automatisch entfernt
- **Zeichenzähler**: Echtzeit-Anzeige der aktuellen Zeichenanzahl
- **Visuelle Warnungen**: Gelbe Hervorhebung bei falscher Länge
- **Automatische Generierung**: Button zum Generieren gültiger App-IDs
- **Detaillierte Fehlermeldungen**: Spezifische Hinweise bei Validierungsfehlern

**Beispiel-Validierungsfehler:**
```json
{
  "detail": [
    {
      "loc": ["body", "user_app_id"],
      "msg": "App-ID muss genau 35 Zeichen lang sein",
      "type": "value_error"
    },
    {
      "loc": ["body", "user_app_id"],
      "msg": "App-ID darf nur Buchstaben, Zahlen, Bindestriche und Unterstriche enthalten",
      "type": "value_error"
    }
  ]
}
```

#### Fall abrufen
```http
GET /api/cases/{case_id}
Authorization: Bearer <token>
```

#### Fall aktualisieren
```http
PUT /api/cases/{case_id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "recovered",
  "recovery_date": "2024-02-01"
}
```

### Kontaktverfolgung

#### Kontakte für Fall abrufen
```http
GET /api/cases/{case_id}/contacts
Authorization: Bearer <token>
```

#### Kontakt erstellen
```http
POST /api/contacts/
Authorization: Bearer <token>
Content-Type: application/json

{
  "case_id": 1,
  "contact_person_id": 2,
  "contact_date": "2024-01-10",
  "contact_type": "close",
  "duration_minutes": 30,
  "location": "Office Building A"
}
```

#### Kontaktgraph abrufen
```http
GET /api/contacts/graph
Authorization: Bearer <token>
```

**Response:**
```json
{
  "nodes": [
    {
      "id": 1,
      "label": "Max Mustermann",
      "type": "case",
      "status": "confirmed"
    }
  ],
  "edges": [
    {
      "source": 1,
      "target": 2,
      "contact_date": "2024-01-10",
      "contact_type": "close"
    }
  ]
}
```

### Maßnahmenmanagement

#### Maßnahmen abrufen
```http
GET /api/measures/
Authorization: Bearer <token>
```

#### Maßnahme erstellen
```http
POST /api/measures/
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Quarantäne",
  "description": "14-tägige Quarantäne für Kontaktpersonen",
  "duration_days": 14,
  "category": "isolation",
  "target_group": "close_contacts"
}
```

#### Maßnahmen abrufen
```http
GET /api/measures/
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Quarantäne",
    "description": "14-tägige Quarantäne für Kontaktpersonen",
    "duration_days": 14,
    "category": "isolation",
    "target_group": "close_contacts"
  }
]
```

### Dashboard & Statistiken

#### Dashboard-Daten abrufen
```http
GET /api/stats/overview
Authorization: Bearer <token>
```

**Response:**
```json
{
  "total_cases": 123,
  "active_cases": 45,
  "by_age_group": {
    "0-18": 10,
    "19-65": 100,
    "65+": 13
  },
  "by_location": {
    "Berlin": 50,
    "Munich": 30
  }
}
```

#### Benachrichtigungen abrufen
```http
GET /api/notifications/
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "type": "threshold",
    "message": "Incidence in Berlin exceeds 100!",
    "level": "warning"
  },
  {
    "type": "capacity",
    "message": "ICU capacity in Munich below 10%",
    "level": "critical"
  }
]
```

### Benachrichtigungen

#### Benachrichtigung als gelesen markieren
```http
PUT /api/notifications/{notification_id}/read
Authorization: Bearer <token>
```

## Fehlerbehandlung

### Standard-Fehlerformat
```json
{
  "detail": "Fehlermeldung",
  "error_code": "VALIDATION_ERROR"
}
```

### Häufige HTTP-Status-Codes

- `200 OK`: Erfolgreiche Anfrage
- `201 Created`: Ressource erfolgreich erstellt
- `400 Bad Request`: Ungültige Anfrage
- `401 Unauthorized`: Nicht authentifiziert
- `403 Forbidden`: Keine Berechtigung
- `404 Not Found`: Ressource nicht gefunden
- `422 Unprocessable Entity`: Validierungsfehler
- `500 Internal Server Error`: Serverfehler

### Validierungsfehler
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

## Rate Limiting

- **Standard**: 100 Anfragen pro Minute pro IP
- **Authentifizierte Benutzer**: 1000 Anfragen pro Stunde
- **Admin-Benutzer**: 5000 Anfragen pro Stunde

## Paginierung

Endpunkte, die Listen zurückgeben, unterstützen Paginierung:

```http
GET /api/cases/?skip=0&limit=20
```

**Response Header:**
```
X-Total-Count: 150
X-Page-Count: 8
```

## Filterung und Sortierung

### Filterung
```http
GET /api/cases/?status=confirmed&region_id=1
```

### Sortierung
```http
GET /api/cases/?sort_by=infection_date&sort_order=desc
```

## WebSocket Endpoints

### Echtzeit-Updates
```javascript
const ws = new WebSocket('ws://localhost:8000/ws/notifications');

ws.onmessage = function(event) {
  const notification = JSON.parse(event.data);
  console.log('Neue Benachrichtigung:', notification);
};
```

## SDK und Client-Bibliotheken

### JavaScript/TypeScript
```javascript
import { InfectionManagementAPI } from '@infection-management/sdk';

const api = new InfectionManagementAPI({
  baseURL: 'http://localhost:8000',
  token: 'your-jwt-token'
});

// Fall erstellen
const newCase = await api.cases.create({
  person_id: 1,
  infection_date: '2024-01-15',
  symptoms: ['fever', 'cough']
});
```

## Beispiele

### Vollständiger Workflow: Fall mit Kontakten

1. **Benutzer erstellen (falls noch nicht vorhanden)**
```http
POST /api/users/
{
  "username": "max.mustermann",
  "password": "securepassword",
  "role": "health_worker"
}
```

2. **Fall erstellen**
```http
POST /api/cases/
{
  "person_id": 1,
  "infection_date": "2024-01-15",
  "symptoms": ["fever", "cough"],
  "severity": "moderate",
  "status": "confirmed"
}
```

3. **Kontakte hinzufügen**
```http
POST /api/contacts/
{
  "case_id": 1,
  "contact_person_id": 2,
  "contact_date": "2024-01-10",
  "contact_type": "close",
  "duration_minutes": 30,
  "location": "Office Building A"
}
```

4. **Maßnahmen abrufen**
```http
GET /api/measures/
```

5. **Dashboard-Daten abrufen**
```http
GET /api/stats/overview
```

## Sicherheitshinweise

- Verwende HTTPS in Produktionsumgebungen
- Tokens regelmäßig erneuern
- Sensible Daten nicht in Logs speichern
- Input-Validierung auf Client- und Serverseite
- Rate Limiting beachten
