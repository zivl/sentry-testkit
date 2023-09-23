"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[746],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),m=c(n),d=i,g=m["".concat(l,".").concat(d)]||m[d]||u[d]||o;return n?r.createElement(g,a(a({ref:t},p),{},{components:n})):r.createElement(g,a({ref:t},p))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,a[1]=s;for(var c=2;c<o;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6935:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=n(7462),i=(n(7294),n(3905));const o={},a="Version 5 Migration Guide",s={unversionedId:"migration/version-5",id:"migration/version-5",title:"Version 5 Migration Guide",description:"Let's start with the good news: the are no significant breaking changes.",source:"@site/docs/migration/version-5.md",sourceDirName:"migration",slug:"/migration/version-5",permalink:"/sentry-testkit/docs/migration/version-5",draft:!1,editUrl:"https://github.com/zivl/sentry-testkit/blob/master/website/docs/docs/migration/version-5.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Version 3 Migration Guide",permalink:"/sentry-testkit/docs/migration/version-3"},next:{title:"Raven Testkit (Legacy API)",permalink:"/sentry-testkit/docs/raven-testkit-legacy"}},l={},c=[{value:"Moving Sentry Testkit to TypeScript",id:"moving-sentry-testkit-to-typescript",level:2},{value:"(Maybe) Breaking Changes UPDATE: Fixed!",id:"maybe-breaking-changes-update-fixed",level:2}],p={toc:c};function u(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"version-5-migration-guide"},"Version 5 Migration Guide"),(0,i.kt)("p",null,"Let's start with the good news: ",(0,i.kt)("strong",{parentName:"p"},"the are no significant breaking changes.")),(0,i.kt)("h2",{id:"moving-sentry-testkit-to-typescript"},"Moving Sentry Testkit to ",(0,i.kt)("a",{parentName:"h2",href:"https://www.typescriptlang.org/"},"TypeScript")),(0,i.kt)("p",null,"We refactored our entire code base to support TypeScript language. We have done so for the following reasons:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Type safe system. Eventually there is a great advantage to work in a type-safe ecosystem."),(0,i.kt)("li",{parentName:"ul"},"By having type safe functionality, we beleive it will encourage more deveopers to understand the code and be able to contribute more features and bug fixes."),(0,i.kt)("li",{parentName:"ul"},"Using TypeScript also helps code editors (IDEs) to provide better code-auto-completion functionality as well as self-documenting function parameters and etc.")),(0,i.kt)("h2",{id:"maybe-breaking-changes-update-fixed"},"(Maybe) Breaking Changes ","[UPDATE: Fixed!]"),(0,i.kt)("p",null,"Unfortunately, due to some race condition or wrong definition, we can't get to run out tests on the built-in ",(0,i.kt)("inlineCode",{parentName:"p"},"jest-mock")," functionality.\nTo remind, it was possible if you're using ",(0,i.kt)("inlineCode",{parentName:"p"},"Jest")," for testing, all you have to do in your ",(0,i.kt)("inlineCode",{parentName:"p"},"***.spec.js")," file is to import the Jest mock as follows:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"// some.spec.js\nimport { testkit } from 'sentry-testkit/dist/jestMock';\n\ntest('something', function () {\n    // click\n    // clack\n    // BOOM!\n    expect(testkit.reports().length).toBeGreaterThan(0);\n});\n")),(0,i.kt)("p",null,"But we're having issue with that:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"We're getting errors ",(0,i.kt)("inlineCode",{parentName:"li"},"Sentry is not defined")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"Maximum call stack size exceeded")," (looks like circular dep): ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/zivl/sentry-testkit/runs/2477315004"},"https://github.com/zivl/sentry-testkit/runs/2477315004")),(0,i.kt)("li",{parentName:"ol"},"re-declaring block-scope variables (looks like es imports helps with this, but then we got into first problem): ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/zivl/sentry-testkit/pull/78/checks?check_run_id=2826583066"},"https://github.com/zivl/sentry-testkit/pull/78/checks?check_run_id=2826583066"))),(0,i.kt)("p",null,"You may refer to the source code of ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/zivl/sentry-testkit/blob/master/src/jestMock.ts"},(0,i.kt)("inlineCode",{parentName:"a"},"jestMock.ts"))," and we'll be happy for your help and suggestions."),(0,i.kt)("p",null,"For further details and discussion, please follow ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/zivl/sentry-testkit/issues/136"},"issue #136")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"[UPDATE]"),": Thanks to ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/liamjones"},"@liamjones"),"'s contribution, this issue is no longer exists and you maybe upgrade your ",(0,i.kt)("inlineCode",{parentName:"p"},"sentry-testkit")," versions safely!"))}u.isMDXComponent=!0}}]);