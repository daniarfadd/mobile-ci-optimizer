# ci-optimizer
CI Pipeline Optimization using Playwright

### Problem

CI pipelines are slow due to:
- Sequential execution
- No caching

### Solution
- Parallel test execution
- Dependency caching
- Browser caching

## Architecture
### CI Pipeline Architecture

```text
                    ┌──────────────────────┐
                    │   Developer Pushes   │
                    │   Code / Open PR     │
                    └──────────┬───────────┘
                               │
                               ▼
                 ┌──────────────────────────┐
                 │ GitHub Actions Triggered │
                 │ (push / pull_request)    │
                 └──────────┬───────────────┘
                            │
                            ▼
              ┌──────────────────────────────┐
              │ Create Ubuntu Runner Machine │
              │      ubuntu-latest           │
              └──────────┬───────────────────┘
                         │
                         ▼
          ┌────────────────────────────────────┐
          │ Checkout Repository Source Code   │
          │ actions/checkout@v4               │
          └────────────────┬──────────────────┘
                           │
                           ▼
         ┌─────────────────────────────────────┐
         │ Setup Node.js Environment           │
         │ actions/setup-node@v4               │
         │ Node Version: 18                    │
         │ Enable NPM Cache                    │
         └────────────────┬────────────────────┘
                          │
                          ▼
          ┌───────────────────────────────────┐
          │ Install Dependencies              │
          │ npm ci                            │
          │ (Fast & Clean Installation)       │
          └────────────────┬──────────────────┘
                           │
                           ▼
        ┌───────────────────────────────────────┐
        │ Matrix Strategy Starts                │
        │ Parallel Browser Execution            │
        └───────────────┬───────────────────────┘
                        │
        ┌───────────────┴────────────────┐
        │                                │
        ▼                                ▼

┌───────────────────────┐    ┌───────────────────────┐
│ Chromium Job          │    │ WebKit Job            │
├───────────────────────┤    ├───────────────────────┤
│ Install Browser       │    │ Install Browser       │
│ playwright chromium   │    │ playwright webkit     │
├───────────────────────┤    ├───────────────────────┤
│ Run Playwright Tests  │    │ Run Playwright Tests  │
│ --project=chromium    │    │ --project=webkit      │
└───────────┬───────────┘    └───────────┬───────────┘
            │                            │
            └────────────┬───────────────┘
                         │
                         ▼
        ┌─────────────────────────────────────┐
        │ Upload Playwright HTML Reports      │
        │ actions/upload-artifact@v4          │
        └────────────────┬────────────────────┘
                         │
                         ▼
              ┌──────────────────────────┐
              │ CI Pipeline Completed    │
              │ Reports Available        │
              └──────────────────────────┘
```

---

# CI Optimization Summary

| Optimization | Purpose | Impact |
|---|---|---|
| Matrix Strategy | Run browsers in parallel | Faster execution |
| npm ci | Clean dependency install | Faster & stable installs |
| NPM Cache | Reuse dependencies between runs | Reduce install time |
| Targeted Browser Install | Install only required browsers | Reduce setup overhead |
| Parallel Browser Testing | Separate execution per browser | Improve CI speed |
| Artifact Upload | Store test reports | Easier debugging |

---

# Pipeline Runtime Improvement

| Version | Runtime |
|---|---|
| Baseline CI | 3m 37s |
| Optimized CI | 1m 30s |

### Performance Gain
- Reduced CI runtime by approximately **58.5%**
- Achieved using:
  - Parallel browser execution
  - Dependency caching
  - Optimized package installation
  - Targeted Playwright browser installation

---

# Workflow Overview

1. Developer pushes code or opens a pull request
2. GitHub Actions triggers the workflow
3. Ubuntu runner environment is created
4. Repository source code is checked out
5. Node.js environment is configured with dependency caching
6. Dependencies are installed using `npm ci`
7. Browser matrix execution starts:
   - Chromium tests run in parallel
   - WebKit tests run in parallel
8. Playwright reports are uploaded as artifacts
9. CI pipeline finishes and reports become available


### Key Learnings
- Parallelization impact
- Cache strategy
- CI bottlenecks
