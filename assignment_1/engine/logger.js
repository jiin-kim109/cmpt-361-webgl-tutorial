
const createLogger = (loggerNamespace) => {
    const prefix = `[${loggerNamespace}] `;
    const withPrefix = (message) => `${prefix}${message}`;

    return {
        logMessage: (message) => {
            console.log(withPrefix(message));
        },
        logError: (errorMessage) => {
            console.error(withPrefix(errorMessage));
        }
    }
}

export default {
    createLogger
}