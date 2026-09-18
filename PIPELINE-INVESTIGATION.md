## INVESTIGATION FINDINGS 

1. The Pipeline failed as seen in GitHub Actions, when I made changes in the `src/app.js` file, and pushed the changes to the GitHub repository, following is the snaphot of the pipeline failure:

2. Pipeline is failing because in the ci.ymi file we have ""INTENTIONAL BUG: Executing 'test-ci' which does not exist in package.json
This is causing to fail the pipeline immediately.

```

  "name": "ci-reliability-investigation",
  "version": "1.0.0",
  "description": "CI Reliability Investigation Challenge for DevOps Engineering Continuous Assessment",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "test": "jest",
    "lint": "eslint src/**/*.js"
  },
  "dependencies": {
    "express": "^4.19.2"
  },


```
