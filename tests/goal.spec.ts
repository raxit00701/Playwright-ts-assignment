
import { test } from '@playwright/test';
import * as path from 'path';
import dotenv from 'dotenv';
import { GoalPage } from '../page/goal';
import testData from '../data/goal.json';

dotenv.config({
    path: path.resolve(__dirname, '../env/.env')
});

const BASE_URL = process.env.BASE_URL!;

test.use({ storageState: './env/auth.json' });

test('Goals Creation', async ({ page }) => {

    // Initialize Page Object
    const goalPage = new GoalPage(page, testData);

    // Navigate and verify login
    await goalPage.navigate(BASE_URL);
    await page.waitForLoadState('domcontentloaded');
    await goalPage.verifySuccessfulLogin();

    // Create Goal
    await goalPage.navigateToGoalsAndAdd();

    await goalPage.fillBasicDetails(
        testData.title,
        testData.description
    );

    await goalPage.configureMasteryCriteria(testData.goalStatus);

    await goalPage.openAdvancedOptionsAndSetNumber(testData.goalNumber);

    await goalPage.addFormattedInstructions(testData.instructions);

    await goalPage.handleGoalType(testData.goalTypeName);

    await goalPage.configureBaselineAndSave(
        testData.param1,
        testData.param2
    );

    // Verify Goal Creation
    await goalPage.verifyGoalCreationSuccess();
    await goalPage.printGridCells(7);
    await goalPage.verifyGoalDetails(testData);

    // Edit and Delete
     
    await goalPage.editAndDeleteGoalType();
    
   
     await goalPage.deleteGoal();
});
