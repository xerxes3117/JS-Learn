import type {ReactNode} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { CategoryCardGrid } from '@ui-components';

import styles from './index.module.css';

const sections = [
  {
    title: 'JavaScript',
    description: 'Learn JavaScript fundamentals, advanced concepts, and how JavaScript works under the hood.',
    href: '/docs/js/introduction',
  },
  {
    title: 'React Native',
    description: 'Master React Native development for building cross-platform mobile applications.',
    href: '/docs/react-native/introduction',
  },
  {
    title: 'React',
    description: 'Explore React concepts, hooks, patterns, and best practices for building modern web applications.',
    href: '/docs/react/introduction',
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <div className="container margin-top--lg">
          <CategoryCardGrid cards={sections} />
        </div>
      </main>
    </Layout>
  );
}
