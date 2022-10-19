"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[86],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>k});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(n),k=a,m=u["".concat(s,".").concat(k)]||u[k]||d[k]||o;return n?r.createElement(m,i(i({ref:t},c),{},{components:n})):r.createElement(m,i({ref:t},c))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},5256:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var r=n(7462),a=(n(7294),n(3905));const o={title:"Raven Testkit",description:"The legacy API reference of raven testkit.",sidebar_position:10},i="Raven Testkit (Legacy API)",l={unversionedId:"raven-testkit-legacy",id:"raven-testkit-legacy",title:"Raven Testkit",description:"The legacy API reference of raven testkit.",source:"@site/docs/raven-testkit-legacy.md",sourceDirName:".",slug:"/raven-testkit-legacy",permalink:"/docs/raven-testkit-legacy",draft:!1,editUrl:"https://github.com/wix/sentry-testkit/blob/master/website/docs/docs/raven-testkit-legacy.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{title:"Raven Testkit",description:"The legacy API reference of raven testkit.",sidebar_position:10},sidebar:"tutorialSidebar",previous:{title:"v2-v3",permalink:"/docs/migration/v2-v3"}},s={},p=[{value:"Raven Test Kit - to the rescue",id:"raven-test-kit---to-the-rescue",level:2},{value:"Usage",id:"usage",level:2},{value:"Installation",id:"installation",level:3},{value:"Instantiation",id:"instantiation",level:3},{value:"Using in tests",id:"using-in-tests",level:3},{value:"Pass your own <code>shouldSendCallback</code> logic",id:"pass-your-own-shouldsendcallback-logic",level:4},{value:"Test Kit API",id:"test-kit-api",level:2},{value:"reports() : <code>Array</code>",id:"reports--array",level:3},{value:"reset() : <code>Array</code>",id:"reset--array",level:3},{value:"extractException(report) : <code>Object</code>",id:"extractexceptionreport--object",level:3},{value:"getExceptionAt(index) : <code>Object</code>",id:"getexceptionatindex--object",level:3},{value:"findReport(error) : <code>Object</code> | <code>undefined</code>",id:"findreporterror--object--undefined",level:3},{value:"isExist(error) : <code>Boolean</code>",id:"isexisterror--boolean",level:3},{value:"Gotcha(s)",id:"gotchas",level:2}],c={toc:p};function d(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"raven-testkit-legacy-api"},"Raven Testkit (Legacy API)"),(0,a.kt)("p",null,"Raven is a JavaScript SDK published by ",(0,a.kt)("a",{parentName:"p",href:"https://docs.sentry.io/clients/"},"Sentry.io")," to enable software flow tracking and issues reporting to the ",(0,a.kt)("em",{parentName:"p"},"Sentry")," system.",(0,a.kt)("br",null),"\nHowever, when building tests for your application, you want to assert that the right flow-tracking or error is being sent to ",(0,a.kt)("em",{parentName:"p"},"Sentry"),", ",(0,a.kt)("strong",{parentName:"p"},"but")," without really sending it to the ",(0,a.kt)("em",{parentName:"p"},"Sentry")," system. This way you won't swamp it with false reports during test running and other CI operations."),(0,a.kt)("h2",{id:"raven-test-kit---to-the-rescue"},"Raven Test Kit - to the rescue"),(0,a.kt)("p",null,"Raven test kit enables Raven to work natively in your application, but it overrides the default Raven transport mechanism so the report is not really sent but rather logged locally. In this way, the logged reports can be fetched later for usage verification or other uses you may have in your testing environment."),(0,a.kt)("h2",{id:"usage"},"Usage"),(0,a.kt)("h3",{id:"installation"},"Installation"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"npm install raven-testkit --save-dev\n")),(0,a.kt)("h3",{id:"instantiation"},"Instantiation"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"// CommonJS\nconst testKitInitializer = require('raven-testkit')\n\n// ES6 Modules\nimport testKitInitializer from 'raven-testkit'\n")),(0,a.kt)("h3",{id:"using-in-tests"},"Using in tests"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"const testKit = testKitInitializer(Raven)\n\n// any scenario that should call Raven.catchException(...)\n\nexpect(testKit.reports()).toHaveLength(1)\nconst report = testKit.reports()[0]\nexpect(report).toHaveProperty('release', 'test')\n")),(0,a.kt)("h4",{id:"pass-your-own-shouldsendcallback-logic"},"Pass your own ",(0,a.kt)("inlineCode",{parentName:"h4"},"shouldSendCallback")," logic"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"const shouldSendCallback = data => {\n    return /* your own logic */\n}\nconst testKit = testKitInitializer(Raven, shouldSendCallback)\n")),(0,a.kt)("p",null,"You may see more example usage in the testing section of this repository as well."),(0,a.kt)("h2",{id:"test-kit-api"},"Test Kit API"),(0,a.kt)("a",{name:"reports"}),(0,a.kt)("h3",{id:"reports--array"},"reports() : ",(0,a.kt)("code",null,"Array")),(0,a.kt)("p",null,"Get all existing reports."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Kind"),": instance function\n",(0,a.kt)("strong",{parentName:"p"},"Returns"),": ",(0,a.kt)("code",null,"Array")," - where each member of the array consists of ",(0,a.kt)("inlineCode",{parentName:"p"},"Raven"),"'s ",(0,a.kt)("em",{parentName:"p"},"data")," object.\n",(0,a.kt)("strong",{parentName:"p"},"See"),": You may refer to the ",(0,a.kt)("a",{parentName:"p",href:"https://docs.sentry.io/clients/"},"Sentry Docs")," for further explanation and details."),(0,a.kt)("a",{name:"reset"}),(0,a.kt)("h3",{id:"reset--array"},"reset() : ",(0,a.kt)("code",null,"Array")),(0,a.kt)("p",null,"Reset the teskit state and clear all existing reports."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Returns"),": ",(0,a.kt)("code",null,"Array")," - empty array."),(0,a.kt)("a",{name:"extractException"}),(0,a.kt)("h3",{id:"extractexceptionreport--object"},"extractException(report) : ",(0,a.kt)("code",null,"Object")),(0,a.kt)("p",null,"Extract the exception object of a given report."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Returns"),": ",(0,a.kt)("code",null,"Object")," - the exception object as built by ",(0,a.kt)("inlineCode",{parentName:"p"},"Raven")),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Param"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"report"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("code",null,"Object")),(0,a.kt)("td",{parentName:"tr",align:null},"report object.")))),(0,a.kt)("a",{name:"getExceptionAt"}),(0,a.kt)("h3",{id:"getexceptionatindex--object"},"getExceptionAt(index) : ",(0,a.kt)("code",null,"Object")),(0,a.kt)("p",null,"Extract the exception object of a report in a specific position."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Returns"),": ",(0,a.kt)("code",null,"Object")," - the exception object as built by ",(0,a.kt)("inlineCode",{parentName:"p"},"Raven")),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Param"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"index"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("code",null,"number")),(0,a.kt)("td",{parentName:"tr",align:null},"index position of the report")))),(0,a.kt)("a",{name:"findReport"}),(0,a.kt)("h3",{id:"findreporterror--object--undefined"},"findReport(error) : ",(0,a.kt)("code",null,"Object")," ","|"," ",(0,a.kt)("code",null,"undefined")),(0,a.kt)("p",null,"Find a report by a given error."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Returns"),": ",(0,a.kt)("code",null,"Object")," ","|"," ",(0,a.kt)("code",null,"undefined")," - the report object if one found. ",(0,a.kt)("inlineCode",{parentName:"p"},"undefined")," otherwise\n",(0,a.kt)("strong",{parentName:"p"},"See"),": Uses ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find"},"Array.prototype.find")),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Param"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"error"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("code",null,"Error")),(0,a.kt)("td",{parentName:"tr",align:null},"error to look for in the reports")))),(0,a.kt)("a",{name:"isExist"}),(0,a.kt)("h3",{id:"isexisterror--boolean"},"isExist(error) : ",(0,a.kt)("code",null,"Boolean")),(0,a.kt)("p",null,"check whether a given error exist (i.e. has been reported)"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Returns"),": ",(0,a.kt)("code",null,"Boolean")," - ",(0,a.kt)("inlineCode",{parentName:"p"},"true")," if the error exists. ",(0,a.kt)("inlineCode",{parentName:"p"},"false")," otherwise"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Param"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"error"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("code",null,"Error")),(0,a.kt)("td",{parentName:"tr",align:null},"the error to look for in the reports")))),(0,a.kt)("h2",{id:"gotchas"},"Gotcha(s)"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"if you set the ",(0,a.kt)("inlineCode",{parentName:"li"},"shouldSendCallback")," hook in your ",(0,a.kt)("inlineCode",{parentName:"li"},"Raven")," configuration, make sure to call the ",(0,a.kt)("inlineCode",{parentName:"li"},"testKitInitializer(Raven)")," function ",(0,a.kt)("strong",{parentName:"li"},"after")," your code has finished configuring Raven. You need to do this because we call ",(0,a.kt)("inlineCode",{parentName:"li"},"Raven.setShouldSendCallback")," to ensure the proper functionality of the ",(0,a.kt)("inlineCode",{parentName:"li"},"Raven")," lifecycle so you need to call the ",(0,a.kt)("inlineCode",{parentName:"li"},"testKitInitializer(Raven)")," only after ",(0,a.kt)("inlineCode",{parentName:"li"},"Raven")," is configured.",(0,a.kt)("br",null),"\nSee the documentation above if you want to pass your own ",(0,a.kt)("inlineCode",{parentName:"li"},"shouldSendCallback")," logic to ",(0,a.kt)("inlineCode",{parentName:"li"},"raven-testkit"),"."),(0,a.kt)("li",{parentName:"ul"},"Configure Raven to allow duplicates as otherwise the same dummy error will only be reported once. ",(0,a.kt)("inlineCode",{parentName:"li"},"Raven.config(dummyDsn, { allowDuplicates: true })")," (",(0,a.kt)("a",{parentName:"li",href:"https://docs.sentry.io/clients/javascript/config/?platform=javascript"},"Documentation"),")")))}d.isMDXComponent=!0}}]);