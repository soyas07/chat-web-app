// src/utils/logger.js
import log from 'loglevel';

// Configure loglevel
log.setLevel(process.env.NODE_ENV === 'development' ? 'debug' : 'warn');

// Optionally, you can create custom methods for different log levels
const logger = {
    trace: log.trace.bind(log),
    debug: log.debug.bind(log),
    info: log.info.bind(log),
    warn: log.warn.bind(log),
    error: log.error.bind(log)
};

export default logger;
