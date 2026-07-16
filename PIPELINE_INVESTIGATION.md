# Investigating Workflow Failures

## 1. The issue identified:
    Inside  `.github/workflows/ci.yml` file, The workflow execution fails during the test stage with: `npm ERR! missing script: test-ci`. This was the issue identifies inside the file in line number ~33 and the workflow file executes `npm run test-ci`, but `package.json` only defines the `test` and `lint` scripts.

## 2. The evidence used:
    As the workflow file executes `npm run test-ci`, but `package.json` only defines the `test` and `lint` scripts, I have changes the run command to npm run test.

## 3. The reason why the issue affects reliability:
    The reason why the issue affects reliabity is that while executing it will fail the pipeline immediately as the test-ci does not exist in package.json.

---

## 1. Issue identifies: 
    Exact matching on `new Date().toISOString()` fails under network/processor latency in the runner. 

## 2. The evidence used: 
    Verified timestamp validity.

## 3. The reason why the issue affects the reliability:
    The reliability is affected as it fails under network/processor latency in the runner.
