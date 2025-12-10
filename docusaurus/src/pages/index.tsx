import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const sections = [
  {
    title: 'JavaScript',
    description: 'Learn JavaScript fundamentals, advanced concepts, and how JavaScript works under the hood.',
    to: '/docs/category/how-javascript-works',
  },
  {
    title: 'React Native',
    description: 'Master React Native development for building cross-platform mobile applications.',
    to: '/docs/category/react-native',
  },
  {
    title: 'React',
    description: 'Explore React concepts, hooks, patterns, and best practices for building modern web applications.',
    to: '/docs/category/react',
  },
];

function SectionCard({title, description, to}: {title: string; description: string; to: string}) {
  return (
    <div className={clsx('col col--4')}>
      <Link to={to} className={styles.sectionCard}>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </Link>
    </div>
  );
}

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
        <section className={styles.sections}>
          <div className="container">
            <div className="row">
              {sections.map((section) => (
                <SectionCard key={section.title} {...section} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
