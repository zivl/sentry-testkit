import React from 'react';
import Layout from '@theme/Layout';

 class Help extends React.Component {
   render() {
     const supportLinks = [
       {
         content: `Find what you're looking for in our detailed documentation and guides.
 - Learn how to [get started](/docs/getting-started) with Jest.
 - [Troubleshoot](/docs/troubleshooting) problems with Jest.
 - Learn how to [configure Jest](/docs/configuration).
 - Look at the full [API Reference](/docs/api).`,
         title: 'Browse the docs',
       },
       {
         content: `Ask questions and find answers from other Jest users like you.
 - Join the \`#testing\` channel on [Reactiflux](https://www.reactiflux.com/), a Discord community.
 - Many members of the community use Stack Overflow. Read through the [existing questions](https://stackoverflow.com/questions/tagged/jestjs) tagged with **jestjs** or [ask your own](https://stackoverflow.com/questions/ask)!`,
         title: 'Join the community',
       },
       {
         content: `Find out what's new with Jest.
 - Follow [Jest](https://twitter.com/fbjest) on Twitter.
 - Subscribe to the [Jest blog](/blog/).
 - Look at the [changelog](https://github.com/facebook/jest/blob/main/CHANGELOG.md).`,
         title: 'Stay up to date',
       },
     ];

     return (
       <div className="wrapperV1">
           <div className="padding-vert--lg">
             <div>
               <header>
                 <h2>
                   Need help?
                 </h2>
               </header>
               <p>
                   Jest is worked on by a team of volunteers in their spare time.
                   You can find out ways to talk to community members below.
               </p>
             </div>
             <div className="padding-top--md">
                     {supportLinks.map(link => <div><div>{link.title}</div><div>{link.content}</div></div>)}
             </div>
           </div>
       </div>
     );
   }
 }

 export default function HelpPage(props) {
   return (
     <Layout>
       <Help {...props} />
     </Layout>
   );
 }
