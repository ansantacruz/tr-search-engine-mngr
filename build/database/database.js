"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeSQL = exports.sequelizeMySQL = void 0;
const debug_1 = __importDefault(require("debug"));
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const debug = (0, debug_1.default)('bdb:database');
exports.sequelizeMySQL = establishConnection();
function establishConnection() {
    const databaseInstance = exports.sequelizeMySQL;
    if (!databaseInstance) {
        debug('Starting the database connection.');
        return new sequelize_1.Sequelize('', config_1.default.databaseUser, config_1.default.databasePass, {
            dialect: 'mysql',
            host: config_1.default.databaseHost,
            logging: false,
            pool: {
                acquire: Number(config_1.default.databesePoolAcquiere),
                idle: Number(config_1.default.databesePoolIdle),
                max: Number(config_1.default.databesePoolMax),
                min: Number(config_1.default.databesePoolMin)
            },
            port: Number(config_1.default.databasePort)
        });
    }
    return databaseInstance;
}
const executeSQL = async (sentence, queryType, sqlData, transaction) => {
    try {
        const print = config_1.default.logSentenceSQL ? sentence.replace(/\s+/g, ' ') : queryType.toString();
        debug('Execute SQL statement: %s', print);
        return new Promise((resolve, reject) => {
            exports.sequelizeMySQL.query(sentence, {
                bind: sqlData,
                transaction,
                type: queryType
            }).then((result) => resolve(result))
                .catch((err) => reject(err));
        });
    }
    catch (error) {
        const errorBd = error;
        debug('Database connection error: %s', errorBd);
        return Promise.reject({ message: 'An error occurred with the connection to the database.', errorBd });
    }
};
exports.executeSQL = executeSQL;
//# sourceMappingURL=database.js.map