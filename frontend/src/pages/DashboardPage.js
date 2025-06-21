import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DashboardPage.css';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalCases: 0,
    activeCases: 0,
    recoveredCases: 0,
    quarantineCases: 0,
    totalContacts: 0,
    highRiskContacts: 0,
    testsConducted: 0,
    positiveTests: 0,
    measuresOrdered: 0,
    activeMeasures: 0
  });

  const [timeData, setTimeData] = useState({
    dailyCases: [],
    weeklyTrends: [],
    regionalData: [],
    ageDistribution: [],
    measureTypes: []
  });

  const [recommendations, setRecommendations] = useState([]);

  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [selectedRegion, setSelectedRegion] = useState('all');

  useEffect(() => {
    // Simulierte Daten laden
    loadStatistics();
  }, []);

  const loadStatistics = () => {
    // Simulierte Statistik-Daten
    setStats({
      totalCases: 156,
      activeCases: 23,
      recoveredCases: 128,
      quarantineCases: 15,
      totalContacts: 892,
      highRiskContacts: 234,
      testsConducted: 1247,
      positiveTests: 156,
      measuresOrdered: 342,
      activeMeasures: 89
    });

    // Zeitreihen-Daten
    setTimeData({
      dailyCases: [
        { date: '2024-01-01', cases: 5, contacts: 28 },
        { date: '2024-01-02', cases: 8, contacts: 45 },
        { date: '2024-01-03', cases: 12, contacts: 67 },
        { date: '2024-01-04', cases: 15, contacts: 89 },
        { date: '2024-01-05', cases: 18, contacts: 112 },
        { date: '2024-01-06', cases: 22, contacts: 134 },
        { date: '2024-01-07', cases: 25, contacts: 156 },
        { date: '2024-01-08', cases: 28, contacts: 178 },
        { date: '2024-01-09', cases: 31, contacts: 201 },
        { date: '2024-01-10', cases: 35, contacts: 223 },
        { date: '2024-01-11', cases: 38, contacts: 245 },
        { date: '2024-01-12', cases: 42, contacts: 267 },
        { date: '2024-01-13', cases: 45, contacts: 289 },
        { date: '2024-01-14', cases: 48, contacts: 312 }
      ],
      weeklyTrends: [
        { week: 'KW 1', cases: 45, recovered: 12, active: 33 },
        { week: 'KW 2', cases: 67, recovered: 28, active: 72 },
        { week: 'KW 3', cases: 89, recovered: 45, active: 116 },
        { week: 'KW 4', cases: 112, recovered: 67, active: 161 },
        { week: 'KW 5', cases: 134, recovered: 89, active: 206 },
        { week: 'KW 6', cases: 156, recovered: 112, active: 250 }
      ],
      regionalData: [
        { region: 'Berlin', cases: 45, contacts: 234, active: 8 },
        { region: 'Hamburg', cases: 32, contacts: 167, active: 5 },
        { region: 'München', cases: 38, contacts: 198, active: 6 },
        { region: 'Köln', cases: 28, contacts: 145, active: 3 },
        { region: 'Frankfurt', cases: 25, contacts: 132, active: 2 },
        { region: 'Stuttgart', cases: 18, contacts: 98, active: 1 }
      ],
      ageDistribution: [
        { ageGroup: '0-17', cases: 12, percentage: 7.7 },
        { ageGroup: '18-29', cases: 34, percentage: 21.8 },
        { ageGroup: '30-39', cases: 42, percentage: 26.9 },
        { ageGroup: '40-49', cases: 38, percentage: 24.4 },
        { ageGroup: '50-59', cases: 20, percentage: 12.8 },
        { ageGroup: '60+', cases: 10, percentage: 6.4 }
      ],
      measureTypes: [
        { type: 'Quarantäne', count: 156, active: 23 },
        { type: 'PCR-Test', count: 234, active: 0 },
        { type: 'Schnelltest', count: 189, active: 0 },
        { type: 'Kontaktverfolgung', count: 156, active: 45 },
        { type: 'Impfung', count: 89, active: 12 },
        { type: 'Arztbesuch', count: 67, active: 8 },
        { type: 'Krankenhausaufenthalt', count: 12, active: 1 }
      ]
    });

    // Intelligente Empfehlungen
    setRecommendations([
      {
        id: 1,
        type: 'Regionale Maßnahmen',
        region: 'Frankfurt',
        priority: 'Kritisch',
        trigger: 'Inzidenz über 100/100.000',
        currentValue: 33.2,
        threshold: 100,
        urgency: 'Sofort',
        category: 'Regionale Maßnahmen',
        description: 'Inzidenz in Frankfurt liegt bei 33.2/100.000. Bei weiterem Anstieg über 100/100.000 werden strenge Maßnahmen empfohlen.',
        suggestedMeasures: [
          'Maskenpflicht in Innenräumen',
          'Kontaktbeschränkungen',
          'Veranstaltungsverbote',
          'Schulschließungen bei weiterem Anstieg'
        ],
        status: 'Überwachung'
      },
      {
        id: 2,
        type: 'Krankenhaus-Notfall',
        region: 'München',
        priority: 'Hoch',
        trigger: 'Krankenhauskapazität über 90%',
        currentValue: 78,
        threshold: 90,
        urgency: 'Innerhalb 48h',
        category: 'Systemisch',
        description: 'Krankenhauskapazität in München bei 78%. Bei Überschreitung von 90% Notfallplan aktivieren.',
        suggestedMeasures: [
          'Notfallplan vorbereiten',
          'Elektive Eingriffe planen',
          'Intensivbetten aufstocken',
          'Patientenverlegung koordinieren'
        ],
        status: 'Vorbereitung'
      },
      {
        id: 3,
        type: 'Impfkampagne',
        region: 'Berlin',
        priority: 'Mittel',
        trigger: 'Impfrate unter 80%',
        currentValue: 78.5,
        threshold: 80,
        urgency: 'Innerhalb 1 Woche',
        category: 'Präventiv',
        description: 'Impfrate in Berlin bei 78.5%. Ziel: 80% für Herdenimmunität.',
        suggestedMeasures: [
          'Mobile Impfteams',
          'Impfzentren erweitern',
          'Aufklärungskampagnen',
          'Anreize für Impfung'
        ],
        status: 'In Bearbeitung'
      },
      {
        id: 4,
        type: 'Cluster-Erkennung',
        region: 'Hamburg',
        priority: 'Niedrig',
        trigger: 'Cluster mit mehr als 5 Fällen',
        currentValue: 8,
        threshold: 5,
        urgency: 'Innerhalb 24h',
        category: 'Epidemiologisch',
        description: '8 neue Fälle in Hamburg am gleichen Tag - möglicher Cluster.',
        suggestedMeasures: [
          'Cluster-Untersuchung',
          'Erweiterte Kontaktverfolgung',
          'Zielgerichtete Tests',
          'Lokale Maßnahmen'
        ],
        status: 'Untersuchung läuft'
      }
    ]);
  };

  const calculatePercentage = (value, total) => {
    return total > 0 ? ((value / total) * 100).toFixed(1) : 0;
  };

  const getTrendIcon = (current, previous) => {
    if (current > previous) return '📈';
    if (current < previous) return '📉';
    return '➡️';
  };

  const getRiskLevel = (percentage) => {
    if (percentage > 10) return { level: 'Hoch', color: '#dc3545', bg: '#f8d7da' };
    if (percentage > 5) return { level: 'Mittel', color: '#ffc107', bg: '#fff3cd' };
    return { level: 'Niedrig', color: '#28a745', bg: '#d4edda' };
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

  const renderBarChart = (data, title, color = '#007bff') => {
    const maxValue = Math.max(...data.map(item => item.cases || item.count || item.percentage));
    
    return (
      <div className="chart-container">
        <h4>{title}</h4>
        <div className="bar-chart">
          {data.map((item, index) => (
            <div key={index} className="bar-item">
              <div className="bar-label">{item.region || item.ageGroup || item.type}</div>
              <div className="bar-wrapper">
                <div 
                  className="bar" 
                  style={{ 
                    width: `${((item.cases || item.count || item.percentage) / maxValue) * 100}%`,
                    backgroundColor: color
                  }}
                />
                <span className="bar-value">{item.cases || item.count || item.percentage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLineChart = (data, title) => {
    return (
      <div className="chart-container">
        <h4>{title}</h4>
        <div className="line-chart">
          <div className="chart-grid">
            {data.map((item, index) => (
              <div key={index} className="data-point">
                <div className="point-label">{item.date || item.week}</div>
                <div className="point-value">{item.cases}</div>
                <div className="point-line" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderPieChart = (data, title) => {
    return (
      <div className="chart-container">
        <h4>{title}</h4>
        <div className="pie-chart">
          {data.map((item, index) => (
            <div key={index} className="pie-segment">
              <div className="segment-color" style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }} />
              <div className="segment-label">{item.ageGroup}</div>
              <div className="segment-value">{item.percentage}%</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h2>📊 Dashboard & Statistiken</h2>
        <div className="header-controls">
          <select 
            value={selectedTimeframe} 
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="timeframe-select"
          >
            <option value="7d">Letzte 7 Tage</option>
            <option value="30d">Letzte 30 Tage</option>
            <option value="90d">Letzte 90 Tage</option>
            <option value="1y">Letztes Jahr</option>
          </select>
          <select 
            value={selectedRegion} 
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="region-select"
          >
            <option value="all">Alle Regionen</option>
            <option value="berlin">Berlin</option>
            <option value="hamburg">Hamburg</option>
            <option value="muenchen">München</option>
            <option value="koeln">Köln</option>
            <option value="frankfurt">Frankfurt</option>
          </select>
        </div>
      </div>

      {/* KPI-Karten */}
      <div className="kpi-grid">
        <div className="kpi-card primary">
          <div className="kpi-icon">🦠</div>
          <div className="kpi-content">
            <h3>Gesamtfälle</h3>
            <div className="kpi-value">{stats.totalCases}</div>
            <div className="kpi-trend">
              {getTrendIcon(stats.totalCases, 150)} +{stats.totalCases - 150} vs. Vormonat
            </div>
          </div>
        </div>

        <div className="kpi-card warning">
          <div className="kpi-icon">⚠️</div>
          <div className="kpi-content">
            <h3>Aktive Fälle</h3>
            <div className="kpi-value">{stats.activeCases}</div>
            <div className="kpi-trend">
              {getTrendIcon(stats.activeCases, 25)} {stats.activeCases > 25 ? '+' : ''}{stats.activeCases - 25} vs. gestern
            </div>
          </div>
        </div>

        <div className="kpi-card success">
          <div className="kpi-icon">✅</div>
          <div className="kpi-content">
            <h3>Genesene</h3>
            <div className="kpi-value">{stats.recoveredCases}</div>
            <div className="kpi-trend">
              {getTrendIcon(stats.recoveredCases, 125)} +{stats.recoveredCases - 125} vs. Vormonat
            </div>
          </div>
        </div>

        <div className="kpi-card info">
          <div className="kpi-icon">🏠</div>
          <div className="kpi-content">
            <h3>In Quarantäne</h3>
            <div className="kpi-value">{stats.quarantineCases}</div>
            <div className="kpi-trend">
              {getTrendIcon(stats.quarantineCases, 18)} {stats.quarantineCases > 18 ? '+' : ''}{stats.quarantineCases - 18} vs. gestern
            </div>
          </div>
        </div>

        <div className="kpi-card secondary">
          <div className="kpi-icon">👥</div>
          <div className="kpi-content">
            <h3>Kontaktpersonen</h3>
            <div className="kpi-value">{stats.totalContacts}</div>
            <div className="kpi-trend">
              {getTrendIcon(stats.totalContacts, 850)} +{stats.totalContacts - 850} vs. Vormonat
            </div>
          </div>
        </div>

        <div className="kpi-card danger">
          <div className="kpi-icon">🚨</div>
          <div className="kpi-content">
            <h3>Hochrisiko-Kontakte</h3>
            <div className="kpi-value">{stats.highRiskContacts}</div>
            <div className="kpi-trend">
              {getTrendIcon(stats.highRiskContacts, 220)} +{stats.highRiskContacts - 220} vs. Vormonat
            </div>
          </div>
        </div>
      </div>

      {/* Intelligente Empfehlungen */}
      <div className="recommendations-section">
        <h3>🤖 Intelligente Maßnahmen-Empfehlungen</h3>
        <div className="recommendations-grid">
          {recommendations.map((rec) => (
            <div key={rec.id} className={`recommendation-card ${getPriorityColor(rec.priority)}`}>
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
                <h4>{rec.type} - {rec.region}</h4>
                <p>{rec.description}</p>
                
                <div className="trigger-info">
                  <strong>Auslöser:</strong> {rec.trigger}
                  <div className="trigger-details">
                    <span>Aktueller Wert: {rec.currentValue}</span>
                    <span>Schwellenwert: {rec.threshold}</span>
                  </div>
                </div>
                
                <div className="suggested-measures">
                  <strong>Empfohlene Maßnahmen:</strong>
                  <ul>
                    {rec.suggestedMeasures.map((measure, idx) => (
                      <li key={idx}>{measure}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="recommendation-status">
                  <span className="status-badge">{rec.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risiko-Bewertung */}
      <div className="risk-assessment">
        <h3>🎯 Aktuelle Risiko-Bewertung</h3>
        <div className="risk-metrics">
          <div className="risk-metric">
            <div className="risk-label">Positivitätsrate</div>
            <div className="risk-value">
              {calculatePercentage(stats.positiveTests, stats.testsConducted)}%
            </div>
            <div className={`risk-level ${getRiskLevel(calculatePercentage(stats.positiveTests, stats.testsConducted)).level.toLowerCase()}`}>
              {getRiskLevel(calculatePercentage(stats.positiveTests, stats.testsConducted)).level}
            </div>
          </div>
          <div className="risk-metric">
            <div className="risk-label">Reproduktionszahl (R)</div>
            <div className="risk-value">1.2</div>
            <div className="risk-level medium">Mittel</div>
          </div>
          <div className="risk-metric">
            <div className="risk-label">7-Tage-Inzidenz</div>
            <div className="risk-value">45.2</div>
            <div className="risk-level low">Niedrig</div>
          </div>
          <div className="risk-metric">
            <div className="risk-label">Intensivbetten-Belegung</div>
            <div className="risk-value">12.3%</div>
            <div className="risk-level low">Niedrig</div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        <div className="chart-section">
          <h3>📈 Fallentwicklung</h3>
          {renderLineChart(timeData.dailyCases, 'Tägliche Neuinfektionen')}
        </div>

        <div className="chart-section">
          <h3>🏥 Regionale Verteilung</h3>
          {renderBarChart(timeData.regionalData, 'Fälle nach Regionen', '#28a745')}
        </div>

        <div className="chart-section">
          <h3>👥 Altersverteilung</h3>
          {renderPieChart(timeData.ageDistribution, 'Fälle nach Altersgruppen')}
        </div>

        <div className="chart-section">
          <h3>🛡️ Maßnahmen-Übersicht</h3>
          {renderBarChart(timeData.measureTypes, 'Angeordnete Maßnahmen', '#ffc107')}
        </div>
      </div>

      {/* Detaillierte Statistiken */}
      <div className="detailed-stats">
        <h3>📋 Detaillierte Statistiken</h3>
        
        <div className="stats-tables">
          <div className="stats-table">
            <h4>Test-Statistiken</h4>
            <table>
              <thead>
                <tr>
                  <th>Testtyp</th>
                  <th>Durchgeführt</th>
                  <th>Positiv</th>
                  <th>Positivitätsrate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PCR-Test</td>
                  <td>1,247</td>
                  <td>156</td>
                  <td>12.5%</td>
                </tr>
                <tr>
                  <td>Schnelltest</td>
                  <td>2,134</td>
                  <td>89</td>
                  <td>4.2%</td>
                </tr>
                <tr>
                  <td>Antikörper-Test</td>
                  <td>567</td>
                  <td>234</td>
                  <td>41.3%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="stats-table">
            <h4>Maßnahmen-Status</h4>
            <table>
              <thead>
                <tr>
                  <th>Maßnahme</th>
                  <th>Angeordnet</th>
                  <th>Aktiv</th>
                  <th>Abgeschlossen</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Quarantäne</td>
                  <td>156</td>
                  <td>23</td>
                  <td>133</td>
                </tr>
                <tr>
                  <td>Kontaktverfolgung</td>
                  <td>156</td>
                  <td>45</td>
                  <td>111</td>
                </tr>
                <tr>
                  <td>Impfung</td>
                  <td>89</td>
                  <td>12</td>
                  <td>77</td>
                </tr>
                <tr>
                  <td>Arztbesuch</td>
                  <td>67</td>
                  <td>8</td>
                  <td>59</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Aktuelle Warnungen */}
      <div className="alerts-section">
        <h3>🚨 Aktuelle Warnungen & Empfehlungen</h3>
        <div className="alerts-grid">
          <div className="alert-card warning">
            <div className="alert-icon">⚠️</div>
            <div className="alert-content">
              <h4>Erhöhte Fallzahlen in Berlin</h4>
              <p>In den letzten 7 Tagen wurden 15 neue Fälle in Berlin gemeldet. Kontaktverfolgung intensiviert.</p>
              <div className="alert-actions">
                <button className="btn-primary">Details anzeigen</button>
                <button className="btn-secondary">Maßnahmen prüfen</button>
              </div>
            </div>
          </div>

          <div className="alert-card info">
            <div className="alert-icon">ℹ️</div>
            <div className="alert-content">
              <h4>Neue Testkapazitäten verfügbar</h4>
              <p>Ab nächster Woche stehen zusätzliche PCR-Testkapazitäten zur Verfügung.</p>
              <div className="alert-actions">
                <button className="btn-primary">Kapazitäten prüfen</button>
              </div>
            </div>
          </div>

          <div className="alert-card success">
            <div className="alert-icon">✅</div>
            <div className="alert-content">
              <h4>Quarantäne-Ende für 12 Personen</h4>
              <p>12 Personen können heute aus der Quarantäne entlassen werden.</p>
              <div className="alert-actions">
                <button className="btn-primary">Entlassungen verwalten</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
