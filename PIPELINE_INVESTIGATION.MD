**Issue 1 ( Wrong Command )**
Changed the command 'npm run test-ci' to 'npm run test'. 'test-ci' was missing in package.json.

**Issue 2 (Flaky Timestamp Test)**
Exact matching on newDate().toISOString() fails under network latency in the runner.


