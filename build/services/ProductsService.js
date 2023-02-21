"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const debug_1 = __importDefault(require("debug"));
const ProductsDataSource_1 = __importDefault(require("../datasource/ProductsDataSource"));
const debug = (0, debug_1.default)('tc:ProductsService');
class ProductsService {
    static async getProductsTypes() {
        try {
            const response = await ProductsDataSource_1.default.getProductsTypes();
            return Promise.resolve(response);
        }
        catch (err) {
            debug('Error trying to obtain products types- %s ', err);
            return Promise.reject(err);
        }
    }
    static async getCategoryByProductTypes(producType) {
        try {
            const response = await ProductsDataSource_1.default.getCategoryByProductTypes(producType);
            return Promise.resolve(response);
        }
        catch (err) {
            debug('Error trying to obtain categories by product type- %s ', err);
            return Promise.reject(err);
        }
    }
}
exports.ProductsService = ProductsService;
//# sourceMappingURL=ProductsService.js.map