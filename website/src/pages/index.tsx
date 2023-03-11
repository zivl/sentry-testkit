import React from 'react'
import clsx from 'clsx'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Link from '@docusaurus/Link'
import HomepageFeatures from '@site/src/components/HomepageFeatures'
import Layout from '@theme/Layout'

import styles from './index.module.css'
import { Highlight } from '../components/Highlight'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  // removed class hero--primary
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <img
          alt="sentry-teskit"
          src="img/logo/Sentry_github.svg"
          style={{ height: '140px' }}
        />
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title="Sentry-Testkit - Testing Sentry Reports Became Easy"
      description="Sentry Testkit enables Sentry to work natively in your application while running tests. The report is not really sent but rather logged locally into memory. In this way, the logged reports can be fetched for your own verification or any other purpose in your local development environment."
    >
      <HomepageHeader />
      <header style={{height: 0, visibility: 'hidden'}}>
        <h1>Welcome to Sentry Testkit!</h1>
      </header>
      <main>
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            justifyContent: 'center',
            marginBottom: '12px',
            flexWrap: 'wrap',
          }}
        >
          <img
            alt="sentry-teskit-npm"
            src="https://img.shields.io/npm/v/sentry-testkit.svg"
          />
          <img
            alt="sentry-teskit-downloads"
            src="https://img.shields.io/npm/dm/sentry-testkit.svg"
          />
          <img
            alt="sentry-teskit-tests"
            src="https://github.com/zivl/sentry-testkit/workflows/Test/badge.svg"
          />
          <img
            alt="sentry-teskit-v6"
            src="https://img.shields.io/badge/Compatible%20with%20Sentry-v6-blue"
          />
          <img
            alt="sentry-teskit-v7"
            src="https://img.shields.io/badge/Compatible%20with%20Sentry-v7-blue"
          />
        </div>
        <div className="container">
          <p>
            Sentry is an open-source JavaScript SDK published by{' '}
            <a href="https://sentry.io/welcome/">Sentry</a> to enable real-time
            crash reports and error tracking that helps developers to monitor
            and fix crashes in real time.
            <br />
            However, when building tests for your application, you want to
            assert that the right flow-tracking or error is being sent to{' '}
            <i>Sentry</i>, <b>but</b> without really sending it to <i>Sentry</i>{' '}
            servers. This way you won't swamp Sentry with false reports during
            test running and other CI operations.
          </p>
          <h3>...and this where Sentry Testkit Goes In!</h3>
          <p>
            <i>Sentry Testkit</i> enables <i>Sentry</i> to work natively in your
            application, and by overriding the default <i>Sentry</i> transport
            mechanism, the report is not really sent but rather logged locally
            into memory. In this way, the logged reports can be fetched later
            for your own usage, verification, or any other use you may have in
            your local developing/testing environment.
          </p>
        </div>
        <HomepageFeatures />
        <div
          className="container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            justifyContent: 'center',
            marginBottom: '36px',
          }}
        >
          <h2>Ready to get started?</h2>
          <div className={styles.gettingReady}>
            Testing error reporting doesn't have to be painful.<br/>
            Setnry-Testkit will help you write less code while achieving better performance.
          </div>
          <div className={styles.getStartedButtons}>
            <Highlight color="#25c2a0">
              <Link to="/docs/getting-started" style={{ color: 'white' }}>
                Get Started
              </Link>
            </Highlight>
            <Highlight color="#1877F2">
              <Link to="/docs/api" style={{ color: 'white' }}>
                API Reference
              </Link>
            </Highlight>
          </div>
        </div>
      </main>
      <div></div>
    </Layout>
  )
}
