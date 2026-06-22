import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import userData from '../data/production/user.json'
import { pushTestResultToAgentQ } from '../data/helper/agentq-helper';

let testStartTime: number;

test.describe('Authentication Tests', () => {

  test.beforeEach(async () => {
    testStartTime = Date.now();
  });

  test.afterEach(async ({}, testInfo) => {
  const executionTime = Date.now() - testStartTime;
  const errorDetails = testInfo.errors.map(e => e.message).join('; ');
  const title = testInfo.title ?? 'unkown test';
  const status = testInfo.status ?? 'unknown';
  await pushTestResultToAgentQ(title, status, executionTime, errorDetails);
 });
  
test('Successfullly login use valid credential using page object @p0 @login @positive @smoketest', async ({ page }) => {
  const email = userData['valid_user']['email']
  const password = userData['valid_user']['password']
  const loginPage = new LoginPage(page)
 
  await loginPage.goto()

  await loginPage.emailField.fill(email)
  await loginPage.passwordField.fill(password)
  await loginPage.loginButton.click();
});

test('1-Successfullly login use valid credential @p0 @login @positive @smoketest', async ({ page }) => {
  
  // precondition
  await page.goto('/login');
  
  // Step
  await page.getByRole('textbox', { name: 'Email' }).fill('testingemrachat@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('tester!3');
  await page.getByRole('button', { name: 'Sign In' }).click();
  
  // Expected result
  await expect(page.getByRole('heading', { name: 'aaaaEmra', exact: true })).toBeVisible();
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

});