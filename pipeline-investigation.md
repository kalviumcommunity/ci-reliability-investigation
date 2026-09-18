## Issue 1:
The workflow runner is itself failing before finishing the script because the package.json only defines the `test` and `lint` scripts so we will change the run command to `npm run test`

## Issue 2:
When the workflow test suite runs, it fails because the timestamp returned by the Express API doesnt exactly match the execution time of the test runner so we will replacethe exact match with a regex pattern test or verfiy that the value is defined and is a valid ISO string.

## Issue 3:
Broad CI/CD Workflow permissions - it contains the permissions set to write-all so we will reduce the permssions to the minimum necessary.