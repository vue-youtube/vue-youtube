import type { DefaultTheme } from 'vitepress';

const nav: DefaultTheme.Config['nav'] = [
  {
    text: 'Introduction',
    link: '/introduction/overview',
    activeMatch: '^/introduction/',
  },
  {
    text: 'Usage',
    link: '/usage/composable',
    activeMatch: '^/usage/',
  },
];

export default nav;