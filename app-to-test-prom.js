const express = require('express');
const responseTime = require('response-time');
const {
    defaultMetricsExporter,
    metricTypes
} = require('./metrics-exporter');

const app = express();
app.listen(3000, () => {
    console.log('App listening on port 3000!');
});

defaultMetricsExporter.collectDefaultMetricsAndExport(app, '/metrics', 2000);

const errorMetric = defaultMetricsExporter.defineMetric('errorOccured', 'Some application error has occured', ['code', 'name'], metricTypes.counter);

const latencyMetric = defaultMetricsExporter.defineMetric('requestLatency', 'Measure the request length', ['path'], metricTypes.summary);

app.use(
    responseTime((req, res, time) => {
        latencyMetric.labels(req.url).observe(time);
        console.log(`Time took for a request is ${time}`);
    }),
);

app.use('/somepath', (req, res, next) => {
    console.log('Some path started');
    // let's now throw error sometimes or a valid repsonse
    const error = new Error('Very bad');
    error.name = 'invalidArguments';
    error.code = 400;
    throw error;
    setTimeout(() => {
        //res.status(200).json({});
    }, 10);

});

app.use((error, req, res, next) => {
    console.log('An error has occured');
    errorMetric.inc({
        code: error.code,
        name: error.name,
    });
    res.json(error);
});