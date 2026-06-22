import { test, expect } from '@playwright/test';

test('User succesfully logged in using valid credential @api @login @p0 @smoketest', async ({ request }) => {
    //precondition
 const baseURL = process.env.API_BASE_URL || 'https://api.emra.chat';
  
  //step
  // Gunakan param 'request', jangan 'page'
  const response = await request.post(`${baseURL}/api/v1/auth/login`, {
   //data yang akan dikirimkan ke endpoint 
    data: {
        "auth": {
            "email": "user@example.com",
            "password": "password123"
        }
        },
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
  });
  
  //expected result
  // Validasi status code (harusnya 401 Unauthorized jika password salah)
  expect(response.status()).toBe(200);
});