export default {
  cjs: 'babel',
  esm: 'babel',
  umd: false,
  nodeResolveOpts: {
    mainFields: ['module', 'browser', 'main'],
  },
  // yarn build order
  pkgs: [
    'g-math',
    'g',
    'g-plugin-dom-interaction',
    'g-plugin-css-select',
    'g-plugin-canvas-renderer',
    'g-plugin-canvas-picker',
    'g-plugin-html-renderer',
    'g-canvas',
    'g-plugin-svg-renderer',
    'g-plugin-svg-picker',
    'g-svg',
    'g-plugin-webgl-renderer',
    'g-webgl',
    'g-plugin-3d',
    'g-plugin-control',
    'g-plugin-gpgpu',
    'g-webgpu-compiler',
    'g-components',
  ],
};
