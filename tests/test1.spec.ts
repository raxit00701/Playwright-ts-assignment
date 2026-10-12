import { test } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import dotenv from 'dotenv';
import { GoalPage } from '../page/goal'; // Adjust path depending on your folder structure

dotenv.config({
    path: path.resolve(__dirname, '../.env'),
});

const BASE_URL = process.env.BASE_URL!;

test.use({ storageState: 'C:\\Projects\\PLAYWRIGHT TS\\auth.json' });

test('Goals Creation', async ({ page }) => {
    // 1. Read and parse the JSON file
    const dataPath = path.resolve(__dirname, '../data/goal.json');
    const goalData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // 2. Initialize the Page Object
    const goalPage = new GoalPage(page);

    // 3. Execute Page Actions sequentially
    await goalPage.navigate(BASE_URL);
    await goalPage.verifySuccessfulLogin();
    
    await goalPage.navigateToGoalsAndAdd();
    
    await goalPage.fillBasicDetails(goalData.category, goalData.description);
    
    await goalPage.configureMasteryCriteria();
    
    await goalPage.openAdvancedOptionsAndSetNumber(goalData.goalNumber);
    
    await goalPage.addFormattedInstructions(goalData.instructions);
    
    await goalPage.handleGoalType(goalData.goalTypeName);
    
    await goalPage.configureBaselineAndSave(goalData.param1, goalData.param2);
    
    // 4. Verify end states
    await goalPage.verifyGoalCreationSuccess();
    await goalPage.printGridCells(7); // Checks up to 8 grid cells (index 0 to 7)
});