'use strict';

const express = require('express');

const App = express();
App.listen(3000, () => {
  console.log('App listening on port 3000!');
});

/**
 * This creates the module that we created in the step before.
 * In my case it is stored in the util folder.
 */
var Prometheus = require('./prom-lib');  


/**
 * The below arguments start the counter functions
 */
// App.use(Prometheus.requestCounters);  
// App.use(Prometheus.responseCounters);

/**
 * Enable metrics endpoint
 */
Prometheus.injectMetricsRoute(App);

/**
 * Enable collection of default metrics
 */
Prometheus.startCollection();