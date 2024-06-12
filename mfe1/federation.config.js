const { withNativeFederation, shareAll, share } = require('@angular-architects/native-federation/config');

const conf = withNativeFederation({

  name: 'mfe1',

  exposes: {
    './web-components': './src/bootstrap.ts',
  },

  shared:{},

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket'
    // Add further packages you don't need at runtime
  ]
  
});

module.exports = conf;
