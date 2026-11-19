# Pipeline Investigation

## Scope and evidence

This investigation is based on the checked-in workflow, package scripts, API implementation, and test, and was reproduced locally. GitHub Actions run logs are not included in this workspace, so the local results below should not be mistaken for a specific GitHub Actions run.

## Issue 1: The workflow invokes a missing npm script

The workflow's **Run Test Suite** step runs `npm run test-ci` (`.github/workflows/ci.yml`). The `package.json` scripts define `test` and `lint`, but no `test-ci` script. Running the configured command locally reproduced the npm error `Missing script: "test-ci"` and a non-zero exit code before Jest ran.

**Proposed fix:** Change the workflow command to `npm test` (or `npm run test`) so it invokes the script that is actually defined.

## Issue 2: The timestamp test depends on an exact millisecond match

The API generates `timestamp` with `new Date().toISOString()` when handling the request (`src/utils.js`). The test independently calls `new Date().toISOString()` after receiving the response, then expects the two strings to be identical (`tests/app.test.js`). A local `npm test` run reproduced this failure: the expected timestamp ended in `.866Z`, while the API response ended in `.843Z`. The 23 ms difference came from elapsed time between the two clock reads, not an unhealthy endpoint. Runner or network latency can make this mismatch more likely.

**Proposed fix:** Test the timestamp's presence and validity instead of comparing it with a separately generated current time. For example, assert that it is defined and that `new Date(res.body.timestamp).getTime()` is not `NaN`.

## Reliability impact

The missing script prevents the test command from starting at all. Once that command is corrected, the exact-time assertion can still fail nondeterministically due to ordinary execution latency. Together, these issues make CI results unreliable: one is a deterministic configuration failure, and the other is a timing-sensitive false failure.
