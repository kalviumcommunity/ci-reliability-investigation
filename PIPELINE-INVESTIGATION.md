# Pipeline Investigation

## Symptoms

The initial GitHub Actions run failed during the test stage. The runner
reported `npm ERR! missing script: test-ci`, and the test suite also contained
an assertion failure when the returned timestamp differed by a few
milliseconds from the timestamp created by the test.

## Diagnoses

1. The workflow ran `npm run test-ci`, but `package.json` defines `test`, not
   `test-ci`. This caused the runner to stop before the test script could run.
2. The API generates its timestamp dynamically with `new Date().toISOString()`.
   Comparing that value to a newly generated timestamp assumes both operations
   occur in the same millisecond. Runner and network latency make that
   assumption unreliable.

## Fixes

- The test job now runs the existing `npm test` script.
- The timestamp test now checks that the field exists and contains a valid
  date, rather than requiring an exact millisecond match.
- The workflow also runs linting in a separate `lint` job, and the `test` job
  runs only after linting succeeds.
