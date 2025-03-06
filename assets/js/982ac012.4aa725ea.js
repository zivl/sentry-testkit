"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[59],{8108:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>d,contentTitle:()=>c,default:()=>h,frontMatter:()=>o,metadata:()=>n,toc:()=>a});const n=JSON.parse('{"id":"api/README","title":"API Reference","description":"Sentry Testkit API Reference documentation.","source":"@site/docs/api/README.md","sourceDirName":"api","slug":"/api/","permalink":"/sentry-testkit/docs/api/","draft":false,"unlisted":false,"editUrl":"https://github.com/zivl/sentry-testkit/blob/master/website/docs/docs/api/README.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"title":"API Reference","description":"Sentry Testkit API Reference documentation.","sidebar_position":2},"sidebar":"tutorialSidebar","previous":{"title":"Getting Started","permalink":"/sentry-testkit/docs/getting-started"},"next":{"title":"Sentry/React Error Boundary","permalink":"/sentry-testkit/docs/error-boundary-usage"}}');var s=t(4848),i=t(8453);const o={title:"API Reference",description:"Sentry Testkit API Reference documentation.",sidebar_position:2},c="API Reference",d={},a=[{value:"Methods",id:"methods",level:2},{value:"What About Nodejs? - Of Course!",id:"what-about-nodejs---of-course",level:3},{value:"Reference",id:"reference",level:2},{value:"<code>reports()</code>",id:"reports",level:3},{value:"<code>findReport(error)</code>",id:"findreporterror",level:3},{value:"<code>isExist(error)</code>",id:"isexisterror",level:3},{value:"<code>getExceptionAt(index)</code>",id:"getexceptionatindex",level:3},{value:"<code>transactions()</code>",id:"transactions",level:3},{value:"<code>reset()</code>",id:"reset",level:3}];function l(e){const r={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r.header,{children:(0,s.jsx)(r.h1,{id:"api-reference",children:"API Reference"})}),"\n",(0,s.jsx)(r.p,{children:"Sentry Testkit consists of a very simple and strait-forward API using the following functions"}),"\n",(0,s.jsx)(r.h2,{id:"methods",children:"Methods"}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsx)(r.li,{children:(0,s.jsx)(r.a,{href:"#reports",children:(0,s.jsx)(r.code,{children:"reports()"})})}),"\n",(0,s.jsx)(r.li,{children:(0,s.jsx)(r.a,{href:"#findreporterror",children:(0,s.jsx)(r.code,{children:"findReport(error)"})})}),"\n",(0,s.jsx)(r.li,{children:(0,s.jsx)(r.a,{href:"#isexisterror",children:(0,s.jsx)(r.code,{children:"isExist(error)"})})}),"\n",(0,s.jsx)(r.li,{children:(0,s.jsx)(r.a,{href:"#getexceptionatindex",children:(0,s.jsx)(r.code,{children:"getExceptionAt(index)"})})}),"\n",(0,s.jsx)(r.li,{children:(0,s.jsx)(r.a,{href:"#transactions",children:(0,s.jsx)(r.code,{children:"transactions()"})})}),"\n",(0,s.jsx)(r.li,{children:(0,s.jsx)(r.a,{href:"#reset",children:(0,s.jsx)(r.code,{children:"reset()"})})}),"\n"]}),"\n",(0,s.jsx)(r.h3,{id:"what-about-nodejs---of-course",children:"What About Nodejs? - Of Course!"}),"\n",(0,s.jsxs)(r.p,{children:["Sentry Testkit has full support in both ",(0,s.jsx)(r.code,{children:"@sentry/browser"})," and ",(0,s.jsx)(r.code,{children:"@sentry/node"})," (as well as other ",(0,s.jsx)(r.code,{children:"@sentry/<what-ever>"})," clients) since they have the same API and lifecycle under the hood."]}),"\n",(0,s.jsx)(r.admonition,{title:"Raven-Testkit",type:"note",children:(0,s.jsxs)(r.p,{children:["The good old legacy ",(0,s.jsx)(r.code,{children:"raven-testkit"})," documentation can be found ",(0,s.jsx)(r.a,{href:"/docs/raven-testkit-legacy",children:"here"}),". It it still there to serve ",(0,s.jsx)(r.code,{children:"Raven"})," which is the old legacy SDK of ",(0,s.jsx)(r.em,{children:"Sentry"})," for JavaScript/Node.js platforms"]})}),"\n",(0,s.jsx)(r.h2,{id:"reference",children:"Reference"}),"\n",(0,s.jsx)(r.h3,{id:"reports",children:(0,s.jsx)(r.code,{children:"reports()"})}),"\n",(0,s.jsx)(r.p,{children:"Gets all existing reports."}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.strong,{children:"Returns"}),": ",(0,s.jsx)("code",{children:"Array"})," - where each member of the array consists of ",(0,s.jsx)(r.em,{children:"Sentry's"})," ",(0,s.jsx)("code",{children:"Report"})," type."]}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.strong,{children:"See"}),": You may refer to the definition of ",(0,s.jsx)(r.a,{href:"./api/types#report",children:(0,s.jsx)("code",{children:"Report"})})," for further explanation and details."]}),"\n",(0,s.jsx)(r.p,{children:"For example"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-javascript",children:"const waitForExpect = require('wait-for-expect')\n\ntest('reports example', async function() {\n    // Some scenario that will report the exceptions...\n\n    await waitForExpect(() => expect(testkit.reports().length).toBeGreaterThan(0))\n    const reports = testkit.reports()\n\n    // Do what ever you want with the reports list\n})\n"})}),"\n",(0,s.jsx)(r.admonition,{type:"info",children:(0,s.jsxs)(r.p,{children:["Here we use ",(0,s.jsx)(r.a,{href:"https://www.npmjs.com/package/wait-for-expect",children:(0,s.jsx)(r.code,{children:"wait-for-expect"})})," library to emphasize that sometimes we need to ",(0,s.jsx)(r.strong,{children:"wait"})," until the report is being sent as it is done asynchronously."]})}),"\n",(0,s.jsx)(r.h3,{id:"findreporterror",children:(0,s.jsx)(r.code,{children:"findReport(error)"})}),"\n",(0,s.jsx)(r.p,{children:"Finds a report by a given error."}),"\n",(0,s.jsxs)(r.p,{children:["Uses ",(0,s.jsx)(r.a,{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find",children:"Array.prototype.find"})," under the hood"]}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.strong,{children:"Arguments"})}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsxs)(r.li,{children:["error: ",(0,s.jsx)(r.code,{children:"Error"})," - An error object to look for in the reports"]}),"\n"]}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.strong,{children:"Returns"}),": ",(0,s.jsx)("code",{children:"Report"})," | ",(0,s.jsx)("code",{children:"undefined"})," - the report object if one found. ",(0,s.jsx)(r.code,{children:"undefined"})," otherwise."]}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.strong,{children:"See"}),": You may refer to the definition of ",(0,s.jsx)(r.a,{href:"./api/types#report",children:(0,s.jsx)("code",{children:"Report"})})," for further explanation and details."]}),"\n",(0,s.jsx)(r.p,{children:"For example"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-javascript",children:"test('findReport example', async function() {\n    const err = new Error('error to look for')\n\n    // Some faulty scenario that will report err\n\n    const report = testkit.findReport(err)\n    expect(report).toBeDefined()\n})\n"})}),"\n",(0,s.jsx)(r.h3,{id:"isexisterror",children:(0,s.jsx)(r.code,{children:"isExist(error)"})}),"\n",(0,s.jsx)(r.p,{children:"Checks whether a given error exist (i.e. has been reported)"}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.strong,{children:"Arguments"}),(0,s.jsx)("br",{})]}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsxs)(r.li,{children:["error: ",(0,s.jsx)(r.code,{children:"Error"})," - An error object to look for in the reports"]}),"\n"]}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.strong,{children:"Returns"}),": ",(0,s.jsx)(r.code,{children:"Boolean"})," - ",(0,s.jsx)(r.code,{children:"true"})," if the error exists. ",(0,s.jsx)(r.code,{children:"false"})," otherwise."]}),"\n",(0,s.jsx)(r.p,{children:"For example"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-javascript",children:" test('isExist example', async function() {\n    const err = new Error('error to look for')\n    Sentry.captureException(err)\n    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))\n    expect(testkit.isExist(err)).toBe(true)\n})\n"})}),"\n",(0,s.jsx)(r.h3,{id:"getexceptionatindex",children:(0,s.jsx)(r.code,{children:"getExceptionAt(index)"})}),"\n",(0,s.jsx)(r.p,{children:"Extracts the exception object of a report in a specific position."}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.strong,{children:"Arguments"}),(0,s.jsx)("br",{})]}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsxs)(r.li,{children:["index : ",(0,s.jsx)(r.code,{children:"Number"})," - index position of the report."]}),"\n"]}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.strong,{children:"Returns"}),": ",(0,s.jsx)(r.code,{children:"ReportError"}),"."]}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.strong,{children:"See"}),": You may refer to the definition of ",(0,s.jsx)(r.a,{href:"./api/types#reporterror",children:(0,s.jsx)("code",{children:"ReportError"})})," for further explanation and details."]}),"\n",(0,s.jsx)(r.p,{children:"For example"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-javascript",children:"test('getExceptionAt example', async function() {\n    Sentry.captureException(new Error('testing get exception at index 0'))\n    Sentry.captureException(new Error('testing get exception at index 1'))\n    await waitForExpect(() => expect(testkit.reports()).toHaveLength(2))\n    const { message } = testkit.getExceptionAt(1)\n    expect(message).toEqual('testing get exception at index 1')\n})\n"})}),"\n",(0,s.jsx)(r.h3,{id:"transactions",children:(0,s.jsx)(r.code,{children:"transactions()"})}),"\n",(0,s.jsx)(r.p,{children:"Gets all existing transactions."}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.strong,{children:"Returns"}),": ",(0,s.jsx)("code",{children:"Array"})," - where each member of the array consists of a ",(0,s.jsx)("code",{children:"Transaction"})," type."]}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.strong,{children:"See"}),": You may refer to the definition of ",(0,s.jsx)(r.a,{href:"./api/types#transaction",children:(0,s.jsx)("code",{children:"Transaction"})})," for further explanation and details."]}),"\n",(0,s.jsx)(r.p,{children:"For example"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-javascript",children:"test('transactions example', async function() {\n    // Some scenario that will create a transaction...\n\n    await waitForExpect(() => expect(testkit.transactions().length).toBeGreaterThan(0))\n    const transactions = testkit.transactions()\n\n    // Do what ever you want with the transactions\n})\n"})}),"\n",(0,s.jsx)(r.h3,{id:"reset",children:(0,s.jsx)(r.code,{children:"reset()"})}),"\n",(0,s.jsx)(r.p,{children:"Resets the testkit state and clear all existing reports."}),"\n",(0,s.jsx)(r.p,{children:"For example"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-javascript",children:"test('reset example', async function() {\n    Sentry.captureException(new Error('Sentry test kit is awesome!'))\n    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))\n    expect(testkit.reports()).toHaveLength(1)\n    testkit.reset()\n    expect(testkit.reports()).toHaveLength(0)\n})\n"})}),"\n",(0,s.jsx)(r.admonition,{type:"tip",children:(0,s.jsxs)(r.p,{children:["Calling ",(0,s.jsx)(r.code,{children:"reset()"})," is very useful to run between tests, see more info and examples ",(0,s.jsx)(r.a,{href:"/docs/getting-started#reset-between-tests",children:"here"})]})})]})}function h(e={}){const{wrapper:r}={...(0,i.R)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},8453:(e,r,t)=>{t.d(r,{R:()=>o,x:()=>c});var n=t(6540);const s={},i=n.createContext(s);function o(e){const r=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function c(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),n.createElement(i.Provider,{value:r},e.children)}}}]);