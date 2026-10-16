---
---
// Google Analytics 4. Kept in a file rather than an inline <script> because the
// site's Content-Security-Policy (default-src 'self' https:) blocks inline scripts.
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '{{ site.JB.analytics.google.tracking_id }}');
