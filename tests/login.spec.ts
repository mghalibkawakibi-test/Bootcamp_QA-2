import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('Successfullly login use valid credential using page object @p0 @login @positive @smoketest', async ({ page }) => {
  const email = "testingemrachat@gmail.com"
  const password = "tester!3"
  const loginPage = new LoginPage(page)

  await loginPage.goto()

  await loginPage.emailField.fill(email)
  await loginPage.passwordField.fill(password)
  await loginPage.loginButton.click();
});

test('Successfullly login use valid credential @p0 @login @positive @smoketest', async ({ page }) => {
  
  // precondition
  await page.goto('/login');
  
  // Step
  await page.getByRole('textbox', { name: 'Email' }).fill('testingemrachat@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('tester!3');
  await page.getByRole('button', { name: 'Sign In' }).click();
  
  // Expected result
  await expect(page.getByRole('heading', { name: 'awwwEmra', exact: true })).toBeVisible();
});

test('Unsuccessfully login use invalid credential @p1 @login @negative @smoketest', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('testingemrachat@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText('Invalid credentials')).toBeVisible();
});