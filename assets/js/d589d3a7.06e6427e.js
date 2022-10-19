"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[162],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>d});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),l=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),m=l(n),d=a,k=m["".concat(p,".").concat(d)]||m[d]||u[d]||i;return n?r.createElement(k,s(s({ref:t},c),{},{components:n})):r.createElement(k,s({ref:t},c))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,s=new Array(i);s[0]=m;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:a,s[1]=o;for(var l=2;l<i;l++)s[l]=n[l];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9390:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>u,frontMatter:()=>i,metadata:()=>o,toc:()=>l});var r=n(7462),a=(n(7294),n(3905));const i={title:"Getting Started",description:"Getting started with Sentry Testkit",sidebar_position:1},s="Getting Started",o={unversionedId:"getting-started",id:"getting-started",title:"Getting Started",description:"Getting started with Sentry Testkit",source:"@site/docs/getting-started.md",sourceDirName:".",slug:"/getting-started",permalink:"/sentry-testkit/docs/getting-started",draft:!1,editUrl:"https://github.com/wix/sentry-testkit/blob/master/website/docs/docs/getting-started.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"Getting Started",description:"Getting started with Sentry Testkit",sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"API Reference",permalink:"/sentry-testkit/docs/api/"}},p={},l=[{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2},{value:"Working with Jest",id:"working-with-jest",level:3},{value:"Using with Puppeteer",id:"using-with-puppeteer",level:3},{value:"Reset between tests",id:"reset-between-tests",level:3}],c={toc:l};function u(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"getting-started"},"Getting Started"),(0,a.kt)("h2",{id:"installation"},"Installation"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"npm:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"npm install sentry-testkit --save-dev\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"yarn:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"yarn add sentry-testkit --dev\n")),(0,a.kt)("h2",{id:"usage"},"Usage"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"// some.spec.js\nconst sentryTestkit = require('sentry-testkit')\n\nconst {testkit, sentryTransport} = sentryTestkit()\n\n// initialize your Sentry instance with sentryTransport\nSentry.init({\n    dsn: 'some_dummy_dsn',\n    transport: sentryTransport,\n    //... other configurations\n})\n\ntest('collect error events', function () {\n  // run any scenario that eventually calls Sentry.captureException(...)\n  expect(testkit.reports()).toHaveLength(1)\n  const report = testkit.reports()[0]\n  expect(report).toHaveProperty(...)\n});\n\n// Similarly for performance events\ntest('collect performance events', function () {\n  // run any scenario that eventually calls Sentry.startTransaction(...)\n  expect(testkit.transactions()).toHaveLength(1)\n});\n")),(0,a.kt)("h3",{id:"working-with-jest"},"Working with ",(0,a.kt)("a",{parentName:"h3",href:"https://jestjs.io/en/"},"Jest")),(0,a.kt)("p",null,"We've added a new option to integrate ",(0,a.kt)("inlineCode",{parentName:"p"},"sentry-testkit")," with ",(0,a.kt)("inlineCode",{parentName:"p"},"jest"),"'s mocking mechanism. Detailed implementation can be seen ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/wix/sentry-testkit/blob/master/src/jestMock.js"},"here"),"."),(0,a.kt)("p",null,"At the moment it is available only to ",(0,a.kt)("inlineCode",{parentName:"p"},"@sentry/browser")," package but we will expand to more packages as we should figure out how to do it right for all Sentry's client packages."),(0,a.kt)("p",null,"If you're using ",(0,a.kt)("inlineCode",{parentName:"p"},"Jest")," for testing, all you have to do in your ",(0,a.kt)("inlineCode",{parentName:"p"},"spec.js")," file is to import the Jest mock."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"// some.spec.js\nimport { testkit } from 'sentry-testkit/dist/jestMock';\n\ntest('something', function () {\n    // click\n    // clack\n    // BOOM!\n    expect(testkit.reports().length).toBeGreaterThan(0);\n});\n")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Make sure to put your ",(0,a.kt)("inlineCode",{parentName:"p"},"import")," statement before all other imports.")),(0,a.kt)("h3",{id:"using-with-puppeteer"},"Using with ",(0,a.kt)("a",{parentName:"h3",href:"https://pptr.dev/"},"Puppeteer")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"const sentryTestkit = require('sentry-testkit')\n\nconst {testkit} = sentryTestkit()\n\ntestkit.puppeteer.startListening(page);\n\n// Run any scenario that will call Sentry.captureException(...), for example:\nawait page.addScriptTag({ content: `throw new Error('An error');` });\n\nexpect(testkit.reports()).toHaveLength(1)\n\nconst report = testkit.reports()[0]\nexpect(report).toHaveProperty(...)\n\ntestkit.puppeteer.stopListening(page);\n")),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},(0,a.kt)("inlineCode",{parentName:"p"},"startListening")," has an optional ",(0,a.kt)("inlineCode",{parentName:"p"},"baseUrl")," as second parameter (it defaults to '",(0,a.kt)("a",{parentName:"p",href:"https://sentry.io'"},"https://sentry.io'"),"), so you can pass the URL of your server:"),(0,a.kt)("pre",{parentName:"admonition"},(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"testkit.puppeteer.startListening(page, 'https://my-self-hosted-sentry.com');\n"))),(0,a.kt)("h3",{id:"reset-between-tests"},"Reset between tests"),(0,a.kt)("p",null,"As you might run more than one test with ",(0,a.kt)("em",{parentName:"p"},"Sentry")," and ",(0,a.kt)("em",{parentName:"p"},"Sentry-Testkit"),", you might want to use the ",(0,a.kt)("inlineCode",{parentName:"p"},"reset")," function in between tests.\nUsually, your testing framework will have a hook for that kind of action. In the following example, We're using ",(0,a.kt)("a",{parentName:"p",href:"https://jestjs.io/docs/en/api.html"},"Jest"),"'s hooks: ",(0,a.kt)("inlineCode",{parentName:"p"},"beforeEach"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"beforeAll")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"beforeEach(function(){\n    testkit.reset()\n})\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"beforeAll(function(){\n    testkit.reset()\n})\n")),(0,a.kt)("p",null,"You may see more usage examples in the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/wix/sentry-testkit/tree/master/test"},"testing section")," of ",(0,a.kt)("inlineCode",{parentName:"p"},"sentry-testkit")," repository as well"),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"Pay attention that Sentry reports the events asynchronously.\nEven though ",(0,a.kt)("inlineCode",{parentName:"p"},"captureException")," is synchronous function and you can get the ",(0,a.kt)("inlineCode",{parentName:"p"},"eventId")," right away, the reporting itself still goes to an asynchronous flow.\nHence, it depends what you are testing and the chain of events caused by your test case scenario,\nyou will may need to use ",(0,a.kt)("inlineCode",{parentName:"p"},"async/await")," and tools like ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/wix/wix-eventually"},(0,a.kt)("inlineCode",{parentName:"a"},"wix-eventually"))," or ",(0,a.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/wait-for-expect"},(0,a.kt)("inlineCode",{parentName:"a"},"waitForExpect")))))}u.isMDXComponent=!0}}]);