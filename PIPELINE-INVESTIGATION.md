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


  ### Defect C: Broad CI/CD Workflow Permissions
* **Location:** `.github/workflows/ci.yml` (line ~9)
* **Symptom:** The workflow contains the configuration `permissions: write-all`.
* **Diagnosis (CI/CD Safety Risk):** This grants the GitHub Actions workflow runner write access to all scopes (contents, pull requests, packages, security events, etc.). If a malicious dependency is loaded or a pull request executes untrusted code, the repository or credentials could be compromised.
* **Expected Fix:** Reduce permissions to the minimum necessary:
  ```yaml
  permissions:
    contents: read