"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[924],{7161:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"getting-started","title":"Getting Started","description":"Getting started with Sentry Testkit","source":"@site/docs/getting-started.md","sourceDirName":".","slug":"/getting-started","permalink":"/sentry-testkit/docs/getting-started","draft":false,"unlisted":false,"editUrl":"https://github.com/zivl/sentry-testkit/blob/master/website/docs/docs/getting-started.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"title":"Getting Started","description":"Getting started with Sentry Testkit","sidebar_position":1},"sidebar":"tutorialSidebar","next":{"title":"API Reference","permalink":"/sentry-testkit/docs/api/"}}');var r=n(4848),i=n(8453);const o={title:"Getting Started",description:"Getting started with Sentry Testkit",sidebar_position:1},a="Getting Started",c={},l=[{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2},{value:"Using with Puppeteer",id:"using-with-puppeteer",level:3},{value:"Reset between tests",id:"reset-between-tests",level:3}];function d(e){const t={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"getting-started",children:"Getting Started"})}),"\n",(0,r.jsx)(t.h2,{id:"installation",children:"Installation"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:"npm:"})}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{children:"npm install sentry-testkit --save-dev\n"})}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:"yarn:"})}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{children:"yarn add sentry-testkit --dev\n"})}),"\n",(0,r.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-javascript",children:"// some.spec.js\nconst sentryTestkit = require('sentry-testkit')\n\nconst {testkit, sentryTransport} = sentryTestkit()\n\n// initialize your Sentry instance with sentryTransport\nSentry.init({\n    dsn: 'some_dummy_dsn',\n    transport: sentryTransport,\n    //... other configurations\n})\n\ntest('collect error events', function () {\n  // run any scenario that eventually calls Sentry.captureException(...)\n  expect(testkit.reports()).toHaveLength(1)\n  const report = testkit.reports()[0]\n  expect(report).toHaveProperty(...)\n});\n\n// Similarly for performance events\ntest('collect performance events', function () {\n  // run any scenario that eventually calls Sentry.startTransaction(...)\n  expect(testkit.transactions()).toHaveLength(1)\n});\n"})}),"\n",(0,r.jsxs)(t.h3,{id:"using-with-puppeteer",children:["Using with ",(0,r.jsx)(t.a,{href:"https://pptr.dev/",children:"Puppeteer"})]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-javascript",children:"const sentryTestkit = require('sentry-testkit')\n\nconst {testkit} = sentryTestkit()\n\ntestkit.puppeteer.startListening(page);\n\n// Run any scenario that will call Sentry.captureException(...), for example:\nawait page.addScriptTag({ content: `throw new Error('An error');` });\n\nexpect(testkit.reports()).toHaveLength(1)\n\nconst report = testkit.reports()[0]\nexpect(report).toHaveProperty(...)\n\ntestkit.puppeteer.stopListening(page);\n"})}),"\n",(0,r.jsxs)(t.admonition,{type:"info",children:[(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:"startListening"})," has an optional ",(0,r.jsx)(t.code,{children:"baseUrl"})," as second parameter (it defaults to '",(0,r.jsx)(t.a,{href:"https://sentry.io",children:"https://sentry.io"}),"'), so you can pass the URL of your server:"]}),(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-javascript",children:"testkit.puppeteer.startListening(page, 'https://my-self-hosted-sentry.com');\n"})})]}),"\n",(0,r.jsx)(t.h3,{id:"reset-between-tests",children:"Reset between tests"}),"\n",(0,r.jsxs)(t.p,{children:["As you might run more than one test with ",(0,r.jsx)(t.em,{children:"Sentry"})," and ",(0,r.jsx)(t.em,{children:"Sentry-Testkit"}),", you might want to use the ",(0,r.jsx)(t.code,{children:"reset"})," function in between tests.\nUsually, your testing framework will have a hook for that kind of action. In the following example, We're using ",(0,r.jsx)(t.a,{href:"https://jestjs.io/docs/en/api.html",children:"Jest"}),"'s hooks: ",(0,r.jsx)(t.code,{children:"beforeEach"}),", ",(0,r.jsx)(t.code,{children:"beforeAll"})]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-javascript",children:"beforeEach(function(){\n    testkit.reset()\n})\n"})}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-javascript",children:"beforeAll(function(){\n    testkit.reset()\n})\n"})}),"\n",(0,r.jsxs)(t.p,{children:["You may see more usage examples in the ",(0,r.jsx)(t.a,{href:"https://github.com/zivl/sentry-testkit/tree/master/test",children:"testing section"})," of ",(0,r.jsx)(t.code,{children:"sentry-testkit"})," repository as well"]}),"\n",(0,r.jsx)(t.admonition,{type:"tip",children:(0,r.jsxs)(t.p,{children:["Pay attention that Sentry reports the events asynchronously.\nEven though ",(0,r.jsx)(t.code,{children:"captureException"})," is synchronous function and you can get the ",(0,r.jsx)(t.code,{children:"eventId"})," right away, the reporting itself still goes to an asynchronous flow.\nHence, it depends what you are testing and the chain of events caused by your test case scenario,\nyou will may need to use ",(0,r.jsx)(t.code,{children:"async/await"})," and tools like ",(0,r.jsx)(t.a,{href:"https://github.com/wix/wix-eventually",children:(0,r.jsx)(t.code,{children:"wix-eventually"})})," or ",(0,r.jsx)(t.a,{href:"https://www.npmjs.com/package/wait-for-expect",children:(0,r.jsx)(t.code,{children:"waitForExpect"})})]})})]})}function h(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>a});var s=n(6540);const r={},i=s.createContext(r);function o(e){const t=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(i.Provider,{value:t},e.children)}}}]);