import React, { useState, useEffect } from 'react';
import './StatisticsPage.css';

const StatisticsPage = () => {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('30d');
  const [exportFormat, setExportFormat] = useState('pdf');

  const [detailedStats, setDetailedStats] = useState({
    caseTrends: [],
    contactAnalysis: [],
    measureEffectiveness: [],
    regionalComparison: [],
    demographicData: [],
    regionalRecommendations: []
  });

  useEffect(() => {
    loadDetailedStatistics();
  }, [dateRange]);

  const loadDetailedStatistics = () => {
    // Erweiterte Statistik-Daten
    setDetailedStats({
      caseTrends: [
        { week: 'KW 1', newCases: 45, recovered: 12, deaths: 0, avgContacts: 8.2 },
        { week: 'KW 2', newCases: 67, recovered: 28, deaths: 1, avgContacts: 9.1 },
        { week: 'KW 3', newCases: 89, recovered: 45, deaths: 2, avgContacts: 7.8 },
        { week: 'KW 4', newCases: 112, recovered: 67, deaths: 1, avgContacts: 8.9 },
        { week: 'KW 5', newCases: 134, recovered: 89, deaths: 3, avgContacts: 9.5 },
        { week: 'KW 6', newCases: 156, recovered: 112, deaths: 2, avgContacts: 8.7 }
      ],
      contactAnalysis: [
        { riskLevel: 'Hoch', count: 234, avgDuration: '2.3h', transmissionRate: '15.2%' },
        { riskLevel: 'Mittel', count: 445, avgDuration: '45min', transmissionRate: '8.7%' },
        { riskLevel: 'Niedrig', count: 213, avgDuration: '15min', transmissionRate: '2.1%' }
      ],
      measureEffectiveness: [
        { measure: 'Quarantäne', effectiveness: '94.2%', compliance: '87.5%', avgDuration: '12.3 Tage' },
        { measure: 'Kontaktverfolgung', effectiveness: '78.9%', compliance: '92.1%', avgDuration: '3.2 Tage' },
        { measure: 'PCR-Test', effectiveness: '99.1%', compliance: '95.8%', avgDuration: '1.5 Tage' },
        { measure: 'Schnelltest', effectiveness: '85.3%', compliance: '98.2%', avgDuration: '0.5 Tage' },
        { measure: 'Impfung', effectiveness: '91.7%', compliance: '76.4%', avgDuration: 'N/A' }
      ],
      regionalComparison: [
        { region: 'Berlin', cases: 45, population: 3669491, incidence: 12.3, measures: 23 },
        { region: 'Hamburg', cases: 32, population: 1841179, incidence: 17.4, measures: 18 },
        { region: 'München', cases: 38, population: 1488202, incidence: 25.5, measures: 22 },
        { region: 'Köln', cases: 28, population: 1085664, incidence: 25.8, measures: 15 },
        { region: 'Frankfurt', cases: 25, population: 753056, incidence: 33.2, measures: 12 },
        { region: 'Stuttgart', cases: 18, population: 632743, incidence: 28.5, measures: 10 }
      ],
      demographicData: [
        { ageGroup: '0-17', cases: 12, hospitalizations: 1, icu: 0, mortality: 0 },
        { ageGroup: '18-29', cases: 34, hospitalizations: 2, icu: 0, mortality: 0 },
        { ageGroup: '30-39', cases: 42, hospitalizations: 5, icu: 1, mortality: 0 },
        { ageGroup: '40-49', cases: 38, hospitalizations: 8, icu: 2, mortality: 1 },
        { ageGroup: '50-59', cases: 20, hospitalizations: 6, icu: 3, mortality: 1 },
        { ageGroup: '60+', cases: 10, hospitalizations: 8, icu: 5, mortality: 3 }
      ],
      regionalRecommendations: [
        {
          region: 'Frankfurt',
          priority: 'Kritisch',
          trigger: 'Inzidenz über 100/100.000',
          currentIncidence: 33.2,
          threshold: 100,
          recommendations: [
            'Lockdown für nicht-essentielle Geschäfte',
            'Ausgangsbeschränkungen',
            'Homeoffice-Pflicht',
            'Kontaktverbot',
            'Schulschließungen'
          ],
          urgency: 'Sofort',
          category: 'Regionale Maßnahmen'
        },
        {
          region: 'München',
          priority: 'Hoch',
          trigger: 'Krankenhauskapazität über 90%',
          currentCapacity: 78,
          threshold: 90,
          recommendations: [
            'Notfallplan aktivieren',
            'Elektive Eingriffe verschieben',
            'Intensivbetten aufstocken',
            'Patienten in andere Regionen verlegen'
          ],
          urgency: 'Innerhalb 48h',
          category: 'Systemisch'
        },
        {
          region: 'Berlin',
          priority: 'Mittel',
          trigger: 'Impfrate unter 80%',
          currentRate: 78.5,
          threshold: 80,
          recommendations: [
            'Mobile Impfteams',
            'Impfzentren erweitern',
            'Aufklärungskampagnen',
            'Anreize für Impfung'
          ],
          urgency: 'Innerhalb 1 Woche',
          category: 'Präventiv'
        },
        {
          region: 'Hamburg',
          priority: 'Niedrig',
          trigger: 'Cluster-Erkennung',
          clusterSize: 8,
          threshold: 5,
          recommendations: [
            'Cluster-Untersuchung',
            'Erweiterte Kontaktverfolgung',
            'Zielgerichtete Tests',
            'Lokale Maßnahmen'
          ],
          urgency: 'Innerhalb 24h',
          category: 'Epidemiologisch'
        }
      ]
    });
  };

  const handleExport = () => {
    // Simulierte Export-Funktion
    alert(`Bericht wird als ${exportFormat.toUpperCase()} exportiert...`);
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

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'overview':
        return (
          <div className="report-content">
            <h3>📊 Übersichtsbericht</h3>
            <div className="overview-grid">
              <div className="overview-card">
                <h4>Fallentwicklung</h4>
                <div className="trend-chart">
                  {detailedStats.caseTrends.map((week, index) => (
                    <div key={index} className="trend-bar">
                      <div className="bar-label">{week.week}</div>
                      <div className="bar-group">
                        <div className="bar new" style={{ height: `${week.newCases * 2}px` }} title={`Neue Fälle: ${week.newCases}`} />
                        <div className="bar recovered" style={{ height: `${week.recovered * 2}px` }} title={`Genesene: ${week.recovered}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="overview-card">
                <h4>Kontaktanalyse</h4>
                <div className="contact-analysis">
                  {detailedStats.contactAnalysis.map((contact, index) => (
                    <div key={index} className="contact-risk-item">
                      <div className="risk-header">
                        <span className={`risk-badge ${contact.riskLevel.toLowerCase()}`}>
                          {contact.riskLevel}
                        </span>
                        <span className="contact-count">{contact.count} Kontakte</span>
                      </div>
                      <div className="contact-details">
                        <span>Ø Dauer: {contact.avgDuration}</span>
                        <span>Übertragungsrate: {contact.transmissionRate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'measures':
        return (
          <div className="report-content">
            <h3>🛡️ Maßnahmen-Effektivität</h3>
            <div className="measures-analysis">
              <table className="measures-table">
                <thead>
                  <tr>
                    <th>Maßnahme</th>
                    <th>Effektivität</th>
                    <th>Compliance</th>
                    <th>Ø Dauer</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {detailedStats.measureEffectiveness.map((measure, index) => (
                    <tr key={index}>
                      <td>{measure.measure}</td>
                      <td>
                        <div className="effectiveness-bar">
                          <div 
                            className="effectiveness-fill" 
                            style={{ width: measure.effectiveness }}
                          />
                          <span>{measure.effectiveness}</span>
                        </div>
                      </td>
                      <td>
                        <div className="compliance-bar">
                          <div 
                            className="compliance-fill" 
                            style={{ width: measure.compliance }}
                          />
                          <span>{measure.compliance}</span>
                        </div>
                      </td>
                      <td>{measure.avgDuration}</td>
                      <td>
                        <span className={`status-badge ${measure.effectiveness > '90%' ? 'excellent' : measure.effectiveness > '80%' ? 'good' : 'needs-improvement'}`}>
                          {measure.effectiveness > '90%' ? 'Exzellent' : measure.effectiveness > '80%' ? 'Gut' : 'Verbesserung nötig'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'regional':
        return (
          <div className="report-content">
            <h3>🏥 Regionale Analyse</h3>
            <div className="regional-analysis">
              <div className="regional-map">
                <div className="map-placeholder">
                  <h4>Interaktive Karte</h4>
                  <p>Hier würde eine interaktive Deutschlandkarte mit regionalen Daten angezeigt werden.</p>
                </div>
              </div>
              
              <div className="regional-table">
                <table>
                  <thead>
                    <tr>
                      <th>Region</th>
                      <th>Fälle</th>
                      <th>Bevölkerung</th>
                      <th>Inzidenz/100k</th>
                      <th>Maßnahmen</th>
                      <th>Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailedStats.regionalComparison.map((region, index) => (
                      <tr key={index}>
                        <td>{region.region}</td>
                        <td>{region.cases}</td>
                        <td>{region.population.toLocaleString()}</td>
                        <td>{region.incidence}</td>
                        <td>{region.measures}</td>
                        <td>
                          <span className={`trend-indicator ${region.incidence > 25 ? 'high' : region.incidence > 15 ? 'medium' : 'low'}`}>
                            {region.incidence > 25 ? '📈' : region.incidence > 15 ? '➡️' : '📉'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'demographics':
        return (
          <div className="report-content">
            <h3>👥 Demographische Analyse</h3>
            <div className="demographics-analysis">
              <div className="age-distribution">
                <h4>Altersverteilung der Fälle</h4>
                <div className="age-chart">
                  {detailedStats.demographicData.map((age, index) => (
                    <div key={index} className="age-group">
                      <div className="age-label">{age.ageGroup}</div>
                      <div className="age-bars">
                        <div className="age-bar cases" style={{ height: `${age.cases * 3}px` }} title={`Fälle: ${age.cases}`} />
                        <div className="age-bar hospital" style={{ height: `${age.hospitalizations * 3}px` }} title={`Hospitalisierungen: ${age.hospitalizations}`} />
                        <div className="age-bar icu" style={{ height: `${age.icu * 3}px` }} title={`Intensiv: ${age.icu}`} />
                      </div>
                      <div className="age-stats">
                        <span>Fälle: {age.cases}</span>
                        <span>ICU: {age.icu}</span>
                        <span>Todesfälle: {age.mortality}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'recommendations':
        return (
          <div className="report-content">
            <h3>🤖 Intelligente Maßnahmen-Empfehlungen</h3>
            <div className="recommendations-analysis">
              <div className="recommendations-header">
                <h4>Automatische Auslöser & Empfehlungen</h4>
                <p>Das System überwacht kontinuierlich verschiedene Parameter und generiert automatisch Empfehlungen basierend auf definierten Schwellenwerten.</p>
              </div>
              
              <div className="recommendations-grid">
                {detailedStats.regionalRecommendations.map((rec, index) => (
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
                      <h5>{rec.region}</h5>
                      <div className="trigger-info">
                        <strong>Auslöser:</strong> {rec.trigger}
                        <div className="trigger-details">
                          <span>Aktueller Wert: {rec.currentIncidence || rec.currentCapacity || rec.currentRate || rec.clusterSize}</span>
                          <span>Schwellenwert: {rec.threshold}</span>
                        </div>
                      </div>
                      
                      <div className="suggested-measures">
                        <strong>Empfohlene Maßnahmen:</strong>
                        <ul>
                          {rec.recommendations.map((measure, idx) => (
                            <li key={idx}>{measure}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="thresholds-section">
                <h4>📋 Definierte Schwellenwerte</h4>
                <div className="thresholds-grid">
                  <div className="threshold-card">
                    <h5>Inzidenz-basierte Maßnahmen</h5>
                    <ul>
                      <li><strong>50/100.000:</strong> Maskenpflicht, Kontaktbeschränkungen</li>
                      <li><strong>100/100.000:</strong> Lockdown, Ausgangsbeschränkungen</li>
                      <li><strong>200/100.000:</strong> Notfallmaßnahmen, Ausgangssperre</li>
                    </ul>
                  </div>
                  
                  <div className="threshold-card">
                    <h5>Krankenhauskapazität</h5>
                    <ul>
                      <li><strong>80%:</strong> Warnung, Planung verstärken</li>
                      <li><strong>90%:</strong> Notfallplan aktivieren</li>
                      <li><strong>95%:</strong> Krisenmodus, Triage-Regeln</li>
                    </ul>
                  </div>
                  
                  <div className="threshold-card">
                    <h5>Impfrate</h5>
                    <ul>
                      <li><strong>70%:</strong> Impfkampagne verstärken</li>
                      <li><strong>80%:</strong> Zielgruppen-spezifische Maßnahmen</li>
                      <li><strong>90%:</strong> Herdenimmunität erreicht</li>
                    </ul>
                  </div>
                  
                  <div className="threshold-card">
                    <h5>Cluster-Erkennung</h5>
                    <ul>
                      <li><strong>5 Fälle:</strong> Cluster-Untersuchung</li>
                      <li><strong>10 Fälle:</strong> Erweiterte Maßnahmen</li>
                      <li><strong>20 Fälle:</strong> Lokaler Lockdown</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Bericht nicht gefunden</div>;
    }
  };

  return (
    <div className="statistics-page">
      <div className="page-header">
        <h2>📈 Erweiterte Statistiken & Berichte</h2>
        <div className="header-controls">
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="date-range-select"
          >
            <option value="7d">Letzte 7 Tage</option>
            <option value="30d">Letzte 30 Tage</option>
            <option value="90d">Letzte 90 Tage</option>
            <option value="1y">Letztes Jahr</option>
          </select>
          <select 
            value={exportFormat} 
            onChange={(e) => setExportFormat(e.target.value)}
            className="export-format-select"
          >
            <option value="pdf">PDF Export</option>
            <option value="excel">Excel Export</option>
            <option value="csv">CSV Export</option>
          </select>
          <button onClick={handleExport} className="export-btn">
            📄 Exportieren
          </button>
        </div>
      </div>

      <div className="report-navigation">
        <button 
          className={`report-nav-btn ${selectedReport === 'overview' ? 'active' : ''}`}
          onClick={() => setSelectedReport('overview')}
        >
          📊 Übersicht
        </button>
        <button 
          className={`report-nav-btn ${selectedReport === 'measures' ? 'active' : ''}`}
          onClick={() => setSelectedReport('measures')}
        >
          🛡️ Maßnahmen
        </button>
        <button 
          className={`report-nav-btn ${selectedReport === 'regional' ? 'active' : ''}`}
          onClick={() => setSelectedReport('regional')}
        >
          🏥 Regional
        </button>
        <button 
          className={`report-nav-btn ${selectedReport === 'demographics' ? 'active' : ''}`}
          onClick={() => setSelectedReport('demographics')}
        >
          👥 Demographie
        </button>
        <button 
          className={`report-nav-btn ${selectedReport === 'recommendations' ? 'active' : ''}`}
          onClick={() => setSelectedReport('recommendations')}
        >
          🤖 Empfehlungen
        </button>
      </div>

      <div className="report-container">
        {renderReportContent()}
      </div>

      <div className="report-footer">
        <div className="report-info">
          <p><strong>Bericht generiert:</strong> {new Date().toLocaleString('de-DE')}</p>
          <p><strong>Zeitraum:</strong> {dateRange === '7d' ? 'Letzte 7 Tage' : dateRange === '30d' ? 'Letzte 30 Tage' : dateRange === '90d' ? 'Letzte 90 Tage' : 'Letztes Jahr'}</p>
          <p><strong>Datenquelle:</strong> Infection Management System</p>
        </div>
        <div className="report-actions">
          <button className="btn-secondary">Drucken</button>
          <button className="btn-primary">Als PDF speichern</button>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage; 