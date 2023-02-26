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
const debug = (0, debug_1.default)('tc:MotorcycleAccessoriesDataSource');
class MotorcycleAccessoriesDataSource {
}
exports.default = MotorcycleAccessoriesDataSource;
_a = MotorcycleAccessoriesDataSource;
MotorcycleAccessoriesDataSource.getBrandsByCategory = async (category) => {
    debug('Start the search of brand for an category');
    try {
        const result = await (0, database_1.executeSQL)(`SELECT DISTINCTROW ma.mpr_descripcion as brand
                FROM
                    tr_data_base.producto_categoria pc
                    INNER JOIN tr_data_base.producto p
                    ON p.pro_id = pc.pca_producto
                    INNER JOIN tr_data_base.marca_producto ma
                    ON p.pro_marca = ma.mpr_id
                where pc.pca_tipoCategoria =$category`, sequelize_1.QueryTypes.SELECT, { category });
        if (result.length > 0) {
            return Promise.resolve(result);
        }
        else {
            debug(`${DebugUtilities_1.MessageError}`, '404 TR_DATA_BASE');
            const bodyGetTypeOfAccesoriesError = {
                CodeError: 'SELECT-SEARCH-BRANDS-BY-CATEGORY-404-DB',
                Reason: 'BD error TR_DATA_BASE',
                StatusCode: '404',
            };
            return Promise.reject(bodyGetTypeOfAccesoriesError);
        }
    }
    catch (err) {
        debug(`[%s] ${DebugUtilities_1.MessageError}`, err);
        return Promise.reject({ Code: 'SELECT-SEARCH-BRANDS-BY-CATEGORY', Reason: err });
    }
};
MotorcycleAccessoriesDataSource.getProductsByBrand = async (productCategory, brand) => {
    debug('Start the search of products for an category and brand');
    try {
        const result = await (0, database_1.executeSQL)(`SELECT
                    p.pro_id as productId,
                    p.pro_descripcion as productDescription,
                    pi.pi_imagen as logo
                FROM
                    tr_data_base.producto_categoria pc
                    INNER JOIN tr_data_base.producto p
                    ON p.pro_id = pc.pca_producto
                    INNER JOIN tr_data_base.marca_producto ma
                    ON p.pro_marca = ma.mpr_id
                    INNER JOIN tr_data_base.producto_imagen pi
                    ON p.pro_id = pi.pi_producto
                WHERE pc.pca_tipoCategoria =$productCategory and ma.mpr_id =$brand;`, sequelize_1.QueryTypes.SELECT, { productCategory, brand });
        if (result.length > 0) {
            return Promise.resolve(result);
        }
        else {
            debug(`${DebugUtilities_1.MessageError}`, '404 TR_DATA_BASE');
            const bodyGetTypeOfAccesoriesError = {
                CodeError: 'SELECT-SEARCH-PRODUCTS-BY-BRAND-AND-CATEGORY-404-DB',
                Reason: 'BD error TR_DATA_BASE',
                StatusCode: '404',
            };
            return Promise.reject(bodyGetTypeOfAccesoriesError);
        }
    }
    catch (err) {
        debug(`[%s] ${DebugUtilities_1.MessageError}`, err);
        return Promise.reject({ Code: 'SELECT-SEARCH-PRODUCTS-BY-BRAND-AND-CATEGORY', Reason: err });
    }
};
//# sourceMappingURL=MotorcycleAccessoriesDataSource.js.map