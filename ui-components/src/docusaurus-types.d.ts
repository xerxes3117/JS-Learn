// Type declarations for Docusaurus modules used in ui-components
// These are provided by @docusaurus/types at runtime but not available during compilation

declare module '@docusaurus/Link' {
  import { ComponentProps } from 'react';
  
  export interface LinkProps extends Omit<ComponentProps<'a'>, 'href'> {
    href?: string;
    to?: string;
    children?: React.ReactNode;
  }
  
  const Link: React.FC<LinkProps>;
  export default Link;
}

declare module '@theme/Heading' {
  import { ComponentProps } from 'react';
  
  export interface HeadingProps extends ComponentProps<'h1'> {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    children?: React.ReactNode;
  }
  
  const Heading: React.FC<HeadingProps>;
  export default Heading;
}

