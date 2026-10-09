import { test, expect } from '@playwright/test';
import * as path from 'path';
import dotenv from 'dotenv';
// Import the JSON data
import signupData from '../data/signup.json';

dotenv.config({
    path: path.resolve(__dirname, '../.env'),
});

// Environment variable remains untouched
const BASE_URL = process.env.BASE_URL!;

// Loop through each object in the JSON array
for (const data of signupData) {
    
    test(`Sign Up Flow - ${data.scenario}`, async ({ page }) => {
        // Generate a unique email using the domain from JSON to avoid "account exists" errors
        const uniqueEmail = `testuser_${Date.now()}@${data.emailDomain}`;

        await page.goto(BASE_URL);

        // 1. Click on 'Create account'
        await page.getByRole('link', { name: 'Create account' }).click();

        // 2. Insert valid dynamically generated email
        await page.getByRole('textbox', { name: 'Email' }).fill(uniqueEmail);

        // 3. Click Continue
        await page.getByText('Continue', { exact: true }).click();

        // 4. Enter valid name from JSON
        await page.getByRole('textbox', { name: 'James Musk' }).fill(data.name);

        // 5. Select role from dropdown using JSON data
        await page.getByRole('textbox', { name: 'Search or type your role' }).click();
        await page.getByRole('option', { name: data.role }).click();

        // 6. Enter valid password from JSON
        await page.getByPlaceholder('Choose a strong password').fill(data.password);

        // 7. Click checkbox (Terms and Conditions)
        await page.getByRole('checkbox').check(); 

        // 8. Click Continue button
        await page.getByRole('button', { name: 'Continue' }).click();


        // 9. Verify the confirmation heading is visible using default assertion timeout
        await expect(
            page.getByRole('heading', { name: 'Please confirm your email to be able to collaborate' })
        ).toBeVisible();
    });
}
