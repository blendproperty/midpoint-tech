## 2026-10-27 - Node.js 22.23.4 runtime patch candidate

- **Implementation:** pin the actual application Docker stages to official Node 22.23.4 Alpine OCI digest; qualify the built runtime in CI. Move end-of-life Node 20 to supported Node 22, subject to compatibility checks. Existing tests and production build remain required. No business features, dependencies, schemas, secrets, provider, permission or network settings change.
- **Testing:** preparation/configuration checks only; hosted regression and actual Docker image checks pending. No local Node version is substituted for production qualification.
- **Commit/push:** isolated codex/node-patch-20261027 candidate; exact pushed SHA and remote context readback recorded after publication. Existing local work preserved.
- **Merge:** draft PR pending normal passing checks and repository review requirements.
- **Deployment/configuration:** pending established release; retain previous running image and checkout for rollback before restart. FOND already runs patched 24.22.1; its change makes that runtime reproducible. No deployment is claimed by this candidate record.
- **Live production verification:** pending exact production commit/image, in-container Node version, health and read-only public application routes; CI runner version alone is not evidence. Check companion workers where present.
- **Retained gates:** all existing customer/staff/device/UAT, source-data, provider delivery, finance, signing/payment, legal/privacy, training, physical-access, offline, recovery and approval gates remain. No real transactions or outbound test messages. No tracker in scope.

# Midpoint Tech project context

