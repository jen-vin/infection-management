# Datenmodell

## Übersicht

Das Datenmodell des Infection Management Systems ist für die effiziente Verwaltung von Infektionsfällen, Kontaktverfolgung und Maßnahmenkoordination optimiert. Es folgt den Prinzipien der Normalisierung und referentiellen Integrität.

## Entity Relationship Diagram (ERD)

```
┌─────────────┐     ┌─────────────┐
│    users    │     │   regions   │
├─────────────┤     ├─────────────┤
│ id (PK)     │     │ id (PK)     │
│ email       │     │ name        │
│ password    │     │ code        │
│ full_name   │     │ population  │
│ role        │     │ created_at  │
│ is_active   │     │ updated_at  │
│ created_at  │     └─────────────┘
│ updated_at  │
└─────────────┘
        │
        │ FK
        ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   measures  │     │    cases    │     │  contacts   │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ id (PK)     │     │ id (PK)     │     │ id (PK)     │
│ name        │     │ person_id   │     │ case_id     │
│ description │     │ infection_date│   │ contact_person_id│
│ duration_days│    │ symptoms    │     │ contact_date│
│ category    │     │ severity    │     │ contact_type│
│ target_group│     │ status      │     │ duration_minutes│
│ created_at  │     │ created_by  │     │ location    │
│ updated_at  │     │ created_at  │     │ created_at  │
└─────────────┘     │ updated_at  │     │ updated_at  │
                    └─────────────┘     └─────────────┘
```

## Tabellen-Details

### 1. users

Speichert Benutzerinformationen und Authentifizierungsdaten.

| Feld | Typ | Beschreibung | Constraints |
|------|-----|--------------|-------------|
| `id` | SERIAL | Primärschlüssel | PRIMARY KEY |
| `email` | VARCHAR(255) | E-Mail-Adresse | UNIQUE, NOT NULL |
| `hashed_password` | VARCHAR(255) | Gehashtes Passwort | NOT NULL |
| `full_name` | VARCHAR(255) | Vollständiger Name | NOT NULL |
| `role` | ENUM | Benutzerrolle | 'admin', 'health_worker', 'viewer' |
| `is_active` | BOOLEAN | Aktiv-Status | DEFAULT true |
| `created_at` | TIMESTAMP | Erstellungsdatum | DEFAULT NOW() |
| `updated_at` | TIMESTAMP | Änderungsdatum | DEFAULT NOW() |

**Indizes:**
- `idx_users_email` auf `email`
- `idx_users_role` auf `role`

### 2. regions

Verwaltet geografische Regionen für die Fallzuordnung.

| Feld | Typ | Beschreibung | Constraints |
|------|-----|--------------|-------------|
| `id` | SERIAL | Primärschlüssel | PRIMARY KEY |
| `name` | VARCHAR(255) | Regionsname | NOT NULL |
| `code` | VARCHAR(10) | Regionscode | UNIQUE, NOT NULL |
| `population` | INTEGER | Bevölkerungszahl | DEFAULT 0 |
| `created_at` | TIMESTAMP | Erstellungsdatum | DEFAULT NOW() |
| `updated_at` | TIMESTAMP | Änderungsdatum | DEFAULT NOW() |

**Indizes:**
- `idx_regions_code` auf `code`



### 3. cases

Verwaltet Infektionsfälle.

| Feld | Typ | Beschreibung | Constraints |
|------|-----|--------------|-------------|
| `id` | SERIAL | Primärschlüssel | PRIMARY KEY |
| `person_id` | INTEGER | Personen-Referenz | FOREIGN KEY, NOT NULL |
| `infection_date` | DATE | Infektionsdatum | NOT NULL |
| `symptoms` | JSONB | Symptome als Array | DEFAULT '[]' |
| `severity` | ENUM | Schweregrad | 'mild', 'moderate', 'severe' |
| `status` | ENUM | Fallstatus | 'suspected', 'confirmed', 'recovered', 'deceased' |
| `created_by` | INTEGER | Erstellender Benutzer | FOREIGN KEY |
| `created_at` | TIMESTAMP | Erstellungsdatum | DEFAULT NOW() |
| `updated_at` | TIMESTAMP | Änderungsdatum | DEFAULT NOW() |

