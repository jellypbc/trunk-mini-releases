if(!self.define){let e,s={};const a=(a,t)=>(a=new URL(a+".js",t).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(t,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let i={};const r=e=>a(e,c),o={module:{uri:c},exports:i,require:r};s[c]=Promise.all(t.map((e=>o[e]||r(e)))).then((e=>(n(...e),i)))}}define(["./workbox-6316bd60"],(function(e){"use strict";importScripts("worker-sZ7JcoWrU14JwZ8HlaEHU.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/123-bb438f70b3b39d94.js",revision:"bb438f70b3b39d94"},{url:"/_next/static/chunks/1606726a-8fa248d7b973e506.js",revision:"8fa248d7b973e506"},{url:"/_next/static/chunks/299-6cd3cb9baea02746.js",revision:"6cd3cb9baea02746"},{url:"/_next/static/chunks/377.beb08e1f9ba00d60.js",revision:"beb08e1f9ba00d60"},{url:"/_next/static/chunks/387.6c75d514a7e0d4ec.js",revision:"6c75d514a7e0d4ec"},{url:"/_next/static/chunks/393-58e57a38d5376621.js",revision:"58e57a38d5376621"},{url:"/_next/static/chunks/431-c516125e0caf1e40.js",revision:"c516125e0caf1e40"},{url:"/_next/static/chunks/792-cc0f44e2367e431e.js",revision:"cc0f44e2367e431e"},{url:"/_next/static/chunks/803-aa2b8a78627c29a4.js",revision:"aa2b8a78627c29a4"},{url:"/_next/static/chunks/905.6766dd8829c61320.js",revision:"6766dd8829c61320"},{url:"/_next/static/chunks/948.68c34492afa17099.js",revision:"68c34492afa17099"},{url:"/_next/static/chunks/framework-5f4595e5518b5600.js",revision:"5f4595e5518b5600"},{url:"/_next/static/chunks/main-de19382865b6a2ff.js",revision:"de19382865b6a2ff"},{url:"/_next/static/chunks/pages/_app-95732b14264a9d0d.js",revision:"95732b14264a9d0d"},{url:"/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"2280fa386d040b66"},{url:"/_next/static/chunks/pages/d/%5Bid%5D-0736e6900e82ffab.js",revision:"0736e6900e82ffab"},{url:"/_next/static/chunks/pages/index-bb0545abd35eb754.js",revision:"bb0545abd35eb754"},{url:"/_next/static/chunks/pages/reindex-09c0901346b82ec1.js",revision:"09c0901346b82ec1"},{url:"/_next/static/chunks/pages/t/%5Bid%5D-00bd10752a73a4ec.js",revision:"00bd10752a73a4ec"},{url:"/_next/static/chunks/pages/t/%5Bid%5D/settings-8038ab14cd8a1953.js",revision:"8038ab14cd8a1953"},{url:"/_next/static/chunks/pages/workspace-8bfd39d94a3a4726.js",revision:"8bfd39d94a3a4726"},{url:"/_next/static/chunks/pages/workspace/%5Bid%5D-4f13e5f2c6eb84b4.js",revision:"4f13e5f2c6eb84b4"},{url:"/_next/static/chunks/pages/workspace/%5Bid%5D/%5BitemID%5D-4007fbf2d28762b7.js",revision:"4007fbf2d28762b7"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-a329838f44ee1ebe.js",revision:"a329838f44ee1ebe"},{url:"/_next/static/css/007d2745a0c2d36b.css",revision:"007d2745a0c2d36b"},{url:"/_next/static/css/87dba36d38981fdb.css",revision:"87dba36d38981fdb"},{url:"/_next/static/css/88e0684444076d12.css",revision:"88e0684444076d12"},{url:"/_next/static/css/c093d6d2f2d9dd05.css",revision:"c093d6d2f2d9dd05"},{url:"/_next/static/css/d331c836776850f9.css",revision:"d331c836776850f9"},{url:"/_next/static/css/e24b495f9a47a709.css",revision:"e24b495f9a47a709"},{url:"/_next/static/sZ7JcoWrU14JwZ8HlaEHU/_buildManifest.js",revision:"17821defc2a1b78b6a6dfac3512b14cd"},{url:"/_next/static/sZ7JcoWrU14JwZ8HlaEHU/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/sZ7JcoWrU14JwZ8HlaEHU/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
