module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['mocha', 'chai-spies', 'chai'],

    preprocessors: {
      'src/**/*.js': ['webpack'],
      'test/**/*_spec.js': ['webpack'],
    },

    files: [
      'node_modules/document-register-element/build/document-register-element.js',
      'test/**/*_spec.js'
    ],

    webpack: {
      module: {
        loaders: [
          {
            test: /\.js$/,
            include: /(src|test)/,
            loader: 'babel',
          },
        ]
      }
    },

    webpackMiddleware: {
      stats: 'errors-only'
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    singleRun: false,

    concurrency: Infinity
  })
}
