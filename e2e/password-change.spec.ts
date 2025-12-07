import { test, expect } from '@playwright/test';

test('should allow user to change password', async ({ page }) => {
  const timestamp = Date.now();
  const email = `test-${timestamp}@example.com`;
  const password = 'password123';
  const newPassword = 'newpassword123';

  // 1. Sign Up
  await page.goto('/sign-up');
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button:has-text("S\'inscrire")');

  // Wait for redirect to dashboard or home
  await expect(page).toHaveURL('/');

  // 2. Go to Security Page
  await page.goto('/dashboard/security');

  // 3. Change Password
  await page.fill('input[name="currentPassword"]', password);
  await page.fill('input[name="newPassword"]', newPassword);
  await page.fill('input[name="confirmPassword"]', newPassword);
  await page.click('button:has-text("Update Password")');

  // Expect success toast or message
  await expect(page.getByText('Success', { exact: true })).toBeVisible();
  await expect(page.getByText('Password updated successfully.', { exact: true })).toBeVisible();

  // 4. Sign Out
  await page.click('button:has-text("Sign Out")');
  await expect(page).toHaveURL('/sign-in');

  // 5. Try Login with OLD password
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button:has-text("Se connecter")');

  // Expect error - better-auth usually returns "Invalid email or password" or similar generic message
  // Adjust this expectation if the message is different
  // Checking for presence of ANY error message in the error div
  await expect(page.locator('.text-red-500')).toBeVisible();

  // 6. Login with NEW password
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', newPassword);
  await page.click('button:has-text("Se connecter")');

  // Expect success
  await expect(page).toHaveURL('/');
});
