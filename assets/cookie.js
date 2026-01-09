document.addEventListener("DOMContentLoaded", function () {
    const COOKIE_NAME = "digitallwork_cookie_consent_v2";
    const PIXEL_ID = "3857575907663677";

    function loadMetaPixel() {
        if (window.fbq) return;

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
    }

    const consent = localStorage.getItem(COOKIE_NAME);

    if (consent === "true") {
        loadMetaPixel();
    } else if (consent === null) {
        showCookieBanner();
    }

    function showCookieBanner() {
        const banner = document.createElement("div");
        // Increased prominence: more padding, larger shadow, distinct border, z-index max
        banner.className = "fixed bottom-0 left-0 right-0 bg-white border-t-4 border-primary shadow-[0_-20px_60px_rgba(0,0,0,0.15)] z-[99999] p-6 md:p-8 animate-fade-up";
        banner.style.display = "block";
        banner.innerHTML = `
            <div class="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div class="space-y-2 text-center md:text-left">
                    <p class="text-base md:text-lg text-gray-800 font-medium leading-relaxed">
                        Az oldal <strong>sütiket (cookie-kat)</strong> használ a legjobb felhasználói élmény és a mérések érdekében.
                    </p>
                    <p class="text-sm text-gray-500">
                        A "Elfogadom" gombbal hozzájárulsz a Meta Pixel használatához. 
                        <a href="https://digitallwork.hu/adatkezelesi-tajekoztato/digitallwork-hu-kft/" target="_blank" class="underline text-primary hover:text-primary-text font-bold">Adatkezelési tájékoztató</a>.
                    </p>
                </div>
                <div class="flex gap-4 shrink-0 w-full md:w-auto">
                    <button id="cookie-reject" class="flex-1 md:flex-none px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 text-base transition-colors">Elutasítom</button>
                    <button id="cookie-accept" class="flex-1 md:flex-none px-8 py-3 rounded-xl bg-[#8420cf] text-white font-bold hover:scale-105 active:scale-95 text-base shadow-lg shadow-primary/30 transition-all">Elfogadom</button>
                </div>
            </div>
            <style>
                @keyframes fadeUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-fade-up { animation: fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            </style>
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
