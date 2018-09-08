require('./support/env');
var testsContext = require.context('./', true, /-tests$/);
testsContext.keys().forEach(testsContext);
