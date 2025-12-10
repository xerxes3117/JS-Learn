import React from 'react';
import { CategoryCard, CategoryCardProps } from './CategoryCard';

export interface CategoryCardGridProps {
  cards: CategoryCardProps[];
}

export const CategoryCardGrid: React.FC<CategoryCardGridProps> = ({ cards }) => {
  return (
    <section className="row list">
      {cards.map((card, index) => (
        <CategoryCard key={index} {...card} />
      ))}
    </section>
  );
};

