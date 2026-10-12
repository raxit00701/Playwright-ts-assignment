import { test, expect } from '@playwright/test';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config({
    path: path.resolve(__dirname, '../.env'),
});

const BASE_URL = process.env.BASE_URL!;

test('Manual Login and Save Session', async ({ page, context }) => {
    await page.goto(BASE_URL);

    console.log('Playwright is paused. Please log in manually in the browser.');
    console.log(' Once logged in, click the "Resume" button in the Playwright Inspector window.');

    // Pause execution to allow you to log in and handle the "Stay Logged In" prompt manually
    await page.pause();

    // Verify logged-in user to ensure manual login was successful before saving
    await expect(
        page.getByText('john tester', { exact: true })
    ).toBeVisible({ timeout: 15000 });

    console.log('✅ Login successful: john tester is visible. Saving session...');

    // Save the session state to the specified path
    const authFilePath = 'C:\\Projects\\PLAYWRIGHT TS\\auth.json';

    // @ts-ignore - Suppressing TS error: native Playwright types do not officially support 'indexedDB' 
    // inside storageState, but passing it here as requested for your Firebase setup.
    await context.storageState({ 
        path: authFilePath, 
        indexedDB: true 
    });

    console.log(`💾 Session saved to ${authFilePath}`);
});
