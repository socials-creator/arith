# Arithmetic Pro v12.2

An offline-ready, lightweight mental arithmetic speed game. No build tools or backend required.

## Run

Open `index.html` in a browser to try the page. For full PWA/offline installation, serve the folder over HTTPS (e.g. GitHub Pages) or localhost, because service workers do not operate on normal `file://` pages. Upload **all** files together, preserving names. `readme.html` is the in-app guide; open it from the **Guide** link.

## Play

1. Select the duration: 30 seconds, 1, 2, 5, 10, 15, or 20 minutes.
2. Optionally configure addition, subtraction, multiplication, division, and operand ranges in Settings.
3. Tap Start. Enter the result; a correct complete answer is accepted automatically.
4. The countdown continues until the session ends. Review your score and response speeds.

## Scoring

- Answer in under 3 seconds: **8 points**.
- 3 through under 5 seconds: **4 points**.
- 5 through 7 seconds: **2 points**.
- Over 7 seconds: **1 point**.
- No penalty for wrong/partial keystrokes. An answer is submitted only when its numeric value equals the solution.
- The game does not wait for Enter; typing the correct number finishes that question.

## Fairness and question variety

- Enabled operations are shuffled into balanced decks; each enabled operation appears once per deck cycle.
- Difficulties are dealt from a shuffled 20-question distribution: easy 3, medium 5, hard 6, very hard 6 (15%/25%/30%/30%). The bands select progressively higher operand ranges.
- Subtraction shows nonnegative differences; division always resolves to an integer.
- **New in v12.2:** The last **600** question identities persist in local browser storage across sessions. Questions that simply swap addition or multiplication operands count as the *same* problem.
- Each new question samples up to **72 candidates**, preferring an unseen equation. If all sampled questions have been seen, the least-recently-used one is preferred. Identical expressions may still recur in very small configured ranges or once the pool is exhausted. This is intentional and prevents the game freezing.
- Difficulty and operation decks reset for a new game, but the anti-repeat question memory *does not* reset.

## History / personal bests

- Last 10 games are displayed; up to 100 previous entries remain in browser storage for migration/continuity.
- Personal bests are stored independently by duration; they are not lost when recent history is trimmed.
- Previous v4 best scores and previous settings are preserved using the existing storage keys.
- Scores do not currently distinguish different selected operation/range settings.

## Files

- `index.html` — game, styles, and JavaScript.
- `readme.html` — human-friendly in-app guide.
- `README.md` — source/deployment documentation.
- `manifest.json` — PWA installation metadata.
- `sw.js` — offline service worker with a v12.2 cache version.
- `icon.png`, `icon-192.png` — app icons.

## Privacy and storage

No account, analytics, tracking, or network-backed scores. Settings, history, bests, and recent-question memory live in localStorage on the device/browser where you play. Clearing site data removes them; private browsing might not retain them.

## Update notes

v12.2 focuses on avoiding question repetition between games and adds a readable built-in guide, without modifying speed points, UI layout, existing records, or PWA install behavior. After deploying, fully reload the page once to pick up an updated service worker if an older release is cached.

## Offline readiness indicator (v12.2)

A small status badge below the app title checks every required file in the active service worker cache (including the guide, manifest and icons). **Ready offline ✓** means those files are cached. Tap the badge to verify again and, when connected, retry caching missing resources. On unsupported browsers or when installation is incomplete, the badge explains that offline mode is not yet verified. To test: load the app online over HTTPS, wait for the green badge, enable Airplane Mode, and reopen both the game and guide. iOS may still purge stored browser data under storage pressure.
