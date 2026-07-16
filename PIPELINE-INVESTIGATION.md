# Pipeline Investigation

## Issue 1

### Symptoms

Script test-ci was missing in package.json

### Diagnosis

The workflow used an invalid command, causing the runner to stop before completing.

### Fix

Replaced the incorrect command:

npm test


## Issue 2

### Symptoms

Flaky Timestamp Test Exact matching on `new Date().toISOString()` fails under network/processor latency in the runner. Fix: Verify timestamp validity or use regex match.

### Diagnosis

The test compared an exact timestamp, making it flaky.

### Fix

Validate that the timestamp exists or matches ISO format instead of comparing exact values.