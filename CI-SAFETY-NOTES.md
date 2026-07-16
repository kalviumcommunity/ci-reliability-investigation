# Issue
* Sympton: In `.github/workflows/ci.yml` (line ~9) the workflow contains the configuration `permissions: write-all`.
* **Diagnosis (CI/CD Safety Risk):** This grants the GitHub Actions workflow runner write access to all scopes. 
* **Problem**: If a malicious dependency is loaded or a pull request executes untrusted code, the repository or credentials could be compromised.
* **Fixed:** Reduced permissions to the minimum necessary.
  ```yaml
  permissions:
    contents: read
  ```