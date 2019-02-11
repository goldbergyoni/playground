'use strict';

const log = require('./Log');
const Context = require('./Context');
const Processors = require('./processors');
const memored = require('memored');
const MsgQueue = require('@leverege/message-queue');

function start(options) {

  log.info('Starting Message Processor');

  const context = Context.init(options);
  const handlers = [];

  options.processors.forEach(prc => {

    // Create the processor for the handler
    const processor = Processors.createProcessor(prc.processor, context);
    if (processor == null) {
      return;
    }

    const reader = MsgQueue.createReader({
      transportConfig: prc.transportConfig,
      topic: prc.topic,
      channel: prc.channel,
      processor
    });

    reader.start();
    handlers.push(reader);
  });
}

module.exports = {
  start
};

'use strict';

const log = require('@leverege/log');
const { promisify } = require('util');
const Models = require('@leverege/api-models-firebase');
const { Device, Routes } = require('@leverege/api-models-firebase');
const memored = require('memored');
const Writers = require('./Writers');
const Cache = require('@leverege/cache');

const cacheRead = promisify(memored.read);

function init(options) {

  const cxt = {};
  cxt.cache = Cache.create(options.cache);
  Models.init(options.modelDatabase);
  Models.setCache(cxt.cache);
  cxt.writers = Writers(options.writers);

  cxt.getDevice = (networkId, aliasKey, aliasValue) => {
    return new Promise((resolve, reject) => {
      const key = `net:${networkId || '<internal>'}::alias::${aliasKey || '<id>'}::${aliasValue}`;

      memored.read(key, (cErr, val) => {
        if (val === 'miss') {
          reject({ cacheMiss: true });
        } else if (val == null) {
          const cb = (dErr, data) => {
            if (dErr) {
              memored.store(key, 'miss', options.cacheErrorMs == null ? 10000 : options.cacheError);
              reject(dErr);
            } else {
              memored.store(key, data, options.cacheMs == null ? 30 * 60 * 1000 : options.cacheMs);
              resolve(data);
            }
          };

          if (networkId == null && aliasKey == null && aliasValue != null) {
            const d = new Device(aliasValue);
            d.getData(cb);
          } else {
            Device.getDeviceByNetworkAlias(networkId, aliasKey, aliasValue, cb);
          }
        } else {
          resolve(val);
        }
      });
    });
  };
  return cxt;

  // function getRoutes( id, done ) {
  //   const key = `routes:${id}`
  //   memored.read( key, ( cErr, val ) => {
  //     if ( val ) {
  //       done( null, val )
  //       return
  //     }

  //     const r = new Routes( id )
  //     r.getData( ( err, data ) => {
  //       if ( err ) {
  //         log.warn( { err }, `unable to read route with id ${id}` )
  //         done( err )
  //         return
  //       }
  //       memored.store( key, data, options.cacheMs == null ? ( 30 * 60 * 1000 ) : options.cacheMs )
  //       done( null, data )
  //     } )

  //   } )
  // }
}

module.exports = {
  init
};bash-4.4$

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const DefaultProcessor = require('./DefaultProcessor');
const AckProcessor = require('./AckProcessor');

function createProcessor(options, context) {

  // Get Writer
  const writer = context.writers.get(options.writer);
  const opts = _extends({}, options, { writer });

  switch (opts.type) {
    case 'default':
      return new DefaultProcessor(opts, context);

    case 'ack':
      return new AckProcessor(opts, context);

    default:
      return null;
  }
}

class DefaultProcessor extends MessageProcessor {

  constructor(opts, context) {
    super(opts);
    this.topic = opts.topic || 'default';
    this.context = context;
  }

