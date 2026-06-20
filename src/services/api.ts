const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:5000/api';

export interface RegistrationData {
  id?: number;
  name: string;
  phone: string;
  course: string;
  branch: string;
  status: 'new' | 'contacted' | 'enrolled';
  createdAt?: string;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('ya-admin-token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const api = {
  // Auth
  login: async (credentials: any) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },

  getMe: async () => {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Unauthorized');
    return res.json();
  },

  // Registrations
  submitRegistration: async (data: Omit<RegistrationData, 'status' | 'id'>) => {
    const res = await fetch(`${API_URL}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to submit registration');
    return res.json();
  },

  getRegistrations: async () => {
    const res = await fetch(`${API_URL}/registrations`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch registrations');
    return res.json();
  },

  updateStatus: async (id: number, status: string) => {
    const res = await fetch(`${API_URL}/registrations/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update status');
    return res.json();
  },

  deleteRegistration: async (id: number) => {
    const res = await fetch(`${API_URL}/registrations/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete registration');
    return res.json();
  }
};
