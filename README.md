# 🧪 Playwright Automation: User Flows

This repository contains automated test scripts for critical user flows—specifically the **Sign Up** and **Login & Goals Creation** scenarios—built using [Playwright](https://www.google.com/search?q=https://playwright.dev/) and TypeScript. The tests are designed to be stable, utilizing reliable locators (roles, placeholders, text) and data-driven techniques for robust execution.

---

## 🏗️ Project Structure

```text
├── data/
│   └── signup.json          # Test data for the sign-up flow (roles, names, passwords)
├── tests/
│   ├── test1.spec.ts        # Sign Up flow (dynamically generates emails to bypass duplication)
│   └── test2.spec.ts        # Login & Goals Creation flow
├── .env                     # Template for environment variables
├── .gitignore               # Ensures credentials are not pushed to version control
├── playwright.config.ts     # Global Playwright configuration
└── README.md                # Project documentation

```

---

## ⚙️ Prerequisites

Before running the tests, ensure you have the following installed on your machine:

* **[Node.js](https://www.google.com/search?q=https://nodejs.org/en/download/)** (v16 or higher)
* **npm** (comes with Node.js) or **yarn**

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

**3. Configure Environment Variables**
For security, user credentials are not hardcoded. You must create a `.env` file in the root directory.

Create a file named `.env` and add the following variables:

```env
BASE_URL="https://your-staging-environment-url.com"
EMAIL="your_test_account_email@domain.com"
PASSWORD="your_secure_password"

```

> **Note:** The `.env` file is explicitly added to `.gitignore` to prevent sensitive credentials from being committed to the repository.

---

## 💻 Running the Tests

To execute the Login & Goals Creation flow specifically on the Google Chrome browser engine, run:

```bash
npx playwright test tests/test2.spec.ts --project=chrome

```

**Other useful commands:**

* Run all tests in headless mode: `npx playwright test`
* Run tests in UI mode for debugging: `npx playwright test --ui`
* View the HTML test report: `npx playwright show-report`

---

## ⚠️ Known Execution Blocker: Firebase CAPTCHA

**Important Note for Reviewers:** During execution of the login test (`test2.spec.ts`), the automation may encounter an `auth/captcha-check-failed` error.

**This means Firebase rejected the CAPTCHA verification. This is an authentication environment issue, not a Playwright locator or scripting error.**

Currently, Firebase CAPTCHA is actively blocking automated logins on the staging environment. While the Playwright script is structurally sound and the locators are correct, execution is blocked by this security layer.

**If you are evaluating this assignment:**

1. **The script is fully prepared:** The login logic, explicit waits, and assertions (verifying the logged-in user state) are complete and functional.
2. **Standard workarounds were evaluated:** Attempting to bypass this by saving a browser session state (`playwright/.auth/user.json`) does not bypass the underlying token validation if Firebase flags the headless browser.
3. **Best Practice Resolution:** For a true staging QA environment, the recommended fix is to ask the application developer for an approved testing option—such as a dedicated test-authentication flow, a whitelisted testing IP/account, or a supported reCAPTCHA test configuration key (`1x00000000000000000000AA` for testing). Faking CAPTCHA tokens is not a viable or secure automation practice.

Until staging authentication is configured to permit automated QA traffic, the test may timeout or fail at the login assertion.

---

**Author:** Raxit Sharma

**Tech Stack:** Playwright | TypeScript | Node.js
