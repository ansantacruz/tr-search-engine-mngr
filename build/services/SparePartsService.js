"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SparePartsService = void 0;
const debug_1 = __importDefault(require("debug"));
const SparePartsDataSource_1 = __importDefault(require("../datasource/SparePartsDataSource"));
const debug = (0, debug_1.default)('tc:SparePartsService');
class SparePartsService {
    static async getMotorcycleBrand() {
        try {
            const response = await SparePartsDataSource_1.default.getMotorcycleBrand();
            return Promise.resolve(response);
        }
        catch (err) {
            debug('Error trying to obtain motorcycle brands %s ', err);
            return Promise.reject(err);
        }
    }
    static async getMotorcyclebyBrand(brand) {
        try {
            const response = await SparePartsDataSource_1.default.getMotorcyclebyBrand(brand);
            return Promise.resolve(response);
        }
        catch (err) {
            debug('Error trying to obtain motorcycle brands %s ', err);
            return Promise.reject(err);
        }
    }
    static async getSapareParts(motorcycleId, category) {
        try {
            const response = await SparePartsDataSource_1.default.getSapareParts(motorcycleId, category);
            return Promise.resolve(response);
        }
        catch (err) {
            debug('Error trying to obtainspare parts %s ', err);
            return Promise.reject(err);
        }
    }
}
exports.SparePartsService = SparePartsService;
//# sourceMappingURL=SparePartsService.js.map