
### `CI-SAFETY-NOTES.md` Content
Students should explain:
* **Safety Concern:** Use of `permissions: write-all` in `.github/workflows/ci.yml`. helps to write everyone which creates security concern write permission sould only be given to admins or senior developer 
* **Risk:** Anyone triggering the workflow (including via fork PRs or compromised dependency scripts) runs code with write capabilities to the repo.
* I Fixed by  Apply `permissions: { contents: read }` to secure the repository assets.