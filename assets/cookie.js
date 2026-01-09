document.addEventListener("DOMContentLoaded", function () {
    const COOKIE_NAME = "digitallwork_cookie_consent_v2";
    const PIXEL_ID = "YOUR_PIXEL_ID"; // Cseréld le a valódi Pixel ID-ra

    function loadMetaPixel() {
        if (window.fbq) return; // Már betöltve

        !function (f, b, e, v, n, t, s) {
            if (f.fbq) return; n = f.fbq = function () {
                n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
            n.queue = []; t = b.createElement(e); t.async = !0;
            t.src = v; s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
        }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

        fbq('init', PIXEL_ID);
        fbq('track', 'PageView');
        console.log("Meta Pixel loaded");
    }

    // Check localStorage
    const consent = localStorage.getItem(COOKIE_NAME);

    if (consent === "true") {
        loadMetaPixel();
    } else if (consent === null) {
        showCookieBanner();
    }

    function showCookieBanner() {
        // Create banner HTML with Tailwind classes
        const banner = document.createElement("div");
        banner.className = "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-[9999] p-4 md:p-6";
        banner.style.display = "block"; // Ensure it's visible
        banner.innerHTML = `
            <div class="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <p class="text-sm text-gray-600 text-center md:text-left">
                    Az oldal harmadik féltől származó sütiket (cookie-kat) használ a felhasználói élmény javítása és a mérések érdekében (Meta Pixel). 
                    A "Elfogadom" gombra kattintva hozzájárulsz ezek használatához. 
                    <a href="https://digitallwork.hu/adatkezelesi-tajekoztato/digitallwork-hu-kft/" target="_blank" class="underline hover:text-primary">Adatkezelési tájékoztató</a>.
                </p>
                <div class="flex gap-3 shrink-0">
                    <button id="cookie-reject" class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 text-sm transition-colors">Elutasítom</button>
                    <button id="cookie-accept" class="px-4 py-2 rounded-lg bg-[#8420cf] text-white font-bold hover:opacity-90 text-sm shadow-md transition-all">Elfogadom</button>
                </div>
            </div>
        `;
        document.body.appendChild(banner);

        document.getElementById("cookie-accept").addEventListener("click", function () {
            localStorage.setItem(COOKIE_NAME, "true");
            loadMetaPixel();
            banner.style.display = "none";
        });

        document.getElementById("cookie-reject").addEventListener("click", function () {
            localStorage.setItem(COOKIE_NAME, "false");
            banner.style.display = "none";
        });
    }
});
