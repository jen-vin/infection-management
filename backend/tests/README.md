# Tests für das Infection Management System

## Übersicht

Die Tests verwenden eine echte SQLite-Testdatenbank und testen die API-Endpunkte direkt. Dies stellt sicher, dass die gesamte Anwendung korrekt funktioniert.

## Teststruktur

### `conftest.py`
- **Datenbank-Fixtures**: Erstellt eine frische SQLite-Testdatenbank für jeden Test
- **Client-Fixtures**: FastAPI TestClient mit Datenbank-Override
- **Sample-Daten**: Vordefinierte Testdaten für Fälle, Kontakte und Benutzer

### `test_api_cases.py`
- **Fall-Erstellung**: Testet das Erstellen von Infektionsfällen
- **Fall-Abruf**: Testet das Abrufen einzelner Fälle
- **Fall-Liste**: Testet das Auflisten aller Fälle
- **Fall-Update**: Testet das Aktualisieren von Fällen
- **Symptome**: Testet die Symptom-Verwaltung
- **Validierung**: Testet die Eingabevalidierung

### `test_api_contacts.py`
- **Kontakt-Erstellung**: Testet das Erstellen von Kontakten
- **Kontakt-Abruf**: Testet das Abrufen einzelner Kontakte
- **Kontakt-Liste**: Testet das Auflisten aller Kontakte
- **Kontakt-Update**: Testet das Aktualisieren von Kontakten
- **Standort**: Testet die Standort-Verwaltung
- **Validierung**: Testet die Eingabevalidierung

### `test_api_dashboard.py`
- **Dashboard-Statistiken**: Testet die Dashboard-Daten
- **Benachrichtigungen**: Testet die Benachrichtigungen
- **Authentifizierung**: Testet den Login-Prozess
- **Maßnahmen**: Testet die Maßnahmen-Endpunkte
- **Benutzer**: Testet die Benutzer-Endpunkte

## Ausführung der Tests

### Alle Tests ausführen
```bash
cd backend
pytest tests/
```

### Spezifische Tests ausführen
```bash
# Nur Fall-Tests
pytest tests/test_api_cases.py

# Nur Kontakt-Tests
pytest tests/test_api_contacts.py

# Nur Dashboard-Tests
pytest tests/test_api_dashboard.py
```

### Tests mit Details ausführen
```bash
pytest tests/ -v
```

### Tests mit Coverage ausführen
```bash
pytest tests/ --cov=app --cov-report=html
```

## Test-Datenbank

- **Typ**: SQLite in-memory für Tests
- **Isolation**: Jeder Test bekommt eine frische Datenbank
- **Cleanup**: Automatisches Aufräumen nach jedem Test

## Test-Fixtures

### `db`
- SQLAlchemy Session für die Testdatenbank
- Automatisches Erstellen und Löschen der Tabellen

### `client`
- FastAPI TestClient
- Überschreibt die Datenbank-Dependency

### `sample_case_data`
- Beispiel-Daten für einen Infektionsfall
- Enthält alle erforderlichen Felder

### `sample_contact_data`
- Beispiel-Daten für einen Kontakt
- Enthält alle erforderlichen Felder

## Best Practices

1. **Isolation**: Jeder Test ist unabhängig
2. **Cleanup**: Automatisches Aufräumen nach Tests
3. **Realistische Daten**: Verwendung von echten Datenstrukturen
4. **API-Tests**: Testen der Endpunkte statt interner Funktionen
5. **Validierung**: Testen von Fehlerfällen und Validierung

## Troubleshooting

### Import-Fehler
```bash
# Stelle sicher, dass du im backend-Verzeichnis bist
cd backend
export PYTHONPATH=$PYTHONPATH:$(pwd)
pytest tests/
```

### Datenbank-Fehler
- Überprüfe, ob alle Modelle korrekt importiert werden
- Stelle sicher, dass die Datenbank-URL korrekt ist

### Test-Fehler
- Überprüfe die API-Endpunkte auf korrekte Implementierung
- Stelle sicher, dass die Response-Formate stimmen 