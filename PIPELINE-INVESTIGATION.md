These are the two issues when I create the PR 
* **Issue 1 (Wrong Command):** Script `test-ci` was missing in `package.json`.
* **Issue 2 (Flaky Timestamp Test):** Exact matching on `new Date().toISOString()` fails under network/processor latency in the runner. 

Fixes :
**1.** To fix the first issue I edit ci.yml from run: npm run test-ci to  run: npm test

**2.** To Fix the second issue I Verify timestamp validity or use regex match.