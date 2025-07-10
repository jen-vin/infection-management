import React, { useState, useEffect } from 'react';
import { createCase, getCases } from '../services/api';
import './CasesPage.css';

const CasesPage = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
  const fetchCases = async () => {
    try {
      const data = await getCases();
      setCases(data);
    } catch (err) {
      console.error('Fehler beim Laden der Fälle:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchCases();
  }, []);

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [editingCase, setEditingCase] = useState(null);
  const [showMeasuresModal, setShowMeasuresModal] = useState(false);
  const [selectedCaseForMeasures, setSelectedCaseForMeasures] = useState(null);
  const [newMeasure, setNewMeasure] = useState({
    type: '',
    date: new Date().toISOString().split('T')[0],
    duration: '',
    notes: ''
  });
  const [newCase, setNewCase] = useState({
    name: '',
    age: '',
    region: '',
    symptoms: [],
    phone: '',
    email: '',
    address: '',
    user_app_id: '',
    date_reported: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Regionale Daten für Empfehlungen
  const regionalData = {
    'Berlin': {
      population: 3669491,
      activeCases: 45,
      incidence: 12.3,
      hospitalCapacity: 85,
      vaccinationRate: 78.5,
      currentMeasures: ['Kontaktverfolgung', 'Testkapazitäten erhöht']
    },
    'Hamburg': {
      population: 1841179,
      activeCases: 32,
      incidence: 17.4,
      hospitalCapacity: 92,
      vaccinationRate: 82.1,
      currentMeasures: ['Maskenpflicht in Innenräumen']
    },
    'München': {
      population: 1488202,
      activeCases: 38,
      incidence: 25.5,
      hospitalCapacity: 78,
      vaccinationRate: 75.8,
      currentMeasures: ['2G-Regel', 'Kontaktverfolgung']
    },
    'Köln': {
      population: 1085664,
      activeCases: 28,
      incidence: 25.8,
      hospitalCapacity: 88,
      vaccinationRate: 79.2,
      currentMeasures: []
    },
    'Frankfurt': {
      population: 753056,
      activeCases: 25,
      incidence: 33.2,
      hospitalCapacity: 72,
      vaccinationRate: 76.5,
      currentMeasures: ['3G-Regel', 'Maskenpflicht']
    }
  };

  // Intelligente Maßnahmen-Empfehlungen
  const generateRecommendations = (caseItem) => {
    const recommendations = [];
    const region = regionalData[caseItem.region];
    
    if (!region) return recommendations;

    // Individuelle Fall-basierte Empfehlungen
    if (caseItem.contacts > 10) {
      recommendations.push({
        type: 'Kontaktverfolgung',
        priority: 'Hoch',
        reason: `${caseItem.contacts} Kontaktpersonen identifiziert - intensive Verfolgung erforderlich`,
        urgency: 'Sofort',
        category: 'Individuell'
      });
    }

    if (caseItem.age > 60) {
      recommendations.push({
        type: 'PCR-Test',
        priority: 'Hoch',
        reason: 'Patient über 60 Jahre - erhöhtes Risiko für schweren Verlauf',
        urgency: 'Innerhalb 24h',
        category: 'Individuell'
      });
    }

    if (caseItem.symptoms.includes('Atemnot') || caseItem.symptoms.includes('Brustschmerzen')) {
      recommendations.push({
        type: 'Arztbesuch',
        priority: 'Kritisch',
        reason: 'Symptome deuten auf mögliche Komplikationen hin',
        urgency: 'Sofort',
        category: 'Individuell'
      });
    }

    // Regionale Empfehlungen basierend auf Inzidenz
    if (region.incidence > 50) {
      recommendations.push({
        type: 'Regionale Maßnahmen',
        priority: 'Hoch',
        reason: `Inzidenz in ${caseItem.region}: ${region.incidence}/100.000 - regionale Maßnahmen erforderlich`,
        urgency: 'Innerhalb 48h',
        category: 'Regional',
        suggestedMeasures: [
          'Maskenpflicht in Innenräumen',
          'Kontaktbeschränkungen',
          'Veranstaltungsverbote',
          'Schulschließungen bei weiterem Anstieg'
        ]
      });
    }

    if (region.incidence > 100) {
      recommendations.push({
        type: 'Lockdown-Empfehlung',
        priority: 'Kritisch',
        reason: `Inzidenz über 100/100.000 - strenge Maßnahmen erforderlich`,
        urgency: 'Sofort',
        category: 'Regional',
        suggestedMeasures: [
          'Lockdown für nicht-essentielle Geschäfte',
          'Ausgangsbeschränkungen',
          'Homeoffice-Pflicht',
          'Kontaktverbot'
        ]
      });
    }

    // Krankenhauskapazität
    if (region.hospitalCapacity > 90) {
      recommendations.push({
        type: 'Krankenhaus-Notfall',
        priority: 'Kritisch',
        reason: `Krankenhauskapazität in ${caseItem.region}: ${region.hospitalCapacity}% - Überlastung droht`,
        urgency: 'Sofort',
        category: 'Systemisch',
        suggestedMeasures: [
          'Notfallplan aktivieren',
          'Elektive Eingriffe verschieben',
          'Intensivbetten aufstocken',
          'Patienten in andere Regionen verlegen'
        ]
      });
    }

    // Impfrate-basierte Empfehlungen
    if (region.vaccinationRate < 70) {
      recommendations.push({
        type: 'Impfkampagne',
        priority: 'Mittel',
        reason: `Impfrate in ${caseItem.region}: ${region.vaccinationRate}% - Impfkampagne verstärken`,
        urgency: 'Innerhalb 1 Woche',
        category: 'Präventiv',
        suggestedMeasures: [
          'Mobile Impfteams',
          'Impfzentren erweitern',
          'Aufklärungskampagnen',
          'Anreize für Impfung'
        ]
      });
    }

    // Cluster-Erkennung
    const clusterCases = cases.filter(c => 
      c.region === caseItem.region && 
      c.status === 'Aktiv' && 
      c.dateReported === caseItem.dateReported
    );

    if (clusterCases.length > 5) {
      recommendations.push({
        type: 'Cluster-Erkennung',
        priority: 'Hoch',
        reason: `${clusterCases.length} neue Fälle in ${caseItem.region} am ${caseItem.dateReported} - möglicher Cluster`,
        urgency: 'Innerhalb 24h',
        category: 'Epidemiologisch',
        suggestedMeasures: [
          'Cluster-Untersuchung',
          'Erweiterte Kontaktverfolgung',
          'Zielgerichtete Tests',
          'Lokale Maßnahmen'
        ]
      });
    }

    return recommendations;
  };

  const validateCase = (values) => {
    const errors = {};
    // Name: min. 2 Zeichen, nur Buchstaben, Leerzeichen, Bindestrich
    if (!values.name || values.name.trim().length < 2) {
      errors.name = 'Name muss mindestens 2 Zeichen lang sein';
    } else if (!/^[A-Za-zÄÖÜäöüß\s-]+$/.test(values.name)) {
      errors.name = 'Name darf nur Buchstaben, Leerzeichen und Bindestriche enthalten';
    }
    // Alter: 0-120
    if (!values.age || isNaN(values.age) || values.age < 0 || values.age > 120) {
      errors.age = 'Alter muss zwischen 0 und 120 liegen';
    }
    // Telefon: nur Ziffern, Leerzeichen, +, -, Klammern
    if (values.phone && !/^[\d\s+\-()]+$/.test(values.phone)) {
      errors.phone = 'Telefonnummer darf nur Ziffern, Leerzeichen, +, - und Klammern enthalten';
    }
    // E-Mail: HTML5-Validierung reicht meist, aber für Feedback:
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) {
      errors.email = 'Bitte eine gültige E-Mail-Adresse eingeben';
    }
    // Region: Pflichtfeld
    if (!values.region) {
      errors.region = 'Bitte eine Region auswählen';
    }
    // Symptome: Pflichtfeld
    if (!values.symptoms || values.symptoms.length < 1) {
      errors.symptoms = 'Bitte mindestens ein Symptom angeben';
    }
    // user_app_id: Pflichtfeld, mindestens 3 Zeichen
    if (!values.user_app_id || values.user_app_id.trim().length < 3) {
      errors.user_app_id = 'App-ID muss mindestens 3 Zeichen lang sein';
    }
    return errors;
  };

  const handleAddCase = async (e) => {
    e.preventDefault();
    const errors = validateCase(newCase);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    const caseToAdd = {
      ...newCase,
      status: 'Aktiv',
      date_reported: new Date().toISOString().split('T')[0],
      contacts: 0,
      test_date: new Date().toISOString().split('T')[0],
      test_result: 'Ausstehend',
      contact_history: [],
      notes: '',
      measures: [],
      symptoms: newCase.symptoms
        ? newCase.symptoms.split(',').map(s => s.trim())
        : []
    };
    console.log("newCase.symptoms:", newCase.symptoms);
    console.log("Processed symptoms:", newCase.symptoms
      ? newCase.symptoms.split(',').map(s => s.trim())
      : []);
    console.log("Sending to backend:", caseToAdd);

    try {
      await createCase(caseToAdd);
      const updatedCases = await getCases();
      setCases(updatedCases);

    } catch (error) {
      console.error('Fehler beim Speichern des Falls:', error);
    }

    setNewCase({
      name: '',
      age: '',
      region: '',
      symptoms: [],
      phone: '',
      email: '',
      address: '',
      user_app_id: '',
      date_reported: ''
    });
    setShowAddForm(false);
  };

    const handleEditCase = (caseItem) => {
      setEditingCase({ ...caseItem });
    setSelectedCase(null);
  };

  const handleSaveEdit = () => {
    setCases(cases.map(c => c.id === editingCase.id ? editingCase : c));
    setEditingCase(null);
  };

  const handleCancelEdit = () => {
    setEditingCase(null);
  };

  const handleOpenMeasures = (caseItem) => {
    setSelectedCaseForMeasures(caseItem);
    setShowMeasuresModal(true);
  };

  const handleAddMeasure = (e) => {
    e.preventDefault();
    const measureToAdd = {
      id: Date.now(),
      ...newMeasure,
      status: 'Aktiv'
    };
    
    setCases(cases.map(c => 
      c.id === selectedCaseForMeasures.id 
        ? { ...c, measures: [...c.measures, measureToAdd] }
        : c
    ));
    
    setNewMeasure({
      type: '',
      date: new Date().toISOString().split('T')[0],
      duration: '',
      notes: ''
    });
  };

  const handleCloseMeasuresModal = () => {
    setShowMeasuresModal(false);
    setSelectedCaseForMeasures(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aktiv': return 'status-active';
      case 'Genesen': return 'status-recovered';
      case 'Quarantäne': return 'status-quarantine';
      default: return '';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Hoch': return 'risk-high';
      case 'Mittel': return 'risk-medium';
      case 'Niedrig': return 'risk-low';
      default: return '';
    }
  };

  const getMeasureStatusColor = (status) => {
    switch (status) {
      case 'Aktiv': return 'measure-active';
      case 'Abgeschlossen': return 'measure-completed';
      case 'Beendet': return 'measure-ended';
      case 'In Bearbeitung': return 'measure-pending';
      default: return '';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Kritisch': return 'priority-critical';
      case 'Hoch': return 'priority-high';
      case 'Mittel': return 'priority-medium';
      case 'Niedrig': return 'priority-low';
      default: return '';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Sofort': return 'urgency-immediate';
      case 'Innerhalb 24h': return 'urgency-24h';
      case 'Innerhalb 48h': return 'urgency-48h';
      case 'Innerhalb 1 Woche': return 'urgency-week';
      default: return '';
    }
  };

  return (
    <div className="cases-page">
      <div className="page-header">
        <h2>Fallverwaltung</h2>
        <button 
          className="add-case-btn"
          onClick={() => setShowAddForm(true)}
        >
          + Neuer Fall
        </button>
      </div>

      {/* Kontaktnummer-Erklärung */}
      <div className="info-box">
        <h3>📱 Wie funktioniert die Kontaktverfolgung?</h3>
        <p>
          Die <strong>Kontaktnummer</strong> zeigt an, wie viele Personen identifiziert wurden, 
          die engen Kontakt mit dem Infizierten hatten. Dies erfolgt durch:
        </p>
        <ul>
          <li><strong>Corona-Warn-App:</strong> Automatische Kontakterkennung über Bluetooth</li>
          <li><strong>Manuelle Angaben:</strong> Vom Patienten gemeldete Kontakte</li>
          <li><strong>Lokationsdaten:</strong> Aufenthaltsorte und Zeiträume</li>
          <li><strong>Soziale Kontakte:</strong> Familie, Freunde, Arbeitskollegen</li>
        </ul>
        <p>
          <em>Die App funktioniert ähnlich wie die offizielle Corona-Warn-App und warnt Kontaktpersonen automatisch.</em>
        </p>
      </div>

      {showAddForm && (
        <div className="add-case-form">
          <h3>Neuen Fall hinzufügen</h3>
          <form onSubmit={handleAddCase}>
            <div className="form-row">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={newCase.name}
                  onChange={(e) => setNewCase({...newCase, name: e.target.value})}
                  required
                />
                {formErrors.name && <div className="form-error">{formErrors.name}</div>}
              </div>
              <div className="form-group">
                <label>Alter:</label>
                <input
                  type="number"
                  value={newCase.age}
                  onChange={(e) => setNewCase({...newCase, age: e.target.value})}
                  required
                />
                {formErrors.age && <div className="form-error">{formErrors.age}</div>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Telefon:</label>
                <input
                  type="tel"
                  value={newCase.phone}
                  onChange={(e) => setNewCase({...newCase, phone: e.target.value})}
                  required
                />
                {formErrors.phone && <div className="form-error">{formErrors.phone}</div>}
              </div>
              <div className="form-group">
                <label>E-Mail:</label>
                <input
                  type="email"
                  value={newCase.email}
                  onChange={(e) => setNewCase({...newCase, email: e.target.value})}
                  required
                />
                {formErrors.email && <div className="form-error">{formErrors.email}</div>}
              </div>
            </div>
            <div className="form-group">
              <label>Adresse:</label>
              <input
                type="text"
                value={newCase.address}
                onChange={(e) => setNewCase({...newCase, address: e.target.value})}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Region:</label>
                <select
                  value={newCase.region}
                  onChange={(e) => setNewCase({...newCase, region: e.target.value})}
                  required
                >
                  <option value="">Bitte wählen</option>
                  <option value="Berlin">Berlin</option>
                  <option value="Hamburg">Hamburg</option>
                  <option value="München">München</option>
                  <option value="Köln">Köln</option>
                  <option value="Frankfurt">Frankfurt</option>
                </select>
                {formErrors.region && <div className="form-error">{formErrors.region}</div>}
              </div>
              <div className="form-group">
                <label>Symptome:</label>
                <input
                  type="text"
                  value={newCase.symptoms}
                  onChange={(e) => setNewCase({...newCase, symptoms: e.target.value})}
                  required
                />
                {formErrors.symptoms && <div className="form-error">{formErrors.symptoms}</div>}
              </div>
              <div className="form-group">
                <label>App-ID (user_app_id):</label>
                <input
                  type="text"
                  value={newCase.user_app_id}
                  onChange={(e) => setNewCase({ ...newCase, user_app_id: e.target.value })}
                  required
                />
                {formErrors.user_app_id && <div className="form-error">{formErrors.user_app_id}</div>}
              </div>

            </div>
            <div className="form-actions">
              <button type="submit" className="save-btn">Speichern</button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => setShowAddForm(false)}
              >
                Abbrechen
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="cases-content">
        {loading && <p>Fälle werden geladen...</p>}
        {error && <p style={{ color: 'red' }}>Fehler: {error}</p>}
        <div className="cases-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Alter</th>
                <th>Status</th>
                <th>Datum</th>
                <th>Region</th>
                <th>Symptome</th>
                <th>Kontakte</th>
                <th>Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {cases.map(caseItem => (
                <tr key={caseItem.id}>
                  <td>{caseItem.id}</td>
                  <td>{caseItem.name}</td>
                  <td>{caseItem.age}</td>
                  <td>
                    <span className={`status ${getStatusColor(caseItem.status)}`}>
                      {caseItem.status}
                    </span>
                  </td>
                  <td>{caseItem.date_reported}</td>
                  <td>{caseItem.region}</td>
                  <td>{caseItem.symptoms}</td>
                  <td>
                    <span className="contact-count" title="Identifizierte Kontaktpersonen">
                      {caseItem.contacts}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="action-btn"
                      onClick={() => handleEditCase(caseItem)}
                    >
                      Bearbeiten
                    </button>
                    <button 
                      className="action-btn measures-btn"
                      onClick={() => handleOpenMeasures(caseItem)}
                    >
                      Maßnahmen
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fall-Details */}
        {selectedCase && (
          <div className="case-details">
            <div className="details-header">
              <h3>Fall Details: {selectedCase.name}</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedCase(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="details-grid">
              <div className="detail-section">
                <h4>Persönliche Daten</h4>
                <div className="detail-item">
                  <label>Name:</label>
                  <span>{selectedCase.name}</span>
                </div>
                <div className="detail-item">
                  <label>Alter:</label>
                  <span>{selectedCase.age} Jahre</span>
                </div>
                <div className="detail-item">
                  <label>Telefon:</label>
                  <span>{selectedCase.phone}</span>
                </div>
                <div className="detail-item">
                  <label>E-Mail:</label>
                  <span>{selectedCase.email}</span>
                </div>
                <div className="detail-item">
                  <label>Adresse:</label>
                  <span>{selectedCase.address}</span>
                </div>
              </div>

              <div className="detail-section">
                <h4>Medizinische Daten</h4>
                <div className="detail-item">
                  <label>Status:</label>
                  <span className={`status ${getStatusColor(selectedCase.status)}`}>
                    {selectedCase.status}
                  </span>
                </div>
                <div className="detail-item">
                  <label>Testdatum:</label>
                  <span>{selectedCase.testDate}</span>
                </div>
                <div className="detail-item">
                  <label>Testergebnis:</label>
                  <span>{selectedCase.testResult}</span>
                </div>
                <div className="detail-item">
                  <label>Symptome:</label>
                  <span>{selectedCase.symptoms}</span>
                </div>
                <div className="detail-item">
                  <label>Kontakte:</label>
                  <span className="contact-count">{selectedCase.contacts} Personen</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h4>Kontaktverlauf</h4>
              <div className="contact-history">
                {selectedCase.contactHistory.map((contact, index) => (
                  <div key={index} className="contact-entry">
                    <div className="contact-date">{contact.date}</div>
                    <div className="contact-location">{contact.location}</div>
                    <div className="contact-duration">{contact.duration}</div>
                    <div className={`contact-risk ${getRiskColor(contact.risk)}`}>
                      {contact.risk}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h4>Angeordnete Maßnahmen</h4>
              <div className="measures-list">
                {selectedCase.measures && selectedCase.measures.length > 0 ? (
                  selectedCase.measures.map((measure, index) => (
                    <div key={index} className="measure-item">
                      <div className="measure-header">
                        <span className={`measure-type ${getMeasureStatusColor(measure.status)}`}>
                          {measure.type}
                        </span>
                        <span className="measure-date">{measure.date}</span>
                      </div>
                      <div className="measure-details">
                        {measure.duration && <span>Dauer: {measure.duration}</span>}
                        {measure.result && <span>Ergebnis: {measure.result}</span>}
                        {measure.contacts && <span>Kontakte: {measure.contacts}</span>}
                        <span className={`measure-status ${getMeasureStatusColor(measure.status)}`}>
                          {measure.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-measures">Noch keine Maßnahmen angeordnet</p>
                )}
              </div>
            </div>

            <div className="detail-section">
              <h4>Notizen</h4>
              <p>{selectedCase.notes}</p>
            </div>

            <div className="detail-actions">
              <button 
                className="btn-primary"
                onClick={() => handleEditCase(selectedCase)}
              >
                Fall bearbeiten
              </button>
              <button 
                className="btn-secondary"
                onClick={() => handleOpenMeasures(selectedCase)}
              >
                Maßnahmen anordnen
              </button>
              <button className="btn-secondary">
                Kontakte verfolgen
              </button>
            </div>
          </div>
        )}

        {/* Bearbeitungsmodus */}
        {editingCase && (
          <div className="edit-case-form">
            <h3>Fall bearbeiten: {editingCase.name}</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={editingCase.name}
                    onChange={(e) => setEditingCase({...editingCase, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Status:</label>
                  <select
                    value={editingCase.status}
                    onChange={(e) => setEditingCase({...editingCase, status: e.target.value})}
                  >
                    <option value="Aktiv">Aktiv</option>
                    <option value="Genesen">Genesen</option>
                    <option value="Quarantäne">Quarantäne</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Notizen:</label>
                <textarea
                  value={editingCase.notes}
                  onChange={(e) => setEditingCase({...editingCase, notes: e.target.value})}
                  rows="4"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="save-btn">Speichern</button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={handleCancelEdit}
                >
                  Abbrechen
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Maßnahmen Modal */}
      {showMeasuresModal && selectedCaseForMeasures && (
        <div className="modal-overlay">
          <div className="measures-modal">
            <div className="modal-header">
              <h3>Maßnahmen anordnen: {selectedCaseForMeasures.name}</h3>
              <button 
                className="close-btn"
                onClick={handleCloseMeasuresModal}
              >
                ✕
              </button>
            </div>

            <div className="modal-content">
              {/* Intelligente Empfehlungen */}
              <div className="recommendations-section">
                <h4>🤖 KI-Empfehlungen</h4>
                <div className="recommendations-list">
                  {generateRecommendations(selectedCaseForMeasures).map((rec, index) => (
                    <div key={index} className={`recommendation-card ${getPriorityColor(rec.priority)}`}>
                      <div className="recommendation-header">
                        <div className="recommendation-type">
                          <span className={`priority-badge ${getPriorityColor(rec.priority)}`}>
                            {rec.priority}
                          </span>
                          <span className={`urgency-badge ${getUrgencyColor(rec.urgency)}`}>
                            {rec.urgency}
                          </span>
                        </div>
                        <div className="recommendation-category">
                          {rec.category}
                        </div>
                      </div>
                      <div className="recommendation-content">
                        <h5>{rec.type}</h5>
                        <p>{rec.reason}</p>
                        {rec.suggestedMeasures && (
                          <div className="suggested-measures">
                            <strong>Empfohlene Maßnahmen:</strong>
                            <ul>
                              {rec.suggestedMeasures.map((measure, idx) => (
                                <li key={idx}>{measure}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="current-measures">
                <h4>Aktuelle Maßnahmen</h4>
                {selectedCaseForMeasures.measures && selectedCaseForMeasures.measures.length > 0 ? (
                  <div className="measures-grid">
                    {selectedCaseForMeasures.measures.map((measure, index) => (
                      <div key={index} className="measure-card">
                        <div className="measure-type-badge">
                          {measure.type}
                        </div>
                        <div className="measure-info">
                          <p><strong>Datum:</strong> {measure.date}</p>
                          {measure.duration && <p><strong>Dauer:</strong> {measure.duration}</p>}
                          {measure.result && <p><strong>Ergebnis:</strong> {measure.result}</p>}
                          <p><strong>Status:</strong> 
                            <span className={`measure-status ${getMeasureStatusColor(measure.status)}`}>
                              {measure.status}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Noch keine Maßnahmen angeordnet</p>
                )}
              </div>

              <div className="new-measure-form">
                <h4>Neue Maßnahme anordnen</h4>
                <form onSubmit={handleAddMeasure}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Maßnahmentyp:</label>
                      <select
                        value={newMeasure.type}
                        onChange={(e) => setNewMeasure({...newMeasure, type: e.target.value})}
                        required
                      >
                        <option value="">Bitte wählen</option>
                        <option value="Quarantäne">Quarantäne</option>
                        <option value="PCR-Test">PCR-Test</option>
                        <option value="Schnelltest">Schnelltest</option>
                        <option value="Antikörper-Test">Antikörper-Test</option>
                        <option value="Kontaktverfolgung">Kontaktverfolgung</option>
                        <option value="Impfung">Impfung</option>
                        <option value="Arztbesuch">Arztbesuch</option>
                        <option value="Krankenhausaufenthalt">Krankenhausaufenthalt</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Datum:</label>
                      <input
                        type="date"
                        value={newMeasure.date}
                        onChange={(e) => setNewMeasure({...newMeasure, date: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Dauer (optional):</label>
                      <input
                        type="text"
                        value={newMeasure.duration}
                        onChange={(e) => setNewMeasure({...newMeasure, duration: e.target.value})}
                        placeholder="z.B. 14 Tage, 2 Wochen"
                      />
                    </div>
                    <div className="form-group">
                      <label>Notizen:</label>
                      <input
                        type="text"
                        value={newMeasure.notes}
                        onChange={(e) => setNewMeasure({...newMeasure, notes: e.target.value})}
                        placeholder="Zusätzliche Informationen"
                      />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="save-btn">Maßnahme anordnen</button>
                    <button 
                      type="button" 
                      className="cancel-btn"
                      onClick={handleCloseMeasuresModal}
                    >
                      Schließen
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CasesPage;
