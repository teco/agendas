# XP integration — September 9, 2026

User supplied events-xp.js, XP.png, XPDF192.png and XPDF512.png. Integrated in the requested order: events first (validated), images next, Sunday dinner removal last. Source and audits are preserved in the content workspace under integration-intake/xp and xp-work.

24 unchanged source records: Tuesday 7, Wednesday 9, Thursday 8. Complete 17-field contract; stable IDs; six existing conflict pairs retain both warnings. No internal account commentary found. This validates the supplied source and integration, not independent catalog research. One agenda, no track selector. Build with AGENDA_CLIENT=xp; separate local output dist-xp.

Header XP.png and PWA 192/512 icons are exact supplied opaque PNGs, published locally as /icons/xp-header-v1.png, /icons/xp-df192-v1.png and /icons/xp-df512-v1.png. Separate XP favorites and preference storage keys.

User confirmed the existing contacts and Tuesday reception, Dreamfest and Thursday dinner TBD; Sunday dinner is the exception. Client config sundayDinner:false removes Sunday dinner from shared plans, Home, Sunday and detail pages, dinner-only preferences, introductions, route checkpoints, duration text, related links and map legs/EPIC anchor. Shared records remain intact for existing clients. Unrelated SF content and conference collections stay shared.

The user approved the local preview and requested publication on September 9. Keep the original session wording: the later supplied revision changed five summaries and the user chose not to apply it. Publish first to an XP Cloudflare Pages project with AGENDA_CLIENT=xp and NODE_VERSION=22. Custom hostname is not yet selected. The shared changes passed 47 tests and all four client builds; browser checks passed. This branch also triggers the three existing Cloudflare projects.
