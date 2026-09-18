CI Safety Notes
Identified Security Risk
The original GitHub Actions workflow contained the following configuration:

permissions: write-all

This configuration granted the workflow's GITHUB_TOKEN broad write permissions.

Location
File:

.github/workflows/ci.yml

Original configuration:

permissions: write-all

Line number: 10

Security Implications
The CI workflow only needs to check out the repository, install dependencies, run the linter, and execute tests. These operations do not require broad write permissions.

Using write-all grants more permissions than are necessary.

If malicious code were introduced into the workflow, a dependency, or another executed component, the overly permissive GITHUB_TOKEN could potentially be abused to perform write operations against repository resources.

This increases the potential impact of a compromised workflow.

Recommended Fix
The workflow should follow the principle of least privilege and grant only the permissions required for CI.

The recommended configuration is:

permissions: contents: read

This allows the workflow to read repository contents while removing unnecessary write permissions.

Applied Fix
The final workflow has been changed from:

permissions: write-all

to:

permissions: contents: read