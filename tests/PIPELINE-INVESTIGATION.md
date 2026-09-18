tudents should explain:
* **Issue 1 (Wrong Command):** Script `test-ci` was missing in `package.json`. Fix: Change to `npm test`.
* **Issue 2 (Flaky Timestamp Test):** Exact matching on `new Date().toISOString()` fails under network/processor latency in the runner. Fix: Verify timestamp validity or use regex match.

I have changed  in CI.yml file in that i have changed the permission to read
I have made changes in app.test.js where i have changed the code in 17th line to expect(res.body.timestamp).toBeDefined();
I have made changes in app.test.js where i have changed the code in 18th line to     expect(new Date(res.body.timestamp).getTime()).not.toBeNaN();