if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,t)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let i={};const r=e=>n(e,c),o={module:{uri:c},exports:i,require:r};s[c]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(t(...e),i)))}}define(["./workbox-6316bd60"],(function(e){"use strict";importScripts("worker-pdO-2YOIsTNmNJ7PnyMJV.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/1606726a-8fa248d7b973e506.js",revision:"8fa248d7b973e506"},{url:"/_next/static/chunks/299-6cd3cb9baea02746.js",revision:"6cd3cb9baea02746"},{url:"/_next/static/chunks/377.beb08e1f9ba00d60.js",revision:"beb08e1f9ba00d60"},{url:"/_next/static/chunks/387.6c75d514a7e0d4ec.js",revision:"6c75d514a7e0d4ec"},{url:"/_next/static/chunks/393-58e57a38d5376621.js",revision:"58e57a38d5376621"},{url:"/_next/static/chunks/431-c516125e0caf1e40.js",revision:"c516125e0caf1e40"},{url:"/_next/static/chunks/792-5ddfb217c81aa500.js",revision:"5ddfb217c81aa500"},{url:"/_next/static/chunks/905.6766dd8829c61320.js",revision:"6766dd8829c61320"},{url:"/_next/static/chunks/948.68c34492afa17099.js",revision:"68c34492afa17099"},{url:"/_next/static/chunks/950-7a9becd7bd29353b.js",revision:"7a9becd7bd29353b"},{url:"/_next/static/chunks/framework-5f4595e5518b5600.js",revision:"5f4595e5518b5600"},{url:"/_next/static/chunks/main-de19382865b6a2ff.js",revision:"de19382865b6a2ff"},{url:"/_next/static/chunks/pages/_app-86550f40079e3a76.js",revision:"86550f40079e3a76"},{url:"/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"2280fa386d040b66"},{url:"/_next/static/chunks/pages/d/%5Bid%5D-0736e6900e82ffab.js",revision:"0736e6900e82ffab"},{url:"/_next/static/chunks/pages/index-587c77271ee3fc10.js",revision:"587c77271ee3fc10"},{url:"/_next/static/chunks/pages/reindex-09c0901346b82ec1.js",revision:"09c0901346b82ec1"},{url:"/_next/static/chunks/pages/workspace-8bfd39d94a3a4726.js",revision:"8bfd39d94a3a4726"},{url:"/_next/static/chunks/pages/workspace/%5Bid%5D-4f13e5f2c6eb84b4.js",revision:"4f13e5f2c6eb84b4"},{url:"/_next/static/chunks/pages/workspace/%5Bid%5D/%5BitemID%5D-04dd362b1549bf99.js",revision:"04dd362b1549bf99"},{url:"/_next/static/chunks/pages/workspace/%5Bid%5D/settings-c21d29df6a179835.js",revision:"c21d29df6a179835"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-0cb43b9fb246821b.js",revision:"0cb43b9fb246821b"},{url:"/_next/static/css/007d2745a0c2d36b.css",revision:"007d2745a0c2d36b"},{url:"/_next/static/css/3ecd77351a123137.css",revision:"3ecd77351a123137"},{url:"/_next/static/css/a4422685726c8d2b.css",revision:"a4422685726c8d2b"},{url:"/_next/static/css/c093d6d2f2d9dd05.css",revision:"c093d6d2f2d9dd05"},{url:"/_next/static/css/d331c836776850f9.css",revision:"d331c836776850f9"},{url:"/_next/static/pdO-2YOIsTNmNJ7PnyMJV/_buildManifest.js",revision:"f43a0a0ee19b3a809451b9743919abe9"},{url:"/_next/static/pdO-2YOIsTNmNJ7PnyMJV/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/pdO-2YOIsTNmNJ7PnyMJV/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/download.svg",revision:"d5475dc97047ce9df1545b1d4cdb787c"},{url:"/logo192.png",revision:"197d36faeacda4e9d83525d64770b6c7"},{url:"/logo512.png",revision:"868559484b8ad39b0f1cc444bacd76b7"},{url:"/manifest.json",revision:"4eaa57355f9ab63d5a838cc7ab590215"},{url:"/porcorosso.gif",revision:"8f63fb4344acff1ae7d8e328f966606c"},{url:"/worker-sZ7JcoWrU14JwZ8HlaEHU.js.LICENSE.txt",revision:"783f14fa45b10e088e68f98251448010"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
