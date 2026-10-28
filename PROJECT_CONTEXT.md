## 2026-10-28 - Verified Node 22.23.4 rollout (midpoint-tech)

- Implementation: supported patched Node 22.23.4 pinned by official Docker OCI digest; no business feature, schema, secret, credential, permission or network change. Existing validation retained and actual production image version asserted.
- Testing: source PR 5 at 5835ab4c7414f7783da5edf9bf84d5a5d8e7fe7e passed applicable regression, type/lint, production build and actual Docker image qualification. Prior failures and corrective evidence remain in the record. These are technical checks, not customer/business acceptance.
- Commit/push: scoped source and canonical context were published with remote context readback. Merge: normally checked PR 5 merged as b5f231577d77d34af75a68ee466140fa4f1c72ad. This evidence-only follow-up preserves all prior context and uses the established documentation-only [skip ci] path; it triggers no application release.
- Deployment/configuration: Normal gated deployment 40635047668 succeeded. Public health returned ok; actual production container is healthy, zero restarts and OOM false. Rollback image retained; applicable database backup readable, full restore not newly tested. Shared-host maintenance by a separate owner is not attributed to this application update.
- Live production verification: 2026-10-28T04:59:00.371611+00:00; actual running Node v22.23.4, image sha256:40a513c422e0476a053fbc3c78d52f1ecdf4c74ef99727faccdc279fa12b53f8. Evidence retained under the rollout workspace. Runtime and public HTTP checks are separate from CI runner versions. No real customer transaction, outbound test message or financial execution performed.
- Remaining gates: all prior staff/customer/device/UAT, property/source-data accuracy, provider delivery, signing/payment/settlement, legal/privacy, finance, training, physical-access, offline and full-recovery/approval gates remain open. No organisation migration or paused REA work. No external tracker in scope.


## 2026-10-27 - Node.js 22.23.4 runtime patch candidate

- **Implementation:** pin the actual application Docker stages to official Node 22.23.4 Alpine OCI digest; qualify the built runtime in CI. Move end-of-life Node 20 to supported Node 22, subject to compatibility checks. Existing tests and production build remain required. No business features, dependencies, schemas, secrets, provider, permission or network settings change.
- **Testing:** first hosted typecheck and unit tests passed; image build compiled and typechecked but its CI invocation omitted the existing required public-site build argument, causing an empty URL during page generation. Corrected CI to supply the current production public origin without changing application behavior. Final hosted image/version check pending; hosted regression and actual Docker image checks pending. No local Node version is substituted for production qualification.
- **Commit/push:** isolated codex/node-patch-20261027 candidate; exact pushed SHA and remote context readback recorded after publication. Existing local work preserved.
- **Merge:** draft PR pending normal passing checks and repository review requirements.
- **Deployment/configuration:** pending established release; retain previous running image and checkout for rollback before restart. FOND already runs patched 24.22.1; its change makes that runtime reproducible. No deployment is claimed by this candidate record.
- **Live production verification:** pending exact production commit/image, in-container Node version, health and read-only public application routes; CI runner version alone is not evidence. Check companion workers where present.
- **Retained gates:** all existing customer/staff/device/UAT, source-data, provider delivery, finance, signing/payment, legal/privacy, training, physical-access, offline, recovery and approval gates remain. No real transactions or outbound test messages. No tracker in scope.

# Midpoint Tech project context

