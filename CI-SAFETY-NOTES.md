* Safety Concern:
 Use of `permissions: write-all` in `.github/workflows/ci.yml`.
Risk: Anyone triggering the workflow (including via fork PRs or compromised dependency scripts) runs code with write capabilities to the repo.
Fix: Apply `permissions: { contents: read }` to secure the repository assets.

Broad CI/CD Workflow Permissions
Location: `.github/workflows/ci.yml` (line ~9)
Symptom: The workflow contains the configuration `permissions: write-all`.
Diagnosis (CI/CD Safety Risk):** This grants the GitHub Actions workflow runner write access to all scopes (contents, pull requests, packages, security events, etc.). If a malicious dependency is loaded or a pull request executes untrusted code, the repository or credentials could be compromised.
Expected Fix:Reduce permissions to the minimum necessary:
  ```yaml
  permissions:
    contents: read
  ```
