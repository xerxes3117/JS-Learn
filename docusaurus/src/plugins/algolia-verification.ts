import type {Plugin} from '@docusaurus/types';

export default function algoliaVerificationPlugin(): Plugin {
  return {
    name: 'algolia-verification',
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'meta',
            attributes: {
              name: 'algolia-site-verification',
              content: '5805AABCA9F8091B',
            },
          },
        ],
      };
    },
  };
}

