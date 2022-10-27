"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[140],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>d});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var p=n.createContext({}),l=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},c=function(e){var t=l(e.components);return n.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,o=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=l(r),d=i,f=m["".concat(p,".").concat(d)]||m[d]||u[d]||o;return r?n.createElement(f,a(a({ref:t},c),{},{components:r})):n.createElement(f,a({ref:t},c))}));function d(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=r.length,a=new Array(o);a[0]=m;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:i,a[1]=s;for(var l=2;l<o;l++)a[l]=r[l];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},5599:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var n=r(7462),i=(r(7294),r(3905));const o={},a="Version 3 Migration Guide",s={unversionedId:"migration/version-3",id:"migration/version-3",title:"Version 3 Migration Guide",description:"Breaking Changes",source:"@site/docs/migration/version-3.md",sourceDirName:"migration",slug:"/migration/version-3",permalink:"/sentry-testkit/docs/migration/version-3",draft:!1,editUrl:"https://github.com/wix/sentry-testkit/blob/master/website/docs/docs/migration/version-3.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"External Process",permalink:"/sentry-testkit/docs/external-process"},next:{title:"Version 5 Migration Guide",permalink:"/sentry-testkit/docs/migration/version-5"}},p={},l=[{value:"Breaking Changes",id:"breaking-changes",level:2}],c={toc:l};function u(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"version-3-migration-guide"},"Version 3 Migration Guide"),(0,i.kt)("h2",{id:"breaking-changes"},"Breaking Changes"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The report object has changed from Sentry's report to our own format.\nPlease visit ",(0,i.kt)("a",{parentName:"li",href:"../api/types#report"},(0,i.kt)("inlineCode",{parentName:"a"},"Report"))," to see the available keys on the new object.\nIn case you need to access a key we don't expose, you can use ",(0,i.kt)("a",{parentName:"li",href:"../api/types#report"},(0,i.kt)("inlineCode",{parentName:"a"},"report.originalReport")),"."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"testkit.extractException")," was removed. You can use ",(0,i.kt)("inlineCode",{parentName:"li"},"report.error")," instead."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"testkit.findReport")," now returns ",(0,i.kt)("a",{parentName:"li",href:"../api/types#report"},(0,i.kt)("inlineCode",{parentName:"a"},"Report"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"testkit.getExceptionAt")," now returns ",(0,i.kt)("a",{parentName:"li",href:"../api/types#reporterror"},(0,i.kt)("inlineCode",{parentName:"a"},"ReportError")))))}u.isMDXComponent=!0}}]);