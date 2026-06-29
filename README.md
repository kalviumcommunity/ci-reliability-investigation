# Continuous Assessment: CI Reliability Investigation Challenge

## Course: DevOps Engineering
## Module: CI/CD with GitHub Actions
* **Assessment Type:** File Upload (PDF)
* **Marks:** 20 Marks
* **Expected Completion Time:** 20–30 Minutes
* **Difficulty:** Medium (Beginner to Intermediate)

---

## Scenario Description

You are a Junior DevOps Engineer at a fast-growing tech company. The development team has just handed over a simple Node.js API with a basic testing and linting workflow. However, the continuous integration (CI) pipeline is failing in GitHub Actions, and they have noticed several security and structural inefficiencies in the workflow setup. 

Your task is to:
1. **Investigate and diagnose** why the pipeline is failing by analyzing the runner logs.
2. **Repair the code and workflow defects** to get the pipeline to pass.
3. **Refactor the workflow** from a single-job pipeline into a multi-job pipeline (implementing a validation/linting stage that must pass before tests execute).
4. **Audit the pipeline security** to identify permission risks and document recommendations.

---

## Learning Objectives Assessed

1. Introduction to CI/CD Signals and Pipeline Feedback
2. Fixing Broken Tests in CI Pipelines
3. Understanding GitHub Actions Workflow YAML
4. Investigating GitHub Actions Runner Logs
5. Building Multi-Job CI Pipelines
6. Setting Branch Protection Rules and Required Checks
7. Debugging Matrix Builds Across Environments
8. Securing Secrets and Permissions in CI/CD
9. Diagnosing Flaky Tests in CI Pipelines

---

## Repository Structure

```text
.
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI workflow config
├── src/
│   ├── app.js                 # Main Express API application
│   └── utils.js               # Helper utility function
├── tests/
│   └── app.test.js            # Integration and unit tests
├── .eslintrc.json             # Code style/linting configuration
├── package.json               # Project manifest and scripts
└── README.md                  # This instruction guide
```

---

## How to Set Up & Run Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18 or higher)
* [Git](https://git-scm.com/)

### Step 1: Install Dependencies
Run the following command in your terminal to install the project dependencies:
```bash
npm install
```

### Step 2: Run Tests Locally
To execute the test suite locally:
```bash
npm test
```

### Step 3: Run the Linter Locally
To verify code formatting and styling guidelines:
```bash
npm run lint
```

### Step 4: Run the Server Locally
To start the application server locally (accessible at `http://localhost:3000`):
```bash
npm start
```

---

## Tasks & Assessment Goals

### Task 1: Investigate Workflow Failures (6 Marks)
1. Trigger a workflow execution by making a commit or opening a Pull Request (PR) to the `main` branch.
2. Inspect the **GitHub Actions** tab in your repository and navigate to the failing run logs.
3. Review the logs to identify the **two** reliability issues preventing a successful run:
   * **Issue 1:** Why is the workflow runner itself failing before finishing the script?
   * **Issue 2:** What is causing the test suite to fail under latency? (Compare the test code with the runner results).
4. Create a document named `PIPELINE-INVESTIGATION.md` in the root of your repository. 
5. In this file, document:
   * The symptoms you saw in the workflow runner logs.
   * Your diagnosis of both issues.
   * Your proposed fixes.

### Task 2: Improve Workflow Validation & Structure (8 Marks)
1. Fix the faulty test suite in [tests/app.test.js](file:///tests/app.test.js) so that the assertion checks the presence or schema of the timestamp instead of relying on a flaky, precise millisecond match.
2. Refactor the workflow file [.github/workflows/ci.yml](file:///.github/workflows/ci.yml) to fix the incorrect test command.
3. Transform the workflow from a single-job workflow to a **multi-job pipeline**:
   * Create a new job named `lint` that runs the linter (`npm run lint`).
   * Configure the existing test job (rename to `test`) to depend on the `lint` job using the `needs` keyword. The tests should **only** run if the lint job passes successfully.
4. Push your changes and verify that the workflow executes successfully.

### Task 3: Review Pipeline Safety (6 Marks)
1. Read through [.github/workflows/ci.yml](file:///.github/workflows/ci.yml) and look for a serious CI/CD security/safety configuration flaw.
2. Create a file named `CI-SAFETY-NOTES.md` in the root of your repository.
3. Document:
   * The safety risk identified (specifically referencing the line number and configuration name).
   * The security implications of this setting (how an attacker could exploit it).
   * The recommended fix using least-privilege permissions.
4. Modify the [.github/workflows/ci.yml](file:///.github/workflows/ci.yml) file to apply your recommended secure permission configuration.

---

## Screenshot Evidence Requirements
To receive full marks, you must document your work with screenshots in your final PDF submission. Ensure the screenshots are clear and readable:

* **Screenshot 1: Workflow Investigation Evidence**
  A screenshot of the initial failed GitHub Actions run in the browser, showing the exact step that failed and the error output in the log.
* **Screenshot 2: PIPELINE-INVESTIGATION.md**
  A screenshot of your rendered investigation file in the GitHub repository UI.
* **Screenshot 3: Improved Workflow Configuration**
  A screenshot of your updated workflow YAML file in the GitHub repository code viewer showing the multi-job configuration and the restricted permissions.
* **Screenshot 4: Successful Pipeline Execution**
  A screenshot of the GitHub Actions run history page displaying the green checkmark and showing the visual dependency graph connecting the `lint` job to the `test` job.
* **Screenshot 5: CI-SAFETY-NOTES.md**
  A screenshot of your security assessment document rendered in the GitHub repository UI.

---

## Submission Instructions

1. Compile your findings, code explanations, and the **5 required screenshots** into a single PDF document.
2. Ensure your PDF is titled: `[YourName]_[YourStudentID]_DevOps_CA2.pdf`.
3. Submit the PDF to the university learning management platform (LMS) before the deadline.
4. (Optional/If requested by tutor) Include the link to your public/private GitHub repository.