**Beziehungen:**
- `person_id` → `users.id` (Personen sind als Benutzer gespeichert)
- `created_by` → `users.id`

**Indizes:**
- `idx_cases_person` auf `person_id`
- `idx_cases_status` auf `status`
- `idx_cases_infection_date` auf `infection_date`

### 4. contacts

Verwaltet Kontakte zwischen Personen für die Kontaktverfolgung.

| Feld | Typ | Beschreibung | Constraints |
|------|-----|--------------|-------------|
| `id` | SERIAL | Primärschlüssel | PRIMARY KEY |
| `case_id` | INTEGER | Fall-Referenz | FOREIGN KEY, NOT NULL |
| `contact_person_id` | INTEGER | Kontaktperson-Referenz | FOREIGN KEY, NOT NULL |
| `contact_date` | DATE | Kontaktdatum | NOT NULL |
| `contact_type` | ENUM | Kontakttyp | 'close', 'casual', 'brief' |
| `duration_minutes` | INTEGER | Kontaktdauer in Minuten | |
| `location` | VARCHAR(255) | Kontaktort | |
| `created_at` | TIMESTAMP | Erstellungsdatum | DEFAULT NOW() |
| `updated_at` | TIMESTAMP | Änderungsdatum | DEFAULT NOW() |

**Beziehungen:**
- `case_id` → `cases.id`
- `contact_person_id` → `users.id` (Kontaktpersonen sind als Benutzer gespeichert)

**Indizes:**
- `idx_contacts_case` auf `case_id`
- `idx_contacts_person` auf `contact_person_id`
- `idx_contacts_date` auf `contact_date`
- `idx_contacts_type` auf `contact_type`

### 5. measures

Verwaltet Präventions- und Kontrollmaßnahmen.

| Feld | Typ | Beschreibung | Constraints |
|------|-----|--------------|-------------|
| `id` | SERIAL | Primärschlüssel | PRIMARY KEY |
| `name` | VARCHAR(255) | Maßnahmenname | NOT NULL |
| `description` | TEXT | Beschreibung | |
| `duration_days` | INTEGER | Dauer in Tagen | DEFAULT 0 |
| `category` | ENUM | Kategorie | 'isolation', 'quarantine', 'testing', 'monitoring' |
| `target_group` | ENUM | Zielgruppe | 'cases', 'close_contacts', 'casual_contacts', 'general' |
| `created_at` | TIMESTAMP | Erstellungsdatum | DEFAULT NOW() |
| `updated_at` | TIMESTAMP | Änderungsdatum | DEFAULT NOW() |

**Indizes:**
- `idx_measures_category` auf `category`
- `idx_measures_target_group` auf `target_group`

## Beziehungen und Constraints

### Referentielle Integrität

```sql
-- Fälle zu Benutzern (Personen)
ALTER TABLE cases 
ADD CONSTRAINT fk_cases_person 
FOREIGN KEY (person_id) REFERENCES users(id);

-- Fälle zu Benutzern (Ersteller)
ALTER TABLE cases 
ADD CONSTRAINT fk_cases_created_by 
FOREIGN KEY (created_by) REFERENCES users(id);

-- Kontakte zu Fällen
ALTER TABLE contacts 
ADD CONSTRAINT fk_contacts_case 
FOREIGN KEY (case_id) REFERENCES cases(id);

-- Kontakte zu Benutzern (Kontaktpersonen)
ALTER TABLE contacts 
ADD CONSTRAINT fk_contacts_person 
FOREIGN KEY (contact_person_id) REFERENCES users(id);
```

### Check Constraints

```sql
-- Validierung von E-Mail-Adressen
ALTER TABLE users 
ADD CONSTRAINT chk_users_email 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');



-- Validierung von Infektionsdaten
ALTER TABLE cases 
ADD CONSTRAINT chk_cases_infection_date 
CHECK (infection_date <= CURRENT_DATE);

-- Validierung von Kontaktdaten
ALTER TABLE contacts 
ADD CONSTRAINT chk_contacts_date 
CHECK (contact_date <= CURRENT_DATE);

-- Validierung von Kontaktdauer
ALTER TABLE contacts 
ADD CONSTRAINT chk_contacts_duration 
CHECK (duration_minutes >= 0);
```

