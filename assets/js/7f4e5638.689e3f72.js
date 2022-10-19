"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[838],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,s=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=c(r),m=o,v=d["".concat(l,".").concat(m)]||d[m]||u[m]||s;return r?n.createElement(v,a(a({ref:t},p),{},{components:r})):n.createElement(v,a({ref:t},p))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=r.length,a=new Array(s);a[0]=d;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:o,a[1]=i;for(var c=2;c<s;c++)a[c]=r[c];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},3875:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>s,metadata:()=>i,toc:()=>c});var n=r(7462),o=(r(7294),r(3905));const s={title:"External Process",description:"How to use external process error reports interception with Sentry Testkit",sidebar_position:4},a="External Process",i={unversionedId:"external-process",id:"external-process",title:"External Process",description:"How to use external process error reports interception with Sentry Testkit",source:"@site/docs/external-process.md",sourceDirName:".",slug:"/external-process",permalink:"/sentry-testkit/docs/external-process",draft:!1,editUrl:"https://github.com/wix/sentry-testkit/blob/master/website/docs/docs/external-process.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{title:"External Process",description:"How to use external process error reports interception with Sentry Testkit",sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Network Interception",permalink:"/sentry-testkit/docs/network-interception"},next:{title:"Migration",permalink:"/sentry-testkit/docs/category/migration"}},l={},c=[{value:"Local Server API",id:"local-server-api",level:2},{value:"<code>start (dsn: string) =&gt; Promise&lt;void&gt;</code>",id:"start-dsn-string--promisevoid",level:3},{value:"<code>stop: () =&gt; Promise&lt;void&gt;</code>",id:"stop---promisevoid",level:3},{value:"<code>getDsn: () =&gt; string</code>",id:"getdsn---string",level:3},{value:"Example",id:"example",level:2}],p={toc:c};function u(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"external-process"},"External Process"),(0,o.kt)("p",null,"Sentry Testkit supports intercepting reports from an external process, by running a fake local Sentry server.\nThis is useful for testing CLI tools for example, where the test is running the CLI as a child process and asserting the output."),(0,o.kt)("p",null,"Once you start the local server, it generates an alternative DSN that redirects to the local server instead of Sentry's real servers. You need to pass this DSN to your app."),(0,o.kt)("h2",{id:"local-server-api"},"Local Server API"),(0,o.kt)("p",null,"Sentry Testkit exports a ",(0,o.kt)("inlineCode",{parentName:"p"},"localServer")," instance with the following functions listed below."),(0,o.kt)("h3",{id:"start-dsn-string--promisevoid"},(0,o.kt)("inlineCode",{parentName:"h3"},"start (dsn: string) => Promise<void>")),(0,o.kt)("p",null,"Starts the local server with your app DSN. The promise resolves once the server is ready."),(0,o.kt)("h3",{id:"stop---promisevoid"},(0,o.kt)("inlineCode",{parentName:"h3"},"stop: () => Promise<void>")),(0,o.kt)("p",null,"Stops the local server. The promise resolves once the server is fully stopped."),(0,o.kt)("h3",{id:"getdsn---string"},(0,o.kt)("inlineCode",{parentName:"h3"},"getDsn: () => string")),(0,o.kt)("p",null,"Returns the alternative DSN. Can be used only when the server is running."),(0,o.kt)("h2",{id:"example"},"Example"),(0,o.kt)("p",null,"In the example below, we pass it as an argument, although in real apps it may be passed using an environment variable or other creative ways."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"\nconst execa = require('execa')\nconst waitForExpect = require('wait-for-expect')\nconst sentryTestkit = require('sentry-testkit')\n\nconst { testkit, localServer } = sentryTestkit()\nconst MY_APP_DSN = 'http://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'\n\ndescribe('my app - error reporting', function() {\n  beforeAll(() => localServer.start(MY_APP_DSN))\n\n  afterAll(() => localServer.stop())\n\n  beforeEach(() => testkit.reset())\n\n  test('should report to test kit from an external process', async function() {\n    const dsn = localServer.getDsn()\n    const errorMessage = 'sentry test kit is awesome!'\n    execa\n      .node('my-app.js', [\n        dsn,\n        errorMessage,\n      ])\n      .stdout.pipe(process.stdout)\n\n    await waitForExpect(() => {\n      expect(testkit.reports()[0].error).toMatchObject({\n        name: 'Error',\n        message: errorMessage,\n      })\n    })\n  })\n})\n")))}u.isMDXComponent=!0}}]);