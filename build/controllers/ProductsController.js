"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const express_1 = require("express");
const http_status_1 = __importDefault(require("http-status"));
const ProductsService_1 = require("../services/ProductsService");
const DebugUtilities_1 = require("../utilities/DebugUtilities");
const RequestLogger_1 = __importDefault(require("../utilities/RequestLogger"));
const debug = (0, debug_1.default)('tc:ProductsController');
const ProductsController = (0, express_1.Router)();
ProductsController.get('/products/get-types', RequestLogger_1.default.basic, async (req, res) => {
    try {
        const response = await ProductsService_1.ProductsService.getProductsTypes();
        res.status(http_status_1.default.OK).send(response);
    }
    catch (err) {
        const error = DebugUtilities_1.DebugUtilities.error(err, 'Error');
        debug('ERROR: POST-ProductsController /products/get-types: %j', error.statusError);
        res.status(error.codeStatusError).send(error.statusError);
    }
});
ProductsController.get('/products/get-category-by-produc-type/:producType', RequestLogger_1.default.basic, async (req, res) => {
    try {
        const producType = +req.params.producType;
        const response = await ProductsService_1.ProductsService.getCategoryByProductTypes(producType);
        res.status(http_status_1.default.OK).send(response);
    }
    catch (err) {
        const error = DebugUtilities_1.DebugUtilities.error(err, 'Error');
        debug('ERROR: POST-ProductsController get-category-by-produc-type/:producType: %j', error.statusError);
        res.status(error.codeStatusError).send(error.statusError);
    }
});
exports.default = ProductsController;
//# sourceMappingURL=ProductsController.js.map