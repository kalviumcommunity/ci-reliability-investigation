## Safety Concern:
Use of `permissions: write-all` in `.github/workflows/ci.yml`.

## Risk: 
Anyone triggering the workflow (including via fork PRs or compromised dependency scripts) runs code with write capabilities to the repo.

## Fix:
Apply `permissions: { contents: read }` to secure the repository assets.