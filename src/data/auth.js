const API_URL = import.meta.env.VITE_APP_BALANCE_API_URL;
if (!API_URL) throw new Error('API URL is required. Check you .env file');
const baseURL = `${API_URL}`;

//Signup in progress
/* const signUp = async (formData) => {
  const res = await fetch(`${baseURL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error('Something went wrong. Signup failed');
}; */

const signIn = async (formData) => {
  const res = await fetch(`${baseURL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
    credentials: 'include', //To recieve cookies
  });

  if (!res.ok) throw new Error('Login failed');

  const data = await res.json();
  return data;
};

const signOut = async () => {
  const res = await fetch(`${baseURL}/auth/logout`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Invalid Token. Logout failed.');
};

const me = async () => {
  const res = await fetch(`${baseURL}/users/current-user`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Invalid Token error caught in auth.js');

  const data = await res.json();
  return data;
};

export { signIn, signOut, me };
