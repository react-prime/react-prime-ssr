/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path';
import type * as webpack from 'webpack';
import type { NextConfig } from 'next';
import { PHASE_PRODUCTION_BUILD, PHASE_PRODUCTION_SERVER } from 'next/constants';

import { NODE_ENV, APP_ENV, PORT } from './config/env';

const GLOBALS = {
  'process.env': {
    NODE_ENV: JSON.stringify(NODE_ENV),
    APP_ENV: JSON.stringify(APP_ENV),
    PORT: PORT,
  },
  __DEV__: APP_ENV === 'development',
  __TEST__: APP_ENV === 'test',
  __ACC__: APP_ENV === 'acceptance',
  __PROD__: APP_ENV === 'production',
};


// Set up our Next environment based on build phase
const config = (phase: string, config: NextConfig) => {
  let cfg: NextConfig = {
    ...config,
    distDir: 'dist',
    // Remove x-powered-by header to remove information about the server
    poweredByHeader: false,
  };

  /**
   * BUILD CONFIG
   * This config will run in every build phase, but NOT when starting the production server
  */
  if (phase !== PHASE_PRODUCTION_SERVER) {
    // Important that we import dev dependencies only in build phases
    const webpack = require('webpack');
    const CopyWebpackPlugin = require('copy-webpack-plugin');
    const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

    cfg = {
      ...cfg,
      webpack: (config: webpack.Configuration, { isServer }) => {
        /**
         * WEBPACK CONFIG
         * Your regular Webpack configuration, except we have to work with an already existing
         * Webpack configuration from Next. When changing anything, keep in mind to preserve the
         * config of Next (unless you are trying to overwrite something) or things might break.
        */

        const rules = [
          {
            test: /\.svg$/,
            oneOf: [
              {
                resourceQuery: /external/,
                type: 'asset/inline',
              },
              {
                use: ['@svgr/webpack'],
              },
            ],
          },
        ];

        // Add our rules
        if (!config.module) {
          config.module = {
            rules: [],
          };
        }

        config.module.rules = [
          ...config.module.rules!,
          ...rules,
        ];


        // Add plugins
        if (!config.plugins) {
          config.plugins = [];
        }

        config.plugins = [
          ...config.plugins,
          new webpack.DefinePlugin(GLOBALS),
          new CopyWebpackPlugin({
            patterns: [
              { from: path.resolve('public'), to: path.resolve('dist/static') },
            ],
          }),
        ];


        // Add tsconfig paths to webpack
        if (!config.resolve) {
          config.resolve = {
            plugins: [],
          };
        }

        config.resolve.plugins = [
          ...config.resolve.plugins!,
          new TSConfigPathsPlugin(),
        ];

        return config;
      },
    };
  }

  /**
   * PRODUCTION BUILD CONFIG
   * This is the config for production builds in addition to the previous build phase
  */
  if (phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = require('next-pwa');
    const pkg = require('./package.json');

    // Add service worker to our production build with Workbox
    cfg = withPWA({
      ...cfg,
      pwa: {
        dest: 'dist/static',
        sw: 'service-worker.js',
        cacheId: pkg.name,
        skipWaiting: true,
        clientsClaim: true,
        include: [/\.html$/, /\.js$/, /\.png$/],
        scope: '/',
        runtimeCaching: [
          {
            urlPattern: /^https?.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'https-calls',
              networkTimeoutSeconds: 15,
              expiration: {
                maxEntries: 150,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    });

    // Add Bundle Analyzer if requested by script
    if (process.env.BUNDLE_ANALYZE) {
      const withBundleAnalyzer = require('@next/bundle-analyzer')({
        enabled: process.env.BUNDLE_ANALYZE,
      });

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