## Datenintegrität

### Trigger für updated_at

```sql
-- Trigger-Funktion
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger für alle Tabellen
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_regions_updated_at BEFORE UPDATE ON regions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cases_updated_at BEFORE UPDATE ON cases
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_measures_updated_at BEFORE UPDATE ON measures
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Soft Delete (Optional)

```sql
-- Soft Delete für Benutzer (optional)
ALTER TABLE users ADD COLUMN deleted_at TIMESTAMP;

-- Index für Soft Delete
CREATE INDEX idx_users_deleted_at ON users(deleted_at);

-- View für aktive Benutzer
CREATE VIEW active_users AS
SELECT * FROM users WHERE deleted_at IS NULL;
```

## Performance-Optimierung

### Komposite Indizes

```sql
-- Optimierung für Fallabfragen
CREATE INDEX idx_cases_status_date ON cases(status, infection_date);

-- Optimierung für Kontaktabfragen
CREATE INDEX idx_contacts_case_date ON contacts(case_id, contact_date);

-- Optimierung für Benutzerabfragen
CREATE INDEX idx_users_role_active ON users(role, is_active);
```

### Partitionierung (für große Datenmengen)

```sql
-- Partitionierung der cases-Tabelle nach Jahr
CREATE TABLE cases_2024 PARTITION OF cases
FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

CREATE TABLE cases_2025 PARTITION OF cases
FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');
```

## Datenmodell-Erweiterungen

### Zukünftige Tabellen

#### notifications
```sql
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### case_measures
```sql
CREATE TABLE case_measures (
    id SERIAL PRIMARY KEY,
    case_id INTEGER REFERENCES cases(id),
    measure_id INTEGER REFERENCES measures(id),
    start_date DATE NOT NULL,
    end_date DATE,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### audit_logs
```sql
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    record_id INTEGER,
    old_values JSONB,
    new_values JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## Datenvalidierung

### Pydantic Schemas (Backend)

```python
# Beispiel für Case Schema
class CaseCreate(BaseModel):
    person_id: int
    infection_date: date
    symptoms: List[str] = []
    severity: Literal["mild", "moderate", "severe"]
    status: Literal["suspected", "confirmed", "recovered", "deceased"]
    region_id: Optional[int] = None

    @validator('infection_date')
    def validate_infection_date(cls, v):
        if v > date.today():
            raise ValueError('Infection date cannot be in the future')
        return v

    @validator('symptoms')
    def validate_symptoms(cls, v):
        valid_symptoms = ['fever', 'cough', 'fatigue', 'loss_of_taste']
        for symptom in v:
            if symptom not in valid_symptoms:
                raise ValueError(f'Invalid symptom: {symptom}')
        return v
```

## Datenmigration

### Alembic Migrationen

```python
# Beispiel-Migration für neue Spalte
def upgrade():
    op.add_column('cases', sa.Column('recovery_date', sa.Date(), nullable=True))
    op.create_index('idx_cases_recovery_date', 'cases', ['recovery_date'])

def downgrade():
    op.drop_index('idx_cases_recovery_date', 'cases')
    op.drop_column('cases', 'recovery_date')
```

## Backup-Strategie

### Vollständige Backups
```bash
# Tägliches Backup
pg_dump -h localhost -U user -d infection_db > backup_$(date +%Y%m%d).sql

# Komprimiertes Backup
pg_dump -h localhost -U user -d infection_db | gzip > backup_$(date +%Y%m%d).sql.gz
```

### Incrementelle Backups
```bash
# WAL-Archivierung aktivieren
# postgresql.conf
wal_level = replica
archive_mode = on
archive_command = 'cp %p /var/lib/postgresql/archive/%f'
```

## Datenarchivierung

### Archivierung alter Fälle
```sql
-- Fälle älter als 2 Jahre archivieren
CREATE TABLE archived_cases AS
SELECT * FROM cases 
WHERE infection_date < CURRENT_DATE - INTERVAL '2 years';

-- Archivierte Fälle aus Haupttabelle löschen
DELETE FROM cases 
WHERE infection_date < CURRENT_DATE - INTERVAL '2 years';
```
