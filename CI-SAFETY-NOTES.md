# CI Safety Notes

## Identified risk

In the original `.github/workflows/ci.yml`, line 10 used `permissions: write-all`. This grants the workflow's `GITHUB_TOKEN` write access to every permission scope supported by the repository.

## Security implications

If compromised dependency code or an untrusted workflow step executes in a run that has a write-capable token, it could use that token to modify repository contents, pull requests, or other resources covered by the granted scopes. A routine lint-and-test workflow does not need those write capabilities.

## Recommended least-privilege configuration

The workflow now uses `permissions: contents: read` at line 10. This allows checkout to read repository contents without granting unrelated write permissions. Grant additional permissions only to a job that demonstrably needs them.
