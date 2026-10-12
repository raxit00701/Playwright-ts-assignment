import { expect, type Locator, type Page } from '@playwright/test';

export class GoalPage {
    readonly page: Page;
    
    // Locators
    readonly loggedInUser: Locator;
    readonly goalsLink: Locator;
    readonly addGoalBtn: Locator;
    readonly categoryInput: Locator;
    readonly descriptionInput: Locator;
    readonly masteryCriterionBtn: Locator;
    readonly switchTrack: Locator;
    readonly advancedOptionsText: Locator;
    readonly masteryDropdown: Locator;
    readonly onTrackOption: Locator;
    readonly advancedOptionsToggle: Locator;
    readonly goalNumberInput: Locator;
    readonly instructionsText: Locator;
    readonly quillEditor: Locator;
    readonly boldBtn: Locator;
    readonly italicBtn: Locator;
    readonly underlineBtn: Locator;
    readonly selectGoalTypeBtn: Locator;
    readonly createGoalTypeBtn: Locator;
    readonly goalTypeNameInput: Locator;
    readonly submitGoalTypeBtn: Locator;
    readonly typeSuccessMsg: Locator;
    readonly testGoalTypeBtn: Locator;
    readonly baselineMasteryToggle: Locator;
    readonly param1Input: Locator;
    readonly param2Input: Locator;
    readonly saveGoalBtn: Locator;
    readonly goalSuccessMsg: Locator;
    readonly gridCells: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize Locators
        this.loggedInUser = page.getByText('john tester', { exact: true });
        this.goalsLink = page.getByRole('link', { name: 'Goals' });
        this.addGoalBtn = page.getByText('Add Goal');
        this.categoryInput = page.getByPlaceholder('e.g., Reading, Writing, Math');
        this.descriptionInput = page.getByPlaceholder('Write goal here..');
        this.masteryCriterionBtn = page.getByRole('button', { name: 'Mastery Criterion' });
        this.switchTrack = page.locator("//span[@class='m_9307d992 mantine-Switch-track']");
        this.advancedOptionsText = page.getByText('Advanced Options');
        this.masteryDropdown = page.getByTestId('mastery-criteria-section').getByRole('textbox');
        this.onTrackOption = page.getByText('On track', { exact: true });
        this.advancedOptionsToggle = page.getByTestId('advanced-options-toggle');
        this.goalNumberInput = page.getByTestId('goal-number-input');
        this.instructionsText = page.getByText('Instructions', { exact: true });
        this.quillEditor = page.locator('div.ql-editor');
        this.boldBtn = page.locator("//button[@aria-label='bold']//*[name()='svg']");
        this.italicBtn = page.locator("//button[@aria-label='italic']//*[name()='svg']");
        this.underlineBtn = page.locator("//button[@aria-label='underline']//*[name()='svg']");
        this.selectGoalTypeBtn = page.getByRole('button', { name: 'Select' });
        this.createGoalTypeBtn = page.getByRole('button', { name: 'Create Goal type' });
        this.goalTypeNameInput = page.getByRole('textbox', { name: 'Goal type name' });
        this.submitGoalTypeBtn = page.locator('span').filter({ hasText: 'Create Goal Type' }).first();
        this.typeSuccessMsg = page.getByText('Goal type created successfully', { exact: true });
        this.testGoalTypeBtn = page.getByRole('button', { name: 'test', exact: true });
        this.baselineMasteryToggle = page.getByTestId('baseline-mastery-toggle');
        this.param1Input = page.getByPlaceholder('e.g., 5');
        this.param2Input = page.getByPlaceholder('e.g., 10');
        this.saveGoalBtn = page.getByRole('button', { name: 'Save Goal' });
        this.goalSuccessMsg = page.getByText('Goal created successfully.', { exact: true });
        this.gridCells = page.getByRole('gridcell');
    }

    async navigate(url: string) {
        await this.page.goto(url);
    }

    async verifySuccessfulLogin() {
        await expect(this.loggedInUser).toBeVisible();
        console.log('Login successful: john tester is visible (via auth.json).');
    }

    async navigateToGoalsAndAdd() {
        await this.goalsLink.scrollIntoViewIfNeeded();
        await this.goalsLink.click();
        await this.addGoalBtn.click();
    }

    async fillBasicDetails(category: string, description: string) {
        await this.categoryInput.fill(category);
        await this.descriptionInput.fill(description);
    }

    async configureMasteryCriteria() {
        await this.masteryCriterionBtn.click();
        await this.switchTrack.click();
        await this.advancedOptionsText.scrollIntoViewIfNeeded();
        await this.masteryDropdown.click();
        await this.onTrackOption.click();
    }

    async openAdvancedOptionsAndSetNumber(goalNumber: string) {
        await this.advancedOptionsToggle.click();
        await this.goalNumberInput.fill(String(goalNumber));
    }

    async addFormattedInstructions(instructions: string) {
        await this.instructionsText.scrollIntoViewIfNeeded();
        await this.quillEditor.fill(instructions);
        await this.quillEditor.click();
        await this.page.keyboard.press('Control+A'); // Highlight text
        
        await this.boldBtn.click();
        await this.italicBtn.click();
        await this.underlineBtn.click();
    }

    async handleGoalType(goalTypeName: string) {
        await this.selectGoalTypeBtn.click();

        if (await this.createGoalTypeBtn.isVisible()) {
            await this.createGoalTypeBtn.click();
            await this.goalTypeNameInput.fill(goalTypeName);
            await this.submitGoalTypeBtn.click();
            
            await expect(this.typeSuccessMsg).toBeVisible();
            console.log('Success message displayed: Goal type created successfully');
        } else {
            await this.testGoalTypeBtn.click();
        }
    }

    async configureBaselineAndSave(param1: string, param2: string) {
        await this.baselineMasteryToggle.click();
        await this.param1Input.fill(String(param1));
        await this.param2Input.fill(String(param2));
        await this.saveGoalBtn.click();
    }

    async verifyGoalCreationSuccess() {
        await expect(this.goalSuccessMsg).toBeVisible();
        console.log('Success message displayed: Goal created successfully.');
    }

    async printGridCells(limit: number = 7) {
        const count = await this.gridCells.count();
        const maxIter = Math.min(limit, count - 1);

        for (let i = 0; i <= maxIter; i++) {
            const cell = this.gridCells.nth(i);
            await expect(cell).toBeVisible();
            console.log(`Gridcell ${i}:`, await cell.innerText());
        }
    }
}