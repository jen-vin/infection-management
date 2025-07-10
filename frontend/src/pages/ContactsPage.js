import React, { useState } from 'react';
import './ContactsPage.css';
import { fetchReportsByUserId } from '../services/api';


const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);

  const [selectedContact, setSelectedContact] = useState(null);
  const [editingContact, setEditingContact] = useState(null);
  const [searchID, setSearchID] = useState('');

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
  const getRiskColorByInt = (risk) => {
    switch (risk) {
      case 3: return 'risk-high';
      case 2: return 'risk-medium';
      case 1: return 'risk-low';
      default: return '';
    }
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

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const data = await fetchReportsByUserId(searchID.trim());
            setContacts(data);
          } catch (err) {
            console.error("Fehler beim Laden der Berichte:", err);
          }
        }}
      >
        <input
          type="text"
          placeholder="Suche nach App-ID"
          value={searchID}
          onChange={(e) => setSearchID(e.target.value)}
          style={{ padding: '0.5rem', margin: '1rem 0', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit">Suchen</button>
      </form>



      <div className="info-box">
        <h3>🔍 Wie funktioniert die automatische Kontaktverfolgung?</h3>
        <p>
          Das System identifiziert Kontaktpersonen automatisch durch verschiedene Methoden:
        </p>
        <ul>
          <li><strong>Infektions-Warn-App Integration:</strong> Bluetooth-basierte Kontakterkennung über 15 Minuten in 2m Abstand</li>
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
          <h3>Kontaktberichte</h3>
          <div className="contacts-table">
            {contacts.length === 0 ? (
              <p>Keine Kontakte gefunden.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Kontakt 1 (App-ID)</th>
                    <th>Kontakt 2 (App-ID)</th>
                    <th>Region</th>
                    <th>Datum</th>
                    <th>Risiko</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((report) => (
                    <tr key={report.id}>
                      <td>{report.id}</td>
                      <td>{report.contact_1_id}</td>
                      <td>{report.contact_2_id}</td>
                      <td>{report.region}</td>
                      <td>{report.contact_date}</td>
                      <td>
                        <span className={`risk-level ${getRiskColorByInt(report.risk)}`}>
                          {report.risk === 3
                            ? "Hoch"
                            : report.risk === 2
                            ? "Mittel"
                            : "Niedrig"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
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
