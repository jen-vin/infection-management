const API_BASE_URL = 'http://localhost:8000';

export async function getCases() {
  const res = await fetch(`${API_BASE_URL}/cases/`);
  if (!res.ok) {
    throw new Error(`Fehler beim Laden der Fälle: ${res.statusText}`);
  }
  return res.json();
}


export async function createCase(data) {
  const res = await fetch(`${API_BASE_URL}/cases/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updateCase(id, data) {
  const res = await fetch(`${API_BASE_URL}/cases/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteCase(id) {
  await fetch(`${API_BASE_URL}/cases/${id}`, { method: 'DELETE' });
}

export async function getContacts() {
  const res = await fetch(`${API_BASE_URL}/contacts/`);
  return res.json();
}

export async function createContact(data) {
  const res = await fetch(`${API_BASE_URL}/contacts/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getMeasures() {
  const res = await fetch(`${API_BASE_URL}/measures/`);
  return res.json();
}

export async function createMeasure(data) {
  const res = await fetch(`${API_BASE_URL}/measures/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getStats() {
  const res = await fetch(`${API_BASE_URL}/stats/overview`);
  return res.json();
}

export async function getNotifications() {
  const res = await fetch(`${API_BASE_URL}/notifications/`);
  return res.json();
}

export async function login(username, password) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

export async function fetchReportsByUserId(userId) {
  const response = await fetch(`http://localhost:8000/reports/?user_app_id=${userId}`);
  if (!response.ok) throw new Error("Fehler beim Laden der Berichte");
  return await response.json();
}
