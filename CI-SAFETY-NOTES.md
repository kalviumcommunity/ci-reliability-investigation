# CI Safety Notes

## Risk identified

The workflow previously used `permissions: write-all` at line 10 in
`.github/workflows/ci.yml`. This granted every GitHub token scope write access,
including repository contents and pull requests, even though this validation
workflow only needs to check out and read the repository.

## Security implications

If a compromised dependency, pull request, or workflow action executed
attacker-controlled code, the broad token could be used to modify repository
contents, alter pull requests, publish packages, or affect other writable
resources available to the job. The excessive permissions increase the impact
of a supply-chain or workflow compromise.

## Recommended fix

The workflow now applies least privilege:

```yaml
permissions:
  contents: read
```

This permits checkout while removing unnecessary write access. Additional
permissions should be added only for a specific step that demonstrably
requires them.
