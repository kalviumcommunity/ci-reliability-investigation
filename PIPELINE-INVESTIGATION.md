# Errors:

1. The first error is within the github/workflows/ci.yml file. In line 33, there is the line: "run: npm run test-ci". This would however throw an error because in the package.json file, only test and lint is given...Not test-ci. The workflow execution fails during the test stage with: `npm ERR! missing script: test-ci`

2. The second error is also within the github/workflows/ci.yml file. The workflow contains the line: `permissions: write-all`. This grants the GitHub Actions workflow runner write access to all scopes (contents, pull requests, packages etc). If a malicious dependency is loaded or a pull request executes untrusted code, the repository or credentials could be compromised

3. The third error is within the test/app.test.js. This file will also fail due to the fact that when the workflow test runs, it fails because the timestamp returned by Express API is not the same as the execution time of the test runner. Dynamic values like timestamps should not be given an exact value  in tests due to latency.