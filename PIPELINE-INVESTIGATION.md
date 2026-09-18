# Root Issue
# The  main issue identified

- after checking all workflow logs in github actions on the checking all the successful and unsucessful logs 
i found out the issue is in the run tests suite the pipeline is if failed while running npm test -ci

## supporting evidences
I verified all this issue after verifing the github actions and then i found out it is finally on npm run test -ci and i also confirm this also that after checking the workflow.yml file which takes to run this command and which is not correct. 
- Exact matching on `new Date().toISOString()` fails under network/processor latency in the runner. Fix: Verify timestamp validity or use regex match.