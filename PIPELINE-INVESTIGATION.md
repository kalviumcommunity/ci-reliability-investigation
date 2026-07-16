# Issue 1:
- Run test Suite failed in github actions workflow with 
`npm error Missing script: "test-ci"`
- Inspected ci.yml and saw that the run statement has `npm run test-ci` which was incorrect and was not presrnt in .eslintrc also which was failing the workflow
- Solution: Change `npm ru test-ci` to `npm run test`