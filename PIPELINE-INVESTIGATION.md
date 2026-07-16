Issue 1 (Wrong Command):
Script `test-ci` was missing in `package.json`. Fix: Change to `npm test`.

issue 2 (Flaky Timestamp Test):
Exact matching on `new Date().toISOString()` fails under network/processor latency in the runner. Fix: Verify timestamp validity or use regex match.


 Incorrect CI Test Command
* Location:`.github/workflows/ci.yml` (line ~28)
* Symptom: The workflow execution fails during the test stage with: `npm ERR! missing script: test-ci`.
* Diagnosis: The workflow file executes `npm run test-ci`, but `package.json` only defines the `test` and `lint` scripts.
* Expected Fix: Change the run command to `npm test` or `npm run test` in `.github/workflows/ci.yml`.

Flaky/Failing Test (Race Condition / Timestamp)
Location:`tests/app.test.js` (line ~16)
Symptom: When the workflow test suite runs, it fails because the timestamp returned by the Express API doesn't exactly match the execution time of the test runner:
  ```text
  Expected: "2026-06-29T12:00:00.000Z"
  Received: "2026-06-29T12:00:00.005Z"
  ```
 Diagnosis: Dynamic values like timestamps must not be asserted via exact value equivalence in tests due to processing latency (especially on shared CI runners).
Expected Fix: Replace the exact match with a regex pattern test or verify that the value is defined and is a valid ISO string. For example:
  ```javascript
  expect(res.body.timestamp).toBeDefined();
  expect(new Date(res.body.timestamp).getTime()).not.toBeNaN();
  ```