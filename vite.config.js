const { resolve } = require('path');

module.exports = {
  plugins: [],
  root: resolve('./static/src'),
  base: '/static/',
  server: {
    host: 'localhost',
    port: 3000,
    open: false,
    watch: {
      usePolling: true,
      disableGlobbing: false,
    },
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  build: {
    outDir: resolve('./static/dist'),
    assetsDir: '',
    manifest: true,
    emptyOutDir: true,
    target: 'es2015',
    rollupOptions: {
      input: {
        home: resolve('./static/src/js/home.js'),
        placeLocationOnMap: resolve('./static/src/js/placeLocationOnMap.js'),
        mainCss: resolve('./static/src/js/mainCss.js'),
        menuAndSearch: resolve('./static/src/js/menuAndSearch.js'),
        likeShop: resolve('./static/src/js/likeShop.js'),
        followAccount: resolve('./static/src/js/followAccount.js'),
      },
      output: {
        chunkFileNames: undefined,
      },
    },
  },
};