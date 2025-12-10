import type {LoadContext, Plugin} from '@docusaurus/types';
import path from 'path';

export default function webpackConfigPlugin(context: LoadContext): Plugin {
  return {
    name: 'webpack-config-plugin',
    configureWebpack(config, isServer) {
      // Resolve from docusaurus root directory to parent ui-components folder
      const docusaurusRoot = context.siteDir;
      const uiComponentsPath = path.resolve(docusaurusRoot, '../ui-components/src');
      return {
        resolve: {
          alias: {
            '@ui-components': path.join(uiComponentsPath, 'index.ts'),
          },
        },
      };
    },
  };
}

