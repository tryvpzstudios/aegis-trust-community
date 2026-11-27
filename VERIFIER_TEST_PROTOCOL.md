# Browser Verifier Test Protocol

## Known-answer vectors
- Empty UTF-8 input → SHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
- ASCII `abc` → SHA-256: ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad

## Prototype UI manual checks
1. Open `verifier.html` over HTTPS or localhost in a modern browser.
2. Select a zero-byte file; confirm output hash equals the empty-input vector.
3. Create a file containing exactly `abc` (no newline); confirm hash equals the ASCII vector.
4. Repeat using drag-and-drop.
5. Export JSON; inspect fields and ensure `uploaded:false` and limitations exist.
6. Test a larger file; note device/browser memory and responsiveness.
7. Test copy button. If browser permissions block it, manual-copy fallback should be visible.
8. Test unsupported/blocked crypto context; failure message must not claim a successful check.

## Interpretation
These vectors test the SHA-256 primitive in the browser. They do not yet constitute full UI, privacy, C2PA, signature, source-authenticity, or production-security validation.
