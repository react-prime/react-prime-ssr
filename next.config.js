const path = require('path');
const { PHASE_PRODUCTION_BUILD, PHASE_PRODUCTION_SERVER } = require('next/constants');
const globals = require('./config/globals');
const nextOptions = require('./config/next');
// const pkg = require('./package.json');

// Set up our Next environment based on compilation phase
const config = (phase) => {
  const dirPaths = {
    distDir: nextOptions.distDir,
  };

  let cfg = dirPaths;

  /*
    BUILD CONFIG
  */
  if (phase !== PHASE_PRODUCTION_SERVER) {
    // Only add Webpack config for compile phases
    const webpack = require('webpack');

    cfg = {
      ...cfg,
      webpack: (config) => {
        // Push polyfills before all other code
        const originalEntry = config.entry;
        config.entry = async () => {
          const entries = await originalEntry();

          if (entries['main.js'] && !entries['main.js'].includes(nextOptions.polyfillsPath)) {
            entries['main.js'].unshift(nextOptions.polyfillsPath);
          }

          return entries;
        };

        /*
          WEBPACK CONFIG
          Your regular Webpack configuration, except we have to work with an already existing
          Webpack configuration from Next. When changing anything, keep in mind to preserve the
          config of Next (unless you are trying to overwrite something) or things might break.
        */
        const rules = [
          {
            test: /\.jsx?$/,
            include: path.resolve('src'),
            exclude: path.resolve('src/components'),
            loader: 'babel-loader',
          },
          {
            test: /\.svg$/,
            oneOf: [
              {
                resourceQuery: /external/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                },
              },
              {
                loader: '@svgr/webpack',
              },
            ],
          },
          {
            test: /\.(jpe?g|png|gif)$/i,
            oneOf: [
              {
                resourceQuery: /external/,
                loader: 'file-loader',
                options: {
                  name: 'static/[name].[ext]',
                },
              },
              {
                loader: 'url-loader',
                options: {
                  limit: 10000,
                },
              },
            ],
          },
        ];

        // Preserve Next rules while appending our rules
        config.module.rules = [...config.module.rules, ...rules];

        // console.log(config.module.rules);

        config.plugins.push(new webpack.DefinePlugin(globals));

        return config;
      },
    };
  }

  /*
    ADDITIONAL PRODUCTION BUILD CONFIG
  */
  if (phase === PHASE_PRODUCTION_BUILD) {
    // const withOffline = require('next-offline');

    // Add service worker to our production build with Workbox
    // cfg = withOffline({
    //   ...cfg,
    //   // Gain control of sw registration
    //   dontAutoRegisterSw: true,
    //   workboxOpts: {
    //     cacheId: pkg.name,
    //     skipWaiting: true,
    //     clientsClaim: true,
    //     include: [/\.html$/, /\.js$/, /\.png$/],
    //   },
    // });

    // Add Bundle Analyzer if requested by script
    if (process.env.BUNDLE_ANALYZE) {
      const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

      cfg = withBundleAnalyzer({
        ...cfg,
        analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
        bundleAnalyzerConfig: {
          server: {
            analyzerMode: 'static',
            reportFilename: '../bundle_analytics/server.html',
          },
          browser: {
            analyzerMode: 'static',
            reportFilename: '../bundle_analytics/client.html',
          },
        },
      });
    }
  }

  return cfg;
};

module.exports = config;
