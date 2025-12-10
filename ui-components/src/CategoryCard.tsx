import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

export interface CategoryCardProps {
  title: string;
  description: string;
  href: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, href }) => {
  return (
    <article className="col col--6 margin-bottom--lg">
      <Link
        href={href}
        className="card padding--lg cardContainer">
        <Heading
          as="h2"
          className="text--truncate cardTitle"
          title={title}>
          📄️ {title}
        </Heading>
        <p className="text--truncate cardDescription" title={description}>
          {description}
        </p>
      </Link>
    </article>
  );
};

