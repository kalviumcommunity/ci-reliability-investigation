# CI Safety Notes

## Safety Risk Identified

Configuration: permissions: write-all

File:.github/workflows/ci.yml

This workflow grants write access to all available GitHub token permissions, which is more access than is required for a standard CI pipeline that only checks out code, installs dependencies, runs the linter, and executes tests.

## Security Implications

Using permissions: write-all violates the principle of least privilege. If malicious code is introduced into the workflow—either through a compromised dependency, an insecure script, or an untrusted pull request—it could use the workflow's write permissions to modify repository contents, create or delete branches, push commits, create releases, or perform other unauthorized actions.

Granting unnecessary permissions increases the potential impact of a security incident.

## Recommended Fix

Restrict the workflow to the minimum permissions required. Since this workflow only needs to read the repository contents, configure GitHub Actions with read-only access:

  yaml
permissions:
  contents: read

Additional permissions should only be granted when they are explicitly required by a workflow step.
