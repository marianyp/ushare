if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return c[e]||(s=new Promise(async s=>{if("document"in self){const c=document.createElement("script");c.src=e,document.head.appendChild(c),c.onload=s}else importScripts(e),s()})),s.then(()=>{if(!c[e])throw new Error(`Module ${e} didn’t register its module`);return c[e]})},s=(s,c)=>{Promise.all(s.map(e)).then(e=>c(1===e.length?e[0]:e))},c={require:Promise.resolve(s)};self.define=(s,a,i)=>{c[s]||(c[s]=Promise.resolve().then(()=>{let c={};const n={uri:location.origin+s.slice(1)};return Promise.all(a.map(s=>{switch(s){case"exports":return c;case"module":return n;default:return e(s)}})).then(e=>{const s=i(...e);return c.default||(c.default=s),c})}))}}define("./sw.js",["./workbox-e032be30"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/",revision:"JmEQG8llJDfa0sw2AytV1"},{url:"/_next/static/JmEQG8llJDfa0sw2AytV1/_buildManifest.js",revision:"4aa41ac63a4815c7f96c042bd85374d0"},{url:"/_next/static/JmEQG8llJDfa0sw2AytV1/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/_next/static/JmEQG8llJDfa0sw2AytV1/pages/%5Bid%5D.js",revision:"791bb818c9ac85ac913a8eef48e715b7"},{url:"/_next/static/JmEQG8llJDfa0sw2AytV1/pages/_app.js",revision:"c9b6ab2a1aa3c6b017933c6adb84b780"},{url:"/_next/static/JmEQG8llJDfa0sw2AytV1/pages/_error.js",revision:"75325e0d79c20a5a223001964c0c7a94"},{url:"/_next/static/JmEQG8llJDfa0sw2AytV1/pages/index.js",revision:"5388e2638c3cd90d3b096a8f945b516e"},{url:"/_next/static/chunks/8a3a723d0d6796563366a65e87dd4b8c9e5ba7bc.0ddaec115e41be7c9561.js",revision:"8edb8a8a2683fd614eeba6f7136d7bb5"},{url:"/_next/static/chunks/f0676cb8f52ce1979a60881a67886f9fd61e8f69.35c210dc2459603e7a99.js",revision:"dcb2c39f053fb49c481939c09a7e1820"},{url:"/_next/static/chunks/framework.4dd1003cc9c949c7fcd3.js",revision:"8dbfd54516c12914d3e0cd417cd67882"},{url:"/_next/static/chunks/styles.3f17340e.chunk.css",revision:"51526d0a2f5b1ac335ee2f4388226cec"},{url:"/_next/static/chunks/styles.f3086f9dcecd2d587bcb.js",revision:"0d7b7daf6096e17dfbbf39a50fca5ebf"},{url:"/_next/static/runtime/main-b5ee018a4c879d5e1858.js",revision:"46d2185a512d61c96aaaea3fe6571123"},{url:"/_next/static/runtime/polyfills-956d2d13be906d60c371.js",revision:"2b337e2454b7df364304c4573afeb181"},{url:"/_next/static/runtime/webpack-83bd83ab777f80a6c75c.js",revision:"f5e6e2fca3144cc944812cfa3547f475"},{url:"/favicon.png",revision:"0ebc3910af134c8bb39c20e12ec1247e"},{url:"/form_platforms/facebook.svg",revision:"d9108f4581bf7ea3ac9a91b5b6158958"},{url:"/form_platforms/instagram.svg",revision:"a2a7684251df32482c62fb6d735cdd40"},{url:"/form_platforms/twitter.svg",revision:"3ead27c1c164d9fc82042c95c2edbac9"},{url:"/form_platforms/unknown.svg",revision:"cfa3548d5f983a8ee902478da46ac5ed"},{url:"/images/icons/icon-128x128.png",revision:"0de6c93efc230714e0b8d342e5a52c16"},{url:"/images/icons/icon-144x144.png",revision:"a2262f4a0a9608c63eee9a8fea26fc7a"},{url:"/images/icons/icon-152x152.png",revision:"be2b7ff6eeff8c3f1cc28e2e37efbced"},{url:"/images/icons/icon-192x192.png",revision:"1cddc56ed678cdcb70c759b3e519e85c"},{url:"/images/icons/icon-384x384.png",revision:"e7d4b306a0b2fbb6fe2c6f40b6cb12c8"},{url:"/images/icons/icon-512x512.png",revision:"cd224428dc1de61e0e88be59736cb301"},{url:"/images/icons/icon-72x72.png",revision:"7d57d7b8afe495bd5a6f97308d0f14e1"},{url:"/images/icons/icon-96x96.png",revision:"0189bac56d916b77b0bc735724ba5172"},{url:"/manifest.json",revision:"688128be216cc2f753fe641590f2fcd3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/use\.fontawesome\.com\/releases\/.*/i,new e.CacheFirst({cacheName:"font-awesome",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.StaleWhileRevalidate({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.StaleWhileRevalidate({cacheName:"others",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
