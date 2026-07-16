# Issue 1
- Run test Suite failed in github actions workflow with 
`npm error Missing script: "test-ci"`
- Inspected ci.yml and saw that the run statement has `npm run test-ci` which was incorrect and was not presrnt in .eslintrc also which was failing the workflow
- Solution: Change `npm ru test-ci` to `npm run test`

# Issue 2
* Flaky/ Failing test in `tests/app.test.js` (line ~16)
* **Symptom:** When the workflow test suite runs, it fails because the timestamp returned by the Express API doesn't exactly match the execution time of the test runner:
  ```text
  Expected: "2026-06-29T12:00:00.000Z"
  Received: "2026-06-29T12:00:00.005Z"
  ```
* **Diagnosis:** Dynamic values like timestamps must not be asserted via exact value equivalence in tests due to processing latency (especially on shared CI runners).
* **Fix:** Replaced the exact match with a regex pattern test or verify that the value is defined and is a valid ISO string. For example:
  ```javascript
  expect(res.body.timestamp).toBeDefined();
  expect(new Date(res.body.timestamp).getTime()).not.toBeNaN();
  ```