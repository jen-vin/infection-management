import React, { useState } from 'react';
import './ContactsPage.css';

const ContactsPage = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Lisa Weber',
      relation: 'Kollege',
      contactDate: '2024-01-14',
      riskLevel: 'Hoch',
      status: 'Quarantäne',
      sourceCase: 'Max Mustermann',
      phone: '+49 30 98765432',
      email: 'lisa.weber@email.com',
      contactDuration: '8 Stunden',
      contactLocation: 'Büro - Schreibtisch nebeneinander',
      symptoms: 'Keine',
      testStatus: 'Ausstehend',
      notificationSent: true,
      notificationDate: '2024-01-15 09:30'
    },
    {
      id: 2,
      name: 'Tom Fischer',
      relation: 'Familienmitglied',
      contactDate: '2024-01-13',
      riskLevel: 'Mittel',
      status: 'Überwachung',
      sourceCase: 'Max Mustermann',
      phone: '+49 30 11223344',
      email: 'tom.fischer@email.com',
      contactDuration: '24 Stunden',
      contactLocation: 'Gemeinsame Wohnung',
      symptoms: 'Leichte Müdigkeit',
      testStatus: 'Negativ',
      notificationSent: true,
      notificationDate: '2024-01-14 14:15'
    },
    {
      id: 3,
      name: 'Sarah Klein',
      relation: 'Nachbar',
      contactDate: '2024-01-12',
      riskLevel: 'Niedrig',
      status: 'Informiert',
      sourceCase: 'Anna Schmidt',
      phone: '+49 40 55667788',
      email: 'sarah.klein@email.com',
      contactDuration: '15 Minuten',
      contactLocation: 'Hausflur - kurzer Austausch',
      symptoms: 'Keine',
      testStatus: 'Nicht erforderlich',
      notificationSent: true,
      notificationDate: '2024-01-13 10:45'
    }
  ]);

  const [selectedContact, setSelectedContact] = useState(null);
  const [editingContact, setEditingContact] = useState(null);

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'Hoch': return 'risk-high';
      case 'Mittel': return 'risk-medium';
      case 'Niedrig': return 'risk-low';
      default: return '';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Quarantäne': return 'status-quarantine';
      case 'Überwachung': return 'status-monitoring';
      case 'Informiert': return 'status-informed';
      default: return '';
    }
  };

  const getTestStatusColor = (testStatus) => {
    switch (testStatus) {
      case 'Positiv': return 'test-positive';
      case 'Negativ': return 'test-negative';
      case 'Ausstehend': return 'test-pending';
      case 'Nicht erforderlich': return 'test-not-required';
      default: return '';
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact({ ...contact });
    setSelectedContact(null);
  };

  const handleSaveEdit = () => {
    setContacts(contacts.map(c => c.id === editingContact.id ? editingContact : c));
    setEditingContact(null);
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
  };

  const handleStatusChange = (contactId, newStatus) => {
    setContacts(contacts.map(c => 
      c.id === contactId ? { ...c, status: newStatus } : c
    ));
  };

  return (
    <div className="contacts-page">
      <div className="page-header">
        <h2>Kontaktverfolgung</h2>
        <div className="header-stats">
          <span>Gesamt: {contacts.length}</span>
          <span>In Quarantäne: {contacts.filter(c => c.status === 'Quarantäne').length}</span>
          <span>Hochrisiko: {contacts.filter(c => c.riskLevel === 'Hoch').length}</span>
        </div>
      </div>

      <div className="info-box">
        <h3>🔍 Wie funktioniert die automatische Kontaktverfolgung?</h3>
        <p>
          Das System identifiziert Kontaktpersonen automatisch durch verschiedene Methoden:
        </p>
        <ul>
          <li><strong>Corona-Warn-App Integration:</strong> Bluetooth-basierte Kontakterkennung über 15 Minuten in 2m Abstand</li>
          <li><strong>Lokationsdaten:</strong> GPS-Tracking von Aufenthaltsorten und Zeiträumen</li>
          <li><strong>QR-Code Check-ins:</strong> Automatische Registrierung in Restaurants, Geschäften, etc.</li>
          <li><strong>Manuelle Angaben:</strong> Vom Infizierten gemeldete Kontakte und Aufenthaltsorte</li>
        </ul>
        <p>
          <em>Die Kontaktnummer in der Fallverwaltung zeigt die automatisch identifizierten Personen an. 
          Das System warnt Kontaktpersonen automatisch und ordnet bei Bedarf Quarantäne an.</em>
        </p>
      </div>

      <div className="contacts-content">
        <div className="contacts-list">
          <h3>Kontaktpersonen</h3>
          <div className="contacts-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Beziehung</th>
                  <th>Kontaktdatum</th>
                  <th>Risiko</th>
                  <th>Status</th>
                  <th>Test</th>
                  <th>Quellfall</th>
                  <th>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(contact => (
                  <tr 
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={selectedContact?.id === contact.id ? 'selected' : ''}
                  >
                    <td>{contact.name}</td>
                    <td>{contact.relation}</td>
                    <td>{contact.contactDate}</td>
                    <td>
                      <span className={`risk-level ${getRiskColor(contact.riskLevel)}`}>
                        {contact.riskLevel}
                      </span>
                    </td>
                    <td>
                      <span className={`status ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                    </td>
                    <td>
                      <span className={`test-status ${getTestStatusColor(contact.testStatus)}`}>
                        {contact.testStatus}
                      </span>
                    </td>
                    <td>{contact.sourceCase}</td>
                    <td>
                      <button className="action-btn">Details</button>
                      <button 
                        className="action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditContact(contact);
                        }}
                      >
                        Bearbeiten
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedContact && (
          <div className="contact-details">
            <div className="details-header">
              <h3>Details: {selectedContact.name}</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedContact(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="details-grid">
              <div className="detail-section">
                <h4>Persönliche Daten</h4>
                <div className="detail-item">
                  <label>Name:</label>
                  <span>{selectedContact.name}</span>
                </div>
                <div className="detail-item">
                  <label>Beziehung:</label>
                  <span>{selectedContact.relation}</span>
                </div>
                <div className="detail-item">
                  <label>Telefon:</label>
                  <span>{selectedContact.phone}</span>
                </div>
                <div className="detail-item">
                  <label>E-Mail:</label>
                  <span>{selectedContact.email}</span>
                </div>
              </div>

              <div className="detail-section">
                <h4>Kontakt-Informationen</h4>
                <div className="detail-item">
                  <label>Kontaktdatum:</label>
                  <span>{selectedContact.contactDate}</span>
                </div>
                <div className="detail-item">
                  <label>Dauer:</label>
                  <span>{selectedContact.contactDuration}</span>
                </div>
                <div className="detail-item">
                  <label>Ort:</label>
                  <span>{selectedContact.contactLocation}</span>
                </div>
                <div className="detail-item">
                  <label>Quellfall:</label>
                  <span>{selectedContact.sourceCase}</span>
                </div>
              </div>
            </div>

            <div className="details-grid">
              <div className="detail-section">
                <h4>Gesundheitsstatus</h4>
                <div className="detail-item">
                  <label>Risikolevel:</label>
                  <span className={`risk-level ${getRiskColor(selectedContact.riskLevel)}`}>
                    {selectedContact.riskLevel}
                  </span>
                </div>
                <div className="detail-item">
                  <label>Status:</label>
                  <span className={`status ${getStatusColor(selectedContact.status)}`}>
                    {selectedContact.status}
                  </span>
                </div>
                <div className="detail-item">
                  <label>Symptome:</label>
                  <span>{selectedContact.symptoms}</span>
                </div>
                <div className="detail-item">
                  <label>Teststatus:</label>
                  <span className={`test-status ${getTestStatusColor(selectedContact.testStatus)}`}>
                    {selectedContact.testStatus}
                  </span>
                </div>
              </div>

              <div className="detail-section">
                <h4>Benachrichtigung</h4>
                <div className="detail-item">
                  <label>Benachrichtigung gesendet:</label>
                  <span className={selectedContact.notificationSent ? 'notification-sent' : 'notification-pending'}>
                    {selectedContact.notificationSent ? '✓ Ja' : '✗ Nein'}
                  </span>
                </div>
                {selectedContact.notificationSent && (
                  <div className="detail-item">
                    <label>Gesendet am:</label>
                    <span>{selectedContact.notificationDate}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="contact-actions">
              <div className="status-actions">
                <h4>Status ändern:</h4>
                <div className="status-buttons">
                  <button 
                    className={`status-btn ${selectedContact.status === 'Quarantäne' ? 'active' : ''}`}
                    onClick={() => handleStatusChange(selectedContact.id, 'Quarantäne')}
                  >
                    Quarantäne
                  </button>
                  <button 
                    className={`status-btn ${selectedContact.status === 'Überwachung' ? 'active' : ''}`}
                    onClick={() => handleStatusChange(selectedContact.id, 'Überwachung')}
                  >
                    Überwachung
                  </button>
                  <button 
                    className={`status-btn ${selectedContact.status === 'Informiert' ? 'active' : ''}`}
                    onClick={() => handleStatusChange(selectedContact.id, 'Informiert')}
                  >
                    Informiert
                  </button>
                </div>
              </div>
              
              <div className="action-buttons">
                <button className="btn-primary">Test anordnen</button>
                <button className="btn-secondary">Kontakt aufnehmen</button>
                <button 
                  className="btn-secondary"
                  onClick={() => handleEditContact(selectedContact)}
                >
                  Bearbeiten
                </button>
              </div>
            </div>
          </div>
        )}

        {editingContact && (
          <div className="edit-contact-form">
            <h3>Kontakt bearbeiten: {editingContact.name}</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={editingContact.name}
                    onChange={(e) => setEditingContact({...editingContact, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Risikolevel:</label>
                  <select
                    value={editingContact.riskLevel}
                    onChange={(e) => setEditingContact({...editingContact, riskLevel: e.target.value})}
                  >
                    <option value="Hoch">Hoch</option>
                    <option value="Mittel">Mittel</option>
                    <option value="Niedrig">Niedrig</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Status:</label>
                  <select
                    value={editingContact.status}
                    onChange={(e) => setEditingContact({...editingContact, status: e.target.value})}
                  >
                    <option value="Quarantäne">Quarantäne</option>
                    <option value="Überwachung">Überwachung</option>
                    <option value="Informiert">Informiert</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Teststatus:</label>
                  <select
                    value={editingContact.testStatus}
                    onChange={(e) => setEditingContact({...editingContact, testStatus: e.target.value})}
                  >
                    <option value="Ausstehend">Ausstehend</option>
                    <option value="Positiv">Positiv</option>
                    <option value="Negativ">Negativ</option>
                    <option value="Nicht erforderlich">Nicht erforderlich</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Symptome:</label>
                <input
                  type="text"
                  value={editingContact.symptoms}
                  onChange={(e) => setEditingContact({...editingContact, symptoms: e.target.value})}
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

      <div className="contact-network">
        <h3>Kontaktnetzwerk</h3>
        <div className="network-visualization">
          <div className="network-node primary">
            <span>Max Mustermann</span>
            <small>Indexfall</small>
          </div>
          <div className="network-connections">
            <div className="connection-line high-risk"></div>
            <div className="connection-line medium-risk"></div>
          </div>
          <div className="network-nodes">
            <div className="network-node contact high-risk">
              <span>Lisa Weber</span>
              <small>Hochrisiko</small>
            </div>
            <div className="network-node contact medium-risk">
              <span>Tom Fischer</span>
              <small>Mittelrisiko</small>
            </div>
          </div>
        </div>
        <div className="network-legend">
          <div className="legend-item">
            <span className="legend-color high-risk"></span>
            <span>Hochrisiko (≥15min, &lt;2m)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color medium-risk"></span>
            <span>Mittelrisiko (≥15min, 2-5m)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color low-risk"></span>
            <span>Niedrigrisiko (&lt;15min oder &gt;5m)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
