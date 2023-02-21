"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const express_1 = require("express");
const http_status_1 = __importDefault(require("http-status"));
const MotorcycleAccessoriesService_1 = require("../services/MotorcycleAccessoriesService");
const DebugUtilities_1 = require("../utilities/DebugUtilities");
const RequestLogger_1 = __importDefault(require("../utilities/RequestLogger"));
const debug = (0, debug_1.default)('tc:MotorcycleAccessoriesController');
const MotorcycleAccessoriesController = (0, express_1.Router)();
MotorcycleAccessoriesController.get('/accessories/get-brands-of-category/:category', RequestLogger_1.default.basic, async (req, res) => {
    try {
        const category = +req.params.category;
        const response = await MotorcycleAccessoriesService_1.MotorcycleAccessoriesService.getBrandsByCategory(category);
        res.status(http_status_1.default.OK).send(response);
    }
    catch (err) {
        const error = DebugUtilities_1.DebugUtilities.error(err, 'Error');
        debug('ERROR: GET-MotorcycleAccessoriesController: /accessories/get-brands-of-category/:category%j', error.statusError);
        res.status(error.codeStatusError).send(error.statusError);
    }
});
MotorcycleAccessoriesController.get('/accessories/get-propducts-by-brand/:productCategory/:brand', RequestLogger_1.default.basic, async (req, res) => {
    try {
        const productCategory = +req.params.productCategory;
        const brand = +req.params.brand;
        const response = await MotorcycleAccessoriesService_1.MotorcycleAccessoriesService.getProductsByBrand(productCategory, brand);
        res.status(http_status_1.default.OK).send(response);
    }
    catch (err) {
        const error = DebugUtilities_1.DebugUtilities.error(err, 'Error');
        debug('ERROR: GET-MotorcycleAccessoriesController: /accessories/get-brands-of-category/:category%j', error.statusError);
        res.status(error.codeStatusError).send(error.statusError);
    }
});
exports.default = MotorcycleAccessoriesController;
//# sourceMappingURL=MotorcycleAccessoriesController.js.map