import { test, expect } from '@playwright/test';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config({
    path: path.resolve(__dirname, '../.env'),
});

const BASE_URL = process.env.BASE_URL!;
const EMAIL = process.env.EMAIL!;
const PASSWORD = process.env.PASSWORD!;

test('Goals Creation', async ({ page }) => {

    await page.goto(BASE_URL);

    // Enter email
    await page.getByPlaceholder('James.musk@email.com')
        .pressSequentially(EMAIL, { delay: 120 });

    await page.waitForTimeout(800);

    // Click Continue
    await page.getByText('Continue', { exact: true }).click();

    // Wait for password field
    await expect(
        page.getByPlaceholder('Enter your password', { exact: true })
    ).toBeVisible();

    await page.waitForTimeout(700);

    // Enter password
    await page.getByPlaceholder('Enter your password', { exact: true })
        .pressSequentially(PASSWORD, { delay: 120 });

    await page.waitForTimeout(800);

    // Click Continue
    await page.getByText('Continue', { exact: true }).click();

  if (await page.getByText('Stay Logged In on This Device?').isVisible().catch(() => false)) {
    await page.getByTestId('dismiss-stay-logged-in').click();
} else {
    console.log('Stay logged in prompt not visible, continuing...');
}
    // Verify logged-in user
    await expect(
        page.getByText('john tester', { exact: true })
    ).toBeVisible();

    console.log('Login successful: john tester is visible.');
});