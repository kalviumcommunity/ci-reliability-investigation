 ### Defect C: Broad CI/CD Workflow Permissions
* **Location:** `.github/workflows/ci.yml` (line ~9)
* **Symptom:** The workflow contains the configuration `permissions: write-all`.
* **Diagnosis (CI/CD Safety Risk):** This grants the GitHub Actions workflow runner write access to all scopes (contents, pull requests, packages, security events, etc.). If a malicious dependency is loaded or a pull request executes untrusted code, the repository or credentials could be compromised.
* **Expected Fix:** Reduce permissions to the minimum necessary:
  ```yaml
  permissions:
    contents: read