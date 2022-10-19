"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[983],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>k});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),l=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=l(e.components);return n.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),u=l(r),k=a,m=u["".concat(s,".").concat(k)]||u[k]||d[k]||o;return r?n.createElement(m,i(i({ref:t},c),{},{components:r})):n.createElement(m,i({ref:t},c))}));function k(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=u;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p.mdxType="string"==typeof e?e:a,i[1]=p;for(var l=2;l<o;l++)i[l]=r[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},5375:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>p,toc:()=>l});var n=r(7462),a=(r(7294),r(3905));const o={title:"API Reference",description:"Sentry Testkit API Reference documentation.",sidebar_position:2},i="API Reference",p={unversionedId:"api/README",id:"api/README",title:"API Reference",description:"Sentry Testkit API Reference documentation.",source:"@site/docs/api/README.md",sourceDirName:"api",slug:"/api/",permalink:"/sentry-testkit/docs/api/",draft:!1,editUrl:"https://github.com/wix/sentry-testkit/blob/master/website/docs/docs/api/README.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"API Reference",description:"Sentry Testkit API Reference documentation.",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Getting Started",permalink:"/sentry-testkit/docs/getting-started"},next:{title:"Type Definitions",permalink:"/sentry-testkit/docs/api/types"}},s={},l=[{value:"Methods",id:"methods",level:2},{value:"What About Nodejs? - Of Course!",id:"what-about-nodejs---of-course",level:3},{value:"Reference",id:"reference",level:2},{value:"<code>reports()</code>",id:"reports",level:3},{value:"<code>findReport(error)</code>",id:"findreporterror",level:3},{value:"<code>isExist(error)</code>",id:"isexisterror",level:3},{value:"<code>getExceptionAt(index)</code>",id:"getexceptionatindex",level:3},{value:"<code>transactions()</code>",id:"transactions",level:3},{value:"<code>reset()</code>",id:"reset",level:3}],c={toc:l};function d(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"api-reference"},"API Reference"),(0,a.kt)("p",null,"Sentry Testkit consists of a very simple and strait-forward API using the following functions"),(0,a.kt)("h2",{id:"methods"},"Methods"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#reports"},(0,a.kt)("inlineCode",{parentName:"a"},"reports()"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#findreporterror"},(0,a.kt)("inlineCode",{parentName:"a"},"findReport(error)"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#isexisterror"},(0,a.kt)("inlineCode",{parentName:"a"},"isExist(error)"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#getexceptionatindex"},(0,a.kt)("inlineCode",{parentName:"a"},"getExceptionAt(index)"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#transactions"},(0,a.kt)("inlineCode",{parentName:"a"},"transactions()"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#reset"},(0,a.kt)("inlineCode",{parentName:"a"},"reset()")))),(0,a.kt)("h3",{id:"what-about-nodejs---of-course"},"What About Nodejs? - Of Course!"),(0,a.kt)("p",null,"Sentry Testkit has full support in both ",(0,a.kt)("inlineCode",{parentName:"p"},"@sentry/browser")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"@sentry/node")," (as well as other ",(0,a.kt)("inlineCode",{parentName:"p"},"@sentry/<what-ever>")," clients) since they have the same API and lifecycle under the hood."),(0,a.kt)("admonition",{title:"Raven-Testkit",type:"note"},(0,a.kt)("p",{parentName:"admonition"},"The good old legacy ",(0,a.kt)("inlineCode",{parentName:"p"},"raven-testkit")," documentation can be found ",(0,a.kt)("a",{parentName:"p",href:"/docs/raven-testkit-legacy"},"here"),". It it still there to serve ",(0,a.kt)("inlineCode",{parentName:"p"},"Raven")," which is the old legacy SDK of ",(0,a.kt)("em",{parentName:"p"},"Sentry")," for JavaScript/Node.js platforms")),(0,a.kt)("h2",{id:"reference"},"Reference"),(0,a.kt)("h3",{id:"reports"},(0,a.kt)("inlineCode",{parentName:"h3"},"reports()")),(0,a.kt)("p",null,"Gets all existing reports."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Returns"),": ",(0,a.kt)("code",null,"Array")," - where each member of the array consists of ",(0,a.kt)("em",{parentName:"p"},"Sentry's")," ",(0,a.kt)("code",null,"Report")," type."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"See"),": You may refer to the definition of ",(0,a.kt)("a",{parentName:"p",href:"./api/types#report"},(0,a.kt)("code",null,"Report"))," for further explanation and details."),(0,a.kt)("p",null,"For example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"const waitForExpect = require('wait-for-expect')\n\ntest('reports example', async function() {\n    // Some scenario that will report the exceptions...\n\n    await waitForExpect(() => expect(testkit.reports().length).toBeGreaterThan(0))\n    const reports = testkit.reports()\n\n    // Do what ever you want with the reports list\n})\n")),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"Here we use ",(0,a.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/wait-for-expect"},(0,a.kt)("inlineCode",{parentName:"a"},"wait-for-expect"))," library to emphasize that sometimes we need to ",(0,a.kt)("strong",{parentName:"p"},"wait")," until the report is being sent as it is done asynchronously.")),(0,a.kt)("h3",{id:"findreporterror"},(0,a.kt)("inlineCode",{parentName:"h3"},"findReport(error)")),(0,a.kt)("p",null,"Finds a report by a given error."),(0,a.kt)("p",null,"Uses ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find"},"Array.prototype.find")," under the hood"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Arguments")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"error: ",(0,a.kt)("inlineCode",{parentName:"li"},"Error")," - An error object to look for in the reports")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Returns"),": ",(0,a.kt)("code",null,"Report")," ","|"," ",(0,a.kt)("code",null,"undefined")," - the report object if one found. ",(0,a.kt)("inlineCode",{parentName:"p"},"undefined")," otherwise."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"See"),": You may refer to the definition of ",(0,a.kt)("a",{parentName:"p",href:"./api/types#report"},(0,a.kt)("code",null,"Report"))," for further explanation and details."),(0,a.kt)("p",null,"For example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"test('findReport example', async function() {\n    const err = new Error('error to look for')\n\n    // Some faulty scenario that will report err\n\n    const report = testkit.findReport(err)\n    expect(report).toBeDefined()\n})\n")),(0,a.kt)("h3",{id:"isexisterror"},(0,a.kt)("inlineCode",{parentName:"h3"},"isExist(error)")),(0,a.kt)("p",null,"Checks whether a given error exist (i.e. has been reported)"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Arguments"),(0,a.kt)("br",null)),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"error: ",(0,a.kt)("inlineCode",{parentName:"li"},"Error")," - An error object to look for in the reports")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Returns"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"Boolean")," - ",(0,a.kt)("inlineCode",{parentName:"p"},"true")," if the error exists. ",(0,a.kt)("inlineCode",{parentName:"p"},"false")," otherwise."),(0,a.kt)("p",null,"For example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"}," test('isExist example', async function() {\n    const err = new Error('error to look for')\n    Sentry.captureException(err)\n    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))\n    expect(testkit.isExist(err)).toBe(true)\n})\n")),(0,a.kt)("h3",{id:"getexceptionatindex"},(0,a.kt)("inlineCode",{parentName:"h3"},"getExceptionAt(index)")),(0,a.kt)("p",null,"Extracts the exception object of a report in a specific position."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Arguments"),(0,a.kt)("br",null)),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"index : ",(0,a.kt)("inlineCode",{parentName:"li"},"Number")," - index position of the report.")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Returns"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"ReportError"),"."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"See"),": You may refer to the definition of ",(0,a.kt)("a",{parentName:"p",href:"./api/types#reporterror"},(0,a.kt)("code",null,"ReportError"))," for further explanation and details."),(0,a.kt)("p",null,"For example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"test('getExceptionAt example', async function() {\n    Sentry.captureException(new Error('testing get exception at index 0'))\n    Sentry.captureException(new Error('testing get exception at index 1'))\n    await waitForExpect(() => expect(testkit.reports()).toHaveLength(2))\n    const { message } = testkit.getExceptionAt(1)\n    expect(message).toEqual('testing get exception at index 1')\n})\n")),(0,a.kt)("h3",{id:"transactions"},(0,a.kt)("inlineCode",{parentName:"h3"},"transactions()")),(0,a.kt)("p",null,"Gets all existing transactions."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Returns"),": ",(0,a.kt)("code",null,"Array")," - where each member of the array consists of a ",(0,a.kt)("code",null,"Transaction")," type."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"See"),": You may refer to the definition of ",(0,a.kt)("a",{parentName:"p",href:"./api/types#transaction"},(0,a.kt)("code",null,"Transaction"))," for further explanation and details."),(0,a.kt)("p",null,"For example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"test('transactions example', async function() {\n    // Some scenario that will create a transaction...\n\n    await waitForExpect(() => expect(testkit.transactions().length).toBeGreaterThan(0))\n    const transactions = testkit.transactions()\n\n    // Do what ever you want with the transactions\n})\n")),(0,a.kt)("h3",{id:"reset"},(0,a.kt)("inlineCode",{parentName:"h3"},"reset()")),(0,a.kt)("p",null,"Resets the testkit state and clear all existing reports."),(0,a.kt)("p",null,"For example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"test('reset example', async function() {\n    Sentry.captureException(new Error('Sentry test kit is awesome!'))\n    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))\n    expect(testkit.reports()).toHaveLength(1)\n    testkit.reset()\n    expect(testkit.reports()).toHaveLength(0)\n})\n")),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"Calling ",(0,a.kt)("inlineCode",{parentName:"p"},"reset()")," is very useful to run between tests, see more info and examples ",(0,a.kt)("a",{parentName:"p",href:"/docs/getting-started#reset-between-tests"},"here"))))}d.isMDXComponent=!0}}]);