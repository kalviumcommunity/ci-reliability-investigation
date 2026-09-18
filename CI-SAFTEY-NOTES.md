## Safety Concern:
- Use of `permissions: write-all` in `.github/workflows/ci.yml`.

## Risk: 
Anyone triggering the workflow (including via fork PRs or compromised dependency scripts) runs code with write capabilities to the repo.

## Fix:
- Apply `permissions: { contents: read }` to secure the repository assets.
- Previously ci.yml file was having `permissions: write-all` which is not good for security reasons.


## Recommended Improvements
- (Wrong Command): Script `test-ci` was missing in `package.json`. Fix: Change to `npm test`.
- (Flaky Timestamp Test): Exact matching on `new Date().toISOString()` fails under network/processor latency in the runner. Fix: Verify timestamp validity or use regex match.

## Common Pitfals 
- Hardcoding fixed timestamps: Students might replace `new Date().toISOString()` with a static hardcoded ISO string. This will cause the test to fail immediately because the API returns the current server time dynamically.

- Missing `needs` keyword: Students might split the pipeline into two jobs (`lint` and `test`) but run them in parallel instead of sequentially. The `needs: lint` configuration is required.

- Applying `permissions: none`: While safe, this might break basic checkout checks. The standard best practice is `contents: read`.

