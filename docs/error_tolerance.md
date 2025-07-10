# Fehlertoleranz und Validierung

## Übersicht

Das Infection Management System implementiert umfassende Fehlertoleranz-Mechanismen, um Benutzerfehler zu minimieren und die Datenqualität zu gewährleisten. Besonderer Fokus liegt auf der Validierung der App-ID für die Kontaktverfolgung.

## App-ID Validierung

### Anforderungen

Die `user_app_id` unterliegt strengen Validierungsregeln:

- **Exakte Länge**: 35 Zeichen
- **Erlaubte Zeichen**: A-Z, a-z, 0-9, Bindestrich (-), Unterstrich (_)
- **Format**: Alphanumerisch mit Sonderzeichen
- **Eindeutigkeit**: Jede App-ID muss eindeutig sein

### Beispiel-App-ID
```
abc123def456ghi789jkl012mno345pqr678stu901
```

## Frontend-Fehlertoleranz

### Automatische Eingabebereinigung

```javascript
// Ungültige Zeichen werden automatisch entfernt
onChange={(e) => {
  const cleanedValue = e.target.value.replace(/[^A-Za-z0-9\-_]/g, '');
  setNewCase({ ...newCase, user_app_id: cleanedValue });
}}
```

### Visuelle Hilfestellungen

1. **Zeichenzähler**: Echtzeit-Anzeige der aktuellen Zeichenanzahl
2. **Warnungen**: Gelbe Hervorhebung bei falscher Länge
3. **Placeholder**: Klare Anweisungen für erlaubte Zeichen
4. **Hilfetext**: Erklärung der Fehlertoleranz-Features

### Automatische ID-Generierung

```javascript
const generateAppId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  let result = '';
  for (let i = 0; i < 35; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
```

## Backend-Validierung

### Pydantic-Schema

```python
class CaseCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    age: int = Field(..., ge=0, le=120)
    user_app_id: str = Field(..., regex=r'^[A-Za-z0-9\-_]{35}$')
    # ... weitere Felder
```

### Validierungslogik

```python
def validate_case(values):
    errors = {}
    
    # App-ID Validierung
    if not values.user_app_id or values.user_app_id.strip().length == 0:
        errors.user_app_id = 'App-ID ist ein Pflichtfeld'
    elif values.user_app_id.strip().length != 35:
        errors.user_app_id = 'App-ID muss genau 35 Zeichen lang sein'
    elif not re.match(r'^[A-Za-z0-9\-_]+$', values.user_app_id.strip()):
        errors.user_app_id = 'App-ID darf nur Buchstaben, Zahlen, Bindestriche und Unterstriche enthalten'
    
    return errors
```

## Datenbank-Constraints

### Schema-Definition

```sql
CREATE TABLE cases (
    -- ... andere Felder
    user_app_id VARCHAR(35) NOT NULL UNIQUE,
    -- ... weitere Felder
    CONSTRAINT chk_cases_user_app_id_format 
    CHECK (user_app_id ~ '^[A-Za-z0-9\-_]{35}$')
);
```

### Indizes

```sql
-- Optimierung für App-ID Abfragen
CREATE UNIQUE INDEX idx_cases_user_app_id ON cases(user_app_id);
```

## Allgemeine Validierungsregeln

### Name
- **Mindestlänge**: 2 Zeichen
- **Erlaubte Zeichen**: A-Z, a-z, ÄÖÜäöüß, Leerzeichen, Bindestriche
- **Regex**: `^[A-Za-zÄÖÜäöüß\s-]+$`

### Alter
- **Bereich**: 0-120 Jahre
- **Typ**: Integer

### Telefon
- **Erlaubte Zeichen**: Ziffern, Leerzeichen, +, -, Klammern
- **Regex**: `^[\d\s+\-()]+$`

### E-Mail
- **Format**: Standard E-Mail-Validierung
- **Regex**: `^\S+@\S+\.\S+$`

### Region
- **Pflichtfeld**: Ja
- **Typ**: Dropdown-Auswahl

### Symptome
- **Mindestanzahl**: 1 Symptom
- **Format**: Kommagetrennte Liste

## Fehlermeldungen

### Frontend-Fehlermeldungen

```javascript
const errorMessages = {
    name: 'Name muss mindestens 2 Zeichen lang sein',
    age: 'Alter muss zwischen 0 und 120 liegen',
    user_app_id: 'App-ID muss genau 35 Zeichen lang sein',
    phone: 'Telefonnummer darf nur Ziffern, Leerzeichen, +, - und Klammern enthalten',
    email: 'Bitte eine gültige E-Mail-Adresse eingeben',
    region: 'Bitte eine Region auswählen',
    symptoms: 'Bitte mindestens ein Symptom angeben'
};
```

### API-Fehlermeldungen

```json
{
  "detail": [
    {
      "loc": ["body", "user_app_id"],
      "msg": "App-ID muss genau 35 Zeichen lang sein",
      "type": "value_error"
    }
  ]
}
```

## Test-Coverage

### Frontend-Tests
- ✅ Eingabevalidierung
- ✅ Automatische Bereinigung
- ✅ Zeichenzähler
- ✅ Generierungs-Button
- ✅ Fehlermeldungen

### Backend-Tests
- ✅ Pydantic-Schema-Validierung
- ✅ Datenbank-Constraints
- ✅ API-Endpunkt-Validierung
- ✅ Fehlerbehandlung

### Integration-Tests
- ✅ End-to-End Validierung
- ✅ Datenbank-Integration
- ✅ Frontend-Backend-Kommunikation

## Best Practices

### Benutzerfreundlichkeit
1. **Echtzeit-Feedback**: Sofortige Validierung während der Eingabe
2. **Klare Fehlermeldungen**: Spezifische Hinweise zur Behebung
3. **Automatische Korrektur**: Wo möglich, automatische Bereinigung
4. **Hilfestellungen**: Tooltips und Hilfetexte

### Sicherheit
1. **Mehrschichtige Validierung**: Frontend, API, Datenbank
2. **Input-Sanitization**: Bereinigung aller Benutzereingaben
3. **SQL-Injection-Schutz**: Parametrisierte Queries
4. **XSS-Schutz**: Escaping von Benutzereingaben

### Performance
1. **Client-seitige Validierung**: Reduzierung von API-Calls
2. **Indizierung**: Optimierte Datenbankabfragen
3. **Caching**: Zwischenspeicherung von Validierungsregeln
4. **Lazy Loading**: Bedarfsgesteuerte Validierung

## Monitoring und Logging

### Validierungsfehler-Tracking

```python
import logging

logger = logging.getLogger(__name__)

def log_validation_error(field, value, error_type):
    logger.warning(f"Validation error: {field}={value}, type={error_type}")
```

### Metriken

- Anzahl Validierungsfehler pro Feld
- Häufigste Fehlertypen
- Benutzerinteraktionen mit Fehlertoleranz-Features
- Performance-Metriken für Validierung

## Zukünftige Erweiterungen

### Geplante Features
1. **Intelligente Vorschläge**: KI-basierte Eingabehilfen
2. **Erweiterte Validierung**: Komplexere Geschäftsregeln
3. **Mehrsprachige Fehlermeldungen**: Internationalisierung
4. **Accessibility**: Barrierefreie Validierung
5. **Mobile Optimierung**: Touch-freundliche Eingabehilfen 