# Risk identified 
issue:
* **Location:** `.github/workflows/ci.yml` (line ~9)
* **Symptom:** The workflow contains the configuration `permissions: write-all`.

This grants the GitHub Actions workflow runner write access to all scopes (contents, pull requests, packages, security events, etc.). If a malicious dependency is loaded or a pull request executes untrusted code, the repository or credentials could be compromised.

# improvement
as it was mentioned write- all so to fix that we have to reduce permission

# Secure permission (least privilege)
permission: contents : read 