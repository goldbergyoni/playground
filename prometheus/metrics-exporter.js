const {
  register,
  Counter,
  Histogram,
  Summary,
  collectDefaultMetrics
} = require('prom-client');
const responseTime = require('response-time');

// This variable is used to hold the metrics exporter as singleton so all the modules and layers
// will use the same exporter (otherwise, multiple instances will collect metrics which is a waste)
let defaultMetricsExporterInstance;

const metricTypes = {
  counter: 'counter',
  summary: 'summary',
  histogram: 'histogram',
};

class MetricsExporter {
  static getDefaultInstance() {
    if (!defaultMetricsExporterInstance) {
      defaultMetricsExporterInstance = new MetricsExporter();
    }

    return defaultMetricsExporterInstance;
  }

  // starts collecting the recommended prom metrics (e.g. memory usage) and exposes an API route for prom to scrape this metrics
  collectDefaultMetricsAndExport(expressApp, metricsRoute = '/metrics', probeFrequency = 20000) {
    console.log(`About to start collecting default metrics and exposing all under the ${metricsRoute} route`);
    expressApp.get(metricsRoute, (req, res) => {
      res.set('Content-Type', register.contentType);
      res.end(register.metrics());
    });
    collectDefaultMetrics({
      timeout: probeFrequency
    });
    this.addCustomMetrics(expressApp);
  }

  // Here we add custom and generic Minta metrics that are needed in all microservices
  addCustomMetrics(expressApp) {
    this.addLatencyMetric(expressApp);
    // add here other metrics
  }

  addLatencyMetric(expressApp) {
    const latencyMetric = this.defineMetric('http_request_duration', 'Measure the request length', ['path'], metricTypes.summary);
    expressApp.use(
      responseTime((req, res, time) => {
        latencyMetric.labels(req.url).observe(time);
      }),
    );
  }

  defineMetric(name, description, labels = [], metricType) {
    let theResultMetric = null;
    const metricProperties = {
      name,
      help: description,
      labelNames: labels,
    };

    switch (metricType) {
      case metricTypes.counter:
        theResultMetric = new Counter(metricProperties);
        break;
      case metricTypes.summary:
        theResultMetric = new Summary(metricProperties);
        break;
      case metricTypes.histogram:
        theResultMetric = new Histogram(metricProperties);
        break;
      default:
        break;
    }

    return theResultMetric;
  }
}

module.exports.exporter = MetricsExporter;
module.exports.defaultMetricsExporter = MetricsExporter.getDefaultInstance();
module.exports.metricTypes = metricTypes;