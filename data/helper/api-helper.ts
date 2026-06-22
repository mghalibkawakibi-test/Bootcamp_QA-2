import { APIRequestContext } from '@playwright/test';

// Login dan ambil token
export async function auth(
  request: APIRequestContext,
  baseURL: string,
  email: string,
  password: string
): Promise<string> {

  const response = await request.post(`${baseURL}/api/v1/auth/login`, {
    data: {
      auth: { email, password }
    },
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  const body = await response.json();

  return body.data.tokens.access_token;
}

// Get Account/Profile
export async function getAccounts(
  request: APIRequestContext,
  baseURL: string,
  access_token: string
) {

  const response = await request.get(`${baseURL}/api/v1/user`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${access_token}`
    }
  });

  return response;
}