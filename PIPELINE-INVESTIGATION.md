# Root Issue
## The main issue Identified 
-After Checking all workflow logs in Github Actions on checking all successfull and unsecesfull logs I found that there is a issue in the Run Test suite the pipeline if failed while running npm test-ci

## Supporting evidences 
- I verified all these issue after verifying the github actions and then I found out it is failing on npm run test-ci and I also confirmed this after checking the workflow yml file which tells to run this command and which is not correct .

- Exact matching on `new Date().toISOString()` fails under network/processor latency in the runner. Fix: Verify timestamp validity or use regex match.