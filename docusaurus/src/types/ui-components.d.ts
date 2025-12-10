// Type declarations for @ui-components webpack alias
declare module '@ui-components' {
  export interface CategoryCardProps {
    title: string;
    description: string;
    href: string;
  }

  export interface CategoryCardGridProps {
    cards: CategoryCardProps[];
  }

  export const CategoryCard: React.FC<CategoryCardProps>;
  export const CategoryCardGrid: React.FC<CategoryCardGridProps>;
}

