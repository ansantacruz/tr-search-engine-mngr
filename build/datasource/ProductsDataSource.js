"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
const DebugUtilities_1 = require("../utilities/DebugUtilities");
const debug = (0, debug_1.default)('tc:ProductsDataSource');
class ProductsDataSource {
}
exports.default = ProductsDataSource;
_a = ProductsDataSource;
ProductsDataSource.getProductsTypes = async () => {
    debug('Starts the database query of the search products types');
    try {
        const result = await (0, database_1.executeSQL)(`SELECT
                    tp.tpr_id as idProductType,
                    tp.tpr_descripcion as productName,
                    tp.tpr_logo as productLogo
                FROM tr_data_base.tipo_producto tp
                WHERE tp.tpr_activo = 1;`, sequelize_1.QueryTypes.SELECT, {});
        if (result.length > 0) {
            return Promise.resolve(result);
        }
        else {
            debug(`${DebugUtilities_1.MessageError}`, '404 TR_DATA_BASE');
            const bodyError = {
                CodeError: 'SELECT-SEARCH-PRODUCT-TYPES-404-DB',
                Reason: 'BD error TR_DATA_BASE',
                StatusCode: '404',
            };
            return Promise.reject(bodyError);
        }
    }
    catch (err) {
        debug(`[%s] ${DebugUtilities_1.MessageError}`, err);
        return Promise.reject({ Code: 'SELECT-SEARCH-PRODUCT-TYPES', Reason: err });
    }
};
ProductsDataSource.getCategoryByProductTypes = async (producType) => {
    debug('Starts the database query of the search products types');
    try {
        const result = await (0, database_1.executeSQL)(`SELECT
                    ta.tca_id as categoryTypeId,
                    ta.tca_descripcion as categoryTypeName,
                    ta.tca_logo as categoryLogo
                FROM tr_data_base.tipo_categoria ta
                INNER JOIN  tr_data_base.tipo_producto tp
                    ON ta.tca_tipo_producto = tp.tpr_id
                WHERE ta.tca_tipo_producto = $producType;  `, sequelize_1.QueryTypes.SELECT, { producType });
        if (result.length > 0) {
            return Promise.resolve(result);
        }
        else {
            debug(`${DebugUtilities_1.MessageError}`, '404 TR_DATA_BASE');
            const bodyError = {
                CodeError: 'SELECT-SEARCH-CATEGORY_BY_PRODUCT_TYPE-404-DB',
                Reason: 'BD error TR_DATA_BASE',
                StatusCode: '404',
            };
            return Promise.reject(bodyError);
        }
    }
    catch (err) {
        debug(`[%s] ${DebugUtilities_1.MessageError}`, err);
        return Promise.reject({ Code: 'SELECT-SEARCH-PRODUCT-TYPES', Reason: err });
    }
};
ProductsDataSource.getElementsByCategory = async (category) => {
    debug('Starts the database query of the search products types');
    try {
        const result = await (0, database_1.executeSQL)(`SELECT
                    ta.tca_id as categoryTypeId,
                    ta.tca_descripcion as categoryTypeName,
                    ta.tca_logo as categoryLogo
                FROM tr_data_base.tipo_categoria ta
                INNER JOIN  tr_data_base.tipo_producto tp
                    ON ta.tca_tipo_producto = tp.tpr_id
                WHERE ta.tca_tipo_producto = $producType;  `, sequelize_1.QueryTypes.SELECT, { category });
        if (result.length > 0) {
            return Promise.resolve(result);
        }
        else {
            debug(`${DebugUtilities_1.MessageError}`, '404 TR_DATA_BASE');
            const bodyError = {
                CodeError: 'SELECT-SEARCH-ELEMENTS-BY-CATEGORTY-404-DB',
                Reason: 'BD error TR_DATA_BASE',
                StatusCode: '404',
            };
            return Promise.reject(bodyError);
        }
    }
    catch (err) {
        debug(`[%s] ${DebugUtilities_1.MessageError}`, err);
        return Promise.reject({ Code: 'SELECT-SEARCH-ELEMTS-BY-CATEGORY', Reason: err });
    }
};
//# sourceMappingURL=ProductsDataSource.js.map