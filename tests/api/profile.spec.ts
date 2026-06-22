import { test, expect } from '@playwright/test';
//import dibawah untuk pnaggil isi daripada user di file user.json
import userData from '../../data/production/user.json'
//import dibawah untuk panggil isi helper sehingga tidak perlu ubah ubah code di script ini
import { auth, getAccounts } from '../../data/helper/api-helper.ts'
import userResponseSchema from '../../json-schema/user-response-schema.json';
const { Validator } = require('jsonschema');

test('User succesfully logged in using valid credential @api @login @p0 @smoketest', async ({ request }) => {
//precondition
 const baseURL = process.env.API_BASE_URL || 'https://api.emra.chat';
 const email = userData['valid_user']['email']
 const password = userData['valid_user']['password']
 
 //step
 const access_token = await auth(
  request,
  baseURL,
  email,
  password
);
const response = await getAccounts(request, baseURL, access_token)

 
 //step
  // Gunakan param 'request', jangan 'page'
  //metode post untuk mengirim data ke endpoint login
  //let response = await request.post(`${baseURL}/api/v1/auth/login`, {
   //data yang akan dikirimkan ke endpoint 
    //data: {
        //"auth": {
            //"email": "user@example.com",
            //"password": "password123"
        //}
       //},
    //headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
  //});

 console.log(await response.json())

  //response = await response.json()
  //const access_token = response["data"]["tokens"]["access_token"]
   
  
  //metode get authorization untuk mendapatkan user yang login
  //expected result
  // Validasi status code (harusnya 401 Unauthorized jika password salah)
 expect(response.status()).toBe(200);

 //data ini untuk menyimpan response json nya
 const data = await response.json();
//lalu response data json ini akan divalidasi oleh code dibawah dicompare dengan json-scema
 const validator = new Validator();
 const result = validator.validate(data, userResponseSchema);

expect(result.errors).toHaveLength(0); // ⬅ Kontrak HARUS terpenuhi 100%
});