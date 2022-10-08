import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  height: string
  width: string
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Built for JavaScript Ecosystem',
    Svg: require('@site/static/img/logo/sentry-logo.svg').default,
    height: '120px',
    width: '120px',
    description: (
      <>
        Supports Sentry's JavaScript packages and clients as well as Nodejs.
      </>
    ),
  },
  {
    title: 'From Unit Tests to E2E Testing',
    Svg: require('@site/static/img/e2e-testing.svg').default,
    height: '180px',
    width: '180px',
    description: (
      <>
        You can intercept error reporting at all levels of your tests. From simple unit tests run all the way to E2E environment (based on Puppeteer).
      </>
    ),
  },
  {
    title: 'Built-in Network Interceptor',
    Svg: require('@site/static/img/router.svg').default,
    height: '180px',
    width: '180px',
    description: (
      <>
        Shipped with configurable network interceptor which allows you to intercepts events sent to anywhere else.
      </>
    ),
  },
];

function Feature({title, Svg, description, height, width}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {/JavaScript/gi.test(title) ? (
        <div><Svg style={{margin: '50px 0 0px', height, width, position: 'relative', right: '-16px'}} role="img" /><span style={{fontSize: '38px', position: 'relative', right: '16px', top:'-28px'}}>❤️</span></div>
        ) : (
          <Svg style={{height, width}} role="img" />
        )}
      </div>
      <div className="text--center padding-horiz--md">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