  async process(message) {
    const msg = message.getMessage();
    if (msg == null) {
      log.trace('null message recieved');
      Status.incStatus('defaultNullData');
      throw Err.illegalArgument();
    }

    if (msg.type !== 'inboundDataEventMsg') {
      Status.incStatus('defaultMalformedMsg');
      log.trace({ message: msg }, 'unknown message recieved');
      throw Err.unknownMessage({ type: msg.type });
    }

    const { type, networkId = null, deviceId, aliasKey, time, data, event } = msg;
    if (deviceId) {
      // Lookup the internal device using the external lookup
      // device id and aliasKey
      try {
        const device = await this.context.getDevice(networkId, aliasKey, deviceId);
        const routes = await getMessageRouteForDevice(device, this.context.cache);
        if (log.isDebug()) {
          log.debug({ message: msg, topic: this.topic, toDeviceId: device.id }, 'Received inboundDataEventMsg');
        }
        const dMsg = {
          type: 'deviceDataEventMsg',
          id: Base62.v4(),
          time: Time.parse(time),
          deviceId: device.id,
          systemId: device.systemId,
          blueprintId: device.blueprintId,
          projectId: device.projectId,
          networkId,
          data,
          event
        };

        const route = ConditionalRoute.routeFor(routes, 'deviceDataEventMsg', { device, msg: dMsg }) || this.topic;
        this.writer.route(route, dMsg);
        Status.incStatus('defaultProcessed');

        return false;
      } catch (err) {

        log.info({ networkId, deviceId, aliasKey, err }, 'Failed to find device');
        Status.incStatus('defaultDeviceMiss');
        throw err;
      }
    }

    log.warn({ message: msg }, 'Malformed message');
    Status.incStatus('defaultMalformedMsg');
    throw Err.illegalArgument();
  }
}

'use strict';

const Err = require('@leverege/error');
const ClusterManager = require('@leverege/cluster-manager');
const { getMessageRouteForDevice } = require('@leverege/api-models-firebase');

const { ConditionalRoute, MessageProcessor, Status } = require('@leverege/message-queue');
const log = require('../Log');
const Time = require('./Time');

/**
 * Expects input of messages as follows:
 *
 * {
 *    aliasKey : the alias id of the external to internal device mapping
 *    deviceId : the external device id
 *    message :
 * }
 **/
class AckProcessor extends MessageProcessor {

  constructor(opts, context) {
    super(opts);
    this.topic = opts.topic || 'default';
    this.context = context;
  }

  async process(message, messageOptions) {
    const msg = message.getMessage();
    if (msg == null) {
      Status.incStatus('ackNullData');
      throw Err.illegalArgument();
    }

    if (msg.type !== 'inboundAckMsg') {
      Status.incStatus('unknownMsg');
      throw Err.unknownMessage({ type: msg.type });
    }

    const { msgId, networkId, deviceId, aliasKey, time } = msg;

    if (msgId && networkId && deviceId && aliasKey) {
      // Lookup the internal device using the external lookup
      // device id and aliasKey
      try {
        const device = await this.context.getDevice(networkId, aliasKey, deviceId);
        const routes = await getMessageRouteForDevice(device, this.context.cache);

        if (log.isDebug()) {
          log.debug({ networkId, deviceId, aliasKey, msgId }, 'Received inboundAckMsg');
        }

        const dMsg = {
          type: 'deviceAckMsg',
          msgId,
          time: Time.parse(time),
          networkId,
          deviceId: device.id,
          systemId: device.systemId,
          blueprintId: device.blueprintId,
          projectId: device.projectId,
          status: msg.status,
          response: msg.response
        };
        const route = ConditionalRoute.routeFor(routes, 'deviceAckMsg', { device, msg: dMsg }) || this.topic;

        this.writer.route(route, dMsg);
        Status.incStatus('ackProcessed');
        return false;
      } catch (err) {

        log.info({ networkId, deviceId, aliasKey, msgId, err }, 'Failed to find device');
        Status.incStatus('ackDeviceMiss');
        throw err;
      }
    } else {
      log.debug({ networkId, deviceId, aliasKey, msgId }, 'Invalid inboundAckMsg');
      Status.incStatus('ackMalformedMsg');
      throw Err.illegalArgument();
    }
  }
}

module.exports = AckProcessor;