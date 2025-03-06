"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[411],{7443:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>a,contentTitle:()=>c,default:()=>h,frontMatter:()=>s,metadata:()=>n,toc:()=>d});const n=JSON.parse('{"id":"migration/version-3","title":"Version 3 Migration Guide","description":"Breaking Changes","source":"@site/docs/migration/version-3.md","sourceDirName":"migration","slug":"/migration/version-3","permalink":"/sentry-testkit/docs/migration/version-3","draft":false,"unlisted":false,"editUrl":"https://github.com/zivl/sentry-testkit/blob/master/website/docs/docs/migration/version-3.md","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Browser Only","permalink":"/sentry-testkit/docs/browser-only"},"next":{"title":"Version 5 Migration Guide","permalink":"/sentry-testkit/docs/migration/version-5"}}');var i=t(4848),o=t(8453);const s={},c="Version 3 Migration Guide",a={},d=[{value:"Breaking Changes",id:"breaking-changes",level:2}];function l(e){const r={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ul:"ul",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.header,{children:(0,i.jsx)(r.h1,{id:"version-3-migration-guide",children:"Version 3 Migration Guide"})}),"\n",(0,i.jsx)(r.h2,{id:"breaking-changes",children:"Breaking Changes"}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:["The report object has changed from Sentry's report to our own format.\nPlease visit ",(0,i.jsx)(r.a,{href:"../api/types#report",children:(0,i.jsx)(r.code,{children:"Report"})})," to see the available keys on the new object.\nIn case you need to access a key we don't expose, you can use ",(0,i.jsx)(r.a,{href:"../api/types#report",children:(0,i.jsx)(r.code,{children:"report.originalReport"})}),"."]}),"\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.code,{children:"testkit.extractException"})," was removed. You can use ",(0,i.jsx)(r.code,{children:"report.error"})," instead."]}),"\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.code,{children:"testkit.findReport"})," now returns ",(0,i.jsx)(r.a,{href:"../api/types#report",children:(0,i.jsx)(r.code,{children:"Report"})})]}),"\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.code,{children:"testkit.getExceptionAt"})," now returns ",(0,i.jsx)(r.a,{href:"../api/types#reporterror",children:(0,i.jsx)(r.code,{children:"ReportError"})})]}),"\n"]})]})}function h(e={}){const{wrapper:r}={...(0,o.R)(),...e.components};return r?(0,i.jsx)(r,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},8453:(e,r,t)=>{t.d(r,{R:()=>s,x:()=>c});var n=t(6540);const i={},o=n.createContext(i);function s(e){const r=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function c(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),n.createElement(o.Provider,{value:r},e.children)}}}]);