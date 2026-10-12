

# 🧪 Playwright Automation: User Flows

This repository contains automated test scripts for critical user flows—specifically the **Goals Creation** scenario—built using [Playwright](https://playwright.dev/) and TypeScript.

The framework is designed with scalability, stability, and maintainability in mind, utilizing the **Page Object Model (POM)** design pattern, **Data-Driven Testing (DDT)** via JSON, and **Session State Restoration** to bypass complex authentication blockers.

---

## 🏗️ Project Structure

```text
├── data/
│   └── goal.json             # Test data payload for the goals creation flow
├── pages/
│   └── goal.ts           # Page Object class containing locators and page actions
├── tests/
│   ├── generate-auth.spec.ts # Setup script to manually log in and capture session state
│   └── goal.spec.ts          # Automated Goals Creation test utilizing the saved state
├── .env                      # Template for environment variables
├── auth.json                 # Captured browser session state (Gitignored)
├── playwright.config.ts      # Global Playwright config (configured with Allure reporting)
└── README.md                 # Project documentation

```

---

## 🧠 Approach & Architecture

### 1. Page Object Model (POM)

To ensure the code is maintainable and DRY (Don't Repeat Yourself), all element locators and action methods (e.g., `fillBasicDetails()`, `configureMasteryCriteria()`) are abstracted into `pages/GoalPage.ts`. The actual test file (`goal.spec.ts`) only contains high-level test logic and assertions, making it highly readable.

### 2. Bypassing Firebase CAPTCHA via Session State

Previously, Firebase CAPTCHA blocked automated login attempts in the staging environment. To solve this without compromising test stability, I implemented **Session State Restoration**:

* A setup script (`generate-auth.spec.ts`) pauses the Playwright execution, allowing a human to log in manually once and solve any CAPTCHAs.
* Playwright then saves this authenticated session (including IndexedDB data required by Firebase) into an `auth.json` file.
* The main automation scripts use `test.use({ storageState: 'auth.json' })` to inject this token into the browser context, entirely bypassing the login screen for all subsequent test runs.

### 3. Data-Driven Testing

Test inputs (categories, descriptions, goal numbers, parameters) are decoupled from the test script and stored in `data/goal.json`. This allows for easy updating of test data without altering the core TypeScript logic.

---

## ⚙️ Prerequisites

Before running the tests, ensure you have the following installed:

* **Node.js** (v16 or higher)
* **npm** (comes with Node.js)

---

## 🚀 Installation & Setup

**1. Clone the repository and install dependencies**

```bash
npm install

```

**2. Install Playwright browsers**

```bash
npx playwright install --with-deps

```

**3. Install Allure Reporter** *(Required for HTML reporting)*

```bash
npm install -D allure-playwright allure-commandline

```

**4. Configure Environment Variables**
Create a file named `.env` in the root directory and add your target environment URL:

```env
BASE_URL="https://your-staging-environment-url.com"
HEADLESS="false" 

```

---

## 💻 Running the Tests

### Step 1: Generate Authentication State (Run Once)

Before running the main tests, you must generate the `auth.json` file. Run the setup script in **headed mode** so you can interact with the browser:

```bash
npx playwright test tests/generate-auth.spec.ts --headed

```

*Playwright will pause on the login screen. Log in manually, bypass the CAPTCHA, and click the "Resume" button in the Playwright Inspector. The script will save your session to `auth.json`.*

### Step 2: Run the Automation Suite

Once `auth.json` is generated, you can run the automated flows (which will automatically bypass the login screen):

```bash
# Run on Chrome
npx playwright test tests/goal.spec.ts --project=chrome

# Run all tests in UI debugging mode
npx playwright test --ui

```

---

## 📊 Reporting

This project uses **Allure** for rich, detailed, and visual test reporting.

**To generate and view the report after a test run:**

```bash
npx allure serve allure-results

```

*(This will compile the test results and automatically open a beautiful HTML report in your default web browser.)*

---

**Author:** Raxit Sharma

**Tech Stack:** Playwright | TypeScript | Node.js | Page Object Model | Allure
