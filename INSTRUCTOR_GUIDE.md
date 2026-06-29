# Instructor Solution Guide & Assessment Documentation

This guide outlines the expected solution path, core defects, evaluation rubric, and implementation steps to resolve the **CI Reliability Investigation Challenge**.

---

## 1. Intentional Defects & Target Diagnoses

Students must identify and fix three distinct issues across the pipeline configuration, tests, and security permissions.

### Defect A: Incorrect CI Test Command
* **Location:** `.github/workflows/ci.yml` (line ~28)
* **Symptom:** The workflow execution fails during the test stage with: `npm ERR! missing script: test-ci`.
* **Diagnosis:** The workflow file executes `npm run test-ci`, but `package.json` only defines the `test` and `lint` scripts.
* **Expected Fix:** Change the run command to `npm test` or `npm run test` in `.github/workflows/ci.yml`.

### Defect B: Flaky/Failing Test (Race Condition / Timestamp)
* **Location:** `tests/app.test.js` (line ~16)
* **Symptom:** When the workflow test suite runs, it fails because the timestamp returned by the Express API doesn't exactly match the execution time of the test runner:
  ```text
  Expected: "2026-06-29T12:00:00.000Z"
  Received: "2026-06-29T12:00:00.005Z"
  ```
* **Diagnosis:** Dynamic values like timestamps must not be asserted via exact value equivalence in tests due to processing latency (especially on shared CI runners).
* **Expected Fix:** Replace the exact match with a regex pattern test or verify that the value is defined and is a valid ISO string. For example:
  ```javascript
  expect(res.body.timestamp).toBeDefined();
  expect(new Date(res.body.timestamp).getTime()).not.toBeNaN();
  ```

### Defect C: Broad CI/CD Workflow Permissions
* **Location:** `.github/workflows/ci.yml` (line ~9)
* **Symptom:** The workflow contains the configuration `permissions: write-all`.
* **Diagnosis (CI/CD Safety Risk):** This grants the GitHub Actions workflow runner write access to all scopes (contents, pull requests, packages, security events, etc.). If a malicious dependency is loaded or a pull request executes untrusted code, the repository or credentials could be compromised.
* **Expected Fix:** Reduce permissions to the minimum necessary:
  ```yaml
  permissions:
    contents: read
  ```

---

## 2. Refactored / Corrected Files

### Corrected Test Suite: `tests/app.test.js`
```javascript
const request = require('supertest');
const app = require('../src/app');

describe('GET /api/status', () => {
  it('should return a healthy status with a timestamp', async () => {
    const res = await request(app)
      .get('/api/status')
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('healthy');
    
    // Corrected Assertion: Check structure rather than exact timestamp millisecond match
    expect(res.body.timestamp).toBeDefined();
    expect(new Date(res.body.timestamp).getTime()).not.toBeNaN();
  });
});
```

### Corrected Workflow Configuration: `.github/workflows/ci.yml`
```yaml
name: CI Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

# Secure permissions (Least Privilege)
permissions:
  contents: read

jobs:
  lint:
    name: Code Quality Linting
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Linter
        run: npm run lint

  test:
    name: Run Test Suite
    runs-on: ubuntu-latest
    needs: lint # Specifies multi-job dependency
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Test Suite
        run: npm test
```

---

## 3. Recommended Student Deliverables

### `PIPELINE-INVESTIGATION.md` Content
Students should explain:
* **Issue 1 (Wrong Command):** Script `test-ci` was missing in `package.json`. Fix: Change to `npm test`.
* **Issue 2 (Flaky Timestamp Test):** Exact matching on `new Date().toISOString()` fails under network/processor latency in the runner. Fix: Verify timestamp validity or use regex match.

### `CI-SAFETY-NOTES.md` Content
Students should explain:
* **Safety Concern:** Use of `permissions: write-all` in `.github/workflows/ci.yml`.
* **Risk:** Anyone triggering the workflow (including via fork PRs or compromised dependency scripts) runs code with write capabilities to the repo.
* **Fix:** Apply `permissions: { contents: read }` to secure the repository assets.

---

## 4. Grading Rubric (Total: 20 Marks)

| Task | Component | Criteria | Marks |
| :--- | :--- | :--- | :--- |
| **Task 1** | Pipeline Investigation | Correctly identifies incorrect test command in runner logs. | 3 |
| | | Correctly identifies timestamp race condition in tests. | 3 |
| **Task 2** | Workflow Improvements | Resolves incorrect command in YAML and fixes flaky test code. | 3 |
| | | Implements two distinct jobs (`lint` and `test`). | 3 |
| | | Configures pipeline order so `test` depends on `lint`. | 2 |
| **Task 3** | Pipeline Safety | Locates and explains the risk of `permissions: write-all`. | 3 |
| | | Reduces permissions to `contents: read` in YAML. | 3 |

---

## 5. Common Student Pitfalls & AI Considerations
* **Hardcoding fixed timestamps:** Students might replace `new Date().toISOString()` with a static hardcoded ISO string. This will cause the test to fail immediately because the API returns the current server time dynamically.
* **Missing `needs` keyword:** Students might split the pipeline into two jobs (`lint` and `test`) but run them in parallel instead of sequentially. The `needs: lint` configuration is required.
* **Applying `permissions: none`:** While safe, this might break basic checkout checks. The standard best practice is `contents: read`.
